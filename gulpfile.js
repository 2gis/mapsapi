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
    fs = require('fs'),
    clean = require('gulp-clean');
    // data_uri = require('gulp-data-uri');

var modules = (function getModules() {
    var source = config.source;
    return addBasePath(Object.keys(source)
        .map(function (creator) {//adding proper path to every module
            var pack = source[creator].deps;
            return Object.keys(pack).reduce(function (obj, name) {
                pack[name].path = source[creator].path;
                obj[name] = pack[name];
                return obj;
            }, {});
        })
        .reduce(function (obj, pack) {
            Object.keys(pack).forEach(function (module) {
                obj[module] = pack[module];
            });
            return obj;
        }, {})
        );
})();

function addBasePath (modules) {//adding base path on every file
    return Object.keys(modules)
        .map(function (name) {
            var module = modules[name],
                path = module.path;
            module.name = name;
            module.js = module.js || module.src;

            function addPath (file) {
                return path + file;
            };

            module.js = module.js.map(addPath);

            var css = module.css;
            if (css) {//if module has css we iterate in all his supported browsers and add path
                module.css = Object.keys(css)
                    .reduce(function (obj, browser) {
                        obj[browser] = css[browser].map(addPath);
                        return obj;
                    }, {})
            }
            return module;
        })
        .reduce(function (obj, module) {
            obj[module.name] = module;
            return obj;
        }, {})
        ;
}

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
            return module.js;
        })
        .reduce(function (array, items) {
            return array.concat(items);
        })
        .filter(function (item, key, list) {//filter dublicates
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
        .reduce(function (array, items) {
            return array.concat(items);
        })
        .reduce(function (array, item) {
            if (item.indexOf('{skin}') > -1) {
                array.push(item.replace('{skin}', 'basic'));
            }
            return array.concat(item);
        }, [])
        .map(function (file) {
            return file.replace('{skin}', 'light');
        })
        .filter(fs.existsSync)
        ;
}

gulp.task('test', function () {
    // console.log(addBasePath(modules));
    // getJSFiles();
    console.log(getJSFiles());
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

function bldjs() {
    return gulp.src(getJSFiles())
               .pipe(concat('main.js'));
}

gulp.task('build-scripts', ['build-clean'], function () {
    return bldjs();
});

/*gulp.task('build-styles', function (module, files) {
            //.pipe(concat('all.css'))
            .pipe(gulp.dest('./dist'))
            .pipe(rename('min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./dist'));
});*/

gulp.task('templates', function () {
    gulp.src(['/home/dlutsik/projects/mapsapi-folder/src/DGLocation/skin/light/css/DGLocation.css'])
        .pipe(data_uri())
        .pipe(gulp.dest('dest/64.css'));
});

gulp.task('build-clean', function () {
    return gulp.src('./dist', {read: false}).pipe(clean());
});

module.exports = function () {
    return bldjs();
};
