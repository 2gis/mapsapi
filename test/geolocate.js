(function(window, navigator) {
    var exports = {},
        watcherId = 0,
        successData = {
            accuracy: 50,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 54.9799,
            longitude: 82.89683699999999,
            speed: null
        },
        errorData = {
            code: 1,
            message: 'The acquisition of the geolocation information failed because the page didn\'t have the permission to do it.'
        };

    var getCurrentPositionArguments = [],
        watchPositionArguments = {},
        _navigatorGeolocation,
        _geolocate = window.geolocate;

    var changeGeolocation = function(object) {
        if (Object.defineProperty) {
            Object.defineProperty(navigator, 'geolocation', {
                get: function() {
                    return object;
                }
            });
        } else if (navigator.__defineGetter__) {
            navigator.__defineGetter__('geolocation', function() {
                return object;
            });
        } else {
            throw new Error('Cannot change navigator.geolocation method');
        }
    };

    exports.use = function() {
        _navigatorGeolocation = navigator.geolocation;

        changeGeolocation({
            getCurrentPosition: function(success, error, opt) {
                getCurrentPositionArguments.push(arguments);
            },
            watchPosition: function(success, error, opt) {
                getCurrentPositionArguments.push(arguments);
                watcherId++;
                watchPositionArguments[watcherId] = arguments;
                return watcherId;
            },
            clearWatch: function(i) {
                if (watchPositionArguments[i]) {
                    delete watchPositionArguments[i];
                }
            }
        });

        return this;
    };

    exports.restore = function() {
        if (_navigatorGeolocation) {
            changeGeolocation(_navigatorGeolocation);
        } else {
            delete navigator.geolocation;
        }

        getCurrentPositionArguments = [];
        watchPositionArguments = {};

        return this;
    };

    var getSuccessData = function(options) {
        options = options || {};

        var data = {
            coords: {}
        }, i;

        for (i in successData) {
            if (options.hasOwnProperty(i)) {
                successData[i] = options[i];
            }
        }

        if (options.lat !== undefined) {
            successData.latitude = options.lat;
        }

        if (options.lng !== undefined) {
            successData.longitude = options.lng;
        }

        for (i in successData) {
            data.coords[i] = successData[i];
        }

        if (options.timestamp !== undefined) {
            data.timestamp = options.timestamp;
        } else {
            data.timestamp = Date.now();
        }

        return data;
    };

    var getErrorData = function(options) {
        options = options || {};

        var data = {};

        if (options.code !== undefined) {
            data.code = options.code;
        } else {
            data.code = errorData.code;
        }

        if (options.message !== undefined) {
            data.message = options.message;
        } else {
            data.message = errorData.message;
        }

        return data;
    };

    exports.send = function(options) {
        var max = getCurrentPositionArguments.length,
            i;

        if (max === 0) return;

        for (i = 0; i < max; i++) {
            if (typeof getCurrentPositionArguments[i][0] === 'function') {
                getCurrentPositionArguments[i][0](getSuccessData(options));
            }
        }

        getCurrentPositionArguments = [];

        return this;
    };

    exports.sendError = function() {
        var max = getCurrentPositionArguments.length,
            i;

        if (max === 0) return;

        for (i = 0; i < max; i++) {
            if (typeof getCurrentPositionArguments[i][1] === 'function') {
                getCurrentPositionArguments[i][1](getErrorData(options));
            }
        }

        getCurrentPositionArguments = [];

        return this;
    };

    exports.change = function(options) {
        for (var i in watchPositionArguments) {
            if (typeof watchPositionArguments[i][0] === 'function') {
                watchPositionArguments[i][0](getSuccessData(options));
            }
        }

        return this;
    };

    exports.changeError = function(options) {
        for (var i in watchPositionArguments) {
            if (typeof watchPositionArguments[i][1] === 'function') {
                watchPositionArguments[i][1](getErrorData(options));
            }
        }

        return this;
    };

    exports.noConflict = function() {
        if (_geolocate !== undefined) {
            window.geolocate = _geolocate;
        } else {
            delete window.geolocate;
        }

        return exports;
    };

    window.geolocate = exports;
})(window, navigator);
