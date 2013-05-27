describe("DG JSONP Module", function() {
    this.timeout(200);

    it("should get a success responce", function (done) {
        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/test',
            success: function(data) {
                expect(data === "{ pathname: 'test' }");
                done();
            }
        });
    });

    it("should get a error responce on empty url", function (done) {
        L.DG.Jsonp({
            timeout: 1000,
            error: function() {
                done();
            }
        });
    });

    it("should get a error responce on bad server request", function (done) {
        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/',
            error: function() {
                done();
            }
        });
    });

    it("should calls a beforeSend callback", function (done) {
        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/test',
            beforeSend: function() {
                done();
            }
        });
    });

    it("should calls a complete callback", function (done) {
        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/test',
            complete: function() {
                done();
            }
        });
    });

    it("should be return cancel callback method", function() {

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

    it("should that 2 callbaks are not mixed", function (done) {
        var callbackA = sinon.spy(),
            callbackB = sinon.spy();

        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/testA',
            success: callbackA
        });

        L.DG.Jsonp({
            url: 'http://127.0.0.1:3005/testB',
            success: callbackB
        });

        setTimeout(function () {
            expect(callbackA.calledOnce).to.be.ok();
            expect(callbackB.calledOnce).to.be.ok();

            expect(callbackA.calledWith({ pathname : 'testA' })).to.be.ok();
            expect(callbackB.calledWith({ pathname : 'testB' })).to.be.ok();
            done();
        }, 10);
    });
});
