/*
///////////////////////////////////////////////////////////////////


COLORADO COWS REVEANGE


En la decada de los sesenta, en algunas zonas de estados unidos, sucedió lo que se denomino "mutilazión de ganado". Vacas y obejas aparecían assesinadas
bajo circunstancias inusuales. Una teoría afirmava que los culpables eran alienigenas que abducían el ganado con sus obnis para experimentar con ellos.
Colorado Cows Revenge és una historia de venganza.

*/







window.onload = () => {
    document.getElementById('start-button').onclick = () => {
    
    let buttonStartSection = document.getElementById('start-button-section')
    buttonStartSection.setAttribute('class', 'hideAll')

    let cover = document.getElementById('cover')
    cover.setAttribute('class', 'hideAll')

    
    document.body.setAttribute('class', 'clear')


    let mainLogo = document.getElementById('logo')
    mainLogo.removeAttribute('class', 'hideAll')

    let gameBoard = document.getElementById('game-board')
    gameBoard.removeAttribute('class', 'hideAll')

    

  
    /* myApp.init(document.querySelector('#canvas')) */
    const canvas = document.querySelector('#canvas')
    myApp.init(canvas)
   
    }  
}



