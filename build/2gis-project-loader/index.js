'use strict';
var request = require('request');

var fields = [
    'bound',
    'max_zoom_level',
    'min_zoom_level',
    'time_zone_as_offset',
    'code',
    'has_traffic',
    'has_transport',
    'country_code'
].map(function (param) {
    return 'data.' + param;
}).join('%2C');

var url = 'http://catalog.api.2gis.ru/2.0/search?key=rujrdp3400&fields=' + fields + '&type=project&lang=all';

function wktToBnd(wkt) {
    var arr,
        pointsArr,
        bracketsContent,
        regExp,
        southWest,
        northEast;

    wkt = wkt.replace(/, /g, ',');
    wkt.replace(' (', '(');

    arr = /^POLYGON\((.*)\)/.exec(wkt);
    regExp = /\((.*?)\)/g;

    bracketsContent = (regExp).exec(arr[1]);
    pointsArr = bracketsContent[1].split(',');
    southWest = pointsArr[0].split(' ');
    northEast = pointsArr[2].split(' ');

    return [
        [parseFloat(southWest[1]), parseFloat(southWest[0])],
        [parseFloat(northEast[1]), parseFloat(northEast[0])]
    ];
}

function parse(item) {
    return {
        code: item.code,
        /*jshint camelcase: false */
        minZoom: item.min_zoom_level,
        maxZoom: item.max_zoom_level,
        timeOffset: item.time_zone_as_offset,
        traffic: item.has_traffic,
        bound: wktToBnd(item.bound),
        transport: item.has_transport,
        country_code: item.country_code
    };
}

function isNull(project) {
    return project.bound !== null;
}

function load(cb) {
    request(url, function (err, resp, body) {
        if (err) {
            return cb(err);
        }
        var data = JSON.parse(body);
        cb(null, data.result.data.filter(isNull).map(parse));
    });
}

module.exports = load;
