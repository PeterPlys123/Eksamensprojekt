let playerD = 60;
let playerR = playerD / 2
let playerX;
let playerY;

let playerYVelocity = 0;
let playerXVelocity = 0;
let playerXSpeed = 7;
let playerYSpeed = 10;

let playerJumpSpeed = 10;
let playerJumpSpeedTotal = playerJumpSpeed;
let playerJumpMax = 30; //Max højde på hop
let isJumpDown = false;
let isJumpReleased;
let isJumpDownAcc = 20 / 120;

let playerGravityAcc = 0.5; //Pixels per frame acceleration
let playerGravityMax = 20;
let playerGround;

function playerGravity(){
    if(playerY + playerR <= playerGround && playerYVelocity < 25){
        playerYVelocity += playerGravityAcc; 
        playerY += playerYVelocity;
    } else{
        playerYVelocity = 0;
    }
}

function playerGodMode(){
    if(keyIsDown(87) && playerY > height * 0){ //up / w

        playerY -= playerYSpeed;
        playerYVelocity = 0;
        playerGravityAcc = 0;
    } else{
        playerGravityAcc = 0.5;
    }
    if(keyIsDown(83) && playerY < height * 0.9){ //down / s
        playerYVelocity = playerYSpeed
        playerY += playerYSpeed;
        
    } 
}

function playerNormalMovement(){
    if(keyIsDown(65)){ //left / a
        playerXVelocity = playerXSpeed
        playerX -= playerXVelocity;
    }
    if(keyIsDown(68)){ //right / d
        playerXVelocity = playerXSpeed
        playerX += playerXVelocity;
    }
}