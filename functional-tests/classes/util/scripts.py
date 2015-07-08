class GetScripts:
    getZoom = 'return map.getZoom();'
    getCenter = 'return map.getCenter();'
    getContainerCenter = 'return map.latLngToContainerPoint(map.getCenter());'


class SetScripts:

    @staticmethod
    def set_zoom(level=10):
        return 'map.setZoom(%s, {animate: false});' % str(level)

    @staticmethod
    def pan_to(lat, lng):
        return 'map.panTo([%s, %s], {animate: false});' % (str(lat), str(lng))

    @staticmethod
    def set_lang(lang):
        return 'map.setLang("%s");' % str(lang)

    @staticmethod
    def open_marker(name='marker'):
        return '%s.openPopup();' % name

    @staticmethod
    def dg_then(cb=''):
        return 'DG.then(%s);' % cb


class WheelScript:
    prepare = """
        var wheelContainer;
        var mapX, mapY;

        function wheel(event) {
            console.log('Start center is ' + map.getCenter());
            console.log('Start zoom is ' + map.getZoom());
        }

        function prepareWheel() {
            wheelContainer = document.getElementById('map');
            var coord = wheelContainer.getBoundingClientRect();
            var offsets = map.latLngToContainerPoint(map.getCenter());
            mapY = coord.top + offsets.y;
            mapX = coord.left + offsets.x;
            wheelContainer.addEventListener('DOMMouseScroll', wheel, false);
        }

        function wheelFire(levels) {
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent(
              'DOMMouseScroll', // in DOMString typeArg,
               true,  // in boolean canBubbleArg,
               true,  // in boolean cancelableArg,
               window,// in views::AbstractView viewArg,
               -levels,   // in long detailArg,
               0,     // in long screenXArg,
               0,     // in long screenYArg,
               mapX,     // in long clientXArg,
               mapY,     // in long clientYArg,
               0,     // in boolean ctrlKeyArg,
               0,     // in boolean altKeyArg,
               0,     // in boolean shiftKeyArg,
               0,     // in boolean metaKeyArg,
               0,     // in unsigned short buttonArg,
               null   // in EventTarget relatedTargetArg
            );
            wheelContainer.dispatchEvent(evt);
        }
        prepareWheel()
    """

    @staticmethod
    def wheel_levels(count=1):
        """
        :param count: scrolling wheel click count
        :return: string
        """
        return 'wheelFire(%s)' % str(count)