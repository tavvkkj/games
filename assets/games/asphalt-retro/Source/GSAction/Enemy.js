function Enemy (gsAction, index, data) {
	var SPRITE_SCALE = 300;
	var SPRITE_W = 80;
	var SPRITE_H = 60;
	var SPEED_MULTIPLIER = 17.1;
	var SIDE_SPEED_MULTIPLIER = 0.0002;
	var BUMPING_SPEED = 1.5;
	var BUMPING_DRAG = 3;
	
	var ATTACK_LATENCY = 2;
	var AGGRESIVE_DURATION = 3;
	
	var instance = this;
	
	this.m_x = 0;
	this.m_y = 0;
	this.m_z = 0;
	this.m_topSpeed = data.m_topSpeed * SPEED_MULTIPLIER;
	this.m_sideTopSpeed = data.m_sideTopSpeed * SIDE_SPEED_MULTIPLIER;
	
	this.m_w = data.m_w;
	this.m_h = data.m_h;
	
	this.m_active = false;
	this.m_HP = 0;
	this.m_front = true;
	
	var expediteCount = 0;
	var aggresiveDuration = 0;
	var targetX = 0;
	var sideBumpSpeed = 0;
	var attackLatency = 0;
	var deathCountdown = 1;
	
	var paint = 1 + (Math.random() * 3) >> 0;
	var image = g_graphicEngine.LoadImage("Images/GSAction/Cars/Car_" + (g_carSelect + 1) + "_" + paint +".png");
	var posImage = g_graphicEngine.LoadImage("Images/GSAction/Cars/CarPos.png");
	
	this.Update = function (dt) {
		if (gsAction.m_startSequence <= 0 && this.m_active) {
			var distance = this.m_z - gsAction.m_car.m_z;
			if (distance >  gsAction.m_road.m_trackLength * 0.5) distance -= gsAction.m_road.m_trackLength;
			if (distance < -gsAction.m_road.m_trackLength * 0.5) distance += gsAction.m_road.m_trackLength;
			
			var speedPercent = distance / (DRAW_DISTANCE * SEGMENT_LENGTH);
			speedPercent = 0.85 - speedPercent * speedPercent * 0.7;
			
			if (aggresiveDuration > 0) {
				aggresiveDuration -= dt;
				speedPercent = 1;
			}
			
			if (this.m_x > 1 || this.m_x < -1) {
				speedPercent = speedPercent * 0.2;
				if (expediteCount > 0) {
					expediteCount = 0;
					g_gsResult.AddAchievement (ACHIEVEMENT_EXPEDITIVE, 1);
				}
			}
			
			if (this.m_HP > 0 || deathCountdown > 0) {
				if (aggresiveDuration > 0 && g_gsAction.m_car.GetCurrentSpeed() > this.m_topSpeed * 0.9 && g_gsAction.m_car.GetCurrentSpeed() <= this.m_topSpeed * 1.05) {
					this.m_z += g_gsAction.m_car.GetCurrentSpeed() * speedPercent * dt * deathCountdown;
				}
				else {
					this.m_z += this.m_topSpeed * speedPercent * dt * deathCountdown;
				}
			}
			
			if (this.m_z > gsAction.m_road.m_trackLength) this.m_z -= gsAction.m_road.m_trackLength;
			if (this.m_z < 0) this.m_z += gsAction.m_road.m_trackLength;
			
			if (this.m_z - gsAction.m_car.m_z > gsAction.m_road.m_trackLength * 0.5) {
				if ((this.m_z - gsAction.m_road.m_trackLength) - gsAction.m_car.m_z < -DRAW_DISTANCE * SEGMENT_LENGTH * 0.45){
					this.m_z = gsAction.m_car.m_z - DRAW_DISTANCE * SEGMENT_LENGTH * 0.45 + gsAction.m_road.m_trackLength;
					gsAction.ChangeActiveEnemy (-1);
					if (this.m_HP <= 0) {
						gsAction.m_enemies.splice(index, 1);
					}
				}
			}
			else if (this.m_z - gsAction.m_car.m_z < -gsAction.m_road.m_trackLength * 0.5) {
				if ((this.m_z + gsAction.m_road.m_trackLength) - gsAction.m_car.m_z > DRAW_DISTANCE * SEGMENT_LENGTH){
					this.m_z = gsAction.m_car.m_z + DRAW_DISTANCE * SEGMENT_LENGTH - gsAction.m_road.m_trackLength;
					gsAction.ChangeActiveEnemy (1);
				}
			}
			else if (this.m_z - gsAction.m_car.m_z > DRAW_DISTANCE * SEGMENT_LENGTH) {
				this.m_z = gsAction.m_car.m_z + DRAW_DISTANCE * SEGMENT_LENGTH;
				gsAction.ChangeActiveEnemy (1);
			}
			else if (this.m_z - gsAction.m_car.m_z < -DRAW_DISTANCE * SEGMENT_LENGTH * 0.45) {
				this.m_z = gsAction.m_car.m_z - DRAW_DISTANCE * SEGMENT_LENGTH * 0.45;
				gsAction.ChangeActiveEnemy (-1);
				if (this.m_HP <= 0) {
					gsAction.m_enemies.splice(index, 1);
				}
			}
			
			if (this.m_z - gsAction.m_car.m_z > gsAction.m_road.m_trackLength * 0.5) {
				if (this.m_front == true) {
					this.m_front = false;
					gsAction.MovePosition (-1);
					if (aggresiveDuration <= 0) {
						aggresiveDuration = AGGRESIVE_DURATION;
						this.m_z = gsAction.m_car.m_z;
					}
				}
			}
			else if (this.m_z - gsAction.m_car.m_z < -gsAction.m_road.m_trackLength * 0.5) {
				if (this.m_front == false) {
					this.m_front = true;
					gsAction.MovePosition (1);
				}
			}
			else {
				if (this.m_z > gsAction.m_car.m_z && this.m_front == false) {
					this.m_front = true;
					gsAction.MovePosition (1);
				}
				else if (this.m_z < gsAction.m_car.m_z && this.m_front == true) {
					this.m_front = false;
					gsAction.MovePosition (-1);
					if (aggresiveDuration <= 0) {
						aggresiveDuration = AGGRESIVE_DURATION;
						this.m_z = gsAction.m_car.m_z;
					}
				}
			}
			
			if (this.m_z > gsAction.m_road.m_trackLength) this.m_z -= gsAction.m_road.m_trackLength;
			if (this.m_z < 0) this.m_z += gsAction.m_road.m_trackLength;
			
			var playerSegment = gsAction.m_road.FindSegment(this.m_z);
			var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
			
			this.m_y = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
			
			
			
			var tempZ = this.m_z;
			if (gsAction.m_car.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
			if (tempZ > gsAction.m_car.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
			
			//if (tempZ < gsAction.m_car.m_z + SEGMENT_LENGTH * 10 && tempZ > gsAction.m_car.m_z - this.m_h * ROAD_WIDTH) {
				attackLatency -= dt;
				if (attackLatency < 0) {
					attackLatency += ATTACK_LATENCY;
					//targetX = gsAction.m_car.m_x;
					targetX = RandomRange(-0.8, 0.8);
				}
				
				//if (targetX > 0.9) targetX = 0.9;
				//if (targetX < -0.9) targetX = -0.9;
			//}
			
			if (sideBumpSpeed != 0) {
				this.m_x += sideBumpSpeed * dt;
			}
			else {
				if (this.m_HP > 0 || deathCountdown > 0) {
					if (this.m_x < targetX) {
						if (this.m_x > 1 || this.m_x < -1) {
							this.m_x += this.m_sideTopSpeed * dt * 0.5;
						}
						else {
							this.m_x += this.m_sideTopSpeed * dt;
						}
						if (this.m_x > targetX) {
							this.m_x = targetX;
						}
					}
					else if (this.m_x > targetX) {
						if (this.m_x > 1 || this.m_x < -1) {
							this.m_x -= this.m_sideTopSpeed * dt * 0.5;
						}
						else {
							this.m_x -= this.m_sideTopSpeed * dt;
						}
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
			if (deathCountdown > 0) deathCountdown -= dt;
		}
		
		if (expediteCount > 0) {
			expediteCount -= dt;
		}
	}
	
	this.Bump = function (x, y, byPlayer) {
		if (x < 0) sideBumpSpeed = -BUMPING_SPEED;
		else if (x > 0) sideBumpSpeed = BUMPING_SPEED;
		
		if (byPlayer && this.m_HP > 0 && y >= 0) {
			//this.m_HP -= 15;
			if (this.m_HP <= 0) {
				deathCountdown = 1;
				gsAction.BulletTime();
				gsAction.AddWanted (KILL_WANTED);
			}
			expediteCount = 1;
		}
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
			Project(carPos, gsAction.m_cameraX * ROAD_WIDTH - playerSegment.dx, gsAction.m_cameraY, gsAction.m_cameraZ - (playerSegment.index < baseSegment.index ? gsAction.m_road.m_trackLength : 0), gsAction.m_cameraDepth, CANVAS_W, CANVAS_H * 0.9, ROAD_WIDTH, baseSegment.angle);
			
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
				else {
					g_graphicEngine.Draw (g_context, image, SPRITE_W * 2, SPRITE_H * 3, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
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
			var destX = Interpolate(playerSegment.p1.screen.x, playerSegment.p2.screen.x, playerPercent) + this.m_x * Interpolate(playerSegment.p1.screen.w, playerSegment.p2.screen.w, playerPercent);
			var destY = Interpolate(playerSegment.p1.screen.y, playerSegment.p2.screen.y, playerPercent) - destH;
			
			g_graphicEngine.Draw (g_context, posImage, 0, 0, 23, 12, destX - 11, destY - 16, 23, 12);
			
			g_graphicEngine.StrokeTextRGB (g_context, "" + (index + 1), destX - 4, destY - 24, 50, FONT_PRIMARY, 15, false, false, "center", "center", false, 0, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "" + (index + 1), destX - 5, destY - 25, 50, FONT_PRIMARY, 15, false, false, "center", "center", false, 255, 255, 255, 1);
			
			if (index == 0) {
				g_graphicEngine.StrokeTextRGB (g_context, g_locText[g_language][LANG_POS_1], destX + 8, destY - 24, 50, FONT_SECONDARY, 10, false, false, "center", "center", false, 0, 0, 0, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_1], destX + 7, destY - 25, 50, FONT_SECONDARY, 10, false, false, "center", "center", false, 255, 255, 255, 1);
			}
			else if (index == 1) {
				g_graphicEngine.StrokeTextRGB (g_context, g_locText[g_language][LANG_POS_2], destX + 8, destY - 24, 50, FONT_SECONDARY, 10, false, false, "center", "center", false, 0, 0, 0, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_2], destX + 7, destY - 25, 50, FONT_SECONDARY, 10, false, false, "center", "center", false, 255, 255, 255, 1);
			}
			else if (index == 2) {
				g_graphicEngine.StrokeTextRGB (g_context, g_locText[g_language][LANG_POS_3], destX + 8, destY - 24, 50, FONT_SECONDARY, 10, false, false, "center", "center", false, 0, 0, 0, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_3], destX + 7, destY - 25, 50, FONT_SECONDARY, 10, false, false, "center", "center", false, 255, 255, 255, 1);
			}
			else {
				g_graphicEngine.StrokeTextRGB (g_context, g_locText[g_language][LANG_POS_4], destX + 8, destY - 24, 50, FONT_SECONDARY, 10, false, false, "center", "center", false, 0, 0, 0, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_4], destX + 7, destY - 25, 50, FONT_SECONDARY, 10, false, false, "center", "center", false, 255, 255, 255, 1);
			}
		}
	}
}