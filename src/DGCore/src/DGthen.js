var handlers = window.__dgApi_callbacks || [],
    def = L.DG.when.defer(),
    chain = def.promise;
//dont pollute global space!
window.__dgApi_callbacks = undefined;

//execute callbacks after api loading if any
handlers.forEach(function (cb) {
    chain = chain.then(cb);
});

//promise will be resolved asynchronously
def.resolve();

//public api for adding callbacks
L.DG.then = function (resolve, reject) {
    chain.then(resolve, reject);

    return this;
};
