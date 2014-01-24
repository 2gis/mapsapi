DG.dust = function (name, data) {
    var result;
    dust.render(name, data, function (err, html) {
        result = html;
    });
    return result;
};