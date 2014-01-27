DG = new (
    (function () {
        var DgApi = function () {};
        var DgServiceLayer = function () {};
        DgServiceLayer.prototype = L;

        var proto = new DgServiceLayer();
        L.extend(proto, L.Mixin.Events);
        proto.constructor = DgApi;
        DgApi.prototype = proto;

        return DgApi;
    })()
)();

DG.Class.extend = function (props) {

    // extended class with the new prototype
    var NewClass = function () {

        // call the constructor
        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }

        // call all constructor hooks
        if (this._initHooks) {
            this.callInitHooks();
        }
    };

    // instantiate class without calling constructor
    var F = function () {};
    F.prototype = this.prototype;

    var proto = new F();
    proto.constructor = NewClass;

    NewClass.prototype = proto;

    //inherit parent's statics
    for (var i in this) {
        if (this.hasOwnProperty(i) && i !== 'prototype') {
            NewClass[i] = this[i];
        }
    }

    // mix static properties into the class
    if (props.statics) {
        DG.extend(NewClass, props.statics);
        delete props.statics;
    }

    // mix includes into the prototype
    if (props.includes) {
        DG.Util.extend.apply(null, [proto].concat(props.includes));
        delete props.includes;
    }

    // merge options
    if (props.options && proto.options) {
        props.options = L.extend({}, proto.options, props.options);
    }

    // mix given properties into the prototype
    DG.extend(proto, props);

    proto._initHooks = [];

    var parent = this;
    // jshint camelcase: false
    NewClass.__super__ = parent.prototype;

    // add method for calling all hooks
    proto.callInitHooks = function () {

        if (this._initHooksCalled) { return; }

        if (parent.prototype.callInitHooks) {
            parent.prototype.callInitHooks.call(this);
        }

        this._initHooksCalled = true;

        for (var i = 0, len = proto._initHooks.length; i < len; i++) {
            proto._initHooks[i].call(this);
        }
    };

    return NewClass;
};


// method for adding properties to prototype
DG.Class.include = function (props) {
    DG.extend(this.prototype, props);
};


DG.extend = function (dest) { // (Object[, Object, ...]) ->
    var sources = Array.prototype.slice.call(arguments, 1),
        i, j, len, src;
    ///DG
    for (j = 0, len = sources.length; j < len; j++) {
        src = sources[j] || {};
        for (i in src) {
            if (src.hasOwnProperty(i)) {
                dest[i] = src[i];
            }
        }
    }
    return dest;
};

// DG.extend = DG.Util.extend;