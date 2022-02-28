var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombie_img,zombie_group;
var heart1_img,heart2_img,heart3_img;
var heart1,heart2,heart3
var bullet,bullet_group,bullets =50,bullet_img
var gamestate ="fighting"
var life =3 ;
var score =0;
var explosion_sound,lose_sound,win_sound;
var reset_img,reset

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombie_img =loadImage("assets/zombie.png");
  heart1_img =loadImage("assets/heart_1.png")
  heart2_img =loadImage("assets/heart_2.png")
  heart3_img =loadImage("assets/heart_3.png")
  bullet_img =loadImage("assets/bullet.png")
  explosion_sound =loadSound("assets/explosion.mp3")
  lose_sound =loadSound("assets/lose.mp3")
  win_sound =loadSound("assets/win.mp3")
  reset_img =loadImage("assets/reset2.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

bullet_group =new Group();

reset =createSprite(displayWidth/2,displayHeight/2)
reset.addImage(reset_img)
reset.scale =0.3
reset.visible =false

  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

   zombie_group =new Group();

 //creating heart sprites
 heart3 =createSprite(displayWidth-250,60,0,0)
 heart3.addImage(heart3_img)
 heart3.scale =0.4 
 heart3.visible =true

 heart2 =createSprite(displayWidth-200,60,0,0)
 heart2.addImage(heart2_img)
 heart2.scale =0.4
 heart2.visible =false

 heart1 =createSprite(width-160,60,0,0)
 heart1.addImage(heart1_img)
 heart1.scale =0.4
 heart1.visible =false



}

function draw() {
  background(0);
  drawSprites();
  
   

  if(gamestate==="fighting"){

    if(life===3){
      heart3.visible =true
      heart2.visible =false
      heart1.visible =false
      }
      
      if(life===2){
        heart2.visible =true
        heart1.visible =false
        heart3.visible =false
        }
      
        if(life===1){
          heart1.visible =true
          heart2.visible =false
          heart3.visible =false
          }
      
          if(life===0){
            gamestate ="lost"
            heart1.visible =false
            heart2.visible =false
            heart3.visible =false
            }
      
            if(score ===100){
      gamestate ="win"
      win_sound.play();
            }

 //moving the player up and down and making the game mobile compatible using touches
 if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if(keyWentDown("space")){
  bullet =createSprite(player.x,player.y,20,10)
  bullet.addImage(bullet_img)
  bullet.scale =0.05
  bullet.velocityX =15
  bullet.depth =player.depth
  bullet.depth +=2
  bullet_group.add(bullet)
  bullets -=1
 
  player.addImage(shooter_shooting)
 
}//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(bullets===0){
  gamestate ="bullet"
  lose_sound.play();
}

if(zombie_group.isTouching(player)){
for(var i =0; i<zombie_group.length; i++){
if(zombie_group[i].isTouching(player)){   
    zombie_group[i].destroy();  
    life-=1;
    lose_sound.play();
  }
}
}

textSize(30)
  fill("white")
  text("BULLETS="+bullets,100,50)

  textSize(30)
  fill("blue")
  text("SCORE="+score,250,50)

if(bullet_group.isTouching(zombie_group)){
for(var i=0; i<zombie_group.length; i++){
if(zombie_group[i].isTouching(bullet_group)){
  zombie_group[i].destroy()
  bullet_group.destroyEach()
  score+=5
  explosion_sound.play()
}
}

}

if(bullet_group.isTouching(zombie_group)){
  for(var i=0; i<bullet_group.length; i++){
    if(bullet_group[i].isTouching(zombie_group)){
      zombie_group[i].destroy()
      bullet_group[i].destroy()
    }
    }
}



//release bullets and change the image of shooter to shooting position when space is pressed

createZombies();



  }
//end

 else if(gamestate==="bullet"){
    textSize(70)
    fill("white")
    text("you run out of bullets ",width/2-300,height/2)
    zombie_group.destroyEach()
    player.destroy()
reset.visible =true
if(mousePressed(reset)){
  reset2()
}

  }
  else if(gamestate==="win"){
textSize(70)
fill("green")
text("Congratulations! you won the game",width/2-300,height/2)
/zombie_group.destroyEach()
player.destroy()
reset.visible =true
if(mousePressed(reset)){
  reset2()
}
  }
  else{
   textSize(70)
    fill("red")
    text("GameOver!,Try next time",width/2-350,height/2) 
    zombie_group.destroyEach()
   player.destroy() 
    reset.visible =true
    if(mousePressed(reset)){
      reset2()
    }
  }
    

//end

}






function createZombies(){
  if(frameCount%60 == 0){
zombie =createSprite(random(1000,2000),random(100,500),20,20)
zombie.addImage(zombie_img)
zombie.velocityX =-3
zombie.scale =0.15
zombie.lifetime =400
zombie.debug = false
   zombie.setCollider("rectangle",0,0,500,1000)
   zombie_group.add(zombie);
}
}
function reset2(){
  gamestate ="fighting"
  score =0
  bullets =50
  player.x = displayWidth-1150 
  player.y = displayHeight-300
  player.visible =true
}

