(PLUGIN AUTHOR: Please read [Plugin README conventions](https://github.com/wearefractal/gulp/wiki/Plugin-README-Conventions), then delete this line)

# gulp-spritesmith
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status](coveralls-image)](coveralls-url) [![Dependency Status][depstat-image]][depstat-url]

> spritesmith plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-spritesmith` as a development dependency:

```shell
npm install --save-dev gulp-spritesmith
```

Then, add it to your `gulpfile.js`:

```javascript
var spritesmith = require("gulp-spritesmith");

gulp.src('./src/img/*.png')
    .pipe(sprite({
        destImg: 'dist/img/sprite.png',
        destCSS: 'dist/css/sprite.css'
    }));
```

## API

### spritesmith(options)

#### options.msg
Type: `String`
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-spritesmith
[npm-image]: https://badge.fury.io/js/gulp-spritesmith.png

[travis-url]: http://travis-ci.org/otouto/gulp-spritesmith
[travis-image]: https://secure.travis-ci.org/otouto/gulp-spritesmith.png?branch=master

[coveralls-url]: https://coveralls.io/r/otouto/gulp-spritesmith
[coveralls-image]: https://coveralls.io/repos/otouto/gulp-spritesmith/badge.png

[depstat-url]: https://david-dm.org/otouto/gulp-spritesmith
[depstat-image]: https://david-dm.org/otouto/gulp-spritesmith.png
