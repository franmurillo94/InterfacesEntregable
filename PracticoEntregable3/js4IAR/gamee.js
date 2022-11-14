"use strict"

// document.addEventListener('DOMContentLoaded', () =>{
//     let btn_play = document.querySelector('.boton_play');
//         btn_play.style.display = 'visible';
//         let btn_next_round = document.querySelector('.btn_next_round');
//         btn_next_round.style.display = 'none';
        
        
//         let btn_numbrer_in_a_row = document.querySelectorAll(".btn_numbrer_in_a_row");
//         let btn_jugador1 = document.querySelectorAll(".btn_Jugador_1");
//         let btn_jugador2 = document.querySelectorAll(".btn_Jugador_2");
//         let fichaP1;
//         let fichaP2;
//         let tablero;
//         let juego = null;
    
        
//         let nombre_jugador1 = document.querySelector(".p1_name").value;
//         let nombre_jugador2 = document.querySelector(".p2_name").value;
        
//         btn_numbrer_in_a_row.forEach ( btn=> {
//             btn.addEventListener('click', tipoDeJuego =>{
//                 let modo = Number(btn.value);
//                 pasarTamanioTablero(modo);
//             })
//         }) 
        
//         btn_jugador1.forEach (btn =>{
//             btn.addEventListener('click', elegirImagenP1=>{
//                 let btn1 = Number(btn.value);
//                 fichaP1 = new Piece(null,null,null,null,btn1,null);
//                //fichaP1.crearImagenp1();
                
//             })
//         })
        
//         btn_jugador2.forEach (btn =>{
//             btn.addEventListener('click', elegirImagenP2=>{
//                 let btn2 = Number(btn.value);
//                 fichaP2 = new Piece(null,null,null,null,null,btn2);
//                 //fichaP2.crearImagenp2();
//             })
//         })
        
//         // function elegirImagenP1(btn1){
//         //     switch(btn1){
//         //         case t1:
//         //             this.ImgJ1.src = '../imagenes/Toretto.png';
//         //             console.log('elegiste el primer auto');
//         //             break;
//         //         case t2:
//         //             this.ImgJ1.src = '../imagenes/Toretto2.png';
//         //             break;
//         //         case t3:
//         //             this.ImgJ1.src = '../imagenes/Toretto3.png';
//         //             break;
//         //     }
//         // }
        
//         // function elegirImagenP2(btn2){
//         //     switch(btn2){
//         //         case o1:
//         //             this.ImgJ2.src = '../imagenes/Oconner.png';
//         //             console.log('elegiste el primer auto');
//         //             break;
//         //         case o2:
//         //             this.ImgJ2.src = '../imagenes/Oconner2.png';
//         //             break;
//         //         case o3:
//         //             this.ImgJ2.src = '../imagenes/Oconner3.png';
//         //             break;
//         //     }
//         // }
        
//         function pasarTamanioTablero(modo){
//             switch(modo){
//                 case 4:
//                     grid_cols = 7; // cantidad de columnas
//                     grid_rows = 6;
//                     connect_number = 4;
//                     console.log('se va a jugar 4 en linea');
//                     break;
//                 case 5:
//                     grid_cols = 8; // cantidad de columnas
//                     grid_rows = 7;
//                     connect_number = 5;
//                     console.log('se va a jugar 5 en linea');
//                     break;
//                 case 6:
//                     grid_cols = 9; // cantidad de columnas
//                     grid_rows = 8;
//                     connect_number = 6;
//                     console.log('se va a jugar 6 en linea');
//                     break;
//                 case 7:
//                     grid_cols = 10; // cantidad de columnas
//                     grid_rows = 9;
//                     connect_number = 7;
//                     console.log('se va a jugar 7 en linea');
//                     break;
//             }
        
//         }
        
    
//         btn_play.addEventListener("click", () =>{
//             btn_play.style.display = 'none';
//             btn_next_round.style.display = 'visible';
//             pasarTamanioTablero(modo);
//             nombre_jugador1;
//             nombre_jugador2;
//             fichaP1;
//             fichaP2;
//             setDimensions();
//             juego = new Game(grid_cols, grid_rows, connect_number,nombre_jugador1,nombre_jugador2,fichaP1, fichaP2);
//         })
    
//     })





let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// parametros del juego
let grid_cols = 7; // cantidad de columnas
let grid_rows = 6; // cantidad de filas
let grid_circle = 0.7; // tamanio del circulo en proporcion a la celda
let grid_margin = 0.07; // margin como una fraccion de la dimension mas pequenia de la pantalla
let connect_number = 4; // numero de chequeo de casillas conectadas

// variables del juego 
let triangulo = [];
let grid = [];
let gameOver;
let playersTurn;
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

// dimensions
let height = 500;
let width = 1000;
let margin = 20;
let cell_dim = (height - margin * 2) / grid_rows;
let wid = (cell_dim * grid_circle/2);
let marginX = (width - cell_dim * grid_cols) / 2;
//margin = grid_margin * Math.min(height, width); // se queda queda con el valor minimo


setDimensions();    

//crea el tablero y las fichas


function newGame(){ 
    playersTurn = true;
    gameOver = false; 
    gameTied = false;


    createGrid(); 

    drawGrid();
   

}

function setDimensions(){ 
    height = 500;                    // window.innerHeight;
    width = 1000;                     // window.innerWidth;

    canvas.height = height;
    canvas.width = width;
    //margin = grid_margin * Math.min(height, width); // se queda queda con el valor minimo

    create_pieces();
    draw_pieces();
    
    newGame();
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
    //console.log(draw_pieces);
    fichaj1.forEach(e=>e.draw(ctx));
    fichaj2.forEach(e=>e.draw(ctx));
}


function goPlayer2(){
    if(!playersTurn || gameOver){
        return;
    }


    if(click){
        playersTurn = true;
    }
}



function click(ev) {

    if (gameOver) {
        return;
    }

    if (!playersTurn) {
        goPlayer2();
    }
    if(current_piece!=null){
        selectCell(current_piece);
        current_piece=null;
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
    
    let index = 0;

    if(playersTurn){
        for (let piece of fichaj1){
            //console.log(piece.clickCircle(x,y));
                if(piece.clickCircle(x,y)){
                    current_piece_index = index;
                    //console.log(current_piece_index);
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
                    //console.log(current_piece_index);
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
    ctx.clearRect(0,0,width,height);
    drawGrid();
    draw_pieces();

    
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
};
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmousemove = mouse_move;








let segundos = 10;

function timer(){
    let texto = document.getElementById("timer");
    texto.innerHTML = segundos;
    if(segundos==0){
        console.log("se termino el tiempo");
    }
    else if(segundos<=3){
        texto.style.color = "red";
        segundos--;
        setTimeout("timer()",1000)
    }
    else{
        segundos--;
        setTimeout("timer()",1000);
    }
};

window.onload = timer();


