DG.ProjectDetector = DG.Handler.extend({
    initialize: function (map) { // (Object)
        this._map = map;
        this._osmViewport = false;
        this._project = null;
        this._noProjectEventFired = false;
        this._loadProjectList();
        this._searchProject();
    },

    addHooks: function () {
        this._map.on('move', this._projectWatch, this);
    },

    removeHooks: function () {
        this._map.off('move', this._projectWatch, this);
    },

    getProject: function () {
        if (!this._project) { return false; }

        return DG.Util.extend({}, this._project);
    },

    getProjectsList: function () {
        return this._projectList.slice(0);
    },

    isProjectHere: function (coords, project, checkMethod) {
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

    _projectWatch: function () {
        if (this._osmViewport === (this._project && this._centerInProject(this._project, 'contains'))) {
            this._osmViewport = !this._osmViewport;
            this._map.attributionControl._update(null, this._osmViewport);
        }

        if (this._project && this._centerInProject(this._project) && this._zoomInProject(this._project)) { return; }

        if (this._project) {
            this._project = null;
            this._map.fire('projectleave');
        }

        this._searchProject();

        if (this._project) {
            if (this._osmViewport === (this._project && this._centerInProject(this._project, 'contains'))) {
                this._osmViewport = !this._osmViewport;
            }
            this._map.attributionControl._update(null, this._osmViewport, this._project.country_code);
        }
    },

    _checkProject: function (project) {
        function check (value) {
            return value !== undefined && value !== null;
        }

        return project &&
                project.bounds &&
                check(project.code) &&
                check(project.domain) &&
                check(project.country_code) &&
                project.zoom_level &&
                    check(project.zoom_level.min) &&
                    check(project.zoom_level.max) &&
                project.time_zone &&
                    check(project.time_zone.offset);
    },

    _loadProjectList: function () {
        var self = this;

        DG.fallbackProjectsList = DG.fallbackProjectsList || [];

        if (!DG.projectsList) {
            DG.projectsList = DG.fallbackProjectsList;
        }
        delete DG.fallbackProjectsList;

        this._projectList = DG.projectsList
            .filter(self._checkProject)
            .map(function (project) {
                var bound = DG.Wkt.toGeoJSON(project.bounds);
                var latLngBounds = DG.geoJSON(bound).getBounds();

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
                    domain: project.domain
                };
                /* eslint-enable camelcase */
            });
    },

    _searchProject: function () {
        var foundProjects = this._projectList
            .filter(function (project) {
                return (this._centerInProject(project) && this._zoomInProject(project));
            }, this);

        var loaded = false;

        try {
            this._map._checkIfLoaded();
            loaded = true;
        } catch (e) {
            loaded = false;
        }

        if (loaded && foundProjects.length === 0 && !this._noProjectEventFired) {
            var self = this;
            setTimeout(function () {
                self._map.fire('projectleave');
                self._noProjectEventFired = true;
            }, 1);
        }

        foundProjects.some(function (project) {
            var self = this;

            this._project = project;
            setTimeout(function () {
                self._map.fire('projectchange', {'getProject': self.getProject.bind(self)});
            }, 1);

            return true;
        }, this);
    },

    _testProjectIntersects: function (bounds, project) {
        return project.latLngBounds.intersects(bounds);
    },

    _testProjectContains: function (latlng, project) {
        return this._inside(latlng, project.bound);
    },

    _centerInProject: function (project, checkMethod) {
        try {
            return this.isProjectHere(this._map.getCenter(), project, checkMethod);
        } catch (e) {
            return false;
        }
    },

    // from https://github.com/Turfjs/turf-inside/blob/master/index.js
    _inside: function (latlng, polygon) {
        var polys = polygon.coordinates;
        var pt = [latlng.lng, latlng.lat];
        // normalize to multipolygon
        if (polygon.type === 'Polygon') polys = [polys];

        var insidePoly = false;
        var i = 0;
        while (i < polys.length && !insidePoly) {
            // check if it is in the outer ring first
            if (this._inRing(pt, polys[i][0])) {
                var inHole = false;
                var k = 1;
                // check for the point in any of the holes
                while (k < polys[i].length && !inHole) {
                    if (this._inRing(pt, polys[i][k])) {
                        inHole = true;
                    }
                    k++;
                }
                if (!inHole) insidePoly = true;
            }
            i++;
        }
        return insidePoly;
    },

    // pt is [x,y] and ring is [[x,y], [x,y],..]
    _inRing: function (pt, ring) {
        var isInside = false;
        for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
            var xi = ring[i][0], yi = ring[i][1];
            var xj = ring[j][0], yj = ring[j][1];
            var intersect = ((yi > pt[1]) !== (yj > pt[1])) &&
                (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi);

            if (intersect) isInside = !isInside;
        }
        return isInside;
    },

    _zoomInProject: function (project) {
        return (this._map.getZoom() >= project.minZoom);
    }
});

DG.Map.mergeOptions({
    projectDetector: true
});

DG.Map.addInitHook('addHandler', 'projectDetector', DG.ProjectDetector);
