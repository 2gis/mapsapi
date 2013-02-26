/**
 * Leaflet ProjectDetector
 * The plugin  add custom event map, loads a list of all projects and evaluates the current project, in which the user is located.
 *
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */

L.Map.mergeOptions({
    projectDetector:true
});

L.DGProjectDetector = L.Handler.extend({
    options:{
        url:'http://catalog.api.2gis.ru/project/list',
        data:{
            key:'ruxlih0718',
            version:'1.3',
            lang:'ru',
            output:'jsonp'
        }
    },

    initialize:function (map) {
        this._map = map;
        this.project = null;
        this.projectsList = null;
        this._loadProjectList();
    },

    addHooks:function () {
        this._map.on('move', this._projectChange, this);
    },

    removeHooks:function () {
        this._map.off('move', this._projectChange, this);
    },

    _projectChange:function () {
        if (this.project && this.project.LatLngBounds.intersects(this._map.getBounds())) {
            this._searchProject();
        }
    },

    _loadProjectList:function () {
        var options = this.options,
            self = this;

        L.DGAjax({
            url:options.url,
            data:options.data,
            success:function (data) {
                if (!data.result || (Object.prototype.toString.call(data.result) !== '[object Array]')) {
                    return;
                }
                var projectsList = data.result;

                for (var i = 0, len = projectsList.length; i < len; i++) {
                    projectsList[i].LatLngBounds = self._boundsFromWktPolygon(projectsList[i].actual_extent);
                }
                self.projectsList = projectsList;
                self._searchProject();
                self._callAllProjectsCallbacks();
                self._map.fire("projectsloaded", {"getProjectsList":L.Util.bind(self.getProjectsList, self)});
            }
        });
    },

    _searchProject:function () {
        for (var i = 0; i < this.projectsList.length; i++) {
            if (this.projectsList[i].LatLngBounds.intersects(this._map.getBounds())) {
                this.project = this.projectsList[i];
                this._callCurrentProjectsCallbacks();
                console.log(this.project);
                this._map.fire("projectchange", {"getProject":L.Util.bind(this.getProject, this)});
                return;
            }
        }
    },

    _boundsFromWktPolygon:function (wkt) {
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
    },

    _callAllProjectsCallbacks:function () {
        if (this._allProjectsCallbacks) {
            for (var i = 0, len = this._allProjectsCallbacks.length; i < len; i++) {
                this._allProjectsCallbacks[i].call(this, this.getProjectsList());
            }
        }
    },

    _callCurrentProjectsCallbacks:function () {
        if (this._currentProjectCallbacks) {
            for (var i = 0, len = this._currentProjectCallbacks.length; i < len; i++) {
                this._currentProjectCallbacks[i].call(this, this.getProject());
            }
        }
    },

    getProject:function () {
        if (!this.project) {
            return false;
        }
        return L.Util.extend({}, this.project);
    },

    getProjectsList:function () {
        if (!this.projectsList) {
            return false;
        }
        return this.projectsList.slice(0);
    },

    getCurrentProject:function (fn) {
        if (typeof fn === 'function') {
            this._currentProjectCallbacks = this._currentProjectCallbacks || [];
            this._currentProjectCallbacks.push(fn);
        } else {
            return false;
        }
    },

    getAllProjects:function (fn) {
        if (typeof fn === 'function') {
            this._allProjectsCallbacks = this._allProjectsCallbacks || [];
            this._allProjectsCallbacks.push(fn);
        } else {
            return false;
        }
    }

});

L.Map.addInitHook('addHandler', 'projectDetector', L.DGProjectDetector);
