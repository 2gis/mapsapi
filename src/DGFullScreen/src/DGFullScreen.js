/**
 *  Full Screen mode control
 */

L.Control.FullScreen = L.Control.extend({

      options: {
        position: 'topright',
        title: 'Full Screen',
        containerClass: 'maxi dg-fullscreen',
        iconClass: 'dg-fullscreen-icon'
      },

      onAdd: function (map) {
        // Check if browser supports fullscreen mode
        if (!fullScreenApi.supportsFullScreen) {
          return map.zoomControl._container;
        }

        var container = L.DomUtil.create('div', this.options.containerClass);

        this._map = map;
        this._isFullscreen = false;
        this.fullScreenControl = container;
        this._fullScreenButton = this._createButton(this.options.title, this.options.iconClass, container, this.toggleFullscreen, this);

        return container;
      },

      _createButton: function (title, className, container, fn, context) {
        var link = L.DomUtil.create('a', className, container);
        link.href = '#';
        link.title = title;

        L.DomEvent
          .addListener(container, 'click', L.DomEvent.stopPropagation)
          .addListener(container, 'click', L.DomEvent.preventDefault)
          .addListener(container, 'click', fn, this);

        return link;
      },

      toggleFullscreen: function () {
        if (!this._isFullscreen) {
          this._enterFullScreen();
        } else {
          this._exitFullScreen();
        }

        this._map.invalidateSize();
      },

      _enterFullScreen: function() {
        var container = this._map._container;

        // update state
        L.DomUtil.addClass(this.fullScreenControl, 'mini');
        L.DomUtil.removeClass(this.fullScreenControl, 'maxi');
        this._isFullscreen = true;

        fullScreenApi.requestFullScreen(container);

        L.DomEvent.addListener(document, 'keyup', this._onKeyUp, this);

        this._map.fire('enterFullscreen');
      },

      _exitFullScreen: function() {
        var container = this._map._container;

        // update state
        L.DomUtil.addClass(this.fullScreenControl, 'maxi');
        L.DomUtil.removeClass(this.fullScreenControl, 'mini');
        this._isFullscreen = false;

        fullScreenApi.cancelFullScreen(container);

        L.DomEvent.removeListener(document, 'keyup', this._onKeyUp);

        this._map.fire('exitFullscreen');
      },

      _onKeyUp: function(e) {
        if (!e) e = window.event;
        if (e.keyCode === 27 && this._isFullscreen === true) {
          this._exitFullScreen();
        }
      }
    });

    L.control.fullscreen = function (options) {
      return new L.Control.FullScreen(options);
    };

    /*
      Native FullScreen JavaScript API
      -------------
      source : http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/
    */

    (function() {
      var
        fullScreenApi = {
          supportsFullScreen: false,
          isFullScreen: function() { return false; },
          requestFullScreen: function() {},
          cancelFullScreen: function() {},
          fullScreenEventName: '',
          prefix: ''
        },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');

      // check for native support
      if (typeof document.exitFullscreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
      } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
          fullScreenApi.prefix = browserPrefixes[i];

          if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
            fullScreenApi.supportsFullScreen = true;

            break;
          }
        }
      }

      // update methods to do something useful
      if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

        fullScreenApi.isFullScreen = function() {
          switch (this.prefix) {
            case '':
              return document.fullScreen;
            case 'webkit':
              return document.webkitIsFullScreen;
            default:
              return document[this.prefix + 'FullScreen'];
          }
        }
        fullScreenApi.requestFullScreen = function(el) {
          return (this.prefix === '') ? el.requestFullscreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function(el) {
          return (this.prefix === '') ? document.exitFullscreen() : document[this.prefix + 'CancelFullScreen']();
        }
      }

      // export api
      window.fullScreenApi = fullScreenApi;
    })();
