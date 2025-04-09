function trampBlok(){
    if(playerY <= 370){
        playerY+=10
    }
    else if(playerY >= 370){
        playerY=390
    }
}


function dltBlok(){
    if(playerY <= 370){
        playerY=345
        ground = true
        collision = true
    }
    if(playerY >= 370){
        playerY=395
    }
}


function bBlok(x){     
    if(playerY <= bBlokArrayY[x]){
        ground = true
        playerVelY = 0
    }
    if(playerY >= bBlokArrayY[x]){
        playerVelY = 1
    }
    }



function sandBlok(){
    if(playerY <= 370){
        playerY=345
        ground = true
        collision = true
    }
    else if(playerY >= 370){
        playerY=395
    }
}


function isBlok(x){
    if(playerY <= isBlokArrayY[x]){
        playerX -= playerVelX * 0.7
        playerVelX *= 0.8

        ground = true
        playerVelY = 0
    }
    if(playerY >= isBlokArrayY[x]){
        playerVelY = 1
    }
}