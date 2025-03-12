let canvas
let baggrund

let blokArray
let farveArray

function setup() {
	createCanvas(800, 400);
    blokArray = [20, 120, 220, 320, 420]
    farveArray = ['gray', 'blue', 'yellow', 'black', 'brown']
}

function draw()
{   
    background('gray')

    for(let i = 0; i == 4; i++)
        {
        fill(farveArray[i])
        rect(blokArray[i], 360, 75, 20)
        }

    fill('red')
    rect(20, 360, 95, 20)
}
