L.DG.FirmCard = function () {

    var test = {
            //style: 'top: 7px; left: 512px; width: 376px;',

            // Будни одинаково, выходные выходные
            default: {
                model: {
                    "Mon": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "16:00"
                        }, {
                            "from": "17:00",
                            "to": "18:00"
                        }]
                    },
                    "Tue": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "18:00"
                        }]
                    },
                    "Wed": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "12:00"
                        }, {
                            "from": "18:00",
                            "to": "19:00"
                        }]
                    },
                    "Thu": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "18:00"
                        }]
                    },
                    "Fri": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "18:00"
                        }]
                    },
                    "comment": null
                }
            },

            periods3: {
                model: {
                    "Sun": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "13:00"
                        }, {
                            "from": "14:00",
                            "to": "19:00"
                        }]
                    },
                    "comment": null
                }
            },

            lunches: {
                model: {
                    "Mon": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "13:00"
                        }, {
                            "from": "14:00",
                            "to": "15:00"
                        }, {
                            "from": "16:00",
                            "to": "18:00"
                        }]
                    },
                    "Tue": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "13:00"
                        }, {
                            "from": "14:00",
                            "to": "15:00"
                        }, {
                            "from": "16:00",
                            "to": "18:00"
                        }]
                    },
                    "Wed": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "13:00"
                        }, {
                            "from": "14:00",
                            "to": "15:00"
                        }, {
                            "from": "16:00",
                            "to": "18:00"
                        }]
                    },
                    "Fri": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "13:00"
                        }, {
                            "from": "14:00",
                            "to": "15:00"
                        }, {
                            "from": "16:00",
                            "to": "18:00"
                        }]
                    },
                    "Sat": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "13:00"
                        }, {
                            "from": "16:00",
                            "to": "18:00"
                        }]
                    },
                    "Sun": {
                        "round_the_clock": false,
                        "working_hours": [{
                            "from": "10:00",
                            "to": "13:00"
                        }, {
                            "from": "14:00",
                            "to": "15:00"
                        }, {
                            "from": "16:00",
                            "to": "18:00"
                        }]
                    },
                    "comment": null
                }
            }

        };

        function mockTime(timestamp) { // +7 - Novosibirsk
            return timestamp + (3 + new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000;
        }
        var tr = transform(test.periods3.model, {now: mockTime(0)}),
            fr = forecast(tr, {maxHours: 3});
        console.log(tr);
        console.log('прогноз', fr);


        var timestamp = 654524560; // UNIX timestamp in seconds
        var xx = new Date();
        xx.setTime(timestamp*1000); // javascript timestamps are in milliseconds
/*        console.log(xx.toUTCString());
        console.log(xx.getDay());*/
        /*console.log('До нуля', transform(test.evently.model, params));
        console.log('Будни одинаково, суббота сокращённо', transform(test.eventlySat.model, params));
        console.log('Максимум часов в субботу', transform(test.eventlySatMax.model, params));
        console.log('Круглосуточно без выходных', transform(test.alltime.model, params));
        console.log('Будни, начало недели во вторник, рабочая среда-пятница', transform(test.strangeWeek.model, params));
        console.log('periods3', transform(test.periods3.model, params));*/
}
