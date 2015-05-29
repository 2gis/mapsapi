var request = require('request');
var util = require('gulp-util');
var gulp = require('gulp');

var projectList = require('../util/projectList');
var config = require('../../build/config.js');

gulp.task('loadProjectList', function (cb) {
    if (projectList.get()) {
        return cb();
    }

    var fields = [
        'items.bounds',
        'items.zoom_level',
        'items.time_zone',
        'items.code',
        'items.flags',
        'items.country_code',
        'items.domain'
    ].join(',');

    var protocol = config.appConfig.protocol;
    var apiServer = config.appConfig.webApiServer;
    var apiVersion = config.appConfig.webApiVersion;
    var apiKey = config.appConfig.webApiKey;

    var url = protocol + apiServer + '/' + apiVersion + '/region/list?key=' + apiKey + '&fields=' + fields;

    request(url, function (err, res, body) {
        if (err) {
            var error = new util.PluginError({
                plugin: 'loadProjectList',
                message: err
            });

            error.notify(error);

            return cb();
        }

        var data = JSON.parse(body);

        var projects = data.result.items;

        var projectListString = 'DG.fallbackProjectsList = JSON.parse(\'' +
            JSON.stringify(projects) +
            '\');';

        projectList.set(projectListString);

        cb();
    });
});
