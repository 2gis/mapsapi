var handlers = window.dgApi_callbacks || [];
window.dgApi_callbacks = undefined;

L.DG.def = L.DG.when.defer();

L.DG.then = function (cb) {
    L.DG.def.promise.then(cb);

    return this;
};

//execute callbacks after api loading if any
//handlers.forEach(function (cb) {
    L.DG.def.promise.then(handlers[0]);
//});

//promise will be resolved asynchronously
L.DG.def.resolve();
