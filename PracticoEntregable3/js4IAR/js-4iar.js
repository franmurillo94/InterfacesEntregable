document.addEventListener("DOMContentLoaded", () => {


    let canvas = document.querySelector("#myCanvas");
    let ctx = canvas.getContext("2d");
    

let btn_play = document.querySelector('.boton_play');
    btn_play.style.display = 'visible';
    let btn_next_round = document.querySelector('.btn_next_round');
    btn_next_round.style.display = 'none';
    
    
    let btn_numbrer_in_a_row = document.querySelectorAll(".btn_numbrer_in_a_row");
    let btn_jugador1 = document.querySelectorAll(".btn_Jugador_1");
    let btn_jugador2 = document.querySelectorAll(".btn_Jugador_2");
    let fichaP1;
    let fichaP2;
    let tablero;
    let juego = null;

    
    let nombre_jugador1 = document.querySelector(".p1_name").value;
    let nombre_jugador2 = document.querySelector(".p2_name").value;
    
    btn_numbrer_in_a_row.forEach ( btn=> {
        btn.addEventListener('click', tipoDeJuego =>{
            let modo = Number(btn.value);
            pasarTamanioTablero(modo);
        })
    }) 
    
    btn_jugador1.forEach (btn =>{
        btn.addEventListener('click', elegirImagenP1=>{
            let btn1 = Number(btn.value);
            fichaP1 = new Piece(null,null,null,null,btn1,null);
           //fichaP1.crearImagenp1();
            
        })
    })
    
    btn_jugador2.forEach (btn =>{
        btn.addEventListener('click', elegirImagenP2=>{
            let btn2 = Number(btn.value);
            fichaP2 = new Piece(null,null,null,null,null,btn2);
            //fichaP2.crearImagenp2();
        })
    })
    
    // function elegirImagenP1(btn1){
    //     switch(btn1){
    //         case t1:
    //             this.ImgJ1.src = '../imagenes/Toretto.png';
    //             console.log('elegiste el primer auto');
    //             break;
    //         case t2:
    //             this.ImgJ1.src = '../imagenes/Toretto2.png';
    //             break;
    //         case t3:
    //             this.ImgJ1.src = '../imagenes/Toretto3.png';
    //             break;
    //     }
    // }
    
    // function elegirImagenP2(btn2){
    //     switch(btn2){
    //         case o1:
    //             this.ImgJ2.src = '../imagenes/Oconner.png';
    //             console.log('elegiste el primer auto');
    //             break;
    //         case o2:
    //             this.ImgJ2.src = '../imagenes/Oconner2.png';
    //             break;
    //         case o3:
    //             this.ImgJ2.src = '../imagenes/Oconner3.png';
    //             break;
    //     }
    // }
    
    function pasarTamanioTablero(modo){
        switch(modo){
            case 4:
                grid_cols = 7; // cantidad de columnas
                grid_rows = 6;
                connect_number = 4;
                console.log('se va a jugar 4 en linea');
                break;
            case 5:
                grid_cols = 8; // cantidad de columnas
                grid_rows = 7;
                connect_number = 5;
                console.log('se va a jugar 5 en linea');
                break;
            case 6:
                grid_cols = 9; // cantidad de columnas
                grid_rows = 8;
                connect_number = 6;
                console.log('se va a jugar 6 en linea');
                break;
            case 7:
                grid_cols = 10; // cantidad de columnas
                grid_rows = 9;
                connect_number = 7;
                console.log('se va a jugar 7 en linea');
                break;
        }
    
    }
    

    btn_play.addEventListener("click", () =>{
        btn_play.style.display = 'none';
        btn_next_round.style.display = 'visible';
        pasarTamanioTablero(modo);
        nombre_jugador1;
        nombre_jugador2;
        fichaP1;
        fichaP2;
        setDimensions();
        juego = new Game(grid_cols, grid_rows, connect_number,nombre_jugador1,nombre_jugador2,fichaP1, fichaP2);
    })

})