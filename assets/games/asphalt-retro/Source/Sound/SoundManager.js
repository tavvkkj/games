var AUDIO_ENABLE = false;


window.AudioContext = (
	window.AudioContext ||
	window.webkitAudioContext ||
	window.mozAudioContext || 
	window.oAudioContext || 
	window.msAudioContext ||
	null
);
if (AudioContext) {
	AUDIO_ENABLE = true;
}

function SoundManager () {
	this.m_disableActionSound = false;
	this.m_disableAmbientSound = false;
	
	if (AUDIO_ENABLE) {
		var ctx = new AudioContext();
		var sfxVolume = ctx.createGain(); sfxVolume.connect(ctx.destination);
		var musicVolume = ctx.createGain(); musicVolume.connect(ctx.destination);
		var uiVolume = ctx.createGain(); uiVolume.connect(ctx.destination);
		
		var numberOfSound = 0;
		var numberOfSoundLoaded = 0;
		
		var soundNodeArray = new Array();
		var bufferArray = new Array();
		
		this.LoadSound = function (path) {
			if (bufferArray[path] == null) {
				var replacedPath = path;
				if(navigator.appVersion.indexOf("Edg") != -1 || navigator.appVersion.indexOf("UCB") != -1) {
					replacedPath = path.substring(0, path.length - 3);
					replacedPath += "mp3";
				}
					
				var request = new XMLHttpRequest();
				request.open("GET", replacedPath, true);
				request.responseType = "arraybuffer";
				request.onload = function(e) {
					ctx.decodeAudioData(
						request.response,
						function(buffer) {
							if (!buffer) {
								return;
							}
							bufferArray [path] = buffer;
							numberOfSoundLoaded ++;
						},
						function(error) {
							console.error('decodeAudioData error ', error);
						}
					);
				};
				request.send();
				bufferArray[path] = 0;
				numberOfSound ++;
			}
		}
		
		this.CreateSource = function (path) {
			var source = ctx.createBufferSource();
			source.buffer = bufferArray[path];
			return source;
		}
		this.CreateVolume = function () {
			return ctx.createGain();
		}
		this.CreatePanner = function () {
			return ctx.createPanner();
		}
		
		this.ConnectToSFX = function (node) {
			node.connect(sfxVolume);
		}
		this.ConnectToMusic = function (node) {
			node.connect(musicVolume);
		}
		this.ConnectToUI = function (node) {
			node.connect(uiVolume);
		}
		
		this.DisconnectFromSFX = function (node) {
			node.disconnect(sfxVolume);
		}
		this.DisconnectFromMusic = function (node) {
			node.disconnect(musicVolume);
		}
		this.DisconnectFromUI = function (node) {
			node.disconnect(uiVolume);
		}
		
		this.AddSoundNode = function (node) {
			soundNodeArray.push (node);
		}
		this.StopSoundNode = function () {
			for (var i=0; i<soundNodeArray.length; i++) {
				soundNodeArray[i].Clear();
			}
		}
		
		this.GetContext = function() {
			return ctx;
		}
		this.GetBuffer = function(path) {
			return bufferArray[path];
		}
		
		
		var normalSoundNodeArray = new Array();
		this.LoadNormalSound = function (filename) {
			var audio = new Audio();
			audio.src = filename;
			audio.play();
			audio.pause();
			audio.oncanplaythrough = function () {
				numberOfSoundLoaded ++;
			}
			numberOfSound ++;
			return audio;
		}
		this.AddNormalSound = function (sound) {
			normalSoundNodeArray.push (sound);
		}
		

		
		this.GetProgress = function () {
			if (numberOfSound > 0) {
				return numberOfSoundLoaded / numberOfSound;
			}
			else {
				return 1;
			}
		}
		this.SetVolume = function (sfx, music, ui) {
			sfxVolume.gain.value = sfx;
			musicVolume.gain.value = music;
			uiVolume.gain.value = ui;
			
			for (var i=0; i<normalSoundNodeArray.length; i++) {
				normalSoundNodeArray[i].SetVolume(music);
			}
		}
		this.Update = function (deltaTime) {
			for (var i=0; i<soundNodeArray.length; i++) {
				soundNodeArray[i].Update(deltaTime);
			}
			for (var i=0; i<normalSoundNodeArray.length; i++) {
				normalSoundNodeArray[i].Update(deltaTime);
			}
		}
		
		this.ResumeOnMobile = function () {
			if (ctx.state !== 'running') {
				if (typeof ctx.resume === "function") {
					ctx.resume();
				}
			}
		}
		
		this.Pause = function () {
			ctx.suspend();
		}
	}
	else {
		this.LoadSound = function (path) {
		
		}
		this.GetBuffer = function(path) {
			
		}
		this.GetContext = function() {
			
		}
		this.GetProgress = function () {
			return 1;
		}
		this.CreateSource = function (path) {
		
		}
		this.CreateVolume = function () {
			
		}
		this.CreatePanner = function () {
			
		}
		this.ConnectToSFX = function (node) {
		
		}
		this.ConnectToMusic = function (node) {
		
		}
		this.ConnectToUI = function (node) {
		
		}
		this.AddSoundNode = function (node) {
		
		}
		this.Update = function (deltaTime) {
		
		}
		this.StopSoundNode = function () {
		
		}
		this.SetVolume = function (sfx, music, ui) {
		
		}
		this.ResumeOnMobile = function () {
			
		}
	}
}

var g_soundManager = new SoundManager();