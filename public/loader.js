(function () {
    'use strict';

    var onLoadJs = function () {},
        baseURL,
        queryString,
        version = 'v=8210d6';

    function processURL() {
        var scripts;
        scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].getAttribute('data-id') === 'dgLoader') {
                return scripts[i].src.split('?');
            }  
        };
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
        document.getElementsByTagName('head')[0].appendChild(js);
    }

    window.L = window.L || {};
    window.L.DG = {};
    window.__dgApi_callbacks = [];

    window.L.DG.then = function (callback) {
        __dgApi_callbacks.push(callback);

        return this;
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
