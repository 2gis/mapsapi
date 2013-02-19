/**
 * Leaflet ProjectDetector
 * Version 1.0
 * Dima Rudenko
 */

L.Map.mergeOptions({
    projectDetector:true
});

L.Map.DGProjectDetector = L.Handler.extend({
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
            this._map.fire("projectchange");
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
                for (var i = 0; i < data.result.length; i++) {
                    data.result[i].LatLngBounds = self._boundsFromWktPolygon(data.result[i].actual_extent);
                }
                self.projectList = data.result;
                L.Util.bind(self._searchProject(), this);
                L.Util.bind(self._map.fire("projectsloaded"), this);
            }
        });
    },

    _searchProject:function () {
        for (var i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].LatLngBounds.intersects(this._map.getBounds())) {
                this.project = this.projectList[i];
                return;
            }
        }
    },

    _boundsFromWktPolygon:function (wkt) {
        var arr = /^POLYGON\((.*)\)/.exec(wkt),
            pointsArr,
            bracketsContent,
            regExp = /\((.*?)\)/g,
            southWest,
            northEast;

        wkt = wkt.replace(/, /g, ',');
        wkt.replace(' (', '(');

        bracketsContent = regExp.exec(arr[1]);
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

    getProjectList:function () {
        if (!this.projectList) {
            return false;
        }
        return this.projectList.slice(0);
    }

});

L.Map.addInitHook('addHandler', 'projectDetector', L.Map.DGProjectDetector);
