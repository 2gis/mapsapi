(function() {
    'use strict';

    var onLoadJS = function() {},
        paramsURI,
        paramsIE;

    function initLoaders() {
        window.L = {} || window.L;
        window.L.onLoad = function(callback) {
            onLoadJS = callback;
        };
    }

    function getParamsURI() {
        var scripts, scriptURI, url;
        scripts = document.getElementsByTagName("script");
        scriptURI = scripts[scripts.length-1].src;
        url = scriptURI.split('?');
        return (url[1]) ? '?' + url[1] : '';
    }

    function getParamsIE() {
        var versionIE;
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            versionIE = parseInt(RegExp.$1, 10);
        }
        return (versionIE && versionIE < 9) ? '&ie=true' : '';
    }

    function loadCSS(link) {
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', link);
        document.getElementsByTagName('head')[0].appendChild(css);
    }

    function loadJS(link, callback) {
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');

        if (js.readyState) {
            js.onreadystatechange = function() {
                if (js.readyState === 'loaded' || js.readyState === 'complete') {
                    js.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            js.onload = function() {
                callback();
            };
        }

        js.setAttribute('src', link);
        document.getElementsByTagName('head')[0].appendChild(js);
    }

    initLoaders();

    paramsURI = getParamsURI();
    paramsIE = getParamsIE();

    loadCSS('/css' + paramsURI + paramsIE);
    loadJS('/js' + paramsURI + paramsIE, function() {
        onLoadJS();
    });

})();