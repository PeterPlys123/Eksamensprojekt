let cnvwidth = 1500;
let cnvheight = 600;
let cnv; //canvas

let playerD = 60;
let playerX = cnvwidth / 2;
let playerY = cnvheight - playerD / 2;

let playerYVelocity;
let playerXSpeed = 7;
let playerYSpeed = 7;

let isUp;
let isDown;
let isLeft;
let isRight;

function setup(){
    cnv = createCanvas(cnvwidth, cnvheight);
    cnv.position(windowWidth - (windowWidth + cnvwidth) / 2, 0) //centrere canvas
}
function playerGravity(){

    let playerGravity = 0.5;
    let playerGround = cnvheight;

    if(playerY + playerD / 2 < playerGround){
        playerYVelocity += playerGravity;
        playerY += playerYVelocity;
    } else{
        playerYVelocity = 0;
    }
}

function keyPressed(){
    if(keyIsDown(65)){ //left a
        isLeft = true;
    } else{
        isLeft = false;
    }
    if(keyIsDown(68)){ //right d
        isRight = true;
    } else{
        isRight = false
    }
    if(keyIsDown(87)){ //up w
        isUp = true;
    } else{
        isUp = false
    }
    if(keyIsDown(83)){ //down s
        isDown = true;
    } else{
        isDown = false
    }
}

function playerMovement(){
    if(keyIsDown(65)){ //left
        playerX -= playerXSpeed;
    }
    if(keyIsDown(68)){ //right
        playerX += playerXSpeed;
    }
    if(keyIsDown(87)){ //up
        playerY -= playerYSpeed;
        isUp = true;
    } else{
        isUp = false;
    }
    if(keyIsDown(83)){ //down
        playerY += playerYSpeed;
        isDown = true
    } else{
        isDown = false
    }

    circle(playerX, playerY, playerD);
    
}
  
function verticalScroll(){
    let scroll;

    translate (0, scroll)

    if(isUp == true){
        if(playerY < height / 2){
            scroll += 5
        }
    }
}


function draw(){
    background(200);
    //playerMovement();
    //playerGravity();
}