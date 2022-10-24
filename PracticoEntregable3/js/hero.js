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

goku_btn.addEventListener('click',()=>{
    document.querySelector('.active').classList.remove('active');
    document.getElementById('character_img1').src = '../imagenes/Hero/goku_img1.png';
    document.getElementById('character_img2').src = '../imagenes/Hero/goku_img2.png';
    document.getElementById('character_title').innerText = "Son Goku";
    document.getElementById('character_description').innerText = "Goku is pure of heart. He is highly loyal to his friends and family and is de biggest Earth's hero";
    goku_btn.classList.add('active');  
});
freeza_btn.addEventListener('click',()=>{
    document.querySelector('.active').classList.remove('active');
    document.getElementById('character_img1').src = '../imagenes/Hero/freeza_img1.png';
    document.getElementById('character_img2').src = '../imagenes/Hero/freeza_img2.png';
    document.getElementById('character_title').innerText = "Freeza";
    document.getElementById('character_description').innerText = 'Frieza is the main antagonist of the Dragon Ball and the leader of his own imperialist army';
    freeza_btn.classList.add('active');  
});
cell_btn.addEventListener('click',()=>{
    document.querySelector('.active').classList.remove('active');
    document.getElementById('character_img1').src = '../imagenes/Hero/cell_img1.png';
    document.getElementById('character_img2').src = '../imagenes/Hero/cell_img2.png';
    document.getElementById('character_title').innerText = "Cell";
    document.getElementById('character_description').innerText = 'Cell is one of the main antagonist of Dragon Ball Z. Incredible Physique. Master Martial Artist';
    cell_btn.classList.add('active');  
});
vegeta_btn.addEventListener('click',()=>{
    document.querySelector('.active').classList.remove('active');
    document.getElementById('character_img1').src = '../imagenes/Hero/vegeta_img1.png';
    document.getElementById('character_img2').src = '../imagenes/Hero/vegeta_img2.png';
    document.getElementById('character_title').innerText = "Vegeta";
    document.getElementById('character_description').innerText = 'Vegeta is the prince of the Saiyans. He is extremely arrogant, proud and hardworking';
    vegeta_btn.classList.add('active');  
});
picollo_btn.addEventListener('click',()=>{
    document.querySelector('.active').classList.remove('active');
    document.getElementById('character_img1').src = '../imagenes/Hero/picollo_img1.png';
    document.getElementById('character_img2').src = '../imagenes/Hero/picollo_img2.png';
    document.getElementById('character_title').innerText = "Piccolo";
    document.getElementById('character_description').innerText = "Piccolo is a very tall and muscular Namekian but he became one of Earth's heroes";
    picollo_btn.classList.add('active');  
});
krilin_btn.addEventListener('click',()=>{
    document.querySelector('.active').classList.remove('active');
    document.getElementById('character_img1').src = '../imagenes/Hero/krilin_img1.png';
    document.getElementById('character_img2').src = '../imagenes/Hero/krilin_img2.png';
    document.getElementById('character_title').innerText = "Krillin";
    document.getElementById('character_description').innerText = 'Krillin is a highly valued character in the Dragon Ball series: powerful, loyal, and brave';
    krilin_btn.classList.add('active');  
});
majinboo_btn.addEventListener('click',()=>{
    document.querySelector('.active').classList.remove('active');
    document.getElementById('character_img1').src = '../imagenes/Hero/majinboo_img1.png';
    document.getElementById('character_img2').src = '../imagenes/Hero/majinboo_img2.png';
    document.getElementById('character_title').innerText = "Majin Boo";
    document.getElementById('character_description').innerText = 'Super strength. Super speed, agility, reflexes. Stamina Healing Flight Energy sensing';
    majinboo_btn.classList.add('active');  
});


// POSTS COMMENTS

document.getElementById('post_comment').addEventListener('click', ()=>{

    let info = document.getElementById('input_comment').value;
    
    document.querySelector('.comments').innerHTML += "<div class='comment_item'><img src='../imagenes/Hero/user_hero_post.png' alt='My Avatar'><p class='user-comment'>" + info + "</p></div><hr class='line_comment'/>";
    
})

// PRELOADER

let load_container = document.getElementById("load_container");

setTimeout(function(){
    load_container.classList.add('close_load');
}, 5000);

let load_cont = 0;
let load_number = document.getElementById("load_number");

setInterval(()=>{
if(load_cont==100){
    clearInterval();
} else {
    load_cont += 1;
    load_number.textContent = load_cont + "%";
}
},40);

// DESPLEGAR MENU HAMBURGUESA
let menu = document.querySelector(".menu");
let hamburguer = document.querySelector(".menu-h");

menu.addEventListener('click', () => {
    console.log("hola gil");
    hamburguer.classList.toggle('menu-h-show');
});

// DESPLEGAR MENU SHARE
let share = document.querySelector(".share");
let menu_share = document.querySelector(".menu-share");

share.addEventListener('click', () => {
    console.log("hola gil");
    menu_share.classList.toggle('menu-share-show');
});

// INTERACCION BOTONES

document.getElementById(["suscribe_hero1"]).addEventListener('click',()=>{ alert("Sorry! The page is not ready! Coming Soon!")});
document.getElementById(["suscribe_hero2"]).addEventListener('click',()=>{ alert("Sorry! The page is not ready! Coming Soon!")});

