function Button (x, y, dcb, ucb, pr, icon) {
	var SIZE_W = 80;
	var SIZE_H = 40;
	var BLEND_SPEED = 0.003;
	
	var imgU = g_graphicEngine.LoadImage("Images/Common/ButtonUp.png");
	var imgD = g_graphicEngine.LoadImage("Images/Common/ButtonDown.png");
	var imgO = g_graphicEngine.LoadImage("Images/Common/ButtonDown.png");
	var imgDisable = g_graphicEngine.LoadImage("Images/Common/ButtonUp.png");
	var imgIcon = g_graphicEngine.LoadImage(icon);
	
	this.m_x = x;
	this.m_y = y;
	this.m_alpha = 1;
	this.m_enable = true;
	
	var middle_x = this.m_x + SIZE_W * 0.5;
	var middle_y = this.m_y + SIZE_H * 0.5;
	
	var upCallBack = ucb;
	var downCallBack = dcb;
	var param = pr;
	
	
	var state = 0;
	var blend = 0;
	
	
	this.SetPosition = function (x, y) {
		this.m_x = x;
		this.m_y = y;
		
		middle_x = this.m_x + SIZE_W * 0.5;
		middle_y = this.m_y + SIZE_H * 0.5;
	}
	
	
	this.SetCallBack = function (cb, pr) {
		callBack = cb;
		param = pr;
	}
	
	this.SetAlpha = function (alpha) {
		this.m_alpha = alpha;
	}
	
	
	
	this.Update = function (deltaTime) {
		if (this.m_enable == true) {
			if (USE_TOUCH == false) {
				// Mouse =======================================
				if (g_inputEngine.m_mouseX >= this.m_x && g_inputEngine.m_mouseX <= this.m_x + SIZE_W
				&&  g_inputEngine.m_mouseY >= this.m_y && g_inputEngine.m_mouseY <= this.m_y + SIZE_H) {
					if (g_inputEngine.m_mousePress == 1) {
						if (state == 1) {
							downCallBack(param);
						}
						state = 2;
					}
					else {
						if (state == 2) {
							upCallBack(param);
						}
						state = 1;
					}
				}
				else {
					if (state == 2) {
						upCallBack(param);
					}
					state = 0;
				}
			}
			else {
				// Touch =======================================
				if (g_inputEngine.m_touchX.length == 0) {
					if (state == 2) {
						upCallBack(param);
					}
					state = 0;
				}
				else {
					if (g_inputEngine.m_touchX[0] >= this.m_x && g_inputEngine.m_touchX[0] <= this.m_x + SIZE_W
					&&  g_inputEngine.m_touchY[0] >= this.m_y && g_inputEngine.m_touchY[0] <= this.m_y + SIZE_H) {
						if (state == 0) {
							state = 2;
							if (state == 2) {
								downCallBack(param);
							}
						}
					}
					else {
						if (state == 2) {
							upCallBack(param);
						}
						state = 0;
					}
				}
			}
			
			if (state != 0) {
				blend += BLEND_SPEED * deltaTime;
				if (blend > 1) blend = 1;
			}
			else {
				blend -= BLEND_SPEED * deltaTime;
				if (blend < 0) blend = 0;
			}
		}
		else {
		
		}
	}
	
	this.Draw = function (context) {
		if (this.m_enable == true) {
			var colorBlend = (blend * 55) >> 0;
			if (state == 0) {
				g_graphicEngine.Draw (context, imgU, 0, 0, SIZE_W, SIZE_H, this.m_x, this.m_y, SIZE_W, SIZE_H, this.m_alpha);
				if (blend > 0) {
					g_graphicEngine.Draw (context, imgO, 0, 0, SIZE_W, SIZE_H, this.m_x, this.m_y, SIZE_W, SIZE_H, this.m_alpha * blend);
				}
			}
			else if (state == 1) {
				g_graphicEngine.Draw (context, imgU, 0, 0, SIZE_W, SIZE_H, this.m_x, this.m_y, SIZE_W, SIZE_H, this.m_alpha);
				g_graphicEngine.Draw (context, imgO, 0, 0, SIZE_W, SIZE_H, this.m_x, this.m_y, SIZE_W, SIZE_H, this.m_alpha * blend);
			}
			else if (state == 2) {
				g_graphicEngine.Draw (context, imgD, 0, 0, SIZE_W, SIZE_H, this.m_x, this.m_y, SIZE_W, SIZE_H, this.m_alpha);
			}
		}
		else {
			g_graphicEngine.Draw (context, imgDisable, 0, 0, SIZE_W, SIZE_H, this.m_x, this.m_y, SIZE_W, SIZE_H, this.m_alpha);
		}
		g_graphicEngine.Draw (context, imgIcon, 0, 0, SIZE_W, SIZE_H, this.m_x, this.m_y, SIZE_W, SIZE_H, this.m_alpha);
	}
}