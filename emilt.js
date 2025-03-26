let cnvwidth;
let cnvheight;
let cnv; //canvas

let playerD = 60;
let playerR = playerD / 2
let playerX;
let playerY;

let playerYVelocity = 0;
let playerXSpeed = 7;
let playerYSpeed = 7;
let playerJumpSpeed = 10;
let playerJumpSpeedTotal = playerJumpSpeed;
let playerJumpMax = 30; //Max højde på hop
let isJumpDown = false;
let isJumpReleased;
let isJumpDownAcc = 20 / 120;

let playerGravityAcc = 0.5; //Pixels per frame acceleration
let playerGround;

let scroll;

function setup(){
    cnvheight = windowHeight - 100
    cnvwidth = windowWidth - 100

    playerX = cnvwidth / 2
    playerY = cnvheight / 2

    playerGround = cnvheight - 100;

    frameRate(60)

    cnv = createCanvas(cnvwidth, cnvheight);
    cnv.position(windowWidth - (windowWidth + cnvwidth) / 2, 0) //centrere canvas
    scroll = 0
}

function playerGravity(){
    if(playerY + playerR < playerGround){
        playerYVelocity += playerGravityAcc;
        playerY += playerYVelocity;
    } else{
        playerYVelocity = 0;
    }
}


function playerMovement(){
    if(keyIsDown(65)){ //left / a
        playerX -= playerXSpeed;
    }
    if(keyIsDown(68)){ //right / d
        playerX += playerXSpeed;
    }
    if(keyIsDown(87) && playerY > height * 0){ //up / w
        playerY -= playerYSpeed;
    } 
    if(keyIsDown(83) && playerY < height * 0.9){ //down / s
        playerY += playerYSpeed;
    } 
}

function keyPressed(){
    if(keyCode === 32){
        isJumpDown = true;
        isJumpReleased = false;
    } 
}
function keyReleased(){
    if(keyCode === 32){
        isJumpDown = false;
        isJumpReleased = true;
    }
}

function playerJump(){
   if(isJumpDown == true && playerJumpSpeedTotal < playerJumpMax){
        playerJumpSpeedTotal += isJumpDownAcc 
   } else if(playerY + playerR >= playerGround && isJumpReleased == true){
        playerYVelocity -= playerJumpSpeedTotal;
        playerY += playerYVelocity;
        playerJumpSpeedTotal = playerJumpSpeed;
        isJumpReleased = false;
   }
}

function drawPlayer(){
    circle(playerX, playerY, playerD);
}
  
function verticalScrollAndDrawAll(){

    playerJump();
    playerMovement();
    playerGravity();

    if(playerY < height * 0.1 && playerYVelocity < 0){//For player på vej op
        scroll -= playerYVelocity
        playerY -= playerYVelocity
    }
    if(playerY > height * 0.9){//For player på vej ned
        scroll += playerYVelocity
        playerY -= playerYVelocity
    }

    push(); //Alt hvad der skal "bevæge" sig når spilleren hopper op og falder ned skal være mellem push og pop
    //Det vil sige alt hvad der sidder fast på canvas 
    translate (0, scroll)

    circle(300,300,50);

    pop();

    drawPlayer();
}


function draw(){
    background(200);
    verticalScrollAndDrawAll();
    //playerMovement();
    //playerGravity();

}