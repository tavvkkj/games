function GSMenu () {
	var STEP_FLYING = 0;
	var STEP_SELECTING = 1;
	
	var MENU_SPEED = 1000;
	
	var instance = this;
	var init = false;
	
	var step = STEP_FLYING;
	var select = 0;
	
	var imgBackground 	= g_graphicEngine.LoadImage("Images/GSMenu/Background.png");
	var imgMenuItem 	= g_graphicEngine.LoadImage("Images/GSMenu/MenuItem.png");
	var imgMenuItemB 	= g_graphicEngine.LoadImage("Images/GSMenu/MenuItemB.png");
	
	var offsetX = [];
	for (var i=0; i<5; i++) {
		offsetX[i] = CANVAS_W + i * 40;
	}
	
	
	this.Init = function (skipSound) {
		if (init == false) {
			init = true;
			g_soundManager.ResumeOnMobile();
		}
		
		if (skipSound != true) {
			g_sound.PlayTitleMusic();
		}
		
		step = STEP_FLYING;
		for (var i=0; i<offsetX.length; i++) {
			offsetX[i] = CANVAS_W + i * 40;
		}
		
		g_tracking.SendLudiMainMenu();
	}
	
	this.Update = function (dt) {
		if (step == STEP_FLYING) {
			for (var i=0; i<offsetX.length; i++) {
				offsetX[i] -= dt * MENU_SPEED;
				if (offsetX[i] < CANVAS_W * 0.2) {
					offsetX[i] = CANVAS_W * 0.2;
				}
			}
			if (offsetX[offsetX.length - 1] == CANVAS_W * 0.2) {
				step = STEP_SELECTING;
			}
		}
		else if (step == STEP_SELECTING) {
			if (g_inputEngine.m_keyPress[KEY.UP] == 1 || g_inputEngine.m_keyPress[KEY.W] == 1) {
				select --;
				if (select < 0) select = offsetX.length-1;
				g_sound.Play(SOUND_MENU_BROWSE);
			}
			else if (g_inputEngine.m_keyPress[KEY.DOWN] == 1 || g_inputEngine.m_keyPress[KEY.S] == 1) {
				select ++;
				if (select > offsetX.length-1) select = 0;
				g_sound.Play(SOUND_MENU_BROWSE);
			}
			else if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1) {
				if (select == 0) {
					g_mapSelect = (Math.random() * 8) >> 0;
					g_carSelect = (Math.random() * 8) >> 0;
					g_paintSelect = (Math.random() * 3) >> 0;
					GoToActionPhase();
					g_sound.Play(SOUND_MENU_VALID);
					g_sound.StopTitleMusic();
				}
				else if (select == 1) {
					GoToMapSelect();
					g_sound.Play(SOUND_MENU_VALID);
					g_sound.StopTitleMusic();
				}
				else if (select == 2) {
					GoToOption();
					g_sound.Play(SOUND_MENU_VALID);
				}
				else if (select == 3) {
					GoToHelp();
					g_sound.Play(SOUND_MENU_VALID);
				}
				else if (select == 4) {
					GoToAbout();
					g_sound.Play(SOUND_MENU_VALID);
				}
				//else if (select == 5) {
					//GoToLeaderboard();
					//g_sound.Play(SOUND_MENU_VALID);
				//}
			}
			else if (g_inputEngine.m_keyPress[KEY.BACKSPACE] == 1 && CHEAT == true) {
				localStorage.language = "undefined";
				localStorage.soundVolume = "undefined";
				localStorage.speedMPH = "undefined";
				GoToLoaderState();
				g_sound.StopTitleMusic();
			}
			
			if (CHEAT == true && g_inputEngine.m_keyState[77] == 1) {
				g_stateEngine.ShowAds();
			}
			
			
		}
	}
	
	this.Draw = function () {
		g_graphicEngine.DrawFast (g_context, imgBackground, 0, 0);
		
		
		
		// ========================================================
		
		if (select == 0 && step == STEP_SELECTING) {
			g_graphicEngine.DrawFast (g_context, imgMenuItemB, offsetX[0]+1 - 15, CANVAS_H * 0.5 - 80 - 5);
		}
		else {
			g_graphicEngine.DrawFast (g_context, imgMenuItem, offsetX[0]+1 - 15, CANVAS_H * 0.5 - 80 - 5);
		}
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QUICK_RACE], offsetX[0]+2, CANVAS_H * 0.5 - 72 + 2, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QUICK_RACE], offsetX[0]+0, CANVAS_H * 0.5 - 72, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 255, 221, 187, 1);
		
		// ========================================================
		
		if (select == 1 && step == STEP_SELECTING) {
			g_graphicEngine.DrawFast (g_context, imgMenuItemB, offsetX[1]+1 - 15, CANVAS_H * 0.5 - 50 - 5);
		}
		else {
			g_graphicEngine.DrawFast (g_context, imgMenuItem, offsetX[1]+1 - 15, CANVAS_H * 0.5 - 50 - 5);
		}
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CHALLENGE], offsetX[1]+2, CANVAS_H * 0.5 - 42 + 2, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CHALLENGE], offsetX[1]+0, CANVAS_H * 0.5 - 42, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 255, 221, 187, 1);
		
		// ========================================================
		
		if (select == 2 && step == STEP_SELECTING) {
			g_graphicEngine.DrawFast (g_context, imgMenuItemB, offsetX[2]+1 - 15, CANVAS_H * 0.5 - 20 - 5);
		}
		else {
			g_graphicEngine.DrawFast (g_context, imgMenuItem, offsetX[2]+1 - 15, CANVAS_H * 0.5 - 20 - 5);
		}
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_OPTIONS].toUpperCase(), offsetX[2]+2, CANVAS_H * 0.5 - 12 + 2, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_OPTIONS].toUpperCase(), offsetX[2]+0, CANVAS_H * 0.5 - 12, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 255, 221, 187, 1);
		
		// ========================================================
		
		if (select == 3 && step == STEP_SELECTING) {
			g_graphicEngine.DrawFast (g_context, imgMenuItemB, offsetX[3]+1 - 15, CANVAS_H * 0.5 + 10 - 5);
		}
		else {
			g_graphicEngine.DrawFast (g_context, imgMenuItem, offsetX[3]+1 - 15, CANVAS_H * 0.5 + 10 - 5);
		}
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_HELP], offsetX[3]+2, CANVAS_H * 0.5 + 18 + 2, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_HELP], offsetX[3]+0, CANVAS_H * 0.5 + 18, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 255, 221, 187, 1);
		
		// ========================================================
		
		if (select == 4 && step == STEP_SELECTING) {
			g_graphicEngine.DrawFast (g_context, imgMenuItemB, offsetX[4]+1 - 15, CANVAS_H * 0.5 + 40 - 5);
		}
		else {
			g_graphicEngine.DrawFast (g_context, imgMenuItem, offsetX[4]+1 - 15, CANVAS_H * 0.5 + 40 - 5);
		}
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ABOUT], offsetX[4]+2, CANVAS_H * 0.5 + 48 + 2, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ABOUT], offsetX[4]+0, CANVAS_H * 0.5 + 48, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 255, 221, 187, 1);

		// ========================================================
				
		if (select == 5 && step == STEP_SELECTING) {
			g_graphicEngine.DrawFast (g_context, imgMenuItemB, offsetX[5]+1 - 15, CANVAS_H * 0.5 + 70 - 5);
		}
		else {
			g_graphicEngine.DrawFast (g_context, imgMenuItem, offsetX[5]+1 - 15, CANVAS_H * 0.5 + 70 - 5);
		}
		//g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_TITLE], offsetX[5]+2, CANVAS_H * 0.5 + 78 + 2, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 51, 0, 0, 1);
		//g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_TITLE], offsetX[5]+0, CANVAS_H * 0.5 + 78, 100, FONT_PRIMARY, 13, false, false, "left", "middle", false, 255, 221, 187, 1);

		// ========================================================



		// ========================================================

		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		// ========================================================
		
		
		if (CHEAT == true) {
			g_graphicEngine.DrawTextRGB (g_context, "Cheat version, press BACKSPACE to reset!", 5, CANVAS_H-20, 150, FONT_PRIMARY, 9, false, true, "left", "middle", true, 255, 221, 187, 1);
		}
	}
}


