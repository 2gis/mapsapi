(function () {
    'use strict';

    var baseURL,
        isLazy = false,
        isJsRequested = false,
        queryString,
        rejects = [],
        version = 'v2.0.29.1';

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

    function loadCSS() {
        var link = baseURL + 'css/' + queryString;

        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', link);
        document.getElementsByTagName('head')[0].appendChild(css);
    }

    function loadJS() {
        var link = baseURL + 'js/' + queryString;

        isJsRequested = true;

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

    function setReady() {
        DG.ready = true;
    }

    function waitForPageLoad() {
        return new Promise(function (resolve, reject) {
            if (document.readyState === 'complete') {
                return resolve();
            }

            if (window.addEventListener) {
                window.addEventListener('load', resolve, false);
            } else {
                window.attachEvent('onload', resolve);
            }
        });
    }

    function loadProjectList() {
        var url = '__WEB_API_SERVER__/__WEB_API_VERSION__/region/list';

        // При необходимости меняем у ссылки протокол
        var protocol = window.location.protocol == 'http:' ? 'http:' : 'https:';
        url = url.replace(/^https?:/, protocol);

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

    window.DG = window.DG || {};
    window.DG.ready = false;
    window.__dgApi__ = {
        callbacks: [
            [waitForPageLoad, undefined],
            [loadProjectList, undefined],
            [setReady, undefined]
        ],
        debug: getDebugParam(),
        version: version
    };

    baseURL = getBaseURL();
    queryString = getParams();
    isLazy = (queryString.indexOf('lazy=true')  > -1);

    loadCSS();
    if (!isLazy) {
        loadJS();
    }

    window.DG.then = function (resolve, reject) {
        if (isLazy && !isJsRequested) {
            loadJS();
        }

        window.__dgApi__.callbacks.push([resolve, reject]);
        reject && rejects.push(reject);

        return this;
    };
})();
