class GameBackground{
  constructor(){
    this.starX = [];
    this.starY = [];
    this.starAlpha = [];
    this.x = 400;
    this.y = 500;
  }
  // set the location of the star
  setup(){
    for(let i = 0; i < 150; i++){
      this.starX.push(random(800));
      this.starY.push(random(360));
      this.starAlpha.push(random(255));
    }
  }
  drawBackground(x,y){
// draw the mountains
    noStroke();
    background(56, 88, 185);
    fill(100, 100, 150);
    noStroke();
    triangle( x- 200, y+100, x - 50, y- 150,  x+ 100, y+100);
    fill(120, 120, 170);
    triangle(x, y+100, x + 150, y - 100, x + 300, y+100);
    fill(80, 80, 120);
    triangle(x - 400, y+100, x - 250, y - 100, x - 100, y+100);
// draw the trees
    for (let i = 0; i < 5; i++) {
      fill(139, 69, 19); // Tree trunk color
      rect(x - 300 + i * 140, y , 20, 100);
      fill(34, 139, 34); // Tree foliage color
      ellipse(x - 290 + i * 140, y -60, 80, 120);
    }

  }
  // draw the stars
  drawStars(){
    for(let index in this.starX){
      fill(255,255,255,Math.abs(Math.sin(this.starAlpha[index]))*255);
      ellipse(this.starX[index],this.starY[index],3);
      this.starAlpha[index] += 0.03;
    }
  }

}
class StartScreen{
  constructor(){
    this.alphaValue = 255;
    this.backgroundObj = new GameBackground();
  }
 setup(){
  this.backgroundObj.setup();
 }
// The start screen
draw(){
  noStroke();
  background(56, 88, 185);
//Draw background
this.backgroundObj.drawBackground(400,500);
//Draw stars
this.backgroundObj.drawStars();

// the text and flash
  let flickerSpeed = 0.03;
  this.alphaValue = Math.abs(Math.sin(frameCount * flickerSpeed)) * 255;
  fill(255, 215, 0, this.alphaValue);
  textStyle(BOLDITALIC);
  textSize(50);
  text("Treasure hunt in the jungle", 100, height / 3);

// the start button
  fill(255, 255, 255);
  stroke(100, 200, 200);
  strokeWeight(2);
  rect(width / 2 - 60, height / 2, 120, 40, 20);
  fill(23, 255, 100);
  textSize(30);
  stroke(100, 100, 100);
  strokeWeight(5);
  text("Start", width / 2 - 35, height / 2 + 31);
}

// check the clicked
clicked(){
  if (
    mouseX >= width / 2 - 60 &&
    mouseX <= width / 2 + 60 &&
    mouseY >= height / 2 &&
    mouseY <= height / 2 + 40 &&
  mouseIsPressed){
      return true;
    }return false;
}
}
class DrawTreasure{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.exists = true;
        this.width = 40;
    }
    draw(){
        if (this.exists){
            push();
            translate(this.x,this.y);
            scale(0.5);
            strokeWeight(2);
            stroke(90, 90, 90);
            fill(239, 186, 107);
            rect(-40, -40, 80, 30, 20, 20, 0);
            quad(-40, -9, -38, +40, +38, +40, +40, -9);
            fill(187, 150, 111);
            stroke(90, 90, 90);
            strokeWeight(2);
            beginShape();
            vertex(-32, -2);
            vertex(-31, +32);
            vertex(+31, +32);
            vertex(+32, -2);
            vertex(+10, -2);
            vertex(+8, +8);
            vertex(-8, +8);
            vertex(-10, -2);
            endShape();
            rect(-34, -40, 68, 30, 20, 20, 0);
            for (let q = 0; q < 3; q++) {
                stroke(127, 122, 115);
                line(-30,  +9 + q * 8, +30, +9 + q * 8);
                line(-30 - q,  -33 + q * 8, +30 + q, -33 + q * 8);
              }
// The key of the treasureChest
              noStroke();
              fill(100, 100, 100);
              ellipse(0, 0, 8, 5);
              rect(-1.5, 0, 3, 6);
              pop();

        }   
    }
