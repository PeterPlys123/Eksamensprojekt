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
let playerJumpMax = 20; // Max højde på hop  //Højde = (20^2)/(2*0.35) = 571.43
let isJumpDown = false;
let isJumpReleased;
let isJumpDownAcc = 20 / 120;

let playerGravityAcc = 0.35; // Pixels per frame acceleration
let playerGravityMax = 25;
let playerGround = false;

let windStartX = 0; // Start X-position for vindsektionen
let windEndX;   // Slut X-position for vindsektionen
let windYStart = -4000;   // Start Y-position for vindanimationen, skal have mindre værdi en slut Y
let windYEnd = -3000; // Slut Y-position for vindanimationen
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
let goalY = -5000; // Placer målet et sted på banen
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

let trampHop = -27 //Højde = (v^2)/(2*g) = (27^2)/(2*0.35) = 1041.43
let blokKolStop = 1

//Basis blok
let bBlokArray = [
    { x: 150, y: 50},
    {}
];
//Speed blok
let speedBlokArray = [
    { x: 300, y: -100},
    {}
];
//Sand blok
let sandBlokArray = [
    { x: 400, y: -300},
    {}
];
//Trampolin blok
let trampBlokArray = [
    { x: 200, y: -500},
    {}
];
//Fælde blok
let fældeBlokArray = [
    { x: 700, y: -700},
    {}
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

    // Opret startknap
    startButton = createButton('Starter');
    startButton.position(cnvWidth / 2 - 50, cnvHeight / 2 - 25);
    startButton.size(100, 50);
    startButton.style('font-size', '20px');
    startButton.mousePressed(startGame);

    // Initialiser slutmålet
    goalX = cnvWidth / 2; // Placer målet i midten
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


function madsDraw(){
        //Hastighed til at glide på isblokkene.
        pPlayerX = newPlayerX
        newPlayerX = playerX
        playerXVelocity = pPlayerX - newPlayerX
    
        //Tyngdekraft
        //Fungere ved at der er en ground, som skifter mellem true og false.
        //Når der er kollision med en platform er den true, og når man hopper, eller går over kanten er den false.
    
    //Her tegnes basis blokkene
    for(let i = 0; i < bBlokArray.length; i++)
        {
        fill(bBlokFarve);
        rect(bBlokArray[i].x, bBlokArray[i].y, blokBredde, blokTyk)
        }
    
    //Her kigges der på kollision.
        for(let i = 0; i < bBlokArray.length; i++)
        {
            if(playerY + playerR > (bBlokArray[i].y + scroll) && playerY - playerR < (bBlokArray[i].y + scroll))
            {
                if(playerX + playerR > bBlokArray[i].x && playerX - playerR <bBlokArray[i].x + blokBredde)
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
        for(let i = 0; i < speedBlokArray.length; i++)
            {
            fill(speedBlokFarve)
            rect(speedBlokArray[i].x, speedBlokArray[i].y, blokBredde, blokTyk)
            }
        
    //Her kigges der på kollision.
            for(let i = 0; i < speedBlokArray.length; i++)
            {
                if(playerY + playerR > (speedBlokArray[i].y + scroll) && playerY - playerR < (speedBlokArray[i].y + scroll))
                {
                    if(playerX + playerR > speedBlokArray[i].x && playerX - playerR < speedBlokArray[i].x + blokBredde)
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
    for(let i = 0; i < sandBlokArray.length; i++)
        {
        fill(sandBlokFarve)
        rect(sandBlokArray[i].x, sandBlokArray[i].y, blokBredde, blokTyk)
        }
    
    //Her kigges der på kollision.
        for(let i = 0; i < sandBlokArray.length; i++)
        {
            if(playerY + playerR > (sandBlokArray[i].y + scroll) && playerY - playerR < (sandBlokArray[i].y + scroll))
            {
                if(playerX + playerR > sandBlokArray[i].x && playerX - playerR < sandBlokArray[i].x + blokBredde)
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
        for(let i = 0; i < trampBlokArray.length; i++)
            {
            fill(trampBlokFarve)
            rect(trampBlokArray[i].x, trampBlokArray[i].y, blokBredde, blokTyk)
            }
        
        //Her kigges der på kollision.
            for(let i = 0; i < trampBlokArray.length; i++)
            {
                if(playerY + playerR > (trampBlokArray[i].y + scroll) && playerY - playerR < (trampBlokArray[i].y + scroll))
                {
                    if(playerX + playerR > trampBlokArray[i].x && playerX - playerR < trampBlokArray[i].x + blokBredde)
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
            for(let i = 0; i < fældeBlokArray.length; i++)
                {
                fill(fældeBlokFarve)
                rect(fældeBlokArray[i].x, fældeBlokArray[i].y, blokBredde, blokTyk)
                }
            
            //Her kigges der på kollision.
                for(let i = 0; i < fældeBlokArray.length; i++)
                {
                    if(playerY + playerR > (fældeBlokArray[i].y + scroll) && playerY - playerR < (fældeBlokArray[i].y + scroll))
                    {
                        if(playerX + playerR > fældeBlokArray[i].x && playerX - playerR < fældeBlokArray[i].x + blokBredde)
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


function isBlok(x)
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
function startGame() {


    // Start nedtælling
    countdownInterval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            isGameStarted = true; // Aktiver spillet
            startTimer(); // Start spillets timer
            startButton.remove(); // Skjul startknappen
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

// --Genstart spil--
function restartGame() {
    // Nulstil spillets variabler
    isGameOver = false;
    isGameStarted = false;
    countdown = 3;
    timer = 0;
    scroll = 0;
    playerX = cnvWidth / 2;
    playerY = cnvHeight / 2;
    playerYVelocity = 0;

    // Fjern genstartsknappen
    if (restartButton) {
        restartButton.remove();
        restartButton = null;
    }

    // Start spillet igen
    startGame();
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
            restartButton = createButton('Genstart');
            restartButton.position(cnvWidth / 2, cnvHeight / 2 + 50);
            restartButton.size(100, 50);
            restartButton.style('font-size', '20px');
            restartButton.mousePressed(restartGame);
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

    handleGameLogic(); // Håndter spillets logik og UI
    console.log('ground', playerGround, 'p', playerGroundP, 'scroll', scroll)
}