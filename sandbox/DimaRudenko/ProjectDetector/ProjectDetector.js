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
        this._map.fire("projectchange");
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
                self.projectList = data.result;
                self.searchCurrentProject();
            }
        });
    },

    searchCurrentProject:function () {
        this.currentProject = 'project';
    }
});

L.Map.addInitHook('addHandler', 'projectDetector', L.ProjectDetector);
