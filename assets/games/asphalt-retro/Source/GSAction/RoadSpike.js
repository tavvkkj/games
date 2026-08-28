function RoadSpike (gsAction) {
	var SPIKE_WIDTH = 0.7;
	var SPRITE_SCALE = 300;
	var SPRITE_W = 216;
	var SPRITE_H = 21;
	
	var MIN_X = -0.5;
	var MAX_X = 0.5;
	
	var instance = this;
	
	this.m_active = false;
	this.m_x = 0;
	this.m_y = 0;
	this.m_w = SPIKE_WIDTH;
	this.m_z = 0;
	
	var image = g_graphicEngine.LoadImage("Images/GSAction/RoadSpike/RoadSpike.png");
	
	
	this.Init = function () {
		
	}
	
	this.Spawn = function (z) {
		this.m_z = z;
		this.m_x = RandomRange (MIN_X, MAX_X);
		
		var playerSegment = gsAction.m_road.FindSegment(this.m_z);
		var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		this.m_y = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
		
		this.m_active = true;
	}
	
	this.Update = function (dt) {
		if (this.m_active == true) {
			var distance = gsAction.m_car.m_z - this.m_z;
			if (distance >  gsAction.m_road.m_trackLength * 0.5) distance -= gsAction.m_road.m_trackLength;
			if (distance < -gsAction.m_road.m_trackLength * 0.5) distance += gsAction.m_road.m_trackLength;
			
			if (distance > SEGMENT_LENGTH) {
				this.m_active = false;
			}
		}
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
			Project(carPos, gsAction.m_cameraX * ROAD_WIDTH,gsAction.m_cameraY, gsAction.m_cameraZ - (playerSegment.index < baseSegment.index ? gsAction.m_road.m_trackLength : 0), gsAction.m_cameraDepth, CANVAS_W, CANVAS_H * 0.9, ROAD_WIDTH, baseSegment.angle);
			
			var scale = carPos.screen.scale;
			var destW = SPRITE_W * SPRITE_SCALE * scale;
			var destH = SPRITE_H * SPRITE_SCALE * scale;
			var destX = EaseOut(playerSegment.p1.screen.x, playerSegment.p2.screen.x, playerPercent) + this.m_x * EaseOut(playerSegment.p1.screen.w, playerSegment.p2.screen.w, playerPercent) - destW * 0.5;
			var destY = carPos.screen.y - destH;
			
			if (destY < clipLevel) { 
				g_graphicEngine.Draw (g_context, image, 0, 0, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
			}
		}
	}
}