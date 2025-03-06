let baggrund
function preload(){
bagBill = loadImage('')

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
