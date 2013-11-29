L.DG.Ruler.DistanceMarkerIcon = L.Icon.extend({

    options: {
        className : 'dg-ruler-label',
        iconAnchor: [12, 15]
    },

    statics: {
        _pointerEventsSupported : (function () {
            var element = document.createElement('x');
            element.style.cssText = 'pointer-events:none';
            return element.style.pointerEvents === 'none';
        })()
    },

    createIcon: function () {
        var div = document.createElement('div');

        div.innerHTML = '<div class="dg-ruler-label-inner"><div class="dg-ruler-label-point"></div><span class="dg-ruler-label-distance">0 км</span></div>';

        if (this.constructor._pointerEventsSupported) {
            div.style.pointerEvents = 'none';
        } else {
        //     console.log('_pointerEventsSupported not supported');
        //     L.DomEvent.addListener( div, 'mousemove', function (event) {
        //         var underneathElem,
        //             eventObject = document.createEventObject();
        //         div.style.display = 'none';
        //         underneathElem = document.elementFromPoint(event.clientX, event.clientY);
        //         div.style.display = '';
        //         L.extend(eventObject, event);
        //         eventObject.target = underneathElem;
        //         underneathElem.fireEvent('onMouseMove', eventObject);
        //     });
        }
        this._setIconStyles(div, 'icon');
        return this._div = div;
    },

    setDistance: function (distance) {
        this._div.querySelector('.dg-ruler-label-distance').innerHTML = distance + 'км';
    },

    createShadow: function () {
        return null;
    }
});


L.DG.Ruler.distanceMarkerIcon = function (options) {
    return new L.DG.Ruler.DistanceMarkerIcon(options);
};