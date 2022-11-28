DG.ProjectDetector = DG.Handler.extend({
    initialize: function(map) { // (Object)
        this._map = map;
        this._project = undefined;
        this._loadProjectList();
    },

    addHooks: function() {
        this._projectWatch();
        this._map.on('move', this._projectWatch, this);
    },

    removeHooks: function() {
        this._map.off('move', this._projectWatch, this);
    },

    getProject: function() {
        if (!this._project) { return false; }

        return DG.Util.extend({}, this._project);
    },

    getProjectsList: function() {
        return this._projectList.slice(0);
    },

    isProjectHere: function(coords, project, checkMethod) {
        if (!coords) { return null; }

        if (!(coords instanceof DG.LatLng) && !(coords instanceof DG.LatLngBounds)) {
            coords = DG.latLng(coords);
        }

        coords = (coords instanceof DG.LatLngBounds) ?
            DG.latLngBounds(coords.getSouthWest().wrap(), coords.getNorthEast().wrap()) : coords.wrap();

        checkMethod = checkMethod || ((coords instanceof DG.LatLngBounds) ?  'intersects' : 'contains');

        var method = checkMethod == 'intersects' ? this._testProjectIntersects : this._testProjectContains;
        method = method.bind(this, coords);

        if (project) {
            return method(project);
        } else {
            return this._projectList.filter(method)[0];
        }
    },

    _projectWatch: function() {
        if (!this._map._loaded) {
            return;
        }

        if (this._project && this._zoomInProject(this._project) && this._centerInProject(this._project)) {
            return;
        }

        this._searchProject();

        if (this._project) {
            this._map.attributionControl._update(null, this._project.country_code);
        }
    },

    _checkProjectData: function(project) {
        function check(value) {
            return value !== undefined && value !== null;
        }

        return project &&
                project.bounds &&
                check(project.code) &&
                check(project.domain) &&
                check(project.country_code) &&
                check(project.flags) &&
                project.zoom_level &&
                    check(project.zoom_level.min) &&
                    check(project.zoom_level.max) &&
                project.time_zone &&
                    check(project.time_zone.offset);
    },

    _loadProjectList: function() {
        DG.fallbackProjectsList = DG.fallbackProjectsList || [];

        if (!DG.projectsList) {
            DG.projectsList = DG.fallbackProjectsList;
        }
        delete DG.fallbackProjectsList;

        this._projectList = DG.projectsList
            .filter(this._checkProjectData)
            .map(function(project) {
                var bound = DG.Wkt.toGeoJSON(project.bounds);
                var latLngBounds = DG.geoJSON(bound).getBounds();
                var defaultPos = project.default_pos ? DG.latLng(project.default_pos.lat, project.default_pos.lon) : null;


                /* eslint-disable camelcase */
                return {
                    id: project.id,
                    code: project.code,
                    minZoom: project.zoom_level.min,
                    maxZoom: project.zoom_level.max,
                    timeOffset: project.time_zone.offset,
                    bound: bound,
                    latLngBounds: latLngBounds,
                    traffic: !!project.flags.traffic,
                    transport: !!project.flags.public_transport,
                    roads: !!project.flags.road_network,
                    country_code: project.country_code,
                    domain: project.domain,
                    defaultPos: defaultPos
                };
                /* eslint-enable camelcase */
            });
    },

    _searchProject: function() {
        // Вначале отсеиваем регионы по зуму
        var filteredByZoom = this._projectList.filter(this._zoomInProject, this);

        // Находим проект в границы которого попадает центр карты
        var foundProjects = filteredByZoom.filter(this._centerInProject, this);

        // Если такой проект не найден, то ищем проекты баунд боксы которых пересекаются с экраном
        if (foundProjects.length === 0) {
            var mapBounds = this._map.getBounds();
            foundProjects = filteredByZoom.filter(DG.bind(this._testProjectIntersects, this, mapBounds));

            if (foundProjects.length > 1) {
                var mapCenter = this._map.getCenter();
                var neareastProject = foundProjects[0];
                for (var i = 1; i < foundProjects.length; i++) {
                    var currentProject = foundProjects[i];
                    if (currentProject.defaultPos &&
                        mapCenter.distanceTo(neareastProject.defaultPos) >
                        mapCenter.distanceTo(currentProject.defaultPos)
                    ) {
                        neareastProject = currentProject;
                    }
                }
                foundProjects = [neareastProject];
            }
        }

        var newProject = foundProjects[0] || null;

        if (this._project === newProject) {
            return;
        }

        var self = this;

        if (this._project !== null) {
            this._project = null;
            setTimeout(function() {
                self._map.fire('projectleave');
            }, 1);
        }

        if (newProject) {
            this._project = newProject;
            setTimeout(function() {
                self._map.fire('projectchange', {getProject: self.getProject.bind(self)});
            }, 1);
        }
    },

    _testProjectIntersects: function(bounds, project) {
        return project.latLngBounds.intersects(bounds);
    },

    _testProjectContains: function(latlng, project) {
        return DG.PolyUtil.inside([latlng.lng, latlng.lat], project.bound);
    },

    _centerInProject: function(project, checkMethod) {
        return this.isProjectHere(this._map.getCenter(), project, checkMethod);
    },

    _zoomInProject: function(project) {
        return (this._map.getZoom() >= project.minZoom);
    }
});

DG.Map.mergeOptions({
    projectDetector: true
});

DG.Map.addInitHook('addHandler', 'projectDetector', DG.ProjectDetector);
