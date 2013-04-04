var fs = require('fs');

/**
 *  Demo using:
 *
 *  var config = getConfig("./src");
 *  var content = fs.readFileSync("./src/DGLayer/src/DGLayer.js", "utf8");
 *  console.log(ParseContent(content, config));
 */



/**
 * Reeturn actual configuration for replace
 * @param path to config dir
 * @returns {Object} config to replace
 */
function getConfig(path) {
    if (fs.existsSync(path + "/config.main.json")) {
        var configFile = fs.readFileSync(path + "/config.main.json", 'utf8'),
            config = JSON.parse(configFile);

        if (fs.existsSync(path + "/config.local.json")) {
            var configLocalFile = fs.readFileSync(path + "/config.local.json"),
                configLocal = JSON.parse(configLocalFile);
            for (var i in configLocal) {
                config[i] = configLocal[i];
            }
        }
        return config;
    } else {
        throw new Error("Not search file 'config.main.json' in '" + path + "'");
    }

}
/**
 * Replaces the content according to the configuration files
 * @param {String}  content to replace
 * @param {Object} config to replace
 * @returns {String} modified content
 *
 */
function ParseContent(content, config) {

    for (var pattern in config ) {
        content = content.replace("__" + pattern + "__", config[pattern]);
    }

    return content;
}

exports.getConfig = getConfig;
exports.parse = ParseContent;

