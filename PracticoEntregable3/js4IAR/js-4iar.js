// DESPLEGAR MENU HAMBURGUESA
document.addEventListener('DOMContentLoaded', Load);
let menu = document.querySelector(".menu");
let hamburguer = document.querySelector(".menu-h");

menu.addEventListener('click', () => {
    console.log("hola gil");
    hamburguer.classList.toggle('menu-h-show');
});

// DESPLEGAR MENU SHARE
let share = document.querySelector(".share");
let menu_share = document.querySelector(".menu-share");

share.addEventListener('click', () => {
    console.log("hola gil");
    menu_share.classList.toggle('menu-share-show');
});

//PRELOADER

let load_container = document.getElementById("load_container");

setTimeout(function(){
    load_container.classList.add('close_load');
}, 5000);

let load_cont = 0;
let load_number = document.getElementById("load_number");

setInterval(()=>{
if(load_cont==100){
    clearInterval();
} else {
    load_cont += 1;
    load_number.textContent = load_cont + "%";
}
},40);







//JS DEL JUEGO
let boton_play = document.querySelector(".boton-play");
let gameplay = document.querySelector(".gameplay");
boton_play.addEventListener('click', () => {
    console.log("hola gil");
    boton_play.style.display = 'none';
    gameplay.style.filter = 'blur(0)';
    jugar();
})



const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1270;
canvas.height = 400;
//let img_p1 = document.querySelector(".img_p1");

const FILAS = 6;
const COLS = 7;
const COLOR0 = "white";
const COLOR_HUMANO = "red";
const COLOR_IA = "yellow";
const OBJETIVO = 10;		//Jugamos a 10 puntos

//Variables Globales
var svg = null;
var turno = COLOR_HUMANO;	//Cambiará de COLOR
var tablero;			//Un array de colores (por columnas) de 7 arrays de 6 posiciones.
var vistaTablero;		//Un array de circles (por columnas) de 7 arrays de 6 posiciones.
var puntos = [0,0];		//Puntos de la partida [Humano, IA]
var pResultado;			//Elemento HTML con la información del resultado de la partida
var mensaje; 			//Texto del mensaje ganar/perder
var nivel = 5;			//Nivel de juego
var pausa = false;		//Indica si el juego está en pausa
var contadorMovimientos = 0;
var rMargenY = 0;
var rAltura = 515;


function Load(){
    class Juego{
        constructor(ancho, alto){
            this.ancho = ancho;
            this.alto = alto;
            this.tablero = new Tablero(this);
            this.circle = new Circle(this);
            //this.fichas_P1 = new Fichas_P1(this);
        }
    
        render(context){
            this.tablero.draw(context);
            this.circle.draw(context);
            //this.fichas_P1.draw(context);
        }
    }
    
    class Circle{
        constructor(juegardo){
            this.juegardo = juegardo;
            this.arco = 30;
            this.centro = 0;
            this.redondo = 2*Math.PI;
        }
    
        draw(ctx){
    
        /*tablero = new Array(FILAS);
        vistaTablero = new Array(FILAS);
        for(let i = 0; i < FILAS; i++){
            tablero[i] = new Array(COLS);
            vistaTablero[i] = new Array(COLS);
        }*/
        
        //<circle cx="" cy="" r="40" />
        for(let i = 0; i < FILAS; i++){
            for (let j = 0; j < COLS; j++){
                var cy = 7 + rMargenY + this.arco+ (2*this.arco+5)*i;
                var cx = 406 + 0 + this.arco + (2*this.arco+5)*j;
                /*c.setAttribute('cx', cx);
                c.setAttribute('cy', cy);
                c.setAttribute('r', 40);
                c.style.fill = COLOR0;
                vistaTablero[i][j] = c;
                tablero[i][j] = COLOR0;*/
                ctx.beginPath();
                ctx.fillStyle = COLOR0;
                ctx.arc(cx, cy, this.arco, this.centro, this.redondo);
                ctx.stroke();
                ctx.fill();
    
            }
        }
        
        }
    
            
    }
    
    
    class Tablero{
        constructor(juegardo){
            this.juegardo = juegardo;
            this.ancho = 465;
            this.alto = 400;
        }
    
        draw(ctx){
            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.fillRect(400,0,this.ancho,this.alto);
        }
    }
    
    
    const juegardo = new Juego(canvas.width, canvas.height);
    juegardo.render(ctx); 
}


function jugar(){

    console.log("dj jaime");
    

    class Juego{
        constructor(ancho, alto){
            this.ancho = ancho;
            this.alto = alto;
            this.tablero = new Tablero(this);
            this.circle = new Circle(this);
            this.fichas_P1 = new Fichas_P1(this);
        }
    
        render(context){
            this.tablero.draw(context);
            this.circle.draw(context);
            this.fichas_P1.draw(context);
        }
    }
    
    class Circle{
        constructor(juegardo){
            this.juegardo = juegardo;
            this.arco = 30;
            this.centro = 0;
            this.redondo = 2*Math.PI;
        }
    
        draw(ctx){
    
        /*tablero = new Array(FILAS);
        vistaTablero = new Array(FILAS);
        for(let i = 0; i < FILAS; i++){
            tablero[i] = new Array(COLS);
            vistaTablero[i] = new Array(COLS);
        }*/
        
        //<circle cx="" cy="" r="40" />
        for(let i = 0; i < FILAS; i++){
            for (let j = 0; j < COLS; j++){
                var cy = 7 + rMargenY + this.arco+ (2*this.arco+5)*i;
                var cx = 406 + 0 + this.arco + (2*this.arco+5)*j;
                /*c.setAttribute('cx', cx);
                c.setAttribute('cy', cy);
                c.setAttribute('r', 40);
                c.style.fill = COLOR0;
                vistaTablero[i][j] = c;
                tablero[i][j] = COLOR0;*/
                ctx.beginPath();
                ctx.fillStyle = COLOR0;
                ctx.arc(cx, cy, this.arco, this.centro, this.redondo);
                ctx.stroke();
                ctx.fill();
    
            }
        }
        
        }
    
            
    }
    
    
    class Tablero{
        constructor(juegardo){
            this.juegardo = juegardo;
            this.ancho = 465;
            this.alto = 400;
        }
    
        draw(ctx){
            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.fillRect(400,0,this.ancho,this.alto);
        }
    }

    class Fichas_P1{
        constructor(juegardo){
            this.juegardo = juegardo;
            this.arco = 30;
            this.centro = 0;
            this.redondo = 2*Math.PI;
        }
    
        draw(ctx){
           
      
                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.arc(Math.floor(Math.random() * 300) - Math.floor(Math.random() * 50), Math.floor(Math.random() * 300) - Math.floor(Math.random() * 80),this.arco, this.centro, this.redondo);
                ctx.stroke();
                ctx.fill();
            
    
        }
    }
    
    
    const juegardo = new Juego(canvas.width, canvas.height);
    juegardo.render(ctx); 
}