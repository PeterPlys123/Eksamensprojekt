function trampBlok(x)
{
    if(playerY <= trampBlokArrayY[x])
        {
            playerVelY = trampHop
        }
        if(playerY >= trampBlokArrayY[x])
        {
            playerVelY = blokKolStop
        }
}


function fældeBlok()
{
        //Der er ingen kollision over, da det er meningen man skal falde igennem.

        //Her kigges der for kollision mens spilleren er under.
        if(playerY >= fældeBlokArrayY[x])
        {
            playerVelY = blokKolStop
        }
}


function bBlok(x)
{   
    //Her kigges der for, hvis kollisionen er mens spilleren er over blokken.
    if(playerY <= bBlokArrayY[x])
    {
        ground = true
        playerVelY = 0
    }
    //Her kigges der for kollision mens spilleren er under.
    if(playerY >= bBlokArrayY[x])
    {
        playerVelY = blokKolStop
    }
}



function sandBlok(x)
{
    if(playerY <= sandBlokArrayY[x])
    {
        ground = true
        playerVelY = 0
    }
    if(playerY >= sandBlokArrayY[x])
    {
        playerVelY = blokKolStop
    }
}


function isBlok(x)
{
    if(playerY <= speedBlokArrayY[x])
    {
        playerX -= playerVelX * 0.5
        playerVelX -= 1

        ground = true
        playerVelY = 0
    }
    if(playerY >= speedBlokArrayY[x])
    {
        playerVelY = blokKolStop
    }
}