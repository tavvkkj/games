var USE_TOUCH = false;

function InputEngine () {
	var TOUCH_DEBUG = false;
	var instance = this;
	
	this.m_canvas = null;
	
	this.m_mouseX = -1;
	this.m_mouseY = -1;
	this.m_mousePress = 0;
	this.m_mouseScale = 1;
	this.m_mouseWheel = 0;
	
	this.m_touchX = new Array();
	this.m_touchY = new Array();
	
	var originMouseX = 0;
	var originMouseY = 0;
	
	var doubleTapCount = 0;
	
	
	this.m_keyState = new Array();
	this.m_keyPress = new Array();
	for (var i=0; i<255; i++) {
		this.m_keyState[i] = 0;
		this.m_keyPress[i] = 0;
	}
	
	
	this.AddEventListener = function (canvas) {
		var temp = canvas;
		var windowOffsetX = 0;
		var windowOffsetY = 0;
		
		canvas.onmousedown = OnMouseDown;
		canvas.onmouseup = OnMouseUp;
		canvas.onmousemove = OnMouseMove;
		
		if (canvas.addEventListener)
			canvas.addEventListener('DOMMouseScroll', OnMouseWheel, false);
			
		canvas.onmousewheel = OnMouseWheel;
		
		canvas.ontouchstart = ProcessTouchEvent;
		canvas.ontouchend = ProcessTouchEvent;
		canvas.ontouchmove = ProcessTouchEvent;
		
		this.m_canvas = canvas;
		
		var rect = this.m_canvas.getBoundingClientRect();
		var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		originMouseX = scrollLeft - rect.left;
		originMouseY = scrollTop - rect.top;
	}
	
	this.SetMouseScale = function (scale) {
		var rect = this.m_canvas.getBoundingClientRect();
		var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		
		originMouseX = scrollLeft - rect.left;
		originMouseY = scrollTop - rect.top;
		
		this.m_mouseScale = scale;
	}
	
	
	function OnMouseWheel (event) {
		if (!event) event = this.m_canvas.event;
		
		if (event.wheelDelta) instance.m_mouseWheel += event.wheelDelta / 120;
		else if (event.detail) instance.m_mouseWheel += -event.detail / 3;
		
		event.preventDefault();
	}
	function OnMouseMove (event) {
		event.preventDefault();
		if (!TOUCH_DEBUG) {
			instance.m_mouseX = (originMouseX + event.clientX) * instance.m_mouseScale;
			instance.m_mouseY = (originMouseY + event.clientY) * instance.m_mouseScale;
		}
		else {
			if (instance.m_touchY.length > 0) {
				instance.m_touchX[0] = (originMouseX + event.clientX) * instance.m_mouseScale;
				instance.m_touchY[0] = (originMouseY + event.clientY) * instance.m_mouseScale;
			}
		}
	}
	function OnMouseDown (event) {
		event.preventDefault();
		if (!TOUCH_DEBUG) {
			instance.m_mouseX = (originMouseX + event.clientX) * instance.m_mouseScale;
			instance.m_mouseY = (originMouseY + event.clientY) * instance.m_mouseScale;
			instance.m_mousePress = 1;
		}
		else {
			USE_TOUCH = true;
			instance.m_touchX = new Array();
			instance.m_touchY = new Array();
		
			var tempX = (originMouseX + event.clientX) * instance.m_mouseScale;
			var tempY = (originMouseY + event.clientY) * instance.m_mouseScale;
			instance.m_touchX.push (tempX);
			instance.m_touchY.push (tempY);
		}
	}
	function OnMouseUp (event) {
		event.preventDefault();
		if (!TOUCH_DEBUG) {
			instance.m_mouseX = (originMouseX + event.clientX) * instance.m_mouseScale;
			instance.m_mouseY = (originMouseY + event.clientY) * instance.m_mouseScale;
			instance.m_mousePress = 0;
		}
		else {
			USE_TOUCH = true;
			instance.m_touchX = new Array();
			instance.m_touchY = new Array();
		}
	}
	function ProcessTouchEvent (event) {
		USE_TOUCH = true;
		event.preventDefault();
		
		if (g_soundManager) {
			g_soundManager.ResumeOnMobile();
		}
		
		instance.m_touchX = new Array();
		instance.m_touchY = new Array();
		
		for (var i=0; i<event.touches.length; i++) {
			var tempX = (originMouseX + event.touches[i].clientX) * instance.m_mouseScale;
			var tempY = (originMouseY + event.touches[i].clientY) * instance.m_mouseScale;
			instance.m_touchX.push (tempX);
			instance.m_touchY.push (tempY);
		}
	}
	
	
	
	this.ResetWheel = function () {
		this.m_mouseWheel = 0;
	}
	this.ResetKeyDown = function () {
		for (var i=0; i<255; i++) {
			this.m_keyPress[i] = 0;
		}
	}
	
	
	
	var backButton;
	var upButton;
	var enterButton;
	var leftButton;
	var downButton;
	var rightButton;
	var allowDrawButton = false;
	
	this.LoadOnScreenButton = function() {
		backButton = new Button (0, CANVAS_H + 2, this.OnScreenButtonDown, this.OnScreenButtonUp, KEY.ESC, "Images/Common/Back.png");
		upButton = new Button (80, CANVAS_H + 2, this.OnScreenButtonDown, this.OnScreenButtonUp, KEY.UP, "Images/Common/UpArrow.png");
		enterButton = new Button (160, CANVAS_H + 2, this.OnScreenButtonDown, this.OnScreenButtonUp, KEY.ENTER, "Images/Common/Enter.png");
		
		leftButton = new Button (0, CANVAS_H + 43, this.OnScreenButtonDown, this.OnScreenButtonUp, KEY.LEFT, "Images/Common/LeftArrow.png");
		downButton = new Button (80, CANVAS_H + 43, this.OnScreenButtonDown, this.OnScreenButtonUp, KEY.DOWN, "Images/Common/DownArrow.png");
		rightButton = new Button (160, CANVAS_H + 43, this.OnScreenButtonDown, this.OnScreenButtonUp, KEY.RIGHT, "Images/Common/RightArrow.png");
	}
	this.StartDrawOnScreenButton = function () {
		allowDrawButton = true;
	}
	this.DrawOnScreenButton = function(dt) {
		if (allowDrawButton) {
			backButton.Update (dt);
			upButton.Update (dt);
			enterButton.Update (dt);
			leftButton.Update (dt);
			downButton.Update (dt);
			rightButton.Update (dt);
			
			g_graphicEngine.FillCanvasRGB (g_context, 0, CANVAS_H, CANVAS_W, CANVAS_H_WITH_BUTTON - CANVAS_H, 0, 9, 28, 1);
			
			backButton.Draw(g_context);
			upButton.Draw(g_context);
			enterButton.Draw(g_context);
			leftButton.Draw(g_context);
			downButton.Draw(g_context);
			rightButton.Draw(g_context);
		}
	}
	
	this.OnScreenButtonDown = function (id) {
		if (g_gsAction.m_car) {
			if ((id == KEY.LEFT && instance.m_keyState[KEY.LEFT] == 0)
			||  (id == KEY.A && instance.m_keyState[KEY.A] == 0)) {
				g_gsAction.m_car.SteerTap (-1);
			}
			else if ((id == KEY.RIGHT && instance.m_keyState[KEY.RIGHT] == 0)
			||  (id == KEY.D && instance.m_keyState[KEY.D] == 0)) {
				g_gsAction.m_car.SteerTap (1);
			}
		}
		
		instance.m_keyPress[id] = 1;
		instance.m_keyState[id] = 1;
	}
	this.OnScreenButtonUp = function (id) {
		instance.m_keyState[id] = 0;
	}
	
	
	
	
	
	
	
	
	
	
	function OnKeyDown (event) {
		var keycode = event.which;
		console.log(keycode);
		if (!document.getElementById("adBlockerOverlay") || document.getElementById("adBlockerOverlay").style.display != "flex") {
			if (g_gsAction.m_car) {
				if ((keycode == KEY.LEFT && instance.m_keyState[KEY.LEFT] == 0)
				||  (keycode == KEY.A && instance.m_keyState[KEY.A] == 0)) {
					g_gsAction.m_car.SteerTap (-1);
				}
				else if ((keycode == KEY.RIGHT && instance.m_keyState[KEY.RIGHT] == 0)
				||  (keycode == KEY.D && instance.m_keyState[KEY.D] == 0)) {
					g_gsAction.m_car.SteerTap (1);
				}
			}
			
			instance.m_keyState[keycode] = 1;
			instance.m_keyPress[keycode] = 1;
		}
	}
	function OnKeyUp (event) {
		var keycode = event.which;
		
		if (!document.getElementById("adBlockerOverlay") || document.getElementById("adBlockerOverlay").style.display != "flex") {
			instance.m_keyState[keycode] = 0;
		}
		/*
		if (keycode != 123) {
			event.preventDefault();
		}
		*/
	}
	
	
	
	
	
	
	window.onkeydown  = OnKeyDown;
	window.onkeyup    = OnKeyUp;
}