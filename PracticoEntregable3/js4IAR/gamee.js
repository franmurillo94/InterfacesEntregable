"use strict"

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// game parameters

let grid_cols = 7; // cantidad de columnas
let grid_rows = 6; // cantidad de filas
let grid_circle = 0.7; // tamanio del circulo en proporcion a la celda
let grid_margin = 0.07; // margin como una fraccion de la dimension mas pequenia de la pantalla
let connect_number = 4; // numero de chequeo de casillas conectadas

// game variables 

let grid = [];
let gameOver;
let playersTurn;


//colores

let color_background = "yellow";
let color_frame = "red";
let color_player1 = "blue";
let color_player2 = "green";


// gameloop
let timeDelta, timeLast;
requestAnimationFrame(loop);

class Cell { 
    constructor (left, top, w, h, row, col) {
        this.bot = top + h;
        this.left = left;
        this.right = left + w;
        this.top = top;
        this.w = w;
        this.h = h;
        this.row = row;
        this.col = col;
        this.cx = left + w/2;
        this.cy = top + h/2;
        this.r = w * grid_circle/2;
        this.owner = null;
        this.winner = false;
    }

    draw(ctx){                                   //      /** @type {CanvasRenderingContext2D}*/
        // owner color
        let color =  this.owner == null ? color_background : this.owner ? color_player1 : color_player2;
        
        // dibujar ficha
        //console.log("dibujo cell");
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.cx,this.cy,this.r,0,Math.PI * 2);
        ctx.fill();
    }
}


// dimensions
let height = 500;
let width = 1000;
let margin = 20;
//margin = grid_margin * Math.min(height, width); // se queda queda con el valor minimo
setDimensions();
// window.addEventListener("resize", setDimensions);


function newGame(){ 
    gameOver = false;
    createGrid(); 
}

function setDimensions(){ 
    height = 500;                    // window.innerHeight;
    width = 1000;                     // window.innerWidth;

    canvas.height = height;
    canvas.width = width;
    //margin = grid_margin * Math.min(height, width); // se queda queda con el valor minimo
    newGame();
}



function loop(timeNow){
// inicializando timeLast, si no hay uno previo se setea
if (!timeLast){
    timeLast = timeNow;
}
// calcular la diferencia de tiempo
timeDelta = (timeNow / timeLast) / 1000; // segundos
timeLast = timeNow;

// update 

// draw
drawBackground();
drawGrid();
// drawText();

// call the next frame 
requestAnimationFrame(loop);
}


function drawBackground(){
    //console.log("dibujo background");
    ctx.fillStyle = color_background;
    ctx.fillRect(0,0,width,height);
}


function drawGrid(){
    
    //console.log("dibujo grid");
    //frame n butt
    
    let cell = grid[0][0];
    let fh = cell.h * grid_rows;
    let fw = cell.w * grid_cols;
    ctx.fillStyle = color_frame;
    ctx.fillRect(cell.left,cell.top,fw,fh);
    
    // cell
    for(let row of grid) {
        for (let cell of row) {
            cell.draw(ctx);
        }
    }
}

function createGrid() {
    
    grid = [];

    let cell, marginX, marginY;
    
    // // portrait 
    
    // if ((width - margin * 2) * grid_rows / grid_cols < height - margin * 2) {
    //     cell = (width - margin * 2) / grid_cols;
    //     marginX = margin;
    //     marginY = (height - cell * grid_rows) / 2;
    // }

    // // landscape

    // else {
    //     cell = (height - margin * 2) / grid_rows;
    //     marginY = margin;
    //     marginX = (width - cell * grid_cols) / 2;


    cell = (height - margin * 2) / grid_rows;
    // margen en y
    marginY = margin;
    // margen en x
    marginX = (width - cell * grid_cols) / 2;
    
    
    // llenar el grid
    for( let i = 0; i < grid_rows; i++){
        grid[i] = [];
        for( let j = 0; j < grid_cols; j++){
            let left = marginX + j * cell;
            let top = marginY + i * cell;
            grid[i][j] = new Cell(left,top,cell,cell,i,j)
        }
    }
}






function checkWin(row,col){
    // obtiene todas las celdas en todas las direcciones
    let diagLeft = [];
    let diagRight = [];
    let horiz = [];
    let vert = [];
    
    for(let i = 0; i < grid_rows; i++){
        for(let j = 0; j < grid_cols; j++){
            // celdas horizontales
            if(i == row){
                horiz.push(grid[i][j]);
            }
            // celdas verticales
            if(j == col){
                vert.push(grid[i][j]);
            }
            // celdas diagonal izquierda derechas
            if(i - j == row - col){
                diagLeft.push(grid[i][j]);
            }
            // celdas diagonal derecha izquierda
            if(i + j == row + col){
                diagRight.push(grid[i][j]);
            }
        }
    }

    // si alguno cumple retorna ganador
    return connect4(diagLeft) || connect4(diagRight) || connect4(vert) || connect4(horiz);

}

function connect4(cells = []){
    let count = 0;
    let lastOwner = null;
    let winningCells = [];

    for(let i = 0; i < cells.length; i++){
        // si la casilla esta vacia
        if (cells[i].owner == null){
            count = 0;
            winningCells = [];
        }
        // mismo player, sumamos al count
        else if (cells[i].owner == lastOwner){
            count++;
            winningCells.push(cells[i]);
        }
        // nuevo player, nuevo count
        else{
            count=1;
            winningCells = [];
            winningCells.push(cells[i]);
        }

        // setear el ultimo owner
        lastOwner = cells[i].owner;
        if (count == connect_number) {
            for(let cell of winningCells) {
                cell.winner = true;
            }
            return true;
        }
    }
    return false;
} 

