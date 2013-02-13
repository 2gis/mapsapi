/**
 * Leaflet ProjectDetector
 * Version 0.0.1
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
        this.getProjectList();
    },

    addHooks:function () {
        this._map
            .on('move', this.projectChange, this);
    },

    removeHooks:function () {
        this._map
            .off('move', this.projectChange, this);
    },

    projectChange:function () {
        if(!this.currentProject){
            return;
        }
        if(!this.currentProject.LatLngBounds.intersects(this._map.getBounds())){
            this.searchCurrentProject(this);
            this._map.fire("projectchange");
        }
    },

    getProjectList:function () {
        var options = this.options,
            self = this;

        L.ajax({
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
                self.searchCurrentProject(self);
            }
        });
    },

    searchCurrentProject:function (self) {
        for (var i = 0; i < self.projectList.length; i++) {
            if (self.projectList[i].LatLngBounds.intersects(self._map.getBounds())) {
                self.currentProject = self.projectList[i];
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

        wkt = wkt.replace(/, /g, ',').replace(' (', '(');
        bracketsContent = regExp.exec(arr[1])
        pointsArr = bracketsContent[1].split(',');
        southWest = pointsArr[0].split(' ');
        northEast = pointsArr[2].split(' ');

        return new L.LatLngBounds([parseFloat(southWest[1]), parseFloat(southWest[0])],
            [parseFloat(northEast[1]), parseFloat(northEast[0])]
        );
    },

    getCurrentProject:function () {
        return this.currentProject;
    }

});

L.Map.addInitHook('addHandler', 'projectDetector', L.Map.DGProjectDetector);
