/*jshint esversion: 6*/
import {crearCanvas, renderizar, snakeBody, snakeFood} from "./graphics.js";

let canvas = crearCanvas();
let ctx = canvas.ctx;
let fps = 15,
    start = 0,
    frameDuration = 1000 / fps;

let snake = [];
snake[0] = new snakeBody(); //Cabeza
let comida = new snakeFood();
snake[0].dir = 2;

ctx.fillStyle = "red";
ctx.fillRect(40, 40, 20, 20);

loop();
function loop(timestamp) {
  requestAnimationFrame(loop);
  if (timestamp >= start) {
    actualizar();
    renderizar(canvas);
    comida.render(canvas.ctx);
    for (let i = 0; i < snake.length; i++ ) {
      snake[i].render(canvas.ctx);
    }
    start = timestamp + frameDuration;
  }
}

function actualizar() {
  snake_ubicacion();
  snake[0].mover();
  if (snake[0].x >= canvas.width) {
    snake[0].x = 0;
  } else if (snake[0].x < 0) {
    snake[0].x = canvas.width - 20;
  }
  if (snake[0].y >= canvas.height) {
    snake[0].y = 0;
  } else if (snake[0].y < 0) {
    snake[0].y = canvas.height - 20;
  }

  if (colision()) {
    snake = [];
    snake[0] = new snakeBody();
  }

  if (snake[0].x == comida.x && snake[0].y == comida.y) {
    comida.relocate();
    snake[snake.length] = new snakeBody();
    snake_ubicacion();
  }
}

function snake_ubicacion() {
  if (snake.length > 1) {
    for (let i = 0; i < snake.length - 1; i++) {
      snake[snake.length - i - 1].x = snake[snake.length - i - 2].x;
      snake[snake.length - i - 1].y = snake[snake.length - i - 2].y;
    }
  }
}

function colision(){
  let hit = false;
  if (snake.length > 1) {
    for (let i = 0; i < snake.length - 1; i++) {
      if (snake[0].x == snake[i+1].x && snake[0].y == snake[i+1].y )
        hit = true;
    }
  }
  return hit;
}

window.addEventListener("keydown", keyHandler, false);
function keyHandler(event) {
  if (event.keyCode === 37) snake[0].dir = 0; //Izquierda
  else if (event.keyCode === 38) snake[0].dir = 1; //Arriba
  else if (event.keyCode === 39) snake[0].dir = 2; //Derecha
  else if (event.keyCode === 40) snake[0].dir = 3; //Abajo

}
