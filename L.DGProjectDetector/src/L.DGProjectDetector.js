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
        key:'ruxlih0718',
        version:'1.3',
        lang:'ru',
        output:'jsonp'
    },

    initialize:function (map) {
        this._map = map;
        this._loadProjectList();
    },

    addHooks:function () {
        this._map
            .on('move', this._projectChange, this);
    },

    removeHooks:function () {
        this._map
            .off('move', this._projectChange, this);
    },

    _projectChange:function () {
        if (!this.project) {
            return;
        }
        if (!this.project.LatLngBounds.intersects(this._map.getBounds())) {
            this._searchProject(this);
            this._map.fire("projectchange", {"getProject":L.Util.bind(this.getProject, this)});
        }
    },

    _loadProjectList:function () {
        var options = this.options,
            self = this;

        L.DGAjax({
            url:options.url,
            data:{
                key:options.key,
                version:options.version,
                output:options.output,
                lang:options.lang
            },
            success:function (data) {
                if (!data.result || (Object.prototype.toString.call( data.result ) !== '[object Array]')){
                    return;
                }
                var projectsList = data.result,
                    projectsListLength = projectsList.length;

                for (var i = 0; i < projectsListLength; i++) {
                    projectsList[i].LatLngBounds = self._boundsFromWktPolygon(projectsList[i].actual_extent);
                }
                self.projectsList = projectsList;
                L.Util.bind(self._searchProject(), this);
                self._map.fire("projectsloaded", {"getProjectsList":L.Util.bind(self.getProjectsList, self)});
            }
        });
    },

    _searchProject:function () {
        for (var i = 0; i < this.projectsList.length; i++) {
            if (this.projectsList[i].LatLngBounds.intersects(this._map.getBounds())) {
                this.project = this.projectsList[i];
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
        //return L.Util.extend({},this.projectList);
        return this.projectsList.slice(0);
    }

});

L.Map.addInitHook('addHandler', 'projectDetector', L.DGProjectDetector);
