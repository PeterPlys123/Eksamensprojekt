let canvas, baggrund, ground, playerVel
let bBlokArrayX, bBlokArrayY, farveArray, blokBredde, blokTyk, tyngdeStop
ground = false
playerVel = 0
let collision
blokBredde = 75
blokTyk = 20
function setup() {
	createCanvas(800, 400);
    bBlokArrayX = [20, 140, 260, 380, 500]
    bBlokArrayY = [100, 20, 300, 270, 185]
    farveArray = ['black', 'red', 'gray', 'yellow', 'lightblue']

}

function draw()
{
    kollision()
    frameRate(50)
    background('lightgreen')
    testBevægelse()


if(ground !== true){
    playerVel+=0.5
    playerY+=playerVel
}
if(ground == true){
    playerVel=0
    console.log('Hej')
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
        }
        if(playerY - playerR > bBlokArrayY[i] || playerX + playerR < bBlokArrayX[i] || playerX + playerR > bBlokArrayX[i] + blokBredde){
            ground = false
        }
    }
    }
