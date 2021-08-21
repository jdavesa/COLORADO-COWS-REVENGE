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
        
        this.ctx.font = '70px creepster';
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`LEVEL ${num}`, (this.dimensionCanvas.w/2)-200, +555)
        this.ctx.font = '70px creepster';
        this.ctx.fillStyle = 'grey'
        this.ctx.fillText(`LEVEL ${num}`, (this.dimensionCanvas.w/2)-200, +550)
        this.ctx
        this.ctx.font = '70px creepster';
        this.ctx.fillStyle = 'black'
        this.ctx.strokeText(`LEVEL ${num}`, (this.dimensionCanvas.w/2)-200, +550)
        this.ctx.lineWidth = 2
    
    },

    setScoreCounter(num){
        
        this.ctx.font = '70px creepster';
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`SCORE ${num}`, (this.dimensionCanvas.w/2)+30, +555)
        this.ctx.font = '70px creepster';
        this.ctx.fillStyle = '#FFEC00'
        this.ctx.fillText(`SCORE ${num}`, (this.dimensionCanvas.w/2)+30, +550)
        this.ctx
        this.ctx.font = '70px creepster';
        this.ctx.fillStyle = 'black'
        this.ctx.strokeText(`SCORE ${num}`, (this.dimensionCanvas.w/2)+30, +550)
        this.ctx.lineWidth = 2
    
    },
    
    /* refreshScreen(){
        
        this.backImage.move()
        this.ctx.clearRect(0,0,this.dimensionCanvas.w,this.dimensionCanvas.h)
        this.backImage.draw()
        this.newPlayer.draw()
        requestAnimationFrame(() => this.refreshScreen());
    }, */

    refreshScreen(){
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



    drawAll(){
        this.obsArr.forEach(element => {
        element.draw()});
        
    },

    createImage(){
        this.backImage = new backgroundImage(this.ctx, "images/fondo.png", -6, this.dimensionCanvas)
    },

    createPlayer(){
        this.newPlayer = new Player(this.ctx, 200, 110, 100, this.dimensionCanvas)
    },

    createObs(){


        this.newObs = new Obstacle(this.ctx, 140, 110, (Math.random()*10)*40 , this.dimensionCanvas, 1)
        
        this.obsArr.push(this.newObs)

    },

    

    setListeners(){
        
        window.addEventListener('keydown',(e) => {
            if(e.code === 'ArrowUp'){this.newPlayer.moveUp()}
        }) 
        
        window.addEventListener('keydown',(e) => {
            if(e.code === 'ArrowDown'){this.newPlayer.falling()}
        }) 

       /*  this.moving = event => {
            switch (event.code) {
              case "Space":
                isSpaceKeyPressed = true;
                break; 
            }
          };
          
          this.handleKeyUp = event => {
            switch (event.code) {
              case "Space":
                isSpaceKeyPressed = false;
                break;      
            }
          };
 */
        /* window.addEventListener("keydown", this.newPlayer.moveUp());
        window.addEventListener("keyup", this.newPlayer.falling()); */
    }
}