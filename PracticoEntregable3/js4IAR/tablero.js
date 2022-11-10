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
        this.pieces;
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

            ctx.lineWidth = this.r / 7;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(this.cx,this.cy,this.r,0,Math.PI * 2);
            ctx.fill();
            ctx.stroke();
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////   DIBUJA GRID      ////   
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawGrid(){
    
    //console.log("dibujo grid");
    
    let cell = grid[0][0];
    let fh = cell.h * grid_rows;
    let fw = cell.w * grid_cols;
    //console.log("fh = " + fh + " | fw = " + fw + " | cell.top = " + cell.left + " | cell.left = " + cell.top);
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////   CREA GRID      ////   
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////    PINTA CELDA DONDE SE VA A COLOCAR LA FICHA      ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


function highlightCell(x, y) {
    let col = null;
    for (let row of grid) {
        for (let cell of row) {

            // clear existing highlighting
            cell.highlight = null;

            // get the column
            if (cell.contains(x, y)) {
                col = cell.col;
                //console.log(col);
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
    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////    CHEQUEA SI HAY GANADOR DE LAS 4 MANERAS POSIBLES -------> SI LO HAY DEVUELVE TRUE SINO FALSE      ////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////  ITERA ARREGLO DE CELDAS A VER SI HAY GANADOR ---------> DEVUELVE TRUE O FALSE      //////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

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