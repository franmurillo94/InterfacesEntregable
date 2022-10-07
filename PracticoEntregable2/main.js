"use strict"

console.log("hello i'm using JS!"); 

const carrousel = document.querySelector(".carrousel");
const carrousel2 = document.querySelector(".carrousel2");
const carrousel3 = document.querySelector(".carrousel3");
const carrousel4 = document.querySelector(".carrousel4");

const categoria = document.querySelector(".categoria");
const categoria2 = document.querySelector(".categoria2");
const categoria3 = document.querySelector(".categoria3");
const categoria4 = document.querySelector(".categoria4");


let isPressDown = false;

let cursorXSpace;

// PRIMER CARROUSEL ----------------------------------------------------------------------------------
carrousel.addEventListener("mousedown", (e) => 
{
    isPressDown = true;
    cursorXSpace = e.offsetX - categoria.offsetLeft;
    carrousel.style.cursor = "grabbing";
});

carrousel.addEventListener("mouseup", () => 
{
    carrousel.style.cursor = "grab";
});

window.addEventListener("mouseup", () => 
{
    isPressDown = false;
});

carrousel.addEventListener("mousemove", (e) => 
{
    if(!isPressDown) return;
    e.preventDefault();
    categoria.style.left = `${e.offsetX - cursorXSpace}px`;
    boundCards();
});

function boundCards(){
    const carrousel_rect = carrousel.getBoundingClientRect();
    const categoria_rect = categoria.getBoundingClientRect();

    if(parseInt(categoria.style.left) > 9){
        categoria.style.left = '9px';
    } else if(categoria_rect.right < carrousel_rect.right){
        categoria.style.left = `-${categoria_rect.width - carrousel_rect.width}px`;
    }

};

// SEGUNDO CARROUSEL -----------------------------------------------------------------------------------

carrousel2.addEventListener("mousedown", (e) => {
    isPressDown = true;
    cursorXSpace = e.offsetX - categoria2.offsetLeft;
    carrousel2.style.cursor = "grabbing";
});

carrousel2.addEventListener("mouseup", () => {
    carrousel2.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
    isPressDown = false;
});

carrousel2.addEventListener("mousemove", (e) => {
    if(!isPressDown) return;
    e.preventDefault();
    categoria2.style.left = `${e.offsetX - cursorXSpace}px`;
    boundCards();
});

function boundCards(){
    const carrousel2_rect = carrousel2.getBoundingClientRect();
    const categoria2_rect = categoria2.getBoundingClientRect();

    if(parseInt(categoria2.style.left) > 9){
        categoria2.style.left = '9px';
    } else if(categoria2_rect.right < carrousel2_rect.right){
        categoria2.style.left = `-${categoria2_rect.width - carrousel2_rect.width}px`;
    }

};


// TERCER CARROUSEL -----------------------------------------------------------------------------------

carrousel3.addEventListener("mousedown", (e) => 
{
    isPressDown = true;
    cursorXSpace = e.offsetX - categoria3.offsetLeft;
    carrousel3.style.cursor = "grabbing";
});

carrousel3.addEventListener("mouseup", () => 
{
    carrousel3.style.cursor = "grab";
});

window.addEventListener("mouseup", () => 
{
    isPressDown = false;
});

carrousel3.addEventListener("mousemove", (e) => 
{
    if(!isPressDown) return;
    e.preventDefault();
    categoria3.style.left = `${e.offsetX - cursorXSpace}px`;
    boundCards();
});

function boundCards(){
    const carrousel3_rect = carrousel3.getBoundingClientRect();
    const categoria3_rect = categoria3.getBoundingClientRect();

    if(parseInt(categoria3.style.left) > 9){
        categoria3.style.left = '9px';
    } else if(categoria3_rect.right < carrousel3_rect.right){
        categoria3.style.left = `-${categoria3_rect.width - carrousel3_rect.width}px`;
    }

};

//CUARTO CARROUSEL -----------------------------------------------------------------------------------------------

carrousel4.addEventListener("mousedown", (e) => 
{
    isPressDown = true;
    cursorXSpace = e.offsetX - categoria4.offsetLeft;
    carrousel4.style.cursor = "grabbing";
});

carrousel4.addEventListener("mouseup", () => 
{
    carrousel4.style.cursor = "grab";
});

window.addEventListener("mouseup", () => 
{
    isPressDown = false;
});

carrousel4.addEventListener("mousemove", (e) => 
{
    if(!isPressDown) return;
    e.preventDefault();
    categoria4.style.left = `${e.offsetX - cursorXSpace}px`;
    boundCards();
});

function boundCards(){
    const carrousel4_rect = carrousel4.getBoundingClientRect();
    const categoria4_rect = categoria4.getBoundingClientRect();

    if(parseInt(categoria4.style.left) > 9){
        categoria4.style.left = '9px';
    } else if(categoria4_rect.right < carrousel4_rect.right){
        categoria4.style.left = `-${categoria4_rect.width - carrousel4_rect.width}px`;
    }

};