/**
 * Leaflet ProjectDetector
 * Version 0.0.1
 * Dima Rudenko
 */
L.Map.mergeOptions({
    projectDetector: true
});

L.ProjectDetector = L.Handler.extend({
    options:{
        url:'http://catalog.api.2gis.ru/project/list',
        key:'ruxlih0718',
        version:'1.3',
        lang:'ru',
        output:'jsonp',
        callback:function (results) {
            console.log(results);
        }
    },
    initialize:function (map) {
        this._map = map;
        this._getProjectList();
    },

    addHooks:function () {
        this._map
            .on('move', this._projectChange, this);
    },

    removeHooks: function () {
        this._map
            .off('move', this._projectChange, this);
    },

    _projectChange:function () {
        console.log("projectchange");
        this._map.fire("projectchange");
    },

    _getProjectList:function () {
        var options = this.options;
        JSONP.get(
            this.options.url,
            {
                key:options.key,
                version:options.version,
                output:options.output
            },
            options.callback
        );
    }
});
L.Map.addInitHook('addHandler', 'projectDetector', L.ProjectDetector);


/*
 * Usage:
 *
 * JSONP.get( 'someUrl.php', {param1:'123', param2:'456'}, function(data){
 *   //do something with data, which is the JSON object you should retrieve from someUrl.php
 * });
 */
var JSONP = (function () {
    var counter = 0, head, query, key, window = this, config = {};

    function load(url) {
        var script = document.createElement('script'),
            done = false;
        script.src = url;
        script.async = true;

        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }
        };
        if (!head) {
            head = document.getElementsByTagName('head')[0];
        }
        head.appendChild(script);
    }

    function encode(str) {
        return encodeURIComponent(str);
    }

    function jsonp(url, params, callback, callbackName) {
        query = (url || '').indexOf('?') === -1 ? '?' : '&';
        params = params || {};
        for (key in params) {
            if (params.hasOwnProperty(key)) {
                query += encode(key) + "=" + encode(params[key]) + "&";
            }
        }
        var jsonp = "json" + (++counter);
        window[ jsonp ] = function (data) {
            callback(data);
            try {
                delete window[ jsonp ];
            } catch (e) {
            }
            window[ jsonp ] = null;
        };

        load(url + query + (callbackName || config['callbackName'] || 'callback') + '=' + jsonp);
        return jsonp;
    }

    function setDefaults(obj) {
        config = obj;
    }

    return {
        get:jsonp,
        init:setDefaults
    };
}());