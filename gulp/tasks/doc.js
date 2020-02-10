var gendoc = require('../util/gendoc');
var config = require('../../app/config');

exports.doc = function doc(done) {
    var doc = config.doc;

    gendoc.generateDocumentation(doc.menu, doc.input, doc.output);
    done();
};
