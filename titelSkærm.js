function setup() 
{
    createCanvas(1500, 680)

    startKnap = createButton('Start spil');
    startKnap.position(windowWidth / 2 - 100, windowHeight / 2 - 50);
    startKnap.size(200, 75);
    startKnap.style('font-size', '40px');
    startKnap.mousePressed(skift);

    textAlign(CENTER, TOP)
    fill('brown')
    textSize(150)
}


function draw()
{
background('#33a2ff')

text('Hopeless Heights', width / 2, 75)
}

function skift(){
window.location.href = 'combine.html'

}