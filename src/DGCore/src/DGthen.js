var handlers = window.__dgApi__.callbacks || [],
    chain = Promise.resolve();

handlers.forEach(function(handlers) {
    chain = chain.then(handlers[0], handlers[1]);
});

DG.then = function(resolve, reject) {
    return chain.then(resolve, reject);
};

// IE8 throw error if `chain.catch`
/* eslint-disable dot-notation, no-console */
chain['catch'](function(err) {
    console.error(err);
});
/* eslint-enable dot-notation, no-console */
