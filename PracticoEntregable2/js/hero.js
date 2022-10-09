// CARROUSEL HERO GAMEPLAY IMAGES

let gameplay_img = ["../imagenes/Hero/image_dbz_1.png",
                               "../imagenes/Hero/image_dbz_2.png",
                               "../imagenes/Hero/image_dbz_3.png",
                               "../imagenes/Hero/image_dbz_4.png",
                               "../imagenes/Hero/image_dbz_5.png"];
let gameplay_cont = 0;

let gameplay_left = document.getElementById('carro_img_hero_left').addEventListener('click',() => carrousel_gameplay(false));
let gameplay_right = document.getElementById('carro_img_hero_right').addEventListener('click',() => carrousel_gameplay(true));


function carrousel_gameplay(val){

    let img = document.getElementById('gameplay_image');    

    if (val == false){
        console.log('left');
        if(gameplay_cont== 0){
            gameplay_cont = gameplay_img.length - 1;
            img.src = gameplay_img[gameplay_cont];
        }
        else {
            gameplay_cont--;
            img.src = gameplay_img[gameplay_cont];
        }
    }
    else if( val == true){
        console.log('right');
        if(gameplay_cont== (gameplay_img.length -1)) {
            gameplay_cont = 0;
            img.src = gameplay_img[gameplay_cont];
        }
        else {
            gameplay_cont++;
            img.src = gameplay_img[gameplay_cont];
        }
    }
    else {
        console.log('fallo');
    }
}

// SELECT CHARACTER

let goku_btn = document.getElementById('avatar_goku');
let freeza_btn = document.getElementById('avatar_freeza');
let cell_btn = document.getElementById('avatar_cell');
let vegeta_btn = document.getElementById('avatar_vegeta');
let picollo_btn = document.getElementById('avatar_picollo');
let krilin_btn = document.getElementById('avatar_krilin');
let majinboo_btn = document.getElementById('avatar_majinboo');

