var sound, canvas;
var soundLength = 180.0;
var fps = 320;

var MinFreq = 20;
var MaxFreq = 15000;
var FreqStep = 10;

var fromCol;
var toCol;

function preload()
{
	//sound = loadSound("sweep.wav");	
	sound = loadSound("Sonmi451 - AI-13- Nachtmuziek - 05 Inner Structure_01.mp3");
}

function setup() 
{
	canvas = createCanvas(windowWidth, windowHeight);
	background(0);
	frameRate(fps);
	
	//soundLength = sound.duration();
	sound.amp(1.0);
	fft = new p5.FFT(0, 2048);
	
	canvas.mouseClicked(function()
	{
		if (sound.isPlaying())
			sound.pause();
		else 
			sound.play();
	});	
	
	fromCol = color(0, 0, 100);
	toCol = color(255, 255, 0);
}

function draw() 
{	
	var rectWidth = 1;//(soundLength * fps) / windowWidth;
	var rectHeight = (MaxFreq - MinFreq) / (windowHeight);
	if (sound.isPlaying() && sound.currentTime() <= soundLength)
	{
		var spectrum = fft.analyze();
		noStroke();
		for (var i = MinFreq; i< MaxFreq; i += FreqStep)
		{
			var x = map(sound.currentTime(), 0, soundLength, 0, windowWidth);
			var y = map(i, MinFreq, MaxFreq, windowHeight, 0);
			var c = constrain(fft.getEnergy(i), 0, 255);
			var l = map(c, 0, 255, 0.0, 1.0);
			var col = lerpColor(fromCol, toCol, l);
			fill(col);
			rect(x, y, rectWidth, rectHeight);
		}
	}
}