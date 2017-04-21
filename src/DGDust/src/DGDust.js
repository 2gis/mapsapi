var dust = require('dustjs-linkedin');
require('dustjs-helpers');

DG.dust = function(name, data) {
    var result;

    // The callback is called synchronously, so this works
    dust.render(name, data, function(err, html) {
        result = html;
    });

    return result;
};
