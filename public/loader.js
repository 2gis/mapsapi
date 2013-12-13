(function () {
    'use strict';

    var onLoadJs = function () {},
        baseURL,
        queryString,
        version = 'v=8210d6';

    function processURL() {
        var scripts, scriptURL;
        scripts = document.getElementsByTagName('script');
        scriptURL = scripts[scripts.length - 1].src;
        return scriptURL.split('?');
    }

    function getBaseURL() {
        var pattern = /loader.js/,
            url = processURL();
        return (url[0]) ? url[0].replace(pattern, '') : '/';
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

    function parseQueryString(queryString) {
        if (!queryString) {
            return {};
        }
        if (queryString[0] === '?') {
            queryString = queryString.slice(1);
        }
        var paramString = queryString.split('&'),
            length = paramString.length,
            buffer = {},
            param,
            i;

        for (i = 0; i < length; i++) {
            param = paramString[i].split('=');
            buffer[param[0]] = param[1];
        }
        return buffer;
    }

    function loadCSS(link) {
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', link);
        document.getElementsByTagName('head')[0].appendChild(css);
    }

    function loadJS(link) {
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', link);
        if (js.readyState) {
            js.onreadystatechange = function () {
                if (js.readyState === 'loaded' || js.readyState === 'complete') {
                    js.onreadystatechange = null;
                    onLoadJs();
                }
            };
        } else {
            js.onload = function () {
                onLoadJs();
            };
        }
        document.getElementsByTagName('head')[0].appendChild(js);
    }

    window.L = window.L || {};
    window.L.onLoad = function (callback) {
        onLoadJs = callback;
    };


    baseURL = getBaseURL();
    queryString = getParams();

    window.loaderBackup = parseQueryString(queryString);

    loadCSS(baseURL + 'css' + queryString);
    // load js on document ready
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            loadJS(baseURL + 'js' + queryString);
        }, false);
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState === 'complete') {
                loadJS(baseURL + 'js' + queryString);
            }
        });
    }

})();
