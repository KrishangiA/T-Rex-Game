//declaring global variables
var trex ,trex_running;
var ground, ground2;
var invisibleground;
var cloud, cloudsGroup;
var cloudImage;
var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6, obstacle, obstaclesGroup;
var score;
var Play=1;
var End=0;
var gameState=Play;

//loading images and Animations
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
ground=loadImage("ground2.png");
cloudImage=loadImage("cloud.png");
cactus1=loadImage("obstacle1.png");
cactus2=loadImage("obstacle2.png");
cactus3=loadImage("obstacle3.png");
cactus4=loadImage("obstacle4.png");
cactus5=loadImage("obstacle5.png");
cactus6=loadImage("obstacle6.png");



}


function setup(){
  
  // writing the score
  score=0;

  //creating canvas
  createCanvas(1280,609);

  //creating trex
  trex=createSprite(50,550,20,20);
  trex.addAnimation("trex_running",trex_running);
  trex.scale=0.5;

  //creating ground
  ground2=createSprite(640,560,1280,40);
  ground2.addImage("ground",ground);
  

  //creating invisibleground
  invisibleground=createSprite(640,565,1280,10);
  invisibleground.visible=false;

  // createing Cloud group
  cloudsGroup=new Group();

  // creating  obstacle group
  obstacleGroup=new Group();



 
}

function draw(){  
  //make backround gray
  background("black");
  
  //draw sprites
  drawSprites();

  textSize(20);
  text("Score: "+score,40,50);
  
 // console.log(trex.y);

 if(gameState == Play){
  ground2.velocityX=-3;
  
  //making infinite ground
 if(ground2.x<0){  
  ground2.x=ground2.width/2;
  }

   // making trex jum when space key is clicked
   if(keyDown("space") && trex.y>=536){

    //trex velocity
    trex.velocityY=-15;
   }

     // calling function sponclouds
  sponclouds();

  // calling function sponobstacles
  sponobstacles();

  // trex velocity increase
  trex.velocityY=trex.velocityY+1;

  if(obstaclesGroup.isTouching(trex)){
    gameState = End;
  }

  
  

 }
 else if(gameState == End){
  ground2.velocityX=0;
 }

 
 

  

  // trex collide with ground
  trex.collide(invisibleground);




  


}

function sponobstacles(){
  if(frameCount %80 == 0){
    obstacle=createSprite(1200,530,20,20);
    obstacle.velocityX=-7;
    var Image=Math.round(random(1,6));
    switch(Image){
      case 1:
        obstacle.addImage(cactus1);
        break
      case 2:
        obstacle.addImage(cactus2);
        break
      case 3:
        obstacle.addImage(cactus3);
        break
      case 4:
        obstacle.addImage(cactus4);
        break
      case 5:
        obstacle.addImage(cactus5);
        break
      case 6:
        obstacle.addImage(cactus6);
        break
        default: break;
    }
   
    obstacle.scale=0.75;
    obstacle.lifetime=172;
    obstacleGroup.add(obstacle);
 }
}

function sponclouds() {
  if(frameCount %60 == 0){
  cloud=createSprite(1200,400,40,10);
  cloud.y=Math.round(random(250,500));
  cloud.addImage("cloud", cloudImage);
  cloud.velocityX=-5;
  cloud.scale=0.75;
  cloud.lifetime=240;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  
  cloudsGroup.add(cloud);
  

  }
}
