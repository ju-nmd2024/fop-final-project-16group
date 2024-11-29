//The next code form LIU (2-4)
//score and lives
let score = 0;
let lives = 3;

//The next code form YAN (7-319)
// The setting of treasureChest
let treasureWidth = 40;
let treasures = [];

//The setting of the meteorite
let meteoriteWidth = 40;
let meteorites = [];

// The rotation and bounce of the axe
let angle = 0;
let dropSpeed = 3;
let bounceSpeed = 3;
let axeWidth = 20;
let axeX = 300;
let axeY = 350;

// The location of board
let boardY = 500;
let boardX;

// The setting of the sky and stars
let starX = [];
let starY = [];
let starAlpha = [];

//The location of the gameBackground
let gameBackgroundX = 400;
let gameBackgroundY = 600;

let alphaValue = 255; // For the text of the startScreen
let state = "start";
let startScreenX = 400;
let startScreenY = 500;

function setup() {
  createCanvas(800, 600);
  boardX = width / 2;

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
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      treasures.push({
        x: startX + col * gap,
        y: startY + row * rowGap,
        exists: true,
      });
    }
    for (let col = 0; col < cols; col++) {
      meteorites.push({
        x: meteoriteX + col * gap,
        y: meteoriteY + row * rowGap,
        exists: true,
        isFalling: false,
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
function startScreen() {
  noStroke();
  background(56, 88, 185);
  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 4);
    starAlpha[index] = (starAlpha[index] + 0.04, 0, 255);
  }
  gameBackground(startScreenX, startScreenY + 100);
  let flickerSpeed = 0.03;
  alphaValue = Math.abs(Math.sin(frameCount * flickerSpeed)) * 255;
  fill(255, 215, 0, alphaValue);
  textStyle(BOLDITALIC);
  textSize(50);
  text("Treasure hunt in the jungle", 100, height / 3);
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

function endScreen() {
  noStroke();
  background(56, 88, 185);
  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 4);
    starAlpha[index] = starAlpha[index] + 0.04;
  }
  gameBackground(startScreenX, startScreenY + 100);
  let flickerSpeed = 0.03;
  alphaValue = Math.abs(Math.sin(frameCount * flickerSpeed)) * 255;
  fill(255, 215, 0, alphaValue);
  textStyle(BOLDITALIC);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Game over!", width / 2, height / 2 - 80);

  //buton
  fill(255, 255, 255);
  stroke(100, 200, 200);
  strokeWeight(2);
  rect(width / 2 - 60, height / 2 + 20, 120, 40, 20);
  fill(23, 255, 100);
  textSize(20);
  stroke(100, 100, 100);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text("Try again", width / 2, height / 2 + 40);
}
function drawMountain(x, y) {
  // Mountains in the background
  fill(100, 100, 150);
  noStroke();
  triangle(x - 200, y, x - 50, y - 250, x + 100, y);
  fill(120, 120, 170);
  triangle(x, y, x + 150, y - 200, x + 300, y);
  fill(80, 80, 120);
  triangle(x - 400, y, x - 250, y - 200, x - 100, y);
}
function drawForest(x, y) {
  // Trees in the forest
  for (let i = 0; i < 5; i++) {
    fill(139, 69, 19); // Tree trunk color
    rect(x - 300 + i * 140, y - 100, 20, 100);
    fill(34, 139, 34); // Tree foliage color
    ellipse(x - 290 + i * 140, y - 140, 80, 120);
  }
}
function gameBackground(x, y) {
  fill(0);
  rect(x - 400, y, 800, height);
  drawMountain(x, y);
  drawForest(x, y);
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
function board(x, y) {
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
function drawMeteorite(x, y) {
  push();
  translate(x, y);
  scale(0.5);
  translate(-x, -y);
  fill(211, 211, 211);
  ellipse(x, y, 80, 70);
  fill(69, 69);
  strokeWeight(2);
  ellipse(x, y - 20, 20, 10);
  ellipse(x - 20, y + 10, 15, 10);
  ellipse(x + 20, y - 10, 10);
  ellipse(x + 10, y + 10, 15);
  ellipse(x - 20, y - 10, 5);
  pop();
}
function gameScreen() {
  //The sky and the star
  noStroke();
  background(56, 88, 185);
  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 3);
    starAlpha[index] = starAlpha[index] + 0.04;
  }
  gameBackground(gameBackgroundX, gameBackgroundY);

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
    boardX += 10;
  } else if (keyIsDown(37) && boardX - 40 >= 0) {
    boardX -= 10;
  }

  // The bounce of the axe
  axeY += dropSpeed;
  axeX += bounceSpeed;
  if (
    axeY + axeWidth / 2 > boardY &&
    axeX + axeWidth / 2 > boardX - 40 &&
    axeX - axeWidth / 2 < boardX + 40 &&
    axeY - axeWidth / 2 < boardY + 10
  ) {
    dropSpeed = dropSpeed * -1;
  } else if (axeY + axeWidth >= 600) {
    lives--;
    resetAxe();
  } else if (axeY <= 0) {
    dropSpeed = dropSpeed * -1;
  }
  if (axeX + axeWidth >= 800 || axeX - axeWidth / 2 <= 0) {
    bounceSpeed = bounceSpeed * -1;
  }

  //  Treasure chest and collision detection
  for (let i = 0; i < treasures.length; i++) {
    let treasure = treasures[i];
    if (treasure.exists) {
      if (
        axeX + axeWidth / 2 >= treasure.x - treasureWidth / 2 &&
        axeX - axeWidth / 2 <= treasure.x + treasureWidth / 2 &&
        axeY + axeWidth / 2 >= treasure.y - treasureWidth / 2 &&
        axeY - axeWidth / 2 <= treasure.y + treasureWidth / 2
      ) {
        treasure.exists = false;

        //The next code form LIU (291 - 292)
        score++;
        reboundAxe(treasure);

        //The next code form YAN (295-311)
      } else {
        drawTreasure(treasure.x, treasure.y);
      }
    }
  }

  // Meteorite and collision detection
  for (let i = 0; i < meteorites.length; i++) {
    let meteorite = meteorites[i];
    if (meteorite.exists) {
      if (
        axeX + axeWidth / 2 > meteorite.x - meteoriteWidth / 2 &&
        axeX - axeWidth / 2 < meteorite.x + meteoriteWidth / 2 &&
        axeY + axeWidth / 2 > meteorite.y - meteoriteWidth / 2 &&
        axeY - axeWidth / 2 < meteorite.y + meteoriteWidth / 2
      ) {
        meteorite.isFalling = true;
        if (axeX < meteorite.x) {
          bounceSpeed = -Math.abs(bounceSpeed);
        } else {
          bounceSpeed = Math.abs(bounceSpeed);
        }
        if (axeY < meteorite.y) {
          dropSpeed = -Math.abs(dropSpeed);
        } else {
          dropSpeed = Math.abs(dropSpeed);
        }

        //The next code form YAN( 318 -326)
      } else {
        drawMeteorite(meteorite.x, meteorite.y);
      }
      if (meteorite.isFalling) {
        meteorite.y += 3;
        drawMeteorite(meteorite.x, meteorite.y);
        //The next code form LIU
        if (
          meteorite.y + meteoriteWidth / 2 >= boardY &&
          meteorite.x + meteoriteWidth / 2 > boardX - 40 &&
          meteorite.x - meteoriteWidth / 2 < boardX + 40
        ) {
          score--;
          meteorite.exists = false;
        } else if (meteorite.y > height) {
          meteorite.exists = false;
        }
      }
    }
  }
  // The next code form LIU (328-368)
  // show the score and lives
  fill(255, 255, 255);
  textSize(20);
  text(`Score: ${score}`, 20, 30);
  text(`Lives: ${lives}`, 20, 60);

  // game over
  if (lives <= 0) {
    noLoop();
    fill(255, 255, 255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text(
      `Game Over! 
Final Score: ${score}`,
      width / 2,
      height / 2
    );
  }
}
// resetaxe
function resetAxe() {
  axeX = boardX;
  axeY = boardY - axeWidth / 2 - 5;
  dropSpeed = 5;
  bounceSpeed = 3;
}

//The next code form LIU
function reboundAxe(meteorite) {
  if (axeX < meteorite.x) {
    bounceSpeed = -Math.abs(bounceSpeed);
  } else {
    bounceSpeed = Math.abs(bounceSpeed);
  }
  if (axeY < meteorite.y) {
    dropSpeed = -Math.abs(dropSpeed);
  } else {
    dropSpeed = Math.abs(dropSpeed);
  }
}
// The next code form YAN (370 - )
function draw() {
  if (state === "start") {
    startScreen();
  }
  if (state === "game") {
    gameScreen();
  }
  if (state === "end") {
    endScreen();
  }
  if (state === "win") {
    winScreen();
  }
}

function mouseClicked() {
  if (
    state === "start" &&
    mouseX >= width / 2 - 60 &&
    mouseX <= width / 2 + 60 &&
    mouseY >= height / 2 &&
    mouseY <= height / 2 + 40
  ) {
    state = "game";
  }
}
