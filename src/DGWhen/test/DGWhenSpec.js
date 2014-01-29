/*global describe:false, it:false, expect:false */
describe('DG.when', function () {

	var fakePromise, sentinel, other;

	function identity(val) { return val; }
	function constant(val) { return function() { return val; }; }

	sentinel = {};
	other = {};

	fakePromise = new FakePromise();

	// Untrusted, non-Promises/A-compliant promise
	function FakePromise(val) {
		this.then = function (cb) {
			if (cb) {
				cb(val);
			}
			return this;
		};
	}

	describe('when-test', function (require) {

		var when;

		when = DG.when;

		it('should return a promise for a value', function() {
			var result = when(1);
			expect(result.then).to.be.a('function');
		});

		it('should return a promise for a promise', function() {
			var result = when(fakePromise);
			expect(result.then).to.be.a('function');
		});

		it('should not return the input promise', function() {
			var result = when(fakePromise, identity);
			expect(result.then).to.be.a('function');
			expect(result).not.to.be(fakePromise);
		});

		it('should return a promise that forwards for a value', function(done) {
			var result = when(1, constant(2));

			expect(result.then).to.be.a('function');

			result.then(
				function(val) {
					expect(val).to.be(2);
					done();
				},
				function(){
					done(new Error());
				}
			);
		});

		it('should invoke fulfilled handler asynchronously for value', function(done) {
			var val = other;

			try {
				return when({}, function() {
					expect(val).to.be(sentinel);
					done();
				});
			} finally {
				val = sentinel;
			}
		});

		it('should invoke fulfilled handler asynchronously for fake promise', function(done) {
			var val = other;

			try {
				return when(fakePromise, function() {
					expect(val).to.be(sentinel);
					done();
				});
			} finally {
				val = sentinel;
			}
		});

		it('should invoke fulfilled handler asynchronously for resolved promise', function(done) {
			var val = other;

			try {
				return when(when.resolve(), function() {
					expect(val).to.be(sentinel);
					done();
				});
			} finally {
				val = sentinel;
			}
		});

		it('should invoke rejected handler asynchronously for rejected promise', function() {
			var val = other;

			try {
				return when(when.reject(),
					function(){
						done(new Error());
					},
					function(){
						expect(val).to.be(sentinel);
					}
				);
			} finally {
				val = sentinel;
			}
		});

		it('should support deep nesting in promise chains', function(done) {
			var d, result;

			d = when.defer();
			d.resolve(false);

			result = when(when(d.promise.then(function(val) {
				var d = when.defer();
				d.resolve(val);
				return when(d.promise.then(identity), identity).then(
					function(val) {
						return !val;
					}
				);
			})));

			result.then(
				function(val) {
					expect(val).to.be.ok();
					done();
				},
				function(){
					done(new Error());
				}
			);
		});

		it('should return a resolved promise for a resolved input promise', function(done) {
			when(when.resolve(true)).then(
				function(val) {
					expect(val).to.be.ok();
					done();
				},
				function(){
					done(new Error());
				}
			);
		});

		it('should assimilate untrusted promises', function () {
			var untrusted, result;

			// unstrusted promise should never be returned by when()
			untrusted = new FakePromise();
			result = when(untrusted);

			expect(result).not.to.be(untrusted);
			expect(result).not.to.be.a(FakePromise);
		});

		it('should assimilate intermediate promises returned by callbacks', function (done) {
			var result;

			// untrusted promise returned by an intermediate
			// handler should be assimilated
			result = when(1,
				function (val) {
					return new FakePromise(val + 1);
				}
			).then(
				function (val) {
					expect(val).to.be(2);
					done();
				},
				function(){
					done(new Error());
				}
			);

			expect(result).not.to.be.a(FakePromise);
		});

		it('should assimilate intermediate promises and forward results', function (done) {
			var untrusted, result;

			untrusted = new FakePromise(1);

			result = when(untrusted, function (val) {
				return new FakePromise(val + 1);
			});

			expect(result).not.to.be(untrusted);
			expect(result).not.to.be.a(FakePromise);

			when(result,
				function (val) {
					expect(val).to.be(2);
					return new FakePromise(val + 1);
				}
			).then(
				function (val) {
					expect(val).to.be(3);
					done();
				},
				function(){
					done(new Error());
				}
			);
		});
	});
});