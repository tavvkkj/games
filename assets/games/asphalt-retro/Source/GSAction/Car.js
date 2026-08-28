function Car(gsAction, data) {
	var instance = this;
	
	var GEAR_THRESHOLD_4 = 0.7;
	var GEAR_THRESHOLD_3 = 0.45;
	var GEAR_THRESHOLD_2 = 0.22;
	var GEAR_RATIO_4 = 0.4;
	var GEAR_RATIO_3 = 0.6;
	var GEAR_RATIO_2 = 0.8;
	var GEAR_RATIO_1 = 1;
	
	var BUMP_THRESHOLD = 0.6;
	var BUMPING_SPEED = 1.5;
	var BUMPING_DRAG = 3;
	var SPRITE_SCALE = 300;
	var SPRITE_W = 80;
	var SPRITE_H = 60;
	var ACCELERATE_MULTIPLIER = 20.0;
	var DECELERATE_MULTIPLIER = 40.0;
	var EMP_SPEED_DECEL = 3000;
	var SPEED_MULTIPLIER = 17.1;
	var SIDE_SPEED_MULTIPLIER = 0.001;
	var CRASH_SPEED_MULITPLIER = -0.2;
	var GRAVITY = 2800;
	var SHAKE_DURATION = 0.3;
	var NO_COLLIDE_HEIGHT = 30;
	var TURN_SPEED_PENALTY = 0.1;
	var DRIFT_SPEED_PENALTY = 0.15;
	
	var EMP_W = 64;
	var EMP_H = 64;
	var EMP_SCALE = 300;
	var EMP_FRAME = 5;
	var EMP_FRAME_TIME = 0.064;
	
	var SCRATCH_W = 64;
	var SCRATCH_H = 64;
	var SCRATCH_SCALE = 300;
	var SCRATCH_FRAME_TIME = 0.06;
	var SCRATCH_FRAME = 6;
	var SCRATCH_OFFSET_X = 40;
	var SCRATCH_OFFSET_Y = 35;
	
	var DRIFT_FRAME_TIME = 0.075;
	var DRIFT_OFFSET_X = 45;
	var DRIFT_OFFSET_Y = 40;
	
	
	var NITRO_W = 24;
	var NITRO_H = 23;
	
	var image = g_graphicEngine.LoadImage("Images/GSAction/Cars/Car_" + (g_carSelect + 1) +"_" + (g_paintSelect + 1) +".png");
	var nitroImage = g_graphicEngine.LoadImage("Images/GSAction/Cars/Nitro.png");
	var empImage = g_graphicEngine.LoadImage("Images/GSAction/Cars/EMP.png");
	var scratchImage = g_graphicEngine.LoadImage("Images/GSAction/Cars/Scratch.png");
	var driftImage = g_graphicEngine.LoadImage("Images/GSAction/Cars/Drift.png");
	
	this.m_x = 0;
	this.m_y = 0;
	this.m_z = 0;
	this.m_groundY = 0;
	this.m_w = data.m_w;
	this.m_h = data.m_h;
	this.m_nitroCount = NITRO_MAX;
	this.m_nitroFuel = 0;
	
	// Move forward
	this.m_accel = data.m_accel * ACCELERATE_MULTIPLIER
	this.m_topSpeed = data.m_topSpeed * SPEED_MULTIPLIER;
	this.m_nitroAccel = data.m_nitroAccel * ACCELERATE_MULTIPLIER;
	this.m_nitroSpeed = data.m_nitroSpeed * SPEED_MULTIPLIER;
	this.m_brake = data.m_brake * DECELERATE_MULTIPLIER;
	// Steer
	this.m_sideTopSpeed = data.m_sideTopSpeed * SIDE_SPEED_MULTIPLIER;
	this.m_sideAccel = this.m_sideTopSpeed * 1000 / data.m_sideAccel;
	this.m_sideRelease = this.m_sideTopSpeed * 1000 / data.m_sideRelease;
	
	this.m_driftTopSpeed = data.m_driftTopSpeed * SIDE_SPEED_MULTIPLIER;
	
	
	var braking = false;
	var emp = false;
	var empFrame = 0;
	var flatTire = false;
	var empFrameCount = 0;
	var drifting = false;
	var crashed = false;
	var speed = 0;
	var sideSpeed = 0;
	var sideBumpSpeed = 0;
	var shaking = 0;
	var fallSpeed = 0;
	var dustSpawningLatency = 0;
	var doubleTap = 0;
	var enableLandSound = false;
	var enableDustSpawning = false;
	var nitroFrame = 0;
	var bonusSoundCooldown = 0;
	
	var leftScratchFrame = SCRATCH_FRAME;
	var leftScratchCount = 0;
	var rightScratchFrame = SCRATCH_FRAME;
	var rightScratchCount = 0;
	var driftFrame = SCRATCH_FRAME;
	var driftCount = 0;
	var driftSide = 0;
	
	var highSpeedCount_1 = 0;
	var highSpeedCount_2 = 0;
	
	this.Init = function() {
		g_sound.PlayEngine();
	}
	
	this.Update = function(dt) {
		var playerSegment = gsAction.m_road.FindSegment(this.m_z);
		var speedPercent  = Math.abs(speed) / this.m_topSpeed;
		var maxSideSpeed  = speedPercent * this.m_sideTopSpeed;
		
		if (doubleTap > 0) {
			doubleTap -= dt;
			if (doubleTap < 0) doubleTap = 0;
		}
		else if (doubleTap < 0) {
			doubleTap += dt;
			if (doubleTap > 0) doubleTap = 0;
		}
		
		var sideAccel = this.m_sideAccel * dt;
		var sideDecel = this.m_sideRelease * dt;
		if (gsAction.m_finishedCount <= 0 && gsAction.m_pauseTimeCount <= 0) {
			if (!crashed && (g_inputEngine.m_keyState[KEY.LEFT] == 1 || g_inputEngine.m_keyState[KEY.A] == 1)) {
				if (sideSpeed > 0) sideSpeed -= sideDecel;
				else sideSpeed -= sideAccel;
			}
			else if (!crashed && (g_inputEngine.m_keyState[KEY.RIGHT] == 1 || g_inputEngine.m_keyState[KEY.D] == 1)) {
				if (sideSpeed < 0) sideSpeed += sideDecel;
				else sideSpeed += sideAccel;
			}
			else {
				if (sideSpeed > sideDecel) sideSpeed -= sideDecel;
				else if (sideSpeed < -sideDecel) sideSpeed += sideDecel;
				else sideSpeed = 0;
				drifting = false;
			}
			
			if (g_inputEngine.m_keyState[KEY.UP] == 1 || g_inputEngine.m_keyState[KEY.W] == 1) {
				this.UseNitro();
			}
		}
		else {
			
		}
		
		
		
		
		
		if (!crashed) {
			var topSpeed = this.m_topSpeed;
			var accel = this.m_accel;
			var decel = this.m_brake;
			
			if (braking || this.m_nitroFuel > 0) {
				g_sound.SetEnginePitch (speed / this.m_nitroSpeed);
			}
			else {
				if (speed > this.m_topSpeed * GEAR_THRESHOLD_4) {
					g_sound.SetEnginePitch (speed / this.m_nitroSpeed);
					accel = this.m_accel * GEAR_RATIO_4;
				}
				else if (speed > this.m_topSpeed * GEAR_THRESHOLD_3) {
					g_sound.SetEnginePitch (speed / (this.m_nitroSpeed * GEAR_THRESHOLD_4));
					accel = this.m_accel * GEAR_RATIO_3;
				}
				else if (speed > this.m_topSpeed * GEAR_THRESHOLD_2) {
					g_sound.SetEnginePitch (speed / (this.m_nitroSpeed * GEAR_THRESHOLD_3));
					accel = this.m_accel * GEAR_RATIO_2;
				}
				else {
					g_sound.SetEnginePitch (speed / (this.m_nitroSpeed * GEAR_THRESHOLD_2));
					accel = this.m_accel * GEAR_RATIO_1;
				}
			}
			
			braking = false;
			if (gsAction.m_finishedCount == 0) {
				if (g_inputEngine.m_keyState[KEY.DOWN] == 1 || g_inputEngine.m_keyState[KEY.S] == 1) {
					topSpeed = 0;
					braking = true;
				}
				else if (this.m_nitroFuel > 0) {
					topSpeed = this.m_nitroSpeed;
					accel = this.m_nitroAccel;
				}
				
				if (drifting) {
					topSpeed = topSpeed * (1 - DRIFT_SPEED_PENALTY * Math.abs(sideSpeed / this.m_sideTopSpeed));
				}
				else {
					topSpeed = topSpeed * (1 - TURN_SPEED_PENALTY * Math.abs(sideSpeed / this.m_sideTopSpeed));
				}
			}
			else {
				topSpeed = 0;
				this.m_nitroFuel = 0;
			}
			
			if (this.m_x > 0.95 || this.m_x < -0.95) {
				topSpeed *= 0.3;
				dustSpawningLatency -= dt;
				if (dustSpawningLatency < 0) {
					dustSpawningLatency += 0.03;
					enableDustSpawning = true;
				}
				gsAction.PlayOffRoadSound();
			}
			else {
				gsAction.StopOffRoadSound();
			}
			
			if (emp == false && flatTire == false) {
				if (speed > topSpeed) {
					speed -= decel * dt;
					if (speed < topSpeed) speed = topSpeed;
				}
				else {
					if (gsAction.m_startSequence <= 0) {
						speed += accel * dt;
						if (speed > topSpeed) speed = topSpeed;
					}
				}
			}
			else {
				topSpeed = 0;
				if (speed > 0) {
					speed -= EMP_SPEED_DECEL * dt;
					if (speed < 0) {
						speed = 0;
						this.Reset();
					}
				}
				
				empFrameCount += dt;
				if (empFrameCount > EMP_FRAME_TIME) {
					empFrameCount -= EMP_FRAME_TIME;
					empFrame ++;
					if (empFrame >= EMP_FRAME) {
						empFrame = 0;
					}
				}
			}
			
			if (speed / SPEED_MULTIPLIER > 120) {
				gsAction.AddWanted (SPEED_WANTED * dt);
			}
		}
		else {
			g_sound.SetEnginePitch (speed / this.m_nitroSpeed);
			
			if (speed < 0) {
				speed += this.m_brake * dt;
				if (speed > 0) {
					this.Reset();
				}
			}
			else if (speed > 0) {
				speed -= this.m_brake * dt;
				if (speed < 0) {
					this.Reset();
				}
			}
			else {
				this.Reset();
			}
		}
		
		this.m_z += dt * speed;
		if (this.m_z > gsAction.m_road.m_trackLength * 0.5) {
			if (gsAction.m_lap % 1 <= 0.1) {
				gsAction.m_lap += 0.5;
			}
		}
		if (this.m_z > gsAction.m_road.m_trackLength) {
			this.m_z -= gsAction.m_road.m_trackLength;
			if (gsAction.m_lap % 1 >= 0.1) {
				gsAction.m_lap += 0.5;
				gsAction.ShowLap();
			}
		}
		if (this.m_z < 0) this.m_z += gsAction.m_road.m_trackLength;
		
		
		
		
		
		if (sideSpeed > maxSideSpeed) sideSpeed = maxSideSpeed;
		else if (sideSpeed < -maxSideSpeed) sideSpeed = -maxSideSpeed;
		
		this.m_x += (sideSpeed * (drifting ? 2:1) + sideBumpSpeed - maxSideSpeed * speedPercent * playerSegment.curve * CENTRIFUGAL) * dt;
		if (this.m_x > 1.2) this.m_x = 1.2;
		if (this.m_x < -1.2) this.m_x = -1.2;
		
		
		
		var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		playerSegment = gsAction.m_road.FindSegment(this.m_z);
		this.m_groundY = Interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
		
		
		var noCollide = false;
		
		fallSpeed -= GRAVITY * dt;
		if (this.m_y < this.m_groundY) {
			if (fallSpeed < (this.m_groundY - this.m_y) / dt) {
				fallSpeed = (this.m_groundY - this.m_y) / dt;
			}
			this.m_y = this.m_groundY;
			fallSpeed = 0;
		}
		else if (this.m_y > this.m_groundY) {
			this.m_y += fallSpeed * dt;
			if (this.m_y < this.m_groundY) {
				this.m_y = this.m_groundY;
				if (enableLandSound) {
					g_sound.Play(SOUND_IMPACT_GROUND);
					enableLandSound = false;
				}
			}
			else {
				enableLandSound = true;
			}
			
			if (this.m_y > this.m_groundY + NO_COLLIDE_HEIGHT) {
				noCollide = true;
			}
		}
		
		
		
		
		
		
		
		
		
		if (crashed == false && gsAction.m_pauseTimeCount <= 0) {
			if (playerSegment.entity) {
				for (var i=0; i<playerSegment.entity.m_collisionRect.length; i++) {
					if (this.m_x + this.m_w * 0.5 >= playerSegment.entity.m_collisionRect[i][0]
					&&  this.m_x - this.m_w * 0.5 <= playerSegment.entity.m_collisionRect[i][1]) {
						if (this.m_x + this.m_w * 0.5 - playerSegment.entity.m_collisionRect[i][0] <= this.m_w * BUMP_THRESHOLD) {
							this.Bump (-1, 0);
						}
						else if (playerSegment.entity.m_collisionRect[i][1] - (this.m_x - this.m_w * 0.5) <= this.m_w * BUMP_THRESHOLD) {
							this.Bump (1, 0);
						}
						else {
							speed *= CRASH_SPEED_MULITPLIER;
							crashed = true;
							gsAction.AddWanted (CRASH_WANTED);
							g_sound.Play(SOUND_CRASH);
						}
					}
				}
			}
			
			if (playerSegment.tunnel > 0) {
				if (this.m_x + this.m_w * 0.5 >= 1
				||  this.m_x - this.m_w * 0.5 <= -1) {
					if (this.m_x > 0 && this.m_x + this.m_w * 0.5 <= 1 + this.m_w * BUMP_THRESHOLD) {
						this.Bump (-1, 0);
						this.m_x = 1 - this.m_w * 0.5;
					}
					else if (this.m_x < 0 && this.m_x - this.m_w * 0.5 >= -1 - this.m_w * BUMP_THRESHOLD) {
						this.Bump (1, 0);
						this.m_x = -1 + this.m_w * 0.5;
					}
					else {
						speed *= CRASH_SPEED_MULITPLIER;
						crashed = true;
						g_sound.Play(SOUND_CRASH);
					}
				}
			}
			if (!noCollide) {
				var enemy = gsAction.m_enemies[gsAction.m_activeEnemy];
				if (enemy.m_HP > 0) {
					var tempZ = enemy.m_z;
					if (this.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
					if (tempZ > this.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
					
					if (this.m_z > tempZ - this.m_h * ROAD_WIDTH && this.m_z < tempZ + this.m_h * ROAD_WIDTH) {
						if (Math.abs(this.m_x - enemy.m_x) < this.m_w) {
							if (this.m_x > enemy.m_x + this.m_w * BUMP_THRESHOLD * 0.5) {
								this.Bump (1, 0, true);
								enemy.Bump (-1, 0, true);
							}
							else if (this.m_x < enemy.m_x - this.m_w * BUMP_THRESHOLD * 0.5) {
								this.Bump (-1, 0, true);
								enemy.Bump (1, 0, true);
							}
							else {
								if (this.m_z > tempZ) {
									this.Bump (0, 1, true);
									enemy.Bump (0, -1, true);
								}
								else {
									this.Bump (0, -1, true);
									enemy.Bump (0, 1, true);
								}
							}
						}
					}
				}
			
			
				for (var i=0; i<NUMBER_OF_TOURIST; i++) {
					var tourist = gsAction.m_tourist[i];
					var tempZ = tourist.m_z;
					if (this.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
					if (tempZ > this.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
					
					if (this.m_z > tempZ - this.m_h * ROAD_WIDTH && this.m_z < tempZ + this.m_h * ROAD_WIDTH) {
						if (Math.abs(this.m_x - tourist.m_x) < this.m_w) {
							if (this.m_x > tourist.m_x + this.m_w * BUMP_THRESHOLD * 0.5) {
								this.Bump (1, 0);
							}
							else if (this.m_x < tourist.m_x - this.m_w * BUMP_THRESHOLD * 0.5) {
								this.Bump (-1, 0);
							}
							else {
								speed *= CRASH_SPEED_MULITPLIER;
								crashed = true;
								gsAction.AddWanted (CRASH_WANTED);
								g_sound.Play(SOUND_CRASH);
							}
						}
					}
				}
				
				for (var i=0; i<gsAction.m_spikes.length; i++) {
					var spike = gsAction.m_spikes[i];
					if (spike.m_active == true) {
						var tempZ = spike.m_z;
						if (this.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
						if (tempZ > this.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
						
						if (this.m_z > tempZ - this.m_h * ROAD_WIDTH && this.m_z < tempZ + this.m_h * ROAD_WIDTH) {
							if (Math.abs(this.m_x - spike.m_x) < (this.m_w + spike.m_w) * 0.5) {
								this.Spike();
							}
						}
					}
				}
				
				for (var i=0; i<gsAction.m_powerUps.length; i++) {
					var power = gsAction.m_powerUps[i];
					if (power.m_active == true) {
						var tempZ = power.m_z;
						if (this.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
						if (tempZ > this.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
						
						if (this.m_z > tempZ - this.m_h * ROAD_WIDTH && this.m_z < tempZ + this.m_h * ROAD_WIDTH) {
							if (Math.abs(this.m_x - power.m_x) < (this.m_w + power.m_w) * 0.5) {
								this.EatPowerUp(power.m_type);
								power.m_active = false;
							}
						}
					}
				}
				
				for (var i=0; i<gsAction.m_obstacles.length; i++) {
					var obstacle = gsAction.m_obstacles[i];
					if (obstacle.m_active == true) {
						var tempZ = obstacle.m_z;
						if (this.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
						if (tempZ > this.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
						
						if (this.m_z > tempZ - this.m_h * ROAD_WIDTH && this.m_z < tempZ + this.m_h * ROAD_WIDTH) {
							if (Math.abs(this.m_x - obstacle.m_x) < (this.m_w + obstacle.m_w) * 0.5) {
								gsAction.SpawnFragment (obstacle.m_type, 0, obstacle.m_x, obstacle.m_z, speed);
								gsAction.SpawnFragment (obstacle.m_type, 1, obstacle.m_x, obstacle.m_z, speed);
								gsAction.SpawnFragment (obstacle.m_type, 2, obstacle.m_x, obstacle.m_z, speed);
								obstacle.m_active = false;
								speed *= 0.98;
								
								if (obstacle.m_type == OBSTACLE_ROADBLOCK) {
									g_sound.Play(SOUND_HIT_BARRIER);
								}
								else if (obstacle.m_type == OBSTACLE_VLC) {
									g_sound.Play(SOUND_HIT_CONES);
								}
								
								g_gsResult.AddAchievement (ACHIEVEMENT_URBAN_HAVOC, 1);
							}
						}
					}
				}
			
			
				if (gsAction.m_police.m_active) {
					enemy = gsAction.m_police;
					tempZ = enemy.m_z;
					if (this.m_z > tempZ + gsAction.m_road.m_trackLength * 0.5) tempZ += gsAction.m_road.m_trackLength;
					if (tempZ > this.m_z + gsAction.m_road.m_trackLength * 0.5) tempZ -= gsAction.m_road.m_trackLength;
					
					if (this.m_z > tempZ - this.m_h * ROAD_WIDTH && this.m_z < tempZ + this.m_h * ROAD_WIDTH) {
						if (Math.abs(this.m_x - enemy.m_x) < this.m_w) {
							if (this.m_x > enemy.m_x + this.m_w * BUMP_THRESHOLD * 0.5) {
								this.Bump (1, 0, true);
								enemy.Bump (-1, 0, true);
							}
							else if (this.m_x < enemy.m_x - this.m_w * BUMP_THRESHOLD * 0.5) {
								this.Bump (-1, 0, true);
								enemy.Bump (1, 0, true);
							}
							else {
								if (this.m_z > tempZ) {
									this.Bump (0, 1, true);
									enemy.Bump (0, -1, true);
								}
								else {
									this.Bump (0, -1, true);
									enemy.Bump (0, 1, true);
								}
							}
						}
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
		
		if (shaking > 0) {
			shaking -= dt;
		}
		
		if (this.m_nitroFuel > 0) {
			this.m_nitroFuel -= dt;
		}
		
		if (bonusSoundCooldown > 0) {
			bonusSoundCooldown -= dt;
		}
		
		if (rightScratchFrame < SCRATCH_FRAME - 1) {
			rightScratchCount += dt;
			if (rightScratchCount > SCRATCH_FRAME_TIME) {
				rightScratchCount -= SCRATCH_FRAME_TIME;
				rightScratchFrame ++;
			}
		}
		if (leftScratchFrame < SCRATCH_FRAME - 1) {
			leftScratchCount += dt;
			if (leftScratchCount > SCRATCH_FRAME_TIME) {
				leftScratchCount -= SCRATCH_FRAME_TIME;
				leftScratchFrame ++;
			}
		}
		if (driftFrame < SCRATCH_FRAME - 1) {
			driftCount += dt;
			if (driftCount > DRIFT_FRAME_TIME) {
				driftCount -= DRIFT_FRAME_TIME;
				driftFrame ++;
			}
		}
		
		
		
		
		
		if (speed > this.m_topSpeed * 0.8) {
			highSpeedCount_2 += dt;
			if (highSpeedCount_2 >= 10) {
				highSpeedCount_2 -= 10;
				highSpeedCount_1 = 0; // this is a must, not a mistake
				g_gsResult.AddAchievement (ACHIEVEMENT_SPEED_2, 1);
			}
		}
		else {
			highSpeedCount_2 = 0;
		}
		
		if (speed > this.m_topSpeed * 0.6) {
			highSpeedCount_1 += dt;
			if (highSpeedCount_1 >= 10) {
				highSpeedCount_1 -= 10;
				g_gsResult.AddAchievement (ACHIEVEMENT_SPEED_1, 1);
			}
		}
		else {
			highSpeedCount_1 = 0;
		}
	}
	
	
	this.Bump = function (x, y, enemy) {
		if (gsAction.m_pauseTimeCount <= 0 && shaking <= 0) {
			if (enemy == null) enemy = false;
			if (x < 0) {
				sideBumpSpeed = -BUMPING_SPEED;
				rightScratchCount = 0;
				rightScratchFrame = 0;
				
				if (enemy) g_gsResult.AddAchievement (ACHIEVEMENT_SCRATCH, 1);
			}
			else if (x > 0) {
				sideBumpSpeed = BUMPING_SPEED;
				leftScratchCount = 0;
				leftScratchFrame = 0;
				if (enemy) g_gsResult.AddAchievement (ACHIEVEMENT_SCRATCH, 1);
			}
			
			if (y < 0) {
				speed *= 0.6;
				if (enemy) g_gsResult.AddAchievement (ACHIEVEMENT_BUMPING, 1);
			}
			else if (y > 0) speed *= 1.1;
			else if (!enemy) speed *= 0.8;
			
			shaking = SHAKE_DURATION;
			sideSpeed = 0;

			g_sound.Play(SOUND_CRASH);
			gsAction.AddWanted (BUMP_WANTED);
		}
	}
	
	this.Draw = function() {
		var playerPercent = (this.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		var playerSegment = gsAction.m_road.FindSegment(this.m_z);
		
		var sourceX = 0;
		var sourceY = 0;
		
		if (sideSpeed != 0) {
			if (drifting == false) {
				sourceX = SPRITE_W;
			}
			else {
				sourceX = SPRITE_W * 2;
			}
		}
		
		if (braking == true && drifting == false) sourceX += SPRITE_W * 3;
		
		if (playerSegment.angle > 3) sourceY = SPRITE_H;
		else if (playerSegment.angle < -3) sourceY = SPRITE_H * 2;
		
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
		Project(carPos, gsAction.m_cameraX * ROAD_WIDTH, gsAction.m_cameraY, gsAction.m_cameraZ - (playerSegment.index < baseSegment.index ? gsAction.m_road.m_trackLength : 0), gsAction.m_cameraDepth, CANVAS_W, CANVAS_H * 0.9, ROAD_WIDTH, baseSegment.angle);
		
		
		var shadowPos = {
			world: {
				x: instance.m_x * ROAD_WIDTH,
				y: instance.m_groundY, 
				z: instance.m_z,
			}, 
			camera: {}, 
			screen: {}
		}
		Project(shadowPos, gsAction.m_cameraX * ROAD_WIDTH, gsAction.m_cameraY, gsAction.m_cameraZ - (playerSegment.index < baseSegment.index ? gsAction.m_road.m_trackLength : 0), gsAction.m_cameraDepth, CANVAS_W, CANVAS_H * 0.9, ROAD_WIDTH, baseSegment.angle);
		
		var scale = carPos.screen.scale;
		var destW = SPRITE_W * SPRITE_SCALE * scale;
		var destH = SPRITE_H * SPRITE_SCALE * scale;
        var destX = carPos.screen.x - destW * 0.5;
        var destY = carPos.screen.y - destH;
		var shadowX = shadowPos.screen.x - destW * 0.5;
        var shadowY = shadowPos.screen.y - destH;
		
		if (shaking > 0 && gsAction.m_bulletTimeCount <= 0 && gsAction.m_pauseTimeCount <= 0) {
			destX += RandomRange(-2, 2);
			destY += RandomRange(-2, 2);
		}
		
		if (gsAction.m_finishedCount != 0 || flatTire != 0) {
			g_graphicEngine.Draw (g_context, image, SPRITE_W, SPRITE_H * 3, SPRITE_W, SPRITE_H, shadowX, shadowY, destW, destH);
			g_graphicEngine.Draw (g_context, image, SPRITE_W * 2, sourceY, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
		}
		else if (crashed) {
			g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, shadowX, shadowY, destW, destH);
			g_graphicEngine.Draw (g_context, image, SPRITE_W * 2, SPRITE_H * 3, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
		}
		/*
		else if (sideBumpSpeed > 0) {
			g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, shadowX, shadowY, destW, destH);
			g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 2, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
		}
		else if (sideBumpSpeed < 0) {
			g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, shadowX + (destW-SPRITE_W), shadowY, destW, destH, 1, true);
			g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 2, SPRITE_W, SPRITE_H, destX + (destW-SPRITE_W), destY, destW, destH, 1, true);
		}
		*/
		else if (sideSpeed > 0) {
			if (drifting) g_graphicEngine.Draw (g_context, image, SPRITE_W, SPRITE_H * 3, SPRITE_W, SPRITE_H, shadowX+(destW-SPRITE_W), shadowY, destW, destH, 1, true);
			else g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, shadowX+(destW-SPRITE_W), shadowY, destW, destH, 1, true);
			g_graphicEngine.Draw (g_context, image, sourceX, sourceY, SPRITE_W, SPRITE_H, destX+(destW-SPRITE_W), destY, destW, destH, 1, true);
		}
		else {
			if (drifting && sideSpeed != 0) g_graphicEngine.Draw (g_context, image, SPRITE_W, SPRITE_H * 3, SPRITE_W, SPRITE_H, shadowX, shadowY, destW, destH);
			else g_graphicEngine.Draw (g_context, image, 0, SPRITE_H * 3, SPRITE_W, SPRITE_H, shadowX, shadowY, destW, destH);
			g_graphicEngine.Draw (g_context, image, sourceX, sourceY, SPRITE_W, SPRITE_H, destX, destY, destW, destH);
		}
		
		if (this.m_nitroFuel > 0 && !drifting && !crashed) {
			nitroFrame ++;
			if (nitroFrame == 3) nitroFrame = 0;
			
			var nitroX = data.m_nitroX * SPRITE_SCALE * scale;
			var nitroY = data.m_nitroY * SPRITE_SCALE * scale;
			var nitroOffsetX = 0;
			
			if (sideSpeed > 0) {
				nitroOffsetX = -data.m_nitroOffset * SPRITE_SCALE * scale;
			}
			else if (sideSpeed < 0) {
				nitroOffsetX = data.m_nitroOffset * SPRITE_SCALE * scale;
			}
			
			g_graphicEngine.Draw (g_context, nitroImage, NITRO_W * nitroFrame, 0, NITRO_W, NITRO_H, destX + destW * 0.5 - nitroX - NITRO_W * 0.5 + nitroOffsetX, destY + nitroY, NITRO_W, NITRO_H);
			g_graphicEngine.Draw (g_context, nitroImage, NITRO_W * nitroFrame, 0, NITRO_W, NITRO_H, destX + destW * 0.5 + nitroX - NITRO_W * 0.5 + nitroOffsetX, destY + nitroY, NITRO_W, NITRO_H, 1, true);
		}
		
		if (emp == true) {
			var empDestW = EMP_W * EMP_SCALE * scale;
			var empDestH = EMP_H * EMP_SCALE * scale;
			g_graphicEngine.Draw (g_context, empImage, EMP_W * empFrame, 0, EMP_W, EMP_H, destX + destW * 0.5 - empDestW * 0.5, destY + destH * 0.6 - empDestH * 0.5, empDestW, empDestH);
		}
		
		if (rightScratchFrame < SCRATCH_FRAME - 1) {
			var scratchX = destX + destW * 0.5 - SCRATCH_W * 0.5 + SCRATCH_OFFSET_X;
			var scratchY = destY + SCRATCH_OFFSET_Y;
			g_graphicEngine.Draw (g_context, scratchImage, rightScratchFrame * SCRATCH_W, 0, SCRATCH_W, SCRATCH_H, scratchX, scratchY, SCRATCH_W, SCRATCH_H, 1, true);
		}
		if (leftScratchFrame < SCRATCH_FRAME - 1) {
			var scratchX = destX + destW * 0.5 - SCRATCH_W * 0.5 - SCRATCH_OFFSET_X;
			var scratchY = destY + SCRATCH_OFFSET_Y;
			g_graphicEngine.Draw (g_context, scratchImage, leftScratchFrame * SCRATCH_W, 0, SCRATCH_W, SCRATCH_H, scratchX, scratchY, SCRATCH_W, SCRATCH_H);
		}
		if (driftFrame < SCRATCH_FRAME - 1) {
			if (driftSide == 1) {
				var driftX = destX + destW * 0.5 - SCRATCH_W * 0.5 - DRIFT_OFFSET_X;
				var driftY = destY + DRIFT_OFFSET_Y;
				g_graphicEngine.Draw (g_context, driftImage, driftFrame * SCRATCH_W, 0, SCRATCH_W, SCRATCH_H, driftX, driftY, SCRATCH_W, SCRATCH_H, 1, true);
			}
			else {
				var driftX = destX + destW * 0.5 - SCRATCH_W * 0.5 + DRIFT_OFFSET_X;
				var driftY = destY + DRIFT_OFFSET_Y;
				g_graphicEngine.Draw (g_context, driftImage, driftFrame * SCRATCH_W, 0, SCRATCH_W, SCRATCH_H, driftX, driftY, SCRATCH_W, SCRATCH_H);
			}
		}
		
		
		
		if (enableDustSpawning == true) {
			gsAction.AddDust (destX + destW * 0.5 - 40 + Math.random() * 80, destY + 80);
			enableDustSpawning = false;
		}
		gsAction.DrawDust();
		
		
		if (DRAW_COLLIDER) {
			var debugX = carPos.screen.x - this.m_w * carPos.screen.w * 0.5;
			var debugY = carPos.screen.y - carPos.screen.w * 0.12;
			var debugW = this.m_w * carPos.screen.w;
			var debugH = carPos.screen.w * 0.12;
			g_graphicEngine.DrawRectRGB (g_context, debugX, debugY, debugW, debugH, 1000 * carPos.screen.scale, 255, 0, 0, 1);
		}
		
	}
	
	this.GetSpeedPercent = function () {
		return speed / this.m_topSpeed;
	}
	
	
	this.SteerTap = function (dir) {
		if (!crashed && dir == 1 && !isInGameMenu) {
			if (doubleTap >= 0) {
				doubleTap = -0.2;
			}
			else {
				drifting = true;
				driftFrame = 0;
				driftCount = 0;
				driftSide = 1;
				g_sound.Play(SOUND_SQUID);
			}
		}
		else if (!crashed && dir == -1 && !isInGameMenu) {
			if (doubleTap <= 0) {
				doubleTap = 0.2;
			}
			else {
				drifting = true;
				driftFrame = 0;
				driftCount = 0;
				driftSide = -1;
				g_sound.Play(SOUND_SQUID);
			}
		}
	}
	
	this.GetCurrentSpeed = function() {
		return speed;
	}
	
	this.UseNitro = function() {
		if (this.m_nitroCount > 0 && this.m_nitroFuel <= 0) {
			this.m_nitroCount --;
			this.m_nitroFuel = NITRO_DURATION;
			g_sound.Play(SOUND_TURBO);
		}
	}
	
	this.GetChaseSpeed = function () {
		return speed > this.m_topSpeed ? this.m_topSpeed : speed;
	}
	
	this.Reset = function () {
		sideBumpSpeed = 0;
		speed = 0;
		this.m_x = 0;
		crashed = false;
		emp = false;
		flatTire = false;
		this.m_nitroFuel = 0;
	}
	
	this.GetShowingSpeed = function (mph) {
		var result = speed / SPEED_MULTIPLIER;
		if (mph) {
			result *= 0.621371;
		}
		if (result < 0) result = -result;
		return result >> 0;
	}
	
	this.EMP = function() {
		emp = true;
		this.m_nitroFuel = 0;
	}
	
	this.Spike = function() {
		flatTire = true;
		this.m_nitroFuel = 0;
		g_sound.Play(SOUND_ROAD_BLOCK);
	}
	
	this.EatPowerUp = function (type) {
		if (type == POWERUP_NITRO) {
			this.m_nitroCount ++;
			if (this.m_nitroCount > 5) this.m_nitroCount = 5;
		}
		else if (type == POWERUP_MONEY) {
			g_gsResult.AddAchievement (ACHIEVEMENT_RACE, 5000);
		}
		else if (type == POWERUP_DIPLOMATIC) {
			gsAction.DiplomaticImmunity();
		}
		
		if (bonusSoundCooldown <= 0) {
			bonusSoundCooldown = 1;
			g_sound.Play(SOUND_BONUS);
		}
	}
}