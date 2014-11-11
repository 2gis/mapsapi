module.exports = function (config) {
    'use strict';
    var request = require('request');

    var fields = [
        'bounds',
        'zoom_level',
        'time_zone',
        'code',
        'flags',
        'country_code',
        'domain'
    ].map(function (param) {
        return 'items.' + param;
    }).join('%2C');

    var apiServer = config.appConfig.RELATIVE_URL.WEB_API_SERVER,
        apiVersion = config.appConfig.WEB_API_VERSION,
        apiKey = config.appConfig.WEB_API_KEY,

        url = 'http:' + apiServer + '/' + apiVersion + '/region/list?key=' + apiKey + '&fields=' + fields;

    function isNull(project) {
        return project.bound !== null;
    }

    function load(cb) {
        request(url, function (err, resp, body) {
            if (err) {
                return cb(err);
            }
            var data = JSON.parse(body);
            cb(null, data.result.items.filter(isNull));
        });
    }

    return load;
};
