const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = 2000;
const height = 2000;
const maxIteracion = 1000

plot();

function plot() {
    ctx.fillStyle = "white";

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let c_re = (i - width / 2) * 4 / width;
            let c_im = (j - height / 2) * 4 / height;
            let x = 0;
            let y = 0;

            for(let iteracion = 0; iteracion < maxIteracion; iteracion++) {
                let temp = (x * x) - (y * y) + c_re;
                y = 2 * x * y + c_im;
                x = temp;
            }

            if((x * x) + (y * y) <= 4) {
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
}