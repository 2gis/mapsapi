DG.Meta.Storage = DG.Class.extend({

    _data: {},
    _tilesData: {},
    _wkt: new DG.Wkt(),

    getTileData: function (tileId) { //(String) -> Array|false
        if (!this._tilesData.hasOwnProperty(tileId)) { return false; }

        // for (var result = [], i = 0, len = this._tilesData[tileId].length; i < len; i++) {
        //     // console.log(this._data[this._tilesData[tileId][i]]);
        //     // debugger;
        //     result.push(this._data[this._tilesData[tileId][i]]);
        // }
        return this._tilesData[tileId]
            .map(function (id) {
                return this._data[id];
            }, this);
            // .filter(Boolean) || [];
        // console.log(result, this._data[this._tilesData[tileId]]);

        // return result.filter(Boolean) || [];
    },

    addDataToTile: function (tileId, tileData) { //(String, Array)
        if (!this._tilesData[tileId]) {
            this._tilesData[tileId] = [];
        }

        for (var i = 0, len = tileData.length; i < len; i++) {
            var id = tileData[i].id,
                zoom = tileId.split(',')[2];

            this._tilesData[tileId].push(id);
            this._addEntity(id, tileData[i], zoom);
        }

        return this.getTileData(tileId);
    },

    _addEntity: function (id, entity) { //(String, Object)
        this._data[id] = entity;
    },

    _wktToVert: function (entity, zoom) { //(Object)
        // var vert = this._wkt.read(entity.hover),
            // key = zoom ? zoom + 'vertices' : 'vertices';

        // entity[key] = this._wkt.toObject(vert)._latlngs[0];
        // console.log('old', this._wkt.toObject(vert)._latlngs[0]);
        // console.log('new', DG.GeoJSON.coordsToLatLngs(DG.parseWKT(entity.hover).coordinates[0]));
        var key = (zoom ? zoom : '') + 'vertices';
        entity[key] = DG.readWKT(entity.hover);

        // entity[key] = DG.geoJsonLayer(entity.hover);
        // console.log(DG.geoJsonLayer(entity.hover).getBounds());
        // console.log(DG.readWKT(entity.hover));
        // console.log(DG.GeoJSON.coordsToLatLngs(DG.parseWKT(entity.hover).coordinates[0]));
        // delete entity.hover;
        // console.log(entity);

        return entity;
    },

    _wktToBound: function (entity, zoom) { //(Object)
        var key = (zoom ? zoom : '') + 'bound';

        entity[key] = DG.geoJsonLayer(entity.hover).getBounds();
        // delete entity.hover;

        return entity;
    }

});
