/**
 * Leaflet AJAX
 * The plugin to provide an asynchronous cross-domain HTTP (AJAX) requests.
 *
 * Version 1.0.1
 *
 * Copyright (c) 2013, 2GIS, Andrey Chizh
 */
L.ajax = function(params) {
    'use strict';

    var head,
        script,
        callbackId,
        callbackName,
        query = '',
        resUrl = '';

    var url = params.url,
        data = params.data || {},
        beforeSend = params.beforeSend || function() {},
        success = params.success || function() {},
        error = params.error || function() {},
        complete = params.complete || function() {};

    head = document.getElementsByTagName('head')[0];

    callbackId = 'dga_' + ('' + Math.random()).slice(2);
    callbackName = 'L.ajax.callback.' + callbackId;

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

    L.ajax.callback[callbackId] = function(data) {
        success(data);
        var script = document.getElementById(callbackId);
        if (script) {
            script.parentNode.removeChild(script);
        }
        delete L.ajax.callback[callbackId];
    };

    script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.id = callbackId;
    script.src = resUrl;

    script.onerror = function(e) {
        error({ url: resUrl, event: e });
        script.parentNode.removeChild(script);
    };

    beforeSend(callbackId);
    head.appendChild(script);
    complete(callbackId);

    return callbackId;
};

L.ajax.cancelCallback = function(callbackId) {
    if (L.ajax.callback.hasOwnProperty(callbackId)) {
        L.ajax.callback[callbackId] = function() {};
    }
    var script = document.getElementById(callbackId);
    if (script) {
        script.parentNode.removeChild(script);
    }
};

L.ajax.callback = {};
