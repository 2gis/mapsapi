/*jshint ignore:start*/
/*
 * 2gis-project-loader
 * https://github.com/wenqer/2gis-project-loader
 *
 * Copyright (c) 2013 Iaroslav Voloshchuk
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var loader = require('../index.js');

describe('2gis-project-loader module', function(done){
	it('should return fileds', function(done){
		loader(function(err, projects) {
			Object.keys(projects[0]).should.eql([
				'code',
				'minZoom',
				'maxZoom',
				'timeOffset',
				'traffic',
				'bound'
			]);
			done();
		});
	});
});

/*jshint ignore:end*/