var RAD_TO_DEG = 57.29577951308231;
var DEG_TO_RAD = 0.0174532925199433;

function DistanceBetweenTwoPoint (x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function AngleBetweenTwoPoint (x1, y1, x2, y2) {
	var angle = 0;
	if (y2 == y1) {
		if (x2 > x1)
			angle = 90;
		else if (x2 < x1)
			angle = -90;
	}
	else {
		angle = Math.atan((x2 - x1) / (y1 - y2)) * RAD_TO_DEG;
		if (y2 > y1) {
			angle += 180;
		}
		if (angle < 0) angle += 360;
	}
	
	return angle;
}

function AngleBetweenAngle (a1, a2) {
	a1 = NormalizeAngle(a1);
	a2 = NormalizeAngle(a2);
		
	if (Math.abs(a1 - a2) < 180) {
		return a1 - a2;
	}
	else if (a1 > 180) {
		return a1 - a2 - 360;
	}
	else {
		return a1 - a2 + 360;
	}
}
	
function NormalizeAngle (angle) {
	angle = angle % 360;
	if (angle < 0) angle += 360;
	return angle;
}

function Interpolate (a, b, percent) {
	return a + (b - a) * percent;
}

function EaseIn (a, b, percent) {
	return a + (b - a) * Math.pow(percent, 2);                           
}

function EaseOut (a, b, percent) {
	return a + (b - a) * (1 - Math.pow(1 - percent, 2));
}

function EaseInOut (a, b, percent) {
	return a + (b - a) * ((-Math.cos(percent * Math.PI) * 0.5) + 0.5);
}

function ExponentialFog (distance, density) {
	return 1 / (Math.pow(Math.E, (distance * distance * density)));
}

function ToInt (obj, def) {
	if (obj !== null) { 
		var x = parseInt(obj, 10);
		if (!isNaN(x)) return x; 
	} 
	return ToInt(def, 0);
}

function ToFloat (obj, def) {
	if (obj !== null) { 
		var x = parseFloat(obj);
		if (!isNaN(x)) return x; 
	} 
	return ToFloat(def, 0.0); 
}

function Project (p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth, angle) {
	p.camera.x     = (p.world.x || 0) - cameraX;
	p.camera.y     = (p.world.y || 0) - cameraY;
	p.camera.z     = (p.world.z || 0) - cameraZ;
	p.screen.scale = cameraDepth / p.camera.z;
	p.screen.x     = Math.round((width * 0.5)  + (p.screen.scale * p.camera.x  * width * 0.5));
	p.screen.y     = Math.round((height * 0.5) - (p.screen.scale * p.camera.y  * height * 0.5)) + CANVAS_H * 0.1 + Math.tan(DEG_TO_RAD * angle) * p.camera.z * p.screen.scale//parallax * 0.000015 * (1/p.screen.scale);
	p.screen.w     = Math.round((p.screen.scale * roadWidth   * width * 0.5));
	
	p.screen.y += g_gsAction.m_globalShiftY;
}

function RandomRange (value1, value2) {
	return value1 + Math.random() * (value2 - value1);
}







var Base64Binary = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
	/* will return a  Uint8Array type */
	decodeArrayBuffer: function(input) {
		var bytes = (input.length/4) * 3;
		var ab = new ArrayBuffer(bytes);
		this.decode(input, ab);
		
		return ab;
	},
	
	decode: function(input, arrayBuffer) {
		//get last chars to see if are valid
		var lkey1 = this._keyStr.indexOf(input.charAt(input.length-1));		 
		var lkey2 = this._keyStr.indexOf(input.charAt(input.length-2));		 
	
		var bytes = (input.length/4) * 3;
		if (lkey1 == 64) bytes--; //padding chars, so skip
		if (lkey2 == 64) bytes--; //padding chars, so skip
		
		var uarray;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		var j = 0;
		
		if (arrayBuffer)
			uarray = new Uint8Array(arrayBuffer);
		else
			uarray = new Uint8Array(bytes);
		
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		
		for (i=0; i<bytes; i+=3) {	
			//get the 3 octects in 4 ascii chars
			enc1 = this._keyStr.indexOf(input.charAt(j++));
			enc2 = this._keyStr.indexOf(input.charAt(j++));
			enc3 = this._keyStr.indexOf(input.charAt(j++));
			enc4 = this._keyStr.indexOf(input.charAt(j++));
	
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
	
			uarray[i] = chr1;			
			if (enc3 != 64) uarray[i+1] = chr2;
			if (enc4 != 64) uarray[i+2] = chr3;
		}
	
		return uarray;	
	}
}