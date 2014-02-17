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
        // this._wkt = new DG.Wkt();
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
        return DG.projectsList.slice(0);
    },

    isProjectHere: function (coords) {
        var checkMethod = (coords instanceof DG.LatLngBounds) ?  'intersects' : 'contains';

        if (!coords) { return; }

        // if (!this.project) {
        //     // this._searchProject(coords);
        // }

        return DG.projectsList.filter(function (project) {
            return project.latLngBounds[checkMethod](coords);
        })[0];
    },

    _projectchange: function () {
        if (!this.project) {
            this._searchProject();
        } else {
            if (!this._boundInProject(this.project) || !this._zoomInProject(this.project)) {
                this.project = null;
                this._map.fire('projectleave');
                this._searchProject();
            }
        }
    },

    // _processProjectList: function (data) {
    //     var projectsList = data.result.data,
    //         verts, path;
    //     if (!data.result || !DG.Util.isArray(projectsList)) { return; }

    //     projectsList.forEach(function (project) {
    //         verts = this._wkt.read(project.bound);
    //         path = this._wkt.toObject(verts);

    //         project.LatLngBounds = path.getBounds();
    //     }, this);

    //     this.projectsList = projectsList;
    //     this._searchProject();
    // },

    // _loadProjectList: function () {
    //     var options = this.options,
    //         type = 'get';

    //     if (!DG.ajax.corsSupport) {
    //         type = options.data.output = 'jsonp';
    //     }

    //     return DG.ajax(options.url, {
    //         type: type,
    //         data: options.data,

    //         success: this._processProjectList.bind(this)
    //     });
    // },

    _loadProjectList: function () {
        DG.projectsList.map(function (project) {
            project.latLngBounds = new DG.LatLngBounds(project.bound);
            // console.log(project);
            return project;
        });

        // this._searchProject();
    },

    _searchProject: function (coords) {
        DG.projectsList.some(function (project) {
            if ((coords && this.isProjectHere(coords)) || this._boundInProject(project) && this._zoomInProject(project)) {
                this.project = project;
                this._map.fire('projectchange', {'getProject': this.getProject.bind(this)});

                return true;
            }
        }, this);
    },

    _boundInProject: function (project) {
        // return true;
        return project.latLngBounds.intersects(this._map.getBounds());
    },

    _zoomInProject: function (project) {
        var mapZoom = this._map.getZoom();

        return (mapZoom >= project.minZoom);
    }
});

DG.Map.mergeOptions({
    projectDetector: true
});

DG.Map.addInitHook('addHandler', 'projectDetector', DG.ProjectDetector);
