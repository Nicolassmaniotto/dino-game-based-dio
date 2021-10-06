// script baseado no curso da dio

// html dom
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

// variaveis globais
let isJumping = false;
let isGameOver = false;
let position = 0;

let incrementDif = 0;
let rand = (min,max)=>(Math.random()*max-min)+min
function handleKeyUp(event) {

  if (event.keyCode === 32) {
    //   espaco apertado
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true; // previne bug
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {

        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;

        } else {

          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  document.getElementById('pontuacao').innerHTML = incrementDif
  let cactusPosition = 1000;
  let randomTime = rand(cactusPosition,5000)-incrementDif;
  incrementDif++
  if (isGameOver) return;

  //style
  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';
    //

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
        // fora de tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = `<div>Fim pontuação: ${incrementDif}</div>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
