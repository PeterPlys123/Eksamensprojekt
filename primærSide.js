let canvas, baggrund, bBlokArrayX, farveArray, ground, playerVel, blokBredde, bBlokArrayY, blokTyk
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
    background(170)
}

function draw()
{
    frameRate(50)
    background(170)
    testBevægelse()
/*
if(collision !== false){
    ground = false
}

if(ground == false){
playerY+=playerVel
playerVel+=0.2

}
else{
playerVel=0
}
*/




    for(let i = 0; i < bBlokArrayX.length; i++)
        {
        fill(farveArray[2])
        rect(bBlokArrayX[i], bBlokArrayY [i], blokBredde, blokTyk)
        }

for(let i = 0; i < bBlokArrayY.length; i++){
    if(playerY + playerR > bBlokArrayY[i] && playerY - playerR < bBlokArrayY[i] && playerX + playerR > bBlokArrayX[i] && playerX - playerR <bBlokArrayX[i] + blokBredde){
                blok(i)
            }
        }
    }
