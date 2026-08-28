function Police (gsAction) {
	var SPRITE_SCALE = 300;
	var SPRITE_W = 80;
	var SPRITE_H = 60;
	var SPEED_MULTIPLIER = 17.1;
	var SIDE_SPEED_MULTIPLIER = 0.0002;
	var BUMPING_SPEED = 1.1;
	var BUMPING_DRAG = 3;
	
	var ATTACK_LATENCY = 0.6;
	var AGGRESIVE_DURATION = 5;
	var BUST_SPEED = 800;
	
	var instance = this;
	var targetX = 0;
	var sideBumpSpeed = 0;
	var attackLatency = 0;
	
	this.m_x = 0;
	this.m_y = 0;
	this.m_z = 0;
	
	this.m_w = 0.14;
	this.m_h = 0.25;
	
	this.m_sideTopSpeed = 2000 * SIDE_SPEED_MULTIPLIER;
	
	this.m_active = false;
	this.m_HP = 0;
	
	var attackMode = false;
	var deathCountdown = 0;
	var getAway = false;
	var soundPlaying = false;
	var image = g_graphicEngine.LoadImage("Images/GSAction/Cars/Car_Police.png");
	
	
	this.Init = function () {
		g_sound.InitPolice();
		g_sound.SetPoliceVolume (0);
	}
	
	
	this.Spawn = function (x, z) {
		this.m_active = true;
		this.m_HP = 100;
		
		getAway = false;
		deathCountdown = 1;
		
		this.m_x = x;
		this.m_z = z;
		if (this.m_z < 0) this.m_z += gsAction.m_road.m_trackLength;
		
		var playerSegment = gsAction.m_road.FindSegment(this.m_z);
		var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		this.m_y = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
		
		this.ResumeSound();
	}
	
	this.Update = function (dt) {
		var distance = gsAction.m_car.m_z - this.m_z;
		if (distance >  gsAction.m_road.m_trackLength * 0.5) distance -= gsAction.m_road.m_trackLength;
		if (distance < -gsAction.m_road.m_trackLength * 0.5) distance += gsAction.m_road.m_trackLength;
		
		if (this.m_active && soundPlaying) {
			g_sound.SetPoliceVolume (1 - Math.abs(distance / (DRAW_DISTANCE * SEGMENT_LENGTH * 0.3)));
		}
			
		if (gsAction.m_startSequence <= 0 && this.m_active && this.m_HP > 0) {
			var speedPercent = distance / (DRAW_DISTANCE * SEGMENT_LENGTH);
			var speed = EaseOut(gsAction.m_car.GetChaseSpeed() * 1.1, POLICE_SPEED, speedPercent);
			
			if (distance < 0 && distance > -this.m_h * ROAD_WIDTH) attackMode = true;
			if (distance > this.m_h * ROAD_WIDTH) attackMode = false;
			
			if (attackMode) {
				speed = gsAction.m_car.GetChaseSpeed();
			}
			
			if (gsAction.m_finishedCount > 0 || gsAction.m_wanted < WANTED_POLICE || gsAction.m_wanted >= WANTED_CHOPPER || this.m_x > 1 || this.m_x < -1) {
				speed = 0;
				attackMode = false;
				
				if (getAway == false) {
					g_gsResult.AddAchievement (ACHIEVEMENT_GETAWAY, 1);
					getAway = true;
				}
			}
		
			
			if (this.m_HP > 0 || deathCountdown > 0) {
				this.m_z += speed * dt * deathCountdown;
			}
			
			if (this.m_z > gsAction.m_road.m_trackLength) this.m_z -= gsAction.m_road.m_trackLength;
			if (this.m_z < 0) this.m_z += gsAction.m_road.m_trackLength;
			
			
			
			
			if (this.m_z - gsAction.m_car.m_z > gsAction.m_road.m_trackLength * 0.5) {
				if ((this.m_z - gsAction.m_road.m_trackLength) - gsAction.m_car.m_z < -DRAW_DISTANCE * SEGMENT_LENGTH * 0.7){
					gsAction.m_policeCooldown = POLICE_INTERVAL;
					this.StopSound();
					this.m_active = false;
				}
			}
			else if (this.m_z - gsAction.m_car.m_z < -DRAW_DISTANCE * SEGMENT_LENGTH * 0.7) {
				if (this.m_z - gsAction.m_car.m_z > -gsAction.m_road.m_trackLength * 0.5) {
					gsAction.m_policeCooldown = POLICE_INTERVAL;
					this.StopSound();
					this.m_active = false;
				}
			}
			
			var playerSegment = gsAction.m_road.FindSegment(this.m_z);
			var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
			
			this.m_y = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
			
			
			
			var tempZ = this.m_z;
			if (gsAction.m_car.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
			if (tempZ > gsAction.m_car.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
			
			if (this.m_x <= 1 && this.m_x >= -1) {
				if (attackMode == true) {
					attackLatency -= dt;
					if (attackLatency < 0) {
						attackLatency += ATTACK_LATENCY;
						targetX = gsAction.m_car.m_x;
					}
					
					if (gsAction.m_car.GetCurrentSpeed() < BUST_SPEED && gsAction.m_pauseTimeCount <= 0 && gsAction.m_finishedCount <= 0) {
						gsAction.Busted();
						if (gsAction.m_car.m_x < 0) {
							this.m_x = gsAction.m_car.m_x + 0.2;
						}
						else {
							this.m_x = gsAction.m_car.m_x - 0.2;
						}
					}
					
					if (targetX > 0.9) targetX = 0.9;
					if (targetX < -0.9) targetX = -0.9;
				}
				else {
					targetX = RandomRange(-0.8, 0.8);
				}
			}
			else {
				targetX = this.m_x;
			}
			
			if (sideBumpSpeed != 0) {
				this.m_x += sideBumpSpeed * dt;
			}
			else {
				if (this.m_HP > 0 || deathCountdown > 0) {
					if (this.m_x < targetX) {
						this.m_x += this.m_sideTopSpeed * dt;
						if (this.m_x > targetX) {
							this.m_x = targetX;
						}
					}
					else if (this.m_x > targetX) {
						this.m_x -= this.m_sideTopSpeed * dt;
						if (this.m_x < targetX) {
							this.m_x = targetX;
						}
					}
				}
			}
			
			if (sideBumpSpeed > 0) {
				sideBumpSpeed -= BUMPING_DRAG * dt;
				if (sideBumpSpeed < 0) sideBumpSpeed = 0;
			}
			else if (sideBumpSpeed < 0) {
				sideBumpSpeed += BUMPING_DRAG * dt;
				if (sideBumpSpeed > 0) sideBumpSpeed = 0;
			}
			
			var enemy = gsAction.m_enemies[gsAction.m_activeEnemy];
			var tempZ = enemy.m_z;
			if (this.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
			if (tempZ > this.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
			
			if (this.m_z > tempZ - this.m_h * ROAD_WIDTH && this.m_z < tempZ + this.m_h * ROAD_WIDTH) {
				if (Math.abs(this.m_x - enemy.m_x) < this.m_w) {
					if (this.m_x > enemy.m_x) {
						this.Bump (1, 0, true);
						enemy.Bump (-1, 0);
					}
					else if (this.m_x < enemy.m_x) {
						this.Bump (-1, 0, true);
						enemy.Bump (1, 0);
					}
				}
			}
			
			for (var i=0; i<NUMBER_OF_TOURIST; i++) {
				var enemy = gsAction.m_tourist[i];
				var tempZ = enemy.m_z;
				if (this.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
				if (tempZ > this.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
				
				if (this.m_z > tempZ - this.m_h * ROAD_WIDTH && this.m_z < tempZ + this.m_h * ROAD_WIDTH) {
					if (Math.abs(this.m_x - enemy.m_x) < this.m_w) {
						if (this.m_x > enemy.m_x) {
							this.Bump (1, 0);
						}
						else {
							this.Bump (-1, 0);
						}
					}
				}
			}
		}
		
		if (this.m_HP <= 0) {
			if (deathCountdown > 0) {
				deathCountdown -= dt;
				if (deathCountdown < 0) {
					this.StopSound();
					this.m_active = false;
				}
			}
		}
	}
	
	this.Bump = function (x, y, byPlayer) {
		if (x < 0) sideBumpSpeed = -BUMPING_SPEED;
		else if (x > 0) sideBumpSpeed = BUMPING_SPEED;
	}
	
	
	this.StopSound = function () {
		if (this.m_active) {
			if (soundPlaying == true) {
				g_sound.StopPolice();
				soundPlaying = false;
			}
		}
	}
	
	this.ResumeSound = function () {
		if (this.m_active) {
			if (soundPlaying == false) {
				g_sound.PlayPolice();
				soundPlaying = true;
			}
		}
	}
	
	this.Remove = function () {
		this.m_active = false;
	}
	
	
	this.Draw = function (clipLevel) {
		if (this.m_active) {
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
			var destX = carPos.screen.x - destW * 0.5;
			var destY = carPos.screen.y - destH;
			
			if (destY < clipLevel) {
				if (this.m_HP > 0) {
					if (sideBumpSpeed > 0) {
						g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
						g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 2, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
					}
					else if (sideBumpSpeed < 0) {
						g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, destX + (destW-SPRITE_W), destY, destW, destH, 1, true);
						g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 2, SPRITE_W, SPRITE_H, destX + (destW-SPRITE_W), destY, destW, destH, 1, true);
					}
					else if (destX + destW * 0.5 < CANVAS_W * 0.4) {
						g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, destX + (destW-SPRITE_W), destY, destW, destH, 1, true);
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
				}
			}
		}
	}
	
	this.DrawHP = function () {
		if (this.m_active && this.m_z >= gsAction.m_car.m_z && this.m_z < gsAction.m_car.m_z + DRAW_DISTANCE * SEGMENT_LENGTH * 0.5) {
			var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
			var playerSegment = gsAction.m_road.FindSegment(this.m_z);
			
			var scale = Interpolate(playerSegment.p1.screen.scale, playerSegment.p2.screen.scale, playerPercent);
			
			var destW = SPRITE_W * SPRITE_SCALE * scale;
			var destH = SPRITE_H * SPRITE_SCALE * scale;
			var destX = Interpolate(playerSegment.p1.screen.x, playerSegment.p2.screen.x, playerPercent) + this.m_x * Interpolate(playerSegment.p1.screen.w, playerSegment.p2.screen.w, playerPercent) - 11;
			var destY = Interpolate(playerSegment.p1.screen.y, playerSegment.p2.screen.y, playerPercent) - destH;
		}
	}
	
	
}