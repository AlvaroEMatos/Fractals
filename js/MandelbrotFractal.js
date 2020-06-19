const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const limits = {
    xMax: 2,
    xMin: -2,
    yMax: 2,
    yMin: -2
};
const pixelMatrix = new Array()//not implemented !!
const delta = 1 / ((canvas.width / 2) / limits.xMax);
const n = 100;

plot();

function plot() {//does not work !!
    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = "white";

    for (let a = limits.xMin; a <= limits.xMax; a += delta) {
        for (let b = limits.yMin; b <= limits.yMax; b += delta) {
            //*/
            let x = a;
            let y = b;
            for (let i = 0; i < n; i++) {
                x = Math.pow(x, 2) - Math.pow(y, 2) + a;
                y = 2 * x * y + b;
            }

            if (Math.abs(x) < 2 && Math.abs(y) < 2) {
                ctx.fillRect(a / delta, b / delta, 1, 1);
            }
            //*/
        }
    }

    ctx.translate(-canvas.width / 2, -canvas.height / 2);
}