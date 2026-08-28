var FONT_PRIMARY = "Wonder";
var FONT_SECONDARY = "Wonder";

var GGI = 80665;
var VERSION = "0.0.1a";

var KEY = {
	LEFT:  37,
	UP:    38,
	RIGHT: 39,
	DOWN:  40,
	A:     65,
	D:     68,
	S:     83,
	W:     87,
	SPACE: 32,
	ENTER: 13,
	ESC:   27,
	BACKSPACE: 8
};

var ROAD_WIDTH		= 700;		// actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth
var SEGMENT_LENGTH	= 200;		// length of a single segment
var FIELD_OF_VIEW   = 80;		// angle (degrees) for field of view
var CAMERA_HEIGHT	= 150;		// z height of camera
var CAMERA_BEHIND	= 250;		// z behind of camera
var DRAW_DISTANCE	= 60;		// number of segments to draw
var FOG_DISTANCE	= 3;		// number of segments before fog set in
var FOG_DENSITY		= 10;		// exponential fog density
var CENTRIFUGAL     = 0.25;		// centrifugal force multiplier when going around curves
var NUMBER_OF_ENEMY = 7;
var NUMBER_OF_TOURIST = 40;
var TOURIST_SPEED 	= 1400;
var POLICE_SPEED 	= 7000;
var POLICE_INTERVAL	= 25;


var NITRO_MAX = 5;
var NITRO_DURATION = 5;
var SPIKE_SPAWN_INTERVAL = 9000; // 45 segment


var DRAW_COLLIDER = false;

var BUMP_WANTED = 0.01;
var CRASH_WANTED = 0.08;
var KILL_WANTED = 0.1;
var SPEED_WANTED = 0.005;
var NUMBER_OF_LAP = 3;

var WANTED_POLICE = 0.4;
var WANTED_CHOPPER = 0.8;
var WANTED_SPIKE = 1;

var POWERUP_LATENCY = 100000; // 1000 segment



var CHEAT = false;
var LUDIVERSION = true;


var LEADERBOARD_SAVE_URL = window.location.protocol + "undefined.undefined";
var LEADERBOARD_LOAD_URL = window.location.protocol + "undefined.undefined";
var TRACKING_URL = window.location.protocol + "undefined.undefined";