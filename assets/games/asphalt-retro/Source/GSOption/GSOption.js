var g_soundVolume = 0;
var g_speedMPH = 0;

function GSOption () {
	var NUMBER_OF_ITEM = 4;
	
	if (LUDIVERSION) {
		NUMBER_OF_ITEM = 3;
	}
	
	var instance = this;
	var init = false;
	
	var imgBackground 	= g_graphicEngine.LoadImage("Images/GSOption/Background.png");
	var imgMenuItem 	= g_graphicEngine.LoadImage("Images/GSOption/MenuItem.png");
	var imgMenuItemB 	= g_graphicEngine.LoadImage("Images/GSOption/MenuItemB.png");
	var imgLeftArrow 	= g_graphicEngine.LoadImage("Images/GSOption/LeftArrow.png");
	var imgRightArrow 	= g_graphicEngine.LoadImage("Images/GSOption/RightArrow.png");
	
	var menuSelecting = 0;
	
	this.Init = function () {
		if (init == false) {
			init = true;
		}
	}
	
	this.Update = function (dt) {
		if (g_inputEngine.m_keyPress[KEY.UP] == 1 || g_inputEngine.m_keyPress[KEY.W] == 1) {
			menuSelecting --;
			if (menuSelecting < 0) menuSelecting = NUMBER_OF_ITEM-1;
			
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.DOWN] == 1 || g_inputEngine.m_keyPress[KEY.S] == 1) {
			menuSelecting ++;
			if (menuSelecting >= NUMBER_OF_ITEM) menuSelecting = 0;
			
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.LEFT] == 1 || g_inputEngine.m_keyPress[KEY.A] == 1) {
			if (menuSelecting == 0) {
				g_soundVolume--;
				if (g_soundVolume < 0) g_soundVolume = 3;
				g_soundManager.SetVolume(g_soundVolume * 0.33, g_soundVolume * 0.33, g_soundVolume * 0.33);
			}
			else if (menuSelecting == 1) {
				g_speedMPH = 1 - g_speedMPH;
			}
			else if (menuSelecting == 2) {
				g_language --;
				if (g_language < LANGUAGE_GERMAN) g_language = LANGUAGE_ITALIAN;
			}
			
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.RIGHT] == 1 || g_inputEngine.m_keyPress[KEY.D] == 1) {
			if (menuSelecting == 0) {
				g_soundVolume++;
				if (g_soundVolume == 4) g_soundVolume = 0;
				g_soundManager.SetVolume(g_soundVolume * 0.33, g_soundVolume * 0.33, g_soundVolume * 0.33);
			}
			else if (menuSelecting == 1) {
				g_speedMPH = 1 - g_speedMPH;
			}
			else if (menuSelecting == 2) {
				g_language ++;
				if (g_language > LANGUAGE_ITALIAN) g_language = LANGUAGE_GERMAN;
			}
			
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1) {
			if (menuSelecting == 0) {
				g_soundVolume++;
				if (g_soundVolume == 4) g_soundVolume = 0;
			}
			else if (menuSelecting == 1) {
				g_speedMPH = 1 - g_speedMPH;
			}
			else if (menuSelecting == 2) {
				g_language --;
				if (g_language < LANGUAGE_GERMAN) g_language = LANGUAGE_ITALIAN;
			}
			else if (menuSelecting == 3) {
				GoToLegal();
			}
			
			g_sound.Play(SOUND_MENU_VALID);
		}
		else if (g_inputEngine.m_keyPress[KEY.ESC] == 1 || g_inputEngine.m_keyPress[KEY.BACKSPACE] == 1) {
			GoToMainMenu(true);
			g_sound.Play(SOUND_MENU_VALID);
			
			localStorage.language = g_language;
			localStorage.soundVolume = g_soundVolume;
			localStorage.speedMPH = g_speedMPH;
		}
	}
	
	this.Draw = function () {
		g_graphicEngine.DrawFast (g_context, imgBackground, 0, 0);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_OPTIONS],  10 + 2, 16 + 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_OPTIONS],  10, 16, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 255, 85, 0, 1);
		
		for (var i=0; i<NUMBER_OF_ITEM; i++) {
			var x = CANVAS_W * 0.5 - 107;
			var y = 80 + i * 30;
			if (i == menuSelecting) {
				g_graphicEngine.DrawFast (g_context, imgMenuItemB, x, y);
			}
			else {
				g_graphicEngine.DrawFast (g_context, imgMenuItem, x, y);
			}
		}
		
		g_graphicEngine.DrawFast (g_context, imgLeftArrow, CANVAS_W * 0.5 - 5, 80 + 0 * 30 + 6);
		g_graphicEngine.DrawFast (g_context, imgRightArrow, CANVAS_W * 0.5 + 90, 80 + 0 * 30 + 6);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SOUND], CANVAS_W * 0.5 - 94, 80 + 0 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SOUND], CANVAS_W * 0.5 - 96, 80 + 0 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 221, 187, 1);
		
		if (g_soundVolume == 0) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_OFF], CANVAS_W * 0.5 + 48, 80 + 0 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_OFF], CANVAS_W * 0.5 + 46, 80 + 0 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else if (g_soundVolume == 1) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QUIET], CANVAS_W * 0.5 + 48, 80 + 0 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QUIET], CANVAS_W * 0.5 + 46, 80 + 0 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else if (g_soundVolume == 2) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_MEDIUM], CANVAS_W * 0.5 + 48, 80 + 0 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_MEDIUM], CANVAS_W * 0.5 + 46, 80 + 0 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else if (g_soundVolume == 3) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LOUD], CANVAS_W * 0.5 + 48, 80 + 0 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LOUD], CANVAS_W * 0.5 + 46, 80 + 0 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		
		
		
		g_graphicEngine.DrawFast (g_context, imgLeftArrow, CANVAS_W * 0.5 - 5, 80 + 1 * 30 + 6);
		g_graphicEngine.DrawFast (g_context, imgRightArrow, CANVAS_W * 0.5 + 90, 80 + 1 * 30 + 6);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SPEEDOMETER], CANVAS_W * 0.5 - 94, 80 + 1 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SPEEDOMETER], CANVAS_W * 0.5 - 96, 80 + 1 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 221, 187, 1);
		
		if (g_speedMPH == 0) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_KPH], CANVAS_W * 0.5 + 48, 80 + 1 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_KPH], CANVAS_W * 0.5 + 46, 80 + 1 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else if (g_speedMPH == 1) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_MPH], CANVAS_W * 0.5 + 48, 80 + 1 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_MPH], CANVAS_W * 0.5 + 46, 80 + 1 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		
		
		g_graphicEngine.DrawFast (g_context, imgLeftArrow, CANVAS_W * 0.5 - 5, 80 + 2 * 30 + 6);
		g_graphicEngine.DrawFast (g_context, imgRightArrow, CANVAS_W * 0.5 + 90, 80 + 2 * 30 + 6);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LANGUAGE], CANVAS_W * 0.5 - 94, 80 + 2 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LANGUAGE], CANVAS_W * 0.5 - 96, 80 + 2 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CURRENT_LANGUAGE], CANVAS_W * 0.5 + 48, 80 + 2 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CURRENT_LANGUAGE], CANVAS_W * 0.5 + 46, 80 + 2 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		if (!LUDIVERSION) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NOTICE], CANVAS_W * 0.5 + 2, 80 + 3 * 30 + 14, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NOTICE], CANVAS_W * 0.5, 80 + 3 * 30 + 12, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		
		
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40, CANVAS_H-10, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);

		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
	}
}