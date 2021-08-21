class Player {
    constructor(ctx, xP, width, height, canvasDimensions){
        this.ctx = ctx
        this.playerWidth = width
        this.playerHeight = height
        this.canvasDimensions = canvasDimensions
        this.playerImage = new Image()
        this.playerImage.src = "images/obni.png"
        this.vy = 20
        this.playerX = xP
        this.playerPosition = {
            x: this.canvasDimensions.w / 3 - this.playerWidth / 2,
            y: this.canvasDimensions.h /2 -this.playerHeight/2

        }

    }
    move(){

    }
    draw(){
        
        /* if(this.playerPosition.y<this.canvasDimensions.h-300)
        {this.playerPosition.y += this.vy} */

       /*  if(this.playerPosition.y<0+200)
        {this.playerPosition.y -= this.vy} */
        
        /* else if (this.playerPosition.y<this.canvasDimensions.h+200) */
        this.ctx.drawImage(this.playerImage, this.playerX, this.playerPosition.y, this.playerWidth, this.playerHeight)
        
        
    }

    newPos(){

    }

    moveUp(){

        if(this.playerPosition.y > 0){
            
          
            this.playerPosition.y -= this.vy}
        
    }

    falling(){

        if(this.playerPosition.y+this.playerHeight < this.canvasDimensions.h-100){
           
            this.playerPosition.y += this.vy}

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