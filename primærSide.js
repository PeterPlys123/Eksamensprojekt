let canvas, baggrund, blokArray, farveArray


function setup() {
	createCanvas(800, 400);
    blokArray = [20, 140, 260, 380, 500]
    farveArray = ['black', 'red', 'gray', 'yellow', 'lightblue']
    background(170)
}

function draw()
{   
    frameRate(144)
    background(170)
    testBevægelse()


    for(let i = 0; i < 5; i++)
        {
        fill(farveArray[i])
        rect(blokArray[i], 360, 75, 20)
        }

    if(playerY + 15 > 360 && playerY - 15 < 380){
        if(playerX > blokArray[0]-playerR && playerX < blokArray[0] + 75 + playerR){
            trampBlok(playerYSpeed)
        }
        if(playerX > blokArray[1]-playerR && playerX < blokArray[1]+ 75 + playerR){
            dltBlok()
        }
        if(playerX > blokArray[2]-playerR && playerX < blokArray[2]+ 75 + playerR){
            blok()
            
        }
    }
        
}
