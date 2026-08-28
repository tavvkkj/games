function Background (gsAction, data) {
	var width = 240;
	var height = 80;
	var offsetX = 0;
	var offsetY = 0;
	var colorOffsetY = 0;
	
	var image = g_graphicEngine.LoadImage(data.m_background);
	
	
	var parallaxRatio = 30;
	var rotationRatio = 0.18;
	
	var COLOR_AMOUNT_1 = CANVAS_H * 0.01;
	var COLOR_AMOUNT_2 = CANVAS_H * 0.03;
	var COLOR_AMOUNT_3 = CANVAS_H * 0.1;
	var COLOR_AMOUNT_4 = CANVAS_H * 0.5;
	
	this.Init = function() {
		//width = g_graphicEngine.GetImage(image).width;
		//height = g_graphicEngine.GetImage(image).height;
	}
	
	this.UpdateOffset = function(amountX, angle) {
		offsetX -= amountX * rotationRatio;
		if (offsetX > 1) offsetX -= 1;
		if (offsetX < 0) offsetX += 1;
		
		offsetY = Math.tan(DEG_TO_RAD * angle) * parallaxRatio + CANVAS_H * 0.3;
		colorOffsetY = offsetY + height;
	}
	
	this.Draw = function() {
		var destX = offsetX * width;
		var destY = offsetY;
		
		g_graphicEngine.DrawFast (g_context, image, destX, destY);
		g_graphicEngine.DrawFast (g_context, image, destX - width, destY);
	}
	
	this.DrawHillBG = function (minY) {
		var drawY = colorOffsetY;
		if (minY < colorOffsetY) {
			drawY = minY;
		}
		
		g_graphicEngine.FillCanvasRGB (g_context, 0, drawY-1, CANVAS_W, COLOR_AMOUNT_1 + 3 + (colorOffsetY - drawY), data.m_hillColor[0][0], data.m_hillColor[0][1], data.m_hillColor[0][2], 1);
		g_graphicEngine.FillCanvasRGB (g_context, 0, colorOffsetY + COLOR_AMOUNT_1, CANVAS_W, COLOR_AMOUNT_2 + 2, data.m_hillColor[1][0], data.m_hillColor[1][1], data.m_hillColor[1][2], 1);
		g_graphicEngine.FillCanvasRGB (g_context, 0, colorOffsetY + COLOR_AMOUNT_1 + COLOR_AMOUNT_2, CANVAS_W, COLOR_AMOUNT_3 + 2, data.m_hillColor[2][0], data.m_hillColor[2][1], data.m_hillColor[2][2], 1);
		g_graphicEngine.FillCanvasRGB (g_context, 0, colorOffsetY + COLOR_AMOUNT_1 + COLOR_AMOUNT_2 + COLOR_AMOUNT_3, CANVAS_W, COLOR_AMOUNT_4 + 2, data.m_hillColor[3][0], data.m_hillColor[3][1], data.m_hillColor[3][2], 1);
	}
}