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
let playerJumpMax = 20; // Max højde på hop  //Højde = (20^2)/(2*0.35) = 571.43 pixels
let isJumpDown = false;
let isJumpReleased;
let isJumpDownAcc = 20 / 60;

let playerGravityAcc = 0.35; // Pixels per frame acceleration
let playerGravityMax = 25;
let playerGround = false;

let windStartX = 0; // Start X-position for vindsektionen
let windEndX;   // Slut X-position for vindsektionen
let windYStart = -8000;   // Start Y-position for vindanimationen, skal have mindre værdi en slut Y
let windYEnd = -6000; // Slut Y-position for vindanimationen
let windSpeed = 5;    // Hastighed for vindens bevægelse
let windStrength = 4; // Hvor meget spilleren skubbes per frame

// --Nye variabler til startknap, nedtælling og timer--
let isGameStarted = false; // Spillet er ikke startet endnu
let countdown = 3; // Nedtælling starter fra 3
let timer = 0; // Spiltimer
let countdownInterval; // Interval til nedtælling
let gameTimerInterval; // Interval til spillets timer
let startButton;

// --Nye variabler til slutmål--
let goalX // X for målet
let goalY = -9800; // Placer målet et sted på banen
let goalWidth = 50;
let goalHeight = 100;
let isGameOver = false; // Spillet er ikke slut endnu
let restartButton; // Variabel til genstartsknappen

let pPlayerX,
newPlayerX

let playerGroundP = false
let collision
let blokBredde = 75
let blokTyk = 20

let trampHop = -29 //Højde = (v^2)/(2*g) = (27^2)/(2*0.35) = 1200 pixels
let blokKolStop = 1

//Basis blok
let bBlokArray = [
    // Sektion 1
    { x: 300, y: 200 },
    { x: 450, y: -250 },
    { x: 150, y: -1850},
    { x: 400, y: -2100 },
    // Sektion 2
    { x: 300, y: -3300 },
    { x: 900, y: -3800 },
    { x: 1050, y: -4100 },
    { x: 100, y: -4600 },
    { x: 700, y: -4800 },
    { x: 1100, y: -5100 },
    // Sektion 3
    { x: 1350, y: -6200 },
    { x: 250, y: -6800 },
    { x: 100, y: -7100 },
    { x: 800, y: -8850}
];
//Speed blok
let speedBlokArray = [
    // Sektion 1
    { x: 300, y: -700 },
    { x: 750, y: -1400 },
    // Sektion 2
    { x: 900, y: -3600 },
    { x: 300, y: -4200 },
    // Sektion 3
    { x: 800, y: -6700 },
    { x: 750, y: -7400}
];
//Sand blok
let sandBlokArray = [
    // Sektion 1
    { x: 400, y: -1080 },
    { x: 800, y: -1750 },
    // Sektion 2
    { x: 250, y: -3700 },
    { x: 600, y: -4300 },
    // Sektion 3
    { x: 1100, y: -6400 },
    { x: 600, y: -6900 },
    { x: 1200, y: -7800 }
];
//Trampolin blok
let trampBlokArray = [
    { x: 200, y: -2500 }, 
    { x: 900, y: -5500 }, 
    { x: 1400, y: -8200},
    { x: 500, y: -9000 } 
];
//Fælde blok
let fældeBlokArray = [
    // Sektion 1
    { x: 700, y: -500 },
    { x: 300, y: -1600 },
    // Sektion 2
    { x: 500, y: -4000 },
    { x: 500, y: -4500 },
    // Sektion 3
    { x: 900, y: -7200 },
    { x: 1000, y: -8775 }
];

let bBlokFarve = '#808b96'
let speedBlokFarve = '#ADD8E6'
let sandBlokFarve = '#C2B280'
let trampBlokFarve = '#000000'
let fældeBlokFarve = '#8f979f'


// --emilt.js--
function setupGame() {

    cnvHeight = 700;
    cnvWidth = 1500;

    playerX = cnvWidth / 2;
    playerY = 450;
    windEndX= cnvWidth;


    frameRate(60);

    cnv = createCanvas(cnvWidth, cnvHeight);
    cnv.position(windowWidth - (windowWidth + cnvWidth) / 2, 0); // Centrere canvas
    scroll = 0;



    // Initialiser slutmålet
    goalX = cnvWidth / 2; // Placer målet i midten

    startGame();
}


