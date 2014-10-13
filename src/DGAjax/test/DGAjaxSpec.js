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

    describe('send request', function() {
        var xhr, requests, url, data, ajax, spyError, spySuccess, thenSuccess, thenError, clock;

        before(function() {
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];

            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            };
        });

        after(function() {
            xhr.restore();
            xhr = requests = url = data = ajax = spyError = spySuccess = thenSuccess = thenError = clock = null;
        });

        function testSuccess(type) {
            describe('type: ' + type + ', respond success', function() {
                before(function() {
                    url = 'http://test-url.ru';
                    data = {a: 1, b: 3};
                    spySuccess = sinon.spy();
                    spyError = sinon.spy();
                    thenSuccess = sinon.spy();
                    thenError = sinon.spy();

                    ajax = DG.ajax(url, {
                        data: data,
                        type: type,
                        success: spySuccess,
                        error: spyError
                    }).then(thenSuccess, thenError);
                });

                after(function() {
                    requests = [];
                    url = data = spyError = spySuccess = thenSuccess = thenError = null;
                });

                it('should only one request', function() {
                    expect(requests.length).to.be(1);
                });

                it('should sended request url contain url', function() {
                    expect(requests[0].url).to.contain(url);
                });

                it('should call success', function(done) {
                    requests[0].respond(200, {"Content-Type": "application/json"}, '[{ "z": 10, "x": "20" }]');

                    setTimeout(function() {
                        expect(spySuccess.calledOnce).to.be.ok();
                        done();
                    }, 0);
                });

                it('should call thenSuccess', function() {
                    expect(thenSuccess.calledOnce).to.be.ok();
                });

                it('shouldn\'t call error', function() {
                    expect(spyError.called).not.be.ok();
                });

                it('shouldn\'t call thenError', function() {
                    expect(thenError.called).not.be.ok();
                });
            });
        }

        testSuccess('get');
        testSuccess('post');

        describe('respond error', function() {
            before(function() {
                url = 'http://test-url.ru';
                data = {a: 1, b: 3};
                spySuccess = sinon.spy();
                spyError = sinon.spy();
                thenSuccess = sinon.spy();
                thenError = sinon.spy();

                ajax = DG.ajax(url, {
                    data: data,
                    type: 'post',
                    success: spySuccess,
                    error: spyError
                }).then(thenSuccess, thenError);
            });

            after(function() {
                requests = [];
                url = data = spyError = spySuccess = thenSuccess = thenError = null;
            });

            it('shouldn\'t call success', function(done) {
                requests[0].respond(400, {"Content-Type": "application/json"}, '[{ "z": 10, "x": "20" }]');

                setTimeout(function() {
                    expect(spySuccess.called).not.be.ok();
                    done();
                }, 0);
            });

            it('shouldn\'t call thenSuccess', function() {
                expect(thenSuccess.calledOnce).not.be.ok();
            });

            it('should call error', function() {
                expect(spyError.calledOnce).to.be.ok();
            });

            it('should call thenError', function() {
                expect(thenError.calledOnce).to.be.ok();
            });
        });

        describe('check timeout', function() {
            before(function() {
                url = 'http://test-url.ru';
                data = {a: 1, b: 3};
                spySuccess = sinon.spy();
                spyError = sinon.spy();
                thenSuccess = sinon.spy();
                thenError = sinon.spy();

                ajax = DG.ajax(url, {
                    data: data,
                    type: 'post',
                    success: spySuccess,
                    error: spyError,
                    timeout: 10
                }).then(thenSuccess, thenError);
            });

            after(function() {
                requests = [];
                url = data = spyError = spySuccess = thenSuccess = thenError = clock = null;
            });

            it('shouldn\'t call success after timeout', function(done) {
                setTimeout(function() {
                    requests[0].respond(200, {"Content-Type": "application/json"}, '[{ "z": 10, "x": "20" }]');

                    setTimeout(function() {
                        expect(spySuccess.called).not.be.ok();
                        expect(thenSuccess.called).not.be.ok();
                        done();
                    }, 0);
                }, 50);
            });
        });
    });
});
