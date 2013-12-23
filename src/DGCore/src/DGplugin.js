L.DG.plugin = function (plugins) {
    var count, assetInterval;

    L.DG.plugDef = L.DG.when.defer();

    if ([].isArray(plugins)) {
        count = plugins.length;
        plugins.forEach(function (plugin) {
            appendScript(plugin);
        });
    }

    if (typeof plugins === 'string') {
        count = 1;
        appendScript(plugins);
    }

    assetInterval = window.setInterval(checkLoading, 100);

    function checkLoading() {
        if (count === 0) {
            L.DG.plugDef.resolve();
            clearInterval(assetInterval);
            console.log('resolved');
        }
    }

    function appendScript(link) {

        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', link);
        js.onload = function () {
            count--;
            console.log('suc!');
        };
        js.onreadystatechange = function () {
            //count--;
            console.log(arguments);
        };
        document.getElementsByTagName('head')[0].appendChild(js);
    }

    L.DG.plugDef.promise.then(handlers[1]);
    return L.DG.plugDef.promise;
}
