
// The setting of treasureChest
let treasureWidth = 40;
let treasures = [];

//The setting of the meteorite
let meteoriteWidth = 40;
let meteorites = [];

// The rotation and bounce of the axe
let angle = 0;
let dropSpeed = 5;
let bounceSpeed = 3;
let axeWidth = 20;
let axeX = 300;
let axeY = 350;

// The location of board
let boardY = 500;
let boardX = width / 2;

// The setting of the sky and stars
let starX = [];
let starY = [];
let starAlpha = [];

function setup() {
  createCanvas(800, 600);

  //The location and status of each treasure chest and meteorite
let rows = 4;
let cols = 7;

// The location and spacing of the first treasure chest
let startX = 100;
let startY = 100;
let gap = 100;
let rowGap = 50;

// The location and spacing of the treasure and meteorite
let meteoriteX = 150;
let meteoriteY = 100;
for (let row = 0; row<rows; row++){
  for( let col = 0; col<cols; col++){
      treasures.push({
      x:startX + col * gap,
      y:startY + row * rowGap,
      exists: true,
    });
  }
  for( let col = 0; col<cols; col++){
    meteorites.push({
      x:meteoriteX + col * gap,
      y:meteoriteY + row * rowGap,
      exists: true,
      isFalling : false,
    });
  }
}

// Initialize stars' positions and their alpha values
for (let i = 0; i < 150; i++) {
  starX.push(random(800));
  starY.push(random(460));
  starAlpha.push(random());
}
}
function handle(x, y) {
  push();
  translate(x, y);
  // scale the size of axe
  scale(0.05);
  translate(-x, -y);
  fill(139, 69, 19);
  noStroke();
  strokeWeight(2);
  rect(x - 10, y - 20, 20, 140);
  fill(100, 100, 100);
  rect(x - 20, y + 10, 40, 10, 5);
  rect(x - 20, y - 20, 40, 10, 5);
  fill(205, 133, 63);
  rect(x - 18, y - 8, 36, 16, 5);
  fill(222, 184, 135);
  ellipse(x, y, 20, 20);
  fill(225, 0, 0);
  ellipse(x, y, 18, 18);
  fill(255, 255, 255);
  ellipse(x + 2, y - 4, 5);
  stroke(85, 62, 47);
  strokeWeight(5);
  for (let i = 0; i < 8; i++) {
    line(x - 8, 21 + y + i * 13, x + 8, 30 + y + i * 13);
    line(x - 8, 30 + y + i * 13, x + 8, 21 + y + i * 13);
  }
  pop();
}
function axe(x, y) {
  push();
  // Scale the size of the axe
  translate(x, y);
  scale(0.05);
  translate(-x, -y);
  stroke(0, 80, 80);
  strokeWeight(3);
  fill(100, 100, 100);
  rect(x - 15, y + 142, 30, 10, 5);
  fill(125, 125, 125);
  triangle(x - 10, y + 153, x, y + 160, x + 10, y + 153);
  stroke(0);
  strokeWeight(4);
  beginShape();
  fill(169, 169, 169);
  vertex(x + 10, y + 120);
  vertex(x - 10, y + 120);
  bezierVertex(x - 40, y + 120, x - 60, y + 80, x - 60, y + 80);
  bezierVertex(x - 100, y + 130, x - 60, y + 180, x - 60, y + 180);
  bezierVertex(x, y + 100, x + 60, y + 180, x + 60, y + 180);
  bezierVertex(x + 100, y + 130, x + 60, y + 80, x + 60, y + 80);
  bezierVertex(x + 40, y + 120, x + 10, y + 120, x + 10, y + 120);
  endShape();
  strokeWeight(2);
  rect(x - 12, y + 121, 24, 25);
  fill(0);
  noStroke();
  ellipse(x, y + 127, 5);
  ellipse(x, y + 140, 5);
  noFill();
  stroke(255);
  strokeWeight(5);
  ellipse(x, y, 380);
  pop();
}
function board(X, Y) {
  fill(139, 69, 19);
  noStroke();
  rect(boardX - 40, boardY, 80, 10);
  ellipse(boardX + 39, boardY + 5, 10, 10);
  fill(277, 164, 112);
  ellipse(boardX - 39, boardY + 5, 8, 9);
  stroke(0);
  strokeWeight(0.1);
  ellipse(boardX - 39, boardY + 5, 6);
  ellipse(boardX - 39, boardY + 5, 3);
}
function drawTreasure(x, y) {
  push();
  translate(x, y);
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
    line(-30, 9 + q * 8, +30, 9 + q * 8);
    line(-30 - q, -33 + q * 8, +30 + q, -33 + q * 8);
  }
  // The key of the treasureChest
  noStroke();
  fill(100, 100, 100);
  ellipse(0, 0, 8, 5);
  rect(-1.5, 0, 3, 6);
  pop();
}
function drawMeteorite(x,y){
  push();
  translate(x,y);
  scale(0.5);
  translate(-x,-y);
  fill(211,211,211);
  ellipse(x,y,80,70);
  fill(69,69);
  strokeWeight(2);
  ellipse(x,y-20,20,10);
  ellipse(x-20,y+10,15,10);
  ellipse(x+20,y-10,10);
  ellipse(x+10,y+10,15);
  ellipse(x-20,y-10,5);
  pop();
}
function draw() {
  //The skt and the star
  noStroke();
  background(0,0,0);
  for(let index in starX){
      fill(255,255,255,Math.abs(Math.sin(starAlpha[index]))*255);
      ellipse(starX[index],starY[index],3);
      starAlpha[index] = starAlpha[index] + 0.04;
  }

  // The Rotation of the axe
  push();
  translate(axeX, axeY);
  rotate(angle);
  angle = angle + 0.5;
  handle(0, 0);
  axe(0, 0);
  pop();

  //The move of board
  board(boardX - 40, boardY);
  if (keyIsDown(39) && boardX + 40 <= 800) {
    boardX += 10; // Board go to right
  } else if (keyIsDown(37) && boardX - 40 >= 0) {
    boardX -= 10; // Board go to left
  }

  //The bounce of the axe
  axeY += dropSpeed;
  axeX += bounceSpeed;
  if (axeY + axeWidth / 2 > boardY && axeX + axeWidth / 2 > boardX - 40 && axeX - axeWidth / 2 < boardX + 40 && axeY - axeWidth / 2 < boardY +10 ) { 
    dropSpeed = dropSpeed * -1; //Bounce of touch board
  } else if (axeY <= 0 || axeY + axeWidth >= 600) {
    dropSpeed = dropSpeed * -1; //Touching the boundary will bounce (Y)
  }
  if (axeX + axeWidth >= 800 || axeX - axeWidth / 2 <= 0) {
    bounceSpeed = bounceSpeed * -1;//Touching the boundary will bounce (X)
  }

  // Treasure chest and collision detection
  for(let i=0; i<treasures.length; i++){
    let treasure = treasures[i];
    if(treasure.exists){
      if (axeX + axeWidth / 2 >= treasure.x - treasureWidth / 2 &&
        axeX - axeWidth / 2 <= treasure.x + treasureWidth / 2 &&
        axeY + axeWidth / 2 >= treasure.y - treasureWidth / 2 &&
        axeY - axeWidth / 2 <= treasure.y + treasureWidth / 2){
          treasure.exists = false;
          //Rebound logic
          // X direction of motion
          if(axeX < treasure.x){
            bounceSpeed = -Math.abs(bounceSpeed);//Make sure to bounce left
          }
          else{
            bounceSpeed = Math.abs(bounceSpeed);//Make sure to bounce Right
          }
          // Y direction of motion
          if(axeY < treasure.y){
            dropSpeed = -Math.abs(dropSpeed);//Make sure to go up
          }else{
            dropSpeed = Math.abs(dropSpeed);//Make sure to go down
          }
        }else{
          drawTreasure(treasure.x,treasure.y);
        }
    }
  }
  //Meteorite and collision detection
  for(let i=0; i<meteorites.length; i++){
    let meteorite = meteorites[i];
    if(meteorite.exists){
      if (axeX + axeWidth / 2 > meteorite.x - meteoriteWidth / 2 &&
        axeX - axeWidth / 2 < meteorite.x + meteoriteWidth / 2 &&
        axeY + axeWidth / 2 > meteorite.y - meteoriteWidth / 2 &&
        axeY - axeWidth / 2 < meteorite.y + meteoriteWidth / 2){ 
           meteorite.isFalling = true; 

          //Rebound logic
          // X direction of motion
          if(axeX < meteorite.x){
            bounceSpeed = -Math.abs(bounceSpeed);//Make sure to bounce left
          }else{
            bounceSpeed = Math.abs(bounceSpeed);//Make sure to bounce right
          }
          // Y direction of motion
          if(axeY < meteorite.y){
            dropSpeed = -Math.abs(dropSpeed);//Make sure to go up
          }else{
            dropSpeed = Math.abs(dropSpeed);//Make sure to go down
          }
        }else{
          drawMeteorite(meteorite.x,meteorite.y);
        }
        if(meteorite.isFalling){ // The meteorite is Falling
          meteorite.y += 3;
          drawMeteorite(meteorite.x,meteorite.y);
        }
    }
  }
}