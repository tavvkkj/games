function Entity (imagePath, x, y, s) {
	this.m_imagePath = imagePath;
	this.m_image = null;
	this.m_x = x;
	this.m_y = y;
	this.m_z = 0;
	this.m_scale = s;
	this.m_invert = false;
	this.m_collisionRect = [];
	
	this.Clone = function() {
		var newOne = new Entity (this.m_imagePath);
		newOne.m_x = this.m_x;
		newOne.m_y = this.m_y;
		newOne.m_z = this.m_z;
		newOne.m_x = this.m_x;
		newOne.m_image = this.m_image;
		newOne.m_invert = this.m_invert;
		newOne.m_scale = this.m_scale;
		for (var i=0; i<this.m_collisionRect.length; i++) {
			newOne.m_collisionRect[i]= [this.m_collisionRect[i][0], this.m_collisionRect[i][1]];
		}
		return newOne;
	}
	
	this.Invert = function () {
		this.m_x *= -1;
		this.m_invert = !this.m_invert;
		for (var i=0; i<this.m_collisionRect.length; i++) {
			var temp = this.m_collisionRect[i][0];
			this.m_collisionRect[i][0] = -this.m_collisionRect[i][1];
			this.m_collisionRect[i][1] = -temp;
		}
	}
}

var OBSTACLE_ROADBLOCK = 0;
var OBSTACLE_VLC = 1;
function ObstacleData (type, x, z) {
	this.m_type = type;
	this.m_x = x;
	this.m_z = z;
}


var SIGN_TURN_LEFT = 0;
var SIGN_TURN_RIGHT = 1;

function Sign (z, type) {
	this.m_z = z;
	this.m_type = type;
}


function Building (x, z, width, height, red, green, blue) {
	this.m_color1 = [red, green, blue];
	//this.m_color2 = [(255-red)*0.5+red, (255-green)*0.5+green, (255-blue)*0.5+blue];
	this.m_color2 = [(red/2)>>0, (green/2)>>0, (blue/2)>>0];
	this.m_x = x;
	this.m_z = z;
	this.m_w = width;
	this.m_h = height;
	
	if (x > 0) {
		var temp = this.m_color1;
		this.m_color1 = this.m_color2;
		this.m_color2 = temp;
	}
}

function Track () {
	var SEGMENT_MULTIPLIER = 5;
	var CURVE_MULTIPLIER = 0.5;
	
	this.m_curveData = [];
	this.m_angleData = [];
	this.m_heightData = [];
	this.m_tunnelData = [];
	this.m_texture = [];
	this.m_entity = [];
	this.m_building = [];
	this.m_sign = [];
	this.m_obstacle = [];
	
	this.m_background = "";
	this.m_hillColor = [];
	this.m_hillColor[0] = [146, 68, 59];
	this.m_hillColor[1] = [154, 91, 76];
	this.m_hillColor[2] = [163, 114, 95];
	this.m_hillColor[3] = [172, 138, 113];
	this.m_fogColor = [128, 32, 32];
	this.m_skyColor = [180, 132, 210];
	this.m_tunnelColor = [];
	
	this.m_tunnelWidth = 0.9;
	
	var currentHeight = 0;
	var currentYAngle = 0;
	
	this.PushStraight = function (num, slightCurve) {
		if (slightCurve == null) slightCurve = 0;
		for (var i=0; i<num; i++) {
			for (var j=0; j<SEGMENT_MULTIPLIER; j++) {
				this.m_curveData.push(slightCurve * CURVE_MULTIPLIER);
				this.m_tunnelData.push(0);
			}
		}
	}
	this.PushCurve = function (array) {
		for (var i=0; i<array.length; i++) {
			for (var j=0; j<SEGMENT_MULTIPLIER; j++) {
				this.m_curveData.push(array[i] * CURVE_MULTIPLIER);
			}
		}
	}
	
	this.PushFlat = function (num, elevation) {
		var array = [];
		for (var i=0; i<num; i++) {
			array.push(elevation);
		}
		this.PushElevation (array);
	}
	this.PushElevation = function (array) {
		var newHeight;
		for (var i=0; i<array.length; i++) {
			for (var j=0; j<SEGMENT_MULTIPLIER; j++) {
				var angle = EaseInOut (currentYAngle, array[i], j/SEGMENT_MULTIPLIER);
				this.m_angleData.push(angle);
				newHeight = currentHeight + SEGMENT_LENGTH * Math.tan(DEG_TO_RAD * angle);
				this.m_heightData.push(newHeight);
				currentHeight = newHeight;
			}
			currentYAngle = array[i];
		}
	}
	
	this.PushTexture = function (number, name, name2) {
		for (var i=0; i<number * SEGMENT_MULTIPLIER; i++) {
			if (i % 2 == 0 || name2 == null) {
				this.m_texture.push (name);
			}
			else {
				this.m_texture.push (name2);
			}
		}
	}
	
	this.PushEntity = function (entity, z, invert) {
		if (invert == null) invert = false;
		var newEntity = entity.Clone();
		newEntity.m_z = z * SEGMENT_MULTIPLIER;
		if (invert) {
			newEntity.Invert();
		}
		this.m_entity.push (newEntity);
	}
	
	this.PushBuilding = function (z, x, w, h, r, g, b) {
		w = w / 1500;
		h = h / 1500;
		var newBuilding = new Building (x, z * SEGMENT_MULTIPLIER, w, h, r, g, b);
		this.m_building.push (newBuilding);
	}
	
	this.PushSign = function (z, type) {
		for (var i=0; i<SEGMENT_MULTIPLIER; i++) {
			this.m_sign.push(new Sign (z * SEGMENT_MULTIPLIER + i, type));
		}
	}
	
	var tunnelAlternate = 1;
	this.PushTunnel = function (start, length) {
		for (var i=start * SEGMENT_MULTIPLIER; i<(start + length) * SEGMENT_MULTIPLIER; i ++) {
			if (i == start * SEGMENT_MULTIPLIER) {
				this.m_tunnelData[i] = 1;
				tunnelAlternate = 1;
			}
			else if (tunnelAlternate == 1) {
				this.m_tunnelData[i] = 4;
				tunnelAlternate = 2;
			}
			else if (tunnelAlternate == 2) {
				this.m_tunnelData[i] = 2;
				tunnelAlternate = 3;
			}
			else if (tunnelAlternate == 3) {
				this.m_tunnelData[i] = 4;
				tunnelAlternate = 4;
			}
			else if (tunnelAlternate == 4) {
				this.m_tunnelData[i] = 3;
				tunnelAlternate = 1;
			}
		}
	}
	
	this.PushObstacle = function (type, x, z) {
		this.m_obstacle.push (new ObstacleData (type, x, z * SEGMENT_MULTIPLIER));
	}
}



var g_track = [];
g_track[0] = new Track();
g_track[0].m_background = "Images/GSAction/Background/Tokyo.png";
g_track[0].m_skyColor = [0, 16, 32];
g_track[0].m_hillColor[0] = [11, 27, 29];
g_track[0].m_hillColor[1] = [11, 27, 29];
g_track[0].m_hillColor[2] = [11, 27, 29];
g_track[0].m_hillColor[3] = [11, 27, 29];
g_track[0].m_fogColor = [11, 27, 29];
g_track[0].m_fogIntensity = 0;

g_track[0].m_tunnelColor[0] = [55, 34, 55];
g_track[0].m_tunnelColor[1] = [5, 37, 41];
g_track[0].m_tunnelColor[2] = [8, 74, 82];
g_track[0].m_tunnelColor[3] = [41, 79, 79];
g_track[0].m_tunnelColor[4] = [82, 140, 140];

g_track[0].PushTexture (266, "Images/GSAction/Road/Road_1_1.png", "Images/GSAction/Road/Road_1_2.png");

g_track[0].PushStraight (45); // 45
g_track[0].PushCurve ([1,2,3,4,5,6,7,8,9,10,10,10,9,9,8,7,6,5,4,3,2,1]); // 67
g_track[0].PushStraight (20); // 87
g_track[0].PushCurve ([-1,-2,-3,-4,-5,-5,-6,-6,-7,-7,-8,-8,-8,-8,-8,-8,-8,-8,-8,-7,-7,-6,-5,-4,-3,-2,-1]); // 114
g_track[0].PushStraight (20); // 134
g_track[0].PushCurve ([2,4,6,8,10,10,8,6,4,2]); // 144
g_track[0].PushStraight (62); // 206
g_track[0].PushCurve ([-1,-2,-3,-4,-5,-6,-6,-5,-5,-4,-3,-2,-1]); // 219
g_track[0].PushStraight (7); // 226
g_track[0].PushCurve ([1,2,3,4,6,7,7,7,6,5,4,3,2,2,1,1]); // 243
g_track[0].PushStraight (24); // 267

