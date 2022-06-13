const nave = document.getElementById("nave");

const body = document.getElementById("body");

const vida = document.getElementById("vida");

const time = document.getElementById("times");

const score = document.getElementById("score");


let vidas = 5;

let segundos = 60;

let puntos = 0;

let aparecer = 0;


// POSICION NAVE

document.addEventListener('mousemove', (e) => {

    nave.style.left = (e.clientX - 40) + 'px';

});


//INICIO TIEMPO
tiempo()


//GENERAR DISPARO
document.addEventListener('click', () => {

    disparo();

});

//GENERAR ENEMIGOS

generarEnemigos();


// SEGUNDERO

function tiempo() {

    setInterval(() => {

        segundos--;

        time.innerText = segundos;

        if (segundos == 0) {

            alert("GANASTE");

            location.reload();
            
            console.log(puntos)
            
        }

    }, 1000);

}


// GENERAR DISPAROS

function disparo() {

    let bala = document.createElement('div');

    bala.classList.add('bala');

    bala.style.bottom = 70 + 'px';

    bala.style.left = (nave.getBoundingClientRect().left + 25) + 'px';

    body.append(bala);

    // MOVIMIENTO DE DISPAROS

    setInterval(() => {

        let balas = document.querySelectorAll('.bala');

        balas.forEach(bala => {

            bala.style.top = (bala.getBoundingClientRect().top - 10) + 'px';

            /* console.log(bala.getBoundingClientRect().top, bala.getBoundingClientRect().left, bala.getBoundingClientRect().bottom, bala.getBoundingClientRect().right) */

            if (bala.getBoundingClientRect().top <= 0) {

                bala.remove();

            }

            // DISPARO ACERTADO

            let enemigos = document.querySelectorAll('.enemigo');

            enemigos.forEach(enemigo => {

                if (bala.getBoundingClientRect().top <= enemigo.getBoundingClientRect().top + 50) {

                    if (bala.getBoundingClientRect().left >= enemigo.getBoundingClientRect().left - 10 && bala.getBoundingClientRect().left <= enemigo.getBoundingClientRect().left + 30) {

                        console.log("hit!");

                        bala.remove();

                        puntos = puntos + 10;

                        score.innerText = puntos;

                        enemigo.style.backgroundImage = 'url("img/explosion.png")';

                        setTimeout(() => {

                            enemigo.remove();

                        }, 100);

                    }

                }

            });

        })

    }, 100);

}


// GENERAR ENEMIGOS

function generarEnemigos() {

    setInterval(() => {

        aparecer++;

        if (aparecer % 10 == 0) {

            let enemigo = document.createElement('div');

            enemigo.classList.add('enemigo');

            body.append(enemigo);

            enemigo.style.left = (Math.random() * window.innerWidth) + 'px';

        }


        // MOVIMIENTO DE ENEMIGOS

        let enemigos = document.querySelectorAll('.enemigo');

        enemigos.forEach(enemigo => {

            enemigo.style.top = (enemigo.getBoundingClientRect().top + 10) + 'px';

            if (enemigo.getBoundingClientRect().top > nave.getBoundingClientRect().top) {

                vidas--;

                vida.textContent = vidas;

                if (vidas == -1) {

                    alert("GAME OVER");

                    location.reload();

                }

                enemigo.remove();

            }

        });

    }, 150)

};