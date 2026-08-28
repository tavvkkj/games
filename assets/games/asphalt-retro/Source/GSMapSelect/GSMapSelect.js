var g_mapSelect = 0;

function GSMapSelect () {
	var instance = this;
	var init = false;
	
	var imgBackground 	= g_graphicEngine.LoadImage("Images/GSMapSelect/Background.png");
	var lockIcon	 	= g_graphicEngine.LoadImage("Images/GSMapSelect/LockIcon.png");
	
	var maps = [];
	maps[0] = g_graphicEngine.LoadImage("Images/GSMapSelect/Tokyo.jpg");
	maps[1] = g_graphicEngine.LoadImage("Images/GSMapSelect/NewYork.jpg");
	maps[2] = g_graphicEngine.LoadImage("Images/GSMapSelect/Paris.jpg");
	maps[3] = g_graphicEngine.LoadImage("Images/GSMapSelect/London.jpg");
	maps[4] = g_graphicEngine.LoadImage("Images/GSMapSelect/Siracusa.jpg");
	maps[5] = g_graphicEngine.LoadImage("Images/GSMapSelect/Luxor.jpg");
	maps[6] = g_graphicEngine.LoadImage("Images/GSMapSelect/Vladivostok.jpg");
	maps[7] = g_graphicEngine.LoadImage("Images/GSMapSelect/Route66.jpg");
	
	var names = [];
	

	
	this.Init = function () {
		if (init == false) {
			init = true;
		}
		names[0] = g_locText[g_language][LANG_TOKYO];
		names[1] = g_locText[g_language][LANG_NEWYORK];
		names[2] = g_locText[g_language][LANG_PARIS];
		names[3] = g_locText[g_language][LANG_LONDON];
		names[4] = g_locText[g_language][LANG_SIRACUSA];
		names[5] = g_locText[g_language][LANG_LUXOR];
		names[6] = g_locText[g_language][LANG_VLAD];
		names[7] = g_locText[g_language][LANG_ROUTE];
		
		g_sound.PlayMapSelectMusic();
	}
	
	this.Update = function (dt) {
		if (g_inputEngine.m_keyPress[KEY.UP] == 1 || g_inputEngine.m_keyPress[KEY.W] == 1) {
			g_mapSelect --;
			if (g_mapSelect < 0) g_mapSelect = names.length-1;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.DOWN] == 1 || g_inputEngine.m_keyPress[KEY.S] == 1) {
			g_mapSelect ++;
			if (g_mapSelect > names.length-1) g_mapSelect = 0;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1) {
			GoToCarSelect();
			g_sound.Play(SOUND_MENU_VALID);
			g_sound.StopMapSelectMusic();
		}
		else if (g_inputEngine.m_keyPress[KEY.ESC] == 1 || g_inputEngine.m_keyPress[KEY.BACKSPACE] == 1) {
			GoToMainMenu();
			g_sound.Play(SOUND_MENU_VALID);
			g_sound.StopMapSelectMusic();
		}
	}
	
	this.Draw = function () {
		g_graphicEngine.DrawFast (g_context, imgBackground, 0, 0);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_RACE_SELECTION],  10 + 2, 16 + 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_RACE_SELECTION],  10, 16, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 255, 85, 0, 1);
		
		var name1 = names[g_mapSelect];
		var name2 = names[g_mapSelect-1];
		if (g_mapSelect == 0) name2 = names[names.length-1];
		var name3 = names[g_mapSelect+1];
		if (g_mapSelect == names.length-1) name3 = names[0];
		
		g_graphicEngine.DrawTextRGB (g_context, name2, CANVAS_W * 0.5 + 2, CANVAS_H * 0.4 - 44 + 2, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, name2, CANVAS_W * 0.5, CANVAS_H * 0.4 - 44, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, name1, CANVAS_W * 0.5 + 2, CANVAS_H * 0.4 - 15 + 2, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, name1, CANVAS_W * 0.5, CANVAS_H * 0.4 - 15, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, name3, CANVAS_W * 0.5 + 2, CANVAS_H * 0.4 + 14 + 2, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, name3, CANVAS_W * 0.5, CANVAS_H * 0.4 + 14, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 255, 221, 187, 1);
		

		
		g_graphicEngine.DrawFast (g_context, maps[g_mapSelect], 0, CANVAS_H * 0.6 + 1);
		
		var length = "2512 m";
		var lane = "4";
		var traffic = g_locText[g_language][LANG_HEAVY];
		if (g_mapSelect == 0) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TOKYO_JAPAN], CANVAS_W * 0.5 + 50 + 2, CANVAS_H * 0.6 + 11 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TOKYO_JAPAN], CANVAS_W * 0.5 + 50, CANVAS_H * 0.6 + 11, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
			length = "2512 m";
			lane = "4";
			traffic = g_locText[g_language][LANG_HEAVY];
		}
		else if (g_mapSelect == 1) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_NEWYORK_USA], CANVAS_W * 0.5 + 50 + 2, CANVAS_H * 0.6 + 11 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_NEWYORK_USA], CANVAS_W * 0.5 + 50, CANVAS_H * 0.6 + 11, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
			length = "2700 m";
			lane = "4";
			traffic = g_locText[g_language][LANG_LIGHT];
		}
		else if (g_mapSelect == 2) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_PARIS_FRANCE], CANVAS_W * 0.5 + 50 + 2, CANVAS_H * 0.6 + 11 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_PARIS_FRANCE], CANVAS_W * 0.5 + 50, CANVAS_H * 0.6 + 11, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
			length = "3100 m";
			lane = "4";
			traffic = g_locText[g_language][LANG_AVERAGE];
		}
		else if (g_mapSelect == 3) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LONDON_UK], CANVAS_W * 0.5 + 50 + 2, CANVAS_H * 0.6 + 11 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LONDON_UK], CANVAS_W * 0.5 + 50, CANVAS_H * 0.6 + 11, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
			length = "2915 m";
			lane = "3";
			traffic = g_locText[g_language][LANG_HEAVY];
		}
		else if (g_mapSelect == 4) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SICILY_ITALY], CANVAS_W * 0.5 + 50 + 2, CANVAS_H * 0.6 + 11 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SICILY_ITALY], CANVAS_W * 0.5 + 50, CANVAS_H * 0.6 + 11, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
			length = "2432 m";
			lane = "2";
			traffic = g_locText[g_language][LANG_LIGHT];
		}
		else if (g_mapSelect == 5) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LUXOR_EGYPT], CANVAS_W * 0.5 + 50 + 2, CANVAS_H * 0.6 + 11 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LUXOR_EGYPT], CANVAS_W * 0.5 + 50, CANVAS_H * 0.6 + 11, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
			length = "3025 m";
			lane = "2";
			traffic = g_locText[g_language][LANG_LIGHT];
		}
		else if (g_mapSelect == 6) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_VLAD_RUSSIA], CANVAS_W * 0.5 + 50 + 2, CANVAS_H * 0.6 + 11 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_VLAD_RUSSIA], CANVAS_W * 0.5 + 50, CANVAS_H * 0.6 + 11, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
			length = "3156 m";
			lane = "2";
			traffic = g_locText[g_language][LANG_LIGHT];
		}
		else if (g_mapSelect == 7) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CADESERT_USA], CANVAS_W * 0.5 + 50 + 2, CANVAS_H * 0.6 + 11 + 2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CADESERT_USA], CANVAS_W * 0.5 + 50, CANVAS_H * 0.6 + 11, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
			length = "4066 m";
			lane = "2";
			traffic = g_locText[g_language][LANG_LIGHT];
		}
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LENGTH],  CANVAS_W * 0.5 - 17 + 1, CANVAS_H * 0.6 + 31 + 2, 100, FONT_PRIMARY, 9, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LENGTH],  CANVAS_W * 0.5 - 17, CANVAS_H * 0.6 + 31, 100, FONT_PRIMARY, 9, false, false, "left", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LANE],    CANVAS_W * 0.5 - 17 + 1, CANVAS_H * 0.6 + 46 + 2, 100, FONT_PRIMARY, 9, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LANE],    CANVAS_W * 0.5 - 17, CANVAS_H * 0.6 + 46, 100, FONT_PRIMARY, 9, false, false, "left", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TRAFFIC], CANVAS_W * 0.5 - 17 + 1, CANVAS_H * 0.6 + 61 + 2, 100, FONT_PRIMARY, 9, false, false, "left", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TRAFFIC], CANVAS_W * 0.5 - 17, CANVAS_H * 0.6 + 61, 100, FONT_PRIMARY, 9, false, false, "left", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, length,  CANVAS_W - 5 + 1, CANVAS_H * 0.6 + 31 + 1, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, length,  CANVAS_W - 5, CANVAS_H * 0.6 + 31, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, lane,  CANVAS_W - 5 + 1, CANVAS_H * 0.6 + 46 + 1, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, lane,  CANVAS_W - 5, CANVAS_H * 0.6 + 46, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, traffic,  CANVAS_W - 5 + 1, CANVAS_H * 0.6 + 61 + 1, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, traffic,  CANVAS_W - 5, CANVAS_H * 0.6 + 61, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 255, 221, 187, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40, CANVAS_H-10, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);

		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
	}
}