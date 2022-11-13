"use strict"

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");



class Game {
    constructor(cols,rows,connect_number){
        this.cols = cols;
        this.rows = rows;
        this.cols = connect_number;
        this.tablero;
        this.player1;
        this.player2;
        this.fichas;
        this.fichas1;
        this.fichas2;
        this.turno;
        this.gameOver;
    }

    // setters
    set_player1(nombre){  this.player1 = nombre; }
    set_player2(nombre){  this.player2 = nombre; }
    set_filas(cant_filas){  this.rows = cant_filas; }
    set_columnas(cant_columnas){  this.cols = cant_columnas; }
    set_connect_number(connect_number){  this.connect_number = connect_number; }
    

    drawTablero(){

    }
    drawFichas(){

    }
    newGame(){

    }
    restartGame(){

    }

}


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
let fichaj1 = [];
let fichaj2 = [];


let x;
let y;
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


function setDimensions(){ 
    height = 500;                    // window.innerHeight;
    width = 1000;                     // window.innerWidth;

    canvas.height = height;
    canvas.width = width;
    //margin = grid_margin * Math.min(height, width); // se queda queda con el valor minimo
    newGame();
}



function loop(timeNow){


//goPlayer2();

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

function create_pieces() {
    for(let i = 0; i<29;i++){
        if(i % 2 == 0){
            fichaj1.push(new Piece(random_player1_x(),random_player_y(),wid,true));
        }
        else{
            fichaj2.push(new Piece(random_player2_x(),random_player_y(),wid,false));;
        }
        //console.log("crate pieces");
    } 
}

function draw_pieces() {
    fichaj1.forEach(e=>e.draw(ctx));
    fichaj2.forEach(e=>e.draw(ctx));
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

function click(ev) {

    if (gameOver) {
        newGame();
        return;
    }

    if (!playersTurn) {
        goPlayer2();
    }
    if(current_piece!=null){
        selectCell(current_piece);
    } 

}

let current_piece_index = null;
let is_dragging = false; 
let current_piece = null;


let mouse_down = function(event){
    event.preventDefault();
    
    let rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    
    // if(playersTurn){
    //     fichaj1.forEach(f=>f.clickCircle(x,y));
        
    // }else{
    //     fichaj2.forEach(f=>f.clickCircle(x,y));
    // }
 
    let index = 0;

    if(playersTurn){
        for (let piece of fichaj1){
            //console.log(piece.clickCircle(x,y));
                if(piece.clickCircle(x,y)){
                    current_piece_index = index;
                    console.log(current_piece_index);
                    is_dragging = true;
                    current_piece = fichaj1[current_piece_index];
                    return;
                }
           
            index++;
        }
        index = 0;
    } 
    else{

        for (let piece of fichaj2){
            //console.log(piece.clickCircle(x,y));
                if(piece.clickCircle(x,y)){
                    current_piece_index = index;
                    console.log(current_piece_index);
                    is_dragging = true;
                    current_piece = fichaj2[current_piece_index];
                    return;
                }
           
            index++;
        }
    }
    



    // if(playersTurn){
    //     fichaj1.current_piece_index;
    //     console.log('se selecciono la ficha ' + current_piece_index);
    // } else {
    //     fichaj2.current_piece_index;
    //     console.log('se selecciono la ficha ' + current_piece_index);
    // }
}


let mouse_up = function(event) {
    //  fichaj1.forEach(f=>grid.colocar(f));
    //  fichaj2.forEach(f=>grid.colocar(f)); 


    // if(playersTurn){
    //     fichaj1.forEach(f=>f.soltarFicha());
    // }else{
    //     fichaj2.forEach(f=>f.soltarFicha());
    // }
    // event.preventDefault();

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

   
        // fichaj1.forEach(f=>f.moverFicha(dx,dy,_x,_y));
        // fichaj2.forEach(f=>f.moverFicha(dx,dy,_x,_y));
    


        //console.log(current_piece_index);
        //console.log(current_piece.x + "   " + current_piece.y);
        current_piece.x += dx;
        current_piece.y += dy;

        x = _x;
        y = _y;
    };
        //console.log(current_piece.x + "   " + current_piece.y);
}
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmousemove = mouse_move;




