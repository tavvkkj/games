var EVENT_FIRST_LAUNCH = 100002;
var EVENT_LAUNCH = 100003;
var EVENT_RESUME = 100004;

var EVENT_WIN = 111513;
var EVENT_LOSE = 111514;
var EVENT_QUIT = 111515;

var EVENT_SHARE_MANUAL = 104711;
var EVENT_SHARE_FACEBOOK = 52009;

function Tracking() {
	var instance = this;
	var eventToken = 0;
	
	this.SendLaunchEvent = function (launchID) {
		if (!LUDIVERSION) {
		}
	}
	
	this.SendRaceEvent = function (car, color, track, result, score, timeSpent) {
		if (!LUDIVERSION) {
		}
	}
	
	this.SendShareEvent = function () {
		if (!LUDIVERSION) {
		}
	}
	
	
	this.Send = function (eventJSON) {
		if (!LUDIVERSION) {
		}
	}
	
	this.GetTimeStamp = function () {
		return ((new Date().getTime() / 1000) >> 0);
	}
	
	
	
	
	
	
	
	
	
	
	this.SendLudiLoginDay = function () {
		if (LUDIVERSION) {
		}
	}
	
	this.SendLudiMainMenu = function () {
		if (LUDIVERSION) {
		}
	}
	
	this.SendLudiActionPhase = function () {
		if (LUDIVERSION) {
		}
	}
	
	this.SendLudiFinish = function () {
		if (LUDIVERSION) {
		}
	}
}

g_tracking = new Tracking();