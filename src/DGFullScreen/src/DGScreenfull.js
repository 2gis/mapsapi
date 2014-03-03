// Inspired by Sindre Sorhus screenfull
/*global Element */
DG.Screenfull = DG.Class.extend({
    _apiMap: [
        [
            'requestFullscreen',
            'exitFullscreen',
            'fullscreenElement',
            'fullscreenEnabled',
            'fullscreenchange',
            'fullscreenerror'
        ],
        [
            'webkitRequestFullscreen',
            'webkitExitFullscreen',
            'webkitFullscreenElement',
            'webkitFullscreenEnabled',
            'webkitfullscreenchange',
            'webkitfullscreenerror'

        ],
        [
            'mozRequestFullScreen',
            'mozCancelFullScreen',
            'mozFullScreenElement',
            'mozFullScreenEnabled',
            'mozfullscreenchange',
            'mozfullscreenerror'
        ],
        [
            'msRequestFullscreen',
            'msExitFullscreen',
            'msFullscreenElement',
            'msFullscreenEnabled',
            'MSFullscreenChange',
            'MSFullscreenError'
        ]
    ],

    initialize: function () { // (Object)
        this.raw = this._api();
    },

    request: function (elem) {
        var request = this.raw.requestFullscreen;

        elem = elem || document.documentElement;
        elem[request](Element.ALLOW_KEYBOARD_INPUT);
    },

    exit: function () {
        document[this.raw.exitFullscreen]();
    },

    isFullscreen: function () {
        return !!document[this.raw.fullscreenElement];
    },

    _api: function () {
        var api = {},
            apiMap = this._apiMap;

        apiMap.forEach(function (val) {
            if (val && val[1] in document) {
                val.forEach(function (method, i) {
                    api[apiMap[0][i]] = method;
                });
            }
        });

        return api.requestFullscreen ? api : false;
    }
});

DG.screenfull = new  DG.Screenfull();
