let color_player1 = "red";
let color_player2 = "green";
let pieces = [];

class Piece {
    constructor(x,y,r,color){
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        //console.log(this.x, this.y, this.r, this.img);

        // let Img =  new Image();
        // Img.src = '../imagenes/Toretto.png';
        // let Img_2 =  new Image();
        // Img_2.src = '../imagenes/O`Conner.png';
    }
    
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        
        console.log("draw por piece");     
//         let image = this.img;
//         image.onload = () => {
//         let pattern = ctx.createPattern(image, "no-repeat");

//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
//         ctx.fillStyle = pattern;
        
//         ctx.drawImage(image, this.x - this.r, this.y - this.r, 2 * this.r, 2 * this.r);
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
                return true;
            } else {
                return false;
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

function create_pieces() {
    for(let i = 0; i<29;i++){
        if(i % 2 == 0){
            pieces.push(new Piece(random_player1_x(),random_player_y(),wid,color_player1));
        }
        else{
            pieces.push(new Piece(random_player2_x(),random_player_y(),wid,color_player2));
        }
        //console.log("crate pieces");
    } 
}

function draw_pieces() {
    //console.log("draw pieces");
    for(let piece of pieces){
       // console.log("draw pieces for");
       piece.draw(ctx);
    }
}