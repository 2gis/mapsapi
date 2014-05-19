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
        this._projectWatch();
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

    isProjectHere: function (coords, project) {
        if (!coords) { return; }

        if (!(coords instanceof DG.LatLng) && !(coords instanceof DG.LatLngBounds)) {
            coords = DG.latLng(coords);
        }

        coords = (coords instanceof DG.LatLngBounds) ?
            DG.latLngBounds(coords.getSouthWest().wrap(), coords.getNorthEast().wrap()) : coords.wrap();

        var checkMethod = (coords instanceof DG.LatLngBounds) ?  'intersects' : 'contains';

        return project ?
            this._testProject(checkMethod, coords, project) :
            DG.projectsList.filter(
                this._testProject.bind(this, checkMethod, coords)
            )[0];
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
        try {
            return this.isProjectHere(this._map.getBounds(), project);
        } catch (e) {
            return false;
        }
    },

    _testProject: function (method, coords, project) {
        return project.latLngBounds[method](coords);
    },

    _zoomInProject: function (project) {
        return (this._map.getZoom() >= project.minZoom);
    }
});

DG.Map.mergeOptions({
    projectDetector: true
});

DG.Map.addInitHook('addHandler', 'projectDetector', DG.ProjectDetector);
