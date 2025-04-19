let pPlayerX,
newPlayerX,
hastighed,
playerXVelocity

let playerGround = false
let playerYVelocity = 0
let collision
let blokBredde = 75
let blokTyk = 20

let trampHop = -15
let blokKolStop = 1

let bBlokArrayX = [150, 250]
let bBlokArrayY = [50, 300]

let speedBlokArrayX = [250]
let speedBlokArrayY = [125]

let sandBlokArrayX = [350]
let sandBlokArrayY = [250]

let trampBlokArrayX = [450]
let trampBlokArrayY = [375]

let fældeBlokArrayX = [550]
let fældeBlokArrayY = [50]

let farveArray = ['black', 'red', 'gray', 'yellow', 'lightblue']


function setup()
{
	createCanvas(800, 400);

}

function draw()
{
    frameRate(60)
    background('lightgreen')
    testBevægelse()

    platform(bBlokArrayX, bBlokArrayY, 'gray', bBlok)
    platform(speedBlokArrayX, speedBlokArrayY, 'lightblue', speedBlok)
    platform(sandBlokArrayX, sandBlokArrayY, 'yellow', sandBlok)
    platform(trampBlokArrayX, trampBlokArrayY, 'black', trampBlok)
    platform(fældeBlokArrayX, fældeBlokArrayY, 'red', fældeBlok)
    
    //Hastighed til at glide på isblokkene.
    pPlayerX = newPlayerX
    newPlayerX = playerX
    playerXVelocity = pPlayerX - newPlayerX

    //Tyngdekraft
    //Fungere ved at der er en ground, som skifter mellem true og false.
    //Når der er kollision med en platform er den true, og når man hopper, eller går over kanten er den false.
if(playerGround == false)
{
playerYVelocity += 0.5
playerY += playerYVelocity
}
}

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
