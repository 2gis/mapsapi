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
