function CarData() {
	// Move forward
	this.m_accel = 0;
	this.m_topSpeed = 0;
	this.m_nitroAccel = 0;
	this.m_nitroSpeed = 0;
	this.m_brake = 0;
	// Steer
	this.m_sideAccel = 0;
	this.m_sideRelease = 0;
	this.m_sideTopSpeed = 0;
	this.m_driftTopSpeed = 0;
	// Size
	this.m_w = 0.14;
	this.m_h = 0.25;
	// Nitro
	this.m_nitroX = 12;
	this.m_nitroY = 55;
}

var g_carData = [];
// Roadster
g_carData[0] = new CarData();
g_carData[0].m_accel = 16;
g_carData[0].m_topSpeed = 250;
g_carData[0].m_nitroAccel = 100;
g_carData[0].m_nitroSpeed = 303;
g_carData[0].m_brake = 60;
g_carData[0].m_sideAccel = 240;
g_carData[0].m_sideRelease = 90;
g_carData[0].m_sideTopSpeed = 1500;
g_carData[0].m_driftTopSpeed = 2500;
g_carData[0].m_w = 205 / 1400;
g_carData[0].m_h = 350 / 1400;
g_carData[0].m_nitroX = 10;
g_carData[0].m_nitroY = 50;
g_carData[0].m_nitroOffset = 3;
// Exige
g_carData[1] = new CarData();
g_carData[1].m_accel = 21;
g_carData[1].m_topSpeed = 237;
g_carData[1].m_nitroAccel = 100;
g_carData[1].m_nitroSpeed = 296;
g_carData[1].m_brake = 60;
g_carData[1].m_sideAccel = 200;
g_carData[1].m_sideRelease = 80;
g_carData[1].m_sideTopSpeed = 1500;
g_carData[1].m_driftTopSpeed = 2500;
g_carData[1].m_w = 190 / 1400;
g_carData[1].m_h = 320 / 1400;
g_carData[1].m_nitroX = 12;
g_carData[1].m_nitroY = 48;
g_carData[1].m_nitroOffset = 3;
// Corvette
g_carData[2] = new CarData();
g_carData[2].m_accel = 24;
g_carData[2].m_topSpeed = 256;
g_carData[2].m_nitroAccel = 100;
g_carData[2].m_nitroSpeed = 314;
g_carData[2].m_brake = 60;
g_carData[2].m_sideAccel = 250;
g_carData[2].m_sideRelease = 100;
g_carData[2].m_sideTopSpeed = 1500;
g_carData[2].m_driftTopSpeed = 2500;
g_carData[2].m_w = 205 / 1400;
g_carData[2].m_h = 350 / 1400;
g_carData[2].m_nitroX = 16;
g_carData[2].m_nitroY = 50;
g_carData[2].m_nitroOffset = 3;
// Skyline
g_carData[3] = new CarData();
g_carData[3].m_accel = 18;
g_carData[3].m_topSpeed = 269;
g_carData[3].m_nitroAccel = 100;
g_carData[3].m_nitroSpeed = 320;
g_carData[3].m_brake = 60;
g_carData[3].m_sideAccel = 250;
g_carData[3].m_sideRelease = 100;
g_carData[3].m_sideTopSpeed = 1500;
g_carData[3].m_driftTopSpeed = 2500;
g_carData[3].m_w = 205 / 1400;
g_carData[3].m_h = 350 / 1400;
g_carData[3].m_nitroX = 14;
g_carData[3].m_nitroY = 53;
g_carData[3].m_nitroOffset = 3;
// Sagaris
g_carData[4] = new CarData();
g_carData[4].m_accel = 32;
g_carData[4].m_topSpeed = 300;
g_carData[4].m_nitroAccel = 100;
g_carData[4].m_nitroSpeed = 357;
g_carData[4].m_brake = 60;
g_carData[4].m_sideAccel = 400;
g_carData[4].m_sideRelease = 150;
g_carData[4].m_sideTopSpeed = 1500;
g_carData[4].m_driftTopSpeed = 2500;
g_carData[4].m_w = 205 / 1400;
g_carData[4].m_h = 350 / 1400;
g_carData[4].m_nitroX = 20;
g_carData[4].m_nitroY = 48;
g_carData[4].m_nitroOffset = 3;
// Gallardo
g_carData[5] = new CarData();
g_carData[5].m_accel = 23;
g_carData[5].m_topSpeed = 309;
g_carData[5].m_nitroAccel = 100;
g_carData[5].m_nitroSpeed = 360;
g_carData[5].m_brake = 60;
g_carData[5].m_sideAccel = 400;
g_carData[5].m_sideRelease = 150;
g_carData[5].m_sideTopSpeed = 1500;
g_carData[5].m_driftTopSpeed = 2500;
g_carData[5].m_w = 205 / 1400;
g_carData[5].m_h = 350 / 1400;
g_carData[5].m_nitroX = 17;
g_carData[5].m_nitroY = 48;
g_carData[5].m_nitroOffset = 3;
// Ford GT
g_carData[6] = new CarData();
g_carData[6].m_accel = 32;
g_carData[6].m_topSpeed = 320;
g_carData[6].m_nitroAccel = 100;
g_carData[6].m_nitroSpeed = 400;
g_carData[6].m_brake = 60;
g_carData[6].m_sideAccel = 450;
g_carData[6].m_sideRelease = 200;
g_carData[6].m_sideTopSpeed = 1500;
g_carData[6].m_driftTopSpeed = 2500;
g_carData[6].m_w = 205 / 1400;
g_carData[6].m_h = 350 / 1400;
g_carData[6].m_nitroX = 15;
g_carData[6].m_nitroY = 50;
g_carData[6].m_nitroOffset = 3;
// Saleen
g_carData[7] = new CarData();
g_carData[7].m_accel = 32;
g_carData[7].m_topSpeed = 330;
g_carData[7].m_nitroAccel = 100;
g_carData[7].m_nitroSpeed = 430;
g_carData[7].m_brake = 60;
g_carData[7].m_sideAccel = 500;
g_carData[7].m_sideRelease = 130;
g_carData[7].m_sideTopSpeed = 1500;
g_carData[7].m_driftTopSpeed = 2500;
g_carData[7].m_w = 205 / 1400;
g_carData[7].m_h = 350 / 1400;
g_carData[7].m_nitroX = 13;
g_carData[7].m_nitroY = 50;
g_carData[7].m_nitroOffset = 3;