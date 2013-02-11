/**
 * Leaflet AJAX Plugin
 * Version 1.0.1
 *
 * Copyright (c) 2013, 2GIS, Andrey Chizh
 */
L.ajax = function(params) {
    var query = '',
        resUrl;

    var url = params.url,
        data = params.data || {},
        beforeSend = params.beforeSend || function() {},
        success = params.success || function() {},
        error = params.error || function() {},
        complete = params.complete || function() {};


    var head = document.getElementsByTagName('head')[0];
    var script = L.DomUtil.create('script', '', head);
    script.type = 'text/javascript';
    script.async = true;

    var callbackId = "dg_" + ("" + Math.random()).slice(2);
    var callbackName = "L.ajax.callback." + callbackId;


    if (callbackId) {
        L.ajax.callback[callbackId] = function(data) {
            head.removeChild(script);
            delete L.ajax.callback[callbackId];
            success(data);
        };
    }

    for (var param in data) {
        if (data.hasOwnProperty(param)) {
            query += encodeURIComponent(param) + '=' + encodeURIComponent(data[param]) + '&';
        }
    }

    if (url.indexOf("?") === -1) {
        resUrl = url + "?" + query + 'callback=' + callbackName;
    } else {
        resUrl = url + "&" + query + 'callback=' + callbackName;
    }

    beforeSend();
    script.src = resUrl;
    complete();

    return callbackId;

};

L.ajax.callback = {};