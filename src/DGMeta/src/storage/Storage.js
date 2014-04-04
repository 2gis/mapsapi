DG.Meta.Storage = DG.Class.extend({

    _data: {},
    _tilesData: {},
    // _wkt: new DG.Wkt(),

    getTileData: function (tileId) { //(String) -> Array|false
        if (!this._tilesData.hasOwnProperty(tileId)) { return false; }

        for (var result = [], i = 0, len = this._tilesData[tileId].length; i < len; i++) {
            result.push(this._data[this._tilesData[tileId][i]]);
        }
        // console.log(result, this._data[this._tilesData[tileId]]);

        return result;
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

    _wktToBound: function (entity, zoom) { //(Object)
        // var vert = this._wkt.read(entity.hover),
        //     key = zoom ? zoom + 'vertices' : 'vertices';

        // entity[key] = this._wkt.toObject(vert)._latlngs[0];
        // entity[key] = DG.readWKT(entity.hover);
        // console.log('old', this._wkt.toObject(vert)._latlngs[0]);
        // console.log('new', DG.GeoJSON.coordsToLatLngs(DG.parseWKT(entity.hover).coordinates[0]));
        var key = (zoom ? zoom : '') + 'bound',
            geometry = entity.hover ? 'hover' : 'geometry';

        entity[key] = DG.geoJsonLayer(entity[geometry]).getBounds();
        // console.log(DG.geoJsonLayer(entity.hover).getBounds());
        delete entity[geometry];
        console.log(entity);

        return entity;
    }

});
