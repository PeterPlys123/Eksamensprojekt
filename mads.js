let knapStart
let knapTutorial


function madsSetup(){
GUI();

}

function madsDraw(){


}

function GUI(){

    /*Knappen for at starte spillet.
    Når knappen trykkes køres draw funktionen.*/

    knapStart = createButton('Start spil')
    knapStart.position(windowWidth/2-100, windowHeight/2-75)
    knapStart.size(200,60)
    knapStart.style('font-size', '30px')
    knapStart.mousePressed(loop())
    knapStart.style('background-color', 'orange')

    knapTutorial = createButton('Tutorial')
    knapTutorial.position(windowWidth/2-100, windowHeight/2)
    knapTutorial.size(200,60)
    knapTutorial.style('font-size', '30px')
    knapTutorial.mousePressed(tutorial())
    knapTutorial.style('background-color', 'orange')
}

function tutorial(){



}