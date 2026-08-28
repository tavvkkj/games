function GSInGameMenu () {
	var LINE_HEIGHT = 22;
	var instance = this;
	var init = false;
	
	var selecting = 0;
	
	this.Init = function () {
		if (init == false) {
			init = true;
		}
	}
	
	this.Update = function (dt) {
		if (g_inputEngine.m_keyPress[KEY.UP] == 1 || g_inputEngine.m_keyPress[KEY.W] == 1) {
			selecting --;
			if (selecting < 0) selecting = 3;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.DOWN] == 1 || g_inputEngine.m_keyPress[KEY.S] == 1) {
			selecting ++;
			if (selecting > 3) selecting = 0;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		
		if (selecting == 2) {
			if (g_inputEngine.m_keyPress[KEY.LEFT] == 1 || g_inputEngine.m_keyPress[KEY.A] == 1) {
				g_soundVolume--;
				if (g_soundVolume < 0) g_soundVolume = 3;
				g_soundManager.SetVolume(g_soundVolume * 0.33, g_soundVolume * 0.33, g_soundVolume * 0.33);
				localStorage.soundVolume = g_soundVolume;
				g_sound.Play(SOUND_MENU_BROWSE);
			}
			else if (g_inputEngine.m_keyPress[KEY.RIGHT] == 1 || g_inputEngine.m_keyPress[KEY.D] == 1) {
				g_soundVolume++;
				if (g_soundVolume == 4) g_soundVolume = 0;
				g_soundManager.SetVolume(g_soundVolume * 0.33, g_soundVolume * 0.33, g_soundVolume * 0.33);
				localStorage.soundVolume = g_soundVolume;
				g_sound.Play(SOUND_MENU_BROWSE);
			}
		}
		
		if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1) {
			if (selecting == 0) {
				PopState();
				g_gsAction.Resume();
				g_sound.Play(SOUND_MENU_VALID);
			}
			else if (selecting == 1) {
				PopState();
				g_gsAction.Restart();
				g_sound.Play(SOUND_MENU_VALID);
			}
			else if (selecting == 2) {
				g_soundVolume++;
				if (g_soundVolume == 4) g_soundVolume = 0;
				g_soundManager.SetVolume(g_soundVolume * 0.33, g_soundVolume * 0.33, g_soundVolume * 0.33);
				localStorage.soundVolume = g_soundVolume;
				g_sound.Play(SOUND_MENU_BROWSE);
			}
			else if (selecting == 3) {
				PopState();
				g_gsAction.Quit();
				g_sound.Play(SOUND_MENU_VALID);
			}
		}
	}
	
	this.Draw = function () {
		g_graphicEngine.FillCanvasRGB (g_context, 0, 0, CANVAS_W, CANVAS_H, 0, 0, 0, 0.7);
		g_graphicEngine.FillCanvasRGB (g_context, 0, CANVAS_H * 0.3, CANVAS_W, LINE_HEIGHT * 4, 71, 0, 0, 1);
		
		g_graphicEngine.FillCanvasRGB (g_context, 0, CANVAS_H * 0.3 + LINE_HEIGHT * selecting, CANVAS_W, LINE_HEIGHT, 255, 94, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_RESUME], CANVAS_W * 0.5 + 2, CANVAS_H * 0.3 + LINE_HEIGHT * 0.5 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_RESUME], CANVAS_W * 0.5, CANVAS_H * 0.3 + LINE_HEIGHT * 0.5, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_RESTART], CANVAS_W * 0.5 + 2, CANVAS_H * 0.3 + LINE_HEIGHT * 1.5 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_RESTART], CANVAS_W * 0.5, CANVAS_H * 0.3 + LINE_HEIGHT * 1.5, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SOUND], CANVAS_W * 0.5 - 30 + 2, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SOUND], CANVAS_W * 0.5 - 30, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		if (g_soundVolume == 0) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_OFF], CANVAS_W * 0.5 + 30 + 2, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_OFF], CANVAS_W * 0.5 + 30, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else if (g_soundVolume == 1) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QUIET], CANVAS_W * 0.5 + 30 + 2, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QUIET], CANVAS_W * 0.5 + 30, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else if (g_soundVolume == 2) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_MEDIUM], CANVAS_W * 0.5 + 30 + 2, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_MEDIUM], CANVAS_W * 0.5 + 30, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else if (g_soundVolume == 3) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LOUD], CANVAS_W * 0.5 + 30 + 2, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LOUD], CANVAS_W * 0.5 + 30, CANVAS_H * 0.3 + LINE_HEIGHT * 2.5, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_EXIT_TO_MENU], CANVAS_W * 0.5 + 2, CANVAS_H * 0.3 + LINE_HEIGHT * 3.5 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_EXIT_TO_MENU], CANVAS_W * 0.5, CANVAS_H * 0.3 + LINE_HEIGHT * 3.5, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		
		
		
		
		g_graphicEngine.FillCanvasRGB (g_context, 0, CANVAS_H * 0.9, CANVAS_W, CANVAS_H * 0.1, 71, 0, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
	}
}