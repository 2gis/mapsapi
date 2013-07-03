L.Map.mergeOptions({
    dgProjectDetector: true
});

L.DG.ProjectDetector = L.Handler.extend({
    options: {
        url: '__WEB_API_SERVER__/project/list',
        data: {
            key: '__WEB_API_KEY__',
            version: '__WEB_API_VERSION__',
            lang: '__DEFAULT_LANG__',
            output: 'jsonp'
        }
    },

    initialize: function (map) { // (Object)
        this._map = map;
        this.project = null;
        this.projectsList = null;
        this._loadProjectList();
    },

    addHooks: function () {
        this._map.on('move', this._projectChange, this);
    },

    removeHooks: function () {
        this._map.off('move', this._projectChange, this);
    },

    getProject: function () {
        if (!this.project) {
            return false;
        }
        return L.Util.extend({}, this.project);
    },

    getProjectsList: function () {
        if (!this.projectsList) {
            return false;
        }
        return this.projectsList.slice(0);
    },

    _projectChange: function () {
        if (this.projectsList) {
            if (!this.project) {
                this._searchProject();
            } else {
                if (!this.project.LatLngBounds.intersects(this._map.getBounds())) {
                    this.project = null;
                    this._map.fire("dgProjectLeave");
                    this._searchProject();
                }
            }
        }
    },

    _loadProjectList: function () {
        var options = this.options,
            self = this;

        L.DG.Jsonp({
            url: options.url,
            data: options.data,
            success: function (data) {
                if (!data.result || (Object.prototype.toString.call(data.result) !== '[object Array]')) {
                    return;
                }
                var projectsList = data.result;

                for (var i = 0, len = projectsList.length; i < len; i++) {
                    projectsList[i].LatLngBounds = self._boundsFromWktPolygon(projectsList[i].actual_extent);
                }
                self.projectsList = projectsList;
                self._searchProject();
            }
        });
    },

    _searchProject: function () {
        try {
            for (var i = 0; i < this.projectsList.length; i++) {
                if (this.projectsList[i].LatLngBounds.intersects(this._map.getBounds())) {
                    this.project = this.projectsList[i];
                    this._map.fire("dgProjectChange", {"getProject": L.Util.bind(this.getProject, this)});
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

        return new L.LatLngBounds([parseFloat(southWest[1]), parseFloat(southWest[0])],
            [parseFloat(northEast[1]), parseFloat(northEast[0])]
        );
    }
});

L.Map.addInitHook('addHandler', 'dgProjectDetector', L.DG.ProjectDetector);
