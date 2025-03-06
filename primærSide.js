let baggrund
function preload(){
bagBill = loadImage('C:\Users\mads\OneDrive\Billeder')

}

function setup() {
    madsSetup();
	createCanvas(windowWidth, windowHeight);
    image(bagBill,0,0)
    
}

function draw()
{   
    madsDraw();
    //emilDraw();
}
