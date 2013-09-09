
L.DG.Ajax = (function(){

  var win = window,
      doc = document,
      twoHundo = /^20\d$/,
      byTag = 'getElementsByTagName',
      readyState = 'readyState',
      contentType = 'Content-Type',
      requestedWith = 'X-Requested-With',
      head = doc[byTag]('head')[0],
      uniqid = 0,
      callbackPrefix = 'l_dg_ajax_callback_' + (+new Date()),
      lastValue, // data stored by the most recent JSONP callback
      xmlHttpRequest = 'XMLHttpRequest',
      xDomainRequest = 'XDomainRequest',
      noop = function () {},

      isArray = typeof Array.isArray == 'function'
        ? Array.isArray
        : function (a) {
            return a instanceof Array
          },

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

      xhr = function(o) {
        // is it x-domain
        if (o.crossOrigin === true) {
          var xhr = win[xmlHttpRequest] ? new XMLHttpRequest() : null
          if (xhr && 'withCredentials' in xhr) {
            return xhr
          } else if (win[xDomainRequest]) {
            return new XDomainRequest()
          } else {
            throw new Error('Browser does not support cross-origin requests')
          }
        } else if (win[xmlHttpRequest]) {
          return new XMLHttpRequest()
        } else {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }
      },

      globalSetupOptions = {
        dataFilter: function (data) {
          return data
        }
      };

  function handleReadyState(r, success, error) {
    return function () {
      // use _aborted to mitigate against IE err c00c023f
      // (can't read props on aborted request objects)
      if (r._aborted) return error(r.request)
      if (r.request && r.request[readyState] == 4) {
        r.request.onreadystatechange = noop
        if (twoHundo.test(r.request.status))
          success(r.request)
        else
          error(r.request)
      }
    }
  }

  function setHeaders(http, o) {
    var headers = o.headers || {}
      , h

    headers.Accept = headers.Accept
      || defaultHeaders.accept[o.type]
      || defaultHeaders.accept['*']

    // breaks cross-origin requests with legacy browsers
    if (!o.crossOrigin && !headers[requestedWith]) headers[requestedWith] = defaultHeaders.requestedWith
    if (!headers[contentType]) headers[contentType] = o.contentType || defaultHeaders.contentType
    for (h in headers)
      headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h])
  }

  function setCredentials(http, o) {
    if (typeof o.withCredentials !== 'undefined' && typeof http.withCredentials !== 'undefined') {
      http.withCredentials = !!o.withCredentials
    }
  }

  function generalCallback(data) {
    lastValue = data
  }

  function urlappend (url, s) {
    return url + (/\?/.test(url) ? '&' : '?') + s
  }

  function handleJsonp(o, fn, err, url) {
    var reqId = uniqid++
      , cbkey = o.jsonpCallback || 'callback' // the 'callback' key
      , cbval = o.jsonpCallbackName || namespace.getCallbackPrefix(reqId)
      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
      , match = url.match(cbreg)
      , script = doc.createElement('script')
      , loaded = 0
      , isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1

    if (match) {
      if (match[3] === '?') {
        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
      } else {
        cbval = match[3] // provided callback func name
      }
    } else {
      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
    }

    win[cbval] = generalCallback

    script.type = 'text/javascript'
    script.src = url
    script.async = true
    if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
      // need this for IE due to out-of-order onreadystatechange(), binding script
      // execution to an event listener gives us control over when the script
      // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
      //
      // if this hack is used in IE10 jsonp callback are never called
      script.event = 'onclick'
      script.htmlFor = script.id = '_request_' + reqId
    }

    script.onload = script.onreadystatechange = function () {
      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
        return false
      }
      script.onload = script.onreadystatechange = null
      script.onclick && script.onclick()
      // Call the user callback with the last value stored and clean up values and scripts.
      fn(lastValue)
      lastValue = undefined
      head.removeChild(script)
      loaded = 1
    }

    // Add the script to the DOM head
    head.appendChild(script)

    // Enable JSONP timeout
    return {
      abort: function () {
        script.onload = script.onreadystatechange = null
        err({}, 'Request is aborted: timeout', {})
        lastValue = undefined
        head.removeChild(script)
        loaded = 1
      }
    }
  }

    function getRequest(fn, err) {
        var o = this.o
            , method = (o.method || 'GET').toUpperCase()
            , url = typeof o === 'string' ? o : o.url
            // convert non-string objects to query-string form unless o.processData is false
            , data = (o.processData !== false && o.data && typeof o.data !== 'string')
            ? namespace.toQueryString(o.data)
            : (o.data || null)
            , http
            , sendWait = false

        // if we're working on a GET request and we have data then we should append
        // query string to end of URL and not post data
        if ((o.type == 'jsonp' || method == 'GET') && data) {
          url = urlappend(url, data)
          data = null
        }

        if (o.type == 'jsonp') return handleJsonp(o, fn, err, url)

        http = xhr(o)
        http.open(method, url, o.async === false ? false : true)
        setHeaders(http, o)
        setCredentials(http, o)
        if (win[xDomainRequest] && http instanceof win[xDomainRequest]) {
            http.onload = fn
            http.onerror = err
            // NOTE: see
            // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
            http.onprogress = function() {}
            sendWait = true
        } else {
          http.onreadystatechange = handleReadyState(this, fn, err)
        }
        o.before && o.before(http)
        if (sendWait) {
          setTimeout(function () {
            http.send(data)
          }, 200)
        } else {
          http.send(data)
        }
        return http
    }

    function setType(url) {
        var m = url.match(/\.(json|jsonp|html|xml)(\?|$)/)
        return m ? m[1] : 'js'
    }

    function init(o, fn) {

        this.url = typeof o == 'string' ? o : o.url
        this.timeout = null

        // whether request has been fulfilled for purpose
        // of tracking the Promises
        this._fulfilled = false
        // success handlers
        this._successHandler = function(){}
        this._fulfillmentHandlers = []
        // error handlers
        this._errorHandlers = []
        // complete (both success and fail) handlers
        this._completeHandlers = []
        this._erred = false
        this._responseArgs = {}

        var self = this
          , type = o.type || setType(this.url)

        fn = fn || function () {}

        if (o.timeout) {
            this.timeout = setTimeout(function () {
                self.abort()
            }, o.timeout)
        }

        if (o.success) {
            this._successHandler = function () {
                o.success.apply(o, arguments)
            }
        }

        if (o.error) {
            this._errorHandlers.push(function () {
                o.error.apply(o, arguments)
            })
        }

        if (o.complete) {
            this._completeHandlers.push(function () {
                o.complete.apply(o, arguments)
            })
        }

        function complete (resp) {
            o.timeout && clearTimeout(self.timeout)
            self.timeout = null
            while (self._completeHandlers.length > 0) {
            self._completeHandlers.shift()(resp)
            }
        }

        function success (resp) {
            resp = (type !== 'jsonp') ? self.request : resp
            // use global data filter on response text
            var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
            , r = filteredResponse

            try {
                resp.responseText = r
            } catch (e) {
                // can't assign this in IE<=8, just ignore
            }
            if (r) {
                switch (type) {
                    case 'json':
                        try {
                            resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
                        } catch (err) {
                            return error(resp, 'Could not parse JSON in response', err)
                        }
                        break
                    case 'js':
                        resp = eval(r)
                        break
                    case 'html':
                        resp = r
                        break
                    case 'xml':
                        resp = resp.responseXML
                                && resp.responseXML.parseError // IE trololo
                                && resp.responseXML.parseError.errorCode
                                && resp.responseXML.parseError.reason
                                ? null
                                : resp.responseXML
                        break
                }
            }

            self._responseArgs.resp = resp
            self._fulfilled = true
            fn(resp)
            self._successHandler(resp)
            while (self._fulfillmentHandlers.length > 0) {
                resp = self._fulfillmentHandlers.shift()(resp)
            }

            complete(resp)
        }

        function error(resp, msg, t) {
            resp = self.request
            self._responseArgs.resp = resp
            self._responseArgs.msg = msg
            self._responseArgs.t = t
            self._erred = true
            while (self._errorHandlers.length > 0) {
                self._errorHandlers.shift()(resp, msg, t)
            }
            complete(resp)
        }

        this.request = getRequest.call(this, success, error)
    }

  // Request.prototype = {
  //   abort: function () {
  //     this._aborted = true
  //     this.request.abort()
  //   }

  // , retry: function () {
  //     init.call(this, this.o, this.fn)
  //   }
  // }

    function Ajax(url, o, fn) {
        var reqDeffered = L.DG.when.defer();
        o = o || {}
        o.url = url;
        console.log(o);
        console.log(reqDeffered);
        console.log(reqDeffered.promise);
        // init.apply(reqDeffered, arguments);
        return reqDeffered.promise;
    }

    Ajax.setup = function (options) {
        options = options || {}
        for (var k in options) {
            globalSetupOptions[k] = options[k]
        }
    };

    Ajax.toQueryString = function (o, trad) {
        var prefix, i
          , traditional = trad || false
          , s = []
          , enc = encodeURIComponent
          , add = function (key, value) {
                // If value is a function, invoke it and return its value
                value = ('function' === typeof value) ? value() : (value == null ? '' : value)
                s[s.length] = enc(key) + '=' + enc(value)
            }

        // If an array was passed in, assume that it is an array of form elements.
        if (isArray(o)) {
            for (i = 0; o && i < o.length; i++) add(o[i].name, o[i].value)
        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in o) {
                buildParams(prefix, o[prefix], traditional, add)
            }
        }

        // spaces should be + according to spec
        return s.join('&').replace(/%20/g, '+')
    };

    return Ajax;
})();