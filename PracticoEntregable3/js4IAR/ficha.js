let color_player1 = "red";
let color_player2 = "yellow";



class Piece {
    constructor(x,y,r,id,btn1,btn2){
        this.startX = x;                                        // posicion inicial en x de la ficha 
        this.startY = y;                                        // posicion inicial en y de la ficha
        this.x = x;                                             // posicion en x
        this.y = y;                                             // posicion en y
        this.r = r;                                             // radio de la ficha
        this.id = id;                                           // booleano que determina si es de player1 o player2
        this.img;                                               // imagen de la ficha
        this.current_piece_index = null;                        // posicion en arreglo de fichas 
        this.is_dragging = false;                               // booleano que determina si se esta moviendo la ficha
        
        this.btn1 =  btn1;
        //this.ImgJ1.src = '../imagenes/Toretto.png';
        this.btn2 =  btn2;
        //this.ImgJ2.src = '../imagenes/OConner2.png';
        
    }

    crearImagenp1(){
        switch(this.btn1){
            case 1:
            console.log('elegiste el primer auto');
            this.btn1 =  new Image();
            this.btn1.src = '../imagenes/Toretto.png';
            break;
        case 2:
            console.log('elegiste el segundo auto');
            this.btn1 =  new Image();
            this.btn1.src = '../imagenes/Toretto2.png';
            break;
        case 3:
            console.log('elegiste el tercer auto');
            this.btn1 =  new Image();
            this.btn1.src = '../imagenes/Toretto3.png';
            break;
        }
    }

    crearImagenp2(){
        switch(this.btn2){
            case 1:
            console.log('elegiste el primer auto');
            this.btn2 =  new Image();
            this.btn2.src = '../imagenes/Oconner.png';
            break;
            case 2:
            console.log('elegiste el segundo auto');
            this.btn2 =  new Image();
            this.btn2.src = '../imagenes/Oconner2.png';
            break;
        case 3:
            console.log('elegiste el tercer auto');
            this.btn2 =  new Image();
            this.btn2.src = '../imagenes/Oconner3.png';
            break;
        }
    }
    
    draw(ctx){
        
        // se le asigna imagen a player determinando si id es true o false
        if(this.id){
            this.img = this.btn1;
        }
        else{
            this.img = this.btn2;
        }
        
        // se dibuja la imagen 
        ctx.drawImage(this.img, this.x - this.r, this.y - this.r, 2 * this.r, 2 * this.r);

    }

    clickCircle(xmouse,ymouse){

        // funcion que establese si se esta clickeando adentro o fuera del perimetro de la ficha
        // retorna true or false 
        // cambia la variable dragging a true or false
        
        let distance = 
        Math.sqrt(
            ( ( xmouse - this.x ) * ( xmouse - this.x ) ) 
            +
            ( ( ymouse - this.y ) * ( ymouse - this.y ) )
            );
            if (distance < this.r) {
                //console.log(true);
                this.is_dragging = true;
                return true;
            } else {
                this.is_dragging = false;
                return false;
            }
    }

    setCoords(x,y) {
        this.x = x;
        this.y = y;
    }


//    moverFicha(dx,dy,_x,_y){
//     if(this.is_dragging){
//         // fichaj1.forEach(f=>f.moverFicha(dx,dy));
//         // fichaj2.forEach(f=>f.moverFicha(dx,dy));
//         //console.log(this.is_dragging);
//         //let current_piece = pieces[current_piece_index];
//         this.x += dx;
//         this.y += dy;

//         x = _x;
//         y = _y;

//     }
//    }

//    soltarFicha(){
//     if(this.is_dragging = false){
//         this.is_dragging = false;
//     }
//    }
}


// genera un numero random en el eje de las x en el costado izquierdo del tablero
function random_player1_x(){
    
    let random = 0;
    let margin = Math.floor(marginX);
    let widd = Math.floor(wid);
    while(random < widd || random > margin-widd){
        random = Math.floor(Math.random()* marginX - 1);
    }
    return random;
}

// genera un numero random en el eje de las x en el costado derecho del tablero
function random_player2_x(){
    
    let random = 0;
    let margin = Math.floor(marginX + (cell_dim*grid_cols));

    while(random < margin + wid || random > width-wid){
        random =Math.floor(Math.random()* width);
    }
    return random;
}

// genera un numero random en el eje de las y en el alto del canvas
function random_player_y(){
    
    let random = 0;
    let widd = Math.floor(wid);
    while(random < widd || random > height-widd){
        random = Math.floor(Math.random()* height - 1);
    }
    
    return random;
}



