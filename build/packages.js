var packages = {

    base: {
        name: 'Базовый',
        modules: ['Core', 'JSONP'],
        desc: 'Simply maps package'
    },

    full: {
        name: 'Полный',
        modules: [],
        desc: 'Full maps package'
    }

};

if (typeof exports !== 'undefined') {
    exports.packages = packages;
}