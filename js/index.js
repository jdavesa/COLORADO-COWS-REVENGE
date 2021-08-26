/*
///////////////////////////////////////////////////////////////////


COLORADO COWS REVEANGE


En la decada de los sesenta, en algunas zonas de estados unidos, sucedió lo que se denomino "mutilazión de ganado". Vacas y obejas aparecían assesinadas
bajo circunstancias inusuales. Una teoría afirmava que los culpables eran alienigenas que abducían el ganado con sus obnis para experimentar con ellos.
Colorado Cows Revenge és una historia de venganza.

*/







window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        clickSound()
    
    let soundOn = document.getElementById('start-button')
    soundOn.setAttribute('class', 'hideAll')

   /*  let theme = document.getElementById('theme')
    theme.play() */

    let cover = document.getElementById('cover-div')
    cover.setAttribute('class', 'hideAll')

    
    document.body.setAttribute('class', 'clear')


    let mainLogo = document.getElementById('logo')
    mainLogo.removeAttribute('class', 'hideAll')

    let gameBoard = document.getElementById('game-board')
    gameBoard.removeAttribute('class', 'hideAll')

   /*  let playAgain = document.getElementById('play-again-button')
    playAgain.removeAttribute('class', 'hideAll') */

    

  
    /* myApp.init(document.querySelector('#canvas')) */
    const canvas = document.querySelector('#canvas')
    myApp.init(canvas)
   
    }  

    document.getElementById('play-again-button').onclick = () => {

        const canvas = document.querySelector('#canvas')
        clickSound()
        myApp.init(canvas)
        
    
        
        }  
}

function clickSound(){
    let explosionSound = document.getElementById('click')
    explosionSound.currentTime = 0
    explosionSound.play()
}

document.getElementById('sound-on').onclick = ()=>{
    myApp.muteAudio()
    
    let soundOn = document.getElementById('sound-on')
    soundOn.setAttribute('class', 'hideAll')

    let soundOff = document.getElementById('sound-off')
    soundOff.removeAttribute('class', 'hideAll')



}

document.getElementById('sound-off').onclick = ()=>{
    myApp.unmuteAudio()
    
    let soundOn = document.getElementById('sound-on')
    soundOn.removeAttribute('class', 'hideAll')

    let soundOff = document.getElementById('sound-off')
    soundOff.setAttribute('class', 'hideAll')



}

/* function explosionSound(){
    let explosionSound = document.getElementById('explosion')
    explosionSound.currentTime = 0
    explosionSound.play()
} */

