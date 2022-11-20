// clase cell crea una unidad del tablero
class Cell { 
    constructor (left, top, w, h, row, col) {
        this.bot = top + h;             // coordenada en x del borde inferior de la celda
        this.left = left;               // coordenada en y del borde izquierdo de la celda    
        this.right = left + w;          // coordenada en y del borde derecho de la celda
        this.top = top;                 // coordenada en x del borde superior de la celda            
        this.w = w;                     // ancho
        this.h = h;                     // alto
        this.row = row;                 // numero de fila
        this.col = col;                 // numero de columna
        this.cx = left + w/2;           // centro en x en la celda
        this.cy = top + h/2;            // centro en y de la celda 
        this.r = w * grid_circle/2;     // 
        this.owner = null;              // si esta ocupada la celda (null si esta vacia| true y false por player)
        this.winner = false;            
        this.highlight = null;
        this.piece;                     // ficha colocada en la celda
    }

    // funcion dibujar celda
    draw(ctx){                             
        let color;
        
        if(this.owner == null){
            // si la celda esta vacia crea la arco de la ficha del y genera la circunferencia con opacidad
            color = 'rgba(0,0,0,0.4)';
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.cx,this.cy,this.r,0,Math.PI * 2);
            ctx.fill();
            
        }else{
            // si la celda esta ocupada accede al atributo ficha, le setea la coordinada del centro de la celda y la dibuja
            this.piece.setCoords(this.cx,this.cy);
            this.piece.draw(ctx);
        }
        
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
    // chequea que las coordenadas que recibe esten dentro de la columna indicada
    contains(x, y){
        return x > this.left && x < this.right && y > 0 && y < margin;
    }
    // recibe pieza por parametro
    setPiece(piece){
        this.piece = piece;
    }
}


class Triangle{
    constructor(left, w){
        this.left = left;
        this.w = w;
        this.cx = left + w/2;
        this.margin = margin;
        
    }
    // dibuja triangulo
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


// crea la grilla de celdas
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

// dibuja el tablero celda por celda
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
       //goPlayer2;
    }
    highlightCell(ev.offsetX, ev.offsetY);
}



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
          
                console.log('gano alguien');
                cell.winner = true;
            }
            return true;
        }
    }
    return false;
} 


// !! very important !!
function selectCell(piece) {
    let highlighting = false;   
    // recorre el tablero para saber donde donde va a ir la ficha
    // le da al casillero a que player pertenece (si es null esta vacia)
    // le pasa al casillero la ficha que se coloca
    // despues chequea si hay ganador
    OUTER: for (let row of grid) {
        for (let cell of row) {
            if (cell.highlight != null) {
                highlighting = true;
                cell.highlight = null;
                cell.owner = playersTurn;
                cell.setPiece(piece);
                if (checkWin(cell.row, cell.col)) {
                    gameOver = true;
                }
                break OUTER;
            }
        }
    }

    // si no hay hover en las columnas corta la funcion aca
    if (!highlighting) {
        return;
    }

    // si el juego no termino chequea si esta empatado
    if (!gameOver) {
        gameTied = true;    // setea true al comienzo si no entra en el if de abajo es que no quedan mas celdas vacias
        OUTER: for (let row of grid) {
            for (let cell of row) {
                if (cell.owner == null) {
                    gameTied = false;
                    break OUTER;
                }
            }
        }

        // si el juego esta empatado y ya no hay lugares da el juego por terminado
        if (gameTied) {
            ctx.fillText('Empate', width / 2, height / 2 + offset);
            gameOver = true;
        }
    }

    // cambia el player si no hay gameover
    if (!gameOver) {
        playersTurn = !playersTurn;
        segundos = 20;
    }
}

