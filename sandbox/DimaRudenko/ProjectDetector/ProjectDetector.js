/**
 * Leaflet ProjectDetector
 * Version 0.0.1
 * Dima Rudenko
 */

L.Map.mergeOptions({
    projectDetector:true
});

L.ProjectDetector = L.Handler.extend({
    options:{
        url:'http://catalog.api.2gis.ru/project/list',
        key:'ruxlih0718',
        version:'1.3',
        lang:'ru',
        output:'jsonp',
        callback:function (results) {
            console.log(results);
        }
    },
    initialize:function (map) {
        this._map = map;
        this._getProjectList();
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
        console.log("projectchange");
        this._map.fire("projectchange");
    },

    _getProjectList:function () {
        var options = this.options;
        L.ajax({
            url:options.url,
            data:{
                key:options.key,
                version:options.version,
                output:options.output,
                lang:options.lang
            },
            success:options.callback
        });
    }
});

L.Map.addInitHook('addHandler', 'projectDetector', L.ProjectDetector);
