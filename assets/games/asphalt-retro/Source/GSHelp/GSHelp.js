function GSHelp () {
	var instance = this;
	var init = false;
	
	var imgBackground 	= g_graphicEngine.LoadImage("Images/GSResult/Background.png");
	
	var page = 0;
	
	this.Init = function () {
		if (init == false) {
			init = true;
		}
	}
	
	this.Update = function (dt) {
		if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1 || g_inputEngine.m_keyPress[KEY.RIGHT] == 1 || g_inputEngine.m_keyPress[KEY.D] == 1) {
			page ++;
			if (page > 4) page = 0;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.LEFT] == 1 || g_inputEngine.m_keyPress[KEY.A] == 1) {
			page --;
			if (page < 0) page = 4;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.ESC] == 1 || g_inputEngine.m_keyPress[KEY.BACKSPACE] == 1) {
			GoToMainMenu(true);
			g_sound.Play(SOUND_MENU_VALID);
		}
	}
	
	this.Draw = function () {
		g_graphicEngine.DrawFast (g_context, imgBackground, 0, 0);
		
		
		if (page == 0) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_1], CANVAS_W * 0.5 + 1, 120 + 1, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_1], CANVAS_W * 0.5, 120, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 255, 221, 187, 1);
		}
		else if (page == 1) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_2], CANVAS_W * 0.5 + 1, 120 + 1, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_2], CANVAS_W * 0.5, 120, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 255, 221, 187, 1);
		}
		else if (page == 2) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_3], CANVAS_W * 0.5 + 1, 120 + 1, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_3], CANVAS_W * 0.5, 120, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 255, 221, 187, 1);
		}
		else if (page == 3) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_4], CANVAS_W * 0.5 + 1, 120 + 1, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_4], CANVAS_W * 0.5, 120, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 255, 221, 187, 1);
		}
		else if (page == 4) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_5], CANVAS_W * 0.5 + 1, 120 + 1, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TUTORIAL_5], CANVAS_W * 0.5, 120, 200, FONT_PRIMARY, 12, false, false, "center", "middle", true, 255, 221, 187, 1);
		}
		
		g_graphicEngine.FillCanvasRGB (g_context, 0, 0, CANVAS_W, 46, 0, 0, 0, 1);
		g_graphicEngine.FillCanvasRGB (g_context, 0, 234, CANVAS_W, 65, 0, 0, 0, 1);
		
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40, CANVAS_H-10, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_NEXT].toUpperCase(), CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_NEXT].toUpperCase(), CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
	}
}