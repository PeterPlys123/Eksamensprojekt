let cnvwidth;
let cnvheight;
let cnv; //canvas

let playerD = 60;
let playerR = playerD / 2
let playerX;
let playerY;
//let playerXConstrain = constrain(playerX, 0, cnvwidth)
//let playerYConstrain = constrain(playerY, 0, )

let playerYVelocity = 0;
let playerXSpeed = 7;
let playerYSpeed = 7;
let playerJump = 10;

let playerGravityAcc = 0.01; //Pixels per fram acceleration
let playerGround;

let scroll;

function setup(){
    cnvheight = windowHeight - 100
    cnvwidth = windowWidth - 100

    playerX = cnvwidth / 2
    playerY = cnvheight / 2

    playerGround = cnvheight - 100;

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

function drawPlayer(){
    circle(playerX, playerY, playerD);
}
  
function verticalScrollAndDrawAll(){

    playerMovement();
    playerGravity();

    if(playerY < height * 0.1){//For player på vej op
        scroll += 5
    }
    if(playerY > height * 0.9){//For player på vej ned
        scroll -= 5
        playerY -= playerYVelocity
    }

    push(); //Alt hvad der skal "bevæge" sig når spilleren hopper op og falder ned skal være mellem push og pop
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