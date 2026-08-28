function LoadAllActionImages() {
	g_graphicEngine.LoadImage("Images/GSAction/Background/NewYork.png");
	g_graphicEngine.LoadImage("Images/GSAction/Background/Paris.png");
	g_graphicEngine.LoadImage("Images/GSAction/Background/Tokyo.png");
	g_graphicEngine.LoadImage("Images/GSAction/Background/London.png");
	g_graphicEngine.LoadImage("Images/GSAction/Background/Siracusa.png");
	g_graphicEngine.LoadImage("Images/GSAction/Background/Luxor.png");
	g_graphicEngine.LoadImage("Images/GSAction/Background/Vladivostok.png");
	g_graphicEngine.LoadImage("Images/GSAction/Background/Route66.png");
	
	for (var i=1; i<=8; i++) {
		for (var j=1; j<=3; j++) {
			g_graphicEngine.LoadImage("Images/GSAction/Cars/Car_" + i + "_" + j + ".png");
		}
	}
	g_graphicEngine.LoadImage("Images/GSAction/Cars/Car_Police.png");
	g_graphicEngine.LoadImage("Images/GSAction/Cars/Car_Tourist.png");
	g_graphicEngine.LoadImage("Images/GSAction/Cars/CarPos.png");
	g_graphicEngine.LoadImage("Images/GSAction/Cars/EMP.png");
	g_graphicEngine.LoadImage("Images/GSAction/Cars/HeadLight.png");
	g_graphicEngine.LoadImage("Images/GSAction/Cars/Nitro.png");
	g_graphicEngine.LoadImage("Images/GSAction/Cars/Scratch.png");
	
	g_graphicEngine.LoadImage("Images/GSAction/Effect/Dust.png");
	
	g_graphicEngine.LoadImage("Images/GSAction/Entities/Finish.png");
	g_graphicEngine.LoadImage("Images/GSAction/Entities/NewYork_Light.png");
	g_graphicEngine.LoadImage("Images/GSAction/Entities/Paris_Light.png");
	g_graphicEngine.LoadImage("Images/GSAction/Entities/Tokyo_Light_1.png");
	g_graphicEngine.LoadImage("Images/GSAction/Entities/Tokyo_Light_2.png");
	
	g_graphicEngine.LoadImage("Images/GSAction/Helicopter/Helicopter.png");
	g_graphicEngine.LoadImage("Images/GSAction/Helicopter/HeliLaser.png");
	g_graphicEngine.LoadImage("Images/GSAction/Helicopter/HeliEmpExplode.png");
	
	g_graphicEngine.LoadImage("Images/GSAction/Obstacle/RoadBlock.png");
	g_graphicEngine.LoadImage("Images/GSAction/Obstacle/RoadBlock_1.png");
	g_graphicEngine.LoadImage("Images/GSAction/Obstacle/RoadBlock_2.png");
	g_graphicEngine.LoadImage("Images/GSAction/Obstacle/RoadBlock_3.png");
	g_graphicEngine.LoadImage("Images/GSAction/Obstacle/VLC.png");
	g_graphicEngine.LoadImage("Images/GSAction/Obstacle/VLC_1.png");
	g_graphicEngine.LoadImage("Images/GSAction/Obstacle/VLC_2.png");
	g_graphicEngine.LoadImage("Images/GSAction/Obstacle/VLC_3.png");
	
	g_graphicEngine.LoadImage("Images/GSAction/PowerUp/Diplomatic.png");
	g_graphicEngine.LoadImage("Images/GSAction/PowerUp/Money.png");
	g_graphicEngine.LoadImage("Images/GSAction/PowerUp/Nitro.png");
	
	for (var i=1; i<=8; i++) {
		for (var j=1; j<=2; j++) {
			g_graphicEngine.LoadImage("Images/GSAction/Road/Road_" + i + "_" + j + ".png");
		}
	}
	
	g_graphicEngine.LoadImage("Images/GSAction/RoadSpike/RoadSpike.png");
	
	g_graphicEngine.LoadImage("Images/GSAction/UI/CountNumber.png");
	g_graphicEngine.LoadImage("Images/GSAction/UI/Dollar.png");
	g_graphicEngine.LoadImage("Images/GSAction/UI/DownArrow.png");
	g_graphicEngine.LoadImage("Images/GSAction/UI/Go.png");
	g_graphicEngine.LoadImage("Images/GSAction/UI/Nitro.png");
	g_graphicEngine.LoadImage("Images/GSAction/UI/TurnSign.png");
	g_graphicEngine.LoadImage("Images/GSAction/UI/Wanted.png");
}