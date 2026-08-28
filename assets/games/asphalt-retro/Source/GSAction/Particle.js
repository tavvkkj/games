function Particle (path, size, frameNumber, fps) {
	var image = g_graphicEngine.LoadImage(path);
	
	this.m_x = 0;
	this.m_y = 0;
	this.m_angle = (Math.random() * 360) >> 0;
	
	this.m_live = false;
	
	var frameTime = 1 / fps;
	var frame = 0;
	var frameCount = 0;
	
	this.Spawn = function (x, y) {
		this.m_x = x;
		this.m_y = y;
		this.m_live = true;
		frame = 0;
		frameCount = 0;
	}
	
	this.Update = function (dt) {
		if (this.m_live == true) {
			frameCount += dt;
			while (frameCount > frameTime) {
				frameCount -= frameTime;
				frame ++;
				if (frame == frameNumber) {
					this.m_live = false;
				}
			}
		}
	}
	
	this.Draw = function () {
		if (this.m_live == true) {
			var row = frame % 8;
			var col = (frame / 8) >> 0;
			g_graphicEngine.Draw (g_context, image, row * size, col * size, size, size, (this.m_x >> 0) - (size * 0.5) >> 0, (this.m_y >> 0) + g_gsAction.m_globalShiftY - (size * 0.5) >> 0, size, size, 1, false, false, this.m_angle);
		}
	}
}