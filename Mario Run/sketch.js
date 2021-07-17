var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var ground, groundImage;
var back, backImage;
var mario, mario_Animation;
var obstacle, obstacleImage, obstaclGroup;
var score, score1, scpre2;
var coin, coinImage, coinGroup, coin1Image, coin1Group, coin1;
var gameState = "play";
var bird, birdImage, birdGroup;
var gameover, gameoverImage;
var cola, colaImage, colaGroup;
var play,playImage;

function preload() {
  groundImage = loadAnimation("ground_1.png", "ground_1-1.png");
  backImage = loadImage("back..png");
  mario_Animation = loadImage("m.png");
  obstacleImage = loadImage("green.png");
  sunImage = loadImage("sun.png");
  coinImage = loadImage("coin.png");
  cloudImage = loadImage("cloud.png");
  coin1Image = loadImage("coin-1.png");
  colaImage = loadImage("cola.png");
  gameoverImage = loadImage("gameover.png");
  playImage=loadImage("play.png")
}

function setup() {
  createCanvas(600, 600);

  ground = createSprite(300, 580);
  ground.addAnimation("brown", groundImage);
  ground.velocityX = -5;

  mario = createSprite(100, 500);
  mario.addImage(mario_Animation);
  mario.scale = 0.1;

    gameover = createSprite(300, 250);
    gameover.addImage(gameoverImage);
    gameover.scale = 0.1;
  
     play = createSprite(290, 450);
    play.addImage(playImage);
    play.scale = 0.5;
  
  score = 0;
  coinGroup = new Group();
  coin1Group = new Group();
  obstacleGroup = new Group();

  colaGroup = new Group();
  cloudGroup = new Group();

  mario.setCollider("rectangle", 20, 350, 230, 500);
  mario.debug = true;

  score = 0;
  score1 = 0;
  score2 = 0;
}

function draw() {
  background("lightblue");

  
  textSize(30);
   fill("red")
text("high score:" + score2, 370, 100);
    score2 = score2 + Math.round(getFrameRate() / 60);
  fill("black")
  text("coins:" + score, 370, 50);
  text("cola:" + score1, 10, 50);
  if (gamestate === PLAY) {
    ground.velocityX = -(5 + (10 * score) / 100);
   play.visible = false;
    gameover.visible = false;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space")) {
      mario.velocityY = -15;
    }
    if (frameCount % 200 === 0) {
      ground.velocityX = ground.velocityX + 5;
    }
    spawnObstacle();
    spawnCoin();
    spawnCoin1();
    spawnCloud();
    spawnCola();
    if (obstacleGroup.isTouching(mario)) {
      gamestate = END;
    }
  } else if (gamestate === END) {
    background("black");
    play.visible = true;
    gameover.visible = true;
    mario.visible = false;
    ground.velocityX = 0;
    ground.visible = false;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    colaGroup.destroyEach();
    coinGroup.destroyEach();
    coin1Group.destroyEach();
    ground.velocityX = 0
  }

  mario.velocityY = mario.velocityY + 0.8;

  mario.collide(ground);

  if (coinGroup.isTouching(mario)) {
    score = score + 1;
    coinGroup.destroyEach();
  }
  if (coin1Group.isTouching(mario)) {
    score = score + 1;
    coin1Group.destroyEach();
  }
  if (colaGroup.isTouching(mario)) {
    colaGroup.destroyEach();
    score1 = score1 + 1;
  }
  
  cloudGroup.depth = mario.depth;
  mario.depth = mario.depth + 1; 
 
 
 if(mousePressedOver(play)) {
      reset();
    }
  
  
  drawSprites();
}

function reset(){
  gamestate =PLAY;
  ground.visible = true;
  mario.visible = true;
  score = 0;
  score1=0;
  score2 = 0;
}


function spawnObstacle() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(400, 550, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    ground.depth = obstacle.depth;
    ground.depth += 1;
    obstacleGroup.add(obstacle);
  }
}
function spawnCoin() {
  if (frameCount % 120 === 0) {
    var coin = createSprite(300, 100, 2, 2);
    coin.y = Math.round(random(100, 400));
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.velocityX = -5;
    coinGroup.add(coin);
  }
}
function spawnCoin1() {
  if (frameCount % 100 === 0) {
    var coin1 = createSprite(300, 100, 2, 2);
    coin1.y = Math.round(random(50, 100));
    coin1.addImage(coin1Image);
    coin1.scale = 0.1;
    coin1.velocityX = -5;
    coin1Group.add(coin1);
  }
}
function spawnCloud() {
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(50, 200));
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.velocityX = -3;
    cloudGroup.add(cloud);

    //assign lifetime to the variable
    cloud.lifetime = 200;
  }
}
function spawnCola() {
  if (frameCount % 300 == 0) {
    var cola = createSprite(300, 300);
    cola.y = Math.round(random(100, 300));
    cola.addImage(colaImage);
    cola.scale = 0.1;
    cola.velocityX = -5;
    cola.lifeTime = 200;
    colaGroup.add(cola);
  }
}
