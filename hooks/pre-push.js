// jshint ignore:start

var exec = require('child_process').exec;

exec('grunt jshint:hook', function (err, stdout, stderr) {

  console.log(stdout);
  if (!err) {
    exec('grunt {{task}}', function (err, stdout, stderr) {
      console.log(stdout);

      var exitCode = 0;
      if (err) {
        console.log(stderr);
        exitCode = -1;
      }{{#unless preventExit}}

      process.exit(exitCode);{{/unless}}
    });
  } else {
    console.log(stderr);
    process.exit(-1);
  }
});