let cnvwidth = 1500;
let cnvheight = 600;
let cnv; //canvas

let playerD = 60;
let playerX = cnvwidth / 2;
let playerY = 200;

let playerYVelocity;
let playerXSpeed = 7;
let playerYSpeed = 7;

let isUp;
let isDown;
let isLeft;
let isRight;

let scroll;

function setup(){
    cnv = createCanvas(cnvwidth, cnvheight);
    cnv.position(windowWidth - (windowWidth + cnvwidth) / 2, 0) //centrere canvas
    scroll = 0
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
        playerX -= playerXSpeed;
    }
    if(keyIsDown(68)){ //right
        playerX += playerXSpeed;
    }
    if(keyIsDown(87) && playerY > height * 0){ //up
        playerY -= playerYSpeed;
    } 
    if(keyIsDown(83) && playerY < height * 0.9){ //down
        playerY += playerYSpeed;
    } 

    circle(playerX, playerY, playerD);
    
}
  
function verticalScroll(){

    playerMovement();
    //playerGravity();

    if(playerY < height * 0.1){
        scroll += 5
    }
    if(playerY > height * 0.9){
        scroll -= 5
    }

    push();
    translate (0, scroll)

    circle(300,300,50);
    pop();
    
}


function draw(){
    background(200);
    verticalScroll();

}