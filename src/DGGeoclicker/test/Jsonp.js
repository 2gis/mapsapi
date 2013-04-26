/**
 * Leaflet DG JSONP Plugin
 * The plugin to provide an asynchronous cross-domain HTTP (AJAX) requests.
 *
 * Version 1.0.1
 *
 * Copyright (c) 2013, 2GIS, Andrey Chizh
 */
L.DG = L.DG || {};
L.DG.Jsonp = function (params) {
    'use strict';

    var query = '',
        resUrl, timer, head, script,
        callbackId, callbackName,
        url = params.url || '',
        data = params.data || {},
        success = params.success || function () {},
        error = params.error || function () {},
        beforeSend = params.beforeSend || function () {},
        complete = params.complete || function () {},
        timeout = params.timeout || 30 * 1000;

    head = document.getElementsByTagName('head')[0];

    callbackId = 'dga_' + ('' + Math.random()).slice(2);
    callbackName = 'L.DG.Jsonp.callback.' + callbackId;

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            query += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
        }
    }

    if (url.indexOf('?') === -1) {
        resUrl = url + '?' + query + 'callback=' + callbackName;
    } else {
        resUrl = url + '&' + query + 'callback=' + callbackName;
    }

    timer = setTimeout(function () {
        cancelCallback();
        error({ url: resUrl, event: 'Request timeout error' });
    }, timeout);

    L.DG.Jsonp.callback[callbackId] = function (data) {
        clearTimeout(timer);
        success(data);
        removeScript(callbackId);
        delete L.DG.Jsonp.callback[callbackId];
    };

    script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.id = callbackId;

    script.onerror = window.onerror = function (e) {
        error({ url: resUrl, event: e });
        script.parentNode.removeChild(script);
        return true;
    };

    script.src = resUrl;

    beforeSend();
    head.appendChild(script);
    complete();

    function cancelCallback() {
        removeScript(callbackId);
        if (L.DG.Jsonp.callback.hasOwnProperty(callbackId)) {
            L.DG.Jsonp.callback[callbackId] = function () {};
        }
    }

    function removeScript(callbackId) {
        var script = document.getElementById(callbackId);
        if (script && script.parentNode) {
            script.parentNode.removeChild(script);
        }
    }

    return {
        cancel: cancelCallback
    };
};

L.DG.Jsonp.callback = {};
