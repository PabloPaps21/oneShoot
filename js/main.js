const images = {
    fondo1: './images/fondo1.png',
    fondo2: 'https://img.itch.zone/aW1hZ2UvMjE3Mzg5LzEwMjYyODAucG5n/original/cDpnzW.png',
    fondo3: 'https://ak4.picdn.net/shutterstock/videos/1016737804/thumb/1.jpg',
    ship1: './images/Ship1.png',
    ship6: './images/Ship6.png',
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
      this.img.src = images.fondo3;
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
    this.img = new Image()
    this.img.src = images.ship1;
    this.img.onload = () => {
      this.draw()
    }
  }
  draw(){
    //abajo
     if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height
    }
    //arriba
    
    else if(this.y <= 0){
      this.y = 0;
    }

    //derecha
    else if (this.x > canvas.width - this.width){
      this.x = canvas.width - this.width
    }

    //izquierda
   if(this.x < 0){
      this.x = 0;
    }

  ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
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
    this.x -= 8
    this.position = 1
  }
  moveRight() {
    this.x += 8
    this.position = 1
  }
  moveUp(){
    this.y -= 7
    this.position = 1
  }
  moveDown(){
    this.y += 7
    this.position = 1
  }
}

class Ship2 {
  constructor(){
    //size
     this.width = 100
     this.height =  100
    // //pos
     this.x = 30;
     this.y = 460;
    
    this.hp = 1

    this.img = new Image()
    this.img.src = images.ship6;
    this.img.onload = () => {
      this.draw()
    }

  }
  draw(){
    //abajo
     if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height
    }
    //arriba
    
    else if(this.y <= 0){
      this.y = 0;
    }

    //derecha
    else if (this.x > canvas.width - this.width){
      this.x = canvas.width - this.width
    }

    //izquierda
   if(this.x < 0){
      this.x = 0;
    }
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
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
    this.x -= 8
    this.position = 1
  }
  moveRight() {
    this.x += 8
    this.position = 1
  }
  moveUp(){
    this.y -= 7
    this.position = 1
  }
  moveDown(){
    this.y += 7
    this.position = 1
  }
}

class Obs {
  constructor(y) {
    this.x = canvas.width
    this.y = y
    this.width = 30
    this.height = 30
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


function clearCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function checkColitions() {
  obstacles.forEach((obs, i) => {
    if (ship.isTouching(obs)) {
      obstacles.splice(i, 1)
      ship.hp--
      gameOver();
    }
    if (ship2.isTouching(obs)) {
      obstacles.splice(i, 1)
      ship2.hp--
      gameOver();
    }
  })
}
function gameOver() {
  if (ship.hp === 0) {
    clearInterval(interval)
    interval= null;
    ctx.font = '30px Arial'
    ctx.fillStyle = 'Blue'
    ctx.fillText('Game Over', canvas.width / 2 - 30, canvas.height / 2)
  }
  if(ship2.hp === 0){
    clearInterval(interval)
    interval= null;
    ctx.font = '30px Arial'
    ctx.fillStyle = 'Red'
    ctx.fillText('Game Over', canvas.width / 2 - 30, canvas.height / 2)
  }
}
function generateObs(){
  if (frames % 200 === 0) { //numero de obs en funcion del tiempo
    const randomPosition = Math.floor(Math.random() * canvas.height) + 50
    const obs = new Obs(randomPosition)
    obstacles.push(obs)
  }
}
function drawObstacles() {
  generateObs();
  obstacles.forEach(obs => obs.draw())
}
const board = new Board();
const ship = new Ship();
const ship2 = new Ship2();

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
    ship2.x = 30;
    ship2.y  = 70;
    frames = 0;
    obstacles = [];
    // scoreCount = 0;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    startGame();
  }

document.onkeydown = (e) => {
    switch(e.keyCode){
        case 37:
          ship.moveLeft()
        return
        case 38:
          ship.moveUp()
        break;
        case 39:
          ship.moveRight()
        return
        case 40:
          ship.moveDown()
        break;
        case 65:
          ship2.moveLeft()
        break;
        case 68:
          ship2.moveRight()
        break;
        case 82:
          restart();
        break;
        case 83:
          ship2.moveDown()
        break;
        case 87:
          ship2.moveUp()
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
    ship2.draw();
    checkColitions();
    drawObstacles();
    generateObs();
}