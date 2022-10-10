"use strict"

console.log("hello i'm using JS!"); 

let carrousel1 = document.querySelector(".carrousel1");
let carrousel2 = document.querySelector(".carrousel2");
let carrousel3 = document.querySelector(".carrousel3");
let carrousel4 = document.querySelector(".carrousel4");

let categoria1 = document.querySelector(".categoria1");
let categoria2 = document.querySelector(".categoria2");
let categoria3 = document.querySelector(".categoria3");
let categoria4 = document.querySelector(".categoria4");


let pressed = false;
let startx;
let x;

// PRIMER CARROUSEL ----------------------------------------------------------------------------------
carrousel1.addEventListener('mousedown', (e) => 
{
    pressed = true;
    startx = e.offsetX - categoria1.offsetLeft;
    carrousel1.style.cursor = 'grabbing';
});

carrousel1.addEventListener('mouseenter', () =>{
    carrousel1.style.cursor = 'grab';
});

carrousel1.addEventListener('mouseup', () => 
{
    carrousel1.style.cursor = 'grab';
});

window.addEventListener('mouseup', () => 
{
    pressed = false;
});

carrousel1.addEventListener('mousemove', (e) => 
{
    if(!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    categoria1.style.left = `${x - startx}px`;
    boundCards();
});

function boundCards(){
    let outter = carrousel1.getBoundingClientRect();
    let inner = categoria1.getBoundingClientRect();

    if(parseInt(categoria1.style.left) > 9){
        categoria1.style.left = '9px';
    } else if(inner.right < outter.right){
        categoria1.style.left = `-${inner.width - outer.width}px`;
    }

};

// SEGUNDO CARROUSEL -----------------------------------------------------------------------------------

carrousel2.addEventListener("mousedown", (e) => {
    pressed = true;
    startx = e.offsetX - categoria2.offsetLeft;
    carrousel2.style.cursor = "grabbing";
});

carrousel2.addEventListener('mouseenter', () =>{
    carrousel2.style.cursor = 'grab';
});

carrousel2.addEventListener("mouseup", () => {
    carrousel2.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
    pressed = false;
});

carrousel2.addEventListener("mousemove", (e) => {
    if(!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    categoria2.style.left = `${x - startx}px`;
    boundCards();
});

function boundCards(){
    let carrousel2_rect = carrousel2.getBoundingClientRect();
    let categoria2_rect = categoria2.getBoundingClientRect();

    if(parseInt(categoria2.style.left) > 9){
        categoria2.style.left = '9px';
    } else if(categoria2_rect.right < carrousel2_rect.right){
        categoria2.style.left = `-${categoria2_rect.width - carrousel2_rect.width}px`;
    }

};


// TERCER CARROUSEL -----------------------------------------------------------------------------------

carrousel3.addEventListener("mousedown", (e) => 
{
    pressed = true;
    startx = e.offsetX - categoria3.offsetLeft;
    carrousel3.style.cursor = "grabbing";
});

carrousel3.addEventListener('mouseenter', () =>{
    carrousel3.style.cursor = 'grab';
});

carrousel3.addEventListener("mouseup", () => 
{
    carrousel3.style.cursor = "grab";
});

window.addEventListener("mouseup", () => 
{
    pressed = false;
});

carrousel3.addEventListener("mousemove", (e) => 
{
    if(!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    categoria3.style.left = `${x- startx}px`;
    boundCards();
});

function boundCards(){
    let carrousel3_rect = carrousel3.getBoundingClientRect();
    let categoria3_rect = categoria3.getBoundingClientRect();

    if(parseInt(categoria3.style.left) > 9){
        categoria3.style.left = '9px';
    } else if(categoria3_rect.right < carrousel3_rect.right){
        categoria3.style.left = `-${categoria3_rect.width - carrousel3_rect.width}px`;
    }

};

//CUARTO CARROUSEL -----------------------------------------------------------------------------------------------

carrousel4.addEventListener("mousedown", (e) => 
{
    pressed = true;
    startx = e.offsetX - categoria4.offsetLeft;
    carrousel4.style.cursor = "grabbing";
});

carrousel4.addEventListener('mouseenter', () =>{
    carrousel4.style.cursor = 'grab';
});

carrousel4.addEventListener("mouseup", () => 
{
    carrousel4.style.cursor = "grab";
});

window.addEventListener("mouseup", () => 
{
    pressed = false;
});

carrousel4.addEventListener("mousemove", (e) => 
{
    if(!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    categoria4.style.left = `${x - startx}px`;
    boundCards();
});

function boundCards(){
    let carrousel4_rect = carrousel4.getBoundingClientRect();
    let categoria4_rect = categoria4.getBoundingClientRect();

    if(parseInt(categoria4.style.left) > 9){
        categoria4.style.left = '9px';
    } else if(categoria4_rect.right < carrousel4_rect.right){
        categoria4.style.left = `-${categoria4_rect.width - carrousel4_rect.width}px`;
    }

};

// NAVIGATION

document.getElementById("hero_pag").addEventListener('click',()=> {window.open('./html/hero.html',"_self")});

// DESPLEGAR MENU HAMBURGUESA
let menu = document.querySelector(".menu");
let hamburguer = document.querySelector(".menu-h");

menu.addEventListener('click', () => {
    console.log("hola gil");
    hamburguer.classList.toggle('menu-h-show');
});

//PRELOADER

let load_container = document.getElementById("load_container");

setTimeout(function(){
    load_container.classList.add('close_load');
}, 5000);

