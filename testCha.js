let playerX = 300;
let playerY = 200;
let playerXSpeed = 5;
let playerYSpeed = 10;
let playerR = 15;
let playerXVelocity

function testBevægelse(){
    fill('red')
    circle(playerX, playerY, playerR*2);
    if(keyIsDown(65)){ //left
        playerX -= playerXSpeed;
    }
    if(keyIsDown(68)){ //right
        playerX += playerXSpeed;
    }
    if(keyIsDown(87)){ //up
        playerY -= playerYSpeed;
    }
    if(keyIsDown(83)){ //down
        playerY += playerYSpeed;
    }

}