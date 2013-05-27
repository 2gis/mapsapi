describe("DG JSONP Module", function() {
    this.timeout(500);

    it("should get a success response", function (done) {
        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/test',
            success: function(data) {
                expect(data === "{ pathname: 'test' }");
                done();
            }
        });
    });

    it("should get an error response on empty url", function (done) {
        L.DG.Jsonp({
            timeout: 1,
            error: function() {
                done();
            }
        });
    });

    it("should get an error response on bad server request", function (done) {
        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/',
            error: function() {
                done();
            }
        });
    });

    it("should call beforeSend callback", function (done) {
        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/test',
            beforeSend: function() {
                done();
            }
        });
    });

    it("should call complete callback", function (done) {
        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/test',
            complete: function() {
                done();
            }
        });
    });

    it("should return cancel callback method", function() {
        var jsonp = L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/test'
        });

        expect(jsonp).to.be.a('object');
        expect(jsonp.cancel).to.be.a('function');
    });

    it("should prevent callback method run on cancel call", function (done) {
        var spy = sinon.spy();

        var jsonp = L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/test',
            success: function() {
                spy();
            }
        });

        jsonp.cancel();

        setTimeout(function () {
           expect(spy.called).to.equal(false);
           done();
        }, 10);

   });

    it("should not mixed 2 callbaks", function (done) {
        var spyA = sinon.spy(),
            spyB = sinon.spy();

        var jsonp = L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/testA',
            success: function(resp) {
                spyA(resp);
            }
        });

        var jsonp = L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/testB',
            success: function(resp) {
                spyB(resp);
            }
        });

        setTimeout(function () {
           expect(spyA.calledOnce).to.equal(true);
           expect(spyA.calledWith({ pathname : 'testA' })).to.equal(true);

           expect(spyB.calledOnce).to.equal(true);
           expect(spyB.calledWith({ pathname : 'testB' })).to.equal(true);
           done();
        }, 100);
    });
});
