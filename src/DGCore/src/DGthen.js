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

handlers.forEach(function (handlers) {
    chain.then(handlers[0], handlers[1]);
});

DG.then = function (resolve, reject) {
    return chain.then(resolve, reject);
};
