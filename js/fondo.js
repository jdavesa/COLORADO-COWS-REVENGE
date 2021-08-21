class backgroundImage {
    constructor(ctx, source, speed, canvasDimensions){
    this.ctx = ctx
    this.imgX = 0
    this.imgY = 0
    this.ctx = ctx
    this.backImage = new Image()
    this.backImage.src = source
    this.speed = speed
    this.imgW = canvasDimensions.w
    this.imgH = canvasDimensions.h
    
        
    }
   /*  img: img,
    x: 0,
    speed: -1, */
  
    move(){
      this.imgX += this.speed;
      this.imgX %= this.imgW;
    }
  
    draw(){
      this.ctx.drawImage(this.backImage, this.imgX, this.imgY, this.imgW, this.imgH);
      if (this.speed < 0) {
        this.ctx.drawImage(this.backImage, this.imgX + this.imgW, this.imgY, this.imgW, this.imgH);
      } else {
        this.ctx.drawImage(this.backImage, this.imgX - this.imgW, this.imgY, this.imgW, this.imgH);
      }
    }
  };