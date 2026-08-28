function GSLegal () {
	var NUMBER_OF_ITEM = 3;
	
	var instance = this;
	var init = false;
	
	var imgBackground 	= g_graphicEngine.LoadImage("Images/GSResult/Background.png");
	
	var menuSelecting = 0;
	
	this.Init = function () {
		if (init == false) {
			init = true;
		}
	}
	
	this.Update = function (dt) {
		if (g_inputEngine.m_keyPress[KEY.LEFT] == 1 || g_inputEngine.m_keyPress[KEY.A] == 1) {
			menuSelecting --;
			if (menuSelecting < 0) menuSelecting = NUMBER_OF_ITEM-1;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.RIGHT] == 1 || g_inputEngine.m_keyPress[KEY.D] == 1) {
			menuSelecting ++;
			if (menuSelecting >= NUMBER_OF_ITEM) menuSelecting = 0;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1) {
			menuSelecting ++;
			if (menuSelecting >= NUMBER_OF_ITEM) menuSelecting = 0;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.ESC] == 1 || g_inputEngine.m_keyPress[KEY.BACKSPACE] == 1) {
			GoToOption();
			g_sound.Play(SOUND_MENU_VALID);
		}
	}
	
	this.Draw = function () {
		g_graphicEngine.DrawFast (g_context, imgBackground, 0, 0);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NOTICE],  CANVAS_W * 0.5 + 2, 24 + 2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NOTICE],  CANVAS_W * 0.5, 24, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		
		if (menuSelecting == 0) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NAME_1],  CANVAS_W * 0.5 + 1, 66 + 1, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 0, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NAME_1],  CANVAS_W * 0.5, 66, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 204, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_CONTENT_1],  CANVAS_W * 0.5 + 1, 96 + 1, 220, FONT_PRIMARY, 11, false, false, "center", "center", true, 0, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_CONTENT_1],  CANVAS_W * 0.5, 96, 220, FONT_PRIMARY, 11, false, false, "center", "center", true, 255, 85, 0, 1);
		}
		else if (menuSelecting == 1) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NAME_2],  CANVAS_W * 0.5 + 1, 66 + 1, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 0, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NAME_2],  CANVAS_W * 0.5, 66, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 204, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_CONTENT_2],  CANVAS_W * 0.5 + 1, 96 + 1, 220, FONT_PRIMARY, 11, false, false, "center", "center", true, 0, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_CONTENT_2],  CANVAS_W * 0.5, 96, 220, FONT_PRIMARY, 11, false, false, "center", "center", true, 255, 85, 0, 1);
		}
		else if (menuSelecting == 2) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NAME_3],  CANVAS_W * 0.5 + 1, 66 + 1, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 0, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_NAME_3],  CANVAS_W * 0.5, 66, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 204, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_CONTENT_3],  CANVAS_W * 0.5 + 1, 96 + 1, 220, FONT_PRIMARY, 11, false, false, "center", "center", true, 0, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEGAL_CONTENT_3],  CANVAS_W * 0.5, 96, 220, FONT_PRIMARY, 11, false, false, "center", "center", true, 255, 85, 0, 1);
		}
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40, CANVAS_H-10, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);

		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_NEXT].toUpperCase(), CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_NEXT].toUpperCase(), CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
	}
}