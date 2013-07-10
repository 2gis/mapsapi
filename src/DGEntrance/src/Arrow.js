L.DG.Entrance.Arrow = L.Polyline.extend({
    _markerPath: null,

    initialize: function (latlngs, options) { // (Array, Object)
        var options = options || {},
            animation = this.getArrowAnimation(latlngs.length);

        options.animation = [animation];

        L.Polyline.prototype.initialize.call(this, latlngs, options);
    },

    onAdd: function (map) {
        L.Polyline.prototype.onAdd.call(this, map);
        this._addMarker();
    },

    _addMarker: function () {
        var marker = this._createElement('marker', {
            id: 'arrow-marker',
            viewBox: '0 0 23 22',
            refX: '12',
            refY: '11',
            markerUnits: 'userSpaceOnUse',
            markerWidth: '23',
            markerHeight: '22',
            orient: 'auto'
        });

        this._markerPath = this._createElement('path');
        
        // Пример описания path-а контура стрелки:
        // this._markerPath.setAttribute('d', 'M23,11.001c0-1.139-0.643-2.174-1.658-2.686l-16-7.998C4.188-0.261,2.792-0.034,1.879,0.88 l-1,1C0.293,2.466,0,3.233,0,4.002s0.293,1.536,0.879,2.12L4,9.244v3.515L0.879,15.88C0.293,16.466,0,17.231,0,18.001 c0,0.768,0.293,1.534,0.879,2.12l1,1c0.913,0.913,2.309,1.142,3.463,0.563l16-8C22.357,13.176,23,12.14,23,11.001L23,11.001z');
        
        this._markerPath.setAttribute('d', 'M20,11 L4,3 3,4 7,8 7,14 3,18 4,19z');

        this._path.parentNode.appendChild(marker);
        marker.appendChild(this._markerPath);
        this._path.setAttribute('marker-end', 'url(#arrow-marker)');
    },

    _updateStyle: function () {
        L.Polyline.prototype._updateStyle.call(this);

        if (this._markerPath !== null) {
            /*this._markerPath.setAttribute('stroke', this._path.getAttribute('stroke'));
            this._markerPath.setAttribute('stroke-opacity', this._path.getAttribute('stroke-opacity'));
            this._markerPath.setAttribute('stroke-width', this._path.getAttribute('stroke-width'));
            if (this.options.dashArray) {
                this._markerPath.setAttribute('stroke-dasharray', this._path.getAttribute('stroke-dasharray'));
            }
            else {
                this._markerPath.removeAttribute('stroke-dasharray');
            }*/
            this._markerPath.setAttribute('fill', '#4b647d' /*this._path.getAttribute('fill')*/);
            /*this._markerPath.setAttribute('fill-opacity', this._path.getAttribute('fill-opacity'));
            this._markerPath.setAttribute('stroke-linejoin', this._path.getAttribute('stroke-linejoin'));
            this._markerPath.setAttribute('stroke-linecap', this._path.getAttribute('stroke-linecap'));*/
        };
    },

});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};
