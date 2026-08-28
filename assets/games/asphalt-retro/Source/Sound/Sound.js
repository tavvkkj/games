var SOUND_NEWYORK_LOOP 			= "Sounds/m_bgm_new_york_loop.aac";
var SOUND_PARIS_LOOP 			= "Sounds/m_bgm_paris_loop.aac";
var SOUND_TOKYO_LOOP 			= "Sounds/m_bgm_tokyo_loop.aac";
var SOUND_LONDON_LOOP 			= "Sounds/m_bgm_london_loop.aac";
var SOUND_BUSTED_SCREEN 		= "Sounds/m_busted_screen.aac";
var SOUND_CAR_SELECTION_LOOP 	= "Sounds/m_car_selection_loop.aac";
var SOUND_CONGRATULATION 		= "Sounds/m_congradulation.aac";
var SOUND_GAME_OVER 			= "Sounds/m_lose_game_over.aac";
var SOUND_TITLE_LOOP 			= "Sounds/m_title_loop.aac";
var SOUND_TRACK_SELECTION_LOOP 	= "Sounds/m_track_selection_loop.aac";
var SOUND_VICTORY 				= "Sounds/m_victory.aac";

var SOUND_BONUS 				= "Sounds/sfx_bonus.aac";
var SOUND_CHECKPOINT			= "Sounds/sfx_checkpoint.aac";
var SOUND_COPS_LOOP				= "Sounds/sfx_cops.aac";
var SOUND_CRASH					= "Sounds/sfx_crash.aac";
var SOUND_CRIME_INCREASE		= "Sounds/sfx_crime_increase.aac";
var SOUND_EMP_CHARGE			= "Sounds/sfx_emp_charge.aac";
var SOUND_EMP_SHOOT				= "Sounds/sfx_emp_shoot.aac";
var SOUND_HELICOPTER			= "Sounds/sfx_helicopter.aac";
var SOUND_HIT_CONES				= "Sounds/sfx_hit_cones.aac";
var SOUND_HIT_BARRIER			= "Sounds/sfx_hit_wooden_barrier.aac";
var SOUND_IMPACT_GROUND			= "Sounds/sfx_impact_ground.aac";
var SOUND_MENU_BROWSE			= "Sounds/sfx_menu_browse.aac";
var SOUND_MENU_VALID			= "Sounds/sfx_menu_valid.aac";
var SOUND_OFFROAD				= "Sounds/sfx_offroad.aac";
var SOUND_ROAD_BLOCK			= "Sounds/sfx_road_block.aac";
var SOUND_SQUID					= "Sounds/sfx_squid.aac";
var SOUND_TURBO					= "Sounds/sfx_turbo.aac";

var SOUND_VOICE_1				= "Sounds/vo_1.aac";
var SOUND_VOICE_2				= "Sounds/vo_2.aac";
var SOUND_VOICE_3				= "Sounds/vo_3.aac";
var SOUND_VOICE_FINISH			= "Sounds/vo_finnish.aac";
var SOUND_VOICE_GO				= "Sounds/vo_go.aac";

var SOUND_ENGINE				= [];
SOUND_ENGINE[0] 				= "Sounds/sfx_engine_audi_tt.aac";
SOUND_ENGINE[1] 				= "Sounds/sfx_engine_lotus_exige.aac";
SOUND_ENGINE[2] 				= "Sounds/sfx_engine_chevy_corvette.aac";
SOUND_ENGINE[3] 				= "Sounds/sfx_engine_nissan_skyline.aac";
SOUND_ENGINE[4] 				= "Sounds/sfx_engine_tvr_sagaris.aac";
SOUND_ENGINE[5] 				= "Sounds/sfx_engine_lamborghini_gallardo.aac";
SOUND_ENGINE[6] 				= "Sounds/sfx_engine_ford_gt.aac";
SOUND_ENGINE[7] 				= "Sounds/sfx_engine_saleen_s7.aac";



