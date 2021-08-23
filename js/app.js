const myApp = {
    ctx:undefined,
    dimensionCanvas:{w:undefined,h:undefined},
    backImage: undefined,
    newPlayer: undefined,
    intId: undefined,
    obsArr: [],
    intervalId: undefined,
    frameCounter: 0,
    counterLevel: 0,
    counterScore: 0,


    init(elementCanvas){
        this.setContext(elementCanvas)
        this.setDimensions(elementCanvas)

    
        this.createImage()
        this.createPlayer()
        this.drawAll()
        this.setListeners()
        this.refreshScreen()
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
        
            this.backImage.move()
            this.ctx.clearRect(0,0,this.dimensionCanvas.w,this.dimensionCanvas.h)
            this.backImage.draw()
            
            this.frameCounter ++
            if(this.frameCounter % 25 === 0){
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
            this.newPlayer.move()
            this.newPlayer.deleteLaser()
            this.newPlayer.drawLaser()
            
            requestAnimationFrame(() => this.refreshScreen());
    },

    



    drawAll(){
        this.obsArr.forEach(element => {
        element.draw()});
        
    },

    createImage(){
        this.backImage = new backgroundImage(this.ctx, "images/fondo.png", -4, this.dimensionCanvas)
    },

    createPlayer(){
        this.newPlayer = new Player(this.ctx, 200, 140, 50, this.dimensionCanvas)
    },

    createObs(){



        this.newObs = new Obstacle(this.ctx, 140, 110, (Math.random()*10)*40 , this.dimensionCanvas, 3)
        
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

    }
}