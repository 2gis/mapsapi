DG.Geoclicker.Handler.ApiError = DG.Geoclicker.Handler.Default.extend({
    handle: function() { // () -> Promise
        var header = this._view.render({
            tmpl: 'popupHeader',
            data: {
                title: this.t('apiErrorTitle')
            }
        });

        return Promise.resolve({
            header: header,
            tmpl: this.t('apiErrorBody')
        });
    }
});
