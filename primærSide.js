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

let bBlokArrayX = [150]
let bBlokArrayY = [50]

let speedBlokArrayX = [250]
let speedBlokArrayY = [125]

let sandBlokArrayX = [350]
let sandBlokArrayY = [250]

let trampBlokArrayX = [450]
let trampBlokArrayY = [375]

let fældeBlokArrayX = [550]
let fældeBlokArrayY = [400]

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

//Her tegnes basis blokkene
for(let i = 0; i < bBlokArrayX.length; i++)
    {
    fill(farveArray[2])
    rect(bBlokArrayX[i], bBlokArrayY [i], blokBredde, blokTyk)
    }

//Her kigges der på kollision.
    for(let i = 0; i < bBlokArrayY.length; i++)
    {
        if(playerY + playerR > bBlokArrayY[i] && playerY - playerR < bBlokArrayY[i])
        {
            if(playerX + playerR > bBlokArrayX[i] && playerX - playerR <bBlokArrayX[i] + blokBredde)
            {
                bBlok(i)
            }
            else
            {
                playerGround = false
            }
        }
    }

//Her tegnes speed blokkene
    for(let i = 0; i < speedBlokArrayX.length; i++)
        {
        fill(farveArray[4])
        rect(speedBlokArrayX[i], speedBlokArrayY [i], blokBredde, blokTyk)
        }
    
//Her kigges der på kollision.
        for(let i = 0; i < speedBlokArrayY.length; i++)
        {
            if(playerY + playerR > speedBlokArrayY[i] && playerY - playerR < speedBlokArrayY[i])
            {
                if(playerX + playerR > speedBlokArrayX[i] && playerX - playerR < speedBlokArrayX[i] + blokBredde)
                {
                    isBlok(i)
                }
                else
                {
                    playerGround = false
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
        if(playerY + playerR > sandBlokArrayY[i] && playerY - playerR < sandBlokArrayY[i])
        {
            if(playerX + playerR > sandBlokArrayX[i] && playerX - playerR < sandBlokArrayX[i] + blokBredde)
            {
                sandBlok(i)
            }
            else
            {
                playerGround = false
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
            if(playerY + playerR > trampBlokArrayY[i] && playerY - playerR < trampBlokArrayY[i])
            {
                if(playerX + playerR > trampBlokArrayX[i] && playerX - playerR < trampBlokArrayX[i] + blokBredde)
                {
                    trampBlok(i)
                }
                else
                {
                    playerGround = false
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
                if(playerY + playerR > fældeBlokArrayY[i] && playerY - playerR < fældeBlokArrayY[i])
                {
                    if(playerX + playerR > fældeBlokArrayX[i] && playerX - playerR < fældeBlokArrayX[i] + blokBredde)
                    {
                        fældeBlok(i)
                    }
                    else
                    {
                        playerGround = false
                    }
                }
            }
}