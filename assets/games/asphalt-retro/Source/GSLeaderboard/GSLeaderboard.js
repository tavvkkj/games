function GSLeaderboard () {
	var instance = this;
	var init = false;
	
	var imgBackground 	= g_graphicEngine.LoadImage("Images/GSResult/Background.png");
	
	var loading = false;
	var nameInputShowing = false;
	var entryArray = [];
	
	this.m_inputScore = 0;

	
	this.Init = function () {
		if (init == false) {
			init = true;
		}
		this.LoadScore();
	}
	
	
	this.Update = function (dt) {
		if (nameInputShowing) {
			if (g_inputEngine.m_keyPress[KEY.ESC] == 1) {
				this.HideNameInput();
			}
			else if (g_inputEngine.m_keyPress[KEY.ENTER] == 1) {
				if (g_inputName.value != "") {
					this.PostScore (g_inputName.value, this.m_inputScore);
					this.HideNameInput();
					this.m_inputScore = 0;
				}
			}
		}
		else {
			if (g_inputEngine.m_keyPress[KEY.BACKSPACE] == 1 || g_inputEngine.m_keyPress[KEY.ESC] == 1
			||  g_inputEngine.m_keyPress[KEY.ENTER] == 1 || g_inputEngine.m_keyPress[KEY.SPACE] == 1) {
				GoToMainMenu(true);
				g_sound.Play(SOUND_MENU_VALID);
			}
		}
	}
	
	this.Draw = function () {
		g_graphicEngine.DrawFast (g_context, imgBackground, 0, 0);
		
		if (!nameInputShowing) {
			g_graphicEngine.FillCanvasRGB (g_context, 0, 0, CANVAS_W, CANVAS_H-50, 0, 0, 0, 0.6);
		}
		
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_TITLE], CANVAS_W * 0.5, 25+1, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 38, 30, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_TITLE], CANVAS_W * 0.5, 25, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 225, 204, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_RANK], 5+1, 50+1, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_RANK], 5, 50, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_NAME], 50+1, 50+1, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_NAME], 50, 50, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_SCORE], 180+1, 50+1, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_SCORE], 180, 50, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		
		if (loading == true) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_LOADING],  CANVAS_W * 0.5 + 1, CANVAS_H * 0.4 + 1, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_LOADING],  CANVAS_W * 0.5, CANVAS_H * 0.4, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else {
			if (entryArray != null) {
				for (var i=0; i<entryArray.length; i++) {
					g_graphicEngine.DrawTextRGB (g_context, i+1, 5+1, 70+1 + 18*i, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 51, 0, 0, 1);
					g_graphicEngine.DrawTextRGB (g_context, i+1, 5, 70 + 18*i, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 221, 187, 1);
					
					g_graphicEngine.DrawTextRGB (g_context, entryArray[i].name, 50+1, 70+1 + 18*i, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 51, 0, 0, 1);
					g_graphicEngine.DrawTextRGB (g_context, entryArray[i].name, 50, 70 + 18*i, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 221, 187, 1);
					
					g_graphicEngine.DrawTextRGB (g_context, entryArray[i].score, 180+1, 70+1 + 18*i, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 51, 0, 0, 1);
					g_graphicEngine.DrawTextRGB (g_context, entryArray[i].score, 180, 70 + 18*i, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 221, 187, 1);
				}
			}
		}
		
		if (nameInputShowing) {
			g_graphicEngine.FillCanvasRGB (g_context, 0, 0, CANVAS_W, CANVAS_H-50, 0, 0, 0, 0.8);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_HIGHSCORE],  CANVAS_W * 0.5 + 1, CANVAS_H * 0.2 + 1, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_HIGHSCORE],  CANVAS_W * 0.5, CANVAS_H * 0.2, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 225, 204, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_NAME_INPUT],  CANVAS_W * 0.5 + 1, CANVAS_H * 0.2 + 19, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_NAME_INPUT],  CANVAS_W * 0.5, CANVAS_H * 0.2 + 18, 100, FONT_PRIMARY, 12, false, false, "center", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_SKIP], 40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_SKIP], 40, CANVAS_H-10, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_SUBMIT], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_LEADERBOARD_SUBMIT], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40, CANVAS_H-10, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
	}
	
	
	this.LoadScore = function () {
		loading = true;
		var request = new XMLHttpRequest();
		request.open("GET", LEADERBOARD_LOAD_URL, true);
		request.onload = function(e) {
			if (request.readyState == 4 && request.status == 200) {
				try {
					entryArray = JSON.parse(request.response);
					
					if (instance.m_inputScore > 0) {
						if (entryArray[9] == null || instance.m_inputScore > entryArray[9].score) {
							instance.ShowNameInput();
						}
					}
				}
				catch (e) {
					
				}
				loading = false;
			}
		};
		request.send();
	}
	
	this.PostScore = function (name, score) {
		loading = true;
		var params = "name=" + name + "&score=" + score;
		var request = new XMLHttpRequest();
		request.open("POST", LEADERBOARD_SAVE_URL, true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.onload = function(e) {
			if (request.readyState == 4 && request.status == 200) {
				instance.LoadScore();
			}
		};
		request.send(params);
	}
	
	this.ShowNameInput = function() {
		nameInputShowing = true;
		g_inputName.style.display = "block";
	}
	this.HideNameInput = function() {
		nameInputShowing = false;
		g_inputName.style.display = "none";
	}
}