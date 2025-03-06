let playerX = 200;
let playerY = 200;
let playerD = 60;
let playerXSpeed = 10;
let playerYSpeed = 10;

function setup(){
    createCanvas(1000, 600);

}
function player(){


}


function draw(){
    background(200);
    if(keyIsDown(65)){ //left
        playerX -= playerXSpeed
    }
    if(keyIsDown(68)){ //right
        playerX += playerXSpeed
    }
    if(keyIsDown(87)){ //up
        playerY -= playerYSpeed
    }
    if(keyIsDown(83)){ //down
        playerY += playerYSpeed
    }
    circle(playerX, playerY, playerD);
}