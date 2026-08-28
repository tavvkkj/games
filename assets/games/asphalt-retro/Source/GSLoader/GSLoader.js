function GSLoader () {
	var STEP_LOAD_SPLASH = 0;
	var STEP_LOAD_ALL_STATE = 1;
	var STEP_DELAY = 2;
	var STEP_LANGUAGE = 3;
	var STEP_CLICK = 4;
	var STEP_FADE_OUT = 5;
	
	var init = false;
	var loadingStep = STEP_LOAD_SPLASH;
	
	
	var delayCounter = 0;
	var blinkCounter = 0;
	var imgLogo 	= g_graphicEngine.LoadImage("Images/GSLoader/Logo.png");
	var imgSplash 	= g_graphicEngine.LoadImage("Images/GSLoader/Background.png");
	
	
	this.Init = function () {
		if (init == false) {
			init = true;
			g_graphicEngine.DrawTextRGB (g_context, "For font loading purpose", -99, -99, 500, FONT_PRIMARY, 13);
			g_language = LANGUAGE_ENGLISH;
		}
		g_inputEngine.LoadOnScreenButton();
		delay = 2;
	}
	
	this.Update = function (dt) {
		if (loadingStep == STEP_LOAD_SPLASH) {
			if (g_graphicEngine.GetLoadingProgress() == 1) {
				loadingStep = STEP_LOAD_ALL_STATE;
				LoadAllState();
				g_inputEngine.StartDrawOnScreenButton();
			}
		}
		else if (loadingStep == STEP_LOAD_ALL_STATE) {
			if (g_graphicEngine.GetLoadingProgress() == 1 && g_soundManager.GetProgress() == 1 && delay <= 0) {
				g_language = localStorage.language;
				g_soundVolume = localStorage.soundVolume;
				g_speedMPH = localStorage.speedMPH;
				if (g_language == null || g_language == "undefined") {
					g_language = LANGUAGE_ENGLISH;
					loadingStep = STEP_LANGUAGE;
					g_tracking.SendLaunchEvent (EVENT_FIRST_LAUNCH);
				}
				else {
					loadingStep = STEP_CLICK;
					g_tracking.SendLaunchEvent (EVENT_LAUNCH);
				}
				
				g_tracking.SendLudiLoginDay();
				g_stateEngine.ForceCheckAdsShowing();
				
				if (g_soundVolume == null || g_soundVolume == "undefined") g_soundVolume = 2;
				if (g_speedMPH == null || g_speedMPH == "undefined") g_speedMPH = 0;
				
				localStorage.language = g_language;
				localStorage.soundVolume = g_soundVolume;
				localStorage.speedMPH = g_speedMPH;
				
				
				g_soundManager.SetVolume(g_soundVolume * 0.33, g_soundVolume * 0.33, g_soundVolume * 0.33);
			}
			delay -= dt;
		}
		else if (loadingStep == STEP_DELAY) {

		}
		else if (loadingStep == STEP_LANGUAGE) {
			if (g_inputEngine.m_keyPress[KEY.UP] == 1 || g_inputEngine.m_keyPress[KEY.W] == 1) {
				g_language --;
				if (g_language < LANGUAGE_GERMAN) g_language = LANGUAGE_ITALIAN;
				g_sound.Play(SOUND_MENU_BROWSE);
			}
			else if (g_inputEngine.m_keyPress[KEY.DOWN] == 1 || g_inputEngine.m_keyPress[KEY.S] == 1) {
				g_language ++;
				if (g_language > LANGUAGE_ITALIAN) g_language = LANGUAGE_GERMAN;
				g_sound.Play(SOUND_MENU_BROWSE);
			}
			
			if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1) {
				loadingStep = STEP_FADE_OUT;
				GoToMainMenu();
				g_sound.Play(SOUND_MENU_VALID);
			}
		}
		else if (loadingStep == STEP_CLICK) {
			blinkCounter += dt * 2;
			if (blinkCounter > 1) blinkCounter -= 1;
			
			if (g_inputEngine.m_mousePress == true || g_inputEngine.m_touchX.length > 0) {
				loadingStep = STEP_FADE_OUT;
				GoToMainMenu();
			}
			
			for (var i=0; i<255; i++) {
				if (g_inputEngine.m_keyState[i] == 1) {
					loadingStep = STEP_FADE_OUT;
					GoToMainMenu();
					break;
				}
			}
		}
	}
	
	this.Draw = function () {
		if (loadingStep == STEP_LOAD_ALL_STATE || loadingStep == STEP_DELAY) {
			g_graphicEngine.FillCanvasRGB (g_context, null, null, null, null, 0, 0, 0, 1);
			g_graphicEngine.DrawFast (g_context, imgLogo, (CANVAS_W - 133) * 0.5, (CANVAS_H - 32) * 0.5);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LOADING], CANVAS_W - 8, CANVAS_H - 20, 240, FONT_PRIMARY, 13, false, false, "right", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LOADING], CANVAS_W - 9, CANVAS_H - 21, 240, FONT_PRIMARY, 13, false, false, "right", "middle", false, 162, 53, 33, 1);
		}
		else if (loadingStep >= STEP_LANGUAGE && loadingStep < STEP_CLICK) {
			g_graphicEngine.FillCanvasRGB (g_context, null, null, null, null, 0, 0, 0, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 0, CANVAS_H * 0.1, CANVAS_W, 2, 75, 12, 3, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 0, CANVAS_H * 0.2, CANVAS_W, 2, 75, 12, 3, 1);
			
			
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SELECT_LANGUAGE], CANVAS_W * 0.5, CANVAS_H * 0.15, 240, FONT_PRIMARY, 12, false, false, "center", "middle", false, 255, 255, 255, 1);
			
			if (g_language == LANGUAGE_GERMAN) {
				g_graphicEngine.DrawTextRGB (g_context, "Deutsch", CANVAS_W * 0.5, CANVAS_H * 0.3, 240, FONT_PRIMARY, 11, false, false, "center", "middle", false, 162, 53, 33, 1);
			}
			else {
				g_graphicEngine.DrawTextRGB (g_context, "Deutsch", CANVAS_W * 0.5, CANVAS_H * 0.3, 240, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 255, 255, 1);
			}
			
			if (g_language == LANGUAGE_ENGLISH) {
				g_graphicEngine.DrawTextRGB (g_context, "English", CANVAS_W * 0.5, CANVAS_H * 0.3 + 20, 240, FONT_PRIMARY, 11, false, false, "center", "middle", false, 162, 53, 33, 1);
			}
			else {
				g_graphicEngine.DrawTextRGB (g_context, "English", CANVAS_W * 0.5, CANVAS_H * 0.3 + 20, 240, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 255, 255, 1);
			}
			
			if (g_language == LANGUAGE_SPANISH) {
				g_graphicEngine.DrawTextRGB (g_context, "Español", CANVAS_W * 0.5, CANVAS_H * 0.3 + 40, 240, FONT_PRIMARY, 11, false, false, "center", "center", false, 162, 53, 33, 1);
			}
			else {
				g_graphicEngine.DrawTextRGB (g_context, "Español", CANVAS_W * 0.5, CANVAS_H * 0.3 + 40, 240, FONT_PRIMARY, 11, false, false, "center", "center", false, 255, 255, 255, 1);
			}
			
			if (g_language == LANGUAGE_FRENCH) {
				g_graphicEngine.DrawTextRGB (g_context, "Français", CANVAS_W * 0.5, CANVAS_H * 0.3 + 60, 240, FONT_PRIMARY, 11, false, false, "center", "center", false, 162, 53, 33, 1);
			}
			else {
				g_graphicEngine.DrawTextRGB (g_context, "Français", CANVAS_W * 0.5, CANVAS_H * 0.3 + 60, 240, FONT_PRIMARY, 11, false, false, "center", "center", false, 255, 255, 255, 1);
			}
			
			if (g_language == LANGUAGE_ITALIAN) {
				g_graphicEngine.DrawTextRGB (g_context, "Italiano", CANVAS_W * 0.5, CANVAS_H * 0.3 + 80, 240, FONT_PRIMARY, 11, false, false, "center", "center", false, 162, 53, 33, 1);
			}
			else {
				g_graphicEngine.DrawTextRGB (g_context, "Italiano", CANVAS_W * 0.5, CANVAS_H * 0.3 + 80, 240, FONT_PRIMARY, 11, false, false, "center", "center", false, 255, 255, 255, 1);
			}
			
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-8, CANVAS_H-12, 100, FONT_PRIMARY, 11, false, false, "right", "center", false, 255, 255, 255, 1);
		}
		else if (loadingStep >= STEP_CLICK) {
			g_graphicEngine.DrawFast (g_context, imgSplash, 0, 0);
			if (blinkCounter > 0.5) {
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_PRESS_ANY_KEY], CANVAS_W * 0.5 + 1, CANVAS_H - 60, 100, FONT_PRIMARY, 10, false, false, "center", "center", false, 128, 64, 0, 1);
				g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_PRESS_ANY_KEY], CANVAS_W * 0.5, CANVAS_H - 61, 100, FONT_PRIMARY, 10, false, false, "center", "center", false, 255, 221, 0, 1);
			}
		}
		
	}
}