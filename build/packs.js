var packages = {

    light: {
        name: 'Light package',
        desc: 'Provides basic functionality: map, markers, popups, geometries',
        modules: ['DGCustomization', 'DGTileLayer', 'DGFullScreen', 'DGAttribution']
    },

    full: {
        name: 'Full package',
        desc: 'Complete package. Includes all the features of 2GIS Maps API',
        modules: []
    },

    online: {
        name: '2GIS Online package',
        desc: 'Provides functionality for 2GIS Online',
        modules: ['DGTileLayer', 'DGWkt', 'DGPoi', 'DGEntrance', 'DGAttribution', 'DGRuler']
    }

};

if (typeof exports !== 'undefined') {
    exports.packages = packages;
}
