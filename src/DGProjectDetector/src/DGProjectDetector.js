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

        if (project) {
            return this._testProject(checkMethod, coords, project);
        } else {
            return this._projectList.filter(this._testProject.bind(this, checkMethod, coords))[0];
        }
    },

    _projectWatch: function () {
        if (this._osmViewport === (this._project && this._boundInProject(this._project, 'contains'))) {
            this._osmViewport = !this._osmViewport;
            this._map.attributionControl._update(null, this._osmViewport);
        }

        if (this._project && this._boundInProject(this._project) && this._zoomInProject(this._project)) { return; }

        if (this._project) {
            this._project = null;
            this._map.fire('projectleave');
        }

        this._searchProject();

        if (this._project) {
            if (this._osmViewport === (this._project && this._boundInProject(this._project, 'contains'))) {
                this._osmViewport = !this._osmViewport;
            }
            this._map.attributionControl._update(null, this._osmViewport, this._project.country_code);
        }
    },

    _wktToBnd: function (wkt) {
        var arr,
            pointsArr,
            bracketsContent,
            regExp;

        wkt = wkt.replace(/, /g, ',');
        wkt.replace(' (', '(');

        arr = /^POLYGON\((.*)\)/.exec(wkt);
        regExp = /\((.*?)\)/g;

        bracketsContent = (regExp).exec(arr[1]);
        pointsArr = bracketsContent[1].split(',');

        // Create a LatLng array of all points in WKT
        pointsArr = pointsArr.map(function (pointString) {
            var numbers = pointString.split(' ');

            return DG.latLng(
                parseFloat(numbers[1]),
                parseFloat(numbers[0])
            );
        });

        var bound = DG.latLngBounds(pointsArr);

        return [
            [bound.getSouthWest().lat, bound.getSouthWest().lng],
            [bound.getNorthEast().lat, bound.getNorthEast().lng]
        ];
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
                var bound = self._wktToBnd(project.bounds);
                var latLngBounds = new DG.LatLngBounds(bound);

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
                return (this._boundInProject(project) && this._zoomInProject(project));
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

    _boundInProject: function (project, checkMethod) {
        try {
            return this.isProjectHere(this._map.getCenter(), project, checkMethod);
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
