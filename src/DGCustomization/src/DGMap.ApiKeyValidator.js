DG.ApiKeyValidator = DG.Class.extend({
    initialize: function(apiKey, mapContainer) {
        this.apiKey = apiKey;
        this.endpoint = DG.config.keyServer + apiKey + DG.config.keyServices;
        this.isLoading = false;
        this.attempts = 0;
        this.lastTimeout = undefined;
        this.request = null;
        this.MAX_ATTEMPTS = 4;
        this.keyRequestInterval = [0, 2, 2, 2];
        this.isErrorWasShown = false;
        this.mapContainer = mapContainer;
    },

    validate: function(callback) {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        this.attempts = 0;
        this._makeAttempt(callback);
    },

    validateKeyResponse: function() {
        this.validate(function(response) {
            if (!response || this._isResponseInvalid(response)) {
                this._showError();
            }
        }.bind(this));
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

    _isResponseInvalid: function(response) {
        return (
            response.meta.code === 400 ||
            response.meta.code === 404 ||
            response.result &&
            (!response.result.service.is_active ||
                !response.result.is_active ||
                !['ok', 'exceeded'].includes(response.result.service.status.code)
            )
        );
    },

    _showError: function() {

        if (!this.isErrorWasShown && this.mapContainer) {
            var errorMessage = DG.DomUtil.create('div', 'dg-error-message');
            errorMessage.innerHTML = 'Your RasterJS API key is invalid. Please contact api@2gis.com to get RasterJS API key.';
            this.mapContainer.appendChild(errorMessage);
            this.isErrorWasShown = true;
        }
    },

    _executeRequest: function(callback) {
        this.request = DG.ajax(this.endpoint, {
            type: 'GET',
            success: function(response) {
                this.isLoading = false;
                callback(response);
            }.bind(this),
            error: function(xhr) {
                this._handleError(callback, xhr.status);
            }.bind(this)
        });
    },

    _handleError: function(callback, status) {
        this.attempts++;

        if (this.attempts < this.MAX_ATTEMPTS) {
            this._makeAttempt(callback);
        } else {
            this.isLoading = false;
            callback({
                meta: {
                    code: status,
                    message: 'Failed to validate API key'
                },
            });
        }
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
