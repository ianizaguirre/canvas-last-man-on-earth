var canWidth = 1280;
var canHeight = 720;

var canvasCharacter = document.getElementById('canvas-cow');
canvasCharacter.width = canWidth;
canvasCharacter.height = canHeight;
var ctx2 = canvasCharacter.getContext('2d');

var x = 30; // position of character on land
var y = 500;

var srcX;
var srcY;

function moveLeft() {
  left = true;
  x -= 25; // speed of character
}

function moveRight() {
  left = false;
  x += 25; // speed of character
}

var sheetWidth = 864;
var sheetHeight = 280;

var frameCount = 8;

var cols = 8;
var rows = 2;

var left = false;
var right = true;

var trackLeft = 1;
var trackRight = 0;

var width = sheetWidth / cols; // ------- Width of character
var height = sheetHeight / rows; // ------- Height of character

var currentFrame = 0;

var character = new Image();
character.src = './images/sprites/character.png';

function updateFrame() {
  currentFrame = ++currentFrame % cols;
  //ctx2.clearRect(x - 20, y - 20, width + 100, height + 100);
  ctx2.clearRect(x - 70, y - 20, width + 140, height + 100);

  srcX = currentFrame * width;
  if (left) {
    srcY = trackLeft * height;
  } else {
    srcY = trackRight * height;
  }
}

function drawImage() {
  updateFrame();
  ctx2.drawImage(character, srcX, srcY, width, height, x, y, width, height);
}

setInterval(function() {
  drawImage();
}, 100);
