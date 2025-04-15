let cnvWidth, cnvHeight, cnv; // Canvas

let scroll;
let isGodMode = false; // God Mode toggle

let img;

function preload(){
    img = loadImage('skyBackground.jpg')
}

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

function verticalScrollandDraw() {
    if (isGodMode == false) {
        performJump();
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

function setup(){
    setupGame();
}

function draw(){
    image(img, 0, 0, width, height)
    verticalScrollandDraw();
}

