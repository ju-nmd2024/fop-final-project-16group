function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255, 140, 0);
}
//The axe code

function handle(x,y){
  push();
  translate(x,y);
  // scale the size of axe
  scale(0.05);
  translate(-x,-y);
fill(139,69,19);
noStroke();
strokeWeight(2);
rect(x-10,y-20,20,140);
fill(100,100,100);
rect(x-20,y+10,40,10,5);
rect(x-20,y-20,40,10,5);
fill(205,133,63);
rect(x-18,y-8,36,16,5);
fill(222,184,135);
ellipse(x,y,20,20);
fill(225,0,0);
ellipse(x,y,18,18);
fill(255,255,255);
ellipse(x+2,y-4,5);
stroke(85,62,47);
strokeWeight(5);
for(let i = 0; i < 8; i++){
  line(x-8,21+y+i*13 , x+8,30+y+i*13);
  line(x-8,30+y+i*13 , x+8,21+y+i*13);

}
pop();
}
function axe(x,y){
  push();
  // Scale the size of the axe
  translate(x,y);
  scale(0.05);
  translate(-x,-y);
stroke(0,80,80);
strokeWeight(3);
fill(100,100,100);
rect(x-15,y+142,30,10,5);
fill(125,125,125);
triangle(x-10,y+153,x,y+160,x+10,y+153);
stroke(0);
strokeWeight(4);
beginShape();
fill(169,169,169);
vertex(x+10,y+120);
vertex(x-10,y+120);
bezierVertex(x-40,y+120,x-60,y+80,x-60,y+80);
bezierVertex(x-100,y+130,x-60,y+180,x-60,y+180);
bezierVertex(x,y+100,x+60,y+180,x+60,y+180);
bezierVertex(x+100,y+130,x+60,y+80,x+60,y+80);
bezierVertex(x+40,y+120,x+10,y+120,x+10,y+120);
endShape();
strokeWeight(2);
rect(x-12,y+121,24,25);
fill(0);
noStroke();
ellipse(x,y+127,5);
ellipse(x,y+140,5);
noFill();
stroke(0);
strokeWeight(5);
ellipse(x,y,380);
pop();
}

// The board code

function board(X,Y){
  fill(139,69,19);
  noStroke();
rect(boardX-40,boardY,80,10);
ellipse(boardX+39,boardY+5,10,10);
fill(277,164,112);
ellipse(boardX-39,boardY+5,8,9);
stroke(0);
strokeWeight(0.1);
ellipse(boardX-39,boardY+5,6);
ellipse(boardX-39,boardY+5,3);
}

// The code of the treasureChest
function treasure(x,y){
  push();
 translate(x,y);
 scale(0.5);
  strokeWeight(2);
  stroke(90,90,90);
fill(239,186,107);
rect(-40,-40,80,30,20,20,0);
quad(-40,-9,-38,+40,+38,+40,+40,-9);
fill(187,150,111);
stroke(90,90,90);
strokeWeight(2);
beginShape();
vertex(-32,-2);
vertex(-31,+32);
vertex(+31,+32);
vertex(+32,-2);
vertex(+10,-2);
vertex(+8,+8);
vertex(-8,+8);
vertex(-10,-2);
endShape(CLOSE);
rect(-34,-40,68,30,20,20,0);
for(let q = 0; q < 3; q++){
  stroke(127,122,115);
  line(-30,9 + q * 8,+30,9+q*8);
  line(-30-q,-33 + q * 8,+30+q,-33 + q * 8);
}
// The key of the treasureChest
noStroke();
fill(100,100,100);
ellipse(0,0,8,5);
rect(-1.5,0,3,6);
pop();
}

// The rotation and bounce of the axe

let angle = 0;
let dropSpeed = 3;
let bounceSpeed = 3;
let axeWidth = 10;
let axeX =100;
let axeY =2 ;

// The location of board

let boardY = 500;
let boardX = width/2;

// The location of treasureChest
let treasureWidth = 40;
treasureChests = [];
  for (let i = 0; i < 5; i++) {
      treasureChests.push({
          x: random(treasureWidth, width - treasureWidth),
          y: random(treasureWidth, height/2)
      });
  }


function draw(){
  background(240,240,240);
  push();
  translate(axeX,axeY);
  rotate(angle);
  angle = angle + 0.5;
  handle(0,0);
  axe(0,0);
  pop();

//The move of board

board(boardX-40,boardY);
if(keyIsDown(39) && boardX +40 <= 800){
boardX += 5;
}else if (keyIsDown(37) && boardX - 40 >= 0){
  boardX -= 5;
}

//The bounce of the axe

axeY += dropSpeed;
axeX += bounceSpeed;
if(axeY+ axeWidth >= boardY && axeX + axeWidth/2 >= boardX -40 && axeX - axeWidth/2<= boardX +40){
  dropSpeed = dropSpeed * -1;
}else if (axeY <= 0 || axeY + axeWidth>= 600){
  dropSpeed = dropSpeed * -1;
}
axeX += bounceSpeed;
if(axeX + axeWidth >= 800 || axeX - axeWidth/2 <= 0){
  bounceSpeed = bounceSpeed * -1;
}

// the loaction of the treasureChest

for (let i = 0; i < treasureChests.length; i++) {
  treasure(treasureChests[i].x, treasureChests[i].y);
}
}