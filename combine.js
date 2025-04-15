// --Alle variabler først--
let cnvWidth, cnvHeight, cnv; // Canvas

let scroll;
let isGodMode = false; // God Mode toggle


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
let playerGround = false;


let pPlayerX,
newPlayerX

let playerGroundP = false
let collision
let blokBredde = 75
let blokTyk = 20

let trampHop = -15
let blokKolStop = 1

let bBlokArrayX = [150, 200]
let bBlokArrayY = [50, -500]

let speedBlokArrayX = [250]
let speedBlokArrayY = [125]

let sandBlokArrayX = [350]
let sandBlokArrayY = [250]

let trampBlokArrayX = [450]
let trampBlokArrayY = [375]

let fældeBlokArrayX = [550]
let fældeBlokArrayY = [400]

let farveArray = ['black', 'red', 'gray', 'yellow', 'lightblue']


// --emilt.js--
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
    
    noStroke();
    fill('lightgreen');
    rect(0, 500, cnvWidth, 400);
    fill('#836539');
    rect(0, 900, cnvWidth, 100000)

    madsDraw();

    pop();

    drawPlayer();
}

// --player(Emil).js--

function applyGravity() {
    if(playerY + playerR > 500 + scroll){
        playerGround = true
    } else{
        playerGround = false
    }
    if (isGodMode == false) {
        if (playerGround == true || playerGroundP == true) {
            // Spilleren er på jorden eller platformen, stop tyngdekraften
            playerYVelocity = 0;
        } else {
            // Spilleren er i luften, så anvend tyngdekraften
            if (playerYVelocity < playerGravityMax) {
                playerYVelocity += playerGravityAcc;
            }
            playerY += playerYVelocity; // Opdater spillerens Y-position med tyngdekraften
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

function performJump() { // Hop funktion
    if (isGodMode == false && (playerGround == true || playerGroundP == true)) {
        if (isJumpDown == true && playerJumpSpeedTotal < playerJumpMax) {
            playerJumpSpeedTotal += isJumpDownAcc; 
        } else if (isJumpReleased == true) {
            playerYVelocity -= playerJumpSpeedTotal;
            playerY += playerYVelocity;
            playerJumpSpeedTotal = playerJumpSpeed;
            isJumpReleased = false;
        }
    }
}


// --primærSide.js--


function madsDraw(){
        //Hastighed til at glide på isblokkene.
        pPlayerX = newPlayerX
        newPlayerX = playerX
        playerXVelocity = pPlayerX - newPlayerX
    
        //Tyngdekraft
        //Fungere ved at der er en ground, som skifter mellem true og false.
        //Når der er kollision med en platform er den true, og når man hopper, eller går over kanten er den false.
    
    //Her tegnes basis blokkene
    for(let i = 0; i < bBlokArrayX.length; i++)
        {
        fill(farveArray[2])
        rect(bBlokArrayX[i], bBlokArrayY [i], blokBredde, blokTyk)
        }
    
    //Her kigges der på kollision.
        for(let i = 0; i < bBlokArrayY.length; i++)
        {
            if(playerY + playerR > (bBlokArrayY[i] + scroll) && playerY - playerR < (bBlokArrayY[i] + scroll))
            {
                if(playerX + playerR > bBlokArrayX[i] && playerX - playerR <bBlokArrayX[i] + blokBredde)
                {
                    bBlok(i)
                }
                else
                {
                    playerGroundP = false
                }
            }
        }
    
    //Her tegnes speed blokkene
        for(let i = 0; i < speedBlokArrayX.length; i++)
            {
            fill(farveArray[4])
            rect(speedBlokArrayX[i], speedBlokArrayY[i], blokBredde, blokTyk)
            }
        
    //Her kigges der på kollision.
            for(let i = 0; i < speedBlokArrayY.length; i++)
            {
                if(playerY + playerR > (speedBlokArrayY[i] + scroll) && playerY - playerR < (speedBlokArrayY[i] + scroll))
                {
                    if(playerX + playerR > speedBlokArrayX[i] && playerX - playerR < speedBlokArrayX[i] + blokBredde)
                    {
                        isBlok(i)
                    }
                    else
                    {
                        playerGroundP = false
                    }
                }
            }
    
    //Her tegnes sandBlokken.
    for(let i = 0; i < sandBlokArrayX.length; i++)
        {
        fill(farveArray[3])
        rect(sandBlokArrayX[i], sandBlokArrayY [i], blokBredde, blokTyk)
        }
    
    //Her kigges der på kollision.
        for(let i = 0; i < sandBlokArrayY.length; i++)
        {
            if(playerY + playerR > (sandBlokArrayY[i] + scroll) && playerY - playerR < (sandBlokArrayY[i] + scroll))
            {
                if(playerX + playerR > sandBlokArrayX[i] && playerX - playerR < sandBlokArrayX[i] + blokBredde)
                {
                    sandBlok(i)
                }
                else
                {
                    playerGroundP = false
                }
            }
        }
    
    //Her tegnes trampolinblokkene.
        for(let i = 0; i < trampBlokArrayX.length; i++)
            {
            fill(farveArray[0])
            rect(trampBlokArrayX[i], trampBlokArrayY [i], blokBredde, blokTyk)
            }
        
        //Her kigges der på kollision.
            for(let i = 0; i < trampBlokArrayY.length; i++)
            {
                if(playerY + playerR > (trampBlokArrayY[i] + scroll) && playerY - playerR < (trampBlokArrayY[i] + scroll))
                {
                    if(playerX + playerR > trampBlokArrayX[i] && playerX - playerR < trampBlokArrayX[i] + blokBredde)
                    {
                        trampBlok(i)
                    }
                    else
                    {
                        playerGroundP = false
                    }
                }
            }
    
    //Her tegnes fælde blokken.
            for(let i = 0; i < fældeBlokArrayX.length; i++)
                {
                fill(farveArray[0])
                rect(fældeBlokArrayX[i], fældeBlokArrayY [i], blokBredde, blokTyk)
                }
            
            //Her kigges der på kollision.
                for(let i = 0; i < fældeBlokArrayY.length; i++)
                {
                    if(playerY + playerR > (fældeBlokArrayY[i] + scroll) && playerY - playerR < (fældeBlokArrayY[i] + scroll))
                    {
                        if(playerX + playerR > fældeBlokArrayX[i] && playerX - playerR < fældeBlokArrayX[i] + blokBredde)
                        {
                            fældeBlok(i)
                        }
                        else
                        {
                            playerGroundP = false
                        }
                    }
                }
}

// --platformType.js--

function trampBlok(x)
{
    if(playerY <= trampBlokArrayY[x] + scroll)
        {
            playerYVelocity = trampHop
        }
        if(playerY >= trampBlokArrayY[x] + scroll)
        {
            playerYVelocity = blokKolStop
        }
}


function fældeBlok()
{
        //Der er ingen kollision over, da det er meningen man skal falde igennem.

        //Her kigges der for kollision mens spilleren er under.
        if(playerY >= fældeBlokArrayY[x] + scroll)
        {
            playerYVelocity = blokKolStop
        }
}


function bBlok(x)
{   
    //Her kigges der for, hvis kollisionen er mens spilleren er over blokken.
    if(playerY + playerR <= bBlokArrayY[x] + scroll)
    {
        playerGroundP = true
        playerYVelocity = 0
    }
    //Her kigges der for kollision mens spilleren er under.
    if(playerY + playerR >= bBlokArrayY[x] + scroll)
    {
        playerYVelocity = blokKolStop
    }
}



function sandBlok(x)
{
    if(playerY <= sandBlokArrayY[x] + scroll)
    {
        playerGroundP = true
        playerYVelocity = 0
    }
    if(playerY >= sandBlokArrayY[x] + scroll)
    {
        playerYVelocity = blokKolStop
    }
}


function isBlok(x)
{
    if(playerY <= speedBlokArrayY[x] + scroll)
    {
        playerX -= playerXVelocity * 0.5
        playerXVelocity -= 1

        playerGroundP = true
        playerYVelocity = 0
    }
    if(playerY >= speedBlokArrayY[x] + scroll)
    {
        playerYVelocity = blokKolStop
    }   
}


// --Setup og draw--
function setup(){
    setupGame();
}

function draw(){
    background('#33a2ff');
    verticalScrollandDraw();
    console.log('ground', playerGround, 'p', playerGroundP, 'scroll', scroll)
}