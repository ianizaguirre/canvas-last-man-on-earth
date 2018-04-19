// ====================================================================
//var laserCanvas = document.getElementById('canvas-laser');
// laserCanvas.width = 1280;
// laserCanvas.height = 720;
//var ctx = laserCanvas.getContext('2d');

// ======================CHANGES-MADE====================================
setInterval(updateCanvasLaser, 50);
var frames = 0;
// ====================================================================

var laserBeam = [];

for (var i = 0; i < laserBeam.length; i++) {
  laserBeam[i].update();
}

function Component(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = 110;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function() {
    ctx3.fillStyle = 'red';
    ctx3.fillRect(this.x, this.y, this.width, this.height);
  };
  // function to draw the element in its new position
  // this.newPos = function() {
  //   this.x = +this.speedX;
  //   this.y = +this.speedY;
  // };
  // next 4 lines check the position of the obstacle
  this.left = function() {
    return this.x;
  };
  this.right = function() {
    return this.x + this.width;
  };
  this.top = function() {
    return this.y;
  };
  this.bottom = function() {
    return this.y + this.height;
  };

  this.crashWith = function(someLaser) {
    return !(y > someLaser.bottom() || x + 40 < someLaser.left() || x + 40 > someLaser.right());
  };
}

function updateCanvasLaser() {
  ctx.clearRect(0, 0, 1200, 720);
  // ============================================>

  frames++;

  if (frames % 40 === 1) {
    wallX = ufoX + 140;
    wallX = ufoX + 140;
    wallWidth = 13;
    wallHeight = 300;
    laserBeam.push(new Component(wallWidth, wallHeight, wallX, 0));
  }

  for (var i = 0; i < laserBeam.length; i++) {
    laserBeam[i].y += 10;
    laserBeam[i].update();
    console.log(laserBeam[i].crashWith(laserBeam[i])); // ------------ false ?
    if (laserBeam[i].crashWith(laserBeam[i]) === true) {
      console.log('LOW');
      alert('loser');
      laserBeam = [];
      frames = 0;
    }
    if (laserBeam[i].y > 600) {
      laserBeam.splice(i, 1);
    }
  }
}
