var CANVAS_W = 240;
var CANVAS_H = 320;
var CANVAS_H_WITH_BUTTON = 404

var INPUT_W = 140;
var INPUT_H = 13;
var INPUT_Y = 100;

var g_canvas           = null;
var g_inputName		   = null;
var g_context          = null;
var g_graphicEngine    = null;
var g_particleEngine   = null;
var g_inputEngine      = null;
var g_stateEngine      = null;


function IsMobile() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};


function CreateCanvas() {
	g_inputName = document.getElementById("inputName");
	g_canvas = document.getElementById("canvas");
	g_context = g_canvas.getContext("2d");
	g_canvas.width  = CANVAS_W;
	if (IsMobile()) {
		g_canvas.height = CANVAS_H_WITH_BUTTON;
	}
	else {
		g_canvas.height = CANVAS_H;
	}
	g_canvas.style.position = "absolute";
	g_inputName.style.position = "absolute";
	g_inputName.style.display = "none";
	document.body.appendChild (g_canvas);
	
	g_context['imageSmoothingEnabled'] 			= false;    /* standard */
    g_context['mozImageSmoothingEnabled'] 		= false;    /* Firefox */
    g_context['oImageSmoothingEnabled'] 		= false;    /* Opera */
    g_context['webkitImageSmoothingEnabled'] 	= false; 	/* Safari */
    g_context['msImageSmoothingEnabled'] 		= false;    /* IE */
}

function ResizeCanvas () {
	var windowW = 0;
	var windowH = 0;
	var canvasW = 0;
	var canvasH = 0;
	var canvasT = 0;
	var canvasL = 0;
	var touchScale = 0;
	
	if (window.innerWidth) windowW = window.innerWidth;
	else if (document.documentElement && document.documentElement.clientWidth) windowW = document.documentElement.clientWidth;
	else if (document.body)	windowW = document.body.clientWidth;

	if (window.innerHeight) windowH = window.innerHeight;
	else if (document.documentElement && document.documentElement.clientHeight) windowH = document.documentElement.clientHeight;
	else if (document.body) windowH = document.body.clientHeight;
	
	if (IsMobile()) {
		canvasH = (windowH < windowW * (CANVAS_H_WITH_BUTTON / CANVAS_W))? windowH : ((windowW * (CANVAS_H_WITH_BUTTON / CANVAS_W) + 0.5) >> 0);
		canvasW = (canvasH * (CANVAS_W / CANVAS_H_WITH_BUTTON) + 0.5) >> 0;
	}
	else {
		canvasH = (windowH < windowW * (CANVAS_H / CANVAS_W))? windowH : ((windowW * (CANVAS_H / CANVAS_W) + 0.5) >> 0);
		canvasW = (canvasH * (CANVAS_W / CANVAS_H) + 0.5) >> 0;
	}

	
	canvasT = 0;
	canvasL = (windowW - canvasW) * 0.5;
	
	g_canvas.style.width  = canvasW + "px";
	g_canvas.style.height = canvasH + "px";
	g_canvas.style.top = canvasT + "px";
	g_canvas.style.left = canvasL + "px";
	
	touchScale = 1 / (canvasW / CANVAS_W);
	if (g_inputEngine) g_inputEngine.SetMouseScale (touchScale);
	
	g_inputName.style.width  = ((INPUT_W / touchScale) >> 0) + "px";
	g_inputName.style.height = ((INPUT_H / touchScale) >> 0) + "px";
	g_inputName.style.top = ((INPUT_Y / touchScale) >> 0) + "px";
	g_inputName.style.left = canvasL + (((canvasW - (INPUT_W / touchScale)) * 0.5) >> 0) + "px";
	
	g_inputName.style.fontSize = (((canvasW / CANVAS_W) * 80) >> 0) + "%";
}


function Init() {
	g_graphicEngine  = new GraphicEngine();
	g_particleEngine = new ParticleEngine();
	g_inputEngine    = new InputEngine();
	g_stateEngine    = new StateEngine();
	
	CreateCanvas();
	g_inputEngine.AddEventListener (g_canvas);
	ResizeCanvas();
	
	g_stateEngine.SetContext(g_context, g_graphicEngine);
	g_particleEngine.SetContext(g_context, g_graphicEngine);
	
	window.onresize = ResizeCanvas;
}

Init();







var g_gsLoader;
var g_gsMenu;
var g_gsMapSelect;
var g_gsCarSelect;
var g_gsAction;
var g_gsInGameMenu;
var g_gsResult;
var g_gsOption;
var g_gsLegal;
var g_gsAbout;
var g_gsHelp;
var g_gsLeaderboard;


var g_sound;

function LoadAllState () {
	g_gsMenu = new GSMenu();
	g_gsMapSelect = new GSMapSelect();
	g_gsCarSelect = new GSCarSelect();
	g_gsAction = new GSAction();
	g_gsInGameMenu = new GSInGameMenu();
	g_gsResult = new GSResult();
	g_gsOption = new GSOption();
	g_gsLegal = new GSLegal();
	g_gsAbout = new GSAbout();
	g_gsHelp = new GSHelp();
	//g_gsLeaderboard = new GSLeaderboard();
	
	g_sound = new Sound();
	
	LoadAllActionImages();
}


function GoToLoaderState () {
	g_gsLoader = new GSLoader();
	g_gsLoader.Init();
	g_stateEngine.SwitchState (g_gsLoader, 0);
}

function GoToMainMenu (skipSound) {
	g_gsMenu.Init(skipSound);
	g_stateEngine.SwitchState (g_gsMenu, 0);
}

function GoToActionPhase() {
	g_gsAction.Init();
	g_stateEngine.SwitchState (g_gsAction, 0);
}

function GoToMapSelect() {
	g_gsMapSelect.Init();
	g_stateEngine.SwitchState (g_gsMapSelect, 0);
}

function GoToCarSelect() {
	g_gsCarSelect.Init();
	g_stateEngine.SwitchState (g_gsCarSelect, 0);
}

function GoToResult() {
	g_gsResult.Init();
	g_stateEngine.SwitchState (g_gsResult, 0);
}

function GoToOption() {
	g_gsOption.Init();
	g_stateEngine.SwitchState (g_gsOption, 0);
}

function GoToLegal() {
	g_gsLegal.Init();
	g_stateEngine.SwitchState (g_gsLegal, 0);
}

function GoToAbout() {
	g_gsAbout.Init();
	g_stateEngine.SwitchState (g_gsAbout, 0);
}
function GoToHelp() {
	g_gsHelp.Init();
	g_stateEngine.SwitchState (g_gsHelp, 0);
}
function GoToLeaderboard() {
	g_gsLeaderboard.Init();
	g_stateEngine.SwitchState (g_gsLeaderboard, 0);
}





var isInGameMenu = false;
function PushInGameMenu() {
	isInGameMenu = true;
	g_gsInGameMenu.Init();
	g_stateEngine.PushState (g_gsInGameMenu, 0);
}

function PopState() {
	isInGameMenu = false;
	g_stateEngine.PopState();
}

g_stateEngine.Start();
GoToLoaderState();