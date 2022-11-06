
document.addEventListener('DOMContentLoaded', Load);

//JS DEL JUEGO
let boton_play = document.querySelector(".boton-play");
let gameplay = document.querySelector(".gameplay");
boton_play.addEventListener('click', () => {
    console.log("hola gil");
    boton_play.style.display = 'none';
    gameplay.style.filter = 'blur(0)';
    jugar();
})

let fichas = [];
let objetoActual = null;
let inicioX = 0;
let inicioY = 0;



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
let svg = null;
let turno = COLOR_HUMANO;	//Cambiará de COLOR
let tablero;			//Un array de colores (por columnas) de 7 arrays de 6 posiciones.
let vistaTablero;		//Un array de circles (por columnas) de 7 arrays de 6 posiciones.
let puntos = [0,0];		//Puntos de la partida [Humano, IA]
let pResultado;			//Elemento HTML con la información del resultado de la partida
let mensaje; 			//Texto del mensaje ganar/perder
let nivel = 5;			//Nivel de juego
let pausa = false;		//Indica si el juego está en pausa
let contadorMovimientos = 0;
let rMargenY = 0;
let rAltura = 515;


function Load(){
    class Juego{
        constructor(ancho, alto){
            this.ancho = ancho;
            this.alto = alto;
            this.tablero = new Tablero(this);
            this.circle = new Circle(this);
        }
    
        render(context){
            this.tablero.draw(context);
            this.circle.draw(context);
        }
    }
    
    class Circle{
        constructor(juegardo){
            this.juegardo = juegardo;
            this.radio = 30;
            this.centro = 0;
            this.circulo = 2*Math.PI;
        }
    
        draw(ctx){
        //<circle cx="" cy="" r="40" />
        for(let i = 0; i < FILAS; i++){
            for (let j = 0; j < COLS; j++){
                var cy = 7 + rMargenY + this.radio+ (2*this.radio+5)*i;
                var cx = 406 + 0 + this.radio + (2*this.radio+5)*j;
                /*c.setAttribute('cx', cx);
                c.setAttribute('cy', cy);
                c.setAttribute('r', 40);
                c.style.fill = COLOR0;
                vistaTablero[i][j] = c;
                tablero[i][j] = COLOR0;*/
                ctx.beginPath();
                ctx.fillStyle = COLOR0;
                ctx.arc(cx, cy, this.radio, this.centro, this.circulo);
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
            this.radio= 30;
            this.centro = 0;
            this.circulo = 2*Math.PI;
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
                let cy = 7 + rMargenY + this.radio+ (2*this.radio+5)*i;
                let cx = 406 + 0 + this.radio + (2*this.radio+5)*j;
                /*c.setAttribute('cx', cx);
                c.setAttribute('cy', cy);
                c.setAttribute('r', 40);
                c.style.fill = COLOR0;
                vistaTablero[i][j] = c;
                tablero[i][j] = COLOR0;*/
                ctx.beginPath();
                ctx.fillStyle = COLOR0;
                ctx.arc(cx, cy, this.radio, this.centro, this.circulo);
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
            this.radio = 30;
            this.centro = 0;
            this.circulo = 2*Math.PI;
            this.x = 300;
            this.y = 80;
        }

        draw(ctx){
                cargarFichas();
        }
    }
    
    
    const juegardo = new Juego(canvas.width, canvas.height);
    juegardo.render(ctx); 
}


function cargarFichas() {

    let lastPress = null,
    lastRelease = null,
    mouse = {x: 0, y: 0},
    pointer = {x: 0, y: 0},
    dragging = null,
    draggables = [],
    i = 0,
    l = 0;



    function init() {
        let ancho = 300;
        let alto = 400;
        // Create draggables
        for (i = 0; i < 5; i += 1) {
            draggables.push(new Circle(random(ancho), random(alto/2), 10));
        }
        
        // Start game
        enableInputs();
        run();
    }
    //window.addEventListener('load', init, false);
    
    function run() {
        window.requestAnimationFrame(run);
        act();
        paint(ctx);
        
        lastPress = null;
        lastRelease = null;
    }

    function act() {
        // Set pointer to mouse
        pointer.x = mouse.x;
        pointer.y = mouse.y;
        
        // Limit pointer into canvas
        if (pointer.x < 0) {
            pointer.x = 0;
        }
        if (pointer.x > canvas.width) {
            pointer.x = canvas.width;
        }
        if (pointer.y < 0) {
            pointer.y = 0;
        }
        if (pointer.y > canvas.height) {
            pointer.y = canvas.height;
        }
        
        if (lastPress === 1){
        console.log(lastPress); 
        
            // Check for current dragging circle
            for (i = 0, l = draggables.length; i < l; i += 1) {
                if (draggables[i].distance(pointer) < 0) {
                    dragging = i;
                    break;
                }
            }
        } else if (lastRelease === 1) {
            // Release current dragging circle
            dragging = null;
        }

        // Move current dragging circle
        if (dragging !== null) {
            console.log("el boton presionado es el numero: " + dragging);
            draggables[dragging].x = pointer.x;
            draggables[dragging].y = pointer.y;
        }
    }

    function paint(ctx) {
        // Draw circles
        ctx.fillStyle = '#00f';
        for (i = 0, l = draggables.length; i < l; i += 1) {
            draggables[i].fill(ctx);
        }
        
        
        
        // Debug dragging circle
        ctx.fillStyle = '#000';
        ctx.fillText('Dragging: ' + dragging, 0, 10);
    }




    function Circle(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    Circle.prototype.distance = function (circle) {
            let dx = this.x - circle.x;
            let dy = this.y - circle.y;
            let circleRadius = circle.radius || 0;
            return (Math.sqrt(dx * dx + dy * dy) - (this.radius + circleRadius));
    };
    
    Circle.prototype.fill = function (ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.fill(); 
    };
    
    function enableInputs() {
        document.addEventListener('mousemove', function (evt) {
            mouse.x = evt.pageX - canvas.offsetLeft;
            mouse.y = evt.pageY - canvas.offsetTop;
        }, false);
        
        document.addEventListener('mouseup', function (evt) {
            lastRelease = evt.which;
        }, false);
        
        canvas.addEventListener('mousedown', function (evt) {
            evt.preventDefault();
            lastPress = evt.which;
        }, false);
    }
    
    function random(max) {
        return ~~(Math.random() * max);
    }
    
    
    init();

}




// Logica


// tablero

// fichas 