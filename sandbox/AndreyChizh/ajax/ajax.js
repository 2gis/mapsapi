/**
 * Leaflet AJAX Plugin
 * Version 1.0.1
 *
 * Copyright (c) 2013, 2GIS, Andrey Chizh
 */
L.ajax = function(params) {
    var query = '';

    var url = params.url,
        data = params.data || {},
        beforeSend = params.beforeSend || function() {},
        success = params.success || function() {},
        error = params.error || function() {},
        complete = params.complete || function() {};

    for (var param in data) {
        if (data.hasOwnProperty(param)) {
            query += encodeURIComponent(param) + '=' + encodeURIComponent(data[param]) + '&';
        }
    }






    debugger;


    var jsonp = function(url, cb, cbParam, callbackName) {
        var cbName, ourl, cbSuffix, scriptNode,
            head = document.getElementsByTagName('head')[0];


        var cbParam = cbParam || "callback";
        if (callbackName) {
            cbName = callbackName;
        } else {
            cbSuffix = "_" + ("" + Math.random()).slice(2);
            cbName = "L.ajax.cb." + cbSuffix;
        }


        scriptNode = L.DomUtil.create('script', '', head);
        scriptNode.type = 'text/javascript';


        if (cbSuffix) {
            L.ajax.cb[cbSuffix] = function(data) {
                head.removeChild(scriptNode);
                delete L.ajax.cb[cbSuffix];
                cb(data);
            };
        }


        if (url.indexOf("?") === -1) {
            ourl = url + "?" + cbParam + "=" + cbName;
        } else {
            ourl = url + "&" + cbParam + "=" + cbName;
        }


        scriptNode.src = ourl;
    }





};

L.ajax.cb = {};