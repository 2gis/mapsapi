(function () {
    'use strict';

    var isJSRequested = false;
    var rejects = [];
    var version = 'v2.0.37';

    var url = (function () {
        var scripts = document.getElementsByTagName('script');

        for (var i = scripts.length; i;) {
            if (scripts[--i].getAttribute('data-id') == 'dgLoader') {
                return scripts[i].src.split('?');
            }
        }
    })();

    var baseURL = url[0].replace(/loader\.js$/, '');

    // Амперсанды с обоих сторон, это позволяет делать надёжный поиск параметров через `indexOf('&name=')` и
    // `indexOf('&name=value&')`. Без амперсандов прийдётся искать через `indexOf('name=')` и `indexOf('name=value')`,
    // в результате можем получить ложные совпадения.
    var urlParams = url[1] ? '&' + url[1] + '&' : '&';

    if (urlParams.indexOf('&retina=') == -1) {
        if (window.devicePixelRatio && window.devicePixelRatio >= 1.5) {
            urlParams += 'retina=true&';
        }
    }

    if (urlParams.indexOf('&ie8=') == -1) {
        // IE8
        if (/MSIE\x20(\d+\.\d+);/.test(navigator.userAgent) && parseInt(RegExp.$1, 10) < 9) {
            urlParams += 'ie8=true&';
        }
    }

    var qs = '?' + urlParams.slice(1) + 'version=' + version;
    var isLazy = urlParams.indexOf('&lazy=true&') != -1;

    function requestJS() {
        isJSRequested = true;

        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', baseURL + 'js/' + qs);

        script.onerror = function (evt) {
            runRejects(evt);
        };

        document.getElementsByTagName('head')[0].appendChild(script);
    }

    // Returns a promise that resolves once the DOM is ready. Based on
    // https://github.com/addyosmani/jquery.parts/blob/master/jquery.documentReady.js
    function ensureDOMReady() {
        return new Promise(function(resolve, reject) {
            var isResolved = false;

            function resolveOnce() {
                // Clean up all listeners we added
                if (document.addEventListener) {
                    document.removeEventListener('DOMContentLoaded', resolveOnce, false);
                    window.removeEventListener('load', resolveOnce, false);
                } else {
                    document.detachEvent('onreadystatechange', resolveOnce);
                    window.detachEvent('onload', resolveOnce);
                }

                if (isResolved) {
                    return;
                }

                isResolved = true;
                resolve();
            }

            // Scroll check hack for IE8
            function doScrollCheck() {
                if (isResolved) {
                    return;
                }

                try {
                    document.documentElement.doScroll('left');
                } catch (e) {
                    setTimeout(doScrollCheck, 50);
                    return;
                }

                resolveOnce();
            }

            // If the DOM is already ready, load JS immediately
            if (document.readyState !== 'loading') {
                return resolveOnce();
            }

            // Adding event listeners. We also listen to window load event as a
            // 'better late than never' fallback.
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', resolveOnce, false);
                window.addEventListener('load', resolveOnce, false);
            } else if (document.attachEvent) { // IE8
                document.attachEvent('onreadystatechange', resolveOnce);
                window.attachEvent('onload', resolveOnce);

                // Scroll check hack for IE8
                var isTopLevel = false;
                try {
                    isTopLevel = window.frameElement == null;
                } catch (e) {}
                if (document.documentElement.doScroll && isTopLevel) {
                    doScrollCheck();
                }
            }
        });
    }

    function loadStylesheet() {
        var url = baseURL + 'css/' + qs;
        var style = document.createElement('style');
        style.type = 'text/css';

        return new Promise(function (resolve, reject) {
            DG.ajax(url, {
                type: 'get',

                dataType: 'html',

                success: function (data) {
                    var head = document.getElementsByTagName('head')[0];

                    var originalBaseUrl = '__ORIGINAL_BASE_URL__';
                    var baseURL = DG.config.protocol + DG.config.baseUrl;

                    if (baseURL !== originalBaseUrl) {
                        data = data.replace(
                            new RegExp(originalBaseUrl, 'g'),
                            baseURL
                        );
                    }

                    if (style.styleSheet) {
                        head.appendChild(style);
                        style.styleSheet.cssText = data;
                    } else {
                        style.appendChild(document.createTextNode(data));
                        head.appendChild(style);
                    }

                    resolve();
                },

                error: function () {
                    reject();
                }
            });
        });
    }

    function loadProjectList() {
        var url = DG.config.protocol +
            DG.config.webApiServer + '/' +
            DG.config.webApiVersion + '/region/list';

        return new Promise(function (resolve) {
            DG.ajax(url, {
                type: DG.ajax.corsSupport ? 'get' : 'jsonp',

                data: {
                    format: DG.ajax.corsSupport ? 'json' : 'jsonp',
                    key: DG.config.webApiKey,
                    fields: DG.config.regionListFields
                },

                success: function (data) {
                    var result = data.result;

                    if (result && result.items && result.items.length) {
                        DG.projectsList = result.items;
                    }

                    resolve();
                },

                error: function () {
                    resolve();
                }
            });
        });
    }

    function extendConfig() {
        DG.extend(DG.config, __LOCAL_CONFIG__);
    }

    function prepareForInit() {
        return Promise.all([
            loadStylesheet(),
            loadProjectList(),
            ensureDOMReady()
        ]);
    }

    function setReady() {
        DG.ready = true;
    }

    function runRejects() {
        for (var i = 0, l = rejects.length; i < l; i++) {
            if (typeof rejects[i] == 'function') {
                rejects[i]();
            }
        }
    }

    window.DG = window.DG || {};
    window.DG.ready = false;

    window.__dgApi__ = {
        callbacks: [
            [extendConfig, undefined],
            [prepareForInit, undefined],
            [setReady, undefined]
        ],
        debug: urlParams.indexOf('&mode=debug&') != -1,
        version: version
    };

    var loaderDgThen = window.DG.then = function (resolve, reject) {
        if (DG.then !== loaderDgThen) {
            return DG.then(resolve, reject);
        }

        window.__dgApi__.callbacks.push([resolve, reject]);

        if (isLazy && !isJSRequested) {
            requestJS();
        }

        if (reject) {
            rejects.push(reject);
        }

        return this;
    };

    if (!isLazy) {
        requestJS();
    }
})();
