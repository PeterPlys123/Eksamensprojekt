let playerD = 60;
let playerR = playerD / 2;
let playerX, playerY;

let playerYVelocity = 0;
let playerXVelocity = 0;
let playerXSpeed = 7;
let playerYSpeed = 10;

let playerJumpSpeed = 10;
let playerJumpSpeedTotal = playerJumpSpeed;
let playerJumpMax = 30; // Max højde på hop
let isJumpDown = false;
let isJumpReleased;
let isJumpDownAcc = 20 / 120;

let playerGravityAcc = 0.5; // Pixels per frame acceleration
let playerGravityMax = 20;
let playerGround = 500;

function applyGravity() {
    if (isGodMode == false) {
        // Juster playerGround med scrollen
        if (playerY + playerR <= playerGround + scroll && playerYVelocity < 25) {
            playerYVelocity += playerGravityAcc; 
            playerY += playerYVelocity;
        } else {
            playerYVelocity = 0;
        }
    }
}

function playerMovement() {
    if (isGodMode == true) {
        // Fri bevægelse i alle retninger
        if (keyIsDown(65)) playerX -= playerXSpeed; // A
        if (keyIsDown(68)) playerX += playerXSpeed; // D
        if (keyIsDown(87)) playerY -= playerYSpeed; // W
        if (keyIsDown(83)) playerY += playerYSpeed; // S

        playerYVelocity = 0; // Deaktiver tyngdekraft i God Mode
        playerGravityAcc = 0;
    } else {
        if (keyIsDown(65)) playerX -= playerXSpeed;
        if (keyIsDown(68)) playerX += playerXSpeed;

        playerGravityAcc = 0.5;
    }
}

function keyPressed() {
    if (keyCode === 32) { // Space for at hoppe
        isJumpDown = true;
        isJumpReleased = false;
    }  
    if (keyCode === 71) { // "G" for God Mode
        isGodMode = !isGodMode; //
    }
}

function keyReleased() { // Når knappen slippes så hopper man
    if (keyCode === 32) {
        isJumpDown = false;
        isJumpReleased = true;
    }
}

function peformJump() { // Hop funktion
    if (isGodMode == false) {
        if (isJumpDown == true && playerJumpSpeedTotal < playerJumpMax) {
            playerJumpSpeedTotal += isJumpDownAcc; 
        } else if (playerY + playerR >= playerGround + scroll && isJumpReleased == true) {
            playerYVelocity -= playerJumpSpeedTotal;
            playerY += playerYVelocity;
            playerJumpSpeedTotal = playerJumpSpeed;
            isJumpReleased = false;
        }
    }
}

