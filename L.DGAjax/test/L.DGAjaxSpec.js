describe("DG AJAX", function() {

    it("should be return cancel callback function", function() {

        var ajax = L.DGAjax({
            url: 'http://127.0.0.1:3000/test',
            data: {
                output: 'jsonp',
                key: 'ruxlih0718',
                version: 1.3,
                lang: 'ru'
            }
        });

        expect(ajax).toBeDefined();
        expect(ajax.cancel).toBeDefined();
    });

    it("should be get data", function() {

        var ajax = L.DGAjax({
            url: 'http://127.0.0.1:3000/test',
            success: function(data) {
                console.log(data);
            },
            error: function(error) {
                console.log(error);
            }
        });




        //expect(ajax).toBeDefined();
        //expect(ajax.cancel).toBeDefined();
    });








//    it("should be return cancel callback function", function() {
//
//// before
//
//        var scriptMock = {};
//
//
//        L.DGAjax._createScript = function() {
//            return scriptMock;
//        };
//
//
////  test1
//        var spyFunc = function() {
//
//        }
//
//        var ajax = L.DGAjax({
//            url: 'http://catalog.api.2gis.ru/project/list',
//            data: {
//                output: 'jsonp',
//                key: 'ruxlih0718',
//                version: 1.3,
//                lang: 'ru'
//            },
//            success : spyFunc
//        });
//
//        myData = {}
//        scriptMock._cbk(myData);
//
//        spyFunc.shouldBeCalled().shoudGetArgument(myData);
//
//
//
//
//
//    });



});