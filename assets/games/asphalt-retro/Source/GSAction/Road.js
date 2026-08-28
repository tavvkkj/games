function Road(gsAction, data) {
	var TEXTURE_SPLIT = 4;
	var TEXTURE_WIDTH = 320;
	var TEXTURE_HEIGHT = 25;
	
	var TUNNEL_HEIGHT = 1;
	var TUNNEL_ROOF_H = 0.6;
	
	this.m_trackLength = 0;
	this.m_segments = new Array();
	
	this.Init = function () {
		this.m_segments = [];
		
		data.m_heightData[data.m_curveData.length-1] = 0;
		for (var i=0; i<data.m_curveData.length; i++) {
			this.AddSegment (data.m_curveData[i], data.m_heightData[i], data.m_angleData[i], data.m_texture[i], data.m_tunnelData[i]);
		}
		
		for (var i=0; i<data.m_entity.length; i++) {
			var entity = data.m_entity[i];
			entity.m_image = g_graphicEngine.LoadImage(entity.m_imagePath);
			this.m_segments[entity.m_z].entity = entity;
		}
		
		for (var i=0; i<data.m_building.length; i++) {
			var building = data.m_building[i];
			this.m_segments[building.m_z].building = building;
		}
		
		for (var i=0; i<data.m_sign.length; i++) {
			var sign = data.m_sign[i];
			this.m_segments[sign.m_z].sign = sign.m_type;
		}
		
		this.m_trackLength = this.m_segments.length * SEGMENT_LENGTH;
	}
	
	
	this.GetLastY = function(){ 
		return (this.m_segments.length == 0) ? 0 : this.m_segments[this.m_segments.length - 1].p2.world.y; 
	}

    this.AddSegment = function(curve, y, a, tex, tunnel) {
		var n = this.m_segments.length;
		this.m_segments.push({
			index: n,
			angle: a,
			p1: { 
				world: { 
					y: this.GetLastY(), 
					z: n * SEGMENT_LENGTH 
				}, 
				camera: {}, 
				screen: {} 
			},
			p2: { 
				world: { 
					y: y, 
					z: (n+1) * SEGMENT_LENGTH 
				}, 
				camera: {}, 
				screen: {} 
			},
			curve: curve,
			texture: g_graphicEngine.LoadImage(tex),
			tunnel: tunnel
		});
    }

    this.FindSegment = function(z) {
		return this.m_segments[Math.floor(z / SEGMENT_LENGTH) % this.m_segments.length]; 
    }
	
	this.Draw = function () {
		var playerSegment = this.FindSegment(gsAction.m_car.m_z);
		var baseSegment   = this.FindSegment(gsAction.m_cameraZ);
		var basePercent   = (gsAction.m_cameraZ % SEGMENT_LENGTH) / SEGMENT_LENGTH;
		var maxy          = CANVAS_H;
		var miny		  = CANVAS_H;

		var x  = 0;
		var dx = -(baseSegment.curve * basePercent);
		
		var parallax = baseSegment.p2.world.y - baseSegment.p1.world.y;
		
		var segment;
		for(var n=-1; n<DRAW_DISTANCE; n++) {
			var index = (baseSegment.index + n) % this.m_segments.length;
			if (index < 0) index += this.m_segments.length;
			
			segment        = this.m_segments[index];
			segment.draw   = false;
			segment.looped = segment.index < baseSegment.index;
			segment.fog    = ExponentialFog(n / DRAW_DISTANCE, FOG_DENSITY);
			
			Project(segment.p1, (gsAction.m_cameraX * ROAD_WIDTH) - x,      gsAction.m_cameraY, gsAction.m_cameraZ - (segment.looped ? this.m_trackLength : 0), gsAction.m_cameraDepth, CANVAS_W, CANVAS_H * 0.9, ROAD_WIDTH, baseSegment.angle);
			Project(segment.p2, (gsAction.m_cameraX * ROAD_WIDTH) - x - dx, gsAction.m_cameraY, gsAction.m_cameraZ - (segment.looped ? this.m_trackLength : 0), gsAction.m_cameraDepth, CANVAS_W, CANVAS_H * 0.9, ROAD_WIDTH, baseSegment.angle);

			x  = x + dx;
			dx = dx + segment.curve;
			
			segment.dx = x;
			
			if ((segment.p1.camera.z <= gsAction.m_cameraDepth) || 		// behind us
				(segment.p2.screen.y >= segment.p1.screen.y) || 		// back face cull
				(segment.p2.screen.y >= maxy)) {                		// clip by (already rendered) segment
				segment.clipLevel = maxy;
				continue;
			}
			maxy = segment.p2.screen.y;
			segment.draw = true;
			segment.clipLevel = segment.p1.screen.y;

			if (segment.p1.screen.y < miny) miny = segment.p1.screen.y;
			if (segment.p2.screen.y < miny) miny = segment.p2.screen.y;
		}
		
		gsAction.m_background.DrawHillBG(miny);
		
		for(var n=DRAW_DISTANCE-1; n>=-1; n--) {
			var index = (baseSegment.index + n) % this.m_segments.length;
			if (index < 0) index += this.m_segments.length;
			segment = this.m_segments[index];
			this.DrawSegment(segment, n);
			
			
			
			for (var i=0; i<gsAction.m_spikes.length; i++) {
				var spikeSegment = this.FindSegment(gsAction.m_spikes[i].m_z);
				if (segment == spikeSegment) {
					if (gsAction.m_spikes[i].m_z >= gsAction.m_car.m_z) {
						gsAction.m_spikes[i].Draw(segment.clipLevel);
					}
				}
			}
			for (var i=0; i<gsAction.m_obstacles.length; i++) {
				var obstacleSegment = this.FindSegment(gsAction.m_obstacles[i].m_z);
				if (segment == obstacleSegment) {
					if (gsAction.m_obstacles[i].m_z >= gsAction.m_car.m_z) {
						gsAction.m_obstacles[i].Draw(segment.clipLevel);
					}
				}
			}
			for (var i=0; i<gsAction.m_fragments.length; i++) {
				var fragmentSegment = this.FindSegment(gsAction.m_fragments[i].m_z);
				if (segment == fragmentSegment) {
					if (gsAction.m_fragments[i].m_z >= gsAction.m_car.m_z) {
						gsAction.m_fragments[i].Draw();
					}
				}
			}
			for (var i=0; i<gsAction.m_powerUps.length; i++) {
				var powerSegment = this.FindSegment(gsAction.m_powerUps[i].m_z);
				if (segment == powerSegment) {
					if (gsAction.m_powerUps[i].m_z >= gsAction.m_car.m_z) {
						gsAction.m_powerUps[i].Draw(segment.clipLevel);
					}
				}
			}
			for (var i=0; i<gsAction.m_enemies.length; i++) {
				var enemySegment = this.FindSegment(gsAction.m_enemies[i].m_z);
				if (segment == enemySegment && n > 0) {
					if (gsAction.m_enemies[i].m_z >= gsAction.m_car.m_z) {
						gsAction.m_enemies[i].Draw(segment.clipLevel);
					}
				}
			}
			for (var i=0; i<NUMBER_OF_TOURIST; i++) {
				var touristSegment = this.FindSegment(gsAction.m_tourist[i].m_z);
				if (segment == touristSegment && n > 0) {
					if (gsAction.m_tourist[i].m_z >= gsAction.m_car.m_z) {
						gsAction.m_tourist[i].Draw(segment.clipLevel);
					}
				}
			}
			var policeSegment = this.FindSegment(gsAction.m_police.m_z);
			if (segment == policeSegment && n > 0) {
				if (gsAction.m_police.m_z >= gsAction.m_car.m_z) {
					gsAction.m_police.Draw(segment.clipLevel);
				}
			}
			
			
			
			if (segment == playerSegment) {
				gsAction.m_car.Draw();
			}
			
			
			for (var i=0; i<gsAction.m_spikes.length; i++) {
				var spikeSegment = this.FindSegment(gsAction.m_spikes[i].m_z);
				if (segment == spikeSegment && n > 0) {
					if (gsAction.m_spikes[i].m_z < gsAction.m_car.m_z) {
						gsAction.m_spikes[i].Draw(segment.clipLevel);
					}
				}
			}
			for (var i=0; i<gsAction.m_obstacles.length; i++) {
				var obstacleSegment = this.FindSegment(gsAction.m_obstacles[i].m_z);
				if (segment == obstacleSegment && n > 0) {
					if (gsAction.m_obstacles[i].m_z < gsAction.m_car.m_z) {
						gsAction.m_obstacles[i].Draw(segment.clipLevel);
					}
				}
			}
			for (var i=0; i<gsAction.m_powerUps.length; i++) {
				var powerSegment = this.FindSegment(gsAction.m_powerUps[i].m_z);
				if (segment == powerSegment && n > 0) {
					if (gsAction.m_powerUps[i].m_z < gsAction.m_car.m_z) {
						gsAction.m_powerUps[i].Draw(segment.clipLevel);
					}
				}
			}
			for (var i=0; i<gsAction.m_enemies.length; i++) {
				var enemySegment = this.FindSegment(gsAction.m_enemies[i].m_z);
				if (segment == enemySegment && n > 0) {
					if (gsAction.m_enemies[i].m_z < gsAction.m_car.m_z) {
						gsAction.m_enemies[i].Draw(segment.clipLevel);
					}
				}
			}
			for (var i=0; i<NUMBER_OF_TOURIST; i++) {
				var enemySegment = this.FindSegment(gsAction.m_tourist[i].m_z);
				if (segment == enemySegment && n > 0) {
					if (gsAction.m_tourist[i].m_z < gsAction.m_car.m_z) {
						gsAction.m_tourist[i].Draw(segment.clipLevel);
					}
				}
			}
			var policeSegment = this.FindSegment(gsAction.m_police.m_z);
			if (segment == policeSegment && n > 0) {
				if (gsAction.m_police.m_z < gsAction.m_car.m_z) {
					gsAction.m_police.Draw(segment.clipLevel);
				}
			}
			for (var i=0; i<gsAction.m_fragments.length; i++) {
				var fragmentSegment = this.FindSegment(gsAction.m_fragments[i].m_z);
				if (segment == fragmentSegment) {
					if (gsAction.m_police.m_z < gsAction.m_car.m_z) {
						gsAction.m_fragments[i].Draw();
					}
				}
			}
			
			
			var heliSegment = this.FindSegment(gsAction.m_helicopter.m_z);
			if (segment == heliSegment && n > 0) {
				gsAction.m_helicopter.Draw(segment.clipLevel);
			}
		}
	}
	
	this.DrawSegment = function(segment, index) {
		var part = (segment.p1.screen.y - segment.p2.screen.y) / TEXTURE_SPLIT;
		if (part > 0 && segment.draw) {
			var splitNumber = Math.ceil (part);
			var sourceStep = TEXTURE_HEIGHT / part;
			
			for (var i=0; i<splitNumber; i++) {
				var sourceY = (i * sourceStep) >> 0;
				if (sourceY > TEXTURE_HEIGHT - 2) {
					sourceY = TEXTURE_HEIGHT - 2;
				}
				var sourceH = sourceStep >> 0;
				if (sourceY + sourceH > TEXTURE_HEIGHT) {
					sourceH = TEXTURE_HEIGHT - sourceY;
				}
				else if (sourceH <= 0) {
					sourceH = 1;
				}
				var destX = (segment.p2.screen.x + (segment.p1.screen.x - segment.p2.screen.x) * (i / splitNumber)) >> 0;
				var destW = (segment.p2.screen.w + (segment.p1.screen.w - segment.p2.screen.w) * (i / splitNumber)) >> 0;
				var destY = segment.p2.screen.y + TEXTURE_SPLIT * i;
				var destH = TEXTURE_SPLIT;
				if (i == splitNumber - 1) {
					destH = segment.p1.screen.y - destY + 1;
				}
				
				
				if (destH > 0) {
					g_graphicEngine.Draw (g_context, segment.texture, 0, sourceY, TEXTURE_WIDTH, sourceH, destX-destW, destY, destW * 2, destH);
				}
			}
		}
		
		if (segment.entity) {
			var entityX = segment.p2.screen.x + segment.entity.m_x * segment.p2.screen.w;
			var entityY = segment.p2.screen.y + segment.entity.m_y * segment.p2.screen.w;
			var entitySW = g_graphicEngine.GetImage(segment.entity.m_image).width;
			var entitySH = g_graphicEngine.GetImage(segment.entity.m_image).height;
			var entityDW = entitySW * segment.p2.screen.scale * segment.entity.m_scale;
			var entityDH = entitySH * segment.p2.screen.scale * segment.entity.m_scale;
			
			if (segment.entity.m_invert) {
				g_graphicEngine.Draw (
					g_context, 
					segment.entity.m_image, 
					0, 
					0, 
					entitySW, 
					entitySH, 
					entityX - entityDW * 0.5 + entityDW - entitySW, 
					entityY - entityDH, 
					entityDW, 
					entityDH, 1, true
				);
			}
			else {
				g_graphicEngine.Draw (
					g_context, 
					segment.entity.m_image, 
					0, 
					0, 
					entitySW, 
					entitySH, 
					entityX - entityDW * 0.5, 
					entityY - entityDH, 
					entityDW, 
					entityDH
				);
			}
			
			if (DRAW_COLLIDER) {
				for (var i=0; i<segment.entity.m_collisionRect.length; i++) {
					var debugX = entityX + (segment.entity.m_collisionRect[i][0] - segment.entity.m_x) * segment.p2.screen.w;
					var debugY = entityY - 0.2 * segment.p2.screen.w;
					var debugW = (segment.entity.m_collisionRect[i][1] - segment.entity.m_collisionRect[i][0]) * segment.p2.screen.w;
					var debugH = 0.2 * segment.p2.screen.w;
					g_graphicEngine.DrawRectRGB (g_context, debugX, debugY, debugW, debugH, 1000 * segment.p2.screen.scale, 255, 0, 0, 1);
				}
			}
		}
		
		if (segment.building) {
			var p1x = segment.p2.screen.x + segment.building.m_x * segment.p2.screen.w;
			var p1y = segment.p2.screen.y;
			if (p1y > segment.clipLevel) p1y = segment.clipLevel;
				
			var p2x = p1x;
			var p2y = p1y - segment.building.m_h * segment.p2.screen.w;
			var p3x = 0;
			if (segment.building.m_x < 0) {
				p3x = p1x - segment.building.m_w * segment.p2.screen.w;
			}
			else {
				p3x = p1x + segment.building.m_w * segment.p2.screen.w;
			}
			var p3y = p2y;
			var p4x = p3x;
			var p4y = p1y;
			
			g_graphicEngine.DrawPolygonRGB (g_context, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y, segment.building.m_color1[0], segment.building.m_color1[1], segment.building.m_color1[2], 1);
			
			var baseSegment = this.FindSegment(gsAction.m_cameraZ);
			var segment2 = this.FindSegment(segment.p2.world.z + segment.building.m_w * ROAD_WIDTH);
			var leftOver = segment.p2.world.z + segment.building.m_w * ROAD_WIDTH - segment2.p2.world.z;
			var newX = Interpolate(segment2.p1.world.x, segment2.p2.world.x, leftOver / SEGMENT_LENGTH);
			var newY = Interpolate(segment2.p1.world.y, segment2.p2.world.y, leftOver / SEGMENT_LENGTH);
			var pos2 = {
				world: {
					x: newX,
					y: newY, 
					z: segment2.p2.world.z + leftOver,
				}, 
				camera: {}, 
				screen: {} 
			}
			Project(pos2, (gsAction.m_cameraX * ROAD_WIDTH) - segment.dx, gsAction.m_cameraY, gsAction.m_cameraZ - (segment.looped ? this.m_trackLength : 0), gsAction.m_cameraDepth, CANVAS_W, CANVAS_H * 0.9, ROAD_WIDTH, baseSegment.angle);
			p4x = pos2.screen.x + segment.building.m_x * pos2.screen.w;
			p4y = pos2.screen.y;
			p3x = p4x;
			p3y = p4y - segment.building.m_h * pos2.screen.w;
			
			if (segment.building.m_x < 0) {
				if (p4x > p1x) {
					g_graphicEngine.DrawPolygonRGB (g_context, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y, segment.building.m_color2[0], segment.building.m_color2[1], segment.building.m_color2[2], 1);
				}
			}
			else {
				if (p4x < p1x) {
					g_graphicEngine.DrawPolygonRGB (g_context, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y, segment.building.m_color2[0], segment.building.m_color2[1], segment.building.m_color2[2], 1);
				}
			}
			
		}
		
		if (segment.tunnel > 0 && index > -1) {
			if (segment.tunnel < 4) {
				var color1, color2;
				if (segment.tunnel == 1) {
					color1 = data.m_tunnelColor[0];
					color2 = data.m_tunnelColor[0];
				}
				else if (segment.tunnel == 2) {
					color1 = data.m_tunnelColor[1];
					color2 = data.m_tunnelColor[2];
				}
				else if (segment.tunnel == 3) {
					color1 = data.m_tunnelColor[3];
					color2 = data.m_tunnelColor[4];
				}

				//Roof
				var destX = segment.p2.screen.x - (1 + data.m_tunnelWidth) * segment.p2.screen.w;
				var destY = segment.p2.screen.y - (TUNNEL_HEIGHT + TUNNEL_ROOF_H) * segment.p2.screen.w;
				var destW = 2 * (1 + data.m_tunnelWidth) * segment.p2.screen.w;
				var destH = TUNNEL_ROOF_H * segment.p2.screen.w;
				if (!segment.draw && destY + destH > segment.clipLevel) {
					destH = segment.clipLevel - destY;
				}
				if (destH > 0) {
					g_graphicEngine.FillCanvasRGB(
						g_context,
						destX,
						destY,
						destW,
						destH,
						color1[0],
						color1[1],
						color1[2]
					);
				}
				
				destX = segment.p2.screen.x - (1 + data.m_tunnelWidth) * segment.p2.screen.w;
				destY = segment.p2.screen.y - TUNNEL_HEIGHT * segment.p2.screen.w - 1;
				destW = data.m_tunnelWidth * segment.p2.screen.w;
				destH = TUNNEL_HEIGHT * segment.p2.screen.w + 1;
				
				if (!segment.draw && destY + destH > segment.clipLevel) {
					destH = segment.clipLevel - destY;
				}
				if (destH > 0) {
					// Left wall
					g_graphicEngine.FillCanvasRGB(
						g_context,
						destX,
						destY,
						destW,
						destH,
						color2[0],
						color2[1],
						color2[2]
					);
					
					destX = segment.p2.screen.x + segment.p2.screen.w;
					// Right wall
					g_graphicEngine.FillCanvasRGB(
						g_context,
						destX,
						destY,
						destW,
						destH,
						color2[0],
						color2[1],
						color2[2]
					);
				}
			}
		}
		
		
		if (index > FOG_DISTANCE) {
			if (data.m_fogIntensity == 0) {
				if (segment.draw) {
					g_graphicEngine.DrawPolygonRGB(
						g_context, 
						segment.p1.screen.x-segment.p1.screen.w, 
						segment.p1.screen.y, 
						segment.p1.screen.x+segment.p1.screen.w, 
						segment.p1.screen.y,
						segment.p2.screen.x+segment.p2.screen.w,
						segment.p2.screen.y,
						segment.p2.screen.x-segment.p2.screen.w,
						segment.p2.screen.y,
						data.m_fogColor[0],
						data.m_fogColor[1],
						data.m_fogColor[2],
						(1-segment.fog)
					);
				}
			}
			else {
				g_graphicEngine.FillCanvasRGB (
					g_context,
					null,
					null,
					null,
					null,
					data.m_fogColor[0],
					data.m_fogColor[1],
					data.m_fogColor[2],
					data.m_fogIntensity
				);
			}
		}
	}
	
	this.GetRumbleWidth = function(projectedRoadWidth, lanes) { 
		return projectedRoadWidth / Math.max(6, 2*lanes);
	}
	
	this.GetLaneMarkerWidth = function(projectedRoadWidth, lanes) {
		return projectedRoadWidth / Math.max(32, 8*lanes);
	}
	
	this.SpawnObstacles = function () {
		for (var i=0; i<data.m_obstacle.length; i++) {
			gsAction.SpawnObstacle (data.m_obstacle[i].m_type, data.m_obstacle[i].m_x, data.m_obstacle[i].m_z * SEGMENT_LENGTH);
		}
	}
}