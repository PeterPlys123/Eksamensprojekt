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
        playerY-=20
        ground = true
        playerVel=0  
    }
    
    if(playerY >= bBlokArrayY[x] - 20){
        playerY+=25
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