// check the collision of the treasure
    checkCollision(){
      if(!this.exists) return;
// define the boundary of axe 
 let axeTop = axeObj.y - axeObj.width/2;
 let axeBottom = axeObj.y + axeObj.width/2;
 let axeLeft = axeObj.x - axeObj.width/2;
 let axeRight = axeObj.x + axeObj.width/2;
// define the boundary of trueasure
 let treasureTop = this.y -this.width/2;
 let treasureBottom = this.y + this.width/2;
 let treasureLeft = this.x - this.width/2;
 let treasureRight = this.x + this.width/2;
// check the  top collision
 if(axeBottom >= treasureTop &&
   axeTop < treasureTop && 
   axeRight >= treasureLeft && 
   axeLeft <= treasureRight)
   {if(axeObj.dropSpeed > 0){
    axeObj.dropSpeed = -Math.abs(axeObj.dropSpeed);
   }else{axeObj.dropSpeed = Math.abs(axeObj.dropSpeed);
   }
  this.exists = false;
// check the  bottom collision
  }else if (axeTop <= treasureBottom && axeBottom > treasureBottom && axeRight >= treasureLeft && axeLeft <= treasureRight){
  axeObj.dropSpeed = Math.abs(axeObj.dropSpeed);
  this.exists = false;
 }
 // check the  left collision
  if(axeRight >= treasureLeft &&
  axeLeft < treasureLeft &&
  axeBottom > treasureTop &&
  axeTop  < treasureBottom
  ){
    if(axeObj.bounceSpeed > 0){
    axeObj.bounceSpeed = -Math.abs(axeObj.bounceSpeed);
    }else{
    axeObj.bounceSpeed = Math.abs(axeObj.bounceSpeed);
    }
    this.exists = false; }
// check the  right collision
    else if (axeLeft <= treasureRight &&
      axeRight > treasureRight &&
      axeTop < treasureBottom &&
      axeBottom > treasureTop
    ){this.exists = false;
      axeObj.bounceSpeed = Math.abs(axeObj.bounceSpeed);
    }
 }
}
class DrawMeteorit{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.exists = true;
    this.isFalling = false;
    this.width = 40;
  }
  draw(){
    push();
    translate(this.x, this.y);
    scale(0.5);
    stroke(100,100,100);
    strokeWeight(2);
    fill(211, 211, 211);
    ellipse(0, 0, 80, 70);
    fill(69, 69);
    stroke(100,50,50);
    strokeWeight(1);
    ellipse(0,  - 20, 20, 10);
    ellipse(- 20,  10, 15, 10);
    ellipse( 20,  - 10, 10);
    ellipse( 10,  10, 15);
    ellipse( 20,  - 10, 5);
    pop();
    if(this.isFalling === true){
      this.y += 2;
    }
  }
  checkCollision(){
    if(!this.exists) return;
// define the boundary of axe 
let axeTop = axeObj.y - axeObj.width/2;
let axeBottom = axeObj.y + axeObj.width/2;
let axeLeft = axeObj.x - axeObj.width/2;
let axeRight = axeObj.x + axeObj.width/2;
// define the boundary of meteorit
let meteoritTop = this.y -this.width/2;
let meteoritBottom = this.y + this.width/2;
let meteoritLeft = this.x - this.width/2;
let meteoritRight = this.x + this.width/2;
// check the  top collision
if(axeBottom >= meteoritTop &&
 axeTop < meteoritTop && 
 axeRight >= meteoritLeft && 
 axeLeft <= meteoritRight)
 {if(axeObj.dropSpeed > 0){
  axeObj.dropSpeed = -Math.abs(axeObj.dropSpeed);
 }else{axeObj.dropSpeed = Math.abs(axeObj.dropSpeed);
 }
this.isFalling = true;
// check the  bottom collision
}else if (axeTop <= meteoritBottom && axeBottom > meteoritBottom && axeRight >= meteoritLeft && axeLeft <= meteoritRight){
axeObj.dropSpeed = Math.abs(axeObj.dropSpeed);
this.isFalling = true;
}
// check the  left collision
if(axeRight >= meteoritLeft &&
axeLeft < meteoritLeft &&
axeBottom > meteoritTop &&
axeTop  < meteoritBottom
){
  if(axeObj.bounceSpeed > 0){
  axeObj.bounceSpeed = -Math.abs(axeObj.bounceSpeed);
  }else{
  axeObj.bounceSpeed = Math.abs(axeObj.bounceSpeed);
  }
  this.isFalling = true; }
// check the  right collision
  else if (axeLeft <= meteoritRight &&
    axeRight > meteoritRight &&
    axeTop < meteoritBottom &&
    axeBottom > meteoritTop
  ){this.isFalling = true;
    axeObj.bounceSpeed = Math.abs(axeObj.bounceSpeed);
  }
}
}
class Axe{
    constructor(){
    this.x = 300;
    this.y = 350;
    this.dropSpeed = 2;
    this.bounceSpeed = 2;
    this.width = 20;
    this.angle = 0;
  }
// draw the axe
  draw(){ 
// the handle 
  push();
  translate(this.x, this.y);
// scale the size of axe
  scale(0.05);
// let the axe spin
  rotate(this.angle);
  this.angle += 0.5;
// The outline of the axe
  fill(255,255,255);
  stroke(255);
  strokeWeight(5);
  ellipse(0, 0, 380);
  fill(139, 69, 19);
  noStroke();
  strokeWeight(2);
  rect(- 10,  - 20, 20, 140);
  fill(100, 100, 100);
  rect( - 20,  10, 40, 10, 5);
  rect( - 20,  - 20, 40, 10, 5);
  fill(205, 133, 63);
  rect(- 18,  - 8, 36, 16, 5);
  fill(222, 184, 135);
  ellipse(0, 0, 20, 20);
  fill(225, 0, 0);
  ellipse(0, 0, 18, 18);
  fill(255, 255, 255);
  ellipse( 2,  - 4, 5);
  stroke(85, 62, 47);
  strokeWeight(5);
  for (let i = 0; i < 8; i++) {
  line(- 8, 21  + i * 13, + 8, 30  + i * 13);
  line( - 8, 30 + i * 13, + 8, 21  + i * 13);
  }
// the main axe
  stroke(0, 80, 80);
  strokeWeight(3);
  fill(100, 100, 100);
  rect(- 15,  142, 30, 10, 5);
  fill(125, 125, 125);
  triangle(- 10,  + 153, 0,  + 160,  + 10,  + 153);
  stroke(0);
  strokeWeight(4);
  beginShape();
  fill(169, 169, 169);
  vertex(+ 10, + 120);
  vertex( - 10,  + 120);
  bezierVertex(- 40,  + 120,   - 60,  + 80,  - 60,  + 80);
  bezierVertex( - 100,  + 130,  - 60,  + 180,  - 60,  + 180);
  bezierVertex(0,  + 100,  + 60,  + 180,  + 60,  + 180);
  bezierVertex(+ 100,  + 130,  + 60,  + 80,  + 60,  + 80);
  bezierVertex(+ 40,  + 120, + 10,  + 120,  + 10,  + 120);
  endShape();
  strokeWeight(2);
  rect( - 12,  + 121, 24, 25);
  fill(0);
  noStroke();
  ellipse(0,  + 127, 5);
  ellipse(0,  + 140, 5);
  pop();
  }
// method to move the axe
moveAxe(){
  this.x += this.bounceSpeed;
  this.y += this.dropSpeed;
// check the collision
  if (
    this.y + this.width / 2 >= boardObj.y &&
    this.x + this.width / 2 >= boardObj.x - 40 &&
    this.x - this.width /2 <= boardObj.x + 40 &&
    this.y - this.width /2 <= boardObj.y+10
    ) {
    this.dropSpeed = this.dropSpeed * -1;
  }
// keep the axe inside the game
  if (this.y <= 0){
      this.dropSpeed = this.dropSpeed * -1;
    }
  if(this.x + this.width/2 >= 800 || this.x -this.width/2 <=0){
    this.bounceSpeed = this.bounceSpeed * -1;
  }
} 
}
class Board{
  constructor(){
    this.x = width/2;
    this.y = 500;
    }
    draw(){
    push();
    translate(this.x,this.y);
    fill(139, 69, 19);
    stroke(0);
    strokeWeight(1);
    rect(- 40, 0, 80, 10);
    ellipse(+ 39,+ 5, 10, 10);
    fill(27, 164, 112);
    ellipse( - 39,5, 8, 9);
    stroke(0);
    strokeWeight(0.5);
    ellipse(- 39, + 5, 6);
    ellipse( - 39, + 5, 3);
    pop();
    }
 // method to move the board
    moveBoard(){
    if(keyIsDown(39) && this.x + 45 <= 800){
    this.x += 10;
    }
    if(keyIsDown(37) && this.x - 45 >= 0){
    this.x -= 10;
    }
   }
}
//The setup of the treasurechest
let treasures = [];
let treasureWidth = 40;

