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

var url = 'http://catalog.api.2gis.ru/2.0/region/list?key=rujrdp3400&fields=' + fields;

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

module.exports = load;
