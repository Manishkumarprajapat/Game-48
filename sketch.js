var PLAY = 1;
var END = 0;
//var SERVE;
var gameState = PLAY;
var cloud,cloudImg,bird,birdImage,button,buttonImg,trex,trexImg,gameover,gameOverImg,bg,backImg
var birdsGroup,cloudsGroup ;
var Score=0;


function preload() {
    birdImage = loadImage("enemybird.png");
    buttonImg = loadImage("utton.png");
    cloudImg = loadImage("angrycloud.png");
    trexImg = loadImage("trex1.png");
  
    backImg = loadImage("background.png");
    gameOverImg = loadImage("gameOver.png");
}

function setup(){
    createCanvas(1200,400);
    bg = createSprite(0,0,1200,400);
    bg.addImage(backImg);
    bg.scale=7
    bg.velocityX=-5
    
    
    trex = createSprite(50,180,20,50);
    trex.addImage(trexImg);
    
    
    
    restart = createSprite(600,300,1,1);
    restart.addImage(buttonImg);
    restart.scale=0.2
    restart.visible=false;

    

    gameover = createSprite(400,200);
    gameover.addImage(gameOverImg);
    gameover.visible = false;

    birdsGroup = new Group();
    cloudsGroup = new Group();

    ground=createSprite(600, 480, 1200, 200);
    ground.visible=false;
    

    invisibleGround=createSprite(600, 500, 1200, 200);
    invisibleGround.visible=false;


}

function draw(){
  background(0)
    // if(gameState === PLAY)
    // {
    //   getreadyimage.visible = true;
    //   //gameOverImg.visible = false;
    // }
   // if(keyDown(UP_ARROW))
    //{
      //gameState = PLAY;
      //trex.visible = true;
      //getready.visible = false;
      //gameOverImg.visible = false;
    //}
    text("Score: "+ Score, 500,50);
  
  if (gameState===PLAY){
    bg.velocityX = -5;
    if(bg.x<0){
      bg.x = width/2;
    }
    ground.velocityX=-5
    if(ground.x<0){
      ground.x = width/2;
    }

  gameOverImg.visible = false;
    if(keyDown("space")) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    spawnClouds();
    spawnBirds();
  
    if(birdsGroup.isTouching(trex)||cloudsGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
   bg.velocityX = 0;
   gameover.visible = true;

    restart.visible = true;
    
    //set velcity of each game object to 0
   
    trex.velocityY = 0;
    birdsGroup.destroyEach();
    cloudsGroup.destroyEach();
   
    birdsGroup.setLifetimeEach(0);
    cloudsGroup.setLifetimeEach(0);
    
    if(mousePressedOver(restart)) {
      reset();
    }

    


  }
  trex.collide(invisibleGround);
  drawSprites();
}

function reset(){
  gameState = PLAY;


 gameover.visible = false;
  restart.visible = false;
  
  birdsGroup.destroyEach();
  cloudsGroup.destroyEach();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(30,80));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}



function spawnBirds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var bird = createSprite(600,120,40,10);
    bird.y = Math.round(random(10,120));
    bird.addImage(birdImage);
    bird.scale = 0.3;
    bird.velocityX = -3;
    
     //assign lifetime to the variable
    bird.lifetime = 200;
    
    //adjust the depth
    bird.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    birdsGroup.add(bird);
  }
}