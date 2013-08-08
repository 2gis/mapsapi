var scheduleDemoData = {

    // Будни одинаково, выходные выходные
    default: {
        model: {
            "Mon": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
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
                    "to": "18:00"
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

    // Ежедневно одинаково
    everyday: {
        model: {
            "Mon": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
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
                    "to": "18:00"
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
            "Sat": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "18:00"
                }]
            },
            "Sun": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "18:00"
                }]
            },
            "comment": null
        }
    },

    // До нуля
    evently: {
        model: {
            "Mon": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "00:00"
                }]
            },
            "Tue": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "00:00"
                }]
            },
            "Wed": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "00:00"
                }]
            },
            "Thu": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "00:00"
                }]
            },
            "Fri": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "00:00"
                }]
            },
            "comment": null
        }
    },

    // Будни одинаково, суббота сокращённо
    eventlySat: {
        model: {
            "Mon": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
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
                    "to": "18:00"
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
            "Sat": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "17:00"
                }]
            },
            "comment": null
        }
    },

    // Максимум часов в субботу
    eventlySatMax: {
        model: {
            "Mon": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
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
                    "to": "18:00"
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
            "Sat": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "19:00"
                }]
            },
            "comment": null
        }
    },

    // Круглосуточно без выходных
    alltime: {
        model: {
            "Mon": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Tue": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Wed": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Thu": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Fri": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Sat": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Sun": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "comment": null
        }
    },

    // Круглосуточно кроме выходных среды и воскресенья
    thuHol: {
        model: {
            "Mon": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Tue": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Wed": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Fri": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "Sat": {
                "round_the_clock": true,
                "working_hours": [{
                    "from": "00:00",
                    "to": "00:00"
                }]
            },
            "comment": null
        }
    },

    // Будни, начало недели во вторник, рабочая среда-пятница
    strangeWeek: {
        model: {
            "Wed": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "00:00",
                    "to": "23:00"
                }]
            },
            "Thu": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "00:00",
                    "to": "23:00"
                }]
            },
            "Fri": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "00:00",
                    "to": "23:00"
                }]
            },
            "comment": null
        }
    },

    // Пон-среда, пятница-воскресенье больше часов
    periods2: {
        model: {
            "Mon": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "13:00"
                }, {
                    "from": "14:00",
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
                    "to": "19:00"
                }]
            },
            "Sat": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "13:00"
                }, {
                    "from": "14:00",
                    "to": "19:00"
                }]
            },
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

    //
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

    oneMinuteLeft: {
        model: {
            "Mon": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "13:06"
                }]
            },
            "comment": null
        }
    },

    foraWeek: {
        model: {
            "Mon": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:31",
                    "to": "13:05"
                }]
            },
            "comment": null
        }
    },

    // Много обедов
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
    },

    night: {
        model: {
            "Mon": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "05:00"
                }]
            },
            "Tue": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "01:00"
                }]
            },
            "Wed": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "02:00"
                }]
            },
            "Fri": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "04:00"
                }]
            },
            "Sat": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "17:00"
                }, {
                    "from": "18:00",
                    "to": "04:00"
                }]
            },
            "Sun": {
                "round_the_clock": false,
                "working_hours": [{
                    "from": "10:00",
                    "to": "04:00"
                }]
            },
            "comment": null
        }
    },

    tooEarly: {
        model: {
            Mon: {
                round_the_clock: false,
                working_hours: [{
                    from: "12:00",
                    to: "00:00"
                }]
            },
            Tue: {
                round_the_clock: false,
                working_hours: [{
                    from: "12:00",
                    to: "00:00"
                }]
            },
            Wed: {
                round_the_clock: false,
                working_hours: [{
                    from: "12:00",
                    to: "00:00"
                }]
            },
            Thu: {
                round_the_clock: false,
                working_hours: [{
                    from: "12:00",
                    to: "00:00"
                }]
            },
            Fri: {
                round_the_clock: false,
                working_hours: [{
                    from: "12:00",
                    to: "00:00"
                }]
            },
            Sat: {
                round_the_clock: false,
                working_hours: [{
                    from: "12:00",
                    to: "00:00"
                }]
            },
            Sun: {
                round_the_clock: false,
                working_hours: [{
                    from: "12:00",
                    to: "00:00"
                }]
            },
            comment: "до последнего клиента"
        }
    },

    sberBank: {
        model: {
            Mon: {
                round_the_clock: false,
                working_hours: [{
                    from: "09:00",
                    to: "19:00"
                }]
            },
            Tue: {
                round_the_clock: false,
                working_hours: [{
                    from: "09:00",
                    to: "19:00"
                }]
            },
            Wed: {
                round_the_clock: false,
                working_hours: [{
                    from: "09:00",
                    to: "19:00"
                }]
            },
            Thu: {
                round_the_clock: false,
                working_hours: [{
                    from: "09:00",
                    to: "19:00"
                }]
            },
            Fri: {
                round_the_clock: false,
                working_hours: [{
                    from: "09:00",
                    to: "19:00"
                }]
            },
            Sat: {
                round_the_clock: false,
                working_hours: [{
                    from: "10:00",
                    to: "16:00"
                }]
            },
            Sun: null,
            comment: null
        }
    }
};
