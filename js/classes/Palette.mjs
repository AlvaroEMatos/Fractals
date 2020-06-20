export class Palette {
    constructor() {
        this.colors = new Array();
        this.stopValues = new Array();
    }

    addColor(color, stopValue) {//(color: [r, g, b] numbers from 0 to 255, stopValue: number from 0 to 100)

        for (let i = 0; i < this.stopValues.length; i++) {
    
            if (this.stopValues[i] > stopValue) {
    
                let tempStopValue = this.stopValues[i];
                let tempColor = this.colors[i];
    
                this.stopValues[i] = stopValue;
                this.colors[i] = color;
    
                stopValue = tempStopValue;
                color = tempColor;
            }
        }
    
        this.stopValues.push(stopValue);
        this.colors.push(color);   
    }   

    getColorMap(length, offSet) {//(length: number from 1 to maxInteration, offSet: number % from 0 to 100) return ["rgb(r,g,b)", ...]

        const colorMap = new Array();

        for (let i = 0; i < length; i++) {
            colorMap[(i + Math.round(length * offSet / 100)) % length] = this.getColor( i / length * 100);
        }

        return colorMap;
    } 

    getColor(value) {//(value: number-> 0 to 100) return "rgb(r,g,b)"
        const color = new Array();
        var color1;
        var color2;
        var stopValue1;
        var stopValue2;
        var fade;
        
        for (let i = 0; i < this.stopValues.length; i++) {
    
            if (this.stopValues[i] >= value) {
                color2 = this.colors[i];
                stopValue2 = this.stopValues[i];
                break;
            }
    
            color1 = this.colors[i];
            stopValue1 = this.stopValues[i];
        }
        
        if (color1 === undefined && color2 === undefined){
            return "rgb(0,0,0)";
        }
        if (color1 === undefined) {
            return "rgb(" + color2[0] + "," + color2[1] + "," + color2[2] + ")";
        }
        if (color2 === undefined) {
            return "rgb(" + color1[0] + "," + color1[1] + "," + color1[2] + ")";
        }
        
        fade = (stopValue2 - stopValue1) / 2;
        value = value - stopValue1;

        if ( value > fade) {

            value = fade - (value - fade);
            let temp = color1;
            color1 = color2;
            color2 = temp;
        }

        for (let i = 0; i < 3; i++) {
            color[i] = Math.round(linearInterpolation(0, fade * 2, color1[i], color2[i], value));
        }

        return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
    }

    plot(canvas) {
        const width = canvas.width;
        const height = canvas.height;
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < width; i++) {
            ctx.fillStyle = this.getColor(i / width * 100);
            ctx.fillRect(i, 0, 1, height);
        }
    }
}

function linearInterpolation(x1, x2, y1, y2, t) {
    const m = (y2 - y1) / (x2 - x1);
    const c = y1 - m * x1;

    return t * m + c;
}

function senoidalInterpolation(x1, x2, y1, y2, t) {
    const w = Math.PI / (2 * (x2 - x1));
    
    return (y2 - y1) * Math.sin(w * (t - x1))**2 + y1
}