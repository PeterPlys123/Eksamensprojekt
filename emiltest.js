if(keyIsDown(32) && playerY + playerR >= playerGround ){ //Hop / spacebar
    playerYVelocity -= playerJumpSpeed;
    playerY += playerYVelocity;
}