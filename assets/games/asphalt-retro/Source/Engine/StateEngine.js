function StateEngine () {
	var DELTA_TIME_THRESHOLD = 0.2;
	var FADE_SPEED = 3;
	
	var instance = this;
	
	var stateStack = new Array();
	var newState = null;
	var switching = false;
	var switchStep = 0;
	var switchAlpha = 0;
	
	this.m_context = null;
	
	var fpsArray = [];
	var fpsIndex = 0;
	
	this.m_sessionID = 0;
	this.m_sessionTime = 0;
	this.m_gameTime = 0;
	
	var adsShowing = false;
	var adsCheckCloseDelay = 0;
	var adsDelay = 60;
	
	this.Update = function (deltaTime) {
		this.m_gameTime += deltaTime;
		this.m_sessionTime += deltaTime;
		
		fpsArray[fpsIndex] = 1 / deltaTime;
		fpsIndex ++;
		if (fpsIndex >= 10) fpsIndex = 0;
		
		
		if (deltaTime > DELTA_TIME_THRESHOLD) {
			deltaTime = DELTA_TIME_THRESHOLD;
		}
		if (switching == false) {
			if (stateStack.length > 0) {
				if (adsShowing == false) {
					stateStack[stateStack.length-1].Update(deltaTime);
				}
				else {
					if (adsCheckCloseDelay > 0) {
						adsCheckCloseDelay -= deltaTime;
					}
					else {
						if (adsContainer.style.display == "none") {
							instance.CloseAds();
						}
					}
				}
			}
		}
		
		if (adsDelay > 0) {
			adsDelay -= deltaTime;
		}
			
		for (var i=0; i<stateStack.length; i++) {
			stateStack[i].Draw();
		}
		
		if (switching == true) {
			if (switchStep == 0) {
				switchAlpha += deltaTime * FADE_SPEED;
				if (switchAlpha > 1) {
					switchAlpha = 1;
					switchStep = 1;
					
					stateStack.pop ();
					stateStack.push (newState);
				}
				g_graphicEngine.FillCanvasRGB (g_context, null, null, null, null, 255, 255, 255, switchAlpha);
			}
			else if (switchStep == 1) {
				switchAlpha -= deltaTime * FADE_SPEED;
				if (switchAlpha < 0) {
					switchAlpha = 0;
					switchStep = 0;
					switching = false;
				}
				g_graphicEngine.FillCanvasRGB (g_context, null, null, null, null, 255, 255, 255, switchAlpha);
			}
		}
		
		g_inputEngine.ResetWheel();
		g_inputEngine.ResetKeyDown();
		
		g_inputEngine.DrawOnScreenButton(deltaTime);
		
		if (CHEAT == true) {
			g_graphicEngine.DrawTextRGB (g_context, (this.GetFPS() >> 0), CANVAS_W - 18, 40, 50, FONT_PRIMARY, 10, false, false, "left", "center", false, 255, 255, 255, 1);
		}
	}
	
	this.SwitchState = function (state, fade) {
		if (stateStack.length == 0) {
			stateStack.push (state);
		}
		else {
			if (fade == null) fade = 0;
			if (fade == 0) {
				switchStep = 0;
				switchAlpha = 0;
				stateStack.pop ();
				stateStack.push (state);
			}
			else if (fade == 1) {
				newState = state;
				switchStep = 0;
				switchAlpha = 0;
				switching = true;
			}
		}
	}
	
	this.PushState = function (state) {
		stateStack.push (state);
	}
	
	this.PopState = function () {
		stateStack.pop ();
	}

	this.Start = function() {
		Update ();
	}
	
	this.SetContext = function (context) {
		this.m_context = context;
	}
	
	
	var lastTime = new Date();
	var Update = function () {
		var curTime = new Date();
		instance.Update ((curTime - lastTime) * 0.001);
		lastTime = curTime;
		
		requestAnimFrame (Update);
	}
	
	
	
	this.GetFPS = function() {
		var avgFPS = 0;
		for (var i=0; i<10; i++) {
			avgFPS += fpsArray[i];
		}
		avgFPS /= 10;
		return avgFPS;
	}
	
	
	this.OnFocusLost = function() {
		
	}
	this.OnFocusGain = function() {
		if (adsDelay <= 0) {
			this.m_sessionTime = 0;
			this.m_sessionID ++;
			g_tracking.SendLaunchEvent (EVENT_RESUME);
			
			this.ShowAds();
		}
	}
	
	this.ShowAds = function(force) {
		if (typeof playAds === "function") {
			if (adsDelay <= 0 || force == true) {
				if (g_soundManager) g_soundManager.Pause();
				adsShowing = true;
				adsCheckCloseDelay = 3;
				adsDelay = 60;
				playAds();
			}
		}
	}
	
	this.CloseAds = function () {
		adsShowing = false;
		adsCheckCloseDelay = 0;
		window.focus();
		if (g_soundManager) g_soundManager.ResumeOnMobile();
	}
	
	this.ForceCheckAdsShowing = function () {
		adsShowing = true;
	}
}




// Register the main loop here
window.requestAnimFrame = (function () {
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function (callback) {
				window.setTimeout(callback, 16);
			};
	}
)();


window.onfocus = function() {
	if (g_stateEngine != null) {
		g_stateEngine.OnFocusGain();
	}
};
window.onblur = function() {
	if (g_stateEngine != null) {
		g_stateEngine.OnFocusLost();
	}
};