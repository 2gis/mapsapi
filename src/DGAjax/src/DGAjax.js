DG.ajax = (function() {

    var win = window,
        doc = document,

        rurl = /^([\w.+-]+:)?(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        twoHundo = /^20\d$/,

        // Document location
        ajaxLocParts,
        ajaxLocation,

        byTag = 'getElementsByTagName',
        readyState = 'readyState',
        contentType = 'Content-Type',
        requestedWith = 'X-Requested-With',
        head = doc[byTag]('head')[0],
        uniqid = 0,
        callbackPrefix = 'l_dg_ajax_callback_' + (+new Date()),
        lastValue, // data stored by the most recent JSONP callback
        xmlHttpRequest = 'XMLHttpRequest',
        xDomainRequest = 'XDomainRequest', // IE 8 and 9 only
        noop = function() {},
        defaultHeaders = {
            contentType: 'application/x-www-form-urlencoded',
            requestedWith: xmlHttpRequest,
            accept: {
                '*':  'text/javascript, text/html, application/xml, text/xml, */*',
                xml:  'application/xml, text/xml',
                html: 'text/html',
                text: 'text/plain',
                json: 'application/json, text/javascript',
                js:   'application/javascript, text/javascript'
            }
        },
        /*global XDomainRequest:false */
        xhr = function(o) {
            // is it x-domain
            if (o.crossDomain === true) {
                var xhr = win[xmlHttpRequest] ? new XMLHttpRequest() : null;
                if (xhr && 'withCredentials' in xhr) {
                    return xhr;
                } else if (win[xDomainRequest]) {
                    return new XDomainRequest();
                } else {
                    throw new Error('Browser does not support cross-origin requests');
                }
            } else {
                return new XMLHttpRequest();
            }
        },

        globalSetupOptions = {
            dataFilter: function(data) {
                return data;
            }
        };

    // IE may throw an exception when accessing
    // a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch (e) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement('a');
        ajaxLocation.href = '';
        ajaxLocation = ajaxLocation.href;
    }

    // Segment location into parts
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function handleReadyState(r, success, error) {
        return function() {
            // use _aborted to mitigate against IE err c00c023f
            // (can't read props on aborted request objects)
            if (r._aborted) {
                return error(r.request);
            }
            if (r.request && r.request[readyState] === 4) {
                r.request.onreadystatechange = noop;
                if (twoHundo.test(r.request.status)) {
                    success(r.request);
                } else {
                    error(r.request);
                }
            }
        };
    }

    function setHeaders(http, o) {
        var headers = o.headers || {},
            h;

        headers.Accept = headers.Accept || defaultHeaders.accept[o.dataType] || defaultHeaders.accept['*'];

        // breaks cross-origin requests with legacy browsers
        if (!o.crossDomain && !headers[requestedWith]) {
            headers[requestedWith] = defaultHeaders.requestedWith;
        }
        if (!headers[contentType]) {
            headers[contentType] = o.contentType || defaultHeaders.contentType;
        }
        for (h in headers) {
            if (headers.hasOwnProperty(h) && 'setRequestHeader' in http) {
                http.setRequestHeader(h, headers[h]);
            }
        }
    }

    function setCredentials(http, o) {
        if (typeof o.withCredentials !== 'undefined' && typeof http.withCredentials !== 'undefined') {
            http.withCredentials = !!o.withCredentials;
        }
    }

    function generalCallback(data) {
        lastValue = data;
    }

    function urlappend(url, s) {
        return url + (/\?/.test(url) ? '&' : '?') + s;
    }

    function handleJsonp(o, fn, err, url) {
        var reqId = uniqid++,
            cbkey = o.jsonpCallback || 'callback', // the 'callback' key
            cbval = o.jsonpCallbackName || callbackPrefix,
            cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)'),
            match = url.match(cbreg),
            script = doc.createElement('script'),
            loaded = 0,
            isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1;

        if (match) {
            if (match[3] === '?') {
                url = url.replace(cbreg, '$1=' + cbval); // wildcard callback func name
            } else {
                cbval = match[3]; // provided callback func name
            }
        } else {
            url = urlappend(url, cbkey + '=' + cbval); // no callback details, add 'em
        }

        win[cbval] = generalCallback;

        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
            // need this for IE due to out-of-order onreadystatechange(), binding script
            // execution to an event listener gives us control over when the script
            // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
            //
            // if this hack is used in IE10 jsonp callback are never called
            script.event = 'onclick';
            script.htmlFor = script.id = '_request_' + reqId;
        }

        script.onerror = function() {
            script.onerror = script.onload = script.onreadystatechange = null;
            err({}, 'Request unknown error', {});
            lastValue = undefined;
            head.removeChild(script);
            loaded = 1;
        };
        script.onload = script.onreadystatechange = function() {
            if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
                return false;
            }
            script.onerror = script.onload = script.onreadystatechange = null;
            if (script.onclick) {
                script.onclick();
            }
            // Call the user callback with the last value stored and clean up values and scripts.
            fn(lastValue);
            lastValue = undefined;
            head.removeChild(script);
            loaded = 1;
        };

        // Add the script to the DOM head
        head.appendChild(script);

        // Enable JSONP timeout
        return {
            abort: function() {
                script.onerror = script.onload = script.onreadystatechange = null;
                err({}, 'Request is aborted: timeout', {});
                lastValue = undefined;
                head.removeChild(script);
                loaded = 1;
            }
        };
    }

    function getRequest(fn, err) {
        var o = this.options,
            method = (o.type || 'GET').toUpperCase(),
            url = typeof o === 'string' ? o : o.url,
            // convert non-string objects to query-string form unless o.processData is false
            data = (o.processData !== false && o.data && typeof o.data !== 'string') ? Ajax.toQueryString(o.data) : (o.data || null),
            http,
            sendWait = false;

        // if we're working on a GET request and we have data then we should append
        // query string to end of URL and not post data
        if ((o.type === 'jsonp' || method === 'GET') && data) {
            url = urlappend(url, data);
            data = null;
        }

        if (o.type === 'jsonp') {
            return handleJsonp(o, fn, err, url);
        }

        http = xhr(o);
        http.open(method, url, o.async !== false);

        setHeaders(http, o);
        setCredentials(http, o);

        if (win[xDomainRequest] && http instanceof win[xDomainRequest]) {
            http.onload = fn;
            http.onprogress = function() {};
            http.ontimeout = function() {};
            http.onerror = err;
            sendWait = true;
        } else {
            http.onreadystatechange = handleReadyState(this, fn, err);
        }
        if (sendWait) {
            setTimeout(function() {
                http.send(data);
            }, 200);
        } else {
            http.send(data);
        }
        return http;
    }

    function buildParams(prefix, obj, traditional, add) {
        var name, i, v,
            rbracket = /\[\]$/;

        if (DG.Util.isArray(obj)) {
        // Serialize array item.
            for (i = 0; obj && i < obj.length; i++) {
                v = obj[i];
                if (traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);
                } else {
                    buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
                }
            }
        } else if (obj && obj.toString() === '[object Object]') {
            // Serialize object item.
            for (name in obj) {
                if (obj.hasOwnProperty(name)) {
                    buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
                }
            }
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    function setType(url) {
        var m = url.match(/\.(json|jsonp|html|xml)(\?|$)/);
        return m ? m[1] : 'js';
    }

    function isCrossDomain(url) {
        var parts = rurl.exec(url.toLowerCase());
        return !!(parts &&
                (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
                    (parts[3] || (parts[1] === 'http:' ? '80' : '443')) !==
                        (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? '80' : '443')))
        );
    }

    function doRequest(o) {

        if (!('crossDomain' in o)) {
            o.crossDomain = isCrossDomain(o.url);
        }

        var self = {};
        self.promise = new Promise(function(resolve, reject) {
            self.abort = function() {
                self._aborted = true;
                reject('aborted');
            };

            self.url = o.url;
            self.timeout = null;
            self.options = o;

            self._aborted = false;
            self._erred = false;
            self._responseArgs = {};

            var type = o.type === 'jsonp' ? o.type : (o.dataType || setType(self.url));

            if (o.timeout) {
                self.timeout = setTimeout(function() {
                    self.abort();
                }, o.timeout);
            }

            function complete(resp) {
                if (o.timeout) {
                    clearTimeout(self.timeout);
                }
                self.timeout = null;
                if (self._erred) {
                    reject(resp);
                } else {
                    resolve(resp);
                }
            }

            function success(resp) {
                resp = (type !== 'jsonp') ? self.request : resp;
                // use global data filter on response text
                var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type),
                    r = filteredResponse;

                try {
                    resp.responseText = r;
                } catch (e) {
                    // can't assign this in IE<=8, just ignore
                }
                /* eslint-disable no-eval */
                if (r) {
                    switch (type) {
                        case 'json':
                            try {
                                resp = win.JSON.parse(r);
                            } catch (err) {
                                return error(resp, 'Could not parse JSON in response', err);
                            }
                            break;
                        case 'js':
                            resp = eval('(' + r + ')');
                            break;
                        case 'html':
                            resp = r;
                            break;
                        case 'xml':
                            resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML;
                            break;
                    }
                }
                /* eslint-enable no-eval */
                self._responseArgs.resp = resp;
                complete(resp);
            }

            function error(resp, msg, t) {
                resp = self.request;
                self._responseArgs.resp = resp;
                self._responseArgs.msg = msg;
                self._responseArgs.t = t;
                self._erred = true;
                complete(resp);
            }

            self.request = getRequest.call(self, success, error);
        });

        return self;
    }

    function Ajax(url, options) {

        if (Object.prototype.toString.call(url) === '[object Object]') {
            options = url;
            url = undefined;
        }
        options = options || {};
        options.url = url || options.url;

        var requestPromise = doRequest(options),
            resultPromise = requestPromise.promise;

        if (options.success || options.error || options.complete) {
            resultPromise.then(options.success, options.error);
        }

        resultPromise.abort = requestPromise.abort;

        return resultPromise;
    }

    Ajax.setup = function(options) {
        options = options || {};
        for (var k in options) {
            if (options.hasOwnProperty(k)) {
                globalSetupOptions[k] = options[k];
            }
        }
    };

    Ajax.toQueryString = function(o, trad) {
        var prefix, i,
            traditional = trad || false,
            s = [],
            enc = encodeURIComponent,
            add = function(key, value) {
                // If value is a function, invoke it and return its value
                if (typeof value == 'function') {
                    value = value();
                } else {
                    value = value || '';
                }

                s[s.length] = enc(key) + '=' + enc(value);
            };

        // If an array was passed in, assume that it is an array of form elements.
        if (DG.Util.isArray(o)) {
            for (i = 0; o && i < o.length; i++) {
                add(o[i].name, o[i].value);
            }
        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in o) {
                if (o.hasOwnProperty(prefix)) {
                    buildParams(prefix, o[prefix], traditional, add);
                }
            }
        }

        // spaces should be + according to spec
        return s.join('&').replace(/%20/g, '+');
    };

    var testxhr = win[xmlHttpRequest] ? new XMLHttpRequest() : null;

    Ajax.corsSupport = !(!(testxhr && 'withCredentials' in testxhr) && !win[xDomainRequest]) &&
        // cors not available in IE and with cyrillic domain
        !(DG.Browser.ie && document.location.host.toLowerCase().search(/[а-я]/) != -1);

    return Ajax;
})();
