var util = require('gulp-util');
var gulp = require('gulp');

var error = require('../util/error');
var projectList = require('../util/projectList');
var config = require('../../build/config.js');
var webapiProjects = require('../../build/2gis-project-loader')(config);

gulp.task('loadProjectList', function (cb) {
    webapiProjects(function (err, projects) {
        if (err) {
            var error = new util.PluginError({
                plugin: 'webapiProjects',
                message: err
            });

            error.notify(error);
        }

        var projectListString = 'DG.fallbackProjectsList = JSON.parse(\'' +
            JSON.stringify(projects) +
            '\')';

        projectList.set(projectListString);

        cb();
    });
});
