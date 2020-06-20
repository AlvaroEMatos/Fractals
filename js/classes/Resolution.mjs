export class Resolution {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        canvas.width = width;
        canvas.height = height;
    }
}