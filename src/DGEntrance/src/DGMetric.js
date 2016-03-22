/*
 * Utility functions
 */
DG.Metric = function () {};


DG.Metric.Segments = function () {
    this.length = 0;
};
DG.Metric.Segments.prototype = {
    push: function (len) {
        this[this.length] = this.length > 0 ? this[this.length - 1] + len : len;
        this.length += 1;
        return this;
    },
    getLength: function () {
        return this[this.length - 1];
    },
    getReverse: function () {
        var newPL = new DG.PathLength();
        var i = this.length - 1;
        if (i < 0) return newPL;        //  eslint-disable-line curly
        while (i--) {
            newPL.push(this[i + 1] - this[i]);
        }
        return newPL.push(this[0]);
    },
    getIndex: function (len) {
        var i = this.length - 1;
        while (i--) {
            if (this[i] <= len) break;  //  eslint-disable-line curly
        }
        return i + 1;
    },
    getSegRatio: function (len) {
        var i = this.getIndex(len),
            sub = i > 0 ? this[i - 1] : 0;
        return (len - sub) / (this[i] - sub);
    },
    getSegLength: function (len) {
        var i = this.getIndex(len),
            sub = i > 0 ? this[i - 1] : 0;
        return len - sub;
    }
};
