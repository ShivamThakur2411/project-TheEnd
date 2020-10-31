var pikachu, pikachu_running, pikachu_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstacle, obstacle_running;
var song,song3;
var camera;
var gameState=0;

function preload(){
  pikachu_running = loadAnimation("Pikachu1.png","Pikachu3.png","Pikachu2.png");
  pikachu_collided = loadImage("PikachuFainted.png");
  obstacle_running = loadAnimation("charmander2.png","charmander4.png","charmander3.png","charmander4.png");

  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("Cloud.png");

  song = loadSound("jump.mp3");
  song3 = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = 0;
  
  pikachu = createSprite(50,180,20,50);
  pikachu.addAnimation("running", pikachu_running);
  pikachu.scale = 0.1;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstacle = createSprite(400,160,40,10);
  obstacle.addAnimation("running", obstacle_running);
  obstacle.scale = 0.15;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(255);
    if(gameState===0){
    obstacle.velocityX = -7;
    camera.position.x = pikachu.x;

    score = score + Math.round(getFrameRate()/60);
     if(keyDown("space")&&pikachu.y>=161) {
    pikachu.velocityY = -15;
       song.play();
  }

  if(obstacle.x<-220){
    obstacle.x = 600;
  }

     pikachu.velocityY = pikachu.velocityY + 0.8;
    
    spawnClouds();
}
pikachu.collide(invisibleGround);
text("Score: "+ score, 500,50);

if(pikachu.isTouching(obstacle)){
  gameState = 1;
}

if(gameState===1){
  pikachu.destroy();
  cloudsGroup.setLifetimeEach(-1);
  cloudsGroup.setVelocityXEach(0);
}


  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 400;
    cloud.depth = pikachu.depth;
    pikachu.depth = pikachu.depth + 1;
    cloudsGroup.add(cloud);
  } 
}
