DG.Geoclicker.clampHelper = function(el, lineClamp) {
    var measure, text, lineWidth,
        lineStart, lineCount, wordStart,
        line, lineText, wasNewLine,
        ce = document.createElement.bind(document),
        ctn = document.createTextNode.bind(document);

    // measurement element is made a child of the clamped element to get it's style
    measure = ce('span');

    (function(s) {
        s.position = 'absolute'; // prevent page reflow
        s.whiteSpace = 'pre'; // cross-browser width results
        s.visibility = 'hidden'; // prevent drawing
        s.margin = '0 18px 8px 0';
    })(measure.style);

    // make sure the element belongs to the document
    if (!el.ownerDocument || el.ownerDocument !== document) {
        return;
    }
    // reset to safe starting values
    lineStart = wordStart = 0;
    lineCount = 1;
    wasNewLine = false;
    lineWidth = el.clientWidth;
    // get all the text, remove any line changes
    text = (el.textContent || el.innerText).replace(/\n/g, ' ');
    // remove all content
    while (el.firstChild !== null) {
        el.removeChild(el.firstChild);
    }
    // add measurement element within so it inherits styles
    el.appendChild(measure);
    // http://ejohn.org/blog/search-and-dont-replace/
    text.replace(/ |-/g, function(m, pos) {
        // ignore any further processing if we have total lines
        if (lineCount === lineClamp) {
            return;
        }
        // create a text node and place it in the measurement element
        measure.appendChild(ctn(text.substr(lineStart, pos - lineStart)));
        // have we exceeded allowed line width?
        if (lineWidth < measure.clientWidth) {
            if (wasNewLine) {
                // we have a long word so it gets a line of it's own
                lineText = text.substr(lineStart, pos + 1 - lineStart);
                // next line start position
                lineStart = pos + 1;
            } else {
                // grab the text until this word
                lineText = text.substr(lineStart, wordStart - lineStart);
                // next line start position
                lineStart = wordStart;
            }
            // create a line element
            line = ce('span');
            // add text to the line element
            line.appendChild(ctn(lineText));
            // add the line element to the container
            el.appendChild(line);
            line.className = 'dg-map-geoclicker__clamped-line';
            // yes, we created a new line
            wasNewLine = true;
            lineCount++;
        } else {
            // did not create a new line
            wasNewLine = false;
        }
        // remember last word start position
        wordStart = pos + 1;
        // clear measurement element
        measure.removeChild(measure.firstChild);
    });
    // remove the measurement element from the container
    el.removeChild(measure);
    // create the last line element
    line = ce('span');
    // give styles required for text-overflow to kick in
    line.className = 'dg-map-geoclicker__clamped-line dg-map-geoclicker__clamped-line_last';
    // add all remaining text to the line element
    line.appendChild(ctn(text.substr(lineStart)));
    // add the line element to the container
    el.appendChild(line);
};
