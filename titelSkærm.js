function setup() 
{
    //Der tegnes et canvas for denne HTML fil.
    cnvHeight = 700;
    cnvWidth = 1500;

    cnv = createCanvas(cnvWidth, cnvHeight);
    cnv.position(windowWidth - (windowWidth + cnvWidth) / 2, 0); // Centrere canvas

    //Her tegnes startknappen, som der skal trykkes på for at starte.
    //Der bestemmes hvad der skal stå på, hvor den skal tegnes, og størrelsen.
    startKnap = createButton('Start spil');
    startKnap.position(windowWidth / 2 - 100, windowHeight / 2 - 50);
    startKnap.size(200, 75);
    startKnap.style('font-size', '40px');
    startKnap.mousePressed(skift); //Her er den funktion der kaldes når der trykkes på knappen
}


function draw()
{
//Her bliver der givet en farve til canvas
background('#33a2ff')

//Her tegnes titlen på spillet som står i toppen over knappen.
textAlign(CENTER, TOP)//Dette gør at punktet for hvor koordinaterne tager udgangspunkt er i midten af toppen
fill('brown') //Her gøres titlen brun
textSize(150)//Dette er tekststørlesen.
text('Hopeless Heights', width / 2, 75)//Dette er hvad der står i titlen, og hvor den tegnes henne.
}

//Dette er funktionen der kaldes når der trykkes på knappen.
function skift(){
window.location.href = 'combine.html'

}