

export default class Spirte {

    constructor(img, height, width, loopLeng){
        this.image = new Image();
        this.image.src = img;
        this.loopLeng = loopLeng;
        this.loopC = 0;
        this.frameCount = 0;
        this.height = height;
        this.width = width;
        this.step = this.step.bind(this);
        this.drawFrame = this.drawFrame.bind(this);
    }
    step(ctx, oCtx, xView, yView, hMul = 1, wMul = 1) {
        this.frameCount++;
        this.drawFrame(ctx, oCtx, xView, yView, hMul, wMul);
        if (this.frameCount < 15) {
            return;
        }
        this.frameCount = 0;
        this.loopC++;
        if (this.loopC >= this.loopLeng) {
            this.loopC = 0;
        }
    }
    drawFrame(ctx, oCtx, xView, yView, hMul = 1, wMul = 1) {
        ctx.drawImage(
            this.image,
            this.loopC * this.width,
            0,
            this.width,
            this.height,
            (oCtx.x - oCtx.width / 2) - xView,
            (oCtx.y - oCtx.height / 2) - yView,
            this.height * hMul,
            this.width * wMul
            );
    }
    drawFFrame(ctx, oCtx, xView, yView, hMul = 1, wMul = 1) {
        ctx.drawImage(
            this.image,
            0,
            0,
            this.width,
            this.height,
            (oCtx.x - oCtx.width / 2) - xView,
            (oCtx.y - oCtx.height / 2) - yView,
            this.height * hMul,
            this.width * wMul
            );
    }
}