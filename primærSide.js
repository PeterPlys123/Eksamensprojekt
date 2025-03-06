let baggrund
var lars

function setup() {
    madsSetup();
	createCanvas(windowWidth, windowHeight);
    lars = loadImage("lars.png")
}

function draw()
{   
    image(lars,100,100)
    madsDraw();
    //emilDraw();
}
