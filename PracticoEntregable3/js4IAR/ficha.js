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