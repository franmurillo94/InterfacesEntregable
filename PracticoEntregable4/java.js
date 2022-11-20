
//Variables del canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ancho = canvas.width;
let alto = canvas.height;


//Crear tablero
/*ctx.fillStyle = 'green';
ctx.beginPath();
ctx.fillRect(0,0,ancho,alto);
ctx.stroke();
ctx.fill();
    
const FILAS = 6;
const COLS = 7;
const SVG_NS = "http://www.w3.org/2000/svg";
const COLOR0 = "white";
const COLOR_HUMANO = "yellow";
const COLOR_IA = "red";
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
var rMargenY = 50;
var rAltura = 515;

//TODO: Poda alfa-beta
//Guardamos el valor mínimo (alfa, si es MIN(juega Humano)) o máximo (beta, si es MAX(juega IA)) de cada nivel.
//Si en al analizar una jugada de HUMANO, una opción no es inferior al mínimo...

function preparar(){
	svg = document.getElementById("svg");
	pResultado = document.getElementById("pResultado");
	mensaje = document.getElementById("spanResultado");
	
	/*
		Son 6 filas y 7 columnas.
		Cada posición con radio 40 y margen 5
		Ancho: 7*(40*2 + 5) + 5 de margen al final = 600
		Alto:  6*(40*2 + 5) + 5 de margen al final = 600
	*/
    
	
	//<rect x="0" y="0" rx="20" ry="20" width="600" height="515" />
	/*r = document.createElementNS(SVG_NS,"rect");
	r.setAttribute('x', 0);
    r.setAttribute('y', rMargenY);	//margen superior para las flechas
	r.setAttribute('rx', 20);
	r.setAttribute('ry', 20);
	r.setAttribute('width', 600);
	r.setAttribute('height', 515);
	svg.appendChild(r);
	
	mostrarPuntos();
	
	document.getElementById("btnSiguiente").addEventListener("click", iniciarPartida);
	
	iniciarPartida();
}

function iniciarPartida(){
	
	pResultado.style.visibility = 'hidden';
	pausa = false;
	
	//Inicializamos los arrays
	tablero = new Array(FILAS);
	vistaTablero = new Array(FILAS);
	for(let i = 0; i < FILAS; i++){
		tablero[i] = new Array(COLS);
		vistaTablero[i] = new Array(COLS);
	}
	
	//<circle cx="" cy="" r="40" />
	var cRadio = 40;
	for(var i = 0; i < FILAS; i++){
		for (var j = 0; j < COLS; j++){
			var cy = 5 + rMargenY + cRadio + (2*cRadio+5)*i;
			var cx = 5 + 0 + cRadio + (2*cRadio+5)*j;
			c = document.createElementNS(SVG_NS,"circle");
			//c.id = 
			c.setAttribute('cx', cx);
			c.setAttribute('cy', cy);
			c.setAttribute('r', 40);
			c.style.fill = COLOR0;
			svg.appendChild(c);
			vistaTablero[i][j] = c;
			tablero[i][j] = COLOR0;
		}
	}
	
	//<polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
	for (var i = 0; i < 7; i++){
		f = document.createElementNS(SVG_NS,"polygon");
		var p1X = 15 + 85*i;
		var p1Y = 15;
		var p2X = p1X + (86 - 15*2);
		var p2Y = p1Y;
		var p3X = p1X + (p2X - p1X) / 2;
		var p3Y = 40;
		f.setAttribute("points", p1X + "," + p1Y + " " + p2X + "," + p2Y + " " + p3X + "," + p3Y);
		f.setAttribute("data-col", i);
		svg.append(f);
		
		f.addEventListener("mouseover", cambiarColorFlecha);
		f.addEventListener("mouseout", borrarColorFlecha);
		f.addEventListener("click", clickColumna);
	}
	
	if (turno == COLOR_IA)
		jugarMaquina();
}



















ctx.fillStyle = 'red';
ctx.beginPath();
//ctx.arc(12,12,10,0,2*Math.PI);
ctx.fillRect(puntoInicioX,puntoInicioY,10,10);
ctx.stroke();
ctx.fill();

/*for(let index = 0; index <= 20; index++){
    ctx.fillStyle = colorRandom();
    ctx.beginPath();
    ctx.arc(Math.floor(Math.random() * ancho), Math.floor(Math.random() * alto), Math.floor(Math.random() * 20), 0, 2*Math.PI);
    ctx.fillRect(Math.floor(Math.random() * ancho), Math.floor(Math.random() * alto), Math.floor(Math.random() * 100), Math.floor(Math.random() * 50));
    ctx.stroke();
    ctx.fill();

}*/

										
											/*let objetoActual = null;

											var fichas = [];
											var inicioX = 0;
											var inicioY = 0;

											function actualizar(){
												ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
												for(let i=0; i<fichas.length; i++){
													ctx.fillStyle = fichas[i].color;
													ctx.beginPath();
													ctx.arc(fichas[i].x,fichas[i].y,fichas[i].radio,fichas[i].centro,fichas[i].circulo);
													ctx.stroke();
													ctx.fill();
												}
											}




											console.log(fichas);
											function dibujarFicha(){
												for(let i=0; i<5; i++){
													var x = calculoAncho();
													var y = calculoAlto();
													var radio = 40;
													var centro = 0;
													var circulo = 2*Math.PI;	


													ctx.fillStyle = 'green';
													ctx.beginPath();
													let ficha = ctx.arc(x,y,radio,centro,circulo);
													ctx.stroke();
													ctx.fill();

													fichas.push({x,y,radio,centro,circulo});
												}
												var color = 'green'
												var x = calculoAncho();
												var y = calculoAlto();
												var radio = 40;
												var centro = 0;
												var circulo = 2*Math.PI;

												ctx.fillStyle = color;
												ctx.beginPath();
												ctx.arc(x,y,radio,centro,circulo,color);
												ctx.stroke();
												ctx.fill();
												
												fichas.push({x,y,radio,centro,circulo,color});


											}

											canvas.onmousedown = function(event){
												console.log("AQN");
												for(let i=0; i<fichas.length; i++){
													if(fichas[i].x < event.clientX && (fichas[i].radio + fichas[i].x > event.clientX)
														&& fichas[i].y < event.clientY && (fichas[i].radio + fichas[i].y > event.clientY)){
														objetoActual = fichas[i];
														inicioY = event.clientY - fichas[i].y;
														inicioX = event.clientX - fichas[i].x;
														console.log(fichas);
														console.log(fichas[i]);
														break;
														
													}
												}
															
											};

											canvas.onmousemove = function(event){
												if(objetoActual != null){
													objetoActual.x = event.clientX - inicioX;
													objetoActual.y = event.clientY - inicioY;
												}
												actualizar();
											};

											canvas.onmouseup = function(event){
												objetoActual = null;
											};

											function calculoAncho(){
												let x = Math.floor(Math.random()*500);
												if(Math.floor(Math.random() * 500) > 0 && Math.floor(Math.random() * 500) < ancho){
													return `${x}`;
													
												};
											}

											function calculoAlto(){
												let y = Math.floor(Math.random()*100);
												if(Math.floor(Math.random() * 100) > 0 && Math.floor(Math.random() * 100) < alto){
													return `${y}`
												}
											}

											dibujarFicha();
											calculoAncho();
											calculoAlto();*/



											/*class Dibujo(){
												constructor(canvas, ctx){
													this.canvas = canvas;
													this.ctx = ctx;
												}

												render(context){
													this.ficha.draw(ctx);
												}
												
											};

											class Ficha(){
												constructor(fichas){
													this.fichas = fichas;
													this.lastPress = null;
													this.lastRelease = null;
													this.mouse = {x: 0, y: 0};
													this.pointer = {x: 0, y: 0};
													this.dragging = null;
													this.draggables = [];
													this.i = 0;
													this.l = 0;
												}

												draw(ctx){

												}
											}

											const fichas = new Dibujo(canvas.width, canvas.height);
    										juegardo.render(ctx); */




											document.addEventListener('DOMContentLoaded', Load);
											
											function Load() {
												
												var canvas = null,
													ctx = null,
													lastPress = null,
													lastRelease = null,
													mouse = {x: 0, y: 0},
													pointer = {x: 0, y: 0},
													dragging = null,
													draggables = [],
													draggables_P2 = [],
													dragging_P2 = null,
													i = 0,
													l = 0,
													x = 0,
													filas = 6,
													cols = 7,
													color0 = '#fff';
													

												
						
												
												function Circle(x, y, radius) {
													this.x = (x === undefined) ? 0 : x;
													this.y = (y === undefined) ? 0 : y;
													this.radius = (radius === undefined) ? 0 : radius;
												}
												
												Circle.prototype.distance = function (circle) {
													if (circle !== undefined) {
														let dx = this.x - circle.x,
															dy = this.y - circle.y,
															circleRadius = circle.radius || 0;
														return (Math.sqrt(dx * dx + dy * dy) - (this.radius + circleRadius));
													}
												};
												
												Circle.prototype.fill = function (ctx) {
													if (ctx !== undefined) {
														ctx.beginPath();
														ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
														ctx.fill();
													}
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
												
												function paint(ctx) {
													// Clean canvas
													ctx.fillStyle = '#fff';
													ctx.fillRect(0, 0, canvas.width, canvas.height);

													ctx.fillStyle = '#00f'
													ctx.fillRect(400, 0, 465, canvas.height);
													
													// Draw circles
													for(let i = 0; i < 6; i++){
														for (let j = 0; j < 6; j++){
															var cy = 7 + 0 + 30+ (2*30+5)*i;
															var cx = 406 + 0 + 30 + (2*36+5)*j;
															
															ctx.beginPath();
															ctx.fillStyle = 'white';
															ctx.arc(cx, cy, 20, 0,  Math.PI * 2);
															ctx.stroke();
															ctx.fill();
												
														}
													}
													
													ctx.fillStyle = '#f00';
													for (i = 0, l = draggables.length; i < l; i += 1) {
														draggables[i].fill(ctx);
													}

													ctx.fillStyle = '#0f0';
													for (i = 0, l = draggables.length; i < l; i += 1) {
														draggables_P2[i].fill(ctx);
													}
													
													// Debug dragging circle
													ctx.fillStyle = '#fff';
													ctx.fillText('Dragging: ' + dragging, 0, 10);

													ctx.fillStyle = '#fff';
													ctx.fillText('Dragging: ' + dragging_P2, 0, 10);
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
													

													// FICHAS DEL JUGADOR 1
													if (lastPress === 1) {
														// Check for current dragging circle
														for (i = 0, l = draggables.length; i < l; i += 1) {
															if (draggables[i].distance(pointer) < 0) {
																dragging = i;
																console.log(dragging);
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



													// FICHAS DEL JUGADOR 2

													if (lastPress === 1) {
														// Check for current dragging circle
														for (i = 0, l = draggables_P2.length; i < l; i += 1) {
															if (draggables_P2[i].distance(pointer) < 0) {
																dragging_P2 = i;
																console.log(dragging_P2);
																break;
															}
														}
													} else if (lastRelease === 1) {
														// Release current dragging circle
														dragging_P2 = null;
													}
													
													// Move current dragging circle
													if (dragging_P2 !== null) {
														console.log("el boton presionado es el numero: " + dragging_P2);
														draggables_P2[dragging_P2].x = pointer.x;
														draggables_P2[dragging_P2].y = pointer.y;
													}
												}
												
												function run() {
													window.requestAnimationFrame(run);
													act();
													paint(ctx);
													
													lastPress = null;
													lastRelease = null;
												}
												
												function init() {
													// Get canvas and context
													canvas = document.getElementById('myCanvas');
													ctx = canvas.getContext('2d');
													canvas.width = 1270;
													canvas.height = 400;
													
													// Create draggables
													for (i = 0; i < 5; i += 1) {
														draggables.push(new Circle(random(canvas.width/5), random(canvas.height/2), 20));
													}

													// Creo los circulos del tablero
													for (i = 0; i < 5; i += 1) {
														draggables_P2.push(new Circle(random((canvas.width - canvas.width) + 800), random(canvas.height/2), 20));
													}
													
													
													// Start game
													enableInputs();
													run();
												}
												
												
												init();
											}
											










											