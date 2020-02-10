var request = require('request');
var PluginError = require('plugin-error');

var projectList = require('../util/projectList');
var config = require('../../app/config.js');
var errorNotifier = require('../util/error');

exports.loadProjectList = function loadProjectList(cb) {
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

    request(url, function(err, res, body) {
        if (err) {
            var error = new PluginError({
                plugin: 'loadProjectList',
                message: err
            });

            errorNotifier.notify(error);

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
};
