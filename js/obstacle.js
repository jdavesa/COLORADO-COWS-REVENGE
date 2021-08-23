class Obstacle {
    constructor (ctx, width, height, position, canvasDimension, speed){
        this.ctx = ctx
        this.obsSize = {w:width, h:height}
        this.obsPosition = {x: canvasDimension.w +100, y: position}
        this.speed = speed
        this.obsImg = new Image()
        this.obsImg.src = "images/cow.png"

        

    }
    
    draw(){
        this.speed /=.99
        this.obsPosition.x -=1
        this.obsPosition.x -= this.speed
        this.ctx.drawImage(this.obsImg, this.obsPosition.x, this.obsPosition.y, this.obsSize.w, this.obsSize.h)
        


    }

   /*  move(){
        this.obsPosition.x *= .99
        this.obsPosition.x -= .4
        this.obsPosition.x -= this.speed

    } */
}