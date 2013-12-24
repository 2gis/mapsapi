L.DG.plugin = function (plugins) {
    var count,
        pluginDef = L.DG.when.defer();

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

    function checkLoading() {
        if (count === 0) {
            pluginDef.resolve();
            console.log('resolved');
        }
    }

    function appendScript(link) {
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', link);
        js.onload = function () {
            console.log('suc!');
            count--;
            checkLoading();
        };
        js.onreadystatechange = function () {
            //count--;
            console.log('rsc', arguments);
        };

        document.getElementsByTagName('head')[0].appendChild(js);
    }

    return pluginDef.promise;
}
