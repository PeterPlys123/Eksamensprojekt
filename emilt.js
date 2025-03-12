let cnvwidth = 1500;
let cnvheight = 600;
let cnv; //canvas

let playerD = 60;
let playerX = cnvwidth / 2;
let playerY = cnvheight - playerD / 2;

let playerYVelocity;
let playerXSpeed = 7;
let playerYSpeed = 7;



function setup(){
    cnv = createCanvas(cnvwidth, cnvheight);
    cnv.position(windowWidth - (windowWidth + cnvwidth) / 2, 0)
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

function playerMovement(){
    if(keyIsDown(65)){ //left
        playerX -= playerXSpeed
    }
    if(keyIsDown(68)){ //right
        playerX += playerXSpeed
    }
    if(keyIsDown(87)){ //up
        playerY -= playerYSpeed
    }
    circle(playerX, playerY, playerD);
}
  
function verticalScroll(){
    let scroll;

    translate (0, scroll)
}


function draw(){
    background(200);
    playerMovement();
    //playerGravity();
}