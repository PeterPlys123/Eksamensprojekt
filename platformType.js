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


function bBlok(){
    for(let i = 0; i < bBlokArrayX.length; i++)
        {
        fill(farveArray[2])
        rect(bBlokArrayX[i], bBlokArrayY [i], blokBredde, blokTyk)
        }

for(let i = 0; i < bBlokArrayY.length; i++){
    if(playerY + playerR > bBlokArrayY[i] && playerY - playerR < bBlokArrayY[i] && playerX + playerR > bBlokArrayX[i] && playerX - playerR <bBlokArrayX[i] + blokBredde){
    if(playerY <= bBlokArrayY[i]){
        playerY-=25
        ground = true
    }
    if(playerY >= bBlokArrayY[i] - 20){
        playerY+=25
    }
            }
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