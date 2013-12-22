L.DG.plugin = function (plugins) {

    if ([].isArray(plugins)) {
        plugins.forEach(function (plugin) {
            appendScript(plugin);
        });
    }

    function appendScript(link) {
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', link);
        document.getElementsByTagName('head')[0].appendChild(js);
    }
}
