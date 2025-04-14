describe('DG.ApiKeyValidator', function() {
    afterEach(function() {
        validator = null;
    });

    describe('#validate', function() {
        var xhr;
        var requests = [];
        var testApiKey = window.__karma__.config.secretKey;
        var validator;
        beforeEach(function() {
            validator = new DG.ApiKeyValidator(testApiKey);
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function(req) { requests.push(req); };
        });

        afterEach(function() {
            xhr.restore();
            validator.destroy();
            validator = null;
        });


        it('should make a request to the correct endpoint', function() {
            validator.validate(function() {});
            expect(requests.length).to.be(1);
            expect(requests[0].url).to.be(validator.endpoint);
            expect(requests[0].method).to.be('GET');
        });

        it('should handle successful response', function(done) {
            var response = {
                meta: {code: 200},
                result: {
                    // eslint-disable-next-line camelcase
                    is_active: true,
                    service: {
                        // eslint-disable-next-line camelcase
                        is_active: true,
                        status: {
                            code: 'ok'
                        }
                    }
                }
            };

            validator.validate(function(result) {
                expect(result.result.service.is_active).to.eql(response.result.service.is_active);
                expect(validator.isLoading).to.be(false);
                done();
            });

            requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify(response));
        });
    });

    describe('#invalid', function() {
        var xhr;
        var requests = [];
        var invalidApiKey = window.__karma__.config.secretInvalidKey;
        var validator;
        beforeEach(function() {
            validator = new DG.ApiKeyValidator(invalidApiKey);
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function(req) { requests.push(req); };
        });

        afterEach(function() {
            xhr.restore();
            validator.destroy();
            validator = null;
        });

        it('should handle insecure response the key service is blocked', function(done) {
            var response = {
                meta: {code: 200},
                result: {
                    // eslint-disable-next-line camelcase
                    is_active: false,
                    service: {
                        // eslint-disable-next-line camelcase
                        is_active: false,
                        status: {
                            code: 'blocked'
                        }
                    }
                }
            };

            validator.validate(function(result) {
                expect(result.result.service.is_active).to.eql(response.result.service.is_active);
                expect(validator.isLoading).to.be(false);
                done();
            });

            requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify(response));
        });
    });

    describe('#empty', function() {
        var xhr;
        var requests = [];
        var validator;
        beforeEach(function() {
            validator = new DG.ApiKeyValidator('');
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function(req) { requests.push(req); };
        });

        afterEach(function() {
            xhr.restore();
            validator.destroy();
            validator = null;
        });

        it('should handle insecure response without key', function(done) {
            var response = {
                meta: {code: 400},
                result: {}
            };

            validator.validate(function(result) {
                expect(result.meta.code).to.eql(response.meta.code);
                expect(validator.isLoading).to.be(false);
                done();
            });
            requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify(response));
        });

    });
});
