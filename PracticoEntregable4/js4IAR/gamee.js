"use strict"

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let btn_restart = document.getElementById("btnSiguiente");

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
let img_ficha1;
let img_ficha2;

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
let wid = cell_dim * grid_circle / 2;
let marginX = (width - cell_dim * grid_cols) / 2;
//margin = grid_margin * Math.min(height, width); // se queda queda con el valor minimo


//setDimensions();    

//crea el tablero y las fichas


function newGame(){ 
    playersTurn = true;
    gameOver = false; 
    gameTied = false;


    createGrid(); 

    drawGrid();
    //create_pieces();
    draw_pieces();
    timer();
}

function setDimensions(){ 
    height = 500;                    // window.innerHeight;
    width = 1000;                     // window.innerWidth;

    canvas.height = height;
    canvas.width = width;
    //margin = grid_margin * Math.min(height, width); // se queda queda con el valor minimo

    create_pieces();
    //draw_pieces();
   
    
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
            console.log(img_ficha1);
            fichaj1.push(new Piece(random_player1_x(),random_player_y(),wid,img_ficha1));
        }
        else{
            console.log(img_ficha2);
            fichaj2.push(new Piece(random_player2_x(),random_player_y(),wid,img_ficha2));;
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

function reiniciar(){
    console.log('funciona');
    if(gameOver){
        console.log('se termino el juego');
        btn_restart.addEventListener('click', () => {
            setDimensions;
        })
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
    if(gameOver){
        drawText();
    }

    
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






reiniciar();


let segundos = 20;
let isTimeWinner = false;
let timeWinner;

function timer(){
    let texto = document.getElementById("timer");
    texto.innerHTML = segundos;
    if(segundos==0){
        // console.log("se termino el tiempo");
        // playersTurn = !playersTurn;
        // segundos = 15;
        // timer();
        gameOver = true;
        isTimeWinner = true;
        timeWinner = playersTurn;
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

let btn_play = document.getElementById("btn_play").addEventListener("click",setearJuego);

function getRadioValue(name){
    for (var i = 0; i < document.getElementsByName(name).length; i++){
        if (document.getElementsByName(name)[i].checked){
            return document.getElementsByName(name)[i].value;
        }
    }
}

let mode;
let player1;
let player2;
let imgp1;
let imgp2;

function setearJuego(){
    fichaj1 = [];
    fichaj2 = [];
    ctx.clearRect(0,0,width,height);
    mode = getRadioValue('gm_mode');
    player1 = document.getElementById("player1name").value;
    player2 = document.getElementById("player2name").value;
    imgp1 = getRadioValue("player1_img");
    imgp2 = getRadioValue("player2_img");
    console.log(mode);
    console.log(player1);
    console.log(player2);
    console.log(imgp1);
    console.log(imgp2);

    if(mode=="4mode"){

    } else if(mode=="5mode"){
        grid_cols = 8; 
        grid_rows = 7; 
        connect_number = 5;
    } else if(mode=="6mode"){
        grid_cols = 9; 
        grid_rows = 8; 
        connect_number = 6;
    } else if(mode=="3mode"){
        grid_cols = 6; 
        grid_rows = 5; 
        connect_number = 3;
    }
    else{
    };

    document.getElementById("player1").innerHTML = player1;
    document.getElementById("player2").innerHTML = player2;

    img_ficha1 = imgp1;
    img_ficha2 = imgp2;

    document.getElementById("game_menu").classList.add("hidden");
    setDimensions();
}

function drawText(){
    let size = grid[0][0].h;
    let offset = size * 0.55;
    ctx.fillStyle = 'white';
    ctx.font = 100 + "px dejavu sans mono";
    ctx.lineJoin = "round";
    ctx.lineWidth = 100;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if(isTimeWinner){
        if(playersTurn){
            ctx.fillText(player2 + " wins!", width / 2, height / 2 + offset);
        }
        else{
            ctx.fillText(player1 + " wins!", width / 2, height / 2 + offset);
            drawText();
        }
        return;
    }else{ };
    if(playersTurn){
        ctx.fillText(player1 + " wins!", width / 2, height / 2 + offset);
        
    } else{
        ctx.fillText(player2 + " wins!", width / 2, height / 2 + offset);
        
    }
}

document.getElementById("reset").addEventListener("click",()=>{
    fichaj1 = [];
    fichaj2 = [];
    ctx.clearRect(0,0,width,height);
    setDimensions();});


document.getElementById("menu_gm").addEventListener("click",()=>{
        
    document.getElementById("game_menu").classList.remove("hidden");
});


//DESPLEGAR MENU
let navigation = document.querySelector(".navigation");
let menu = document.querySelector("#menu");
menu.onclick = function (){
    this.classList.toggle('active');
    menu.classList.toggle("openmenu");
    navigation.classList.toggle('active');
}


