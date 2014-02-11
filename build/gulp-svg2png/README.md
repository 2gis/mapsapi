(PLUGIN AUTHOR: Please read [Plugin README conventions](https://github.com/wearefractal/gulp/wiki/Plugin-README-Conventions), then delete this line)

# gulp-svg2png
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status](coveralls-image)](coveralls-url) [![Dependency Status][depstat-image]][depstat-url]

> svg2png plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-svg2png` as a development dependency:

```shell
npm install --save-dev gulp-svg2png
```

Then, add it to your `gulpfile.js`:

```javascript
var svg2png = require("gulp-svg2png");

gulp.src("./src/*.ext")
	.pipe(svg2png({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### svg2png(options)

#### options.msg
Type: `String`  
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-svg2png
[npm-image]: https://badge.fury.io/js/gulp-svg2png.png

[travis-url]: http://travis-ci.org/otouto/gulp-svg2png
[travis-image]: https://secure.travis-ci.org/otouto/gulp-svg2png.png?branch=master

[coveralls-url]: https://coveralls.io/r/otouto/gulp-svg2png
[coveralls-image]: https://coveralls.io/repos/otouto/gulp-svg2png/badge.png

[depstat-url]: https://david-dm.org/otouto/gulp-svg2png
[depstat-image]: https://david-dm.org/otouto/gulp-svg2png.png
