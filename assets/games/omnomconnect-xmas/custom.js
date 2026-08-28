window.famobi_analytics = window.famobi_analytics || {};
window.famobi_tracking = window.famobi_tracking || {
	init: function() {},
	trackEvent: function() {},
	EVENTS: {
	    'LEVEL_START'	: 'event/level/start',
	    'LEVEL_END'		: 'event/level/end',
	    'LEVEL_UPDATE'	: 'event/level/update',
	    'PING'          : 'event/ping',
	    'AD'			: 'event/ad'
	}
};

let _started = false;

window.famobi_analytics.trackEvent = function(event, params) {

	params = params || {};

	return new Promise(function(resolve, reject) {

		// console.log(event, params);

		// ANALYTICS
		switch(event) {

			case "EVENT_LEVELFAIL":
				if(params.reason !== "quit") {
					break;
				}

				_started = false;
				return gdsdk_showAd(function() {
					resolve(event, params);
				});

			case "EVENT_LEVELSTART":
			case "EVENT_LEVELRESTART":

				if(_started) {
					break;
				}

				_started = true;
				return gdsdk_showAd(function() {
					resolve(event, params);
				});

			default:
				// nothing to do
		}
		return resolve(event, params);
	});
}
