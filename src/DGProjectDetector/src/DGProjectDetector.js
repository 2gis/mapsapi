DG.Map.mergeOptions({
    projectDetector: true
});

DG.ProjectDetector = DG.Handler.extend({
    options: {
        url: '__WEB_API_SERVER__/__WEB_API_VERSION__/search',
        data: {
            key: '__WEB_API_KEY__',
            fields: '__PROJECT_ADDITIONAL_FIELDS__',
            // output: 'jsonp',
            type: 'project',
            lang: 'all'
        }
    },

    initialize: function (map) { // (Object)
        this._map = map;
        this.project = null;
        this.projectsList = null;
        this._loadProjectList();
    },

    addHooks: function () {
        this._map.on('move', this._projectchange, this);
    },

    removeHooks: function () {
        this._map.off('move', this._projectchange, this);
    },

    getProject: function () {
        if (!this.project) {
            return false;
        }
        return DG.Util.extend({}, this.project);
    },

    getProjectsList: function () {
        if (!this.projectsList) {
            return false;
        }
        return this.projectsList.slice(0);
    },

    _projectchange: function () {
        if (this.projectsList) {
            if (!this.project) {
                this._searchProject();
            } else {
                if (!this.project.LatLngBounds.intersects(this._map.getBounds()) ||
                    (this._map.getZoom() < this.project.min_zoom_level)) {
                    this.project = null;
                    this._map.fire('projectleave');
                    this._searchProject();
                }
            }
        }
    },

    _loadProjectList: function () {
        var options = this.options,
            self = this,
            type = 'get';

        if (!DG.ajax.corsSupport) {
            type = options.data.output = 'jsonp';
        }

        return DG.ajax(options.url, {
            type: type,
            data: options.data,

            success: function (data) {
                var projectsList = data.result.data;
                if (!data.result || (Object.prototype.toString.call(projectsList) !== '[object Array]')) {
                    return;
                }

                for (var i = 0, len = projectsList.length; i < len; i++) {
                    projectsList[i].LatLngBounds = self._boundsFromWktPolygon(projectsList[i].bound);
                }
                self.projectsList = projectsList;
                self._searchProject();
            }
        });
    },

    _searchProject: function () {
        try {
            for (var i = 0, mapZoom = this._map.getZoom(); i < this.projectsList.length; i++) {
                if (this.projectsList[i].LatLngBounds.intersects(this._map.getBounds()) &&
                    (mapZoom >= this.projectsList[i].min_zoom_level)) {
                    this.project = this.projectsList[i];
                    this._map.fire('projectchange', {'getProject': DG.Util.bind(this.getProject, this)});
                    return;
                }
            }
        }
        catch (err) {}
    },

    _boundsFromWktPolygon: function (wkt) { // (String)
        var arr,
            pointsArr,
            bracketsContent,
            regExp,
            southWest,
            northEast;

        wkt = wkt.replace(/, /g, ',');
        wkt.replace(' (', '(');

        arr = /^POLYGON\((.*)\)/.exec(wkt);
        regExp = /\((.*?)\)/g;

        bracketsContent = (regExp).exec(arr[1]);
        pointsArr = bracketsContent[1].split(',');
        southWest = pointsArr[0].split(' ');
        northEast = pointsArr[2].split(' ');

        return new DG.LatLngBounds([parseFloat(southWest[1]), parseFloat(southWest[0])],
            [parseFloat(northEast[1]), parseFloat(northEast[0])]
        );
    }
});

DG.Map.addInitHook('addHandler', 'projectDetector', DG.ProjectDetector);
