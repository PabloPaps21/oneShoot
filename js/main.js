const images = {
    fondo1: './images/fondo1.png',
    fondo2: 'https://img.itch.zone/aW1hZ2UvMjE3Mzg5LzEwMjYyODAucG5n/original/cDpnzW.png',
    ship1: './images/Ship1.png',
    obst1: './images/obs.png'
};
//sujetar canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//variables
let interval;
let frames = 0;
let obstacles = [];
let scoreCount = 0;
class Board {
    constructor(){
      this.x = 0;
      this.y = 0;
      this.width = canvas.width;
      this.height = canvas.height;
      //cargar imagen 
      this.img = new Image();
      this.img.src = images.fondo1;
      this.img.onload = () => {
        this.draw();
        };
      }
    draw(){
      this.x--; //velocidad fondo
      //si no tengo el if, la imagen solo se estira, aparece la imagen y se va intercaando con la misma para que no se vea cortada
      if(this.x < -canvas.width) this.x = 0;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
    }
  }

  
class Ship {
  constructor(){
    //size
    this.width = 100
    this.height =  100
    //pos
    this.x = 30;
    this.y = 160;
    //velocidad??
    this.vx = 0
    this.vy = 0
    
    this.hp = 1
    this.position = 0
    this.img = new Image()
    this.img.src = images.ship1;
    this.img.onload = () => {
      this.draw()
    }
  }
  draw(){
     if (this.y > canvas.height - this.height && this.y < canvas.height - this.height) {
      this.y = canvas.height - this.height
    } else {
      this.vy++
    }

    ctx.drawImage(
    // imagen de fuente
    this.img,
    // posición de x en canvas (destino, dx)
    this.x,
    // posición de y en canvas (destino, dy)
    this.y,
    // ancho desde la posición de x en canvas (dw)
    this.width,
    // alto desde la posición de y en canvas (dh)
    this.height
    )
  }
  isTouching(obstacle) {
    // algo está tratando de ocupar el mismo espacio en canvas que flash
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
  moveLeft() {
    this.x -= 3
    this.position = 1
  }
  moveRight() {
    this.x += 3
    this.position = 1
  }
  moveUp(){
    this.y -= 3
    this.position = 1
  }
  moveDown(){
    this.y += 3
    this.position = 1
  }
}
class Obs {
  constructor(y) {
    this.x = canvas.width
    this.y = y
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = images.obst1
    this.img.onload = () => {
      this.draw();
    };
 
  }
  draw() {
    this.x--;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}
const board = new Board();
const ship = new Ship();


function clearCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function checkColitions() {
  if (ship.x <= 0) {
    ship.x = canvas.width - ship.width
  } else if (ship.x > canvas.width) {
    ship.x = 0
  }
  obstacles.forEach((obs, i) => {
    if (ship.isTouching(obs)) {
      obstacles.splice(i, 1)
      ship.hp--
    }
  })
}
function gameOver() {
  if (ship.hp === 0) {
    clearInterval(interval)
    interval= null;
    ctx.font = '30px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText('Game Over', canvas.width / 2 - 30, canvas.height / 2)
  }
}
function generateObs(){
  if (frames % 200 === 0) {
    const randomPosition = Math.floor(Math.random() * canvas.height) + 50
    const obs = new Obs(randomPosition)
    obstacles.push(obs)
  }
}
function drawObstacles() {
  obstacles.forEach(obs => obs.draw())
}

window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      startGame();
    };  
  };

function startGame() {
    if(interval) return;
    interval = setInterval(update, 1000 / 90); // /60
};

function restart(){
    /*interval = false;*/
    ship.x = 30;
    ship.y  = 70;
    frames = 0;
    obstacles = [];
    // scoreCount = 0;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    startGame();
  }

document.onkeydown = (e) => {
    switch(e.keyCode){
        case 82:
            restart();
        break;
        case 37:
        ship.moveLeft()
        return
        case 39:
        ship.moveRight()
        return
        case 40:
        ship.moveDown()
        break;
        case 38:
        ship.moveUp()
        break;

        default:
        break;
    }
}

function update(){
    frames++;
    clearCanvas();
    board.draw();
    ship.draw();
    //ship.x += ship.vx//movimiento, para sumar velocidad
    //ship.y += ship.vy
    checkColitions();
    generateObs();
    drawObstacles();
    gameOver();
}