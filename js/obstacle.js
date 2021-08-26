class Obstacle {
    constructor (ctx, width, height, position, canvasDimension){
        this.ctx = ctx
        this.obsSize = {w:width, h:height}
        this.obsPosition = {x: canvasDimension.w +100, y: position}
        this.speed = .7
        this.obsImg = new Image()
        this.obsImg.src = "images/cow.png"
        this.obsImgDark = new Image()
        this.obsImgDark.src = "images/cow.png"

        

    }
    
    draw(){
        this.speed /=.995
        this.obsPosition.x -= this.speed
        /* this.ctx.drawImage(this.obsImg, this.obsPosition.x, this.obsPosition.y, this.obsSize.w, this.obsSize.h) */
        this.ctx.drawImage(this.obsImgDark, this.obsPosition.x, this.obsPosition.y, this.obsSize.w, this.obsSize.h)
        /* this.ctx.strokeRect( this.obsPosition.x, this.obsPosition.y, 140, 110) */
        


    }

    reduction(){
        this.obsSize.w -=40
        this.obsSize.h -=3
        this.obsPosition.y -=7
        this.speed = 0
        setTimeout(()=> {
            this.obsSize.w = 0
            this.obsSize.y = 0
        }, 200)

    }

    disapear(){
        this.obsSize.w = 0
        this.obsSize.h = 0 

    }

/*     move(){
        this.obsPosition.x *= .99
        this.obsPosition.x -= .4
        this.obsPosition.x -= this.speed

    } */
}

/* class Particle {
    constructor (ctx, x, y, width, height){
    this.ctx = ctx
    this.x = x;
    this.y = y;
    this.width = width
    this.height = height
    this.speedX = Math.random()*1+0.5;
    this.smokeImg = new Image()
    this.smokeImg.src = "images/smokeDark.png"
    }
    update(){
        
        
    }
    draw(){
        this.x += this.speedX;
        this.ctx.drawImage(this.smokeImg, this.x, this.y, this.width, this.height)
    }
} */