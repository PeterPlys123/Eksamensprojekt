let playerX = 200;
let playerY = 200;
let playerD = 60;
let playerXSpeed = 10;
let playerYSpeed = 10;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
}
function player(){


}
function Movement(button, playerXOrY, movementDirection){
    if(keyIsDown(button) && movementDirection == left){
        playerXOrY 
    }
}

function draw(){
    background(200);
    circle(playerX, playerY, playerD);
}