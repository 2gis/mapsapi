L.DG.Ruler.DistanceMarkerIcon = L.Icon.extend({

    options: {
        className : 'dg-ruler-label',
        iconAnchor: [12, 15],
        transparent: false
    },



    createIcon: function () {
        var div = document.createElement('div');

        div.innerHTML = '';

        if (this.options.transparent) {
            if (this.constructor._pointerEventsSupported) {
                div.style.pointerEvents = 'none';
            } else {
                // console.log('_pointerEventsSupported not supported');
                // L.DomEvent.addListener( div, 'mousemove', function (event) {
                //     var underneathElem,
                //         eventObject = document.createEventObject();
                //     div.style.display = 'none';
                //     underneathElem = document.elementFromPoint(event.clientX, event.clientY);
                //     div.style.display = '';
                //     L.extend(eventObject, event);
                //     eventObject.target = underneathElem;
                //     underneathElem.fireEvent('onMouseMove', eventObject);
                // });
            }
        }

        this._setIconStyles(div, 'icon');
        return this._div = div;
    },

    collapse: function () {
        this._collapsed = true;
        this._div.innerHTML = '<img src="__BASE_URL__/img/spacer.gif" width="26" height="26" />';
    },

    setDistance: function (distance) {
        if (this._collapsed) {
            this._div.innerHTML = '<div class="dg-ruler-label-inner"><div class="dg-ruler-label-point"></div><span class="dg-ruler-label-distance">' + distance + 'км</span></div>';
            this._collapsed = false;
        } else {
            this._div.querySelector('.dg-ruler-label-distance').innerHTML = distance + 'км';
        }
    },

    createShadow: function () {
        return null;
    }
});


L.DG.Ruler.distanceMarkerIcon = function (options) {
    return new L.DG.Ruler.DistanceMarkerIcon(options);
};