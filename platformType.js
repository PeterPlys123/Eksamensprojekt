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
    if(playerY<= bBlokArrayY[x]){
        playerY=playerY
        ground = true
        console.log(ground)
        playerVel=0
    }
    if(playerX + playerR < bBlokArrayX[x] || playerX - playerR > bBlokArrayX[x] + blokBredde){
        ground = false
        console.log('a')
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


function isBlok(){
    if(playerY <= 370){
        playerY=345
        ground = true
        collision = true
    }
    else if(playerY >= 370){
        playerY=395
    }
}