let canvas, baggrund, blokArray, farveArray, i

function setup() {
	createCanvas(800, 400);
    blokArray = [20, 140, 260, 380, 500]
    farveArray = ['black', 'red', 'gray', 'yellow', 'lightblue']
    background(170)
}

function draw()
{   
    for(i = 0; i < 5; i++)
        {
        fill(farveArray[i])
        rect(blokArray[i], 360, 75, 20)
        }
    }