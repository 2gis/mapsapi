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

function getModules () {
    return Object.keys(config.source)
        .map(function (creator) {
            // basePath = source[creator].path;
            return config.source[creator].deps;
        })
        .map(Object.keys)
        .reduce(function (array, item) {
            return array.concat(item);
        })
        ;
};

// Generates a list of modules by pkg
function getModulesList(pkg, isMsg) { //(String|Null, Boolean)->Array
    var modulesListOrig = ['Core'],
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

    if (isMsg) {
        console.log('\nBuild modules:');
    }

    modulesListOrig.forEach(function (moduleName) {
        if (moduleName in modules) {
            processModule(moduleName);
        } else {
            if (isMsg) {
                console.log(errMsg('  - ' + moduleName + ' (not found)'));
                errors.push('Unknown modules');
            }
        }
    });

    function processModule(moduleName) {
        if (!loadedModules[moduleName]) {
            getDepsList(moduleName);
            modulesListRes.push(moduleName);
            loadedModules[moduleName] = true;
            if (isMsg) {
                console.log('  * ' + moduleName);
            }
        }
    }

    function getDepsList(moduleName) {
        if (modules[moduleName] && modules[moduleName].deps) {
            var moduleDeps = modules[moduleName].deps;
            moduleDeps.forEach(function (module) {
                var moduleNameDeps = module;
                if (modules[moduleNameDeps] && modules[moduleNameDeps].deps) {
                    getDepsList(moduleNameDeps);
                }
                if (!loadedModules[moduleNameDeps]) {
                    modulesListRes.push(moduleNameDeps);
                    loadedModules[moduleNameDeps] = true;
                    if (isMsg) {
                        console.log(depsMsg('  + ' + moduleNameDeps + ' (deps of ' + moduleName + ')'));
                    }
                }
            });
        }
    }

    return modulesListRes;
};
gulp.task('test', function () {
    console.log(getModules());
});


gulp.task('build-deps', function (callback) {

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
                .pipe(concat(module + '.css'))
                .pipe(gulp.dest('./dist/' + module + '/css/'))
                .pipe(rename(module + '.min.css'))
                // .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/' + module + '/css/'));
        }

        if (stylesIE) {
            gulp.src(stylesIE)
                .pipe(concat(module + '.ie.css'))
                .pipe(gulp.dest('./dist/' + module + '/css/'))
                .pipe(rename(module + '.ie.min.css'))
                // .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/' + module + '/css/'));
        }
        callback(); // tell async that the iterator has completed

    });
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

gulp.task('build-clean', function () {
    return gulp.src('./dist').pipe(clean());
});

gulp.task('build', function (cb) {
    runSequence('build-clean', 'build-deps', cb);
});
