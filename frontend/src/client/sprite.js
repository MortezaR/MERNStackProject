

export default class Spirte {

    constructor(img){
        // this.ctx = ctx;
        this.image = new Image();
        this.image.src = img;
        // this.cycleLoop = [0, 1, 2, 3];
        this.loopC = 0;
        this.frameCount = 0;
        this.height = 33;
        this.width = 33;
        this.step = this.step.bind(this);
        this.drawFrame = this.drawFrame.bind(this);
    }
    step(ctx, oCtx, xView, yView) {
        this.frameCount++;
        if (this.frameCount < 15) {
            // debugger;
            this.drawFrame(ctx, oCtx, xView, yView);
            // window.requestAnimationFrame(this.step(ctx, oCtx, xView, yView));
            return;
        }
        this.frameCount = 0;
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawFrame(ctx, oCtx, xView, yView);
        this.loopC++;
        if (this.loopC >= 4) {
            this.loopC = 0;
        }
        // window.requestAnimationFrame(this.step(ctx, oCtx, xView, yView));
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