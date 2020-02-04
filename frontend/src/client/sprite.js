

export default class Sprite {

    constructor(img, height, width, loopLeng, startFramePos, parentObj, maxFrameCount = 15) {
        this.image = new Image();
        this.image.src = img;
        this.loopLeng = loopLeng;
        this.loopC = 0;
        this.frameCount = 0;
        this.height = height;
        this.width = width;
        this.startFramePos = startFramePos;
        this.step = this.step.bind(this);
        this.drawFrame = this.drawFrame.bind(this);
        this.parentObj = parentObj;
        this.maxFrameCount = maxFrameCount;
    }
    step(ctx, object, xView, yView, heightMultiplier = 1, widthMultiplier = 1, trapped) {
        this.frameCount++;
        if(this.loopC>= this.loopLeng && trapped){
            debugger
            this.drawFinalFrame(ctx, object, xView, yView, heightMultiplier, widthMultiplier);
        } else {
            this.drawFrame(ctx, object, xView, yView, heightMultiplier, widthMultiplier);
        }
        if (this.frameCount < this.maxFrameCount) {
            return;
        }
        this.frameCount = 0;
        this.loopC++;
        if (this.loopC >= this.loopLeng && !trapped) {
            this.loopC = 0;
            this.parentObj.attacking = false;
        }
    }
    drawFrame(ctx, object, xView, yView, heightMultiplier = 1, widthMultiplier = 1) {
        ctx.drawImage(
            this.image,
            this.loopC * this.width,
            this.startFramePos[1],
            this.width,
            this.height,
            (object.x - object.width / 2) - xView,
            (object.y - object.height / 2) - yView,
            this.height * heightMultiplier,
            this.width * widthMultiplier
        );
    }
    drawFirstFrame(ctx, object, xView, yView, heightMultiplier = 1, widthMultiplier = 1) {
        ctx.drawImage(
            this.image,
            0,
            this.startFramePos[1],
            this.width,
            this.height,
            (object.x - object.width / 2) - xView,
            (object.y - object.height / 2) - yView,
            this.height * heightMultiplier,
            this.width * widthMultiplier
        );
    }
    drawFinalFrame(ctx, object, xView, yView, heightMultiplier = 1, widthMultiplier = 1) {
        ctx.drawImage(
            this.image,
            (this.loopLeng-1) * this.width,
            this.startFramePos[1],
            this.width,
            this.height,
            (object.x - object.width / 2) - xView,
            (object.y - object.height / 2) - yView,
            this.height * heightMultiplier,
            this.width * widthMultiplier
        );
    }
}