let meteorits = [];
let meteoritWidth = 40;
// use the startScreen
let startScreenObj;
// the state
let state = 'start';

function setup(){
  createCanvas(800,600);
  frameRate(120);
// setup the gamebackgroun and the stars
gameBackgroundObj = new GameBackground();
gameBackgroundObj.setup(); //set the stars 
// set the axe
axeObj = new Axe();
// set the board
boardObj = new Board();
// the location of the frist meteorit
  let meteoritX = 150;
  let meteoritY = 100;
// the location of the frist treasureChest
  let startX= 100;
  let startY= 100;
  let gap = 100;
  let rawGap =50;
  let rows = 4;
  let cols = 7;
  for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        let x = startX+ col * gap;
        let y = startY+  row * rawGap;
        let exists = true;
        treasures.push(new DrawTreasure(x,y));
    }
    for (let col = 0; col < cols; col++) {
        let x = meteoritX + col * gap;
        let y = meteoritY + row * rawGap;
      meteorits.push(new DrawMeteorit(x,y));
    }
  }
//setup the startScreen
startScreenObj = new StartScreen();
startScreenObj.setup();
}
function gameScreen(){
// draw the gamebackgroun and the star
  gameBackgroundObj.drawBackground(400, 500);
  gameBackgroundObj.drawStars();

  axeObj.draw();
  axeObj.moveAxe();
  boardObj.moveBoard();
  boardObj.draw();
// draw the treasurechest
  for(let i = 0; i<treasures.length; i++){
    if(treasures[i].exists ){
      treasures[i].checkCollision();
      if (treasures[i].exists){
        treasures[i].draw();
       }
    } 
  }

//draw the metrorits
  for(let i = 0; i < meteorits.length; i++){
    if(meteorits[i].exists){
      meteorits[i].checkCollision();
      if(meteorits[i].exists){
        meteorits[i].draw();
      }
    }
  }
}
function draw(){
  if(state === 'start'){
    startScreenObj.draw();
    if(startScreenObj.clicked()){
      state ='game';
    }
  }
  if(state ==='game'){
    gameScreen();
  }
}