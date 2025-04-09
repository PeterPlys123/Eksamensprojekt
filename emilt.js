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
let playerGround = 500;

let scroll;
let isGodMode = false; // Aktiverer God Mode

function setupGame() {
    cnvHeight = windowHeight - 100;
    cnvWidth = windowWidth - 100;

    playerX = cnvWidth / 2;
    playerY = cnvHeight / 2;

    frameRate(60);

    cnv = createCanvas(cnvWidth, cnvHeight);
    cnv.position(windowWidth - (windowWidth + cnvWidth) / 2, 0); // Centrere canvas
    scroll = 0;
}



function drawPlayer() {
    circle(playerX, playerY, playerD);
}

function drawAllNonPlayer() {
    line(0, playerGround, cnvWidth, playerGround);
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

    circle(300, 300, 50);  // Cirkel
    drawAllNonPlayer();

    pop();

    drawPlayer();
}