function Sound() {
	var ENGINE_PITCH_INCREASE_SPEED = 1.4;
	
	var audioContext = g_soundManager.GetContext();
	
	var targetEnginePitch = 0.6;
	var enginePitch = 0.6;
	
	//AUDIO_ENABLE = false;
	
	if (AUDIO_ENABLE) {
		g_soundManager.LoadSound (SOUND_NEWYORK_LOOP);
		g_soundManager.LoadSound (SOUND_PARIS_LOOP);
		g_soundManager.LoadSound (SOUND_TOKYO_LOOP);
		g_soundManager.LoadSound (SOUND_LONDON_LOOP);
		g_soundManager.LoadSound (SOUND_BUSTED_SCREEN);
		g_soundManager.LoadSound (SOUND_CAR_SELECTION_LOOP);
		g_soundManager.LoadSound (SOUND_CONGRATULATION);
		g_soundManager.LoadSound (SOUND_GAME_OVER);
		g_soundManager.LoadSound (SOUND_TITLE_LOOP);
		g_soundManager.LoadSound (SOUND_TRACK_SELECTION_LOOP);
		g_soundManager.LoadSound (SOUND_VICTORY);
		
		g_soundManager.LoadSound (SOUND_BONUS);
		g_soundManager.LoadSound (SOUND_CHECKPOINT);
		g_soundManager.LoadSound (SOUND_COPS_LOOP);
		g_soundManager.LoadSound (SOUND_CRASH);
		g_soundManager.LoadSound (SOUND_CRIME_INCREASE);
		g_soundManager.LoadSound (SOUND_EMP_CHARGE);
		g_soundManager.LoadSound (SOUND_EMP_SHOOT);
		g_soundManager.LoadSound (SOUND_HELICOPTER);
		g_soundManager.LoadSound (SOUND_HIT_CONES);
		g_soundManager.LoadSound (SOUND_HIT_BARRIER);
		g_soundManager.LoadSound (SOUND_IMPACT_GROUND);
		g_soundManager.LoadSound (SOUND_MENU_BROWSE);
		g_soundManager.LoadSound (SOUND_MENU_VALID);
		g_soundManager.LoadSound (SOUND_OFFROAD);
		g_soundManager.LoadSound (SOUND_ROAD_BLOCK);
		g_soundManager.LoadSound (SOUND_SQUID);
		g_soundManager.LoadSound (SOUND_TURBO);
		
		g_soundManager.LoadSound (SOUND_VOICE_1);
		g_soundManager.LoadSound (SOUND_VOICE_2);
		g_soundManager.LoadSound (SOUND_VOICE_3);
		g_soundManager.LoadSound (SOUND_VOICE_FINISH);
		g_soundManager.LoadSound (SOUND_VOICE_GO);
		
		for (var i=0; i<SOUND_ENGINE.length; i++) {
			g_soundManager.LoadSound (SOUND_ENGINE[i]);
		}
	}
	
	this.Play = function (path) {
		if (AUDIO_ENABLE) {
			var source = g_soundManager.CreateSource (path);
			g_soundManager.ConnectToSFX (source);
			source.start(0);
		}
	}
	
	
	
	this.Update = function (dt) {
		if (AUDIO_ENABLE) {
			if (enginePitch < targetEnginePitch) {
				enginePitch += dt * ENGINE_PITCH_INCREASE_SPEED;
				if (enginePitch > targetEnginePitch) enginePitch = targetEnginePitch;
			}
			else if (enginePitch > targetEnginePitch) {
				enginePitch -= dt * ENGINE_PITCH_INCREASE_SPEED;
				if (enginePitch < targetEnginePitch) enginePitch = targetEnginePitch;
			}
			engineSource.playbackRate.value = enginePitch;
		}
	}
	
	
	// =============================================================================
	// ENGINE
	// =============================================================================
	var engineSource;
	var engineConnected = false;
	this.InitEngine = function (car) {
		if (AUDIO_ENABLE) {
			engineSource = g_soundManager.CreateSource (SOUND_ENGINE[car]);
			engineSource.loop = true;
			engineSource.loopStart = 0;
			engineSource.loopEnd = engineSource.buffer.duration - 0.12;
			engineSource.start(0);
			
			targetEnginePitch = 0.6;
			enginePitch = 0.6;
		}
	}
	this.PlayEngine = function () {
		if (AUDIO_ENABLE) {
			g_soundManager.ConnectToSFX (engineSource);
			engineConnected = true;
		}
	}
	this.SetEnginePitch = function (amount) {
		if (amount < 0) amount = 0;
		if (amount > 1) amount = 1;
		targetEnginePitch = 0.6 + amount * 1;
	}
	this.StopEngine = function () {
		if (AUDIO_ENABLE && engineConnected) {
			g_soundManager.DisconnectFromSFX (engineSource);
			engineConnected = false;
		}
	}
	// =============================================================================
	
	
	
	
	
	
	
	// =============================================================================
	// ENGINE
	// =============================================================================
	var offRoadSource;
	var offRoadConnected = false;
	this.InitOffRoad = function () {
		if (AUDIO_ENABLE) {
			offRoadSource = g_soundManager.CreateSource (SOUND_OFFROAD);
			offRoadSource.loop = true;
			offRoadSource.loopStart = 0;
			offRoadSource.loopEnd = offRoadSource.buffer.duration - 0.12;
			offRoadSource.start(0);
		}
	}
	this.PlayOffRoad = function () {
		if (AUDIO_ENABLE) {
			g_soundManager.ConnectToSFX (offRoadSource);
			offRoadConnected = true;
		}
	}
	this.StopOffRoad = function () {
		if (AUDIO_ENABLE && offRoadConnected) {
			g_soundManager.DisconnectFromSFX (offRoadSource);
			offRoadConnected = false;
		}
	}
	// =============================================================================
	
	
	
	
	
	
	// =============================================================================
	// TITLE MUSIC
	// =============================================================================
	var titleMusicSource;
	var titleMusicConnected = false;
	this.PlayTitleMusic = function () {
		if (AUDIO_ENABLE) {
			titleMusicSource = g_soundManager.CreateSource (SOUND_TITLE_LOOP);
			titleMusicSource.loop = true;
			titleMusicSource.start(0);
			titleMusicSource.loopStart = 0;
			titleMusicSource.loopEnd = titleMusicSource.buffer.duration - 0.07;
			g_soundManager.ConnectToMusic (titleMusicSource);
			titleMusicConnected = true;
		}
	}
	this.StopTitleMusic = function () {
		if (AUDIO_ENABLE && titleMusicConnected) {
			g_soundManager.DisconnectFromMusic (titleMusicSource);
			titleMusicConnected = false;
		}
	}
	// =============================================================================
	
	
	
	
	
	
	// =============================================================================
	// MAP SELECT MUSIC
	// =============================================================================
	var mapSelectMusicSource;
	var mapSelectMusicConnected = false;
	this.PlayMapSelectMusic = function () {
		if (AUDIO_ENABLE) {
			mapSelectMusicSource = g_soundManager.CreateSource (SOUND_TRACK_SELECTION_LOOP);
			mapSelectMusicSource.loop = true;
			mapSelectMusicSource.start(0);
			mapSelectMusicSource.loopStart = 0;
			mapSelectMusicSource.loopEnd = mapSelectMusicSource.buffer.duration - 0.01;
			g_soundManager.ConnectToMusic (mapSelectMusicSource);
			mapSelectMusicConnected = true;
		}
	}
	this.StopMapSelectMusic = function () {
		if (AUDIO_ENABLE && mapSelectMusicConnected) {
			g_soundManager.DisconnectFromMusic (mapSelectMusicSource);
			mapSelectMusicConnected = false
		}
	}
	// =============================================================================
	
	
	
	
	
	
	
	// =============================================================================
	// CAR SELECT MUSIC
	// =============================================================================
	var carSelectMusicSource;
	var carSelectMusicConnected = false;
	this.PlayCarSelectMusic = function () {
		if (AUDIO_ENABLE) {
			carSelectMusicSource = g_soundManager.CreateSource (SOUND_CAR_SELECTION_LOOP);
			carSelectMusicSource.loop = true;
			carSelectMusicSource.start(0);
			carSelectMusicSource.loopStart = 0;
			carSelectMusicSource.loopEnd = carSelectMusicSource.buffer.duration - 0.007;
			g_soundManager.ConnectToMusic (carSelectMusicSource);
			carSelectMusicConnected = true;
		}
	}
	this.StopCarSelectMusic = function () {
		if (AUDIO_ENABLE && carSelectMusicConnected) {
			g_soundManager.DisconnectFromMusic (carSelectMusicSource);
			carSelectMusicConnected = false;
		}
	}
	// =============================================================================
	
	
	
	
	
	
	
	// =============================================================================
	// IN GAME MUSIC
	// =============================================================================
	var mainMusicSource;
	var mainMusicConnected = false;
	
	this.InitMainMusic = function(map) {
		if (AUDIO_ENABLE) {
			if (map % 4 == 0) {
				mainMusicSource = g_soundManager.CreateSource (SOUND_TOKYO_LOOP);
			}
			else if (map % 4 == 1) {
				mainMusicSource = g_soundManager.CreateSource (SOUND_PARIS_LOOP);
			}
			else if (map % 4 == 2) {
				mainMusicSource = g_soundManager.CreateSource (SOUND_NEWYORK_LOOP);
			}
			else if (map % 4 == 3) {
				mainMusicSource = g_soundManager.CreateSource (SOUND_LONDON_LOOP);
			}
			mainMusicSource.loop = true;
			mainMusicSource.loopStart = 0;
			mainMusicSource.loopEnd = mainMusicSource.buffer.duration - 0.004;
			mainMusicSource.start(0);
		}
	}
	this.PlayMainMusic = function () {
		if (AUDIO_ENABLE) {
			g_soundManager.ConnectToMusic (mainMusicSource);
			mainMusicConnected = true;
		}
	}
	this.StopMainMusic = function () {
		if (AUDIO_ENABLE && mainMusicConnected) {
			g_soundManager.DisconnectFromMusic (mainMusicSource);
			mainMusicConnected = false;
		}
	}
	// =============================================================================
	
	
	
	
	
	// =============================================================================
	// POLICE
	// =============================================================================
	var policeVolume;
	var policeSource;
	var policeConnected = false;
	this.InitPolice = function() {
		if (AUDIO_ENABLE && policeSource == null) {
			policeVolume = audioContext.createGain()
			policeSource = g_soundManager.CreateSource (SOUND_COPS_LOOP);
			policeSource.loop = true;
			policeSource.loopStart = 0;
			policeSource.loopEnd = policeSource.buffer.duration - 0.03;
			policeSource.start(0);
			policeSource.connect(policeVolume);
		}
	}
	this.PlayPolice = function () {
		if (AUDIO_ENABLE) {
			g_soundManager.ConnectToSFX (policeVolume);
			policeConnected = true;
		}
	}
	this.SetPoliceVolume = function (vol) {
		if (AUDIO_ENABLE) {
			if (vol > 1) vol = 1;
			if (vol < 0) vol = 0;
			policeVolume.gain.value = vol;
		}
	}
	this.StopPolice = function () {
		if (AUDIO_ENABLE && policeConnected) {
			g_soundManager.DisconnectFromSFX (policeVolume);
			policeConnected = false;
		}
	}
	// =============================================================================
	
	
	
	
	
	
	
	// =============================================================================
	// HELICOPTER
	// =============================================================================
	var helicopterVolume;
	var helicopterSource;
	var helicopterConnected = false;
	this.InitHelicopter = function() {
		if (AUDIO_ENABLE && helicopterSource == null) {
			helicopterVolume = audioContext.createGain();
			helicopterSource = g_soundManager.CreateSource (SOUND_HELICOPTER);
			helicopterSource.loop = true;
			helicopterSource.loopStart = 0;
			helicopterSource.loopEnd = helicopterSource.buffer.duration - 0.03;
			helicopterSource.start(0);
			helicopterSource.connect(helicopterVolume);
		}
	}
	this.PlayHelicopter = function () {
		if (AUDIO_ENABLE) {
			g_soundManager.ConnectToSFX (helicopterVolume);
			helicopterConnected = true;
		}
	}
	this.SetHelicopterVolume = function (vol) {
		if (AUDIO_ENABLE) {
			if (vol > 1) vol = 1;
			if (vol < 0) vol = 0;
			helicopterVolume.gain.value = vol;
		}
	}
	this.StopHelicopter = function () {
		if (AUDIO_ENABLE && helicopterConnected) {
			g_soundManager.DisconnectFromSFX (helicopterVolume);
			helicopterConnected = false;
		}
	}
	// =============================================================================
	
	
	
	
	
	// =============================================================================
	// RESULT MUSIC
	// =============================================================================
	var resultMusicSource;
	var resultMusicConnected = false;
	this.PlayResultMusic = function () {
		if (AUDIO_ENABLE) {
			resultMusicSource = g_soundManager.CreateSource (SOUND_CONGRATULATION);
			resultMusicSource.start(0);
			g_soundManager.ConnectToMusic (resultMusicSource);
			resultMusicConnected = true;
		}
	}
	this.StopResultMusic = function () {
		if (AUDIO_ENABLE && resultMusicConnected) {
			g_soundManager.DisconnectFromMusic (resultMusicSource);
			resultMusicConnected = false;
		}
	}
	// =============================================================================
}
