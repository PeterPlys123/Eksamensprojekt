let canvas, baggrund, blokArray, farveArray


function setup() {
	createCanvas(800, 400);
    blokArray = [20, 140, 260, 380, 500]
    farveArray = ['black', 'red', 'gray', 'yellow', 'lightblue']
    background(170)
}

function draw()
{   
    background(170)
    testBevægelse()

    for(let i = 0; i < 5; i++)
        {
        fill(farveArray[i])
        rect(blokArray[i], 360, 75, 20)
        }

    if(playerY > 360 && playerY < 380){
        if(playerX > blokArray[0] && playerX < blokArray[0] + 75){
            trampBlok(playerYSpeed)
        }
    }
    else{
    }
        
}