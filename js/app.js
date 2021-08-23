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
    newArr: [],
    
    cancelAnimation: false,
    abduction: false,
    spacePress: false,

    init(elementCanvas){
        this.setContext(elementCanvas)
        this.setDimensions(elementCanvas)

    
        this.createImage()
        this.createPlayer()
        this.drawAll()
        this.setListeners()
        this.refreshScreen()
        this.isSpacePress()
        this.setLevelCounter(this.coutnerLevel)
        this.setScoreCounter(this.counterScore)
            
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
        this.ctx.fillText(`LEVEL ${num}`, (this.dimensionCanvas.w/2) -200, +550)
        this.ctx.font = '25px ShadowOver';
        this.ctx.fillStyle = 'red'
        this.ctx.fillText(`LEVEL ${num}`, (this.dimensionCanvas.w/2)-200, +550)
    
    },

    setScoreCounter(num){
        
        this.ctx.font = '25px ShadowUnder';
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`SCORE ${num}`, (this.dimensionCanvas.w/2)+30, +550)
        this.ctx.font = '25px ShadowOver';
        this.ctx.fillStyle = 'red'
        this.ctx.fillText(`SCORE ${num}`, (this.dimensionCanvas.w/2)+30, +550)
    
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
            
            this.myReq = window.requestAnimationFrame(() => this.refreshScreen());


            if(this.cancelAnimation === true){
                window.cancelAnimationFrame(this.myReq)
                this.newPlayer.drawExplosion()
            }
        
    },

    



    drawAll(){
        this.obsArr.forEach(element => {
        element.draw()});
        
    },

    createImage(){
        this.backImage = new backgroundImage(this.ctx, "images/fondo.png", -3, this.dimensionCanvas)
    },

    createPlayer(){
        this.newPlayer = new Player(this.ctx, 200, 140, 50, this.dimensionCanvas)
    },

    createObs(){



        this.newObs = new Obstacle(this.ctx, 140, 80, (Math.random()*10)*40 , this.dimensionCanvas, .2)
        
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
              this.newPlayer.playerPosition.x-85 < elem.obsPosition.x + elem.obsSize.w &&
              this.newPlayer.playerPosition.x-85 + 50 > elem.obsPosition.x &&
              this.newPlayer.playerPosition.y+50 < elem.obsPosition.y + elem.obsSize.h-20 &&
              this.newPlayer.playerPosition.y+50 + 120 > elem.obsPosition.y && this.spacePress === true
            ) {
                this.abduction = true

                this.counterScore += 1

                this.newArr.push(elem)

                

                elem.obsSize.w = 0
                elem.obsSize.h = 0

                console.log(this.newPlayer.playerPosition.x)
                console.log(this.newPlayer.playerWidth)
                console.log(elem.obsSize.w)
                
                console.log('pepe')
            }
          });
        }
      }
    
}

/* if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) */