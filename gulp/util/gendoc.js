var fs = require('fs'),
    marked = require('marked'),
    mkdirp = require('mkdirp');

function walkItem(menu, callback) { // (Object, Function)
    for (var item in menu) {
        var content = menu[item].content;
        if (content) {
            if (content.ru && content.ru._src) {
                callback(menu[item].content.ru._src);
            }
            if (content.en && content.en._src) {
                callback(menu[item].content.en._src);
            }
        }
        if (menu[item].children) {
            walkItem(menu[item].children, callback);
        }
    }
}

function getMdFileNames() { // (Object) -> Object
    var menu = require('../../src/menu.json'),
        result = [];
    walkItem(menu, function(filepath) {
        result.push(filepath);
    });
    return result;
}

function getMdFilesData(list, subdir) { // (Array, String) -> Array
    var sorce = [],
        dir = subdir || '',
        listLeng = list.length;

    for (var i = 0; i < listLeng; i++) {
        var fullFilePath = dir + list[i];
        if (fs.existsSync(fullFilePath)) {
            var md = {};
            md.path = list[i];
            md.content = fs.readFileSync(fullFilePath);
            sorce.push(md);
        }

    }
    return sorce;
}

function copyConfigFile(filepath, destpath) { // (String, String)
    var configName = filepath.match(/[^/]+$/)[0];

    mkdirp(destpath, function() {
        fs.writeFileSync(destpath + '/' + configName, fs.readFileSync(filepath));
    });
}

function writeFile(dir, htmlFileName, html) {
    mkdirp(dir, function() {
        fs.writeFileSync(dir + '/' + htmlFileName, html);
    });
}

// Usage: generateDocumentation('menu.json', './src', './doc')
function generateDocumentation(config, rootPath, destPath) { // (Object, String, String)
    var mdFileNames = getMdFileNames(),
        mdData = getMdFilesData(mdFileNames, rootPath);

    for (var i = 0, leng = mdData.length; i < leng; i++) {
        (function(i) {
            var mdFilePath = mdData[i].path,
                htmlFileName = mdFilePath.match(/([\w_-]+)\.md$/i)[1] + '.html',
                pluginDirName = mdFilePath.match(/\/?(.*)\/[.\w_-]+$/)[1],
                renderer = new marked.Renderer(),
                tocHtml = generateTableOfContents(marked.lexer(mdData[i].content.toString())),
                headerRepeats = {},
                dir = destPath + '/' + pluginDirName + '/',
                html;

            renderer.listitem = function(text) {
                return '<li><div class="restore-color">' + text + '</div></li>';
            };

            renderer.heading = function(text, level) {
                if (typeof headerRepeats[text] === 'undefined') {
                    headerRepeats[text] = 0;
                } else {
                    headerRepeats[text]++;
                }
                return '<h' + level + ' id="' + getHeaderId(text, headerRepeats[text]) + '">' + text + '</h' + level + '>';
            };

            html = marked(mdData[i].content.toString(), {
                renderer: renderer
            });

            html = html.replace('<ul>', '<ul class="list-v-disc">');
            html = html.replace(/\{toc}/g, tocHtml);

            writeFile(dir, htmlFileName, html);
        })(i);
    }

    copyConfigFile(config, destPath);
}

function generateTableOfContents(tokens) { // (Array) -> String
    // generate ToC for H2, H3, ...
    var prevDepth = 2,
        startH = prevDepth,
        tocHtml = '',
        headers = [],
        headerRepeats = {};

    // extract headers from all tokens
    tokens.forEach(function(token) {
        if (token.type === 'heading' && token.depth > startH) headers.push(token);
    });

    // assign number for each header
    headers.forEach(function(header) {
        if (typeof headerRepeats[header.text] === 'undefined') {
            headerRepeats[header.text] = 0;
        }
        else {
            headerRepeats[header.text]++;
        }
        header.num = headerRepeats[header.text];
    });

    // generate html
    for (var j = 0; j < headers.length; j++) {
        var header = headers[j],
            nextHeader = headers[j+1];

        header.text = '<a href="#' + getHeaderId(header.text, header.num) + '">' + header.text + '</a>';

        if (header.depth > prevDepth) { // enter to the list
            tocHtml += prevDepth === startH ? '<ul class="page-contents">' : '<ul>';
            tocHtml += '<li>' + header.text;
        }
        else if (header.depth === prevDepth) { // move by list
            tocHtml += '<li>' + header.text;
        }
        else if (header.depth < prevDepth) {
            tocHtml += '</ul></li>';
            tocHtml += '<li>' + header.text;
        }

        // if hasn't childs
        if (typeof nextHeader === 'undefined' || nextHeader.depth <= header.depth) {
            tocHtml += '</li>';
        }
        // if last header
        if (typeof nextHeader === 'undefined') {
            tocHtml += '</ul>';
        }

        prevDepth = header.depth;
    }
    tocHtml = '<dl class="api-incut">' + tocHtml + '</dl>';

    return tocHtml;
}

function getHeaderId(text, num) { // (String, Number) -> String
    var id = text.toLowerCase().replace(' ', '-');
    id = id.replace('.', '');
    id = num > 0 ? id + '-' + num : id;
    return id;
}

exports.generateDocumentation = generateDocumentation;
