//DG inheritance
DG = new (
    (function () {
        var DgApi = function () {},
            DgApiCore = function () {};

        DgApiCore.prototype = L;
        DgApi.prototype = new DgApiCore();

        return DgApi;
    })()
)();

var handlers = window.__dgApi_callbacks || [],
    chain = Promise.resolve();
//dont pollute global space!
window.__dgApi_callbacks = undefined;

DG.then = function () {
    return chain.then(resolve, reject);
};
handlers.forEach(function (cb) {
    chain.then(cb);
});