function drawPlayer() {
    stroke('black');
    strokeWeight(2);
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
            scroll += playerYSpeed + 10; // Ryk op
            playerY += playerYSpeed + 10;
        }
        if (playerY > height * 0.9) {
            scroll -= playerYSpeed + 10; // Ryk ned
            playerY -= playerYSpeed + 10;
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

    playerGroundP = false
    madsDraw();

    if (isGodMode == false){
        applyWind(); // Anvend vindens effekt på spilleren
    }
    drawWind(); // Tegn vindanimationen

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
        if (playerGround == true /*|| playerGroundP == true*/) {
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
        if (keyIsDown(65)) playerX -= playerXSpeed + 10; // A
        if (keyIsDown(68)) playerX += playerXSpeed + 10; // D
        if (keyIsDown(87)) playerY -= playerYSpeed + 10; // W
        if (keyIsDown(83)) playerY += playerYSpeed + 10; // S

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

// --Vind--
function applyWind() {
    // Juster vindsektionens grænser med scroll
    let adjustedWindYStart = windYStart + scroll;
    let adjustedWindYEnd = windYEnd + scroll;

    // Hvis spilleren er inden for vindsektionen, skub til siden
    if (playerY > adjustedWindYStart && playerY < adjustedWindYEnd) {
        playerX += windStrength; // Skub spilleren mod højre
    }
}

function drawWind() {
    stroke('white');
    strokeWeight(2);


    // Tegn linjer, der bevæger sig mod højre
    for (let i = 0; i < 2000; i += 70) {
        for (let y = windYStart; y < windYEnd; y += 60) {
            let offset = (frameCount * windSpeed) % (windEndX - windStartX); // Bevægelse mod højre
            line(windStartX + offset - i, y, windStartX + offset + 20 - i, y + 10); // Skrå linje
            line(windStartX + offset + i, y, windStartX + offset + 20 + i, y + 10);
        }
    }

    noStroke();
}



// --primærSide.js--


function madsDraw()
{
        //Hastighed til at glide på isblokkene.
        pPlayerX = newPlayerX
        newPlayerX = playerX
        playerXVelocity = pPlayerX - newPlayerX

        platform(bBlokArray, bBlokFarve, bBlok)
        platform(speedBlokArray, speedBlokFarve, speedBlok)
        platform(sandBlokArray, sandBlokFarve, sandBlok)
        platform(trampBlokArray, trampBlokFarve, trampBlok)
        platform(fældeBlokArray, fældeBlokFarve, fældeBlok)
}

// --platformType.js--
function platform(blokArray, blokFarve, blokFunktion)
{
    for(let i = 0; i < blokArray.length; i++)
    {
        fill(blokFarve)
        rect(blokArray[i].x, blokArray[i].y, blokBredde, blokTyk)

        if(playerY + playerR > (blokArray[i].y + scroll) && playerY - playerR < (blokArray[i].y + scroll))
        {   
            if(playerX + playerR > blokArray[i].x && playerX - playerR < blokArray[i].x + blokBredde)
            {
                blokFunktion(i)
            }
            else
            {
                playerGroundP = false
            }
        }
    }
}

function trampBlok(x)
{
    if(playerY <= trampBlokArray[x].y + scroll)
        {
            playerYVelocity = trampHop
        }
        if(playerY >= trampBlokArray[x].y + scroll)
        {
            playerYVelocity = blokKolStop
        }
}


function fældeBlok(x)
{
        //Der er ingen kollision over, da det er meningen man skal falde igennem.

        //Her kigges der for kollision mens spilleren er under.
        if(playerY >= fældeBlokArray[x].y + scroll)
        {
            playerYVelocity = blokKolStop
        }
}


function bBlok(x)
{   
    //Her kigges der for, hvis kollisionen er mens spilleren er over blokken.
    if(playerY <= bBlokArray[x].y + scroll)
    {
        playerGroundP = true
        playerYVelocity = -playerGravityAcc
    }
    //Her kigges der for kollision mens spilleren er under.
    if(playerY >= bBlokArray[x].y + scroll)
    {
        playerYVelocity = blokKolStop
    }
}



function sandBlok(x)
{
    if(playerY <= sandBlokArray[x].y + scroll)
    {
        playerGroundP = true
        playerYVelocity = 0
    }
    if(playerY >= sandBlokArray[x].y + scroll)
    {
        playerYVelocity = blokKolStop
    }
}


function speedBlok(x)
{
    if(playerY <= speedBlokArray[x].y + scroll)
    {
        playerX -= playerXVelocity * 0.5
        playerXVelocity -= 1

        playerGroundP = true
        playerYVelocity = -playerGravityAcc
    }
    if(playerY >= speedBlokArray[x].y + scroll)
    {
        playerYVelocity = blokKolStop
    }   
}


// --Start spil--
function startGame(){
    // Start nedtælling
    countdownInterval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            isGameStarted = true; // Aktiver spillet
            startTimer(); // Start spillets timer
        }
    }, 1000);
}
function startTimer() {
    gameTimerInterval = setInterval(() => {
        timer++;
    }, 1000);
}
function handleGameStartUI() {
    if (!isGameStarted) {
        // Vis nedtælling, hvis spillet ikke er startet
        textSize(32);
        fill('white');
        textAlign(CENTER, CENTER);
        if (countdown > 0) {
            text('Starter om:' + ' ' + countdown, cnvWidth / 2 - 5, cnvHeight / 2);
        } else {
            text('Klar!', cnvWidth / 2, cnvHeight / 2);
        }
    } else {
        // Vis timer øverst på skærmen
        textSize(24);
        fill('white');
        textAlign(LEFT, TOP);
        text('Tid:' + ' ' + timer + ' ' + 'sek', 10, 10);
        //Tegn alt
        verticalScrollandDraw();
    }
}

