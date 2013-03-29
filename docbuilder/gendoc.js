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
function getListFileToConver(config) {
    var menu = grunt.file.readJSON(config);
    var result = [];
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
function getContentToConver(list, subdir) {
    var sorce = [],
        dir = subdir || '',
        listLeng = list.length;

    for (var i = 0; i < listLeng; i++) {
        var fullFilePath = dir + '/' + list[i];
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
function copyConfigFile(filepath, destpath){
    var configName = filepath.match(/[^/]+$/)[0];
    grunt.file.copy(filepath, destpath + '/' + configName);
}

/**
 * @param {Object} config file path
 * @param {String} rootdir  plugins
 * @param {String} destpath convert file
 *
 * Example;
 *     generateDocumentation('menu.json', './src', './doc')
 */

function generateDocumentation(config, rootdir, destpath) {
    var mdFileList = getListFileToConver(config);
    var sorceToConvert = getContentToConver(mdFileList, rootdir);

    for (var i = 0, leng = sorceToConvert.length; i < leng; i++) {
        var mdFilePath = sorceToConvert[i].path,
            htmlFileName = mdFilePath.match(/[^/]+(?=\.(md))/gi)[0].toLowerCase() + '.html',
            pluginDirName = mdFilePath.match(/^[\/]?([\w]+)/gi)[0].toLowerCase(),
            html = marked(sorceToConvert[i].content);

        grunt.file.write(destpath + '/' + pluginDirName + '/' + htmlFileName, html);
    }

    copyConfigFile(config, destpath);
}


exports.generateDocumentation = generateDocumentation;