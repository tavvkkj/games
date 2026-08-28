var g_carSelect = 0;
var g_paintSelect = 0;

function GSCarSelect () {
	var instance = this;
	var init = false;
	
	var imgBackground 	= g_graphicEngine.LoadImage("Images/GSCarSelect/Background.png");
	var lockIcon	 	= g_graphicEngine.LoadImage("Images/GSCarSelect/LockIcon.png");
	var imgColorSelect 	= g_graphicEngine.LoadImage("Images/GSCarSelect/ColorSelector.png");
	
	var imgCars = [];
	for (var i=0; i<8; i++) {
		imgCars[i] = [];
	}
	for (var i=0; i<8; i++) {
		for (var j=0; j<3; j++) {
			imgCars[i][j] = g_graphicEngine.LoadImage("Images/GSCarSelect/Cars/Car_" + (i+1) + "_" + (j+1) + ".png");
		}
	}
	
	var carNames = [];
	carNames[0] = "Shark";
	carNames[1] = "Panther";
	carNames[2] = "Lion";
	carNames[3] = "Gazelle";
	carNames[4] = "Ocelot";
	carNames[5] = "Serval";
	carNames[6] = "Narwhal";
	carNames[7] = "Tiger";
	
	var carBrand = [];
	carBrand[0] = "FANTOM";
	carBrand[1] = "NEBULA";
	carBrand[2] = "QUASAR";
	carBrand[3] = "QUASAR";
	carBrand[4] = "NEBULA";
	carBrand[5] = "QUASAR";
	carBrand[6] = "FANTOM";
	carBrand[7] = "NEBULA";
	
	/*var imgLogos = [];
	for (var i=0; i<8; i++) {
		imgLogos[i] = g_graphicEngine.LoadImage("Images/GSCarSelect/Logos/Logo_" + (i+1) + ".png");
	}*/
	
	
	this.Init = function () {
		if (init == false) {
			init = true;
		}
		g_sound.PlayCarSelectMusic();
	}
	
	this.Update = function (dt) {
		if (g_inputEngine.m_keyPress[KEY.UP] == 1 || g_inputEngine.m_keyPress[KEY.W] == 1) {
			g_paintSelect--;
			if (g_paintSelect < 0) g_paintSelect = 2;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.DOWN] == 1 || g_inputEngine.m_keyPress[KEY.S] == 1) {
			g_paintSelect++;
			if (g_paintSelect > 2) g_paintSelect = 0;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		if (g_inputEngine.m_keyPress[KEY.LEFT] == 1 || g_inputEngine.m_keyPress[KEY.A] == 1) {
			g_carSelect--;
			if (g_carSelect < 0) g_carSelect = 7;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		else if (g_inputEngine.m_keyPress[KEY.RIGHT] == 1 || g_inputEngine.m_keyPress[KEY.D] == 1) {
			g_carSelect++;
			if (g_carSelect > 7) g_carSelect = 0;
			g_sound.Play(SOUND_MENU_BROWSE);
		}
		if (g_inputEngine.m_keyPress[KEY.SPACE] == 1 || g_inputEngine.m_keyPress[KEY.ENTER] == 1) {
			if (g_carSelect <= 7) {
				GoToActionPhase();
				g_sound.Play(SOUND_MENU_VALID);
				g_sound.StopCarSelectMusic();
			}
		}
		else if (g_inputEngine.m_keyPress[KEY.ESC] == 1 || g_inputEngine.m_keyPress[KEY.BACKSPACE] == 1) {
			GoToMapSelect();
			g_sound.Play(SOUND_MENU_VALID);
			g_sound.StopCarSelectMusic();
		}
	}
	
	this.Draw = function () {
		g_graphicEngine.DrawFast (g_context, imgBackground, 0, 0);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CAR_SELECTION],  10 + 2, 16 + 2, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_CAR_SELECTION],  10, 16, 100, FONT_PRIMARY, 11, false, false, "left", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, carNames[g_carSelect], CANVAS_W * 0.5 + 2, 58 + 2, 10, FONT_PRIMARY, 14, false, false, "center", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, carNames[g_carSelect], CANVAS_W * 0.5, 58, 100, FONT_PRIMARY, 14, false, false, "center", "middle", false, 255, 255, 255, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, carBrand[g_carSelect], CANVAS_W * 0.5 + 2, 170, 100, FONT_PRIMARY, 18, false, false, "center", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, carBrand[g_carSelect], CANVAS_W * 0.5, 170 + 2, 100, FONT_PRIMARY, 18, false, false, "center", "middle", false, 255, 255, 255, 1);
		
		g_graphicEngine.DrawFast (g_context, imgCars[g_carSelect][g_paintSelect], CANVAS_W * 0.5 - 35, CANVAS_H * 0.2 + 5);
		
		//g_graphicEngine.DrawFast (g_context, imgLogos[g_carSelect], CANVAS_W * 0.5 - g_graphicEngine.GetImage(imgLogos[g_carSelect]).width / 2, CANVAS_H * 0.5 - 5);
		
		var weight = "";
		var engine = "";
		var maxSpeed = "";
		var kmh = "";
		
		if (g_carSelect == 0) {
			weight = "1,560 kg";
			engine = g_locText[g_language][CAR_ROADSTER_ENGINE];
			maxSpeed = "250 km/h";
			kmh = g_locText[g_language][CAR_ROADSTER_ACCELERATION];
		}
		else if (g_carSelect == 1) {
			weight = "875 kg";
			engine = g_locText[g_language][CAR_EXIGE_ENGINE];
			maxSpeed = "237 km/h";
			kmh = g_locText[g_language][CAR_EXIGE_ACCELERATION];
		}
		else if (g_carSelect == 2) {
			weight = "1,560 kg";
			engine = g_locText[g_language][CAR_CORVETTE_ENGINE];
			maxSpeed = "256 km/h";
			kmh = g_locText[g_language][CAR_CORVETTE_ACCELERATION];
		}
		else if (g_carSelect == 3) {
			weight = "1,666 kg";
			engine = g_locText[g_language][CAR_SKYLINE_ENGINE];
			maxSpeed = "269 km/h";
			kmh = g_locText[g_language][CAR_SKYLINE_ACCELERATION];
		}
		else if (g_carSelect == 4) {
			weight = "1,140 kg";
			engine = g_locText[g_language][CAR_SAGARIS_ENGINE];
			maxSpeed = "300 km/h";
			kmh = g_locText[g_language][CAR_SAGARIS_ACCELERATION];
		}
		else if (g_carSelect == 5) {
			weight = "1,620 kg";
			engine = g_locText[g_language][CAR_GALLARDO_ENGINE];
			maxSpeed = "309 km/h";
			kmh = g_locText[g_language][CAR_GALLARDO_ACCELERATION];
		}
		else if (g_carSelect == 6) {
			weight = "1,545 kg";
			engine = g_locText[g_language][CAR_FORD_ENGINE];
			maxSpeed = "320 km/h";
			kmh = g_locText[g_language][CAR_FORD_ACCELERATION];
		}
		else if (g_carSelect == 7) {
			weight = "1,250 kg";
			engine = g_locText[g_language][CAR_SALEEN_ENGINE];
			maxSpeed = "330 km/h";
			kmh = g_locText[g_language][CAR_SALEEN_ACCELERATION];
		}
		
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_WEIGHT],  	10 + 1, CANVAS_H * 0.6 + 16 + 1, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_WEIGHT],  	10, CANVAS_H * 0.6 + 16, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ENGINE],  	10 + 1, CANVAS_H * 0.6 + 36 + 1, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ENGINE],  	10, CANVAS_H * 0.6 + 36, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_MAX_SPEED],  10 + 1, CANVAS_H * 0.6 + 56 + 1, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_MAX_SPEED],  10, CANVAS_H * 0.6 + 56, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 85, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEL], 		10 + 1, CANVAS_H * 0.6 + 76 + 1, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 0, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEL], 		10, CANVAS_H * 0.6 + 76, 100, FONT_PRIMARY, 10, false, false, "left", "middle", false, 255, 85, 0, 1);
		
		g_graphicEngine.DrawTextRGB (g_context, weight,  	CANVAS_W - 11 + 1, CANVAS_H * 0.6 + 16 + 1, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, weight,  	CANVAS_W - 11, CANVAS_H * 0.6 + 16, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, engine,  	CANVAS_W - 11 + 1, CANVAS_H * 0.6 + 36 + 1, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, engine,  	CANVAS_W - 11, CANVAS_H * 0.6 + 36, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, maxSpeed,   CANVAS_W - 11 + 1, CANVAS_H * 0.6 + 56 + 1, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, maxSpeed,   CANVAS_W - 11, CANVAS_H * 0.6 + 56, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 255, 221, 187, 1);
		g_graphicEngine.DrawTextRGB (g_context, kmh, 		CANVAS_W - 11 + 1, CANVAS_H * 0.6 + 76 + 1, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, kmh, 		CANVAS_W - 11, CANVAS_H * 0.6 + 76, 100, FONT_PRIMARY, 10, false, false, "right", "middle", false, 255, 221, 187, 1);
		
		if (g_carSelect == 0) {
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 0 * 15, 12, 12, 206, 216, 236, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 1 * 15, 12, 12, 255, 176, 25, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 2 * 15, 12, 12, 25, 104, 255, 1);
		}
		else if (g_carSelect == 1) {
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 0 * 15, 12, 12, 201, 0, 230, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 1 * 15, 12, 12, 230, 0, 25, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 2 * 15, 12, 12, 45, 95, 244, 1);
		}
		else if (g_carSelect == 2) {
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 0 * 15, 12, 12, 68, 68, 136, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 1 * 15, 12, 12, 167, 201, 203, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 2 * 15, 12, 12, 204, 3, 0, 1);
		}
		else if (g_carSelect == 3) {
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 0 * 15, 12, 12, 68, 153, 221, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 1 * 15, 12, 12, 251, 34, 9, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 2 * 15, 12, 12, 144, 145, 148, 1);
		}
		else if (g_carSelect == 4) {
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 0 * 15, 12, 12, 89, 255, 161, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 1 * 15, 12, 12, 11, 72, 126, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 2 * 15, 12, 12, 212, 252, 141, 1);
		}
		else if (g_carSelect == 5) {
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 0 * 15, 12, 12, 238, 85, 34, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 1 * 15, 12, 12, 255, 226, 43, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 2 * 15, 12, 12, 14, 47, 255, 1);
		}
		else if (g_carSelect == 6) {
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 0 * 15, 12, 12, 255, 0, 0, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 1 * 15, 12, 12, 255, 190, 0, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 2 * 15, 12, 12, 211, 211, 211, 1);
		}
		else if (g_carSelect == 7) {
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 0 * 15, 12, 12, 240, 54, 29, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 1 * 15, 12, 12, 14, 73, 255, 1);
			g_graphicEngine.FillCanvasRGB (g_context, 52, 92 + 2 * 15, 12, 12, 255, 202, 38, 1);
		}
		g_graphicEngine.DrawFast (g_context, imgColorSelect, 52, 92 + g_paintSelect * 15);
		
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_BACK], 40, CANVAS_H-10, 100, FONT_PRIMARY, 11, false, false, "center", "middle", false, 255, 221, 187, 1);

		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40+2, CANVAS_H-10+2, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 51, 0, 0, 1);
		g_graphicEngine.DrawTextRGB (g_context, g_locText[g_language][LANG_ACCEPT], CANVAS_W-40, CANVAS_H-10, 100, FONT_PRIMARY, 10, false, false, "center", "middle", false, 255, 221, 187, 1);
	}
}