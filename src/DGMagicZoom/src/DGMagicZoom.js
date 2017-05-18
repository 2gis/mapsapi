if (DG.Browser.touch) {
    DG.Map.addInitHook(function() {
        var map = this;
        var firstTouchTime = 0;
        var touchPos;
        var diff;
        var c = 1;
        var first;
        var step = map.getSize().y / 10;

        map.doubleClickZoom.disable();

        function touchendEvent() {
            function touchmoveEvent(e) {
                var pos = e.touches[0];
                diff = pos.clientY - touchPos.clientY;
                console.log('DIFF', diff, c);
                if (Math.abs(diff) > step * c) {
                    console.log('ITER', diff, c);
                    c++;
                    if (diff > 0) {
                        map.zoomIn();
                    }
                    if (diff < 0) {
                        map.zoomOut();
                    }
                }
                event.preventDefault();
            }

            function touchstartEvent(e) {
                if ((Date.now() - firstTouchTime < 500) && e.changedTouches.length === 1) {
                    firstTouchTime = 0;
                    touchPos = e.touches[0];

                    map.dragging.disable();
                    map._container.addEventListener('touchmove', touchmoveEvent, false);
                }
            }

            function movetouchendEvent() {
                console.log('DIS');
                map.dragging.enable();
                map._container.removeEventListener('touchmove', touchmoveEvent);
                map._container.removeEventListener('touchstart', touchstartEvent);
                map._container.removeEventListener('touchend', movetouchendEvent);
                if (Math.abs(diff) < 50) {
                    map.zoomIn();
                }

                c = 1;
                diff = undefined;
                first = undefined;
            }

            firstTouchTime = Date.now();
            map._container.addEventListener('touchstart', touchstartEvent);
            map._container.addEventListener('touchend', movetouchendEvent);
        }

        map._container.addEventListener('touchend', touchendEvent);
    });
}
