function Fragment (gsAction) {
	var SPRITE_SCALE = 300;
	
	var GRAVITY = 2800;
	var AIR_DRAG = 3000;
	var SPEED_X_MULTIPLIER = 0.0001;
	var SPEED_Y_MULTIPLIER = 0.3;
	var SPEED_Z_MULTIPLIER = 1.5;
	var SPEED_R_MULTIPLIER = 0.1;
		
	var instance = this;
	
	this.m_type = 0;
	this.m_frag = 0;
	this.m_active = false;
	this.m_x = 0;
	this.m_y = 0;
	this.m_z = 0;
	this.m_angle = 0;
	
	this.m_speedX = 0;
	this.m_speedY = 0;
	this.m_speedZ = 0;
	this.m_speedR = 0;
	
	var image = [];
	image[OBSTACLE_ROADBLOCK] = [];
	image[OBSTACLE_ROADBLOCK][0] = g_graphicEngine.LoadImage("Images/GSAction/Obstacle/RoadBlock_1.png");
	image[OBSTACLE_ROADBLOCK][1] = g_graphicEngine.LoadImage("Images/GSAction/Obstacle/RoadBlock_2.png");
	image[OBSTACLE_ROADBLOCK][2] = g_graphicEngine.LoadImage("Images/GSAction/Obstacle/RoadBlock_3.png");
	image[OBSTACLE_VLC] = [];
	image[OBSTACLE_VLC][0] = g_graphicEngine.LoadImage("Images/GSAction/Obstacle/VLC_1.png");
	image[OBSTACLE_VLC][1] = g_graphicEngine.LoadImage("Images/GSAction/Obstacle/VLC_2.png");
	image[OBSTACLE_VLC][2] = g_graphicEngine.LoadImage("Images/GSAction/Obstacle/VLC_3.png");
	
	
	this.Init = function () {
		
	}
	
	this.Spawn = function (type, frag, x, z, speed) {
		this.m_type = type;
		this.m_frag = frag;
		
		this.m_x = x;
		this.m_z = z;
		this.m_angle = RandomRange (0, 360);
		
		this.m_speedX = speed * SPEED_X_MULTIPLIER * RandomRange (-1, 1);
		this.m_speedY = speed * SPEED_Y_MULTIPLIER * RandomRange (0.5, 1);
		this.m_speedZ = speed * SPEED_Z_MULTIPLIER * RandomRange (0.5, 1);
		this.m_speedR = speed * SPEED_R_MULTIPLIER * RandomRange (-1, 1);
		
		var playerSegment = gsAction.m_road.FindSegment(this.m_z);
		var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		this.m_y = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
		
		this.m_active = true;
		
		SPRITE_W = g_graphicEngine.GetImage(image[this.m_type][this.m_frag]).width;
		SPRITE_H = g_graphicEngine.GetImage(image[this.m_type][this.m_frag]).height;
	}
	
	this.Update = function (dt) {
		if (this.m_active == true) {
			this.m_x += this.m_speedX * dt;
			
			var playerSegment = gsAction.m_road.FindSegment(this.m_z);
			var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
			this.m_y += this.m_speedY * dt;
			this.m_speedY -= GRAVITY * dt;
			if (this.m_y < Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent)) {
				this.m_y = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent)
				this.m_speedY = -this.m_speedY * 0.5;
			}
			
			this.m_z += this.m_speedZ * dt;
			if (this.m_z > gsAction.m_road.m_trackLength) {
				this.m_z -= gsAction.m_road.m_trackLength;
			}
			this.m_speedZ -= AIR_DRAG * dt;
			if (this.m_speedZ < 0) {
				this.m_speedZ = 0;
				this.m_active = false;
			}
			
			var distance = gsAction.m_car.m_z - this.m_z;
			if (distance >  gsAction.m_road.m_trackLength * 0.5) distance -= gsAction.m_road.m_trackLength;
			if (distance < -gsAction.m_road.m_trackLength * 0.5) distance += gsAction.m_road.m_trackLength;
			
			if (distance > SEGMENT_LENGTH) {
				this.m_active = false;
			}
			
			this.m_angle += this.m_speedR * dt;
			if (this.m_angle > 360) this.m_angle -= 360;
			if (this.m_angle < 0) this.m_angle += 360;
		}	
	}
	
	this.Remove = function () {
		
	}
	
	this.Draw = function () {
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
			var destW = SPRITE_W * SPRITE_SCALE * scale;
			var destH = SPRITE_H * SPRITE_SCALE * scale;
			var destX = EaseOut(playerSegment.p1.screen.x, playerSegment.p2.screen.x, playerPercent) + this.m_x * EaseOut(playerSegment.p1.screen.w, playerSegment.p2.screen.w, playerPercent) - destW * 0.5;
			var destY = carPos.screen.y - destH;
			
			g_graphicEngine.Draw (g_context, image[this.m_type][this.m_frag], 0, 0, SPRITE_W, SPRITE_H, destX, destY, destW, destH, 1, false, false, this.m_angle);
		}
	}
}