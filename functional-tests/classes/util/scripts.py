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
