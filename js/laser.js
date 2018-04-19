// window.onload = function() {
//   function interval() {
//     //                        |====> milliseconds
//     setInterval(updateCanvas, 50);
//   }

//   document.getElementById('start-button').onclick = function() {
//     // call interval() which calls updateCanvas() as soon as the user clicks on start
//     interval();
//     startGame();
//   };

//   function startGame() {
//     // 1st step
//     createGameBoard();
//     // 2nd step
//     drawCar();
//   }

//   // 1st => create game board:
//   function createGameBoard() {
//     // declare variable "canvas" which will contain DOM element which has id with value "game-board"
//     this.canvas = document.getElementById('game-board');
//     // declare variable context (aka ctx) which will use previously defined canvas (.getContext('2d') always stays the same)
//     this.ctx = this.canvas.getContext('2d');
//     // fillStyle sets the color (we choose green)
//     //-------------------------------  this.ctx.fillStyle = 'green';
//     // fillRect fills rectangle
//     //                x,y,width, height
//     //                | |  |   ____|
//     //                | |  |   |
//     //----------this.ctx.fillRect(0, 0, 500, 600);
//     //----------this.ctx.fillStyle = 'gray';
//     //---------- this.ctx.fillRect(50, 0, 400, 600);
//     //----------this.ctx.fillStyle = 'white';
//     //---------- this.ctx.fillRect(60, 0, 10, 600);
//     //---------- this.ctx.fillRect(430, 0, 10, 600);
//     // // next 6 lines regulate middle line
//     this.ctx.lineWidth = 10;
//     // //           height of the line;   distance between the end of the line stroke and the beginning of the next one
//     // //                    |   _____________________________________|
//     // //                    |   |
//     this.ctx.setLineDash([40, 20]);
//     this.ctx.strokeStyle = 'white';
//     // // start position
//     this.ctx.moveTo(245, 0);
//     // end position
//     this.ctx.lineTo(245, 600);
//     // executes the drawing
//     this.ctx.stroke();
//     // next three lines regulate score
//     this.ctx.fillStyle = 'pink';
//     this.ctx.font = '50px Helvetica';
//     this.ctx.fillText('Score: ' + board.score, 0, 50);
//   }

//   // var score = 0;
//   var board = {
//     score: 0,
//     // 5th step add frames (variable that increments every time we update our canvas)
//     // We add a frames variable on board object because this will help us to count
//     // how many times we call the updateCanvas() function. This way, we can push new
//     // obstacles every certain amount of updates.
//     frames: 0,
//   };

//   // 2nd => create car:
//   var carImage = canvasCharacter;
//   // carImage.src = 'images/car.png';

//   var car = {
//     x: 220,
//     y: 515,
//     carWidth: 50,
//     carHeight: 85,
//     // on the step 3: add next two functions when comes moving part
//     moveLeft: function() {
//       console.log('x in moveLeft before', this.x);
//       this.x -= 10;
//       console.log('x in moveLeft after', this.x);
//     },
//     moveRight: function() {
//       this.x += 10;
//     },
//   };

//   function drawCar() {
//     ctx.drawImage(carImage, car.x, car.y, car.carWidth, car.carHeight);
//   }

//   // define variable myObstacle as an empty array
//   var myObstacles = [];

//   // 3rd => make car moving
//   document.onkeydown = function(e) {
//     switch (e.keyCode) {
//       case 37:
//         car.moveLeft();
//         break;
//       case 39:
//         car.moveRight();
//         break;
//       default:
//         console.log('blah');
//     }
//     createGameBoard();
//     drawCar();

//     for (var i = 0; i < myObstacles.length; i++) {
//       myObstacles[i].update();
//     }
//   };

//   // 4th step:
//   // we want the road to be re-drawn plenty of times, which basically means our obstacles will be re-drawn in different positions
//   function Component(width, height, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     // to add "moving" to the obstacles we need to introduce speed
//     this.speedX = 0;
//     this.speedY = 0;
//     // function to add this value to our current position
//     this.update = function() {
//       ctx.fillStyle = 'black';
//       ctx.fillRect(this.x, this.y, this.width, this.height);
//     };
//     // function to draw the element in its new position
//     this.newPos = function() {
//       this.x += this.speedX;
//       this.y += this.speedY;
//     };
//     // next 4 lines check the position of the obstacle
//     this.left = function() {
//       return this.x;
//     };
//     this.right = function() {
//       return this.x + this.width;
//     };
//     this.top = function() {
//       return this.y;
//     };
//     this.bottom = function() {
//       return this.y + this.height;
//     };

//     // Then we need to create a function that checks if the position of the car is not the same as the obstacle´s one.
//     this.crashWith = function(obstacle) {
//       return !(
//         car.y > obstacle.bottom() ||
//         car.x + 40 < obstacle.left() ||
//         car.x + 40 > obstacle.right()
//       );
//     };
//   }

//   // 5th step => update canvas:
//   function updateCanvas() {
//     ctx.clearRect(0, 0, 500, 600);
//     createGameBoard();
//     drawCar();
//     // Every time we call updateCanvas() we will add 1 to our frames variable
//     board.frames++;
//     // Every 60 times we update the canvas, a new obstacle will be created.
//     // If you want to make it harder, just put a lower number.
//     // we use modulus of number of frames to be equal 1 because we want our obstacles to be created right away
//     // if we set it equal to 0, that means our first obstacle will be created after 60 milliseconds
//     if (board.frames % 60 === 1) {
//       // we want random object to appear on X between 0 and 400,
//       // because 400 is the width of the road (500 - 2*50 (50 is the width of the green lines on the both sides of the road))
//       wallX = 50 + Math.floor(Math.random() * 300);
//       wallWidth = 100;
//       wallHeight = 20;
//       myObstacles.push(new Component(wallWidth, wallHeight, wallX, 0));
//       // board.frames = 2;
//     }
//     for (var i = 0; i < myObstacles.length; i++) {
//       // this line allows moving of the obstacles (without this line we just get first obstacle at the position 0)
//       myObstacles[i].y += 10;
//       myObstacles[i].update();
//       if (myObstacles[i].crashWith(myObstacles[i]) === true) {
//         console.log('crash');
//         alert('watch out!');
//         myObstacles = [];
//         board.score = 0;
//         board.frames = 0;
//         startGame();
//       }
//       if (myObstacles[i].y > 600) {
//         myObstacles.splice(i, 1);
//         board.score++;
//       }
//     }
//   }
// };
