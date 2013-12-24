var handlers = window.__dgApi_callbacks || [],
    def = L.DG.when.defer(),
    chain = def.promise;
window.__dgApi_callbacks = undefined;

L.DG.then = function (cb) {
    def.promise.then(cb);

    return this;
};

//execute callbacks after api loading if any
handlers.forEach(function (cb) {
    chain = chain.then(cb);
});

//promise will be resolved asynchronously
def.resolve();
