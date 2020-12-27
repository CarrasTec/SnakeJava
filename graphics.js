/*jshint esversion: 6*/
export function crearCanvas(
  width = 400, height = 400,
  border = "1px dashed black",
  backgroundColor = "white") {

  //Crear el canvas
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = border;
  canvas.style.background = backgroundColor;
  document.body.appendChild(canvas);

  //Creamos el contexto como propiedad del canvas
  canvas.ctx = canvas.getContext("2d");

  return canvas;
}

export function renderizar(canvas) {
  let ctx = canvas.ctx;
  //limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "blue";
  let ax=0, ay=0, bx=0, by=400;
  ctx.beginPath();
  for(let i=20; i<400; i+=20){
    ax=i;
    bx=i;
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
  }
  ctx.stroke();

  ax=0;
  bx=400;
  ctx.beginPath();
  for(let i=20; i<400; i+=20){
    ay=i;
    by=i;
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
  }
  ctx.stroke();
}

export class snakeBody {
  constructor() {
    this.x = 20;
    this.y = 20;
    this.vx = 20;
    this.vy = 0;
    this.dir = 0;
  }

  render(ctx) {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  mover() {
    if (this.dir == 0) {this.vx = -20; this.vy = 0;}
    else if (this.dir == 1) {this.vy = -20; this.vx = 0;}
    else if (this.dir == 2) {this.vx = 20; this.vy = 0;}
    else if (this.dir == 3) {this.vy = 20; this.vx = 0;}
    this.x += this.vx;
    this.y += this.vy;
  }
}

export class snakeFood {
  constructor() {
    this.x = Math.floor(Math.random()*20)*20;
    this.y = Math.floor(Math.random()*20)*20;
  }

  render(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  relocate() {
    this.x = Math.floor(Math.random()*20)*20;
    this.y = Math.floor(Math.random()*20)*20;
  }
}
