function trampBlok(x)
{
    if(playerY <= trampBlokArrayY[x])
        {
            playerYVelocity = trampHop
        }
        if(playerY >= trampBlokArrayY[x])
        {
            playerYVelocity = blokKolStop
        }
}


function fældeBlok()
{
        //Der er ingen kollision over, da det er meningen man skal falde igennem.

        //Her kigges der for kollision mens spilleren er under.
        if(playerY >= fældeBlokArrayY[x])
        {
            playerYVelocity = blokKolStop
        }
}


function bBlok(x)
{   
    //Her kigges der for, hvis kollisionen er mens spilleren er over blokken.
    if(playerY <= bBlokArrayY[x])
    {
        playerGround = true
        playerYVelocity = 0
    }
    //Her kigges der for kollision mens spilleren er under.
    if(playerY >= bBlokArrayY[x])
    {
        playerYVelocity = blokKolStop
    }
}



function sandBlok(x)
{
    if(playerY <= sandBlokArrayY[x])
    {
        playerGround = true
        playerYVelocity = 0
    }
    if(playerY >= sandBlokArrayY[x])
    {
        playerYVelocity = blokKolStop
    }
}


function isBlok(x)
{
    if(playerY <= speedBlokArrayY[x])
    {
        playerX -= playerXVelocity * 0.5
        playerXVelocity -= 1

        playerGround = true
        playerYVelocity = 0
    }
    if(playerY >= speedBlokArrayY[x])
    {
        playerYVelocity = blokKolStop
    }
}