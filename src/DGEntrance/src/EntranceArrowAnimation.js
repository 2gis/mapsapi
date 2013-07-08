L.DG.Entrance = L.Class.extend({
   showArrow: {
        id: 'arrowAnimate',
        attributeName: 'stroke-opacity',
        values: "0;1",
        fill: 'freeze',
        dur: '0.2s',
        begin: 'indefinite'
    },

    hideArrow: {
        id: 'hideArrow',
        attributeName: 'stroke-opacity',
        values: "1;0",
        fill: 'freeze',
        dur: '0.2s',
        begin: 'indefinite'
    },

    animateArrowPathGeom = {
        id: 'animateArrowPathGeom',
        attributeName: 'd',
        fill: 'freeze',
        values: 'M 404 178 l -1 0; M 404 178 l 117 51; M 404 178 l 117 51 l 0 -1; M 404 178 l 117 51 l 39 -51',
        //M404 178L521 229L550 178
        //values: 'M 140 180 l -1 0; M 140 180 l -40 0; M 140 180 l -40 0 l 0 -1; M 140 180 l -40 0 l 0 -80',
        keyTimes: this.getAnimateTiming('edgeArrow'), //"0; 0.33; 0.495; 0.66; 0.77; 0.88; 0.935; 1",
        dur: this.getAnimationTime('edgeArrow'),
        begin: 'arrowAnimate.end'
    },

    getAnimateTiming: function (arrowType) {
        if(arrowType == 'simpleArrow') return "0; 0.33; 0.495; 0.66; 0.77; 0.88; 0.935; 1";
        if(arrowType =='edgeArrow') return "0; 0.33; 0.34; 1";
        else return "0; 0.25; 0.26; 0.5; 0.51; 1";
    },

    getAnimationTime: function (arrowType) {
        if(arrowType == 'simpleArrow') return '0.7s';
        else return "0.5s";
    },

});
