(function () {
    'use strict';

    var baseURL,
        isLazy = false,
        isApiRequested = false,
        queryString,
        version = 'v=8210d6';

    function processURL() {
        var scripts = document.getElementsByTagName('script');

        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].getAttribute('data-id') === 'dgLoader') {
                return scripts[i].src.split('?');
            }
        }
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

        for (i = length - 1; i >= 0; i--) {
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

    function DOMContentLoaded() {
        if (document.addEventListener) {
            document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
        } else if (document.readyState === 'complete') {
            document.detachEvent('onreadystatechange', DOMContentLoaded);
        }
    }

    function ready () {
        loadJS(baseURL + 'js' + queryString);
    }

    function subcribeToDOMLoaded() {
        if (document.readyState === 'complete') {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout(ready, 1);
        } else if ( document.addEventListener ) {
                document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
                window.addEventListener( 'load', ready, false );
        } else {
            document.attachEvent('onreadystatechange', DOMContentLoaded);
            window.attachEvent('onload', ready);
            // If IE and not a frame
            // continually check to see if the document is ready
            var top = false;
            try {
                top = window.frameElement === null && document.documentElement;
            } catch(e) {}

            if (top && top.doScroll) {
                (function doScrollCheck() {
                    if (!jQuery.isReady) { // HANDLE!!!
                        try {
                            // Use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            top.doScroll('left');
                        } catch(e) {
                            return setTimeout(doScrollCheck, 50);
                        }
                        ready();
                    }
                })();
            }
        }
    }

    function loadApi() {
        loadCSS(baseURL + 'css' + queryString);

        subcribeToDOMLoaded();
        isApiRequested = true;
    }

    baseURL = getBaseURL();
    queryString = getParams();
    isLazy = (queryString.indexOf('lazy=true')  > -1);
    //load api in normal mode
    !isLazy && loadApi();

    window.L = window.L || {};
    window.L.DG = {};
    window.dgApi_callbacks = [];
    window.__dgApi_params = parseQueryString(queryString);

    window.L.DG.then = function (callback) {
        if (isLazy) {
            //load api on demand
            if (!isApiRequested) { loadApi(); }
        }

        dgApi_callbacks.push(callback);

        return this;
    };
})();
