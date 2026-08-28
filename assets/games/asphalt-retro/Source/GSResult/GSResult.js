var ACHIEVEMENT_GETAWAY = 0;
var ACHIEVEMENT_EXPEDITIVE = 1;
var ACHIEVEMENT_SCRATCH = 2;
var ACHIEVEMENT_BUMPING = 3;
var ACHIEVEMENT_SPEED_1 = 4;
var ACHIEVEMENT_SPEED_2 = 5;
var ACHIEVEMENT_URBAN_HAVOC = 6;
var ACHIEVEMENT_RACE = 7;

var SCORE_GETAWAY = 5000;
var SCORE_EXPEDITIVE = 2500;
var SCORE_SCRATCH = 200;
var SCORE_BUMP = 500;
var SCORE_SPEED_1 = 100;
var SCORE_SPEED_2 = 200;
var SCORE_URBAN_HAVOC = 300;

var SCORE_POSITION_1 = 10000;
var SCORE_POSITION_2 = 5000;
var SCORE_POSITION_3 = 3000;

function GSResult () {
	var SHOW_LATENCY = 0.3;
	
	var instance = this;
	var init = false;
	
	var imgBackground 	= g_graphicEngine.LoadImage("Images/GSResult/Background.png");
	
	var showCounter = 0;
	
	this.m_achievement = [];
	
	this.Init = function () {
		if (init == false) {
			init = true;
		}
		
		g_sound.PlayResultMusic();
		g_stateEngine.ShowAds();
		g_tracking.SendLudiFinish();
	}
	
	this.ResetAchievement = function () {
		this.m_achievement[ACHIEVEMENT_GETAWAY] 	= 0;
		this.m_achievement[ACHIEVEMENT_EXPEDITIVE] 	= 0;
		this.m_achievement[ACHIEVEMENT_SCRATCH] 	= 0;
		this.m_achievement[ACHIEVEMENT_BUMPING] 	= 0;
		this.m_achievement[ACHIEVEMENT_SPEED_1] 	= 0;
		this.m_achievement[ACHIEVEMENT_SPEED_2] 	= 0;
		this.m_achievement[ACHIEVEMENT_URBAN_HAVOC] = 0;
		this.m_achievement[ACHIEVEMENT_RACE] 		= 0;
	}
	
	this.AddAchievement = function (category, amount) {
		this.m_achievement[category] += amount;
		
		if (category == ACHIEVEMENT_GETAWAY) {
			g_gsAction.m_score += SCORE_GETAWAY;
			g_gsAction.ShowMessage (g_locText[g_language][LANG_GET_AWAY]);
		}
		else if (category == ACHIEVEMENT_EXPEDITIVE) {
			g_gsAction.m_score += SCORE_EXPEDITIVE;
			g_gsAction.ShowMessage (g_locText[g_language][LANG_EXPEDITE]);
		}
		else if (category == ACHIEVEMENT_SCRATCH) {
			g_gsAction.m_score += SCORE_SCRATCH;
			g_gsAction.ShowMessage (g_locText[g_language][LANG_SCRATCH]);
		}
		else if (category == ACHIEVEMENT_BUMPING) {
			g_gsAction.m_score += SCORE_BUMP;
			g_gsAction.ShowMessage (g_locText[g_language][LANG_BUMPING]);
		}
		else if (category == ACHIEVEMENT_SPEED_1) {
			g_gsAction.m_score += SCORE_SPEED_1;
			g_gsAction.ShowMessage (g_locText[g_language][LANG_SPEED_1]);
		}
		else if (category == ACHIEVEMENT_SPEED_2) {
			g_gsAction.m_score += SCORE_SPEED_2;
			g_gsAction.ShowMessage (g_locText[g_language][LANG_SPEED_2]);
		}
		else if (category == ACHIEVEMENT_URBAN_HAVOC) {
			g_gsAction.m_score += SCORE_URBAN_HAVOC;
			g_gsAction.ShowMessage (g_locText[g_language][LANG_URBAN_HAVOC]);
		}
		else if (category == ACHIEVEMENT_RACE) {
			g_gsAction.m_score += amount;
		}
	}
	
	this.Update = function (dt) {
		if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1) {
			if (LUDIVERSION) {
				//g_gsLeaderboard.m_inputScore = g_gsAction.m_score;
				//GoToLeaderboard();
				g_sound.Play(SOUND_MENU_VALID);
				g_sound.StopResultMusic();
				g_sound.PlayTitleMusic();
			}
			else {
				this.ShareToFacebook();
			}
		}
		else if (g_inputEngine.m_keyPress[KEY.BACKSPACE] == 1 || g_inputEngine.m_keyPress[KEY.ESC] == 1) {
			//g_gsLeaderboard.m_inputScore = g_gsAction.m_score;
			//GoToLeaderboard();
			g_sound.Play(SOUND_MENU_VALID);
			g_sound.StopResultMusic();
			g_sound.PlayTitleMusic();
		}
		
		showCounter += dt;
	}
	
	this.Draw = function () {
		g_graphicEngine.DrawFast (g_context, imgBackground, 0, 0);
		
		
		if (showCounter > SHOW_LATENCY * 0) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_GET_AWAY].toUpperCase(), 5+2, 65+2 + 22 * 0, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_GET_AWAY].toUpperCase(), 5, 65 + 22 * 0, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_GETAWAY], 115+2, 65+2 + 22 * 0, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_GETAWAY], 115, 65 + 22 * 0, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_GETAWAY] * SCORE_GETAWAY), 180+2, 65+2 + 22 * 0, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_GETAWAY] * SCORE_GETAWAY), 180, 65 + 22 * 0, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		}
		if (showCounter > SHOW_LATENCY * 1) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_EXPEDITE].toUpperCase(), 5+2, 65+2 + 22 * 1, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_EXPEDITE].toUpperCase(), 5, 65 + 22 * 1, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_EXPEDITIVE], 115+2, 65+2 + 22 * 1, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_EXPEDITIVE], 115, 65 + 22 * 1, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_EXPEDITIVE] * SCORE_EXPEDITIVE), 180+2, 65+2 + 22 * 1, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_EXPEDITIVE] * SCORE_EXPEDITIVE), 180, 65 + 22 * 1, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		}
		if (showCounter > SHOW_LATENCY * 2) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SCRATCH].toUpperCase(), 5+2, 65+2 + 22 * 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SCRATCH].toUpperCase(), 5, 65 + 22 * 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_SCRATCH], 115+2, 65+2 + 22 * 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_SCRATCH], 115, 65 + 22 * 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_SCRATCH] * SCORE_SCRATCH), 180+2, 65+2 + 22 * 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_SCRATCH] * SCORE_SCRATCH), 180, 65 + 22 * 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		}
		if (showCounter > SHOW_LATENCY * 3) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BUMPING].toUpperCase(), 5+2, 65+2 + 22 * 3, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BUMPING].toUpperCase(), 5, 65 + 22 * 3, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_BUMPING], 115+2, 65+2 + 22 * 3, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_BUMPING], 115, 65 + 22 * 3, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_BUMPING] * SCORE_BUMP), 180+2, 65+2 + 22 * 3, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_BUMPING] * SCORE_BUMP), 180, 65 + 22 * 3, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		}
		if (showCounter > SHOW_LATENCY * 4) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SPEED_1].toUpperCase(), 5+2, 65+2 + 22 * 4, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SPEED_1].toUpperCase(), 5, 65 + 22 * 4, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_SPEED_1], 115+2, 65+2 + 22 * 4, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_SPEED_1], 115, 65 + 22 * 4, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_SPEED_1] * SCORE_SPEED_1), 180+2, 65+2 + 22 * 4, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_SPEED_1] * SCORE_SPEED_1), 180, 65 + 22 * 4, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		}
		if (showCounter > SHOW_LATENCY * 5) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SPEED_2].toUpperCase(), 5+2, 65+2 + 22 * 5, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_SPEED_2].toUpperCase(), 5, 65 + 22 * 5, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_SPEED_2], 115+2, 65+2 + 22 * 5, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_SPEED_2], 115, 65 + 22 * 5, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_SPEED_2] * SCORE_SPEED_2), 180+2, 65+2 + 22 * 5, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_SPEED_2] * SCORE_SPEED_2), 180, 65 + 22 * 5, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		}
		if (showCounter > SHOW_LATENCY * 6) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_URBAN_HAVOC].toUpperCase(), 5+2, 65+2 + 22 * 6, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_URBAN_HAVOC].toUpperCase(), 5, 65 + 22 * 6, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_URBAN_HAVOC], 115+2, 65+2 + 22 * 6, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_URBAN_HAVOC], 115, 65 + 22 * 6, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_URBAN_HAVOC] * SCORE_URBAN_HAVOC), 180+2, 65+2 + 22 * 6, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "= " + (this.m_achievement[ACHIEVEMENT_URBAN_HAVOC] * SCORE_URBAN_HAVOC), 180, 65 + 22 * 6, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		}
		if (showCounter > SHOW_LATENCY * 7) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_RACE].toUpperCase(), 5+2, 65+2 + 22 * 7, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_RACE].toUpperCase(), 5, 65 + 22 * 7, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 255, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_RACE], 115+2, 65+2 + 22 * 7, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "x " + this.m_achievement[ACHIEVEMENT_RACE], 115, 65 + 22 * 7, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, "= " + this.m_achievement[ACHIEVEMENT_RACE], 180+2, 65+2 + 22 * 7, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, "= " + this.m_achievement[ACHIEVEMENT_RACE], 180, 65 + 22 * 7, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		}
		
		if (showCounter > SHOW_LATENCY * 8) {
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TOTAL].toUpperCase(), 5+2, 250 + 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_TOTAL].toUpperCase(), 5, 250, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 255, 204, 0, 1);
			
			g_graphicEngine.DrawTextRGB (g_context, g_gsAction.m_score, 170+2, 250 + 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 38, 30, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context, g_gsAction.m_score, 170, 250, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 225, 204, 0, 1);
		}
		
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CONGRATULATION], CANVAS_W * 0.5-1, 23-1, 50, FONT_PRIMARY, 17, false, false, "center", "middle", false, 38, 30, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CONGRATULATION], CANVAS_W * 0.5, 23, 50, FONT_PRIMARY, 17, false, false, "center", "middle", false, 255, 204, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40, CANVAS_H-10, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);
		
		if (LUDIVERSION) {
			g_graphicEngine.DrawTextRGB (g_context,  g_locText[g_language][LANG_ACCEPT], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context,  g_locText[g_language][LANG_ACCEPT], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
		else {
			g_graphicEngine.DrawTextRGB (g_context,  g_locText[g_language][LANG_SHARE_BUTTON], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
			g_graphicEngine.DrawTextRGB (g_context,  g_locText[g_language][LANG_SHARE_BUTTON], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	this.ShareToFacebook = function () {
		var data = g_canvas.toDataURL("image/png");
		var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
		var decodedPng = Base64Binary.decode(encodedPng);
		
		FB.getLoginStatus(function(response) {
			if (response.status === "connected") {
				instance.Share(g_gsAction.m_score);
			} 
			else if (response.status === "not_authorized") {
				FB.login(function(response) {
					instance.Share(g_gsAction.m_score);
				});
			} 
			else {
				FB.login(function(response)  {
					instance.Share(g_gsAction.m_score);
				});
			}
		});
	}
	
	this.Share = function(score) {
		g_tracking.SendShareEvent();
		FB.ui(
			{
				method: "share",
				href: "https://www.gameloft.com/minisites/p/application/modules/mirror_asphaltos/asphalt_retro/",
				quote: "I got " + score + " points on this awesome game. Check it out."
			}, 
			function(response){
				console.log (response);
			}
		);
	}
}