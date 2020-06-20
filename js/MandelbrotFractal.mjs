//inspired by 'http://math.hws.edu/eck/js/mandelbrot/MB.html?ex=examples%2fdragon.xml'

import {Limits} from './classes/Limits.mjs';
import {Resolution} from './classes/Resolution.mjs';
import {Palette} from './classes/Palette.mjs';

const canvas = document.getElementById("canvas");
const canvasPalette = document.getElementById("canvaspalette");
const ctx = canvas.getContext("2d");

var resolution;
var dataMatrix;
var maxInteraction;
var limits;
var palette;
var colorMap;

setup();
setDataMatrix();
plot();
palette.plot(canvasPalette);

function setup() {

    resolution = new Resolution(800, 600, canvas);
    dataMatrix = new Array(resolution.height * resolution.width);
    maxInteraction = 5000;
    limits = new Limits(
        -1.6744096740931858, //xMax
        -1.674409674093473, //xMin
        4.716540790246652E-5, //yMax
        4.716540768697223E-5 //yMin
    );
    palette = new Palette();

    palette.addColor([255, 255, 255], 0);
    palette.addColor([255, 204, 0], 15);
    palette.addColor([135, 30, 19], 30);
    palette.addColor([0, 0, 153], 70);
    palette.addColor([0, 102, 255], 85);
    palette.addColor([255, 255, 255], 100);

    colorMap = palette.getColorMap(250, 0);

}

function setDataMatrix() {
    for (let i = 0; i < resolution.width; i++) {
        for (let j = 0; j < resolution.height; j++) {

            let c_re = limits.xMin + ((limits.xMax - limits.xMin) / resolution.width) * i;
            let c_im = limits.yMin + ((limits.yMax - limits.yMin) / resolution.height) * j;
            let x = 0;
            let y = 0;
            let n = 0;

            for (; n < maxInteraction && ((x * x) + (y * y)) <= 4; n++) {
                let temp = (x * x) - (y * y) + c_re;
                y = 2 * x * y + c_im;
                x = temp;
            }

            dataMatrix[i * resolution.width + j] = n;
        }
    }
}

function plot() {
    for (let i = 0; i < resolution.width; i++) {
        for (let j = 0; j < resolution.height; j++) {

            if (dataMatrix[i * resolution.width + j] < maxInteraction && dataMatrix[i * resolution.width + j] > 0) {

                let idxColor = dataMatrix[i * resolution.width + j] % colorMap.length;
                ctx.fillStyle = colorMap[idxColor];
                ctx.fillRect(i, resolution.height - j, 1, 1);
                
            }else {

                ctx.fillStyle = "black";
                ctx.fillRect(i, resolution.height - j, 1, 1);
            }  
        }
    }
}