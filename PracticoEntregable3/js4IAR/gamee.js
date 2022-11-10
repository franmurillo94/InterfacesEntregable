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
let triangulo = [];
let grid = [];
let gameOver;
let playersTurn;
let player_2_Turn;
let gameTied;



//colores
let color_background = "mintcream";
let color_frame = "blue";



//addEventListener
canvas.addEventListener('mousemove', highlightGrid);
canvas.addEventListener("mouseup", click);


// gameloop
let timeDelta, timeLast;
requestAnimationFrame(loop);


        


// dimensions
let height = 500;
let width = 1000;
let margin = 20;
let cell_dim = (height - margin * 2) / grid_rows;
let wid = (cell_dim * grid_circle/2);
let marginX = (width - cell_dim * grid_cols) / 2;
//margin = grid_margin * Math.min(height, width); // se queda queda con el valor minimo
setDimensions();
// window.addEventListener("resize", setDimensions);



function newGame(){ 
    playersTurn = true;
    player_2_Turn = false;
    gameOver = false; 
    gameTied = false;

    createGrid(); 
    create_pieces();
}

function selectCell() {
    let highlighting = false;   
    OUTER: for (let row of grid) {
        for (let cell of row) {
            if (cell.highlight != null) {
                highlighting = true;
                cell.highlight = null;
                cell.owner = playersTurn;
                if (checkWin(cell.row, cell.col)) {
                    gameOver = true;
                }
                break OUTER;
            }
        }
    }

    // don't allow selection if no highlighting
    if (!highlighting) {
        return;
    }

    // check for a tied game
    if (!gameOver) {
        gameTied = true;
        OUTER: for (let row of grid) {
            for (let cell of row) {
                if (cell.owner == null) {
                    gameTied = false;
                    break OUTER;
                }
            }
        }

        // set game over
        if (gameTied) {
            gameOver = true;
        }
    }

    // switch the player if no game over
    if (!gameOver) {
        playersTurn = !playersTurn;
    }
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
goPlayer2();

// draw
drawBackground();
drawGrid();
draw_pieces();
// drawText();

// call the next frame 
requestAnimationFrame(loop);
}


function drawBackground(){
    //console.log("dibujo background");
    ctx.fillStyle = color_background;
    ctx.fillRect(0,0,width,height);
}


function goPlayer2(){
    if(!playersTurn || gameOver){
        return;
    }


    if(click){
        playersTurn = true;
        //console.log('turno del jugador 2');
        player_2_Turn = false;
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

function click(ev) {

    if (gameOver) {
        newGame();
        return;
    }

    if (!playersTurn) {
        goPlayer2();
    }

    selectCell();
}




/// va en ficha
let current_piece_index = null;
let is_dragging = false; 
let x;
let y;



let mouse_down = function(event){
    event.preventDefault();
    //console.log(event);
    
    let rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;

    let index = 0;

    for (let piece of pieces){
        //console.log(piece.clickCircle(x,y));
            if(piece.clickCircle(x,y)){
                current_piece_index = index;
                is_dragging = true;
                return;
            }
       
        index++;
    }
}
let mouse_up = function(event) {
    if(!is_dragging){
        return;
    }
    event.preventDefault();
    is_dragging = false;
}
let mouse_out = function(event) {
    if(!is_dragging){
        return;
    }
    event.preventDefault();
    is_dragging = false;
}

let mouse_move = function(event) {
    if(!is_dragging){
        return;
    } else {
        //console.log('draggueandoooooo');
        event.preventDefault();

        let rect = canvas.getBoundingClientRect();
        let _x = event.clientX - rect.left;
        let _y = event.clientY - rect.top;

        let dx = _x - x;
        let dy = _y - y; 
        //console.log(dx + '  ' + dy);

        let current_piece = pieces[current_piece_index];

        //console.log(current_piece_index);
        //console.log(current_piece.x + "   " + current_piece.y);
        current_piece.x += dx;
        current_piece.y += dy;

        x = _x;
        y = _y;
        //console.log(current_piece.x + "   " + current_piece.y);

    }

}
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;





