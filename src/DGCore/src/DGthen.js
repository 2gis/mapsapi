var handlers = window.__dgApi__.callbacks || [],
    chain = Promise.resolve();

//dont pollute global space!
delete window.__dgApi__;

handlers.forEach(function (handlers) {
    chain = chain.then(handlers[0], handlers[1]);
});

DG.then = function (resolve, reject) {
    return chain.then(resolve, reject);
};
