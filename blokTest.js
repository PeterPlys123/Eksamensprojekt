let blokArray
let farveArray

blokArray = [20, 120, 220, 320, 420]
farveArray = ['gray', 'blue', 'yellow', 'black', 'brown']

function blokDraw(){

for(let i = 0; i == 4; i++)
{
fill(farveArray[i])
rect(blokArray[i], 360, blokArray[i]+75, 380)
}

}