// --Slut spil--
function handleGoal() {
    if (isGameOver) {
        // Vis slutskærm
        textSize(32);
        fill('white');
        textAlign(CENTER, CENTER);
        text('Spillet er slut!', cnvWidth / 2, cnvHeight / 2 - 50);
        text('Din tid:' + ' ' + timer + ' ' + 'sek', cnvWidth / 2, cnvHeight / 2);

        // Opret genstartsknap
        if (!restartButton) {
            restartButton = createButton('Menu');
            restartButton.position(cnvWidth / 2, cnvHeight / 2 + 60);
            restartButton.size(100, 55);
            restartButton.style('font-size', '20px');
            restartButton.mousePressed(titelSkærmSkift);
        }
    } else {
        // Tegn flagstangen
        stroke('black');
        strokeWeight(4);
        line(goalX + goalWidth / 2, goalY + scroll, goalX + goalWidth / 2, goalY + scroll - 100);

        // Tegn flaget
        noStroke();
        fill('red');
        triangle(
            goalX + goalWidth / 2, goalY + scroll - 100, // Toppen af flagstangen
            goalX + goalWidth / 2 + 40, goalY + scroll - 80, // Højre hjørne af flaget
            goalX + goalWidth / 2, goalY + scroll - 60 // Bunden af flaget
        );

        // Tjek for kollision med målet
        if (
            playerX + playerR > goalX + goalWidth / 2 - 2 && // Juster til flagstangens bredde
            playerX - playerR < goalX + goalWidth / 2 + 2 && // Juster til flagstangens bredde
            playerY + playerR > goalY + scroll - 100 && // Toppen af flagstangen
            playerY - playerR < goalY + scroll // Bunden af flagstangen
        ) {
            isGameOver = true; // Spillet er slut
            clearInterval(gameTimerInterval); // Stop timeren
        }
    }
}
function handleGameLogic() {
    if (!isGameOver) {
        handleGameStartUI(); // Håndter UI for spilstart og timer
        if (isGameStarted) {
            handleGoal(); // Håndter målet
        }
    } else {
        handleGoal(); // Vis slutskærm
    }
}

// --Setup og draw--
function setup(){
    setupGame();
}

function draw(){
    background('#33a2ff');

    if (!startGame) {
        fill('brown');
        textSize(150);
        text('Hopeless Heights', width / 2, 75);}

    handleGameLogic(); // Håndter spillets logik og UI
    console.log('ground', playerGround, 'p', playerGroundP, 'scroll', scroll)

}

function titelSkærmSkift(){
window.location.href = '1start.html'
}