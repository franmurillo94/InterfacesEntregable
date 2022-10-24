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