function GSAbout () {
	var SCROLL_SPEED = 70;
	var instance = this;
	var init = false;
	
	var imgBackground 	= g_graphicEngine.LoadImage("Images/GSResult/Background.png");
	var imgMask		 	= g_graphicEngine.LoadImage("Images/GSAbout/BGMask.png");
	
	var textOffset = 0;
	
	
	
	this.Init = function () {
		if (init == false) {
			init = true;
		}
		
		textOffset = 0;
	}
	
	this.Update = function (dt) {
		if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1 || g_inputEngine.m_keyPress[KEY.ESC] == 1 || g_inputEngine.m_keyPress[KEY.BACKSPACE] == 1) {
			GoToMainMenu(true);
			g_sound.Play(SOUND_MENU_VALID);
		}
		
		textOffset -= SCROLL_SPEED * dt;
		
		if (textOffset < -2280-180) {
			textOffset = 0;
		}
		
	}
	
	this.Draw = function () {
		g_graphicEngine.DrawFast (g_context, imgBackground, 0, 0);
		
		g_graphicEngine.FillCanvasRGB (g_context, 0, 0, CANVAS_W, CANVAS_H, 0, 0, 0, 0.6);
		
		
		g_graphicEngine.DrawTextRGB (g_context, "Asphalt", CANVAS_W * 0.5, textOffset + 320, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 225, 204, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "UrbanGT", CANVAS_W * 0.5, textOffset + 340, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 225, 204, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "ver.1.0.0", CANVAS_W * 0.5, textOffset + 360, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "© 2004 -2020 Gameloft.", CANVAS_W * 0.5, textOffset + 380, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "All Rights Reserved.", CANVAS_W * 0.5, textOffset + 400, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Gameloft, Gameloft logo", CANVAS_W * 0.5, textOffset + 420, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "and Asphalt: Urban GT are", CANVAS_W * 0.5, textOffset + 440, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "trademarks of Gameloft in the", CANVAS_W * 0.5, textOffset + 460, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "US and/or other countries.", CANVAS_W * 0.5, textOffset + 480, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "All other trademarks and", CANVAS_W * 0.5, textOffset + 500, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "registered trademarks are", CANVAS_W * 0.5, textOffset + 520, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "property of their ", CANVAS_W * 0.5, textOffset + 540, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "respective owners", CANVAS_W * 0.5, textOffset + 560, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_INFO_AND_SUPPORT], CANVAS_W * 0.5, textOffset + 420 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "www.gameloft.com", CANVAS_W * 0.5, textOffset + 440 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "support@gameloft.com", CANVAS_W * 0.5, textOffset + 460 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_PRODUCER], CANVAS_W * 0.5, textOffset + 500 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Philippe Laurens", CANVAS_W * 0.5, textOffset + 520 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_GAME_DESIGNER], CANVAS_W * 0.5, textOffset + 560 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Kévin Delbrayelle", CANVAS_W * 0.5, textOffset + 580 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Stanislas Dewavrin", CANVAS_W * 0.5, textOffset + 600 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Jerome Coquard", CANVAS_W * 0.5, textOffset + 620 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_GRAPHIC], CANVAS_W * 0.5, textOffset + 660 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Matthieu Malot", CANVAS_W * 0.5, textOffset + 680 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Etienne Perin", CANVAS_W * 0.5, textOffset + 700 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Eric Marradi", CANVAS_W * 0.5, textOffset + 720 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Christophe Latour", CANVAS_W * 0.5, textOffset + 740 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Mathieu Michel", CANVAS_W * 0.5, textOffset + 760 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SOUND_SFX], CANVAS_W * 0.5, textOffset + 800 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Mathieu Vachon", CANVAS_W * 0.5, textOffset + 820 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEAD_PROGRAMMER], CANVAS_W * 0.5, textOffset + 860 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Sylvain Rouquette", CANVAS_W * 0.5, textOffset + 880 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_PROGRAMMER], CANVAS_W * 0.5, textOffset + 920 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Florent Steiner", CANVAS_W * 0.5, textOffset + 940 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "M-A Lalonde", CANVAS_W * 0.5, textOffset + 960 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Xavier Deloge", CANVAS_W * 0.5, textOffset + 980 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TOOL_PROGRAMMER], CANVAS_W * 0.5, textOffset + 1020 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Florent Steiner", CANVAS_W * 0.5, textOffset + 1040 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QA_MANAGER], CANVAS_W * 0.5, textOffset + 1080 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Jean-Claude Labelle", CANVAS_W * 0.5, textOffset + 1100 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		if (g_language == LANGUAGE_GERMAN) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QA_LEAD], CANVAS_W * 0.5, textOffset + 1140 +180, 200, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QA_LEAD], CANVAS_W * 0.5, textOffset + 1140 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		g_graphicEngine.DrawTextRGB (g_context, "David Hardy", CANVAS_W * 0.5, textOffset + 1160 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Andrew Corriveau", CANVAS_W * 0.5, textOffset + 1180 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QA], CANVAS_W * 0.5, textOffset + 1220 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Catherine Lecours", CANVAS_W * 0.5, textOffset + 1240 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Samuel Bernier", CANVAS_W * 0.5, textOffset + 1260 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Audrey Poisson-Poirier", CANVAS_W * 0.5, textOffset + 1280 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_HTML5].toUpperCase(), CANVAS_W * 0.5, textOffset + 1340 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_PRODUCER], CANVAS_W * 0.5, textOffset + 1380 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Loic Le Goff", CANVAS_W * 0.5, textOffset + 1400 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_PROGRAMMER_HTML5], CANVAS_W * 0.5, textOffset + 1440 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Hoang Tuan Minh", CANVAS_W * 0.5, textOffset + 1460 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_GRAPHIC], CANVAS_W * 0.5, textOffset + 1500 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Duong Van Tung", CANVAS_W * 0.5, textOffset + 1520 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_GAME_DESIGNER], CANVAS_W * 0.5, textOffset + 1560 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Nguyen Viet Linh", CANVAS_W * 0.5, textOffset + 1580 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QA_PRJ_MANAGER], CANVAS_W * 0.5, textOffset + 1620 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Dang Quang Dung", CANVAS_W * 0.5, textOffset + 1640 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_QA_TESTER], CANVAS_W * 0.5, textOffset + 1680 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Vu Cao Cuong", CANVAS_W * 0.5, textOffset + 1700 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Nguyen Nhat Thanh", CANVAS_W * 0.5, textOffset + 1720 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Pham Xuan Loc", CANVAS_W * 0.5, textOffset + 1740 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Tran Viet Anh", CANVAS_W * 0.5, textOffset + 1760 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Tran Nam Giang", CANVAS_W * 0.5, textOffset + 1780 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_AUDIO_MANAGER], CANVAS_W * 0.5, textOffset + 1820 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Sébastien Ménard", CANVAS_W * 0.5, textOffset + 1840 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_AUDIO_DIRECTOR], CANVAS_W * 0.5, textOffset + 1880 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Jorge Peirano", CANVAS_W * 0.5, textOffset + 1900 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);		
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SOUNDFX_MUSIC], CANVAS_W * 0.5, textOffset + 1940 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Jorge Peirano", CANVAS_W * 0.5, textOffset + 1960 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);		
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ADDITIONAL_SOUND_DESIGN], CANVAS_W * 0.5, textOffset + 2000 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Nicolas Arsenault", CANVAS_W * 0.5, textOffset + 2020 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Myles Lann", CANVAS_W * 0.5, textOffset + 2040 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BIZ_TEAM], CANVAS_W * 0.5, textOffset + 2080 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Aurelien Lavaud", CANVAS_W * 0.5, textOffset + 2100 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Thore Vollstedt", CANVAS_W * 0.5, textOffset + 2120 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Nguyen Thi Truong An", CANVAS_W * 0.5, textOffset + 2140 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_THANKS], CANVAS_W * 0.5, textOffset + 2180 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Asphalt", CANVAS_W * 0.5, textOffset + 2200 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 225, 204, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "Retro Gaming font", CANVAS_W * 0.5, textOffset + 2220 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 225, 204, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "© 2019", CANVAS_W * 0.5, textOffset + 2240 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 225, 204, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "by Vasily Draigo aka Daymarius.", CANVAS_W * 0.5, textOffset + 2260 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 225, 204, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, "All rights reserved.", CANVAS_W * 0.5, textOffset + 2280 +180, 200, FONT_PRIMARY, 11, false, false, "center", "middle", false, 225, 204, 0, 1);
		
		
		
				
		g_graphicEngine.FillCanvasRGB (g_context, 0, 0, CANVAS_W, 46, 0, 0, 0, 1);
		g_graphicEngine.DrawFast (g_context, imgMask, 0, CANVAS_H - 21);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40, CANVAS_H-10, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
	}
}