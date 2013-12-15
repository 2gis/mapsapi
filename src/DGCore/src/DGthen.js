var handlers = window.__dgApi_callbacks || [];
window.__dgApi_callbacks = undefined;

L.DG.def = L.DG.when.defer();

L.DG.then = function (cb) {
    L.DG.def.promise.then(cb);

    return this;
}

//promise will be resolved asynchronously
L.DG.def.resolve();

//execute callbacks after api loading if any
handlers.forEach(function (cb) {
    L.DG.def.promise.then(cb);
});
