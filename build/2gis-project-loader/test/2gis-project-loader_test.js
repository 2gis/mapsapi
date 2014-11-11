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

var configMock = {
	appConfig: {
		'WEB_API_SERVER': 'http://catalog.api.2gis.ru',
		'WEB_API_VERSION': '2.0',
		'WEB_API_KEY': 'rujrdp3400'
	}
}

var loader = require('../index.js')(configMock);

describe('2gis-project-loader module', function(done){
	it('should return fileds', function(done){
		loader(function(err, projects) {
			Object.keys(projects[0]).should.eql([
				'id',
				'name',
				'type',
				'country_code',
				'code',
				'domain',
				'zoom_level',
				'flags',
				'time_zone',
				'bounds'
			]);
			done();
		});
	});
});

/*jshint ignore:end*/