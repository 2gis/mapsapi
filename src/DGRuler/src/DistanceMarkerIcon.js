L.DG.Ruler.DistanceMarkerIcon = L.Icon.extend({

    options: {
        className : 'dg-ruler-label'
    },

    statics: {
        _pointerEventsSupported : (function(){
            var element = document.createElement('x');
            element.style.cssText = 'pointer-events:none';
            return element.style.pointerEvents === 'none';
        })()
    },

    createIcon: function () {
        var div = document.createElement('div');

        div.innerHTML = '<div><span class="dg-ruler-label-distance">0</span></div>';

        if (this.constructor._pointerEventsSupported) {
            div.style.pointerEvents = 'none';
        } else {
            console.log('_pointerEventsSupported not supported');
            L.DomEvent.addListener( div, 'mousemove', function (event) {
                div.style.display = 'none';
                var underneathElem = document.elementFromPoint(event.clientX, event.clientY);
                div.style.display = '';
                // evt = document.createEventObject();
                // for (prop in e) {
                //     evt[prop] = e[prop];
                // }
                // evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
                event.target = underneathElem;
                underneathElem.fireEvent('onMouseMove', event);
            });
        }
        this._setIconStyles(div, 'icon');
        return div;
    },

    createShadow: function () {
        return null;
    }
});


L.DG.Ruler.distanceMarkerIcon = function (options) {
    return new L.DG.Ruler.DistanceMarkerIcon(options);
};