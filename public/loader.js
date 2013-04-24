(function() {
    'use strict';

    var onLoadJS = function() {},
        baseURL,
        params,
        version = 'v=ac1a64';

    function initLoader() {
        window.L = {} || window.L;
        window.L.onLoad = function(callback) {
            onLoadJS = callback;
        };
    }

    function processURL() {
        var scripts, scriptURL;
        scripts = document.getElementsByTagName("script");
        scriptURL = scripts[scripts.length-1].src;
        return scriptURL.split('?');
    }

    function getBaseURL() {
        var pattern = /loader.js/,
            url = processURL();
        return (url[0]) ? url[0].replace(pattern, "") : '/';
    }

    function getParamsURI() {
        var url = processURL();
        return (url[1]) ? url[1] + '&' : '';
    }

    function getParamsIE() {
        var versionIE;
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            versionIE = parseInt(RegExp.$1, 10);
        }
        return (versionIE && versionIE < 9) ? 'ie=true&' : '';
    }

    function getParams() {
        var paramsURI = getParamsURI(),
            paramsIE = getParamsIE();
        return '?' + paramsURI + paramsIE + version;
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

    initLoader();

    baseURL = getBaseURL();
    params = getParams();

    loadCSS(baseURL + 'css' + params);
    loadJS(baseURL + 'js' + params, function() {
        onLoadJS();
    });

})();