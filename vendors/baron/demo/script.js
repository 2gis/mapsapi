window.onload = function() {
    window.dima = baron({
        scroller: '.wrapper_1 .scroller',
        bar: '.scroller__bar',
        barOnCls: 'baron'
    }).fix({
        elements: '.header__title',
        outside: 'header__title_state_fixed',
        before: 'header__title_position_top',
        after: 'header__title_position_bottom'
    }).pull({
        block: '.load',
        elements: [{
            self: '.load__value',
            property: 'width'
        }],
        limit: 115,
        callback: function() {
            $('.load').css('background', 'red');
        }
    });

    baron({
        scroller: '.wrapper_2 .scroller',
        bar: '.scroller__bar',
        barOnCls: 'baron'
    }).fix({
        elements: '.header__title',
        outside: 'header__title_state_fixed',
        before: 'header__title_position_top',
        after: 'header__title_position_bottom'
    }).baron({
        barOnCls: 'baron_h',
        bar: '.scroller__bar_h'
    });
};