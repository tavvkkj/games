var POWERUP_NITRO = 0;
var POWERUP_MONEY = 1;
var POWERUP_DIPLOMATIC = 2;

function PowerUp(gsAction) {
	var SPRITE_SCALE = 400;
	var SPRITE_W = 31;
	var SPRITE_H = 32;
	
	var instance = this;
	
	this.m_active = false;
	this.m_x = 0;
	this.m_y = 0;
	this.m_z = 0;
	
	this.m_w = 0.2;
	
	var image = [];
	image[POWERUP_NITRO] = g_graphicEngine.LoadImage("Images/GSAction/PowerUp/Nitro.png");
	image[POWERUP_MONEY] = g_graphicEngine.LoadImage("Images/GSAction/PowerUp/Money.png");
	image[POWERUP_DIPLOMATIC] = g_graphicEngine.LoadImage("Images/GSAction/PowerUp/Diplomatic.png");
	
	this.m_type = POWERUP_NITRO;
	
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
				g_graphicEngine.Draw (g_context, image[this.m_type], 0, 0, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
			}
		}
	}
}