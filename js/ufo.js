var ufoCanWidth = 1280;
var ufoCanHeight = 720;

// var ufoCanWidth = (canvas.width = window.innerWidth);
// var ufoCanHeight = (canvas.height = window.innerHeight);

var canvasUfo = document.getElementById('canvas-ufo');
canvasUfo.width = ufoCanWidth;
canvasUfo.height = ufoCanHeight;
var ctx3 = canvasUfo.getContext('2d');

// var ufoMove = Math.floor(Math.random() * 1000);

var ufoX = 200; // position on screen
var ufoY = 30; // position on screen

var ufoSrcX;
var ufoSrcY;

var ufoSheetWidth = 2240;
var ufoSheetHeight = 377;

// var ufoFrameCount = 8;

var ufoCols = 8;
var ufoRows = 3;

var ufoWidth = ufoSheetWidth / ufoCols;
var ufoHeight = ufoSheetHeight / ufoRows;

var ufoCurrentFrame = 0;

var ufoCharacter = new Image();
ufoCharacter.src = './images/sprites/sprite-ufo-background.png';

function updateFrameUfo() {
  ufoCurrentFrame = ++ufoCurrentFrame % ufoCols;
  ufoSrcX = ufoCurrentFrame * ufoWidth;
  ctx3.clearRect(ufoX, ufoY, ufoWidth, ufoHeight);
  ufoSrcY = 0;
}

function drawImageUfo() {
  updateFrameUfo();
  ctx3.drawImage(ufoCharacter, ufoSrcX, ufoSrcY, ufoWidth, ufoHeight, ufoX, ufoY, ufoWidth, ufoHeight);
}

setInterval(function() {
  drawImageUfo();
}, 100);
