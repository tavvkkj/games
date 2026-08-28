function Obstacle (gsAction) {
	var COLLISION_WIDTH = 0.3;
	var SPRITE_SCALE = 300;
	var SPRITE_W = []; SPRITE_W[OBSTACLE_ROADBLOCK] = 68; SPRITE_W[OBSTACLE_VLC] = 68;
	var SPRITE_H = []; SPRITE_H[OBSTACLE_ROADBLOCK] = 49; SPRITE_H[OBSTACLE_VLC] = 26;
		
	var instance = this;
	
	this.m_type = 0;
	this.m_active = false;
	this.m_x = 0;
	this.m_y = 0;
	this.m_w = COLLISION_WIDTH;
	this.m_z = 0;
	
	var image = [];
	image[OBSTACLE_ROADBLOCK] = g_graphicEngine.LoadImage("Images/GSAction/Obstacle/RoadBlock.png");
	image[OBSTACLE_VLC] = g_graphicEngine.LoadImage("Images/GSAction/Obstacle/VLC.png");
	
	
	this.Init = function () {
		
	}
	
	this.Spawn = function (type, x, z) {
		this.m_type = type;
		
		this.m_x = x;
		this.m_z = z;
		
		var playerSegment = gsAction.m_road.FindSegment(this.m_z);
		var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		this.m_y = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
		
		this.m_active = true;
	}
	
	this.Update = function (dt) {
		
	}
	
	this.Remove = function () {
		
	}
	
	this.Draw = function (clipLevel) {
		if (this.m_active == true) {
			var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
			var playerSegment = gsAction.m_road.FindSegment(this.m_z);
			var baseSegment = gsAction.m_road.FindSegment(gsAction.m_cameraZ);
			var carPos = {
				world: {
					x: instance.m_x * ROAD_WIDTH,
					y: instance.m_y, 
					z: instance.m_z,
				}, 
				camera: {}, 
				screen: {} 
			}
			Project(carPos, gsAction.m_cameraX * ROAD_WIDTH  - playerSegment.dx, gsAction.m_cameraY, gsAction.m_cameraZ - (playerSegment.index < baseSegment.index ? gsAction.m_road.m_trackLength : 0), gsAction.m_cameraDepth, CANVAS_W, CANVAS_H * 0.9, ROAD_WIDTH, baseSegment.angle);
			
			var scale = carPos.screen.scale;
			var destW = SPRITE_W[this.m_type] * SPRITE_SCALE * scale;
			var destH = SPRITE_H[this.m_type] * SPRITE_SCALE * scale;
			var destX = EaseOut(playerSegment.p1.screen.x, playerSegment.p2.screen.x, playerPercent) + this.m_x * EaseOut(playerSegment.p1.screen.w, playerSegment.p2.screen.w, playerPercent) - destW * 0.5;
			var destY = carPos.screen.y - destH;
			
			if (destY < clipLevel) {
				g_graphicEngine.Draw (g_context, image[this.m_type], 0, 0, SPRITE_W[this.m_type], SPRITE_H[this.m_type], destX, destY, destW, destH);
			}
		}
	}
}