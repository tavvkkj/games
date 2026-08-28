function GraphicEngine () {
	var DEG_TO_RAD = 0.0174532925199433;
	
	
	// Instance pointer
	var instance = this;
	
	
	//============================== IMAGE LOADER ===================================
	var imageNumber = 0;                 // Number of image in the array
	var imageLoadedNumber = 0;           // Number of completely loaded image
	var imageObjectArray = new Array();  // Image object array
	var imagePathArray = new Array();    // The path of the image array
	
	var globalAlpha = 1;
	
	
	// Load an image right away ----------------------------------------
	this.LoadImage = function (path) {
		// Check if that image was already existed. Return id if existed.
		for (var i=0; i<imageNumber; i++) {
			if (imagePathArray[i] == path) {
				return i;
			}
		}
		
		// If not existed, load it
		imagePathArray[imageNumber] = path;
		imageObjectArray[imageNumber] = new Image();
		imageObjectArray[imageNumber].src = path;
		imageObjectArray[imageNumber].onload = function () {
			imageLoadedNumber ++;
		}
		
		// Return id
		return imageNumber++;
	}
	// ------------------------------------------------------------------
	
	
	
	
	// Get image by ID --------------------------------------------------
	this.GetImage = function (id) {
		return imageObjectArray[id];
	}
	// ------------------------------------------------------------------
	
	
	
	
	// Load an image when network is free -------------------------------
	this.LoadImageWhenNetworkFree = function (path) {
		
	}
	// ------------------------------------------------------------------
	
	
	// Get image loading progress, return from 0 to 1 -------------------
	this.GetLoadingProgress = function () {
		return imageLoadedNumber / imageNumber;
	}
	// ------------------------------------------------------------------
	//============================== IMAGE LOADER ===================================
	
	
	
	
	
	
	//================================ RENDERER =====================================
	this.SetGlobalAlpha = function (alpha) {
		globalAlpha = alpha;
	}
	
	// Clear entire canvas or a portion of it ---------------------------
	this.ClearCanvas = function (canvas, context, x, y, w, h) {
		if (x == null) x = 0;
		if (y == null) y = 0;
		if (w == null) w = CANVAS_W;
		if (h == null) x = CANVAS_H;
		
		if (x < 0) x = 0;
		if (y < 0) y = 0;
		if (x + w > canvas.width) x = canvas.width - w;
		if (y + h > canvas.height) y = canvas.height - h;
		
		context.clearRect(x, y, w, h);
	}
	// ------------------------------------------------------------------
	
	
	this.CopyCanvas = function (desContext, sourceCanvas, sx, sy, sw, sh, dx, dy, dw, dh, alpha) {
		if (sw == null) sw = sourceCanvas.width;
		if (sh == null) sh = sourceCanvas.height;
		if (dw == null) dw = sourceCanvas.width;
		if (dh == null) dh = sourceCanvas.height;
		
		if (sx < 0) sx = 0;
		if (sy < 0) sy = 0;
		if (sx + sw > sourceCanvas.width) sx = sourceCanvas.width - sw;
		if (sy + sh > sourceCanvas.height) sy = sourceCanvas.height - sh;
		
		if (alpha == null) alpha = 1;
		if (alpha > 1) alpha = 1;
		if (alpha < 0) alpha = 0;
		
		if (alpha * globalAlpha > 0) {
			desContext.globalAlpha = alpha * globalAlpha;
			desContext.drawImage (sourceCanvas, sx, sy, sw, sh, dx, dy, dw, dh);
			desContext.globalAlpha = globalAlpha;
		}
	}
	
	
	// Draw a loaded image to the canvas context ------------------------
	this.Draw = function (context, imageID, sx, sy, sw, sh, dx, dy, dw, dh, alpha, flipX, flipY, angle, cx, cy) {
		if (alpha == null) alpha = 1;
		
		if (alpha > 1) alpha = 1;
		if (alpha < 0) alpha = 0;
		
		if (flipX == null) flipX = 0;
		if (flipY == null) flipY = 0;
		if (angle == null) angle = 0;
		
		
		
		var image = this.GetImage (imageID);
		
		var save = angle || flipX || flipY;
		
		if (save) context.save();
		
		var signX = (flipX == 0)? 1 : -1;
		var signY = (flipY == 0)? 1 : -1;
		
		if (flipX == 0 && flipY == 0) {
			
		}
		else if (flipX == 1 && flipY == 1) {
			context.translate (sw, sh);
			context.scale (-1, -1);
		}
		else if (flipX == 1 && flipY == 0) {
			context.translate (sw, 0);
			context.scale (-1, 1);
		}
		else if (flipX == 0 && flipY == 1) {
			context.translate (0, sh);
			context.scale (1, -1);
		}
		
		
		if (cx == null) cx = dw * 0.5;
		if (cy == null) cy = dh * 0.5;
		var centerX = dx + cx;
		var centerY = dy + cy;
		
		
		if (angle != 0) {
			if (flipX == 0 && flipY == 0) {
				context.translate (centerX, centerY);
				context.rotate (angle * DEG_TO_RAD * signX * signY);
				context.translate (-centerX, -centerY);
			}
			else if (flipX == 1 && flipY == 0) {
				context.translate (sw - centerX, centerY);
				context.rotate (angle * DEG_TO_RAD * signX * signY);
				context.translate (- sw + centerX, -centerY);
			}
			else if (flipX == 0 && flipY == 1) {
				context.translate (centerX, sh - centerY);
				context.rotate (angle * DEG_TO_RAD * signX * signY);
				context.translate (-centerX, - sh + centerY);
			}
			else if (flipX == 1 && flipY == 1) {
				context.translate (sw - centerX, sh - centerY);
				context.rotate (angle * DEG_TO_RAD * signX * signY);
				context.translate (- sw + centerX, - sh + centerY);
			}
		}
		
		dx = dx * signX;
		dy = dy * signY;
		
		
		if (dw > 0 && dh > 0) {
			context.globalAlpha = alpha * globalAlpha;
			context.drawImage (image, sx, sy, sw, sh, dx, dy, dw, dh);
			context.globalAlpha = globalAlpha;
		}
		
		
		if (save) context.restore();
	}
	// ------------------------------------------------------------------
	
	
	// Draw an image quickly without setting param ----------------------
	this.DrawFast = function (context, imageID, dx, dy) {
		var image = this.GetImage (imageID);
		context.drawImage (image, 0, 0, image.width, image.height, dx, dy, image.width, image.height);
	}
	// ------------------------------------------------------------------
	
	this.FillCanvasRGB = function (context, x, y, w, h, r, g, b, alpha) {
		if (x == null) x = 0;
		if (y == null) y = 0;
		if (w == null) w = CANVAS_W;
		if (h == null) h = CANVAS_H;
		
		if (alpha == null) alpha = 1;
		if (alpha > 1) alpha = 1;
		if (alpha < 0) alpha = 0;
		
		context.globalAlpha = alpha * globalAlpha;
		context.lineWidth = 1;
		context.fillStyle = "rgb(" + r + "," +  g + "," +  b + ")"; 
		context.fillRect(x, y, w, h);
		context.globalAlpha = globalAlpha;
	}
	
	// Set draw mode
	this.SetDrawModeAddActive = function (context, active) {
		if (active == true) {
			context.globalCompositeOperation = "lighter";
		}
		else {
			context.globalCompositeOperation = "source-over";
		}
	}
	
	
	// Draw text --------------------------------------------------------
	// Draw text with RGB color value.
	var LINE_HEIGHT = 1.5;
	
	
	this.DrawTextRGB = function (context, text, x, y, w, font, size, bold, italic, alignW, alignH, breakLine, red, green, blue, alpha) {
		g_context.translate(0.5, 0.5);
		
		if (alpha == null) alpha = 1;
		if (alpha < 1) {
			context.globalAlpha = alpha * globalAlpha;
		}
		
		if (font == null) font = "sans-serif";
		if (size == null) size = "12";
		if (bold == true) 
			bold = "bold";
		else
			bold = "";
		if (italic == true) 
			italic = "italic";
		else
			italic = "";
			
		if (alignW == null) alignW = "left";
		if (alignH == null) alignH = "top";
		else if (alignH == "center") alignH = "middle";
		
		if (breakLine == null) breakLine = false;
		
		if (red == null) red = 255;
		if (green == null) red = 255;
		if (blue == null) red = 255;
		if (alpha == null) alpha = 1;
		
		
		
		var lineArray = new Array();
		if (breakLine == true) {
			context.textAlign = alignW;
			context.textBaseline = alignH;
			context.font = bold + " " + italic + " " + size + "px " + font;
			context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
			
			
			if (context.measureText(text).width < w) {
				lineArray.push (text);
			}
			else {
				// Do lines breaking
				var i              = 0;
				var line           = 0;
				var currentLength  = 0;
				var drawString     = "";
				var tempString     = "";
				var remainString   = text;
				
				while (remainString.length > 0) {
					for (i=0; i<=remainString.length; i++) {
						if (i == remainString.length) {
							if (currentLength + context.measureText(tempString).width < w) {
								lineArray.push (drawString + remainString);
								remainString = "";
							}
							else {
								lineArray.push (drawString);
								lineArray.push (remainString);
								remainString = "";
							}
							
						}
						if (remainString.charCodeAt(i) == 32) {
							tempString = remainString.substr(0, i+1);
							if (currentLength + context.measureText(tempString).width < w) {
								drawString += tempString;
								currentLength += context.measureText(tempString).width;
								remainString = remainString.substr(i+1);
							}
							else {
								if (currentLength == 0) {
									remainString = "";
								}
								else {
									lineArray.push (drawString);
									drawString = "";
									currentLength = 0;
								}
							}
							break;
						}
						else if (remainString.charCodeAt(i) == 47) {
							if (remainString.charCodeAt(i + 1) == 110) {
								lineArray.push (drawString);
								drawString = "";
								currentLength = 0;
								remainString = remainString.substr(i+2);
							}
						}
					}
				}
			}
		}
		else {
			lineArray.push (text);
		}
		
		context.textAlign = alignW;
		context.textBaseline = alignH;
		context.font = bold + " " + italic + " " + size + "px " + font;
		context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
		for (var i=0; i<lineArray.length; i++) {
			if (y + i * size * LINE_HEIGHT < CANVAS_H + LINE_HEIGHT
			&&  y + i * size * LINE_HEIGHT > -LINE_HEIGHT) {
				context.fillText (lineArray[i], x, y + i * size * LINE_HEIGHT);
			}
		}

				
		if (alpha < 1) {
			context.globalAlpha = globalAlpha;
		}
		
		g_context.translate(-0.5, -0.5);
	};
	
	this.StrokeTextRGB = function (context, text, x, y, w, font, size, bold, italic, alignW, alignH, breakLine, red, green, blue, alpha) {
		if (alpha == null) alpha = 1;
		if (alpha < 1) {
			context.globalAlpha = alpha * globalAlpha;
		}
		
		if (font == null) font = "sans-serif";
		if (size == null) size = "12";
		if (bold == true) 
			bold = "bold";
		else
			bold = "";
		if (italic == true) 
			italic = "italic";
		else
			italic = "";
			
		if (alignW == null) alignW = "left";
		if (alignH == null) alignH = "top";
		
		if (breakLine == null) breakLine = false;
		
		
		
		var lineArray = new Array();
		if (breakLine == true) {
			context.textAlign = alignW;
			context.textBaseline = alignH;
			context.font = bold + " " + italic + " " + size + "px " + font;
			context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
			
			
			if (context.measureText(text).width < w) {
				lineArray.push (text);
			}
			else {
				// Do lines breaking
				var i              = 0;
				var line           = 0;
				var currentLength  = 0;
				var drawString     = "";
				var tempString     = "";
				var remainString   = text;
				
				while (remainString.length > 0) {
					for (i=0; i<=remainString.length; i++) {
						if (i == remainString.length) {
							if (currentLength + context.measureText(tempString).width < w) {
								lineArray.push (drawString + remainString);
								remainString = "";
							}
							else {
								lineArray.push (drawString);
								lineArray.push (remainString);
								remainString = "";
							}
							
						}
						if (remainString.charCodeAt(i) == 32) {
							tempString = remainString.substr(0, i+1);
							if (currentLength + context.measureText(tempString).width < w) {
								drawString += tempString;
								currentLength += context.measureText(tempString).width;
								remainString = remainString.substr(i+1);
							}
							else {
								if (currentLength == 0) {
									remainString = "";
								}
								else {
									lineArray.push (drawString);
									drawString = "";
									currentLength = 0;
								}
							}
							break;
						}
						else if (remainString.charCodeAt(i) == 47) {
							if (remainString.charCodeAt(i + 1) == 110) {
								lineArray.push (drawString);
								drawString = "";
								currentLength = 0;
								remainString = remainString.substr(i+2);
							}
						}
					}
				}
			}
		}
		else {
			lineArray.push (text);
		}
		
		context.textAlign = alignW;
		context.textBaseline = alignH;
		context.font = bold + " " + italic + " " + size + "px " + font;
		context.lineWidth = 2;
		context.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
		for (var i=0; i<lineArray.length; i++) {
			context.strokeText (lineArray[i], x, y + i * size * LINE_HEIGHT);
		}

				
		if (alpha < 1) {
			context.globalAlpha = globalAlpha;
		}
	};
	// ------------------------------------------------------------------
	
	
	this.DrawCircleRGB = function (context, centerX, centerY, radius, lineWidth, red, green, blue, alpha) {
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.lineWidth = lineWidth;
		context.strokeStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
		context.stroke();
	}
	
	this.DrawRectRGB = function (context, x, y, w, h, lineWidth, red, green, blue, alpha) {
		context.beginPath();
		context.rect(x, y, w, h);
		context.lineWidth = lineWidth;
		context.strokeStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
		context.stroke();
	}
	
	this.FillRect = function(context, x, y, w, h, color, alpha) {
		context.globalAlpha = alpha * globalAlpha;
		context.fillStyle = color;
		context.lineWidth = 1;
		context.fillRect(x, y, w, h);
		context.globalAlpha = globalAlpha;
	}
	
	this.DrawPolygon = function(context, x1, y1, x2, y2, x3, y3, x4, y4, color) {
		context.fillStyle = color;
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.lineTo(x3, y3);
		context.lineTo(x4, y4);
		context.closePath();
		context.fill();
	}
	
	this.DrawPolygonRGB = function(context, x1, y1, x2, y2, x3, y3, x4, y4, red, green, blue, alpha) {
		context.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.lineTo(x3, y3);
		context.lineTo(x4, y4);
		context.closePath();
		context.fill();
	}
	
	this.DrawLineRGB = function (context, x1, y1, x2, y2, thickness, red, green, blue, alpha) {
		if (alpha == null) alpha = 1;
		context.strokeStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
		context.lineWidth = thickness;
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
	}
	//============================= RENDERER ========================================
}