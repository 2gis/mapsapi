var deps = {

    JSONP: {
        src: ['Jsonp/src/Jsonp.js'],
        desc: 'JSONP module.',
        heading: '2GIS modules'
    },

    Localization: {
        src: ['Localization/src/Localization.js'],
        desc: 'Localization module.'
    },

    ProjectDetector: {
        src: ['ProjectDetector/src/ProjectDetector.js'],
        desc: 'ProjectDetector module.',
        deps: ['JSONP']
    },

    DGLayer: {
        src: ['TileLayer/src/TileLayer.js'],
        desc: '2GIS Tile Layer module.',
        deps: ['TileLayer']
    }

};

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
