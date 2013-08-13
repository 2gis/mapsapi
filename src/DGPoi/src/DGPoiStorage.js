L.DG.PoiStorage = L.Class.extend({
	//
// pois : {
//    poi_uid : poi_data,
//    poi_uid : poi_data,
//    ...
// }
// tiles_poi : {
//     xyz: [poi_uid, poi_uid, ...],
//     xyz: [poi_uid, poi_uid, ...],
//     ...
// }
	// this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this);
	// map.on('move', this._limitedUpdate, this);
    pois : {}
    tiles_poi : {}
    getPoi(id)
    getTilePois(tile_id, callback)
        if (tile_id in tiles_poi) return
            else _askByTile && callback
    _addPoiToTile
    _askByTile
});