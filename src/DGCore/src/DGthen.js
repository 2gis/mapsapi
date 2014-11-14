var handlers = window.__dgApi__.callbacks || [],
    chain = Promise.resolve();

//dont pollute global space!
try {
    delete window.__dgApi__; 
} catch(e) {
    window.__dgApi__ = undefined; //ie8 cant delete from window object
}

handlers.forEach(function (handlers) {
    chain = chain.then(handlers[0], handlers[1]);
});

DG.then = function (resolve, reject) {
    return chain.then(resolve, reject);
};

chain.catch(function(err) {
    console.error(err);
});
