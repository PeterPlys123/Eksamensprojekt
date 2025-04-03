let playerX = 300;
let playerY = 200;
let playerXSpeed = 5;
let playerYSpeed = 10;
let playerR = 15;
let playerXVelocity
var dx, dy
let playerAfstand

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

function kollision(){
for(let i = 0; i < bBlokArrayX.length; i++){
    if(playerY - playerR > bBlokArrayY[i] && playerY + playerR < bBlokArrayY[i] && playerX + playerR > bBlokArrayX[i] && playerX - playerR < bBlokArrayX[i] + blokBredde){
        dy = playerY - bBlokArrayY[i]
        console.log('y')
        dx = playerX - bBlokArrayX[i]
        console.log('x')
        playerAfstand = Math.sqrt(dx**2 + dy**2);
        }
    }

if(playerAfstand <= playerR){
    console.log('hej')
    let playerOverlap = playerR - playerAfstand
    let vinkel = Math.atan2(dy, dx)
    playerX -= Math.cos(angle) * PlayerOverlap / 2;
    playerY -= Math.sin(angle) * PlayerOverlap / 2;
}

}