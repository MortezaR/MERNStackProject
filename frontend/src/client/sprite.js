

export default class Spirte {

    constructor(img){
        this.image = new Image();
        this.image.src = img;
        // this.cycleLoop = [0, 1, 2, 3];
        this.loopC = 0;
        this.frameCount = 0;
        this.height = 32;
        this.width = 32;
        this.step = this.step.bind(this);
        this.drawFrame = this.drawFrame.bind(this);
    }
    step(ctx, oCtx, xView, yView) {
        this.frameCount++;
        if (this.frameCount < 15) {
            this.drawFrame(ctx, oCtx, xView, yView);
            return;
        }
        this.frameCount = 0;
        this.drawFrame(ctx, oCtx, xView, yView);
        this.loopC++;
        if (this.loopC >= 4) {
            this.loopC = 0;
        }
    }
    drawFrame(ctx, oCtx, xView, yView) {
        ctx.drawImage(
            this.image,
            this.loopC * this.width,
            0,
            this.width,
            this.height,
            (oCtx.x - oCtx.width / 2) - xView,
            (oCtx.y - oCtx.height / 2) - yView,
            this.height * 2,
            this.width * 2
            );
    }
    drawFFrame(ctx, oCtx, xView, yView) {
        ctx.drawImage(
            this.image,
            0,
            0,
            this.width,
            this.height,
            (oCtx.x - oCtx.width / 2) - xView,
            (oCtx.y - oCtx.height / 2) - yView,
            this.height * 2,
            this.width * 2
            );
    }
}