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