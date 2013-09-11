var packages = {

    standard: {
        name: 'Standard package',
        desc: 'Provides standard functionality: map, markers, balloons, geometries',
        modules: ['DGCustomization', 'DGTileLayer', 'DGFullScreen']
    },

    full: {
        name: 'Full package',
        desc: 'Complete package. Includes all the features of 2GIS Maps API',
        modules: []
    },

    online: {
        name: '2GIS Online package',
        desc: 'Provides functionality for 2GIS Online',
        modules: ['DGTileLayer', 'DGWkt', 'DGPoi', 'DGEntrance']
    }

};

if (typeof exports !== 'undefined') {
    exports.packages = packages;
}
