var gulp = require('gulp'),
    async = require('async'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    // minifyCSS = require('gulp-minify-css'),
    // config = require('./build/deps.js').deps,
    config = require('./build/config.js').config,
    packages = require('./build/packs.js').packages,
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');
    // data_uri = require('gulp-data-uri');

var modules = (function getModules() {
    return Object.keys(config.source)
        .map(function (creator) {
            // basePath = source[creator].path;
            return config.source[creator].deps;
        })
        .reduce(function (obj, pack) {
            Object.keys(pack).forEach(function (module) {
                obj[module] = pack[module];
            });
            return obj;
        }, {})
        ;
})();

// Generates a list of modules by pkg
function getModulesList(pkg) { //(String|Null)->Array
    var modulesListOrig = [],
        modulesListRes = [],
        loadedModules = {};

    // Package name with no empty modules list on packs.js (example: 'base')
    if (pkg && pkg in packages && packages[pkg].modules.length > 0) {
        modulesListOrig = packages[pkg].modules;

    // Modules list (example: 'Core,JSONP,TileLayer')
    } else if (pkg && pkg.indexOf(',') > -1) {
        modulesListOrig = pkg.split(',');

    // Modules single (example: 'Core')
    } else if (pkg && pkg in modules) {
        modulesListOrig.push(pkg);

    // Others (null / full package / not correct value)
    } else {
        modulesListOrig = modulesListOrig.concat(Object.keys(modules));
    }

    modulesListOrig
        .forEach(processModule);

    function processModule(moduleNameDeps) {
        if (modules[moduleNameDeps] && modules[moduleNameDeps].deps) {
            getDepsList(moduleNameDeps);
        }
        if (!loadedModules[moduleNameDeps]) {
            modulesListRes.push(moduleNameDeps);
            loadedModules[moduleNameDeps] = true;
        }
    }

    function getDepsList(moduleName) {
        var moduleDeps = modules[moduleName].deps;
        if (moduleDeps) {
            moduleDeps.forEach(processModule);
        }
    }

    return modulesListRes;
}

function getJSFiles(pkg) {
    return getModulesList(pkg)
        .map(function (name) {
            return modules[name];
        })
        .map(function (module) {
            return module.src || module.js;
        })
        .reduce(function (array, items) {
            return array.concat(items);
        })
        .filter(function (item, key, list) {
            return list.indexOf(item) === key;
        })
        ;
}

function getCSSFiles(pkg, IE) {
    return getModulesList(pkg)
        .map(function (name) {
            return modules[name];
        })
        .map(function (module) {
            return module.css;
        })
        .filter(Boolean)
        .map(function (item) {
            return item.all;
        })
        // .reduce(function (array, items) {
        //     return array.concat(items);
        // })
        ;
}

gulp.task('test', function () {
    console.log(getCSSFiles());
});


gulp.task('build-deps', function (done) {

    async.each(Object.keys(config), function (module, callback) {
        console.log(module); // print the key

        var scripts = config[module].js,
            style = config[module].css,
            styles = style ? config[module].css.all : undefined,
            stylesIE = style ? config[module].css.ie : undefined;

        if (scripts)  {
            gulp.src(scripts)
                .pipe(concat(module + '.js'))
                .pipe(gulp.dest('./dist/' + module + '/js/'))
                .pipe(rename(module + '.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest('./dist/' + module + '/js/'));
        }

        if (styles) {
            gulp.src(styles)
                //.pipe(data_uri())
                .pipe(gulp.dest('./dist/' + module + '64.css'))
                .pipe(concat(module + '.css'))
                .pipe(gulp.dest('./dist/' + module + '/css/'))
                .pipe(rename(module + '.min.css'))
                // .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/' + module + '/css/'));
        }

        if (stylesIE) {
            gulp.src(stylesIE)
                //.pipe(data_uri())
                .pipe(concat(module + '.ie.css'))
                .pipe(gulp.dest('./dist/' + module + '/css/'))
                .pipe(rename(module + '.ie.min.css'))
                // .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/' + module + '/css/'));
        }
        callback(); // tell async that the iterator has completed

    }, done);
    /*Object.keys(config).forEach(function (module) {
        //console.log(module, config[module].js);

    });*/
});

/*gulp.task('build-scripts', function (module, files) {
    return gulp.src(files)
            .pipe(concat(module + '.js'))
            .pipe(gulp.dest('./dist/' + module + '/js/'))
            .pipe(rename(module + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/' + module + '/js/'));
});

gulp.task('build-styles', function (module, files) {
            //.pipe(concat('all.css'))
            .pipe(gulp.dest('./dist'))
            .pipe(rename('min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./dist'));
});*/

gulp.task('build-styles', function () {
    gulp.run('build-clean');

    gulp.src('src/**/*.css')
        //.pipe(concat('all.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist'));
});


gulp.task('templates', function () {
    gulp.src(['/home/dlutsik/projects/mapsapi-folder/src/DGLocation/skin/light/css/DGLocation.css'])
        .pipe(data_uri())
        .pipe(gulp.dest('dest/64.css'));
});

gulp.task('build-clean', function () {
    return gulp.src('./dist').pipe(clean());
});

gulp.task('build', function (cb) {
    runSequence('build-clean', 'build-deps', cb);
});
