let playerX = 300;
let playerY = 200;
let playerXSpeed = 5;
let playerYSpeed = 7;

function testBevægelse(){
    fill('red')
    circle(playerX, playerY, 30);
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