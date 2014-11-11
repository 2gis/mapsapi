(function () {
    'use strict';

    var baseURL,
        isLazy = false,
        isJsRequested = false,
        queryString,
        rejects = [],
        version = 'v2.0.25';

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
        return (versionIE && versionIE < 9) ? 'ie8=true&' : '';
    }

    function getParamsSprite() {
        var mobile = (typeof orientation !== undefined + ''),
            svg = !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);

        return  (mobile || !svg) ? 'sprite=true&' : 'sprite=false&';
    }

    function getParamsMobile() {
        return  (typeof orientation !== 'undefined') ? 'mobile=true&' : 'mobile=false&';
    }

    function getParamsSvg() {
        var isSvgSupported = !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);

        return  isSvgSupported ? 'svg=true&' : 'svg=false&';
    }

    function getParams() {
        var paramsURI = getParamsURI(),
            sprite = paramsURI.indexOf('sprite') === -1 ? getParamsSprite() : '',
            paramsIE = getParamsIE();
        return '?' + paramsURI + paramsIE + sprite + 'version=' + version;
    }

    function getDebugParam() {
        return getParamsURI().indexOf('mode=debug') > -1;
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
        js.onerror = function (err) {
            runRejects(err);
        };
        //IE
        js.onreadystatechange = function (err) {
            if (js.readyState !== 'complete' && js.readyState !== 'loaded') {
                runRejects(err);
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
        loadJS(baseURL + 'js/' + queryString);
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

    function loadProjectList() {
        var url = '__WEB_API_SERVER__/__WEB_API_VERSION__/region/list';

        return new Promise(function (resolve, reject) {
            DG.ajax(url, {
                type: 'get',
                data: {
                    key: '__WEB_API_KEY__',
                    fields: '__REGION_LIST_FIELDS__'
                },
                success: function (data) {
                    var result = data.result;
                    if (result && result.items && result.items.length) {
                        DG.projectsList = result.items.filter(function (project) {
                            return project.bound !== null;
                        });
                    }

                    resolve();
                },
                error: function () {
                    resolve();
                }
            });
        });
    }

    function runRejects() {
        for (var i = 0, len = rejects.length; i < len; i++) {
            (typeof(rejects[i]) === 'function') && rejects[i]();
        }
    }

    function loadApi() {
        loadCSS(baseURL + 'css/' + queryString);
        requestJs();
    }

    window.DG = window.DG || {};
    window.DG.ready = false;
    window.__dgApi__ = {
        callbacks: [[loadProjectList, undefined], [setReady, undefined]],
        debug: getDebugParam(),
        version: version
    };

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

        window.__dgApi__.callbacks.push([resolve, reject]);
        reject && rejects.push(reject);

        return this;
    };
})();
