FirmCard.DataHelper = {

	FLAMP_URL : '__FLAMP_URL__',
	FLAMP_GOOGLE_ANALYTICS : '__FLAMP_GOOGLE_ANALYTICS__',

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

	getFlampUrl : function(id) {
	    return this.FLAMP_URL.concat(id, '?', this.FLAMP_GOOGLE_ANALYTICS);
	},

	msg : function(msg) {
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