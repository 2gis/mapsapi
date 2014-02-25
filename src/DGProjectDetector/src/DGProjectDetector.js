DG.ProjectDetector = DG.Handler.extend({
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
        this._loadProjectList();
    },

    addHooks: function () {
        this._map.on('move', this._projectWatch, this);
    },

    removeHooks: function () {
        this._map.off('move', this._projectWatch, this);
    },

    getProject: function () {
        if (!this.project) { return false; }

        return DG.Util.extend({}, this.project);
    },

    getProjectsList: function () {
        return DG.projectsList.slice(0);
    },

    isProjectHere: function (coords) {
        if (!coords) { return; }

        var checkMethod = (coords instanceof DG.LatLngBounds) ?  'intersects' : 'contains';

        return DG.projectsList.filter(function (project) {
            return project.latLngBounds[checkMethod](coords);
        })[0];
    },

    _projectWatch: function () {
        if (this.project && this._boundInProject(this.project) && this._zoomInProject(this.project)) { return; }

        if (this.project) {
            this.project = null;
            this._map.fire('projectleave');
        }

        this._searchProject();
    },

    _loadProjectList: function () {
        DG.projectsList.map(function (project) {
            project.latLngBounds = new DG.LatLngBounds(project.bound);
            return project;
        });
    },

    _searchProject: function () {
        DG.projectsList
            .filter(function (project) {
                return (this._boundInProject(project) && this._zoomInProject(project));
            }, this)
            .some(function (project) {
                this.project = project;
                this._map.fire('projectchange', {'getProject': this.getProject.bind(this)});

                return true;
            }, this);
    },

    _boundInProject: function (project) {
        return project.latLngBounds.intersects(this._map.getBounds());
    },

    _zoomInProject: function (project) {
        return (this._map.getZoom() >= project.minZoom);
    }
});

DG.Map.mergeOptions({
    projectDetector: true
});

DG.Map.addInitHook('addHandler', 'projectDetector', DG.ProjectDetector);
