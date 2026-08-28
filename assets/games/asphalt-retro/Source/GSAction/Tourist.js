function Tourist (gsAction, index) {
	var SPRITE_SCALE = 300;
	var SPRITE_W = 80;
	var SPRITE_H = 60;
	var LIGHT_W = 30;
	var LIGHT_H = 30;
	var LIGHT_OFFSET_X = 10;
	var LIGHT_OFFSET_Y = 30;
	
	var instance = this;
	var image = g_graphicEngine.LoadImage("Images/GSAction/Cars/Car_Tourist.png");
	var headLight = g_graphicEngine.LoadImage("Images/GSAction/Cars/HeadLight.png");
	
	this.m_x = 0;
	this.m_y = 0;
	this.m_z = 0;
	
	this.m_w = 0.14;
	this.m_h = 0.25;
	
	var direction = 1;
	
	this.Spawn = function (z) {
		this.m_z = z;
		
		var playerSegment = gsAction.m_road.FindSegment(this.m_z);
		var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		this.m_y = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
		
		direction = Math.random() > 0.5? 1:-1;
		
		this.m_x = Math.random() > 0.5? 0.2:0.6;
		this.m_x *= direction;
		
		if (g_mapSelect == 0 || g_mapSelect == 3) {
			// Tokyo and London drive on the left
			this.m_x *= -1;
		}
	}
	
	this.Update = function (dt) {
		this.m_z += direction * TOURIST_SPEED * dt;
		if (this.m_z > gsAction.m_road.m_trackLength) this.m_z -= gsAction.m_road.m_trackLength;
		if (this.m_z < 0) this.m_z += gsAction.m_road.m_trackLength;
	}
	
	
	this.Draw = function (clipLevel) {
		var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		var playerSegment = gsAction.m_road.FindSegment(this.m_z);
		
		var scale = Interpolate(playerSegment.p1.screen.scale, playerSegment.p2.screen.scale, playerPercent);
		
		var destW = SPRITE_W * SPRITE_SCALE * scale;
		var destH = SPRITE_H * SPRITE_SCALE * scale;
		var destX = Interpolate(playerSegment.p1.screen.x, playerSegment.p2.screen.x, playerPercent) + this.m_x * Interpolate(playerSegment.p1.screen.w, playerSegment.p2.screen.w, playerPercent) - destW * 0.5;
		var destY = Interpolate(playerSegment.p1.screen.y, playerSegment.p2.screen.y, playerPercent) - destH;
		
		var lightDestW = LIGHT_W * SPRITE_SCALE * scale;
		var lightDestH = LIGHT_H * SPRITE_SCALE * scale;
		var lightDestX = destX + destW * 0.5;
		
		if (destY < clipLevel) {
			if (destX + destW * 0.5 < CANVAS_W * 0.4) {
				g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, destX+(destW-SPRITE_W), destY, destW, destH, 1, true);
				g_graphicEngine.Draw (g_context, image, SPRITE_W, 0, SPRITE_W, SPRITE_H, destX+(destW-SPRITE_W), destY, destW, destH, 1, true);
			}
			else if (destX + destW * 0.5 > CANVAS_W * 0.6) {
				g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
				g_graphicEngine.Draw (g_context, image, SPRITE_W, 0, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
			}
			else {
				g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
				g_graphicEngine.Draw (g_context, image, 0, 0, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
			}
			
			if (direction < 0) {
				g_graphicEngine.Draw (g_context, headLight, 0, 0, LIGHT_W, LIGHT_H, lightDestX - LIGHT_OFFSET_X * scale * SPRITE_SCALE - lightDestW * 0.5, destY + LIGHT_OFFSET_Y * scale * SPRITE_SCALE, lightDestW, lightDestH);
				g_graphicEngine.Draw (g_context, headLight, 0, 0, LIGHT_W, LIGHT_H, lightDestX + LIGHT_OFFSET_X * scale * SPRITE_SCALE - lightDestW * 0.5, destY + LIGHT_OFFSET_Y * scale * SPRITE_SCALE, lightDestW, lightDestH);
			}
		}
	}
}