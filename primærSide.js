let canvas, baggrund, ground, playerVelY
let bBlokArrayX, bBlokArrayY, farveArray, blokBredde, blokTyk, isBlokArrayY, isBlokArrayX, pPlayerX, newPlayerX, hastighed, playerVelX
ground = false
playerVelY = 0
let collision
blokBredde = 75
blokTyk = 20
function setup() {
	createCanvas(800, 400);
    bBlokArrayX = [20, 140, 260, 380, 500]
    bBlokArrayY = [100, 20, 300, 270, 185]
    isBlokArrayX = [20, 140, 260, 380, 500]
    isBlokArrayY = [100, 20, 300, 270, 185]

    farveArray = ['black', 'red', 'gray', 'yellow', 'lightblue']
}

function draw()
{
    frameRate(45)
    background('lightgreen')
    testBevægelse()

    //Hastighed til at glide på isblokkene.
    pPlayerX = newPlayerX
    newPlayerX = playerX
    playerVelX = pPlayerX - newPlayerX

    //Tyngdekraft
    //Fungere ved at der er en ground, som skifter mellem true og false.
    //Når der er kollision med en platform er den true, og når man hopper, eller går over kanten er den false.
if(ground == false){
playerVelY += 0.5
playerY += playerVelY
}


for(let i = 0; i < bBlokArrayX.length; i++)
    {
    fill(farveArray[2])
    rect(bBlokArrayX[i], bBlokArrayY [i], blokBredde, blokTyk)
    }

    
    for(let i = 0; i < bBlokArrayY.length; i++){
        if(playerY + playerR > bBlokArrayY[i] && playerY - playerR < bBlokArrayY[i]){
            if(playerX + playerR > bBlokArrayX[i] && playerX - playerR <bBlokArrayX[i] + blokBredde){
                bBlok(i)
            }
            else{
                ground = false
            }
        }
    }

    for(let i = 0; i < isBlokArrayX.length; i++)
        {
        fill(farveArray[4])
        rect(isBlokArrayX[i], isBlokArrayY [i], blokBredde, blokTyk)
        }
    
        
        for(let i = 0; i < isBlokArrayY.length; i++){
            if(playerY + playerR > isBlokArrayY[i] && playerY - playerR < isBlokArrayY[i]){
                if(playerX + playerR > isBlokArrayX[i] && playerX - playerR <isBlokArrayX[i] + blokBredde){
                    isBlok(i)
                }
                else{
                    ground = false
                }
            }
        }
    }