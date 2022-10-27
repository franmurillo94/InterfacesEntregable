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
        ctx.arc(100, 120,this.arco, this.centro, this.redondo);
        ctx.stroke();
        ctx.fill();
    }
}