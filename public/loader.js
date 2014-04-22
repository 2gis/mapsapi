(function () {
    'use strict';

    var baseURL,
        isLazy = false,
        isJsRequested = false,
        queryString,
        rejects = [],
        version = window.__dgApi_version = 'v=15f5c0';

    function processURL() {
        var scripts = document.getElementsByTagName('script');

        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].getAttribute('data-id') === 'dgLoader') {
                return scripts[i].src.split('?');
            }
        }

        //delete it!
        return fallbackLoaderSearch();
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
        js.onerror = function () {
            runRejects();
        };
        //IE
        js.onreadystatechange = function () {
            if (js.readyState !== 'complete' && js.readyState !== 'loaded') {
                runRejects();
            }
        };

        document.getElementsByTagName('head')[0].appendChild(js);
    }

    function DOMContentLoaded() {
        if (document.addEventListener) {
            document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
        } else if (document.readyState === 'complete') {
            document.detachEvent('onreadystatechange', DOMContentLoaded);
        }
    }

    function ready() {
        loadJS(baseURL + 'js' + queryString);
    }

    function requestJs() {
        isJsRequested = true;
        if (document.readyState === 'complete') {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            setTimeout(ready, 1);
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
            window.addEventListener('load', ready, false);
        } else {
            document.attachEvent('onreadystatechange', DOMContentLoaded);
            window.attachEvent('onload', ready);
            // If IE and not a frame
            // continually check to see if the document is ready
            var top = false;
            try {
                top = window.frameElement === null && document.documentElement;
            } catch (e) {}

            if (top && top.doScroll) {
                (function doScrollCheck() {
                    if (!DG.ready) {
                        try {
                            // Use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            top.doScroll('left');
                        } catch (e) {
                            return setTimeout(doScrollCheck, 50);
                        }
                        ready();
                    }
                })();
            }
        }
    }

    function setReady() {
        DG.ready = true;
    }

    function runRejects() {
        for (var i = 0, len = rejects.length; i < len; i++) {
            (typeof(rejects[i]) === 'function') && rejects[i]();
        }
    }

    function loadApi() {
        loadCSS(baseURL + 'css' + queryString);
        requestJs();
    }

    window.L = window.L || {};//for temporary fallback, delete it
    window.DG = {};
    window.DG.ready = false;
    window.__dgApi_callbacks = [];
    window.__dgApi_callbacks.push(setReady);

    baseURL = getBaseURL();
    queryString = getParams();
    isLazy = (queryString.indexOf('lazy=true')  > -1);
    //load api in normal mode
    !isLazy && loadApi();

    window.DG.then = function (resolve, reject) {
        if (isLazy) {
            //load api on demand
            if (!isJsRequested) { loadApi(); }
        }

        window.__dgApi_callbacks.push(resolve);
        reject && rejects.push(reject);

        return this;
    };

    //temporary fallback, delete it
    window.L.onLoad = window.DG.then;

    function fallbackLoaderSearch() {
        var scripts, scriptURL;
        scripts = document.getElementsByTagName('script');
        scriptURL = scripts[scripts.length - 1].src;
        return scriptURL.split('?');
    }

})();
