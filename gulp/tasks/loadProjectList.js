var request = require('request');
var util = require('gulp-util');
var gulp = require('gulp');

var error = require('../util/error');
var projectList = require('../util/projectList');
var config = require('../../build/config.js');

gulp.task('loadProjectList', function (cb) {
    var fields = [
        'items.bounds',
        'items.zoom_level',
        'items.time_zone',
        'items.code',
        'items.flags',
        'items.country_code',
        'items.domain'
    ].join(',');

    var apiServer = config.appConfig.RELATIVE_URL.WEB_API_SERVER;
    var apiVersion = config.appConfig.WEB_API_VERSION;
    var apiKey = config.appConfig.WEB_API_KEY;

    var url = 'http:' + apiServer + '/' + apiVersion + '/region/list?key=' + apiKey + '&fields=' + fields;

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

        var projects = data.result.items.filter(function(project) {
            return project.bound !== null;
        });

        var projectListString = 'DG.fallbackProjectsList = JSON.parse(\'' +
            JSON.stringify(projects) +
            '\')';

        projectList.set(projectListString);

        cb();
    });
});
