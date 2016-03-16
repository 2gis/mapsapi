//  ease function: DG.point(0.25, 0.1), DG.point(0.25, 1)

/*
//  TODO    This is a Test case to check Bezier curve returning values
var time = 2000;
var start;
var tb = new DG.TimeBezier(DG.point(0.25, 0.1), DG.point(0.25, 1));
var ab = new DG.ArcBezier([DG.point(0, 0), DG.point(0, 3/4), DG.point(1, 3/4), DG.point(1,0)]);
ab.getTbyL(0);

function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    var pct = tb.getYbyX(progress / time);
    var l = ab._lut[ab._lut.length - 1].l;
    var t = ab.getTbyL(l * pct);
    console.log(pct, ' --- ', t);

    if (progress < time) {
        window.requestAnimationFrame(step);
    }
}

window.setTimeout(function () { window.requestAnimationFrame(step) }, 3000);

*/
