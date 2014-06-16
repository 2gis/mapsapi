DG.dust = function (tmpl) {
    return function (name, data) {
        if (!dust.cache[name]) {
            dust.loadSource(tmpl[name]);
        }

        var result;

        dust.render(name, data, function (err, html) {
            result = html;
        });

        return result;
    };
};

if (DG.debug) { dust.debugLevel = 'ERROR'; }