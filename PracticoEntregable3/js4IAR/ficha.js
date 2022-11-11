let color_player1 = "red";
let color_player2 = "yellow";



class Piece {
    constructor(x,y,r,id){
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.r = r;
        this.id = id;
        this.img;
        this.current_piece_index = null;
        this.is_dragging = false; 
        
        this.ImgJ1 =  new Image();
        this.ImgJ1.src = '../imagenes/Toretto.png';
        this.ImgJ2 =  new Image();
        this.ImgJ2.src = '../imagenes/OConner.png';
        
    }
    
    draw(ctx){
        
        // ctx.fillStyle = this.color;
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        // ctx.fill();

        // ImgJ1.onload = () => {    
        // let pattern = ctx.createPattern(ImgJ1, "no-repeat");

        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        // ctx.fillStyle = pattern;
        //let img = ImgJ1;

        if(this.id){
            this.img = this.ImgJ1;
        }
        else{
            this.img = this.ImgJ2;
        }
        
        ctx.drawImage(this.img, this.x - this.r, this.y - this.r, 2 * this.r, 2 * this.r);
// };
    }

    clickCircle(xmouse,ymouse){
        let distance = 
        Math.sqrt(
            ( ( xmouse - this.x ) * ( xmouse - this.x ) ) 
            +
            ( ( ymouse - this.y ) * ( ymouse - this.y ) )
            );
            if (distance < this.r) {
                console.log(true);
                this.is_dragging = true;
                return true;
            } else {
                this.is_dragging = false;
                return false;
            }
    }


   moverFicha(dx,dy,_x,_y){
    if(this.is_dragging){
        // fichaj1.forEach(f=>f.moverFicha(dx,dy));
        // fichaj2.forEach(f=>f.moverFicha(dx,dy));
        console.log(this.is_dragging);
        //let current_piece = pieces[current_piece_index];
        this.x += dx;
        this.y += dy;

        x = _x;
        y = _y;

    }
   }

   soltarFicha(){
    if(this.is_dragging = false){
        this.is_dragging = false;
    }
   }
}


function random_player1_x(){
    
    let random = 0;
    let margin = Math.floor(marginX);
    let widd = Math.floor(wid);
    while(random < widd || random > margin-widd){
        random = Math.floor(Math.random()* marginX - 1);
    }
    return random;
}
function random_player_y(){
    
    let random = 0;
    let widd = Math.floor(wid);
    while(random < widd || random > height-widd){
        random = Math.floor(Math.random()* height - 1);
    }
    
    return random;
}

function random_player2_x(){

    let random = 0;
    let margin = Math.floor(marginX + (cell_dim*grid_cols));

    while(random < margin + wid || random > width-wid){
        random =Math.floor(Math.random()* width);
    }
    return random;
}





