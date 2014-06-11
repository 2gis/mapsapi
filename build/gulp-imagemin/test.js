'use strict';
var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var imagemin = require('./index');
var pngquant = require('image-min').pngquant;
var testSize;

it('should minify images', function (cb) {
	this.timeout(40000);

	var stream = imagemin();

	stream.on('data', function (file) {
		testSize = file.contents.length;
		assert(file.contents.length < fs.statSync('fixture.png').size);
		cb();
	});

	stream.write(new gutil.File({
		path: __dirname + '/fixture.png',
		contents: fs.readFileSync('fixture.png')
	}));
});

it('should have configure option', function (cb) {
	this.timeout(40000);

	var stream = imagemin({
		use: [pngquant()]
	});

	stream.on('data', function (file) {
		assert(file.contents.length < testSize);
		cb();
	});

	stream.write(new gutil.File({
		path: __dirname + '/fixture.png',
		contents: fs.readFileSync('fixture.png')
	}));
});

it('should skip unsupported images', function (cb) {
	var stream = imagemin();

	stream.on('data', function (file) {
		assert.strictEqual(file.contents, null);
		cb();
	});

	stream.write(new gutil.File({
		path: __dirname + '/fixture.bmp'
	}));
});
