describe("DG Project Detector Module", function () {
    var map,
        spy;
    L.DG = L.DG || {};
    var ajax = function (params) {
        var success = params.success || function () {
            },
            data = {"api_version":"1.3", "response_code":"200", "total":4, "result":[
                {"id":69, "name":"\u0410\u0431\u0430\u043a\u0430\u043d", "code":"abakan", "alias":"", "geo_id":"9711311898279938", "language":"ru", "timezone":"Australia\/Perth", "actual_extent":"POLYGON((91.1443354808024 53.9015992237795,91.826689329138 53.9015992237795,91.826689329138 53.5690755803025,91.1443354808024 53.5690755803025,91.1443354808024 53.9015992237795))", "centroid":"POINT(91.414216434377224 53.71583526209681)", "firmscount":6116, "filialscount":7617, "rubricscount":808, "geoscount":25858, "road_extent":"POLYGON((91.14801009294 53.9014520629569,91.8265869396161 53.9014520629569,91.8265869396161 53.5691516138614,91.14801009294 53.5691516138614,91.14801009294 53.9014520629569))", "country_code":"ru", "transport":true, "flamp":false, "zoomlevel":"11", "min_zoomlevel":"9", "max_zoomlevel":"17", "grammatical_cases":{"genitive":"\u0410\u0431\u0430\u043a\u0430\u043d\u0430", "prepositional":"\u0410\u0431\u0430\u043a\u0430\u043d\u0435"}, "transport_routes_count":76, "timezone_as_offset":480},
                {"id":32, "name":"\u041c\u043e\u0441\u043a\u0432\u0430", "code":"moscow", "alias":"", "geo_id":"4504024829132802", "language":"ru", "timezone":"Europe\/Moscow", "actual_extent":"POLYGON((36.7589630172697 56.1094646431598,38.2250238753343 56.1094646431598,38.2250238753343 55.1040131823858,36.7589630172697 55.1040131823858,36.7589630172697 56.1094646431598))", "road_extent":"POLYGON((36.7610601084616 56.1092075504625,38.2248810366407 56.1092075504625,38.2248810366407 55.104029118012,36.7610601084616 55.104029118012,36.7610601084616 56.1092075504625))", "centroid":"POINT(37.62017 55.753466)", "firmscount":180402, "filialscount":263815, "rubricscount":1177, "geoscount":548314, "transport":true, "flamp":true, "zoomlevel":"11", "country_code":"ru", "min_zoomlevel":"9", "max_zoomlevel":"18", "grammatical_cases":{"genitive":"\u041c\u043e\u0441\u043a\u0432\u044b", "prepositional":"\u041c\u043e\u0441\u043a\u0432\u0435"}, "transport_routes_count":1920, "timezone_as_offset":240},
                {"id":1, "name":"\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a", "code":"novosibirsk", "alias":"novosibirsk", "geo_id":"141162690117634", "language":"ru", "timezone":"Asia\/Novosibirsk", "actual_extent":"POLYGON((82.5066233234198 55.249037769223,83.3965344871157 55.249037769223,83.3965344871157 54.5530320570113,82.5066233234198 54.5530320570113,82.5066233234198 55.249037769223))", "road_extent":"POLYGON((82.5098186904153 55.2482523910718,83.3965167149373 55.2482523910718,83.3965167149373 54.553494545566,82.5098186904153 54.553494545566,82.5098186904153 55.2482523910718))", "centroid":"POINT(82.921475 55.026472)", "firmscount":45037, "filialscount":63853, "rubricscount":971, "geoscount":147102, "transport":true, "traffic":true, "flamp":true, "zoomlevel":"11", "country_code":"ru", "min_zoomlevel":"9", "max_zoomlevel":"18", "grammatical_cases":{"genitive":"\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430", "prepositional":"\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0435"}, "transport_routes_count":283, "timezone_as_offset":420},
                {"id":15, "name":"\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a", "code":"chelyabinsk", "alias":"", "geo_id":"2111487527092226", "language":"ru", "actual_extent":"POLYGON((61.1854857899909 55.3198263279035,61.7445803307041 55.3198263279035,61.7445803307041 54.9904624310221,61.1854857899909 54.9904624310221,61.1854857899909 55.3198263279035))", "timezone":"Indian\/Chagos", "road_extent":"POLYGON((61.1858198153393 55.3187257467909,61.7436807128246 55.3187257467909,61.7436807128246 54.993029668379,61.1858198153393 54.993029668379,61.1858198153393 55.3187257467909))", "centroid":"POINT(61.412323319167093 55.1516966119992)", "firmscount":23328, "filialscount":34831, "rubricscount":926, "geoscount":48930, "transport":true, "flamp":false, "zoomlevel":"11", "country_code":"ru", "min_zoomlevel":"9", "max_zoomlevel":"18", "grammatical_cases":{"genitive":"\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430", "prepositional":"\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0435"}, "transport_routes_count":220, "timezone_as_offset":360},
            ]};

        window.setTimeout(function () {
            success(data);
        }, 200);
    };

    describe("All positive test", function () {
        describe("when ajax return data result", function () {

            beforeEach(function () {
                L.DG.Jsonp = ajax;
                map = new L.Map(document.createElement('div'), {
                    center:new L.LatLng(54.980206086231, 82.898068362003),
                    zoom:10
                });
                spy = jasmine.createSpy();
            });

            afterEach(function () {
                map = null;
                spy = null;
            });

            /**
             * Проверка, что событие projectchange срабатывает при смене проекта
             *
             * - Проверяем, что вызвалось событие projectchange при смене проекта
             *
             * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
             * @version 1.0.0
             * @module L.DG.ProjectDetector
             */
            it("should fire a projectchange event ", function () {
                map.on('projectchange', spy);

                waitsFor(function () {
                    return spy.callCount === 1;
                });

                runs(function () {
                    expect(spy).toHaveBeenCalled();
                });
            });

            /**
             * Проверка, что событие projectleave сработало
             *
             * - Проверяем, что вызвалось событие projectchange
             * - Проверяем, что вызвалось событие projectleave при выходе за проект
             *
             * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
             * @version 1.0.0
             * @module L.DG.ProjectDetector
             */
            it("should fire a projectleave event", function () {
                map.on('projectleave', spy);

                window.setTimeout(function () {
                    map.setView([55.12776575426648, 81.05661392211914], 16);
                }, 200);

                waitsFor(function () {
                    return spy.callCount === 1;
                });

                runs(function () {
                    expect(spy).toHaveBeenCalled();
                });
            });

            /**
             * Проверка, что метод getProject() события "projectchange" возвращает корректный проект
             *
             * - Подписываемся на событие "projectchange"
             * - Вызываем метод и роверяем что значение определено
             *
             * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
             * @version 1.0.0
             * @module L.DG.ProjectDetector
             */
            describe("#getProject", function () {
                it("event method should be return correct project", function () {
                    map.on('projectchange', spy);

                    waitsFor(function () {
                        return spy.callCount === 1;
                    });

                    runs(function () {
                        var project = spy.mostRecentCall.args[0].getProject();

                        expect(spy).toHaveBeenCalled();
                        expect(project.code).toContain('novosibirsk');
                    });
                });
            });

            /**
             * Проверка, что метод getCurrentProject() возвращает корректный проект
             *
             * - Переопределяем колбек getCurrentProject
             * - Проверяем, что колбек вызвался
             * - Проверяем что в колбеке лежит корректный проект
             *
             * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
             * @version 1.0.0
             * @module L.DG.ProjectDetector
             */
            describe("#getCurrentProject", function () {
                it("should be return correct project", function () {
                    map.setView([55.175230853665, 61.401336991042 ], 13);

                    map.dgProjectDetector.getCurrentProject(spy);

                    waitsFor(function () {
                        return spy.callCount === 1;
                    });

                    runs(function () {
                        var project = spy.mostRecentCall.args[0];
                        expect(project.code).toBe("chelyabinsk");
                    });
                });
            });

            /**
             * Проверка, что метод getCurrentProject() вызывает все переданные ему функции обратного вызова
             *
             * - Добавим в метод getCurrentProject несколько колбеков
             * - Проверяем, что колбеки вызвались
             * - Проверяем что в колбеках лежат корректные данные
             *
             * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
             * @version 1.0.0
             * @module L.DG.ProjectDetector
             */
            describe("#getCurrentProject", function () {
                it("should be return correct project and all callback call", function () {
                    var spy1 = jasmine.createSpy();
                    var spy2 = jasmine.createSpy();

                    map.dgProjectDetector.getCurrentProject(spy1);
                    map.dgProjectDetector.getCurrentProject(spy2);

                    waitsFor(function () {
                        return spy1.callCount === 1;
                    });

                    runs(function () {
                        var project1 = spy1.mostRecentCall.args[0];
                        var project2 = spy2.mostRecentCall.args[0];

                        expect(spy1).toHaveBeenCalled();
                        expect(spy2).toHaveBeenCalled();
                        expect(project1).toEqual(project2);
                    });
                });
            });

            /**
             * Проверка, что метод getAllProjects() возвращает все проекты
             *
             * - Переопределяем колбек getAllProjects
             * - Проверяем, что колбек вызвался
             * - Проверяем что в колбеке лежат корректные данные
             *
             * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
             * @version 1.0.0
             * @module DGProjectDetector
             */
            describe("#getAllProjects", function () {
                it("should be return correct list", function () {
                    map.dgProjectDetector.getAllProjects(spy);

                    waitsFor(function () {
                        return spy.callCount === 1;
                    });

                    runs(function () {
                        var projectsList = spy.mostRecentCall.args[0];
                        expect(spy).toHaveBeenCalled();
                        expect(projectsList.length).toBe(4);
                    });
                });
            });

            /**
             * Проверка, что метод getAllProjects() вызывает все переданные ему функции обратного вызова
             *
             * - Добавим в метод getAllProjects несколько колбеков
             * - Проверяем, что колбеки вызвались
             * - Проверяем что в колбеках лежат корректные данные
             *
             * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
             * @version 1.0.0
             * @module L.DG.ProjectDetector
             */
            describe("#getAllProjects", function () {
                it("should be return correct list and call all callback", function () {
                    var spy1 = jasmine.createSpy();
                    var spy2 = jasmine.createSpy();

                    map.dgProjectDetector.getAllProjects(spy1);
                    map.dgProjectDetector.getAllProjects(spy2);

                    waitsFor(function () {
                        return spy1.callCount === 1;
                    });

                    runs(function () {
                        var projectsList1 = spy1.mostRecentCall.args[0];
                        var projectsList2 = spy2.mostRecentCall.args[0];

                        expect(spy1).toHaveBeenCalled();
                        expect(spy2).toHaveBeenCalled();
                        expect(projectsList1).toEqual(projectsList2);
                    });
                });
            });
        });
    });

    describe("All negative test", function () {
        describe("when ajax return empty data", function () {

            beforeEach(function () {
                var ajax = function (params) {
                    var success = params.success || function () {
                        },
                        data = {"api_version":"1.3", "response_code":"400", "total":0, "result":"error"};

                    window.setTimeout(function () {
                        success(data);
                    }, 200);
                };

                L.DGAjax = ajax;

                map = new L.Map(document.createElement('div'), {
                    center:new L.LatLng(54.980206086231, 82.898068362003),
                    zoom:10
                });
                spy = jasmine.createSpy();
            });

            afterEach(function () {
                map = null;
                spy = null;
            });

            /**
             * Проверка, что событие projectchange не вызвалось при не корректном ответе сервера
             *
             * - Проверяем, что не вызвалось событие projectchange при неверном ответе сервера
             *
             * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
             * @version 1.0.0
             * @module L.DG.ProjectDetector
             */
            it("not should fire a projectchange event ", function () {
                map.on('projectchange', spy);

                map.setView([55.12776575426648, 81.05661392211914], 16);

                waitsFor(function () {
                    return spy.callCount === 0;
                });

                runs(function () {
                    expect(spy).not.toHaveBeenCalled();
                });
            });


            /**
             * Проверка, что метод getCurrentProject() не вызвался при неверном ответе сервера
             *
             * - Переопределяем колбек getCurrentProject
             * - Проверяем, что колбек не вызвался
             *
             * @author Dima Rudenko <dm.rudenko@2gis.kiev.ua>
             * @version 1.0.0
             * @module L.DG.ProjectDetector
             */
            describe("#getCurrentProject", function () {
                it("when getCurrentProject not call ", function () {
                    map.dgProjectDetector.getCurrentProject(spy);

                    map.setView([54.980206086231, 82.898068362003], 13);

                    waitsFor(function () {
                        return spy.callCount === 0;
                    });

                    runs(function () {
                        expect(spy).not.toHaveBeenCalled();
                    });
                });
            });
        });
    });
});
