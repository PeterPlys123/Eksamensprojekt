let canvas, baggrund, blokArray, farveArray, ground, playerVel
ground = false
playerVel = 0

function setup() {
	createCanvas(800, 400);
    blokArray = [20, 140, 260, 380, 500]
    farveArray = ['black', 'red', 'gray', 'yellow', 'lightblue']
    background(170)
}

function draw()
{
    frameRate(50)
    background(170)
    testBevægelse()

if(playerY < 100){
    ground = false
}

if(playerY > 0 && ground == false){
playerY+=playerVel
playerVel+=0.5
//constrain(playerVel, 0, 4)
}

    for(let i = 0; i < blokArray.length; i++)
        {
        fill(farveArray[i])
        rect(blokArray[i], 360, 75, 20)
        }

    if(playerY + 15 > 360 && playerY - 15 < 380){
        if(playerX > blokArray[0]-playerR && playerX < blokArray[0] + 75 + playerR){
            trampBlok()
        }

        if(playerX > blokArray[1]-playerR && playerX < blokArray[1]+ 75 + playerR){
            dltBlok()
        }

        if(playerX > blokArray[2]-playerR && playerX < blokArray[2]+ 75 + playerR){
            blok()
            
        }
        ground = true
    }
}
