//======================================================
var Obstacle = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

Obstacle.prototype.draw = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
};
// =============================================================
// function startGame() {

var currentGame = [];

var leftWall = new Obstacle(0, 0, 30, 720);
var rightWall = new Obstacle(1250, 0, 30, 720);

currentGame.push(leftWall, rightWall);

function drawObstacle() {
  // Called inside background.js
  currentGame.forEach(function(key) {
    key.draw();
  });
}

// }
//----------------->>>>>>
// startGame();
// =============================================================

function canMove(futureX, futureY) {
  var canIMove = true;
  currentGame.forEach(function(key) {
    if (futureX >= key.x && futureX <= key.x + key.width && (futureY >= key.y && futureY <= key.y + key.height)) {
      canIMove = false;
      console.log('ouch');
    }
  });
  return canIMove;
}
//===================================================================

document.onkeydown = function(event) {
  if (event.which === 37 || event.which === 39) {
    event.preventDefault();
  }
  var directionCode = event.which;

  //----- Next Step -----
  // ctx.clearRect(x, y, width, height);
  switch (directionCode) {
    case 37:
      if (canMove(x - 10, y)) {
        moveLeft();
      }
      break;

    case 39:
      if (canMove(x + 80, y)) {
        moveRight();
      }
      break;

    default:
      console.log('oops');
  } // End Switch
}; // END document.onkeydown
