

// DESPLEGAR MENU HAMBURGUESA
// let menu = document.querySelector(".menu");
let hamburguer = document.querySelector(".menu-h");

// menu.addEventListener('click', () => {
//     hamburguer.classList.toggle('menu-h-show');
// });

// DESPLEGAR MENU SHARE
let share = document.querySelector(".share");
let menu_share = document.querySelector(".menu-share");

share.addEventListener('click', () => {
    menu_share.classList.toggle('menu-share-show');
});

//PRELOADER

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




