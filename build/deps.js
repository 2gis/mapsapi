var deps = {

    DGCore: {
        src: [],
        desc: 'Main DG module.',
        heading: '2GIS modules'
    },

    DGLayer: {
        src: ['DGLayer/src/DGLayer.js'],
        desc: '2GIS Tile Layer module.',
        deps: ['TileLayer']
    },

    JSONP: {
        src: ['Jsonp/src/Jsonp.js'],
        desc: 'JSONP module.'
    },

    ProjectDetector: {
        src: ['ProjectDetector/src/ProjectDetector.js'],
        desc: 'ProjectDetector module.',
        deps: ['JSONP']
    },

    Localization: {
        src: ['Localization/src/Localization.js'],
        desc: 'Localization module.'
    }

};

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
