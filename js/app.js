const myApp = {
    ctx:undefined,
    dimensionCanvas:{w:undefined,h:undefined},
    backImage: undefined,
    newPlayer: undefined,
    intId: undefined,
    myReq: null,
    obsArr: [],
    intervalId: undefined,
    frameCounter: 0,
    counterLevel: 0,
    counterScore: 0,
    bestScore: 0,
    newArr: [],
    volumeLevel: 1,
    playAgainButton: document.getElementById("play-again-button"),

    
    cancelAnimation: false,
    abduction: false,
    spacePress: false,

    init(elementCanvas){
        this.refreshGame()
        this.setContext(elementCanvas)
        this.setDimensions(elementCanvas)
        this.playThemeSound()

    
        this.createImage()
        this.createPlayer()
        this.drawAll()
        this.setListeners()
        this.refreshScreen()
        this.isSpacePress()
        this.setLevelCounter(this.coutnerLevel)
        this.setScoreCounter(this.counterScore)
        this.playAgainButton.setAttribute('class', 'hideAll')
        
            
    },

    setContext(elementCanvas){
        this.ctx = elementCanvas.getContext('2d')
    },

    setDimensions(elementCanvas){
        this.dimensionCanvas.w = 1200
        this.dimensionCanvas.h = 600
        elementCanvas.setAttribute('width', this.dimensionCanvas.w)
        elementCanvas.setAttribute('height', this.dimensionCanvas.h)

    },

    setLevelCounter(num){
        
        this.ctx.font = '25px ShadowUnder';
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`LEVEL ${num}`, (this.dimensionCanvas.w/2) -180, +570)
        this.ctx.font = '25px ShadowOver';
        this.ctx.fillStyle = 'red'
        this.ctx.fillText(`LEVEL ${num}`, (this.dimensionCanvas.w/2)-180, +570)
    
    },

    setScoreCounter(num){
        
        this.ctx.font = '25px ShadowUnder';
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`SCORE ${num}`, (this.dimensionCanvas.w/2)+30, +570)
        this.ctx.font = '25px ShadowOver';
        this.ctx.fillStyle = 'red'
        this.ctx.fillText(`SCORE ${num}`, (this.dimensionCanvas.w/2)+30, +570)
    
    },

    setGameOver(num){

        this.ctx.font = '60px ShadowUnder';
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`GAME OVER`, (this.dimensionCanvas.w/2)-220, 250)
        this.ctx.font = '60px ShadowOver';
        this.ctx.fillStyle = 'red'
        this.ctx.fillText(`GAME OVER`, (this.dimensionCanvas.w/2)-220, 250)

        this.ctx.font = '30px ShadowUnder';
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`YOUR BEST SCORE IS ${num}`, (this.dimensionCanvas.w/2)-220, +400)
        this.ctx.font = '30px ShadowOver';
        this.ctx.fillStyle = 'red'
        this.ctx.fillText(`YOUR BEST SCORE IS ${num}`, (this.dimensionCanvas.w/2)-220, +400)

    },

    refreshGame(){

        this.obsArr.length = 0;    
        this.counterLevel = 0;
        this.counterScore = 0;
        this.cancelAnimation = false    

    },

    /* refreshScreen(){
        
        this.backImage.move()
        this.ctx.clearRect(0,0,this.dimensionCanvas.w,this.dimensionCanvas.h)
        this.backImage.draw()
        this.newPlayer.draw()
        requestAnimationFrame(() => this.refreshScreen());
    }, */

    /* refreshScreen(){
        this.intervalId = setInterval(() => {
            this.backImage.move()
            this.ctx.clearRect(0,0,this.dimensionCanvas.w,this.dimensionCanvas.h)
            this.backImage.draw()
            
            this.frameCounter ++
            if(this.frameCounter % 50 === 0){
                this.createObs()
                console.log(this.frameCounter)
                console.log(this.obsArr)
            }

            if(this.frameCounter % 500 === 0){
                this.counterLevel ++
            }
            this.setLevelCounter(this.counterLevel)

            if(this.frameCounter % 50 === 0){
                this.counterScore ++
            }
            this.setScoreCounter(this.counterScore)
            this.drawAll()
            this.newPlayer.draw()
            
        },1000/60)
    },
 */
    refreshScreen(){
            this.checkIfCollision()
            this.checkIfAbduction()
            this.checkIfReduction()
            this.backImage.move()
            this.ctx.clearRect(0,0,this.dimensionCanvas.w,this.dimensionCanvas.h)
            this.backImage.draw()
                
            this.frameCounter ++

            if(this.frameCounter % 50 === 0){
                this.createObs()
                console.log(this.newArr)
            }

            if(this.frameCounter % 5000 === 0){
                this.counterLevel ++
            }
            
            this.setLevelCounter(this.counterLevel)

            this.setScoreCounter(this.counterScore)
            this.drawAll()
            this.newPlayer.draw()
            this.newPlayer.move()
           /*  this.newPlayer.deleteLaser() */
            this.newPlayer.drawLaser()

            if(this.abduction === true){
                this.abduction = false
            
            }
            
            this.myReq = window.requestAnimationFrame(() => this.refreshScreen());


            if(this.cancelAnimation === true){
                if(this.counterScore >= this.bestScore){
                    this.bestScore = this.counterScore
                }
                this.pauseThemeSound()
                this.explosionSound()
                this.backImage.draw()
                this.drawAll()
                this.newPlayer.draw()
                window.cancelAnimationFrame(this.myReq)
                this.newPlayer.drawExplosion()
                this.setGameOver(this.bestScore)
                this.playAgainButton.removeAttribute('class', 'hideAllp')
            }
        
    },


    drawAll(){
        this.obsArr.forEach(element => {
        element.draw()});
        
    },

    createImage(){
        this.backImage = new backgroundImage(this.ctx, "images/fondo.png", -3, this.dimensionCanvas)
    },

    createImageDark(){
        this.backImage = new backgroundImage(this.ctx, "images/fondoDark.png", -3, this.dimensionCanvas)
    },

    createPlayer(){
        this.newPlayer = new Player(this.ctx, 200, 140, 50, this.dimensionCanvas)
    },

    createObs(){



        this.newObs = new Obstacle(this.ctx, /* 140 */ 250, 80, (Math.random()*10)*40 , this.dimensionCanvas)
        
        this.obsArr.push(this.newObs)

    },

    setListeners(){
        
 /*        window.addEventListener('keydown',(e) => {
            if(e.code === 'ArrowUp'){this.newPlayer.moveUp()}
        }) 
        
        window.addEventListener('keydown',(e) => {
            if(e.code === 'ArrowDown'){this.newPlayer.moveDown()}
        }) 

        window.addEventListener('keydown', (e) =>{
            if(e.code === 'Space'){this.newPlayer.drawLaser()
            console.log('laser')}
        }) */

        document.addEventListener('keydown', e => {
            e.code === 'Space' ? this.newPlayer.laserOn = true : null
            e.code === 'Space' ? this.newPlayer.laserOff = false : null
            e.key === 'ArrowUp' ? this.newPlayer.moveUp = true : null
            e.key === 'ArrowDown' ? this.newPlayer.moveDown = true : null
            
          })
      
          document.addEventListener('keyup', e => {
            e.code === 'Space' ? this.newPlayer.laserOn = false : null
            e.code === 'Space' ? this.newPlayer.laserOff = true : null
            e.code === 'Space' ? abduction = false : null
            e.key === 'ArrowUp' ? this.newPlayer.moveUp = false : null
            e.key === 'ArrowDown' ? this.newPlayer.moveDown = false : null
           
          })

         

          /* document.addEventListener('keypress', e => {
              e.key ==='space' ? this.newPlayer.laserOn = true : null
          }) */

    },
    

    isSpacePress(){
        document.addEventListener('keypress', e => {
            e.code === 'Space' ? this.spacePress = true : null})

        document.addEventListener('keyup', e => {
            if(e.code === 'Space'){ 
                this.spacePress = false
                this.newPlayer.laserH = 0

            
            
            }})

    },

    checkIfCollision() {
        if (this.obsArr.length) {
          this.obsArr.forEach(elem => {
            elem.draw();
    
            if (
              this.newPlayer.playerPosition.x < elem.obsPosition.x + elem.obsSize.w -120  &&
              this.newPlayer.playerPosition.x + this.newPlayer.playerWidth -120 > elem.obsPosition.x &&
              this.newPlayer.playerPosition.y < elem.obsPosition.y + elem.obsSize.h-20 &&
              this.newPlayer.playerPosition.y + this.newPlayer.playerHeight > elem.obsPosition.y
            ) {
                this.cancelAnimation = true

                console.log(this.newPlayer.playerPosition.x)
                console.log(this.newPlayer.playerWidth)
                console.log(elem.obsSize.w)
                
                console.log('hola')
            }
          });
        }
      },



      checkIfAbduction() {
        if (this.obsArr.length) {
          this.obsArr.forEach(elem => {
            elem.draw();
    
            if (
              this.newPlayer.playerPosition.x-100 < elem.obsPosition.x + elem.obsSize.w &&
              this.newPlayer.playerPosition.x-75 + 0 > elem.obsPosition.x &&
              this.newPlayer.playerPosition.y+60+50 < elem.obsPosition.y + elem.obsSize.h-20 &&
              this.newPlayer.playerPosition.y+60+50 > elem.obsPosition.y && this.spacePress === true
            ) {
                this.abduction = true
                elem.obsSize.w = 0
                elem.obsSize.h = 0
                this.counterScore ++
                this.ufoSound()
                /* setInterval(()=>{this.counterScore +=1}, 500); */

                console.log(this.newPlayer.playerPosition.x)
                console.log(this.newPlayer.playerWidth)
                console.log(elem.obsSize.w)
                
                console.log('pepe')
            }
          });
        }
      },

      checkIfReduction() {
        if (this.obsArr.length) {
          this.obsArr.forEach(elem => {
            elem.draw();
    
            if (
              this.newPlayer.playerPosition.x-85 < elem.obsPosition.x + elem.obsSize.w &&
              this.newPlayer.playerPosition.x-85 + 0 > elem.obsPosition.x &&
              this.newPlayer.playerPosition.y+50 < elem.obsPosition.y + elem.obsSize.h-20 &&
              this.newPlayer.playerPosition.y+50 + 100 > elem.obsPosition.y && this.spacePress === true
            ) {
                this.abduction = true
                elem.reduction()
                /* setInterval(()=>{this.counterScore +=1}, 500); */

                console.log(this.newPlayer.playerPosition.x)
                console.log(this.newPlayer.playerWidth)
                console.log(elem.obsSize.w)
                
                console.log('pepe')
            }
          });
        }
    },

    num: 0.4,
    num2: 1,
    
    explosionSound(num){
        let explosionSound = document.getElementById('explosion')
        explosionSound.currentTime = 0.5
        explosionSound.volume = this.num
        explosionSound.play()
    },

    ufoSound(num2){
        let sound = document.getElementById('ufo')
        sound.volume = this.num2
        sound.currentTime = 3.5
        sound.play()
    },

    pauseThemeSound(){
        let sound = document.getElementById('theme')
        sound.pause()
    },

    playThemeSound(){
        let sound = document.getElementById('theme')
        sound.currentTime = 0
        sound.play()
    },

    muteAudio(){
        this.num = 0
        this.num2 = 0
        let soundThe = document.getElementById('theme')
        soundThe.volume = 0
    },

    unmuteAudio(){
        this.num = 0.4
        this.num2 = 1
        let soundThe = document.getElementById('theme')
        soundThe.volume = 1
    }


    
}

