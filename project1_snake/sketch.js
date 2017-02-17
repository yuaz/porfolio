// score displayed in message
var scoreMessage;
var alertMessage;

// game parameters
var endGame = false;
var alertCond=false;
var run = true;
var pause = false;
var gameSize = 480;

// snake parameters
var snake;
var snakeSize = 20;
var foods = [];

// initial setup
function setup(){

  // highscore display
  if (localStorage.getItem("highscore") === null){
    localStorage.setItem("highscore", "0");
  }

  // create game board
	var canvas = createCanvas(gameSize, gameSize);
  canvas.parent('sketch-holder');
	frameRate(10);

  // create snake
	snake = new Snake();
  score = new Score();
  foods=[];
  skins=[];

  // start with 5 foods
  for(i = 0; i < 5; i++){
    foods.push(new Food());
  }

}

//display the functions of the powerups


// display game board and elements
function draw(){
  // background color
	background(30);

  if (pause){
    fill(200);
    textSize(50);
    textAlign(gameSize);
    text("PAUSED", gameSize/3-10, gameSize/2+10);
  }

  if (endGame){
    fill(255);
    textSize(26);
    text(scoreMessage, gameSize/3, gameSize/2);
  }

  if(alertCond){
    fill(200);
    textSize(30);
    textAlign(CENTER);
    text(alertMessage, gameSize/3-10, gameSize/2+10);
    setTimeout(resetAlert,1200);
  }

	snake.update(run);
	snake.show();
  for(i = 0; i < foods.length; i++){
    foods[i].show();
    snake.eat(foods[i],i);
  }

  for(i=0;i<skins.length;i++){
    skins[i].show();
    snake.touchSkin(skins[i]);
  }

  fill(255);
  textSize(14);
  text("Score: " + score.getScore(), Math.floor(gameSize*0.84), Math.floor(gameSize*0.98));


}

function keyPressed() {
 var PAUSE = 80;
 var RESTART = 82;
 if (endGame){
   score.score = 0;
 }
 endGame = false;

 if (keyCode === UP_ARROW) {
   snake.changeDir(0, -1);
 }
 else if (keyCode === DOWN_ARROW) {
   snake.changeDir(0, 1);
 }
 else if (keyCode === RIGHT_ARROW) {
   snake.changeDir(1, 0);
 }
 else if (keyCode === LEFT_ARROW) {
   snake.changeDir(-1, 0);
 }
 else if (keyCode === PAUSE) {
   var resume_xspeed;
   var resume_yspeed;
   if(snake.xspeed != 0 || snake.yspeed != 0){
     run = false;
     pause = true;
     resume_xspeed = snake.xspeed;
     resume_yspeed = snake.yspeed;

     snake.xspeed = 0;
     snake.yspeed = 0;
   }
   else {
     run = true;
     pause = false;
     snake.xspeed = resume_xspeed;
     snake.yspeed = resume_yspeed;
   }
 }
 else if (keyCode === RESTART) {
   setup();
 }
}
