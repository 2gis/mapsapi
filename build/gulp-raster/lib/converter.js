'use strict';
/*global phantom: false*/

var webpage = require('webpage');

convert(phantom.args[0], phantom.args[1], Number(phantom.args[2]));

function convert(source, format, scale) {
    var page = webpage.create();

    page.open(source, function (status) {
        if (status !== 'success') {
            console.error('err', 'Unable to load the source file.');

            return phantom.exit(0);
        }

        var dimensions = getSvgDimensions(page);
        page.viewportSize = {
            width: Math.round(dimensions.width * scale),
            height: Math.round(dimensions.height * scale)
        };
        if (!dimensions.usesViewBox) {
            page.zoomFactor = scale;
        }

        // This delay is I guess necessary for the resizing to happen?
        setTimeout(function () {
            console.log(page.renderBase64(format));
            phantom.exit();
        }, 0);
    });
}

function getSvgDimensions(page) {
    return page.evaluate(function () {
        /*global document: false*/

        var el = document.documentElement;
        var bbox = el.getBBox();

        var width = parseFloat(el.getAttribute('width'));
        var height = parseFloat(el.getAttribute('height'));
        var viewBoxWidth = el.viewBox.animVal.width;
        var viewBoxHeight = el.viewBox.animVal.height;
        var usesViewBox = viewBoxWidth && viewBoxHeight;

        if (usesViewBox) {
            if (width && !height) {
                height = width * viewBoxHeight / viewBoxWidth;
            }
            if (height && !width) {
                width = height * viewBoxWidth / viewBoxHeight;
            }
            if (!width && !height) {
                width = viewBoxWidth;
                height = viewBoxHeight;
            }
        }

        if (!width) {
            width = bbox.width + bbox.x;
        }
        if (!height) {
            height = bbox.height + bbox.y;
        }

        return { width: width, height: height, usesViewBox: usesViewBox };
    });
}
