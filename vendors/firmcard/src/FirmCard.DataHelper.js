FirmCard.DataHelper = {
	payMethods : [
		'americanexpress',
		'cash',
		'dinersclub',
		'goldcrown',
		'internet',
		'mastercard',
		'noncash',
		'visa'
	],

	_msgs : {},

	getFlampUrl : function (id) {
	    return DG.config.flampUrl.concat(id, '?', DG.config.flampGoogleAnalytics);
	},

	msg : function (msg) {
		if (this._msgs.hasOwnProperty(msg)) {
			return this._msgs[msg];
		}
		console && console.log("Cant't find translation for '" + msg + "'.");
		return msg.toString().replace('_', ' ');
	},

	getProjectTime: function (timezoneOffset, time) {
        var now, utc;

        if (time) {
            now = new Date(time);
        } else {
            now = new Date();
        }

        if (timezoneOffset) {
            utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            return new Date(utc + (60000 * timezoneOffset));
        } else {
            return now;
        }
    }
};
