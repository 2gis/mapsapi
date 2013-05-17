var fs = require('fs'),
    marked = require('marked'),
    grunt = require('grunt');

function walkItem(menu, callback) {
    for (var item in menu) {
        if (menu[item].content.ru._src) {
            callback(menu[item].content.ru._src);
        }
        if (menu[item].children) {
            walkItem(menu[item].children, callback);
        }
    }
}
/**
 * Get list all file to convert
 *
 * @param {Object} config json
 */
function getMdFileNames(config) {
    var menu = grunt.file.readJSON(config),
        result = [];
    walkItem(menu, function (filepath) {
        result.push(filepath);
    });
    return result;
}
/**
 * Get content of source .md files all modules
 * @param {Array} list source
 * @param {String} subdir path to plugin
 */
function getMdFilesData(list, subdir) {
    var sorce = [],
        dir = subdir || '',
        listLeng = list.length;

    for (var i = 0; i < listLeng; i++) {
        var fullFilePath = dir + list[i];
        if (grunt.file.exists(fullFilePath)) {
            var md = {};
            md.path = list[i];
            md.content = grunt.file.read(fullFilePath);
            sorce.push(md);
        }

    }
    return sorce;
}
/**
 * Copy menu to destination folder
 *
 * @param {String} filepath
 * @param {String} destpath
 */
function copyConfigFile(filepath, destpath) {
    var configName = filepath.match(/[^/]+$/)[0];
    grunt.file.copy(filepath, destpath + '/' + configName);
}

/**
 * @param {Object} config file path
 * @param {String} rootPath  plugins
 * @param {String} destPath convert file
 *
 * Example;
 *     generateDocumentation('menu.json', './src', './doc')
 */

function generateDocumentation(config, rootPath, destPath) {
    var mdFileNames = getMdFileNames(config),
        mdData = getMdFilesData(mdFileNames, rootPath);

    for (var i = 0, leng = mdData.length; i < leng; i++) {
        var mdFilePath = mdData[i].path,
            htmlFileName = mdFilePath.match(/[^/]+(?=\.(md))/gi)[0].toLowerCase() + '.html',
            pluginDirName = mdFilePath.match(/^[\/]?([\w]+)/gi)[0].toLowerCase(),
            html = marked(mdData[i].content);

        grunt.file.write(destPath + '/' + pluginDirName + '/' + htmlFileName, html);
    }

    copyConfigFile(config, destPath);
}


exports.generateDocumentation = generateDocumentation;