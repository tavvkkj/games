var debugStr = "";
var debugInfo = [];
var debugInterval = -1;//ms
var GTMCheckCount = -1;
var debugEnable = true;//window.location.href.indexOf("debug=1") >= 0 ? true : false;
var showFPS = window.location.href.indexOf("showFPS=1") >= 0 ? true : false;//debugInfo[0]
var showCpu = window.location.href.indexOf("showCpu=1") >= 0 ? true : false;//debugInfo[1]//Est. CPU utilisation
var showImgMem = window.location.href.indexOf("showImgMem=1") >= 0 ? true : false;//debugInfo[2]//Est. image memory
var showRenderer = window.location.href.indexOf("showRenderer=1") >= 0 ? true : false;//debugInfo[3]//Render
var showObjCount = window.location.href.indexOf("showObjCount=1") >= 0 ? true : false;//debugInfo[4]//Object count
var showCollCheck = window.location.href.indexOf("showCollCheck=1") >= 0 ? true : false;//debugInfo[5]//Collision checks/sec
var showPolyCheck = window.location.href.indexOf("showPolyCheck=1") >= 0 ? true : false;//debugInfo[6]//Poly checks/sec
var showMoveCell = window.location.href.indexOf("showMoveCell=1") >= 0 ? true : false;//debugInfo[7]//Moved cell/sec
var showCellCount = window.location.href.indexOf("showCellCount=1") >= 0 ? true : false;//debugInfo[8]//Cell count
var showCanvasSize = window.location.href.indexOf("showCanvasSize=1") >= 0 ? true : false;//debugInfo[9]//Canvas size
var showTimeScale = window.location.href.indexOf("showTimeScale=1") >= 0 ? true : false;//debugInfo[10]//Time scale
var showTime = window.location.href.indexOf("showTime=1") >= 0 ? true : false;//debugInfo[11]//Game Time
var showWallClockTime = window.location.href.indexOf("showWallClockTime=1") >= 0 ? true : false;//debugInfo[12]//Wall clock time
var showTickCount = window.location.href.indexOf("showTickCount=1") >= 0 ? true : false;//debugInfo[13]//Tick count
var showProductKey = window.location.href.indexOf("showProductKey=1") >= 0 ? true : false;
if(window.location.href.indexOf("debugInterval") >= 0)
{
	var url = window.location.href.split("&");
	for(var i = 0; i < url.length; i++)
	{
		if(url[i].indexOf("debugInterval") >= 0)
		{
			debugInterval = parseInt(url[i].split("=")[1]);
			break;
		}
	}
}

function updateDebug()
{
	if(getDebugInfo)
	{
		getDebugInfo(debugInfo);
	}
};
function getDebugStr()
{
	if(debugEnable)
	{
		if(debugInterval <= 0)
			updateDebug();
		debugStr = "";
		if(showFPS)
			debugStr += "fps:" + debugInfo[0] + "\n";
		if(showCpu)
			debugStr += "Est CPU:" + debugInfo[1] + "\n";
		if(showImgMem)
			debugStr += "Est IMG mem:" + debugInfo[2] + "\n";
		if(showRenderer)
			debugStr += "Render:" + debugInfo[3] + "\n";
		if(showObjCount)
			debugStr += "Obj Count:" + debugInfo[4] + "\n";
		if(showCollCheck)
			debugStr += "Collision checks/sec:" + debugInfo[5] + "\n";
		if(showPolyCheck)
			debugStr += "Poly checks/sec:" + debugInfo[6] + "\n";
		if(showMoveCell)
			debugStr += "Moved cell/sec:" + debugInfo[7] + "\n";
		if(showCellCount)
			debugStr += "Cell count:" + debugInfo[8] + "\n";
		if(showCanvasSize)
			debugStr += "Canvas size:" + debugInfo[9] + "\n";
		if(showTimeScale)
			debugStr += "Time scale:" + debugInfo[10] + "\n";
		if(showTime)
			debugStr += "Game time:" + debugInfo[11] + "\n";
		if(showWallClockTime)
			debugStr += "Wall clock time:" + debugInfo[12] + "\n";
		if(showTickCount)
			debugStr += "Tick count:" + debugInfo[13] + "\n";
	}
	return debugStr;
}
function logProductKey()
{
	var len = dataLayer.length;
	for(var i = len - 1;i >= 0; i--)
	{
		if(dataLayer[i].productKey)
		{
			if(i > GTMCheckCount)
			{
				GTMCheckCount = i;
				console.log("check id = " + i +" product key \'" + dataLayer[i].productKey + "\'");
			}
		}
	}
}
if(!showFPS && !showCpu && !showImgMem && !showRenderer && !showObjCount && !showCollCheck && !showPolyCheck && !showMoveCell && !showCellCount && !showCanvasSize && !showTimeScale && !showTime && !showWallClockTime && !showTickCount && !showProductKey)
	debugEnable = false;
if(debugEnable && debugInterval > 0)
	window.setInterval(updateDebug, debugInterval);
if(debugEnable && showProductKey)
	window.setInterval(logProductKey, 2000);
	
// fix bug pre-loading game on chrome zenphone 4 (https://qadb.gameloft.org/Qa/Bugs/View/8755866)
var updatePreLoading = setInterval(
								function() {
									var loading_gif = document.getElementById("loading_gif");
									if(loading_gif)
									{										
										if(window["cr_getC2Runtime"]())
										{
											if(window["cr_getC2Runtime"]().running_layout != null)
											{
												loading_gif.style.display = "none";
												clearInterval(updatePreLoading);
											}
										}
									}
									else
									{
										clearInterval(updatePreLoading);
									}
								},
								100
						);