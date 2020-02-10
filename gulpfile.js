const { build } = require('./gulp/tasks/build');
const { lint } = require('./gulp/tasks/lint');
const { test } = require('./gulp/tasks/test');
const { dev } = require('./gulp/tasks/dev');
const { clean } = require('./gulp/tasks/clean');

module.exports = {
    build,
    lint,
    test,
    dev,
    clean,
};
