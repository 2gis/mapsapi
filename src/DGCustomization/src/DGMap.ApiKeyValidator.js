DG.ApiKeyValidator = DG.Class.extend({
    initialize: function(apiKey) {
        this.apiKey = apiKey;
        this.endpoint = DG.config.keyServer + apiKey + DG.config.keyServices;
        this.isLoading = false;
        this.attempts = 0;
        this.lastTimeout = undefined;
        this.request = null;
        this.keyRequestInterval = [0];
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
            callback({
                meta: {
                    code: 400,
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

    destroy: function() {
        this._clearLastTimeout();
        this.isLoading = false;
    }
});
