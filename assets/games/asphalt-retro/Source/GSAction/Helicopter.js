function Helicopter (gsAction) {
	var SHOOT_STATE_COOLDOWN = 0;
	var SHOOT_STATE_AIM = 1;
	var SHOOT_STATE_SHOOT = 2;
	var LASER_RANGE = 140;
	
	var FRAME_COUNT = 4;
	var HOVER_HEIGHT = 110;
	var SHOOT_HEIGHT = 121;
	var EXIT_HEIGHT = 200;
	var BUST_HEIGHT = 60;
	var FLOAT_HEIGHT = 10;
	var RISE_SPEED = 100;
	var AIM_TIME = 3;
	var SHOOT_TIME = 1;
	var COOLDOWN_TIME = 5;
	
	var SPRITE_SCALE = 300;
	var SPRITE_W = 101;
	var SPRITE_H = 64;
	
	var LASER_W = 13;
	var LASER_H = 140;
	var LASER_FRAME_TIME = 0.032;
	var LASER_FRAME = 4;
	
	var EXPLODE_W = 64;
	var EXPLODE_H = 64;
	var EXPLODE_FRAME_TIME = 0.046;
	var EXPLODE_FRAME = 5;
	
	var HIT_ANGLE = 15;
	
	var BUST_SPEED = 800;
	
	var SPEED_X_MULTIPLIER = 2;
	
	var image = g_graphicEngine.LoadImage("Images/GSAction/Helicopter/Helicopter.png");
	var laser = g_graphicEngine.LoadImage("Images/GSAction/Helicopter/HeliLaser.png");
	var explosion = g_graphicEngine.LoadImage("Images/GSAction/Helicopter/HeliEmpExplode.png");
	
	this.m_active = false;
	this.m_x = 0;
	this.m_y = 0;
	this.m_z = 0;
	
	var instance = this;
	var height = 110;
	var floatHeightCount = 0;
	var currentFrame = 0;
	var shootState = 0;
	var shootTime = 0;
	var aimAngle = 0;
	var drawLaser = false;
	var laserBlink = 0;
	
	var empFrame = 0;
	var empFrameCount = 0;
	var explodeFrame = 0;
	var explodeFrameCount = 0;
	var soundPlaying = false;
	
	
	this.Init = function () {
		g_sound.InitHelicopter();
		g_sound.SetHelicopterVolume (0);
	}
	
	
	this.Spawn = function () {
		this.m_x = RandomRange (-1, 1);
		this.m_z = gsAction.m_car.m_z;
		
		this.m_active = true;
		height = EXIT_HEIGHT;
		
		shootState = SHOOT_STATE_COOLDOWN;
		shootTime = COOLDOWN_TIME;
		empFrame = LASER_FRAME;
		explodeFrame = EXPLODE_FRAME;
		
		this.ResumeSound();
	}
	
	this.Update = function (dt) {
		if (this.m_active && soundPlaying) {
			g_sound.SetHelicopterVolume (1 - (height - HOVER_HEIGHT) / (EXIT_HEIGHT - HOVER_HEIGHT));
		}
		
		if (this.m_active && gsAction.m_pauseTimeCount <= 0) {
			this.m_z = gsAction.m_car.m_z;
			
			var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
			var playerSegment = gsAction.m_road.FindSegment(this.m_z);
			this.m_y = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent) + height;
			
			var nextZ = this.m_z + SEGMENT_LENGTH * 15;
			if (nextZ > gsAction.m_road.m_trackLength) nextZ -= gsAction.m_road.m_trackLength;
			var playerSegment2 = gsAction.m_road.FindSegment(nextZ);
			
			if (playerSegment.tunnel > 0 || playerSegment2.tunnel > 0 || gsAction.m_wanted < WANTED_CHOPPER) {
				height += RISE_SPEED * dt;
				if (height > EXIT_HEIGHT) {
					height = EXIT_HEIGHT;
					if (gsAction.m_wanted < WANTED_CHOPPER) {
						this.m_active = false;
					}
				}
				drawLaser = false;
			}
			else {
				floatHeightCount += 120 * dt;
				var targetHeight = HOVER_HEIGHT + Math.sin(DEG_TO_RAD * floatHeightCount) * FLOAT_HEIGHT;
				
				height -= RISE_SPEED * dt;
				if (height < targetHeight) height = targetHeight;
				
				if (height < SHOOT_HEIGHT) {
					drawLaser = true;
					if (shootState == SHOOT_STATE_COOLDOWN) {
						shootTime -= dt;
						if (shootTime <= 0) {
							shootState = SHOOT_STATE_AIM;
							shootTime = AIM_TIME;
						}
						this.m_x += (gsAction.m_car.m_x - this.m_x) * dt * SPEED_X_MULTIPLIER;
						
						if (empFrame < LASER_FRAME) {
							empFrameCount += dt;
							if (empFrameCount >= LASER_FRAME_TIME) {
								empFrame ++;
								empFrameCount -= LASER_FRAME_TIME;
								
								if (empFrame == LASER_FRAME) {
									explodeFrame = 0;
									explodeFrameCount = 0;
								}
							}
						}
						if (explodeFrame < EXPLODE_FRAME) {
							explodeFrameCount += dt;
							if (explodeFrameCount >= EXPLODE_FRAME_TIME) {
								explodeFrame ++;
								explodeFrameCount -= EXPLODE_FRAME_TIME;
							}
						}
						
					}
					else if (shootState == SHOOT_STATE_AIM) {
						aimAngle = AngleBetweenTwoPoint (this.m_x * ROAD_WIDTH * 0.5, this.m_y, gsAction.m_car.m_x * ROAD_WIDTH * 0.5, gsAction.m_car.m_y);
						
						if (aimAngle > 330 || aimAngle < 30) {
							shootTime -= dt;
							if (shootTime <= 0) {
								shootState = SHOOT_STATE_SHOOT;
								shootTime = SHOOT_TIME;
								g_sound.Play(SOUND_EMP_CHARGE);
							}
						}
						else {
							drawLaser = false;
						}
						
						this.m_x += (gsAction.m_car.m_x - this.m_x) * dt * SPEED_X_MULTIPLIER;
					}
					else if (shootState == SHOOT_STATE_SHOOT) {
						shootTime -= dt;
						if (shootTime <= 0) {
							shootState = SHOOT_STATE_COOLDOWN;
							shootTime = COOLDOWN_TIME;
							empFrame = 0;
							empFrameCount = 0;
							
							// Check car hit
							var curAngle = AngleBetweenTwoPoint (this.m_x * ROAD_WIDTH * 0.5, this.m_y, gsAction.m_car.m_x * ROAD_WIDTH * 0.5, gsAction.m_car.m_y);
							if (Math.abs(AngleBetweenAngle (curAngle, aimAngle)) <= HIT_ANGLE) {
								gsAction.m_car.EMP();
							}
							
							g_sound.Play(SOUND_EMP_SHOOT);
						}
					}
				}
				
				if (gsAction.m_car.GetCurrentSpeed() < BUST_SPEED && gsAction.m_pauseTimeCount <= 0 && gsAction.m_finishedCount <= 0) {
					this.m_x = gsAction.m_car.m_x;
					height = BUST_HEIGHT;
					gsAction.Busted();
				}
			}
		}
	}
	
	this.Draw = function () {
		if (this.m_active) {
			currentFrame ++;
			if (currentFrame == FRAME_COUNT) {
				currentFrame = 0;
			}
			
			var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
			var playerSegment = gsAction.m_road.FindSegment(this.m_z);
			var baseSegment = gsAction.m_road.FindSegment(gsAction.m_cameraZ);
			var carPos = {
				world: {
					x: instance.m_x * ROAD_WIDTH,
					y: instance.m_y + height, 
					z: instance.m_z,
				}, 
				camera: {}, 
				screen: {} 
			}
			Project(carPos, gsAction.m_cameraX * ROAD_WIDTH,gsAction.m_cameraY, gsAction.m_cameraZ - (playerSegment.index < baseSegment.index ? gsAction.m_road.m_trackLength : 0), gsAction.m_cameraDepth, CANVAS_W, CANVAS_H * 0.9, ROAD_WIDTH, baseSegment.angle);
			
			var scale = carPos.screen.scale;
			var destW = SPRITE_W * SPRITE_SCALE * scale;
			var destH = SPRITE_H * SPRITE_SCALE * scale;
			var destX = carPos.screen.x - destW * 0.5;
			var destY = carPos.screen.y - destH;
			
			if (this.m_x > gsAction.m_car.m_x) {
				g_graphicEngine.Draw (g_context, image, 0, currentFrame * SPRITE_H, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
			}
			else {
				g_graphicEngine.Draw (g_context, image, 0, currentFrame * SPRITE_H, SPRITE_W, SPRITE_H, destX+(destW-SPRITE_W), destY, destW, destH, 1, true);
			}
			
			
			if (drawLaser && gsAction.m_pauseTimeCount <= 0) {
				var lineStartX = destX + destW * 0.5;
				var lineStartY = destY + destH * 0.9
				var lineEndX = lineStartX + Math.sin(aimAngle * DEG_TO_RAD) * LASER_RANGE;
				var lineEndY = lineStartY + Math.cos(aimAngle * DEG_TO_RAD) * LASER_RANGE;
				
				if (shootState == SHOOT_STATE_AIM) {
					g_graphicEngine.DrawLineRGB (g_context, lineStartX, lineStartY, lineEndX, lineEndY, 1, 0, 255, 0, 1);
				}
				else if (shootState == SHOOT_STATE_SHOOT) {
					laserBlink ++;
					if (laserBlink < 3) {
						g_graphicEngine.DrawLineRGB (g_context, lineStartX, lineStartY, lineEndX, lineEndY, 2, 255, 0, 0, 1);
					}
					else if (laserBlink > 4) {
						laserBlink = 0;
					}
				}
				else if (shootState == SHOOT_STATE_COOLDOWN) {
					if (empFrame < LASER_FRAME) {
						g_graphicEngine.Draw (g_context, laser, empFrame * LASER_W, 0, LASER_W, LASER_H, lineStartX - LASER_W * 0.5, lineStartY, LASER_W, LASER_H, 1, false, false, -aimAngle, LASER_W * 0.5, 0);
					}
					if (explodeFrame < EXPLODE_FRAME) {
						g_graphicEngine.Draw (g_context, explosion, explodeFrame * EXPLODE_W, 0, EXPLODE_W, EXPLODE_H, lineEndX - EXPLODE_W * 0.5, lineEndY - EXPLODE_H * 0.5, EXPLODE_W, EXPLODE_H, 1, false, false);
					}
				}
			}
		}
	}
	
	this.StopSound = function () {
		if (this.m_active) {
			if (soundPlaying == true) {
				g_sound.StopHelicopter();
				soundPlaying = false;
			}
		}
	}
	
	this.ResumeSound = function () {
		if (this.m_active) {
			if (soundPlaying == false) {
				g_sound.PlayHelicopter();
				soundPlaying = true;
			}
		}
	}
	
	this.Remove = function () {
		this.m_active = false;
	}
}