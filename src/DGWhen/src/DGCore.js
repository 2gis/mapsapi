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