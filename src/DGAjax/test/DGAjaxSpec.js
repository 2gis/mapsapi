describe('DG.ajax', function () {

	describe('#toQueryString', function () {
		it('([{ name: x, value: y }, ... ]) simple', function () {
			var arr = [
				{ name: 'foo', value: 'bar' },
				{ name: 'baz', value: '' },
				{ name: 'x', value: -20 },
				{ name: 'x', value: 20 }
		    ];

			expect(DG.ajax.toQueryString(arr)).to.be.eql('foo=bar&baz=&x=-20&x=20');
		});

		it('([{ name: x, value: y }, ... ]) escaping required', function () {
			var arr = [
				{ name: 'dotted.name.intact', value: '$@%' },
				{ name: '$ $', value: 20 },
				{ name: 'leave britney alone', value: 'waa haa haa' }
			];

			expect(DG.ajax.toQueryString(arr)).to.be.eql('dotted.name.intact=%24%40%25&%24+%24=20&leave+britney+alone=waa+haa+haa');
		});
	});

});