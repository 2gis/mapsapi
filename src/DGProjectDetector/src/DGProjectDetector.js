L.Map.mergeOptions({
    projectDetector: true
});

L.DG.ProjectDetector = L.Handler.extend({
    options: {
        url: '__WEB_API_SERVER__/__WEB_API_VERSION__/search',
        data: {
            key: '__WEB_API_KEY__',
            fields: '__PROJECT_ADDITIONAL_FIELDS__',
            type: 'project',
            lang: 'all'
        }
    },

    initialize: function (map) { // (Object)
        this._map = map;
        this.project = null;
        this.projectsList = null;
        this._wkt = new L.DG.Wkt();
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
        return L.Util.extend({}, this.project);
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
            type = 'get',
            promise;

        if (!L.DG.ajax.corsSupport) {
            type = options.data.output = 'jsonp';
        }

        promise = L.DG.ajax(options.url, {
            type: type,
            data: options.data,

            success: function (data) {
                var projectsList = data.result.data;
                if (!data.result || (Object.prototype.toString.call(projectsList) !== '[object Array]')) {
                    return;
                }

                projectsList.forEach(function (project) {
                    var verts = self._wkt.read(project.bound),
                        path = self._wkt.toObject(verts);
                    project.LatLngBounds = path.getBounds();
                });

                self.projectsList = projectsList;
                self._searchProject();
            }
        });

        return promise;
    },

    _searchProject: function () {
        try {
            var self = this,
                mapZoom = self._map.getZoom();

            this.projectsList.forEach(function (project) {
                if (project.LatLngBounds.intersects(self._map.getBounds()) &&
                    (mapZoom >= project.min_zoom_level)) {
                    self.project = project;
                    self._map.fire('projectchange', {'getProject': L.Util.bind(self.getProject, self)});
                    return;
                }
            });
        }
        catch (err) {}
    }
});

L.Map.addInitHook('addHandler', 'projectDetector', L.DG.ProjectDetector);