g_track[0].PushFlat (25, 0);
g_track[0].PushElevation ([0,1,1,2,2,3,3,3,-7,-15,-15,-7]);
g_track[0].PushFlat (28, 0);
g_track[0].PushElevation ([0,1,2,3,4,6,8,10,7,4,3,2,1,0]);
g_track[0].PushFlat (55, 0);
g_track[0].PushElevation ([2,4,6,8,10,10,8,6,4,2]);
g_track[0].PushFlat (5, 0);
g_track[0].PushElevation ([2,4,6,8,10,12,14,12,10,8,6,4,2,0,-2,-4,-6,-8,-10,-12,-14,-12,-10,-8,-6,-4,-2]);
g_track[0].PushFlat (20, 0);
g_track[0].PushElevation ([-1,-2,-3,-4,-5,-6,-6,-7,-7,-7,-6,-6,-6,-5,-5,-4,-3,-2,-1]);
g_track[0].PushFlat (16, 0);
g_track[0].PushElevation ([1,2]);
g_track[0].PushFlat (26, 0);
g_track[0].PushElevation ([1,0]);
g_track[0].PushFlat (5, 0);

var g_finishLine = new Entity ("Images/GSAction/Entities/Finish.png", 0, -0.3, 1200);


for (var i=0; i<10; i++) {
	g_track[0].PushSign (i + 35, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[0].PushSign (i + 77, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[0].PushSign (i + 124, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[0].PushSign (i + 196, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[0].PushSign (i + 216, SIGN_TURN_RIGHT);
}

g_track[0].PushTunnel(66, 17);
g_track[0].PushTunnel(167, 10);


var g_tokyoLight_1 = new Entity ("Images/GSAction/Entities/Tokyo_Light_1.png", -1.2, 0, 500);
g_tokyoLight_1.m_collisionRect.push ([-1.25, -1.05]);
var g_tokyoLight_2 = new Entity ("Images/GSAction/Entities/Tokyo_Light_2.png", -1.2, 0, 500);
g_tokyoLight_2.m_collisionRect.push ([-1.25, -1.05]);



g_track[0].PushObstacle (OBSTACLE_ROADBLOCK, -0.25, 10);
g_track[0].PushObstacle (OBSTACLE_ROADBLOCK, -0.3,  11);
g_track[0].PushObstacle (OBSTACLE_ROADBLOCK, -0.25, 12);
g_track[0].PushObstacle (OBSTACLE_ROADBLOCK, -0.2,  13);

g_track[0].PushObstacle (OBSTACLE_VLC, 0, 		120);
g_track[0].PushObstacle (OBSTACLE_VLC, -0.1,  	121);
g_track[0].PushObstacle (OBSTACLE_VLC, 0, 		122);
g_track[0].PushObstacle (OBSTACLE_VLC, 0.1,  	123);

g_track[0].PushObstacle (OBSTACLE_ROADBLOCK, 0.3, 210);
g_track[0].PushObstacle (OBSTACLE_ROADBLOCK, 0.4,  211);
g_track[0].PushObstacle (OBSTACLE_ROADBLOCK, 0.3, 212);
g_track[0].PushObstacle (OBSTACLE_ROADBLOCK, 0.4,  213);



g_track[0].PushEntity (g_finishLine, 	0);
g_track[0].PushEntity (g_tokyoLight_2, 	5);
g_track[0].PushEntity (g_tokyoLight_1, 	6, true);
g_track[0].PushEntity (g_tokyoLight_2, 	10);
g_track[0].PushEntity (g_tokyoLight_2, 	11, true);
g_track[0].PushEntity (g_tokyoLight_2,  15);
g_track[0].PushEntity (g_tokyoLight_1, 	16, true);
g_track[0].PushEntity (g_tokyoLight_2, 	20);
g_track[0].PushEntity (g_tokyoLight_2, 	21, true);
g_track[0].PushEntity (g_tokyoLight_1,  25);
g_track[0].PushEntity (g_tokyoLight_2, 	26, true);


g_track[0].PushEntity (g_tokyoLight_1, 	85);
g_track[0].PushEntity (g_tokyoLight_2, 	86, true);
g_track[0].PushEntity (g_tokyoLight_2, 	90);
g_track[0].PushEntity (g_tokyoLight_1, 	91, true);
g_track[0].PushEntity (g_tokyoLight_1,  95);
g_track[0].PushEntity (g_tokyoLight_2, 	96, true);
g_track[0].PushEntity (g_tokyoLight_2, 	100);
g_track[0].PushEntity (g_tokyoLight_2, 	101, true);
g_track[0].PushEntity (g_tokyoLight_1,  105);
g_track[0].PushEntity (g_tokyoLight_1, 	106, true);



g_track[0].PushEntity (g_tokyoLight_1, 	120);
g_track[0].PushEntity (g_tokyoLight_2, 	121, true);
g_track[0].PushEntity (g_tokyoLight_2, 	125);
g_track[0].PushEntity (g_tokyoLight_1, 	126, true);
g_track[0].PushEntity (g_tokyoLight_1,  130);
g_track[0].PushEntity (g_tokyoLight_2, 	131, true);



g_track[0].PushEntity (g_tokyoLight_1, 	210);
g_track[0].PushEntity (g_tokyoLight_2, 	211, true);
g_track[0].PushEntity (g_tokyoLight_2, 	215);
g_track[0].PushEntity (g_tokyoLight_1, 	216, true);
g_track[0].PushEntity (g_tokyoLight_1,  220);
g_track[0].PushEntity (g_tokyoLight_2, 	221, true);
g_track[0].PushEntity (g_tokyoLight_2, 	225);
g_track[0].PushEntity (g_tokyoLight_2, 	226, true);
g_track[0].PushEntity (g_tokyoLight_1,  230);
g_track[0].PushEntity (g_tokyoLight_1, 	231, true);




g_track[0].PushBuilding (0, -2.0, 1000, 5000, 23, 57, 61);
g_track[0].PushBuilding (1, 2.0, 1000, 5000, 40, 100, 107);
g_track[0].PushBuilding (2, -2.0, 2500, 5000, 23, 63, 47);
g_track[0].PushBuilding (3, 2.0, 1000, 5000, 30, 81, 60);
g_track[0].PushBuilding (5, -2.0, 1000, 2000, 41, 75, 76);


g_track[0].PushBuilding (126, -2.0, 2000, 4000, 23, 57, 61);
g_track[0].PushBuilding (129, 2.0, 2000, 3500, 40, 100, 107);
g_track[0].PushBuilding (131, -2.0, 2500, 3700, 23, 63, 47);
g_track[0].PushBuilding (135, 2.0, 1500, 4200, 30, 81, 60);
g_track[0].PushBuilding (137, -2.0, 1000, 4500, 41, 75, 76);




















g_track[1] = new Track();
g_track[1].m_background = "Images/GSAction/Background/NewYork.png";
g_track[1].m_skyColor = [68, 25, 3];
g_track[1].m_hillColor[0] = [30, 10, 0];
g_track[1].m_hillColor[1] = [30, 10, 0];
g_track[1].m_hillColor[2] = [30, 10, 0];
g_track[1].m_hillColor[3] = [30, 10, 0];
g_track[1].m_fogColor = [30, 10, 0];
g_track[1].m_fogIntensity = 0;

g_track[1].m_tunnelColor[0] = [0, 0, 0];
g_track[1].m_tunnelColor[1] = [149, 45, 45];
g_track[1].m_tunnelColor[2] = [149, 45, 45];
g_track[1].m_tunnelColor[3] = [82, 45, 45];
g_track[1].m_tunnelColor[4] = [82, 45, 45];

g_track[1].PushTexture (295, "Images/GSAction/Road/Road_2_1.png", "Images/GSAction/Road/Road_2_2.png");

g_track[1].PushStraight (30); // 30
g_track[1].PushCurve ([-1,-2,-3,-4,-5,-6,-6,-6,-6,-5,-5,-4,-3,-2,-1]); // 45
g_track[1].PushCurve ([1,2,3,5,7,9,9,8,7,6,5,4,3,5,1]); // 60
g_track[1].PushCurve ([-1,-2,-4,-4,-6,-6,-4,-4,-2,-1]); // 70
g_track[1].PushStraight (32); // 102
g_track[1].PushCurve ([1,2,3,4,5,6,7,8,9,10,11,11,10,10,10,9,8,7,6,5,4,3,2,1]); // 126
g_track[1].PushStraight (35); // 161
g_track[1].PushCurve ([1,2,3,4,5,6]); // 167
g_track[1].PushStraight (10, 6); // 177
g_track[1].PushCurve ([6,5,4,3,2,1]); // 183
g_track[1].PushStraight (15); // 198
g_track[1].PushCurve ([-1,-2,-2,-3,-3,-4,-4,-5,-5,-6,-6,-7,-7,-8,-8,-9,-9,-9,-9,-7,-5,-2]); // 220
g_track[1].PushStraight (5); // 225
g_track[1].PushCurve ([1,3,5,7]); // 229
g_track[1].PushStraight (12,7); // 241
g_track[1].PushCurve ([6,4,2,1]); // 245
g_track[1].PushStraight (25); // 270
g_track[1].PushCurve ([1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1]); // 287
g_track[1].PushStraight (8); // 296

g_track[1].PushFlat (15, 0);
g_track[1].PushElevation ([-1,-2,-3,-4,-5]);
g_track[1].PushFlat (10, -5);
g_track[1].PushElevation ([1,2,3,4,5,6,7,8,9,9,9,8,8,7,7]);
g_track[1].PushElevation ([6,6,5,4,3,2,1,0,0,0,0,0,0,0,0]);
g_track[1].PushFlat (76, 0);
g_track[1].PushFlat (10, -1.15);
g_track[1].PushFlat (10, -5);
g_track[1].PushFlat (21, -4);
g_track[1].PushElevation ([-1,-3,-5,-7,-7,-7]);
g_track[1].PushElevation ([-6,-5,-4,-4,-4,-4,-4,-3,-3,-2,-1,0,1,2,3]);
g_track[1].PushElevation ([4,5,6,6,6,6,6,6,6,6,5,5,5,5,5,5,4,4,4,3,2,1]);
g_track[1].PushFlat (14, -2);
g_track[1].PushElevation ([1,2,3,4,4,4,4]);
g_track[1].PushElevation ([5,5,5,5]);
g_track[1].PushElevation ([8,8,8,8,8,8,8,8,8,6,4,2,0,-2,-4,-6,-8,-8,-8,-9,-8,-5,4,3,2]);
g_track[1].PushFlat (25, 0);

for (var i=0; i<10; i++) {
	g_track[1].PushSign (i + 20, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[1].PushSign (i + 35, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[1].PushSign (i + 50, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[1].PushSign (i + 92, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[1].PushSign (i + 188, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[1].PushSign (i + 215, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[1].PushSign (i + 260, SIGN_TURN_RIGHT);
}


g_track[1].PushObstacle (OBSTACLE_VLC, 0.25, 20);
g_track[1].PushObstacle (OBSTACLE_VLC, 0.3,  21);
g_track[1].PushObstacle (OBSTACLE_VLC, 0.25, 22);
g_track[1].PushObstacle (OBSTACLE_VLC, 0.2,  23);
g_track[1].PushObstacle (OBSTACLE_VLC, 0.15, 24);

g_track[1].PushObstacle (OBSTACLE_ROADBLOCK, -0.15,	102);
g_track[1].PushObstacle (OBSTACLE_ROADBLOCK, -0.2,  103);
g_track[1].PushObstacle (OBSTACLE_ROADBLOCK, -0.25,	104);

g_track[1].PushObstacle (OBSTACLE_ROADBLOCK, -0.3, 204);
g_track[1].PushObstacle (OBSTACLE_ROADBLOCK, -0.4,  205);
g_track[1].PushObstacle (OBSTACLE_ROADBLOCK, -0.3, 206);
g_track[1].PushObstacle (OBSTACLE_ROADBLOCK, -0.4,  207);
g_track[1].PushObstacle (OBSTACLE_ROADBLOCK, -0.3, 208);

var g_newyorkLight = new Entity ("Images/GSAction/Entities/NewYork_Light.png", -1.2, 0, 500);
g_newyorkLight.m_collisionRect.push ([-1.25, -1.15]);

g_track[1].PushEntity (g_finishLine,	0);

g_track[1].PushEntity (g_newyorkLight, 	18);
g_track[1].PushEntity (g_newyorkLight, 	20, true);
g_track[1].PushEntity (g_newyorkLight, 	22);
g_track[1].PushEntity (g_newyorkLight, 	24, true);
g_track[1].PushEntity (g_newyorkLight, 	26);
g_track[1].PushEntity (g_newyorkLight, 	28, true);
g_track[1].PushEntity (g_newyorkLight, 	30);
g_track[1].PushEntity (g_newyorkLight, 	32, true);
g_track[1].PushEntity (g_newyorkLight, 	34);
g_track[1].PushEntity (g_newyorkLight, 	36, true);
g_track[1].PushEntity (g_newyorkLight, 	38);
g_track[1].PushEntity (g_newyorkLight, 	40, true);
g_track[1].PushEntity (g_newyorkLight, 	42);
g_track[1].PushEntity (g_newyorkLight, 	44, true);
g_track[1].PushEntity (g_newyorkLight, 	46);
g_track[1].PushEntity (g_newyorkLight, 	48, true);
g_track[1].PushEntity (g_newyorkLight, 	50);


g_track[1].PushEntity (g_newyorkLight, 	102);
g_track[1].PushEntity (g_newyorkLight, 	104, true);
g_track[1].PushEntity (g_newyorkLight, 	106);
g_track[1].PushEntity (g_newyorkLight, 	108, true);
g_track[1].PushEntity (g_newyorkLight, 	110);
g_track[1].PushEntity (g_newyorkLight, 	112, true);
g_track[1].PushEntity (g_newyorkLight, 	114);
g_track[1].PushEntity (g_newyorkLight, 	116, true);
g_track[1].PushEntity (g_newyorkLight, 	118);
g_track[1].PushEntity (g_newyorkLight, 	120, true);
g_track[1].PushEntity (g_newyorkLight, 	122);
g_track[1].PushEntity (g_newyorkLight, 	124, true);
g_track[1].PushEntity (g_newyorkLight, 	126);
g_track[1].PushEntity (g_newyorkLight, 	128, true);
g_track[1].PushEntity (g_newyorkLight, 	130);
g_track[1].PushEntity (g_newyorkLight, 	132, true);
g_track[1].PushEntity (g_newyorkLight, 	134);


g_track[1].PushEntity (g_newyorkLight, 	204);
g_track[1].PushEntity (g_newyorkLight, 	206, true);
g_track[1].PushEntity (g_newyorkLight, 	208);
g_track[1].PushEntity (g_newyorkLight, 	210, true);
g_track[1].PushEntity (g_newyorkLight, 	212);
g_track[1].PushEntity (g_newyorkLight, 	214, true);
g_track[1].PushEntity (g_newyorkLight, 	216);
g_track[1].PushEntity (g_newyorkLight, 	218, true);
g_track[1].PushEntity (g_newyorkLight, 	220);
g_track[1].PushEntity (g_newyorkLight, 	222, true);
g_track[1].PushEntity (g_newyorkLight, 	224);
g_track[1].PushEntity (g_newyorkLight, 	226, true);
g_track[1].PushEntity (g_newyorkLight, 	228);
g_track[1].PushEntity (g_newyorkLight, 	230, true);


g_track[1].PushTunnel(175, 15);


g_track[1].PushBuilding (1, 2.0, 2000, 3000, 82, 45, 45);
g_track[1].PushBuilding (4, -2.0, 2000, 3500, 104, 57, 57);
g_track[1].PushBuilding (8, -2.0, 1500, 3000, 51, 28, 28);
g_track[1].PushBuilding (11, 2.0, 1800, 3500, 127, 70, 70);
g_track[1].PushBuilding (13, 2.0, 2000, 3000, 82, 45, 45);
g_track[1].PushBuilding (16, -2.0, 2500, 4000, 104, 57, 57);
g_track[1].PushBuilding (81, -2.0, 1000, 4000, 51, 28, 28);
g_track[1].PushBuilding (85, 2.0, 2000, 3500, 127, 70, 70);
g_track[1].PushBuilding (88, 2.0, 1500, 4500, 104, 57, 57);
g_track[1].PushBuilding (91, 2.0, 1000, 4000, 51, 28, 28);
g_track[1].PushBuilding (94, 2.0, 1500, 4000, 127, 70, 70);
g_track[1].PushBuilding (97, -2.0, 2000, 3500, 82, 45, 45);
g_track[1].PushBuilding (99, -2.0, 1500, 4500, 51, 28, 28);


















g_track[2] = new Track();
g_track[2].m_background = "Images/GSAction/Background/Paris.png";
g_track[2].m_skyColor = [64, 64, 96];
g_track[2].m_hillColor[0] = [32, 0, 0];
g_track[2].m_hillColor[1] = [32, 0, 0];
g_track[2].m_hillColor[2] = [32, 0, 0];
g_track[2].m_hillColor[3] = [32, 0, 0];
g_track[2].m_fogColor = [32, 0, 0];
g_track[2].m_fogIntensity = 0;

g_track[2].m_tunnelColor[0] = [0, 0, 0];
g_track[2].m_tunnelColor[1] = [34, 68, 88];
g_track[2].m_tunnelColor[2] = [34, 68, 88];
g_track[2].m_tunnelColor[3] = [203, 91, 28];
g_track[2].m_tunnelColor[4] = [203, 91, 28];

g_track[2].PushStraight (10); // 10
g_track[2].PushCurve ([2,3,4,5,6,5,4,3,2]); // 19
g_track[2].PushStraight (11); // 30
g_track[2].PushCurve ([-2,-3,-4,-5,-6,-5,-4,-3,-2]); // 39
g_track[2].PushStraight (35); // 74
g_track[2].PushCurve ([-1,-2,-3,-4]); // 78
g_track[2].PushStraight (20, -5); // 98
g_track[2].PushCurve ([-4,-3,-2,-1]); // 102
g_track[2].PushStraight (40); // 142
g_track[2].PushCurve ([-1,-2,-2,-2,-3,-3,-3]); // 149
g_track[2].PushStraight (6, -4); // 155
g_track[2].PushCurve ([-3,-3,-3,-2,-2,-2,-1]); // 162
g_track[2].PushStraight (29); // 191
g_track[2].PushCurve ([1,2,3,4,5,6,7]); // 198
g_track[2].PushStraight (5, 8); // 203
g_track[2].PushCurve ([7,6,5,4,3,2,1]); // 210
g_track[2].PushStraight (17); // 227
g_track[2].PushCurve ([-2,-4,-6,-4,-2]); // 232
g_track[2].PushStraight (20); // 252
g_track[2].PushCurve ([-3,-4,-5,-6,-5,-4,-3]); // 257
g_track[2].PushStraight (18); // 277
g_track[2].PushCurve ([-3,-4,-5,-6,-5,-4,-3]); // 282
g_track[2].PushStraight (38); // 322

g_track[2].PushFlat (5, 0);
g_track[2].PushElevation ([-1,-2,-3,-4,-5,-5,-6,-6,-6,-6,-5,-5,-4,-3,-2,-1]);
g_track[2].PushFlat (13, 0);
g_track[2].PushElevation ([0,1,2,4,6]);
g_track[2].PushFlat (10, 3);
g_track[2].PushElevation ([6,6,5,5,4,3,2,2,1,1]);
g_track[2].PushFlat (17, 0);
g_track[2].PushElevation ([-1,-2,-3]);
g_track[2].PushFlat (20, -4);
g_track[2].PushElevation ([-3,-2,-1]);
g_track[2].PushFlat (20, 0);
g_track[2].PushFlat (15, 3);
g_track[2].PushElevation ([6,6,5,5,4,4,3,2,1,0]);
g_track[2].PushElevation ([0,-1,-2,-3,-4,-4,-5,-5,-6,-6]);
g_track[2].PushFlat (15, -1);
g_track[2].PushFlat (15, 1.643);
g_track[2].PushElevation ([1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1,0]);
g_track[2].PushFlat (43, 0);
g_track[2].PushElevation ([-2,-3,-4]);
g_track[2].PushFlat (31, -2);
g_track[2].PushElevation ([-3,-2,-1]);
g_track[2].PushFlat (35, 0);



for (var i=0; i<10; i++) {
	g_track[2].PushSign (i + 3, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[2].PushSign (i + 20, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[2].PushSign (i + 182, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[2].PushSign (i + 217, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[2].PushSign (i + 247, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[2].PushSign (i + 267, SIGN_TURN_LEFT);
}


g_track[2].PushTexture (322, "Images/GSAction/Road/Road_3_1.png", "Images/GSAction/Road/Road_3_2.png");


g_track[2].PushTunnel(77, 25);


g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.25, 20);
g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.3,  21);
g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.25, 22);
g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.2,  23);
g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.15, 24);

g_track[2].PushObstacle (OBSTACLE_VLC, -0.15,	102);
g_track[2].PushObstacle (OBSTACLE_VLC, -0.2,  	103);
g_track[2].PushObstacle (OBSTACLE_VLC, -0.25,	104);
g_track[2].PushObstacle (OBSTACLE_VLC, -0.2,	105);
g_track[2].PushObstacle (OBSTACLE_VLC, -0.15,	106);
g_track[2].PushObstacle (OBSTACLE_VLC, -0.2,	107);

g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.3, 204);
g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.4,  205);
g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.3, 206);
g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.4,  207);
g_track[2].PushObstacle (OBSTACLE_ROADBLOCK, 0.3, 208);

g_track[2].PushObstacle (OBSTACLE_VLC, -0.15,	315);
g_track[2].PushObstacle (OBSTACLE_VLC, -0.2,  	316);
g_track[2].PushObstacle (OBSTACLE_VLC, -0.25,	317);
g_track[2].PushObstacle (OBSTACLE_VLC, -0.2,	318);

var g_parisLight = new Entity ("Images/GSAction/Entities/Paris_Light.png", -1.2, 0, 500);
g_parisLight.m_collisionRect.push ([-1.25, -1.15]);

g_track[2].PushEntity (g_finishLine,	0);

g_track[2].PushEntity (g_parisLight, 2, true);
g_track[2].PushEntity (g_parisLight, 4);
g_track[2].PushEntity (g_parisLight, 6, true);
g_track[2].PushEntity (g_parisLight, 8);
g_track[2].PushEntity (g_parisLight, 10, true);
g_track[2].PushEntity (g_parisLight, 12);
g_track[2].PushEntity (g_parisLight, 14, true);
g_track[2].PushEntity (g_parisLight, 16);
g_track[2].PushEntity (g_parisLight, 18, true);
g_track[2].PushEntity (g_parisLight, 20);
g_track[2].PushEntity (g_parisLight, 22, true);
g_track[2].PushEntity (g_parisLight, 24);
g_track[2].PushEntity (g_parisLight, 26, true);
g_track[2].PushEntity (g_parisLight, 28);
g_track[2].PushEntity (g_parisLight, 30, true);
g_track[2].PushEntity (g_parisLight, 32);
g_track[2].PushEntity (g_parisLight, 34, true);
g_track[2].PushEntity (g_parisLight, 36);
g_track[2].PushEntity (g_parisLight, 38, true);
g_track[2].PushEntity (g_parisLight, 40);
g_track[2].PushEntity (g_parisLight, 42, true);
g_track[2].PushEntity (g_parisLight, 44);
g_track[2].PushEntity (g_parisLight, 46, true);
g_track[2].PushEntity (g_parisLight, 48);
g_track[2].PushEntity (g_parisLight, 50, true);
g_track[2].PushEntity (g_parisLight, 52);
g_track[2].PushEntity (g_parisLight, 54, true);
g_track[2].PushEntity (g_parisLight, 56);
g_track[2].PushEntity (g_parisLight, 58, true);
g_track[2].PushEntity (g_parisLight, 60);

g_track[2].PushEntity (g_parisLight, 104, true);
g_track[2].PushEntity (g_parisLight, 108);
g_track[2].PushEntity (g_parisLight, 112, true);
g_track[2].PushEntity (g_parisLight, 116);
g_track[2].PushEntity (g_parisLight, 120, true);


g_track[2].PushEntity (g_parisLight, 174, true);
g_track[2].PushEntity (g_parisLight, 178);
g_track[2].PushEntity (g_parisLight, 182, true);
g_track[2].PushEntity (g_parisLight, 186);
g_track[2].PushEntity (g_parisLight, 190, true);
g_track[2].PushEntity (g_parisLight, 194);
g_track[2].PushEntity (g_parisLight, 198, true);
g_track[2].PushEntity (g_parisLight, 202);
g_track[2].PushEntity (g_parisLight, 206, true);
g_track[2].PushEntity (g_parisLight, 210);
g_track[2].PushEntity (g_parisLight, 214, true);
g_track[2].PushEntity (g_parisLight, 218);
g_track[2].PushEntity (g_parisLight, 222, true);
g_track[2].PushEntity (g_parisLight, 226);
g_track[2].PushEntity (g_parisLight, 230, true);


g_track[2].PushBuilding (6, -2.0, 2000, 2300, 90, 87, 95);
g_track[2].PushBuilding (7, 2.0, 2200, 2200, 91, 88, 97);
g_track[2].PushBuilding (9, 2.0, 2500, 2200, 73, 72, 75);
g_track[2].PushBuilding (11, -2.0, 2000, 2500, 126, 116, 108);
g_track[2].PushBuilding (13, -2.0, 2100, 2500, 108, 103, 103);
g_track[2].PushBuilding (29, -2.0, 2000, 2300, 90, 87, 95);
g_track[2].PushBuilding (31, 2.0, 2200, 2200, 91, 88, 97);
g_track[2].PushBuilding (32, 2.0, 2500, 2200, 73, 72, 75);
g_track[2].PushBuilding (48, -2.0, 2000, 2300, 126, 116, 108);
g_track[2].PushBuilding (49, 2.0, 2200, 2500, 108, 103, 103);
g_track[2].PushBuilding (53, -2.0, 1000, 2500, 90, 87, 95);
g_track[2].PushBuilding (54, 2.0, 1200, 3200, 91, 88, 97);
g_track[2].PushBuilding (56, -2.0, 1500, 3500, 73, 72, 75);
g_track[2].PushBuilding (58, 2.0, 1000, 2500, 126, 116, 108);
g_track[2].PushBuilding (61, -2.0, 1500, 3500, 108, 103, 103);
g_track[2].PushBuilding (65, -2.0, 2500, 2500, 90, 87, 95);
g_track[2].PushBuilding (68, 2.0, 3000, 2500, 91, 88, 97);
g_track[2].PushBuilding (72, 2.0, 2500, 2200, 73, 72, 75);
g_track[2].PushBuilding (73, -2.0, 2500, 2500, 126, 116, 108);
g_track[2].PushBuilding (312, 2.0, 3000, 2000, 108, 103, 103);
g_track[2].PushBuilding (315, -2.0, 2800, 2300,73, 72, 75);
g_track[2].PushBuilding (318, 2.0, 2500, 2200, 90, 87, 95);
g_track[2].PushBuilding (320, -2.0, 2500, 2500, 91, 88, 97);













g_track[3] = new Track();
g_track[3].m_background = "Images/GSAction/Background/London.png";
g_track[3].m_skyColor = [208, 208, 192];
g_track[3].m_hillColor[0] = [221, 221, 204];
g_track[3].m_hillColor[1] = [221, 221, 204];
g_track[3].m_hillColor[2] = [221, 221, 204];
g_track[3].m_hillColor[3] = [221, 221, 204];
g_track[3].m_fogColor = [221, 221, 204];
g_track[3].m_fogIntensity = 0.08;

g_track[3].m_tunnelColor[0] = [128, 128, 112];
g_track[3].m_tunnelColor[1] = [0, 0, 0];
g_track[3].m_tunnelColor[2] = [0, 0, 0];
g_track[3].m_tunnelColor[3] = [64, 64, 64];
g_track[3].m_tunnelColor[4] = [64, 64, 64];

g_track[3].PushTexture (300, "Images/GSAction/Road/Road_4_1.png", "Images/GSAction/Road/Road_4_2.png");

for (var i=0; i<10; i++) {
	g_track[3].PushSign (i + 1, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[3].PushSign (i + 10, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[3].PushSign (i + 50, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[3].PushSign (i + 65, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[3].PushSign (i + 90, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[3].PushSign (i + 114, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[3].PushSign (i + 169, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[3].PushSign (i + 205, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[3].PushSign (i + 250, SIGN_TURN_RIGHT);
}


g_track[3].PushStraight (10); // 10
g_track[3].PushStraight (10, -8); // 20
g_track[3].PushCurve ([1,3,5]); // 23
g_track[3].PushStraight (5, 5); // 28
g_track[3].PushCurve ([3,1]); // 30
g_track[3].PushStraight (30,0); // 60
g_track[3].PushCurve ([1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,-1,-3,-5,-6,-6,-6,-3,-2,-3,-4,-5,-5,-5,-5,-4,-3,-2,-1,0]); // 94
g_track[3].PushStraight (6,0); // 100
g_track[3].PushCurve ([-3,-4,-5,-6,-7,-8,-7,-6,-5,-4,-3,-2,-1,0]); // 114
g_track[3].PushStraight (10,0); // 124
g_track[3].PushCurve ([-3,-4,-5,-6,-7,-8,-9,-8,-7,-6,-5,-4,-6,-8,-6,-5,-4,-3,-2,-1]); // 144
g_track[3].PushStraight (35,0); // 179
g_track[3].PushCurve ([2,4,5,6,7,7,7,7,7,7,7,7,7,7,6,5,4,3,2,1]); // 199
g_track[3].PushCurve ([2,4,5,6,7,7,7,7,7,6,5,4,3,2,1,0]); //  215
g_track[3].PushCurve ([0,-1,-2,-3,-4,-5,-6,-6,-6,-6,-6,-6,-6,-5,-5,-4,-4,-3,-2,-1]); // 235
g_track[3].PushStraight (25,0); // 260
g_track[3].PushCurve ([2,3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,4,5,5,4,3,2,1,0]); // 284
g_track[3].PushStraight (16,0); // 300

g_track[3].PushElevation ([0,-1,-2,-3,-4,-5,-6,-7]);
g_track[3].PushFlat (12,-7);
g_track[3].PushElevation ([-6,-5,-5,-4,-4,-3,-2,-1,0,0]);
g_track[3].PushElevation ([1,2,3,4,5,5,5,4,4,4,4,4,3,3,3,3,2,2,1,0]);
g_track[3].PushElevation ([-1,-2,-3,4,-5,-5,-5,-5,-5,-5]);
g_track[3].PushElevation ([-2,0,2,5,4,3,2]);
g_track[3].PushElevation ([-1,-2,-3,-4,-5,-5,-5,-5,-5,-5,-5,-5,-5]);
g_track[3].PushElevation ([-4,-3,-2,-1]);
g_track[3].PushFlat (11,0);
g_track[3].PushFlat (15,0);
g_track[3].PushElevation ([3,5,5,5,5,5,5,5,5,4,3,2,1,0,0]);
g_track[3].PushFlat (5,0);
g_track[3].PushElevation ([3,5,6,6,5,5,5,4,3,2,-1,-4,-6,-6,-5,-4,-3,-2]);
g_track[3].PushFlat (5,6);
g_track[3].PushFlat (20,0);
g_track[3].PushFlat (5,-6);
g_track[3].PushFlat (21,0);
g_track[3].PushElevation ([1,2,4]);
g_track[3].PushFlat (20,5);
g_track[3].PushElevation ([4,2,1]);
g_track[3].PushFlat (17,-1);
g_track[3].PushFlat (58,0);

g_track[3].PushObstacle (OBSTACLE_ROADBLOCK, 0.25, 40);
g_track[3].PushObstacle (OBSTACLE_ROADBLOCK, 0.3,  41);
g_track[3].PushObstacle (OBSTACLE_ROADBLOCK, 0.25, 42);
g_track[3].PushObstacle (OBSTACLE_ROADBLOCK, 0.2,  43);

g_track[3].PushObstacle (OBSTACLE_VLC, 0, 		110);
g_track[3].PushObstacle (OBSTACLE_VLC, 0.1,  	111);
g_track[3].PushObstacle (OBSTACLE_VLC, 0, 		112);
g_track[3].PushObstacle (OBSTACLE_VLC, -0.1,  	113);

g_track[3].PushObstacle (OBSTACLE_ROADBLOCK, -0.3, 240);
g_track[3].PushObstacle (OBSTACLE_ROADBLOCK, -0.4,  241);
g_track[3].PushObstacle (OBSTACLE_ROADBLOCK, -0.3, 242);
g_track[3].PushObstacle (OBSTACLE_ROADBLOCK, -0.4,  243);


var g_londonBush = new Entity ("Images/GSAction/Entities/London_Bush.png", -1.2, 0, 500);
g_londonBush.m_collisionRect.push ([-1.2, -1.1]);

g_track[3].PushEntity (g_finishLine, 0);

g_track[3].PushBuilding (1, 2.0, 2000, 4300, 128, 128, 112);
g_track[3].PushBuilding (2, -2.0, 2200, 4200, 144, 144, 128);
g_track[3].PushBuilding (3, 2.0, 2000, 4500, 104, 101, 70);
g_track[3].PushBuilding (4, -2.0, 2500, 4200, 112, 109, 80);
g_track[3].PushBuilding (10, 2.0, 2100, 4500, 128, 128, 112);
g_track[3].PushBuilding (34, 2.0, 2000, 4300, 144, 144, 128);
g_track[3].PushBuilding (35, -2.0, 2200, 4200, 112, 109, 80);
g_track[3].PushBuilding (37, -2.0, 2500, 4200, 104, 101, 70);

g_track[3].PushEntity (g_londonBush, 50, true);
g_track[3].PushEntity (g_londonBush, 52);
g_track[3].PushEntity (g_londonBush, 54, true);
g_track[3].PushEntity (g_londonBush, 56);
g_track[3].PushEntity (g_londonBush, 58, true);
g_track[3].PushEntity (g_londonBush, 60);

g_track[3].PushTunnel(88, 25);

g_track[3].PushEntity (g_londonBush, 122, true);
g_track[3].PushEntity (g_londonBush, 124);
g_track[3].PushEntity (g_londonBush, 126, true);
g_track[3].PushEntity (g_londonBush, 128);
g_track[3].PushEntity (g_londonBush, 130, true);
g_track[3].PushEntity (g_londonBush, 132);

g_track[3].PushBuilding (160, -2.0, 2000, 4300, 128, 128, 112);
g_track[3].PushBuilding (162, -2.0, 2200, 4200, 144, 144, 128);
g_track[3].PushBuilding (170, 2.0, 2000, 4500, 104, 101, 70);
g_track[3].PushBuilding (172, -2.0, 2500, 4200, 112, 109, 80);

g_track[3].PushTunnel(200, 15);

g_track[3].PushEntity (g_londonBush, 240, true);
g_track[3].PushEntity (g_londonBush, 242);
g_track[3].PushEntity (g_londonBush, 244, true);
g_track[3].PushEntity (g_londonBush, 246);
g_track[3].PushEntity (g_londonBush, 248, true);
g_track[3].PushEntity (g_londonBush, 250);












g_track[4] = new Track();
g_track[4].m_background = "Images/GSAction/Background/Siracusa.png";
g_track[4].m_skyColor = [153, 221, 255];
g_track[4].m_hillColor[0] = [240, 238, 230];
g_track[4].m_hillColor[1] = [240, 238, 230];
g_track[4].m_hillColor[2] = [240, 238, 230];
g_track[4].m_hillColor[3] = [240, 238, 230];
g_track[4].m_fogColor = [240, 238, 230];
g_track[4].m_fogIntensity = 0;

g_track[4].m_tunnelColor[0] = [0, 0, 0];
g_track[4].m_tunnelColor[1] = [103, 168, 187];
g_track[4].m_tunnelColor[2] = [103, 168, 187];
g_track[4].m_tunnelColor[3] = [148, 231, 255];
g_track[4].m_tunnelColor[4] = [148, 231, 255];

g_track[4].PushTexture (284, "Images/GSAction/Road/Road_5_1.png", "Images/GSAction/Road/Road_5_2.png");

g_track[4].PushEntity (g_finishLine, 0);




for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 20, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 43, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 73, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 108, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 112, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 123, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 154, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 180, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 206, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 229, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[4].PushSign (i + 240, SIGN_TURN_RIGHT);
}

// 284
g_track[4].PushStraight (30,0); // 30
g_track[4].PushCurve ([3,5,5]); // 33
g_track[4].PushStraight (20,0); // 53
g_track[4].PushCurve ([-3,-5,-3]); // 56
g_track[4].PushStraight (27,0); // 83
g_track[4].PushCurve ([1,1,2,3,4]); // 88
g_track[4].PushStraight (30,4); // 118
g_track[4].PushCurve ([4,3,2,1]); // 122
g_track[4].PushCurve ([-1,-2,-3,-4,-5,-5,-5,-4,-3,-2,-1]); // 133
g_track[4].PushCurve ([1,2,3,4,6,7,6,4,3,2,1]); // 144
g_track[4].PushStraight (20,0); // 164
g_track[4].PushCurve ([1,2,3,3,3,3,3,3,4,5,6,6,6,5,4,3,2,1]); // 182
g_track[4].PushStraight (8,0); // 190
g_track[4].PushCurve ([-1,-2,-3,-4]); // 194
g_track[4].PushStraight (10,-4); // 204
g_track[4].PushCurve ([-4,-3,-2,-1]); // 208
g_track[4].PushStraight (8,0); // 216
g_track[4].PushCurve ([1,2,3,4]); // 220
g_track[4].PushStraight (15,5); // 235
g_track[4].PushCurve ([4,3,2,1]); // 239
g_track[4].PushCurve ([-1,-2,-3,-4,-5,-5,-5,-4,-3,-2,-1]); // 250
g_track[4].PushCurve ([1,2,3,4,5,5,5,4,3,2,1]); // 261
g_track[4].PushStraight (23,0); // 284

g_track[4].PushFlat (60,0);
g_track[4].PushElevation ([-1,-2,-3,-4,-5,-6,-7,-6,-5,-4,-3,-2,-1]);
g_track[4].PushFlat (30,0);
g_track[4].PushElevation ([1,2,3,4,5,6,6,7,7,7,8,7,6,5,3,7,5,8,9,8,8,8,7,7,6,5,4,3,2,1]);
g_track[4].PushElevation ([1,2,3,3,3,-4,-2,-1,0,0,1,2,3,4,5,6,6,6,6,5,4,3,2,1,0]);
g_track[4].PushFlat (25,-5.36);
g_track[4].PushElevation ([-1,-2,-3,-4,-5,-6,-7,-8,-7,-7,-6,-6,-5,-4,-3,-2,-1,0]);
g_track[4].PushElevation ([1,2,3,4,5,6,7,8,9,10,10,9,7,5,4,2,1]);
g_track[4].PushFlat (53,-2);
g_track[4].PushElevation ([1,2,3,4,5,6,7,6,5,4,3,2,1]);


var g_italyTree = new Entity ("Images/GSAction/Entities/Italia_Tree_1.png", -1.2, 0, 600); 
g_italyTree.m_collisionRect.push ([-1.25, -1.15]);
var g_italyHouse = new Entity ("Images/GSAction/Entities/Italia_House_2.png", -2, 0, 1000);
g_italyHouse.m_collisionRect.push ([-2, -1.5]);

g_track[4].PushEntity (g_italyTree, 	5);
g_track[4].PushEntity (g_italyTree, 	6, true);
g_track[4].PushEntity (g_italyTree, 	7);
g_track[4].PushEntity (g_italyTree, 	8, true);
g_track[4].PushEntity (g_italyTree,  	9);
g_track[4].PushEntity (g_italyTree, 	10, true);
g_track[4].PushEntity (g_italyTree, 	11);
g_track[4].PushEntity (g_italyTree, 	12, true);
g_track[4].PushEntity (g_italyTree,  	13);
g_track[4].PushEntity (g_italyTree, 	14, true);
g_track[4].PushEntity (g_italyTree, 	15);
g_track[4].PushEntity (g_italyTree, 	16, true);
g_track[4].PushEntity (g_italyTree, 	17);
g_track[4].PushEntity (g_italyTree, 	18, true);
g_track[4].PushEntity (g_italyTree,  	19);
g_track[4].PushEntity (g_italyTree, 	20, true);
g_track[4].PushEntity (g_italyTree, 	21);
g_track[4].PushEntity (g_italyTree, 	22, true);
g_track[4].PushEntity (g_italyTree,  	23);
g_track[4].PushEntity (g_italyTree, 	24, true);

g_track[4].PushEntity (g_italyHouse, 	60, true);

g_track[4].PushTunnel(90, 5);

g_track[4].PushEntity (g_italyTree, 	125);
g_track[4].PushEntity (g_italyTree, 	126, true);
g_track[4].PushEntity (g_italyTree, 	129);
g_track[4].PushEntity (g_italyTree, 	130, true);
g_track[4].PushEntity (g_italyTree,  	133);
g_track[4].PushEntity (g_italyTree, 	134, true);
g_track[4].PushEntity (g_italyTree, 	137);
g_track[4].PushEntity (g_italyTree, 	138, true);
g_track[4].PushEntity (g_italyTree,  	141);
g_track[4].PushEntity (g_italyTree, 	142, true);

g_track[4].PushTunnel(160, 5);

g_track[4].PushEntity (g_italyHouse, 	180, false);

g_track[4].PushEntity (g_italyTree, 	200);
g_track[4].PushEntity (g_italyTree, 	201, true);
g_track[4].PushEntity (g_italyTree,  	202);
g_track[4].PushEntity (g_italyTree, 	203, true);

g_track[4].PushTunnel(220, 30);


g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.85, 90);
g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.9,  91);
g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.85, 92);
g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.8,  93);
g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.75, 94);

g_track[4].PushObstacle (OBSTACLE_VLC, 0.85,	160);
g_track[4].PushObstacle (OBSTACLE_VLC, 0.9, 	161);
g_track[4].PushObstacle (OBSTACLE_VLC, 0.95,	162);
g_track[4].PushObstacle (OBSTACLE_VLC, 0.9,		163);
g_track[4].PushObstacle (OBSTACLE_VLC, 0.85,	164);
g_track[4].PushObstacle (OBSTACLE_VLC, 0.9,		165);

g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.3, 230);
g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.4, 231);
g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.3, 234);
g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.4, 235);
g_track[4].PushObstacle (OBSTACLE_ROADBLOCK, -0.3, 236);









g_track[5] = new Track();
g_track[5].m_background = "Images/GSAction/Background/Luxor.png";
g_track[5].m_skyColor = [102, 136, 187];
g_track[5].m_hillColor[0] = [255, 255, 238];
g_track[5].m_hillColor[1] = [255, 255, 238];
g_track[5].m_hillColor[2] = [255, 255, 238];
g_track[5].m_hillColor[3] = [255, 255, 238];
g_track[5].m_fogColor = [255, 255, 238];
g_track[5].m_fogIntensity = 0;

g_track[5].m_tunnelColor[0] = [146, 112, 89];
g_track[5].m_tunnelColor[1] = [222, 206, 165];
g_track[5].m_tunnelColor[2] = [222, 206, 165];
g_track[5].m_tunnelColor[3] = [146, 112, 89];
g_track[5].m_tunnelColor[4] = [146, 112, 89];

g_track[5].PushTexture (300, "Images/GSAction/Road/Road_6_1.png", "Images/GSAction/Road/Road_6_2.png");

g_track[5].PushEntity (g_finishLine, 0);


for (var i=0; i<10; i++) {
	g_track[5].PushSign (i + 35, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[5].PushSign (i + 75, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[5].PushSign (i + 98, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[5].PushSign (i + 126, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[5].PushSign (i + 158, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[5].PushSign (i + 173, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[5].PushSign (i + 220, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[5].PushSign (i + 244, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[5].PushSign (i + 267, SIGN_TURN_RIGHT);
}


g_track[5].PushStraight (45,0); // 45
g_track[5].PushCurve ([1,2,3,4,4,5,5,6,6,7,7,8,8,8,8,8,8,8,7,7,6,6,5,5,4,3,2,1]); // 73
g_track[5].PushStraight (12,0); // 85
g_track[5].PushCurve ([-1,-2,-3,-4,-5,-6,-6,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-5,-5,-4,-3,-2,-1]); // 108
g_track[5].PushCurve ([2,4,6,8,6,4,2]); // 115
g_track[5].PushStraight (21,0); // 136
g_track[5].PushCurve ([-1,-3,-5,-7,-6,-5,-5,-4,-4,-4,-3,-3,-2,-2,-1,-1,-1]); // 153
g_track[5].PushStraight (15,0); // 168
g_track[5].PushCurve ([-1,-2,-3,-4,-5,-6,-7,-8,-7,-6,-5,-4,-3,-2,-1]); // 183
g_track[5].PushCurve ([1,2,3,4,5,6,7,8,7,6,5,4,3,2,1]); // 198
g_track[5].PushStraight (32,0); // 230
g_track[5].PushCurve ([-2,-4,-6,-6,-5,-5,-5,-4,-2,-1]); // 240
g_track[5].PushStraight (14,0); // 254
g_track[5].PushCurve ([1,2,3,4,5,6,7,8,7,6,5,4,3,2,1]); // 269
g_track[5].PushStraight (8,0); // 277
g_track[5].PushCurve ([2,4,4,4,2,1]); // 283
g_track[5].PushStraight (17,0); // 300

g_track[5].PushFlat (20,0);
g_track[5].PushElevation ([-4,0,-1,-2,-3,-4,-5,-6,-7,-8,-8,-7,-7,-2,3,4,0]);
g_track[5].PushFlat (20,0);
g_track[5].PushElevation ([1,2,3,4,5,6,5,5,4,3,2,2,2,1,0]);
g_track[5].PushFlat (10,0);
g_track[5].PushElevation ([1,3,5,-1,2,-1,-2,-3,-4,-5,-6,-7,-4,-3,-2,-1,0]);
g_track[5].PushFlat (15,0);
g_track[5].PushElevation ([-1,-2,-2,-3,-3,-4,-4,-4,-4,-5,-6,-6,-6,-5,-4,-3,-2,-1]);
g_track[5].PushElevation ([1,2,3,4,5,0,1,2,3,4,5,0]);
g_track[5].PushFlat (21,0);
g_track[5].PushElevation ([1,2,3,4,5,6,-2,0,-1,-2,-3,-4,-5,-5,-5,-6,-5,-4,-3,-2,-1,-5,-3,-2,-1]);
g_track[5].PushFlat (35,0);
g_track[5].PushElevation ([1,2,3,4,5,5,5,5,5,5,4,3,2,1,2,3,4,5,6,7,5,4,3,2,1]);
g_track[5].PushElevation ([-1,-2,-3,-4,-5,-5,-5,-4,-3,-2,-1,0]);
g_track[5].PushFlat (38, 1.505);


var g_luxorStatue = new Entity ("Images/GSAction/Entities/Luxor_Statue.png", -1.2, 0, 800); 
g_luxorStatue.m_collisionRect.push ([-1.25, -1.05]);

g_track[5].PushEntity (g_luxorStatue, 40, true);
g_track[5].PushEntity (g_luxorStatue, 42, true);
g_track[5].PushEntity (g_luxorStatue, 44, true);
g_track[5].PushEntity (g_luxorStatue, 46, true);
g_track[5].PushEntity (g_luxorStatue, 48, true);
g_track[5].PushEntity (g_luxorStatue, 50, true);
g_track[5].PushEntity (g_luxorStatue, 52, true);
g_track[5].PushEntity (g_luxorStatue, 54, true);

g_track[5].PushTunnel(80, 1);
g_track[5].PushTunnel(85, 1);
g_track[5].PushTunnel(90, 1);
g_track[5].PushTunnel(95, 1);
g_track[5].PushTunnel(100, 1);

g_track[5].PushEntity (g_luxorStatue, 140);
g_track[5].PushEntity (g_luxorStatue, 142);
g_track[5].PushEntity (g_luxorStatue, 144);
g_track[5].PushEntity (g_luxorStatue, 146);
g_track[5].PushEntity (g_luxorStatue, 148);
g_track[5].PushEntity (g_luxorStatue, 150);
g_track[5].PushEntity (g_luxorStatue, 152);
g_track[5].PushEntity (g_luxorStatue, 154);

g_track[5].PushTunnel(200, 1);
g_track[5].PushTunnel(205, 1);
g_track[5].PushTunnel(210, 1);
g_track[5].PushTunnel(215, 1);
g_track[5].PushTunnel(220, 1);

g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.75, 105);
g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.8,  106);
g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.75, 107);
g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.8,  108);
g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.85, 109);

g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.75,	160);
g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.8, 	161);
g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.85,	162);
g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.8,	163);
g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.75,	164);
g_track[5].PushObstacle (OBSTACLE_ROADBLOCK, 0.8,	165);












g_track[6] = new Track();
g_track[6].m_background = "Images/GSAction/Background/Vladivostok.png";
g_track[6].m_skyColor = [119, 153, 187];
g_track[6].m_hillColor[0] = [255, 255, 255];
g_track[6].m_hillColor[1] = [255, 255, 255];
g_track[6].m_hillColor[2] = [255, 255, 255];
g_track[6].m_hillColor[3] = [255, 255, 255];
g_track[6].m_fogColor = [255, 255, 255];
g_track[6].m_fogIntensity = 0;

g_track[6].m_tunnelColor[0] = [224, 255, 255];
g_track[6].m_tunnelColor[1] = [208, 224, 224];
g_track[6].m_tunnelColor[2] = [208, 224, 224];
g_track[6].m_tunnelColor[3] = [176, 192, 208];
g_track[6].m_tunnelColor[4] = [176, 192, 208];

g_track[6].PushTexture (314, "Images/GSAction/Road/Road_7_1.png", "Images/GSAction/Road/Road_7_2.png");

g_track[6].PushEntity (g_finishLine, 0);


for (var i=0; i<10; i++) {
	g_track[6].PushSign (i + 20, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[6].PushSign (i + 52, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[6].PushSign (i + 72, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[6].PushSign (i + 85, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[6].PushSign (i + 135, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[6].PushSign (i + 175, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[6].PushSign (i + 192, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[6].PushSign (i + 212, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[6].PushSign (i + 284, SIGN_TURN_LEFT);
}

g_track[6].PushStraight (30,0); // 30
g_track[6].PushCurve ([-2,-4,-6,-6,-8,-8,-8,-6,-6,-4,-4,-2]); // 42
g_track[6].PushStraight (20,0); // 62
g_track[6].PushCurve ([-2,-4,-6,-6,-8,-8,-8,-6,-6,-4,-4,-2]); // 74
g_track[6].PushStraight (8,0); // 82
g_track[6].PushCurve ([-2,-4,-8,-8,-8,-4,-2]); // 89
g_track[6].PushStraight (6,0); // 95
g_track[6].PushCurve ([5,10,10,10,5,2]); // 101
g_track[6].PushStraight (44,-2); // 145
g_track[6].PushCurve ([2,5,10,10,10,5,2]); // 152
g_track[6].PushStraight (33,0); // 185
g_track[6].PushCurve ([-1,-2,-3,-4,-5,-6,-7,-8,-8,-8,-7,-6,-5,-4,-3,-2,-1]); // 202
g_track[6].PushCurve ([1,2,3,4,5,5,5,5,5,5,4,4,4,4,4,4,3,3,2,1]); // 222
g_track[6].PushCurve ([-2,-4,-6,-6,-8,-8,-8,-6,-6,-4,-4,-2]); // 234
g_track[6].PushStraight (20,0); // 254
g_track[6].PushStraight (40,0); // 294
g_track[6].PushCurve ([-1,-2,-4,-6,-8,-8,-6,-5,-4,-3,-2,-1]); //306
g_track[6].PushStraight (8,0); // 314

g_track[6].PushFlat (30,0);
g_track[6].PushFlat (10,0);
g_track[6].PushElevation ([2,4,6,7,8,9,8,7,6,4,2,0,-2,-4,-6,-7,-8,-9,-8,-6,-4,-2,-1,0]);
g_track[6].PushFlat (10,0);
g_track[6].PushFlat (8,0);
g_track[6].PushElevation ([0,0,0,-1,-3,-5,-7]);
g_track[6].PushElevation ([-8,-9,-10,-10,-9,-8]);
g_track[6].PushElevation ([-6,-4,-2,0,0,0]);
g_track[6].PushFlat (44,0);
g_track[6].PushElevation ([0,0,2,4,6,8,10,8,6,4,2,0]);
g_track[6].PushFlat (28,0.52);
g_track[6].PushFlat (37,0);
g_track[6].PushElevation ([-2,-4,-6,-6,-8,-8,-8,-6,-6,-4,-4,-2]);
g_track[6].PushFlat (20,2);
g_track[6].PushFlat (10,3);
g_track[6].PushElevation ([2,4,6,7,8,9,8,7,6,4,2,0,-2,-4,-6,-7,-8,-9,-8,-6,-4,-2,-1,0]);
g_track[6].PushFlat (26,0);


var g_vladFence = new Entity ("Images/GSAction/Entities/Vladivostok_Fence.png", -1.2, 0, 600); 
g_vladFence.m_collisionRect.push ([-1.25, -1.05]);

g_track[6].PushEntity (g_vladFence, 	27);
g_track[6].PushEntity (g_vladFence, 	75, true);
g_track[6].PushEntity (g_vladFence, 	102);
g_track[6].PushEntity (g_vladFence, 	130, true);
g_track[6].PushEntity (g_vladFence,  	162);
g_track[6].PushEntity (g_vladFence, 	201, true);

g_track[6].PushTunnel(40, 20);
g_track[6].PushTunnel(140, 15);

g_track[6].PushBuilding (2, -2.0, 3000, 1300, 116, 130, 148);
g_track[6].PushBuilding (4, -2.0, 3200, 1200, 159, 177, 196);
g_track[6].PushBuilding (3, 2.0, 3000, 1500, 140, 158, 180);
g_track[6].PushBuilding (6, -2.0, 3500, 1200, 188, 206, 220);

g_track[6].PushObstacle (OBSTACLE_ROADBLOCK, 0.8, 3);
g_track[6].PushObstacle (OBSTACLE_VLC, 0.85, 4);
g_track[6].PushObstacle (OBSTACLE_VLC, 0.9,  5);
g_track[6].PushObstacle (OBSTACLE_VLC, 0.85, 6);
g_track[6].PushObstacle (OBSTACLE_VLC, -0.8,  7);
g_track[6].PushObstacle (OBSTACLE_VLC, -0.75, 8);
g_track[6].PushObstacle (OBSTACLE_VLC, -0.8, 9);
g_track[6].PushObstacle (OBSTACLE_ROADBLOCK, -0.8, 10);

g_track[6].PushObstacle (OBSTACLE_VLC, -0.85,	160);
g_track[6].PushObstacle (OBSTACLE_VLC, -0.9, 	161);
g_track[6].PushObstacle (OBSTACLE_VLC, -0.95,	162);
g_track[6].PushObstacle (OBSTACLE_VLC, -0.9,	163);
g_track[6].PushObstacle (OBSTACLE_VLC, -0.85,	164);
g_track[6].PushObstacle (OBSTACLE_VLC, -0.9,	165);

g_track[6].PushObstacle (OBSTACLE_ROADBLOCK, 0.3, 230);
g_track[6].PushObstacle (OBSTACLE_ROADBLOCK, 0.4, 231);
g_track[6].PushObstacle (OBSTACLE_ROADBLOCK, 0.3, 234);
g_track[6].PushObstacle (OBSTACLE_ROADBLOCK, 0.4, 235);
g_track[6].PushObstacle (OBSTACLE_ROADBLOCK, 0.3, 236);











g_track[7] = new Track();
g_track[7].m_background = "Images/GSAction/Background/Route66.png";
g_track[7].m_skyColor = [255, 68, 51];
g_track[7].m_hillColor[0] = [44, 6, 0];
g_track[7].m_hillColor[1] = [44, 6, 0];
g_track[7].m_hillColor[2] = [44, 6, 0];
g_track[7].m_hillColor[3] = [44, 6, 0];
g_track[7].m_fogColor = [44, 6, 0];
g_track[7].m_fogIntensity = 0;

g_track[7].m_tunnelColor[0] = [64, 0, 0];
g_track[7].m_tunnelColor[1] = [255, 115, 90];
g_track[7].m_tunnelColor[2] = [255, 115, 90];
g_track[7].m_tunnelColor[3] = [255, 68, 51];
g_track[7].m_tunnelColor[4] = [255, 68, 51];

g_track[7].PushTexture (314, "Images/GSAction/Road/Road_8_1.png", "Images/GSAction/Road/Road_8_2.png");

g_track[7].PushEntity (g_finishLine, 0);


for (var i=0; i<10; i++) {
	g_track[7].PushSign (i + 10, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[7].PushSign (i + 55, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[7].PushSign (i + 119, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[7].PushSign (i + 128, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[7].PushSign (i + 235, SIGN_TURN_RIGHT);
}
for (var i=0; i<10; i++) {
	g_track[7].PushSign (i + 252, SIGN_TURN_LEFT);
}
for (var i=0; i<10; i++) {
	g_track[7].PushSign (i + 280, SIGN_TURN_RIGHT);
}

g_track[7].PushStraight (20,0); // 20
g_track[7].PushCurve ([1,2,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,4,4,4,3,3,3,2,2,2,1,1]); // 65
g_track[7].PushCurve ([-1,-2,-3]); // 68
g_track[7].PushStraight (30,-4); // 98
g_track[7].PushCurve ([-3,-2,-1]); // 101
g_track[7].PushStraight (28,0); // 129
g_track[7].PushCurve ([1,2,3,4,5,4,3,2,1]); // 138
g_track[7].PushCurve ([-1,-2,-3,-4]); // 142
g_track[7].PushStraight (20,-5); // 162
g_track[7].PushStraight (20,0); // 182
g_track[7].PushStraight (10,3); // 192
g_track[7].PushStraight (40,0); // 232
g_track[7].PushStraight (13,0); // 245
g_track[7].PushCurve ([1,1,2,3,4,4,4,4,4,3,2,1,0]); // 258
g_track[7].PushStraight (4,0); // 262
g_track[7].PushCurve ([-1,-3,-5,-6,-6,-6,-6,-6,-6,-5,-3,-2,-1]); // 275
g_track[7].PushStraight (15,0); // 290
g_track[7].PushCurve ([1,2,4,6,7,6,5,4,2,1]); // 300
g_track[7].PushStraight (10,0); // 310

g_track[7].PushFlat (15,0);
g_track[7].PushElevation ([-5,-2]);
g_track[7].PushFlat (8,0);
g_track[7].PushElevation ([-3,2]);
g_track[7].PushElevation ([-1,-2,-3,-4,-5,-6,-5,-4,-3,-2,-1,-1,0,1,2,3,4,4,5,5,5,5,5,5,4,3,2,1,0]);
g_track[7].PushFlat (200,0);
g_track[7].PushElevation ([1,2,4,6,4,2,1,0,-1,-2,-3,-4,-6,-8,-10,-10,-10]);
g_track[7].PushFlat (19,-0.95);
g_track[7].PushElevation ([10,10,10,6,4,2,1,0]);
g_track[7].PushFlat (10,0);

var g_routeStone = new Entity ("Images/GSAction/Entities/Route_Stone.png", -1.2, 0, 600); 
g_routeStone.m_collisionRect.push ([-1.25, -1.05]);

g_track[7].PushEntity (g_routeStone, 	17, true);
g_track[7].PushEntity (g_routeStone, 	75);
g_track[7].PushEntity (g_routeStone, 	142, true);
g_track[7].PushEntity (g_routeStone,  	182, true);
g_track[7].PushEntity (g_routeStone, 	221);
g_track[7].PushEntity (g_routeStone, 	250);

g_track[7].PushTunnel(25, 20);
g_track[7].PushTunnel(150, 25);

g_track[7].PushBuilding (2, 2.0, 3000, 1300, 232, 78, 50);
g_track[7].PushBuilding (4, 2.0, 3200, 1200, 92, 10, 15);
g_track[7].PushBuilding (6, -2.0, 3000, 1500, 211, 49, 38);

g_track[7].PushBuilding (120, -2.0, 3000, 1000, 232, 78, 50);
g_track[7].PushBuilding (122, 2.0, 3200, 1000, 92, 10, 15);
g_track[7].PushBuilding (124, -2.0, 3000, 1000, 211, 49, 38);


g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, 0.8, 2);
g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, 0.85, 3);
g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, 0.8, 4);
g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, 0.85, 5);
g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, 0.9, 6);

g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, -0.8, 120);
g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, -0.85, 121);
g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, -0.8, 122);
g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, -0.85, 123);
g_track[7].PushObstacle (OBSTACLE_ROADBLOCK, -0.9, 124);