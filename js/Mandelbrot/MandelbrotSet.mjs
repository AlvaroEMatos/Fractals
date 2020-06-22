//inspired by 'http://math.hws.edu/eck/js/mandelbrot/MB.html?ex=examples%2fdragon.xml'

import {Limits} from '../classes/Limits.mjs';
import {Palette} from '../classes/Palette.mjs';


const canvas = document.getElementById("canvas");
const canvasPalette = document.getElementById("canvaspalette");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const dataMatrix = new Array(height * width);
var maxInteraction;
var limits;
var palette;
var colorMap;
var configs = {
    "defaultLimits" : {
        "xMax" : 0.8,
        "xMin" : -2.2,
        "yMax" : 1.2,
        "yMin" : -1.2
    },

    "rgb" : {
        "colors" : [
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255],
            [255, 0, 0]
        ],

        "stopValues": [
            0,
            33,
            66,
            100
        ]
    },

    "grayScale" : {
        "colors" : [
            [0,0,0],
            [255,255,255],
            [0,0,0]
        ],

        "stopValues": [
            0,
            50,
            100
        ]
    },

    "fire" : {
        "colors" : [
            [0, 0, 0],
            [255, 0, 0],
            [255, 255, 0],
            [255, 255, 255],
            [255, 255, 0],
            [255, 0, 0],
            [0, 0, 0]
        ],

        "stopValues": [
            0,
            20,
            40,
            50,
            60,
            80,
            100
        ]
    },

    "earthAndSky" : {
        "colors" : [
            [255, 255, 255],
            [255, 204, 0],
            [135, 30, 19],
            [0, 0, 153],
            [0, 102, 255],
            [255, 255, 255]
        ],

        "stopValues": [
            0,
            15,
            30,
            70,
            85,
            100
        ]
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////#region web implementation

const resetBtn =  document.getElementById("resetBtn");
const apllyPaletteBtn = document.getElementById("ApllyPaletteBtn");
const plotBtn = document.getElementById("plotBtn");

const paletteForm = document.getElementById("palette");
const paletteList = paletteForm.elements.namedItem("paletteList");
const paletteLength = paletteForm.elements.namedItem("length");
const paletteOffSet = paletteForm.elements.namedItem("offSet");

const positionForm = document.getElementById("position");
const x = positionForm.elements.namedItem("x");
const y =  positionForm.elements.namedItem("y");
const zoom =  positionForm.elements.namedItem("zoom");

const formParameters = document.getElementById("parameters");
const parameterMaxInteraction = formParameters.elements.namedItem("maxInteraction");



start();



function start() {
    /*
    var xmlHttp;

    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest;
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

            configs = JSON.parse(xmlHttp.responseText);
    */
    
            limits = new Limits(configs);
            palette = new Palette(configs);

            palette.setNewPalette(paletteList.value);
            palette.plot(canvasPalette)
            colorMap = palette.getColorMap(parseInt(paletteLength.value),parseFloat(paletteOffSet.value));
            setDataMatrix();
            plot();

            resetBtn.addEventListener("click", function () {
                x.value = -0.7;
                y.value = 0;
                limits.setDefaultLimits();
                setDataMatrix();
                plot();
            }, false);

            apllyPaletteBtn.addEventListener("click", function() { 
                palette.setNewPalette(paletteList.value);
                palette.plot(canvasPalette);
                colorMap = palette.getColorMap(parseInt(paletteLength.value), parseFloat(paletteOffSet.value));
                plot();
            }, false);

            plotBtn.addEventListener("click", function() {
                maxInteraction = parseInt(parameterMaxInteraction.value);
                setDataMatrix();
                plot();
            } , false);

            $(document).ready(function() {
                $("#canvas").click(function (event) {
                    maxInteraction = parseInt(parameterMaxInteraction.value);
                    limits.setNewLimits(parseFloat(x.value), parseFloat(y.value), parseFloat(zoom.value));
                    setDataMatrix();
                    plot();
                });
                $("#canvas").mousemove(function(event){
                    x.value = limits.xMin + ((limits.xMax - limits.xMin) / width) * (event.pageX - $(this).offset().left);
                    y.value = limits.yMin + ((limits.yMax - limits.yMin) / height) * ( height - (event.pageY - $(this).offset().top));
                });
            });
    
    /*
        }
    };

    xmlHttp.open('GET', window.origin + '/js/Mandelbrot/configs.txt', true);
    xmlHttp.send();
    */
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////#endregion 

function setDataMatrix() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

            let c_re = limits.xMin + ((limits.xMax - limits.xMin) / width) * i;
            let c_im = limits.yMin + ((limits.yMax - limits.yMin) / height) * j;
            let x = 0;
            let y = 0;
            let n = 0;

            for (; n < maxInteraction && ((x * x) + (y * y)) <= 4; n++) {
                let temp = (x * x) - (y * y) + c_re;
                y = 2 * x * y + c_im;
                x = temp;
            }

            dataMatrix[i * width + j] = n;
        }
    }
}

function plot() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

            if (dataMatrix[i * width + j] < maxInteraction && dataMatrix[i * width + j] > 0) {

                let idxColor = dataMatrix[i * width + j] % colorMap.length;
                ctx.fillStyle = colorMap[idxColor];
                ctx.fillRect(i, height - j, 1, 1);
                
            }else {

                ctx.fillStyle = "black";
                ctx.fillRect(i, height - j, 1, 1);
            }  
        }
    }
}
