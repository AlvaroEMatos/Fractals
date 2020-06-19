const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = 2000;
const height = 2000;
const maxIteracion = 5000;
/*
const limits = {
    xMax: 0.267687406874999976248,
    xMin: 0.264921892499999976248,
    yMax: 0.004833656250000000044,
    yMin: 0.002758441875000000044
};
//*/
//*
const limits = {
    xMax: -1.2578248550723437,
    xMin: -1.2578248551406614,
    yMax: 0.033415522415783425,
    yMin: 0.03341552236454508
};
//*/
/*
const limits = {
    xMax: 2,
    xMin: -2,
    yMax: 2,
    yMin: -2
};
//*/
/*/
const colorMap = [
    "rgb(66, 30, 15)",
    "rgb(25, 7, 26)",
    "rgb(9, 1, 47)",
    "rgb(4, 4, 73)",
    "rgb(0, 7, 100)",
    "rgb(12, 44, 138)",
    "rgb(24, 82, 177)",
    "rgb(57, 125, 209)",
    "rgb(134, 181, 229)",
    "rgb(211, 236, 248)",
    "rgb(241, 233, 191)",
    "rgb(248, 201, 95)",
    "rgb(255, 170, 0)",
    "rgb(204, 128, 0)",
    "rgb(153, 87, 0)",
    "rgb(106, 52, 3)"
];
//*/
const colorMap = createRGBColorMap(1000);

plot();

function plot() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let c_re = limits.xMin + ((limits.xMax - limits.xMin) / width) * i;
            let c_im = limits.yMin + ((limits.yMax - limits.yMin) / height) * j;
            let x = 0;
            let y = 0;
            let n = 0;

            for (; n < maxIteracion && ((x * x) + (y * y)) <= 4; n++) {
                let temp = (x * x) - (y * y) + c_re;
                y = 2 * x * y + c_im;
                x = temp;
            }

            if (n < maxIteracion && n > 0) {
                let idxColor = n % colorMap.length;
                ctx.fillStyle = colorMap[idxColor];
                ctx.fillRect(i, j, 1, 1);
            }else {
                ctx.fillStyle = "black";
                ctx.fillRect(i, j, 1, 1);
            }           
        }
    }
}

function createRGBColorMap (length) {
    const colorMap = new Array(length);
    var n = 0;

    for (let i = 0; i < length / 6; i++, n++) {
        let r = 255;
        let g = linearInterpolation(0, length / 6, 0, 255, i);
        let b = 0;
        colorMap[n] = "rgb(" + r + "," + g + "," + b + ")";
    }
    for (let i = 0; i < length / 6; i++, n++) {
        let r = linearInterpolation(0, length / 6, 255, 0, i);
        let g = 255;
        let b = 0;
        colorMap[n] = "rgb(" + r + "," + g + "," + b + ")";
    }
    for (let i = 0; i < length / 6; i++, n++) {
        let r = 0;
        let g = 255;
        let b = linearInterpolation(0, length / 6, 0, 255, i);
        colorMap[n] = "rgb(" + r + "," + g + "," + b + ")";
    }
    for (let i = 0; i < length / 6; i++, n++) {
        let r = 0;
        let g = linearInterpolation(0, length / 6, 255, 0, i);
        let b = 255;
        colorMap[n] = "rgb(" + r + "," + g + "," + b + ")";
    }
    for (let i = 0; i < length / 6; i++, n++) {
        let r = linearInterpolation(0, length / 6, 0, 255, i);
        let g = 0;
        let b = 255;
        colorMap[n] = "rgb(" + r + "," + g + "," + b + ")";
    }
    for (let i = 0; i < length / 6; i++, n++) {
        let r = 255;
        let g = 0;
        let b = linearInterpolation(0, length / 6, 255, 0, i);;
        colorMap[n] = "rgb(" + r + "," + g + "," + b + ")";
    }

    return colorMap;
}

create

function linearInterpolation(x1, x2, y1, y2, t) {
    const m = (y2 - y1) / (x2 - x1);
    const c = y1 - m * x1;

    return t * m + c;
}