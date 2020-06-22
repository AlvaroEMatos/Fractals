export class Limits {
    constructor(configs) {
        this.configs = configs;
        this.setDefaultLimits();
    }
    setNewLimits(x, y, zoom) {
        //translate
        const xLength = (this.xMax - this.xMin);
        const yLength = (this.yMax - this.yMin);
        this.xMax = x + xLength / 2;
        this.xMin = x - xLength / 2;
        this.yMax = y + yLength / 2;
        this.yMin = y - yLength / 2;
        //zoom
        this.xMax -= xLength * (1 - 1 / zoom) / 2;
        this.xMin += xLength * (1 - 1 / zoom) / 2;
        this.yMax -= yLength * (1 - 1 / zoom) / 2;
        this.yMin += yLength * (1 - 1 / zoom) / 2;

        console.log(this.yMax);
        console.log(this.yMin);
    }
    setDefaultLimits() {
        this.xMax = this.configs.defaultLimits.xMax;
        this.xMin = this.configs.defaultLimits.xMin;
        this.yMax = this.configs.defaultLimits.yMax;
        this.yMin = this.configs.defaultLimits.yMin;
    }
}