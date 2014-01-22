L.Map.mergeOptions({
    buildings: false
});

DG.Buildings = L.Handler.extend({

    initialize: function (map) { // (Object)
        this._map = map;
    },

    addHooks: function () {
        this._map.meta.enableBuildingsListening();
        this._map.on(this._mapEventsListeners, this);
    },

    removeHooks: function () {
        this._map.meta.disableBuildingsListening();
        this._map.off(this._mapEventsListeners, this);
    },

    _mapEventsListeners : {
        buildinghover : function () {
            this._setCursor('pointer');
        },
        buildingleave : function () {
            this._setCursor('auto');
        }
    },

    _setCursor: function (cursor) { // (String)
        this._map.getContainer().style.cursor = cursor;
    }
});

L.Map.addInitHook('addHandler', 'buildings', DG.Buildings);
