(function() {
    function loadCSS(link) {
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', link);
        document.getElementsByTagName('head')[0].appendChild(css);
    }

    var js;

    function loadJS(link) {
        js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', link);
        document.getElementsByTagName('head')[0].appendChild(js);
    js.onLoad = fucntion() {
            fn();

        }

    }

    var scripts = document.getElementsByTagName("script");
    var scriptURI = scripts[scripts.length-1].src;
    var url = scriptURI.split('?');

    loadCSS('http://127.0.0.1:3000/style.css');
    loadJS('http://127.0.0.1:3000/js?' + url[1]);



    var fn;




    window.L. = {};
    window.L.onLoad = functin(cbk) {
        fn = cbk;

        L.__fn = cbk;
    };



})();