// window.onload = function() {
//========================================================================
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// -------------------------------------MY CHANGES-------------------------------
setInterval(updateCanvas, 50);
// --------------------------------------------------------------------
//========================================================================

var board = {
  frames: 0
};

var carImage = new Image();
carImage.src = 'images/geek-character.png';

var car = {
  // DONT NEED IT /////////////
  x: 220,
  y: 515,
  carWidth: 100,
  carHeight: 100,
  // on the step 3: add next two functions when comes moving part
  moveLeft: function() {
    // DONT NEED IT /////////////
    console.log('x in moveLeft before', this.x);
    this.x -= 50;
    console.log('x in moveLeft after', this.x);
  },
  moveRight: function() {
    // DONT NEED IT /////////////
    this.x += 50;
  }
};

drawCar(); // ------------------------------------> LEAVE THIS BELOW OBJECT CAR

function drawCar() {
  // DONT NEED IT /////////////
  ctx.drawImage(carImage, car.x, car.y, car.carWidth, car.carHeight);
}

// define variable myObstacle as an empty array
var myObstacles = [];

// 3rd => make car moving
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      car.moveLeft();
      break;
    case 39:
      car.moveRight();
      break;
    default:
      console.log('blah');
  }

  drawCar();

  for (var i = 0; i < myObstacles.length; i++) {
    myObstacles[i].update();
  }
};

// 4th step:
// we want the road to be re-drawn plenty of times, which basically means our obstacles will be re-drawn in different positions
function Component(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  // to add "moving" to the obstacles we need to introduce speed
  this.speedX = 0;
  this.speedY = 0;
  // function to add this value to our current position
  this.update = function() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  // function to draw the element in its new position
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
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

  // Then we need to create a function that checks if the position of the car is not the same as the obstacle´s one.
  this.crashWith = function(obstacle) {
    return !(car.y > obstacle.bottom() || car.x + 40 < obstacle.left() || car.x + 40 > obstacle.right());
  };
}

// 5th step => update canvas:
function updateCanvas() {
  ctx.clearRect(0, 0, 1280, 720);

  drawCar();
  // Every time we call updateCanvas() we will add 1 to our frames variable
  board.frames++;
  // Every 60 times we update the canvas, a new obstacle will be created.
  // If you want to make it harder, just put a lower number.
  // we use modulus of number of frames to be equal 1 because we want our obstacles to be created right away
  // if we set it equal to 0, that means our first obstacle will be created after 60 milliseconds
  if (board.frames % 30 === 1) {
    // we want random object to appear on X between 0 and 400,
    // because 400 is the width of the road (500 - 2*50 (50 is the width of the green lines on the both sides of the road))
    wallX = Math.floor(Math.random() * 1200);
    wallWidth = 20;
    wallHeight = 100;
    myObstacles.push(new Component(wallWidth, wallHeight, wallX, 0));

    // board.frames = 2;
  }
  for (var i = 0; i < myObstacles.length; i++) {
    // this line allows moving of the obstacles (without this line we just get first obstacle at the position 0)
    myObstacles[i].y += 10;
    myObstacles[i].update();

    if (myObstacles[i].crashWith(myObstacles[i]) === true) {
      console.log('crash');
      alert('watch out!');
      myObstacles = [];
      board.score = 0;
      board.frames = 0;
      startGame();
    }
    if (myObstacles[i].y > 600) {
      myObstacles.splice(i, 1);
      board.score++;
    }
  }
}
// };

// --------- IAN
