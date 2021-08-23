class Player {
    constructor(ctx, xP, width, height, canvasDimensions){
        this.ctx = ctx
        this.playerWidth = width
        this.playerHeight = height
        this.canvasDimensions = canvasDimensions
        this.playerImage = new Image()
        this.playerImage.src = "images/obni2.png"
        this.rayImage = new Image()
        this.rayImage.src = "images/ray.png"
        this.explosionImage = new Image()
        this.explosionImage.src = "images/explosion.png"
        this.vy = 10
        this.playerX = xP
        this.playerPosition = {
            x: this.canvasDimensions.w / 3 - this.playerWidth / 2,
            y: this.canvasDimensions.h /2 -this.playerHeight/2

        }

        this.speed = 0.05
        this.angle = 0
        this.offset = 5 * .1
        this.moveUp = false;
        this.moveDown = false;
        this.laserOn = false;
        this.laserOff = true
        this.laserSpeed = 10;

        this.laserH = 0

    }
    move(){

    }
    draw(){
        
        /* if(this.playerPosition.y<this.canvasDimensions.h-300)
        {this.playerPosition.y += this.vy} */

       /*  if(this.playerPosition.y<0+200)
        {this.playerPosition.y -= this.vy} */
        
        /* else if (this.playerPosition.y<this.canvasDimensions.h+200) */
        this.playerPosition.y = this.playerPosition.y + Math.sin(this.angle)*this.offset
        
        this.ctx.drawImage(this.playerImage, this.playerX, this.playerPosition.y, this.playerWidth, this.playerHeight)
       /*  this.ctx.strokeRect(this.playerX, this.playerPosition.y, this.playerWidth, this.playerHeight) */
        /* this.ctx.drawImage(this.rayImage,this.playerPosition.x-100, this.playerPosition.y+90, 30, 150) */
        this.angle += this.speed
          
    }

    move(){

        this.playerPosition.y > 20 && this.moveUp ? this.playerPosition.y -= this.vy : null
        this.playerPosition.y + this.playerHeight < this.canvasDimensions.h-100 && this.moveDown ? this.playerPosition.y += this.vy : null
    }



  /*   moveUp(){

        if(this.playerPosition.y > 0){
            
            this.playerPosition.y -= this.vy}
        
    }

    moveDown(){

        if(this.playerPosition.y+this.playerHeight < this.canvasDimensions.h-100){
           
            this.playerPosition.y += this.vy}
            

    } */

    drawLaser(){

        this.laserOn ? this.laserH +=this.laserSpeed : null
        this.laserOn ? this.ctx.drawImage(this.rayImage,this.playerPosition.x-85, this.playerPosition.y+50, 50, this.laserH) : null
        this.laserH > 150 ? this.laserH = 0 : null
    
    }

   /*  deleteLaser(){
        this.laserOff ? this.laserH = 0 : null
        
    } */

    drawExplosion(){
        this.ctx.drawImage(this.explosionImage, this.playerX-40, this.playerPosition.y-50, 190, 180)

    }
}

/* 
class Bird {
    constructor() {
        this.x = 100;
        this.y = height / 2;
        this.d = 30;
        this.a = 0.3;
        this.v = 0.1
        this.va = 0;
        this.j = false;
    }

    die() {
        this.y += this.v;
        this.v += this.a;
    }

    update() {
        let p = this.y + this.d / 2;
        if (p < height - 50 || this.j) {
            if (p != height - 50) {
                this.v += (this.a + this.va);
            } else {
                this.v += this.va;
            }
            this.y += this.v;
            this.j = false;
        } else {
            this.y = height - 50 - this.d / 2;
        }
        if (this.va < 0) {
            this.va += 0.3;
        } else {
            this.va = 0;
        }
    }

    jump() {
        this.j = true;
        this.va = -2;
        this.v = 0;
    }

    show() {
        fill(200);
        noStroke();
        circle(this.x, this.y, this.d);
    }
} */