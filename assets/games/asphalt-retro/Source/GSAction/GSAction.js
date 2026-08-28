function GSAction () {
	var SIGN_FRAME_NUMBER = 3;
	var SIGN_FRAME_LENGTH = 0.2;
	
	var instance = this;
	var init = false;

	this.m_startSequence = 5;
	this.m_screenScale = 0;
	this.m_cameraDepth = 0;
	this.m_cameraX = 0;
	this.m_cameraY = 0;
	this.m_cameraZ = 0;
	this.m_cameraHeight = CAMERA_HEIGHT * 2;
	
	this.m_bulletTimeCount = 0;
	this.m_pauseRadar = false;
	this.m_pauseTimeCount = 0;
	this.m_globalShiftY = 0;
	this.m_wanted = 0;
	this.m_money = 1000;
	this.m_policeCooldown = 0;
	this.m_position = 8;
	this.m_activeEnemy = NUMBER_OF_ENEMY - 1;
	this.m_police = new Police(this);
	this.m_helicopter = new Helicopter(this);
	this.m_enemies = [];
	this.m_tourist = [];
	this.m_spikes = [];
	this.m_powerUps = [];
	this.m_obstacles = [];
	this.m_fragments = [];
	
	this.m_lapShowCount = 0;
	this.m_lap = 0;
	
	this.m_finishedCount = 0;
	
	this.m_score = 0;
	
	var imgWanted = g_graphicEngine.LoadImage("Images/GSAction/UI/Wanted.png");
	var imgDollar = g_graphicEngine.LoadImage("Images/GSAction/UI/Dollar.png");
	var imgDust = g_graphicEngine.LoadImage("Images/GSAction/Effect/Dust.png");
	
	var imgTurnSign = g_graphicEngine.LoadImage("Images/GSAction/UI/TurnSign.png");
	var imgCount = g_graphicEngine.LoadImage("Images/GSAction/UI/CountNumber.png");
	var imgGo = g_graphicEngine.LoadImage("Images/GSAction/UI/Go.png");
	var imgNitro = g_graphicEngine.LoadImage("Images/GSAction/UI/Nitro.png");
	var imgArrow = g_graphicEngine.LoadImage("Images/GSAction/UI/DownArrow.png");
	
	var dust = [];
	
	var timeSpent = 0;
	var signShowing = true;
	var signCounting = 0;
	var spikeSpawnCount = 0;
	
	var immunitySpawned = false;
	var powerUpSpawnCount = 0;
	
	var offRoading = false;
	
	var finalPosition = 0;
	
	var bustedMoney = 0;
	var message = "URBAN HAVOC";
	var messageCount = 0;
	
	
	this.Init = function () {
		if (init == false) {
			init = true;
			this.m_screenScale = CANVAS_H / 480;
			this.m_cameraDepth = 1 / Math.tan((FIELD_OF_VIEW * 0.5) * DEG_TO_RAD);
			g_sound.InitOffRoad();
		}
		
		g_sound.InitEngine(g_carSelect);
		
		this.m_car = new Car(this, g_carData[g_carSelect]);
		this.m_road = new Road(this, g_track[g_mapSelect]);
		this.m_background = new Background(this, g_track[g_mapSelect]);
			
		this.m_background.Init();
		this.m_car.Init();
		this.m_road.Init();
		
		this.m_police = new Police(this);
		this.m_police.Init();
		this.m_helicopter = new Helicopter(this);
		this.m_helicopter.Init();
		
		
		this.m_activeEnemy = NUMBER_OF_ENEMY - 1;
		for (var i=0; i<NUMBER_OF_ENEMY; i++) {
			this.m_enemies[i] = new Enemy (this, i, g_carData[g_carSelect]);
			this.m_enemies[i].m_show = false;
			this.m_enemies[i].m_HP = 100;
		}
		this.m_enemies[this.m_activeEnemy].m_active = true;
		this.m_enemies[this.m_activeEnemy].m_z = DRAW_DISTANCE * SEGMENT_LENGTH;
		
		
		var touristDistance = this.m_road.m_trackLength / NUMBER_OF_TOURIST;
		for (var i=0; i<NUMBER_OF_TOURIST; i++) {
			this.m_tourist[i] = new Tourist (this, i);
			this.m_tourist[i].Spawn ((0.5 + i) * touristDistance);
		}
		
		
		this.m_lap = 1;
		this.m_startSequence = 5;
		this.m_cameraX = 0;
		this.m_cameraY = 0;
		this.m_cameraZ = 0;
		this.m_cameraHeight = CAMERA_HEIGHT * 2;
		this.m_finishedCount = 0;
		this.m_lapShowCount = 0;
		this.m_bulletTimeCount = 0;
		this.m_pauseRadar = false;
		this.m_pauseTimeCount = 0;
		this.m_globalShiftY = 0;
		this.m_wanted = 0;
		//this.m_wanted = WANTED_POLICE;
		//this.m_wanted = WANTED_CHOPPER - 0.001;
		this.m_money = 1000;
		this.m_policeCooldown = 0;
		this.m_position = 8;
		
		
		signShowing = false;
		signCounting = 0;
		powerUpSpawnCount = RandomRange (1, 2) * POWERUP_LATENCY;
		
		for (var i=0; i<this.m_spikes.length; i++) {
			this.m_spikes[i].m_active = false;
		}
		for (var i=0; i<this.m_powerUps.length; i++) {
			this.m_powerUps[i].m_active = false;
		}
		for (var i=0; i<this.m_obstacles.length; i++) {
			this.m_obstacles[i].m_active = false;
		}
		for (var i=0; i<this.m_fragments.length; i++) {
			this.m_fragments[i].m_active = false;
		}
		
		this.m_road.SpawnObstacles();
		
		this.m_score = 0;
		g_gsResult.ResetAchievement();
		
		g_sound.InitMainMusic(g_mapSelect);
		
		timeSpent = 0;
		
		g_tracking.SendLudiActionPhase();
	}
	
	this.Update = function (dt) {
		timeSpent += dt;
		if (this.m_lapShowCount > 0) {
			this.m_lapShowCount -= dt;
		}
		if (this.m_bulletTimeCount > 0) {
			this.m_bulletTimeCount -= dt;
			if (this.m_bulletTimeCount < 0) this.m_bulletTimeCount = 0;
		}
		if (this.m_pauseTimeCount > 0) {
			this.m_pauseTimeCount -= dt;
			if (this.m_pauseTimeCount < 0) {
				this.m_pauseTimeCount = 0;
				this.m_globalShiftY = 0;
				
				if (this.m_pauseRadar == false) {
					this.m_police.Remove();
					this.m_helicopter.Remove();
					this.m_wanted = 0;
					this.m_car.Reset();
					for (var i=0; i<this.m_spikes.length; i++) {
						this.m_spikes[i].m_active = false;
					}
					g_sound.InitMainMusic(g_mapSelect);
					g_sound.PlayMainMusic();
					g_sound.PlayEngine();
				}
			}
		}
		
		if (messageCount > 0) {
			messageCount -= dt;
		}
		
		
		g_sound.Update (dt);
		
		var slowdown = this.m_bulletTimeCount * 0.45;
		if (slowdown > 0.9) slowdown = 0.95;
		dt = (1 - slowdown) * dt;
		
		if (this.m_pauseTimeCount > 0) {
			dt = 0;
		}
		
		this.m_car.Update (dt);
		
		if ((this.m_car.m_z - CAMERA_BEHIND) - this.m_cameraZ > 0) {
			spikeSpawnCount += (this.m_car.m_z - CAMERA_BEHIND) - this.m_cameraZ;
			
			powerUpSpawnCount -= (this.m_car.m_z - CAMERA_BEHIND) - this.m_cameraZ;
			if (powerUpSpawnCount <= 0) {
				powerUpSpawnCount += RandomRange (1, 1.5) * POWERUP_LATENCY;
				this.FindWhichPowerUpToSpawn();
			}
		}
		
		this.m_cameraZ = this.m_car.m_z - CAMERA_BEHIND;
		if (this.m_cameraZ > this.m_road.m_trackLength) this.m_cameraZ -= this.m_road.m_trackLength;
		if (this.m_cameraZ < 0) this.m_cameraZ += this.m_road.m_trackLength;
		
		var cameraPercent = (this.m_cameraZ % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		var baseSegment   = this.m_road.FindSegment(this.m_cameraZ);
		var playerPercent = (this.m_car.m_z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		var playerSegment = this.m_road.FindSegment(this.m_car.m_z)
		
		this.m_cameraX = this.m_car.m_x;
		
		if (this.m_cameraHeight > CAMERA_HEIGHT) {
			this.m_cameraHeight -= dt * 200;
			if (this.m_cameraHeight < CAMERA_HEIGHT) {
				this.m_cameraHeight = CAMERA_HEIGHT;
			}
		}
		this.m_cameraY = (Interpolate(baseSegment.p1.world.y, baseSegment.p2.world.y, cameraPercent) + this.m_car.m_y) * 0.5 + this.m_cameraHeight;
		
		this.m_background.UpdateOffset (playerSegment.curve * this.m_car.GetSpeedPercent() * dt, baseSegment.angle);
		
		
		if (this.m_startSequence > 0) {
			if (this.m_startSequence >= 4 && this.m_startSequence - dt <= 4) {
				g_sound.Play(SOUND_VOICE_3);
				g_sound.PlayMainMusic();
			}
			else if (this.m_startSequence >= 3 && this.m_startSequence - dt <= 3) {
				g_sound.Play(SOUND_VOICE_2);
			}
			else if (this.m_startSequence >= 2 && this.m_startSequence - dt <= 2) {
				g_sound.Play(SOUND_VOICE_1);
			}
			else if (this.m_startSequence >= 1 && this.m_startSequence - dt <= 1) {
				g_sound.Play(SOUND_VOICE_GO);
			}
			
			this.m_startSequence -= dt;
			if (this.m_startSequence < 0) {
				this.m_startSequence = 0;
				this.ShowLap();
			}
		}
		
		if (this.m_policeCooldown > 0) {
			this.m_policeCooldown -= dt;
		}
		
		if (this.m_wanted >= WANTED_SPIKE) {
			if (spikeSpawnCount > SPIKE_SPAWN_INTERVAL) {
				this.SpawnSpike();
				spikeSpawnCount = 0;
			}
		}
		else if (this.m_wanted > WANTED_CHOPPER && this.m_helicopter.m_active == false) {
			this.m_helicopter.Spawn();
		}
		else if (this.m_wanted > WANTED_POLICE && this.m_wanted <= WANTED_CHOPPER && this.m_police.m_active == false && this.m_policeCooldown <= 0) {
			this.m_police.Spawn (Math.random() * 1 - 0.5, this.m_car.m_z - DRAW_DISTANCE * SEGMENT_LENGTH * 0.5);
		}
		
		
		for (var i=0; i<this.m_spikes.length; i++) {
			this.m_spikes[i].Update (dt);
		}
		for (var i=0; i<this.m_powerUps.length; i++) {
			this.m_powerUps[i].Update (dt);
		}
		for (var i=0; i<this.m_fragments.length; i++) {
			this.m_fragments[i].Update (dt);
		}
		
		
		
		
		
		this.m_police.Update (dt);
		this.m_helicopter.Update (dt);
		
		for (var i=0; i<this.m_enemies.length; i++) {
			this.m_enemies[i].Update(dt);
		}
		
		for (var i=0; i<NUMBER_OF_TOURIST; i++) {
			this.m_tourist[i].Update(dt);
		}
		
		for (var i=0; i<dust.length; i++) {
			dust[i].Update(dt);
		}
		
		signCounting += dt;
		if (signCounting > SIGN_FRAME_LENGTH * SIGN_FRAME_NUMBER) {
			signCounting = 0;
		}
		
		if (this.m_finishedCount > 0) {
			this.m_finishedCount -= dt;
			if (this.m_finishedCount <= 0) {
				this.m_police.StopSound();
				this.m_helicopter.StopSound();
				g_sound.StopEngine();
				if (finalPosition <= 3) {
					g_tracking.SendRaceEvent (g_carSelect, g_paintSelect, g_mapSelect, EVENT_WIN, this.m_score, timeSpent);
					GoToResult();
				}
				else {
					g_tracking.SendRaceEvent (g_carSelect, g_paintSelect, g_mapSelect, EVENT_LOSE, this.m_score, timeSpent);
					GoToMainMenu();
				}
				this.StopOffRoadSound();
				this.m_car = null;
			}
		}
		
		
		if (g_inputEngine.m_keyState[KEY.BACKSPACE] == 1 || g_inputEngine.m_keyState[KEY.ESC] == 1) {
			this.m_police.StopSound();
			this.m_helicopter.StopSound();
			if (offRoading) {
				g_sound.StopOffRoad();
			}
			g_sound.StopEngine();
			PushInGameMenu();
		}
		
	}
	
	this.Draw = function () {
		g_graphicEngine.FillCanvasRGB (g_context, null, null, null, null, g_track[g_mapSelect].m_skyColor[0], g_track[g_mapSelect].m_skyColor[1], g_track[g_mapSelect].m_skyColor[2], 1);
		
		
		this.m_background.Draw();
		this.m_road.Draw();
		
		if (this.m_startSequence < 4 && this.m_startSequence >= 3.2) {
			g_graphicEngine.Draw (g_context, imgCount, 0, 0, 56, 92, CANVAS_W * 0.5 - 21, CANVAS_H * 0.25, 56, 92);
		}
		else if (this.m_startSequence < 3 && this.m_startSequence >= 2.2) {
			g_graphicEngine.Draw (g_context, imgCount, 56, 0, 56, 92, CANVAS_W * 0.5 - 21, CANVAS_H * 0.25, 56, 92);
		}
		else if (this.m_startSequence < 2 && this.m_startSequence >= 1.2) {
			g_graphicEngine.Draw (g_context, imgCount, 56 * 2, 0, 56, 92, CANVAS_W * 0.5 - 21, CANVAS_H * 0.25, 56, 92);
		}
		else if (this.m_startSequence < 1 && this.m_startSequence > 0) {
			g_graphicEngine.Draw (g_context, imgGo, 0, 0, 164, 92, CANVAS_W * 0.5 - 61, CANVAS_H * 0.25, 164, 92);
		}
		
		this.DrawDust();
		
		// UI drawing
		
		if (this.m_pauseTimeCount > 0) {
			g_graphicEngine.FillCanvasRGB (g_context, 0, 0, CANVAS_W, CANVAS_H * 0.25, 0, 0, 0, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 0, CANVAS_H * 0.75, CANVAS_W, CANVAS_H * 0.25, 0, 0, 0, 1);
			
			g_graphicEngine.DrawRectRGB (g_context, 0, CANVAS_H * 0.25, CANVAS_W, CANVAS_H * 0.5, 2, 255, 255, 255, 1);
			
			if (this.m_pauseRadar == false) {
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BUSTED], CANVAS_W * 0.5 + 2, CANVAS_H * 0.12 + 8, 150, FONT_PRIMARY, 14, false, false, "center", "center", false, 51, 0, 0, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BUSTED], CANVAS_W * 0.5, CANVAS_H * 0.12 + 6, 150, FONT_PRIMARY, 14, false, false, "center", "center", false, 255, 221, 187, 1);
				
				g_graphicEngine.DrawTextRGB (g_context, "- $" + bustedMoney, CANVAS_W * 0.5 + 2, CANVAS_H * 0.8 + 8, 150, FONT_PRIMARY, 14, false, false, "center", "center", false, 38, 30, 0, 1);
				g_graphicEngine.DrawTextRGB (g_context, "- $" + bustedMoney, CANVAS_W * 0.5, CANVAS_H * 0.8 + 6, 150, FONT_PRIMARY, 14, false, false, "center", "center", false, 225, 204, 0, 1);
				
				
			}
		}
		else {
			if (this.m_enemies[this.m_activeEnemy]) {
				this.m_enemies[this.m_activeEnemy].DrawHP();
			}
			
			this.m_police.DrawHP();
			
			var playerSegment = this.m_road.FindSegment(this.m_car.m_z);
			if (playerSegment.sign != null) {
				if (signShowing == false) {
					signCounting = 0;
				}
				signShowing = true;
				var frame = (signCounting / SIGN_FRAME_LENGTH) >> 0;
				if (playerSegment.sign == SIGN_TURN_LEFT) {
					g_graphicEngine.Draw (g_context, imgTurnSign, 0, frame * 22, 37, 22, CANVAS_W * 0.5 - 37, CANVAS_H * 0.25, 74, 44);
				}
				else if (playerSegment.sign == SIGN_TURN_RIGHT) {
					g_graphicEngine.Draw (g_context, imgTurnSign, 37, frame * 22, 37, 22, CANVAS_W * 0.5 - 37, CANVAS_H * 0.25, 74, 44);
				}
				
			}
			else {
				signShowing = false;
			}
		
			g_graphicEngine.FillCanvasRGB (g_context, 0, 0, CANVAS_W, CANVAS_H * 0.1, 0, 0, 0, 1);
			
			for (var i=0; i<5; i++) {
				if (this.m_wanted >= (i+1) * 0.2) {
					g_graphicEngine.Draw (g_context, imgWanted, 16, 0, 16, 17, CANVAS_W * 0.5 + (i - 2.5) * 18, 1, 16, 17);
				}
				else {
					g_graphicEngine.Draw (g_context, imgWanted, 0, 0, 16, 17, CANVAS_W * 0.5 + (i - 2.5) * 18, 1, 16, 17);
				}
			}
			
			
			if (this.m_finishedCount > 0) {
				g_graphicEngine.DrawTextRGB (g_context, finalPosition, 28, 20, 50, FONT_PRIMARY, 33, false, false, "right", "middle", false, 17, 136, 153, 1);
				g_graphicEngine.DrawTextRGB (g_context, finalPosition, 26, 20, 50, FONT_PRIMARY, 33, false, false, "right", "middle", false, 136, 255, 238, 1);
			}
			else {
				g_graphicEngine.DrawTextRGB (g_context, this.m_position, 28, 20, 50, FONT_PRIMARY, 33, false, false, "right", "middle", false, 17, 136, 153, 1);
				g_graphicEngine.DrawTextRGB (g_context, this.m_position, 26, 20, 50, FONT_PRIMARY, 33, false, false, "right", "middle", false, 136, 255, 238, 1);
			}
			
			var showPos = (this.m_finishedCount > 0) ? finalPosition : this.m_position;
			
			if (showPos == 1) {
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_1], 32, 10, 50, FONT_PRIMARY, 10, false, false, "left", "middle", false, 17, 136, 153, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_1], 30, 9, 50, FONT_PRIMARY, 10, false, false, "left", "middle", false, 136, 255, 238, 1);
			}
			else if (showPos == 2) {
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_2], 32, 10, 50, FONT_PRIMARY, 10, false, false, "left", "middle", false, 17, 136, 153, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_2], 30, 9, 50, FONT_PRIMARY, 10, false, false, "left", "middle", false, 136, 255, 238, 1);
			}
			else if (showPos == 3) {
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_3], 32, 10, 50, FONT_PRIMARY, 10, false, false, "left", "middle", false, 17, 136, 153, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_3], 30, 9, 50, FONT_PRIMARY, 10, false, false, "left", "middle", false, 136, 255, 238, 1);
			}
			else {
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_4], 32, 10, 50, FONT_PRIMARY, 10, false, false, "left", "middle", false, 17, 136, 153, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_POS_4], 30, 9, 50, FONT_PRIMARY, 10, false, false, "left", "middle", false, 136, 255, 238, 1);
			}
			
			g_graphicEngine.DrawTextRGB (g_context, "/ " + (this.m_enemies.length + 1), 32, 25, 50, FONT_PRIMARY, 12, false, false, "left", "middle", false, 17, 136, 153, 1);
			g_graphicEngine.DrawTextRGB (g_context, "/ " + (this.m_enemies.length + 1), 30, 24, 50, FONT_PRIMARY, 12, false, false, "left", "middle", false, 136, 255, 238, 1);
			
			
			g_graphicEngine.DrawTextRGB (g_context, "$ " + this.m_score + " $", CANVAS_W * 0.5 + 1, 26, 50, FONT_PRIMARY, 12, false, false, "center", "middle", false, 255, 153, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "$ " + this.m_score + " $", CANVAS_W * 0.5, 26, 50, FONT_PRIMARY, 12, false, false, "center", "middle", false, 255, 204, 0, 1);
			
			
			
			var lapShowing = this.m_lap >> 0;
			if (lapShowing > 3) lapShowing = 3;
			
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LAP], CANVAS_W - 3, 7, 50, FONT_PRIMARY, 9, true, false, "right", "middle", false, 255, 255, 255, 1);
			g_graphicEngine.DrawTextRGB (g_context, lapShowing, CANVAS_W - 22, 23, 50, FONT_PRIMARY, 16, false, false, "right", "middle", false, 17, 136, 153, 1);
			g_graphicEngine.DrawTextRGB (g_context, lapShowing, CANVAS_W - 22, 23, 50, FONT_PRIMARY, 16, false, false, "right", "middle", false, 136, 255, 238, 1);
			g_graphicEngine.DrawTextRGB (g_context, "/ " + NUMBER_OF_LAP, CANVAS_W - 17, 25, 50, FONT_PRIMARY, 8, false, false, "left", "middle", false, 17, 136, 153, 1);
			g_graphicEngine.DrawTextRGB (g_context, "/ " + NUMBER_OF_LAP, CANVAS_W - 17, 25, 50, FONT_PRIMARY, 8, false, false, "left", "middle", false, 136, 255, 238, 1);
			
			
			if (messageCount > 0) {
				g_graphicEngine.DrawTextRGB (g_context, message, CANVAS_W * 0.5 + 1, CANVAS_H * 0.1 + 10, 240, FONT_PRIMARY, 11, false, false, "center", "middle", false, 192, 192, 192, 1);
				g_graphicEngine.DrawTextRGB (g_context, message, CANVAS_W * 0.5, CANVAS_H * 0.1 + 10, 240, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 255, 255, 1);
			}
			
			
			
			g_graphicEngine.FillCanvasRGB (g_context, 0, CANVAS_H * 0.9, CANVAS_W, CANVAS_H * 0.1, 0, 0, 0, 1);
			for (var i=0; i<NITRO_MAX; i++) {
				if (this.m_car.m_nitroFuel > 0 && i == this.m_car.m_nitroCount) {
					if (Math.sin(this.m_car.m_nitroFuel * 70) > 0) {
						g_graphicEngine.Draw (g_context, imgNitro, 16, 0, 8, 23, 9 + i * 20, CANVAS_H * 0.9 + 4, 10, 25);
					}
					else {
						g_graphicEngine.Draw (g_context, imgNitro, 8, 0, 8, 23, 10 + i * 20, CANVAS_H * 0.9 + 5, 8, 23);
					}
				}
				else if (i > this.m_car.m_nitroCount - 1) {
					g_graphicEngine.Draw (g_context, imgNitro, 0, 0, 8, 23, 10 + i * 20, CANVAS_H * 0.9 + 5, 8, 23);
				}
				else {
					g_graphicEngine.Draw (g_context, imgNitro, 8, 0, 8, 23, 10 + i * 20, CANVAS_H * 0.9 + 5, 8, 23);
				}
			}
			
			
			g_graphicEngine.DrawFast (g_context, imgArrow, CANVAS_W-20, CANVAS_H-15);
			g_graphicEngine.DrawTextRGB (g_context, this.m_car.GetShowingSpeed(g_speedMPH == 1), CANVAS_W - 35, CANVAS_H - 16, 50, FONT_PRIMARY, 20, true, false, "right", "middle", false, 136, 255, 238, 1);
			if (g_speedMPH == 1) {
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_MPH], CANVAS_W - 4, CANVAS_H - 21, 50, FONT_PRIMARY, 8, true, false, "right", "middle", false, 255, 255, 255, 1);
			}
			else {
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_KPH], CANVAS_W - 4, CANVAS_H - 21, 50, FONT_PRIMARY, 8, true, false, "right", "middle", false, 255, 255, 255, 1);
			}
			
			
			
			if (this.m_lapShowCount > 0) {
				if (this.m_lap > 3) {
					g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_FINISH], CANVAS_W * 0.5 + 1, 71, 50, FONT_PRIMARY, 15, false, false, "center", "middle", false, 96, 72, 0, 1);
					g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_FINISH], CANVAS_W * 0.5, 70, 50, FONT_PRIMARY, 15, false, false, "center", "middle", false, 255, 191, 0, 1);
				}
				else if (this.m_lap > 2) {
					g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_FINAL_LAP], CANVAS_W * 0.5 + 1, 71, 50, FONT_PRIMARY, 15, false, false, "center", "middle", false, 96, 72, 0, 1);
					g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_FINAL_LAP], CANVAS_W * 0.5, 70, 50, FONT_PRIMARY, 15, false, false, "center", "middle", false, 255, 191, 0, 1);
				}
				else if (this.m_lap > 1) {
					g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_2_LAPS], CANVAS_W * 0.5 + 1, 71, 50, FONT_PRIMARY, 15, false, false, "center", "middle", false, 96, 72, 0, 1);
					g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_2_LAPS], CANVAS_W * 0.5, 70, 50, FONT_PRIMARY, 15, false, false, "center", "middle", false, 255, 191, 0, 1);
				}
			}
		}
	}
	
	
	this.MovePosition = function (amount) {
		this.m_position += amount;
	}
	
	this.ChangeActiveEnemy = function (index) {
		for (var i=0; i<this.m_enemies.length; i++) {
			this.m_enemies[i].m_active = false;
		}
		
		this.m_activeEnemy += index;
		
		if (this.m_activeEnemy < 0) {
			this.m_activeEnemy = 0;
		}
		else if (this.m_activeEnemy > this.m_enemies.length-1) {
			this.m_activeEnemy = this.m_enemies.length-1;
		}
		else {
			if (index > 0) {
				this.m_enemies[this.m_activeEnemy].m_z = this.m_car.m_z - DRAW_DISTANCE * SEGMENT_LENGTH * 0.45;
			}
			else if (index < 0) {
				this.m_enemies[this.m_activeEnemy].m_z = this.m_car.m_z + DRAW_DISTANCE * SEGMENT_LENGTH;
			}
		}
		this.m_enemies[this.m_activeEnemy].m_active = true;
	}
	
	this.AddDust = function (x, y) {
		var choose;
		for (var i=0; i<dust.length; i++) {
			if (dust[i].m_live == false) {
				choose = dust[i];
				break;
			}
		}
		if (choose == null) {
			choose = new Particle ("Images/GSAction/Effect/Dust.png", 20, 5, 20);
			dust.push (choose);
		}
		choose.Spawn (x, y);
	}
	
	this.DrawDust = function() {
		for (var i=0; i<dust.length; i++) {
			dust[i].Draw();
		}
	}
	
	this.AddWanted = function (amount) {
		for (var i=0; i<5; i++) {
			if (this.m_wanted < (i+1) * 0.2 && this.m_wanted + amount >= (i+1) * 0.2) {
				g_sound.Play(SOUND_CRIME_INCREASE);
			}
		}
		
		this.m_wanted += amount;
		if (this.m_wanted > 1) this.m_wanted = 1;
		if (this.m_wanted < 0) this.m_wanted = 0;
	}
	
	this.BulletTime = function () {
		this.m_bulletTimeCount = 3;
	}
	
	this.ShowLap = function () {
		this.m_lapShowCount = 3;
		if (this.m_lap > NUMBER_OF_LAP) {
			this.m_finishedCount = 5;
			g_sound.StopMainMusic();
			
			g_sound.Play(SOUND_VOICE_FINISH);
			if (this.m_position <= 3) {
				g_sound.Play(SOUND_VICTORY);
			}
			else {
				g_sound.Play(SOUND_GAME_OVER);
			}
			this.StopOffRoadSound();
			
			finalPosition = this.m_position;
			
			if (finalPosition <= 1) {
				g_gsResult.AddAchievement (ACHIEVEMENT_RACE, SCORE_POSITION_1);
			}
			else if (finalPosition <= 2) {
				g_gsResult.AddAchievement (ACHIEVEMENT_RACE, SCORE_POSITION_2);
			}
			else if (finalPosition <= 3) {
				g_gsResult.AddAchievement (ACHIEVEMENT_RACE, SCORE_POSITION_3);
			}
		}
		else {
			immunitySpawned = false;
			if (this.m_lap > 1) {
				g_sound.Play(SOUND_CHECKPOINT);
			}
		}
	}
	
	this.Busted = function () {
		this.m_pauseRadar = false;
		this.m_pauseTimeCount = 4;
		this.m_globalShiftY = -CANVAS_H * 0.15;
		g_sound.StopMainMusic();
		g_sound.StopEngine();
		g_sound.Play(SOUND_BUSTED_SCREEN);
		
		this.m_police.StopSound();
		this.m_helicopter.StopSound();
		
		bustedMoney = this.m_score * 0.5;
		g_gsResult.AddAchievement (ACHIEVEMENT_RACE, -bustedMoney);
	}
	
	this.SpawnSpike = function () {
		var choose = null;
		for (var i=0; i<this.m_spikes.length; i++) {
			if (this.m_spikes[i].m_active == false) {
				choose = this.m_spikes[i];
			}
		}
		
		if (choose == null) {
			choose = new RoadSpike (this);
			this.m_spikes.push (choose);
		}
		
		var spawnZ = this.m_car.m_z + DRAW_DISTANCE * SEGMENT_LENGTH;
		if (spawnZ > this.m_road.m_trackLength) spawnZ -= this.m_road.m_trackLength;
		choose.Spawn (spawnZ);
	}
	
	this.FindWhichPowerUpToSpawn = function () {
		var spawnX = RandomRange (-0.8, 0.8);
		var spawnZ = this.m_car.m_z + DRAW_DISTANCE * SEGMENT_LENGTH;
		if (spawnZ > this.m_road.m_trackLength) spawnZ -= this.m_road.m_trackLength;
		
		if (this.m_wanted > WANTED_POLICE && immunitySpawned == false && this.m_car.m_z > this.m_road.m_trackLength * 0.4) {
			immunitySpawned = true;
			this.SpawnPowerUp (POWERUP_DIPLOMATIC, spawnX, spawnZ);
		}
		else {
			if (Math.random() > 0.2) {
				for (var i=0; i<3; i++) {
					this.SpawnPowerUp (POWERUP_NITRO, spawnX, spawnZ);
					spawnZ += SEGMENT_LENGTH * 3;
					if (spawnZ > this.m_road.m_trackLength) spawnZ -= this.m_road.m_trackLength;
				}
			}
			else {
				this.SpawnPowerUp (POWERUP_MONEY, spawnX, spawnZ);
			}
		}
	}
	
	this.SpawnPowerUp = function (type, x, z) {
		var choose = null;
		for (var i=0; i<this.m_powerUps.length; i++) {
			if (this.m_powerUps[i].m_active == false) {
				choose = this.m_powerUps[i];
			}
		}
		
		if (choose == null) {
			choose = new PowerUp (this);
			this.m_powerUps.push (choose);
		}
		
		choose.Spawn (type, x, z);
	}
	
	this.DiplomaticImmunity = function () {
		this.m_wanted = 0;
	}
	
	this.SpawnObstacle = function (type, x, z) {
		var tempObs = new Obstacle (this);
		tempObs.Spawn (type, x, z);
		this.m_obstacles.push (tempObs);
	}
	
	
	this.SpawnFragment = function (type, frag, x, z, speed) {
		var choose = null;
		for (var i=0; i<this.m_fragments.length; i++) {
			if (this.m_fragments[i].m_active == false) {
				choose = this.m_fragments[i];
			}
		}
		
		if (choose == null) {
			choose = new Fragment (this);
			this.m_fragments.push (choose);
		}
		
		choose.Spawn (type, frag, x, z, speed);
	}
	
	
	
	
	this.PlayOffRoadSound = function () {
		if (!offRoading) {
			g_sound.PlayOffRoad();
			offRoading = true;
		}
	}
	
	this.StopOffRoadSound = function () {
		if (offRoading) {
			g_sound.StopOffRoad();
			offRoading = false;
		}
	}
	
	this.ShowMessage = function (mess) {
		message = mess;
		messageCount = 3;
	}
	
	
	this.Resume = function () {
		this.m_police.ResumeSound();
		this.m_helicopter.ResumeSound();
		if (offRoading) {
			g_sound.PlayOffRoad();
		}
		g_sound.PlayEngine();
	}
	
	this.Restart = function () {
		g_sound.StopMainMusic();
		GoToActionPhase();
		//g_stateEngine.ShowAds();
	}
	this.Quit = function () {
		this.m_car = null;
		g_sound.StopMainMusic();
		g_tracking.SendRaceEvent (g_carSelect, g_paintSelect, g_mapSelect, EVENT_QUIT, this.m_score, timeSpent);
		GoToMainMenu();
		g_stateEngine.ShowAds(true);
	}
}