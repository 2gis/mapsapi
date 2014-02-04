(PLUGIN AUTHOR: Please read [Plugin README conventions](https://github.com/wearefractal/gulp/wiki/Plugin-README-Conventions), then delete this line)

# gulp-redust
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status](coveralls-image)](coveralls-url) [![Dependency Status][depstat-image]][depstat-url]

> redust plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-redust` as a development dependency:

```shell
npm install --save-dev gulp-redust
```

Then, add it to your `gulpfile.js`:

```javascript
var redust = require("gulp-redust");

gulp.src("./src/*.ext")
	.pipe(redust({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### redust(options)

#### options.msg
Type: `String`  
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-redust
[npm-image]: https://badge.fury.io/js/gulp-redust.png

[travis-url]: http://travis-ci.org/wenqer/gulp-redust
[travis-image]: https://secure.travis-ci.org/wenqer/gulp-redust.png?branch=master

[coveralls-url]: https://coveralls.io/r/wenqer/gulp-redust
[coveralls-image]: https://coveralls.io/repos/wenqer/gulp-redust/badge.png

[depstat-url]: https://david-dm.org/wenqer/gulp-redust
[depstat-image]: https://david-dm.org/wenqer/gulp-redust.png
