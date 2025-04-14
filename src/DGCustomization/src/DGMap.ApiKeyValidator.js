DG.ApiKeyValidator = DG.Class.extend({
    initialize: function(apiKey) {
        this.apiKey = apiKey;
        this.endpoint = 'https://keys.api.2gis.com/public/v1/keys/' + apiKey + '/services/mapgl-js-api';
        this.isLoading = false;
        this.attempts = 0;
        this.lastTimeout = undefined;
        this.request = null;
        this.keyRequestInterval = [0, 2, 4, 16];
    },

    validate: function(callback) {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        this.attempts = 0;
        this._makeAttempt(callback);
    },

    _makeAttempt: function(callback) {
        if (this.attempts > 0) {
            this.lastTimeout = window.setTimeout(function() {
                this._clearLastTimeout();
                this._executeRequest(callback);
            }.bind(this), this.keyRequestInterval[this.attempts] * 1000);
        } else {
            this._executeRequest(callback);
        }
    },

    _executeRequest: function(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.endpoint, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                        this.isLoading = false;
                        callback(response);
                    } catch (e) {
                        this._handleError(callback);
                    }
                } else {
                    this._handleError(callback);
                }
            }
        }.bind(this);

        xhr.onerror = function() {
            this._handleError(callback);
        }.bind(this);

        xhr.send();
    },

    _handleError: function(callback) {
        this.attempts++;

        if (this.attempts < this._getMaxAttempts()) {
            this._makeAttempt(callback);
        } else {
            this.isLoading = false;
            console.error('Could not validate API key after multiple attempts');
            callback({
                meta: {
                    code: 500,
                    message: 'Failed to validate API key'
                },
            });
        }
    },

    _getMaxAttempts: function() {
        return 4;
    },

    _clearLastTimeout: function() {
        if (this.lastTimeout !== undefined) {
            clearTimeout(this.lastTimeout);
            this.lastTimeout = undefined;
        }
    },
});
