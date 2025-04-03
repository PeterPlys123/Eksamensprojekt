let cnvWidth;
let cnvHeight;
let cnv; // Canvas

let playerD = 60;
let playerR = playerD / 2;
let playerX;
let playerY;

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
let playerGround;

let scroll;
let isGodMode = false; // Aktiverer God Mode

function setupGame() {
    cnvHeight = windowHeight - 100;
    cnvWidth = windowWidth - 100;

    playerX = cnvWidth / 2;
    playerY = cnvHeight / 2;

    // Sæt playerGround som en del af verdenskoordinaterne
    playerGround = 500;

    frameRate(60);

    cnv = createCanvas(cnvWidth, cnvHeight);
    cnv.position(windowWidth - (windowWidth + cnvWidth) / 2, 0); // Centrere canvas
    scroll = 0;
}

function applyGravity() {
    if (!isGodMode) {
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
    if (isGodMode) {
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
        isGodMode = !isGodMode;
    }
}

function keyReleased() {
    if (keyCode === 32) {
        isJumpDown = false;
        isJumpReleased = true;
    }
}

function peformJump() {
    if (isGodMode == false) {
        // Juster jump baseret på verdensposition
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

function drawPlayer() {
    circle(playerX, playerY, playerD);
}

function drawAllNP() {
    // Her kan du tilføje flere objekter i din verden
}

function verticalScroll() {
    if (isGodMode == false) {
        peformJump();
        applyGravity();
    }
    playerMovement();

    if (isGodMode == true) {
        // Scroll når spilleren flyver i God Mode
        if (playerY < height * 0.1) {
            scroll += playerYSpeed; // Ryk op
            playerY += playerYSpeed;
        }
        if (playerY > height * 0.9) {
            scroll -= playerYSpeed; // Ryk ned
            playerY -= playerYSpeed;
        }
    } else {
        // Normal scrolling (baseret på tyngdekraft)
        if (playerY < height * 0.1 && playerYVelocity < 0) { 
            scroll -= playerYVelocity;
            playerY -= playerYVelocity;
        }
        if (playerY > height * 0.9 && playerYVelocity > 0) { 
            scroll -= playerYVelocity;
            playerY -= playerYVelocity;
        }
    }

    push(); ////Alt hvad der skal "bevæge" sig når spilleren hopper op og falder ned skal være mellem push og pop
    //Det vil sige alt hvad der sidder fast på canvas 

    translate(0, scroll);  // Apply scroll translation
    circle(300, 300, 50);  // Eksempel på en fast cirkel
    
    pop();

    drawPlayer();
}

function draw() {
    background(200);
    verticalScroll();
}

// P5.js event listeners
function setup() {
    setupGame();
}


