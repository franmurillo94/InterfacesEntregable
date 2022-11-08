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
let pieces = [];


//colores

let color_background = "mintcream";
let color_frame = "blue";
let color_player1 = "red";
let color_player2 = "green";

//addEventListener
canvas.addEventListener('mousemove', highlightGrid);
canvas.addEventListener("mouseup", click);


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
        this.highlight = null;
    }

    contains(x, y){
        return x > this.left && x < this.right && y > 0 && y < margin;
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


        if(this.highlight != null){
            //color
            color = this.winner ? COLOR_WIN : this.highlight ? color_player1 : color_player2;

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.cx,this.cy,this.r,0,Math.PI * 2);
            ctx.fill();
        }
        
    }
}


class Triangle{
    constructor(left, w){
        this.left = left;
        this.w = w;
        this.cx = left + w/2;
        this.margin = margin;

    }

   

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.moveTo(this.cx , margin - 1);
        ctx.lineTo(this.cx + 20, 1);
        ctx.lineTo(this.cx - 20, 1);
        ctx.lineTo(this.cx , margin -1)
        ctx.stroke();
        ctx.fill();
    }
}
        

function highlightCell(x, y) {
    let col = null;
    for (let row of grid) {
        for (let cell of row) {

            // clear existing highlighting
            cell.highlight = null;

            // get the column
            if (cell.contains(x, y)) {
                col = cell.col;
                console.log(col);
            }
        }
    }

    if (col == null) {
        return;
    }

    // highlight the first unoccupied cell
    for (let i = grid_rows - 1; i >= 0; i--) {
        if (grid[i][col].owner == null) {
            grid[i][col].highlight = playersTurn;
            return grid[i][col];
        }
    }
    return null;
}

function highlightGrid(ev) {
    if (!playersTurn || gameOver) {
       goPlayer2;
    }
    highlightCell(ev.offsetX, ev.offsetY);
}
    

class Piece {
    constructor(x,y,r,color){
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        //console.log("draw por piece");
    }

    clickCircle(xmouse,ymouse){
        let distance = 
        Math.sqrt(
            ( ( xmouse - this.x ) * ( xmouse - this.x ) ) 
            +
            ( ( ymouse - this.y ) * ( ymouse - this.y ) )
            );
            if (distance < this.r) {
                return true;
            } else {
                return false;
            }
    }
}


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

    for(let triangulitos of triangulo){
        triangulitos.draw(ctx);
    }
}

function createGrid() {
    
    grid = [];

    let cell, marginX, marginY;
    
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
            grid[i][j] = new Cell(left,top,cell,cell,i,j);
            
        }
    }


    //hacer los triangulos
    for(let t=0; t<grid_cols; t++){
        let left = marginX + t * cell;
        triangulo[t] = new Triangle(left, cell);
    }
    
}

function goPlayer2(){
    if(!playersTurn || gameOver){
        return;
    }


    if(click){
        playersTurn = true;
        console.log('turno del jugador 2');
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

function random_player1_x(){
    
    let random = 0;
    let margin = Math.floor(marginX);
    let widd = Math.floor(wid);
    while(random < widd || random > margin-widd){
        random = Math.floor(Math.random()* marginX - 1);
    }
    return random;
}
function random_player_y(){
    
    let random = 0;
    let widd = Math.floor(wid);
    while(random < widd || random > height-widd){
        random = Math.floor(Math.random()* height - 1);
    }
    
    return random;
}

function random_player2_x(){

    let random = 0;
    let margin = Math.floor(marginX + (cell_dim*grid_cols));

    while(random < margin + wid || random > width-wid){
        random =Math.floor(Math.random()* width);
    }
    return random;
}

function create_pieces() {
    
    for(let i = 0; i<29;i++){
        if(i % 2 == 0){
            pieces.push(new Piece(random_player1_x(),random_player_y(),wid,color_player1));
        }
        else{
            pieces.push(new Piece(random_player2_x(),random_player_y(),wid,color_player2));
        }
        //console.log("crate pieces");
    } 
}

function draw_pieces() {
    //console.log("draw pieces");
    for(let piece of pieces){
       // console.log("draw pieces for");
       piece.draw();
    }
}





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
        console.log(piece.clickCircle(x,y));
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
        console.log(dx + '  ' + dy);

        let current_piece = pieces[current_piece_index];

        //console.log(current_piece_index);
        console.log(current_piece.x + "   " + current_piece.y);
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





