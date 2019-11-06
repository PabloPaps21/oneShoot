const images = {
  fondo1: './images/fondo1.png',
  fondo2: './images/fondo2.jpg',
  fondo3: 'https://ak4.picdn.net/shutterstock/videos/1016737804/thumb/1.jpg',
  ship1: './images/Ship1.png',
  ship6: './images/Ship6.png',
  obst1: './images/obs.png',
  bulletG:'./images/bullet.png',
  bulletP: './images/bullet2.png',
  winnerP:'./images/winnerMorado.png',
  winnerG:'./images/winnerVerde.png'
};

//sujetar canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


//variables
let interval;
let frames = 0;
let obstacles = [];
let scoreCount = 0;

//clases
class Board {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    //cargar imagen 
    this.img = new Image();
    this.img.src = images.fondo2;
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


class ShipG {
  constructor(){
    //size
    this.width = 100;
    this.height =  100;
    //pos
    this.x = 30;
    this.y = 0;
    
    this.hp = 1;
    this.img = new Image();
    this.img.src = images.ship1;
    this.img.onload = () => {
    this.draw();
    }
  }
  draw(){
    //abajo
     if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height;
    }
    //arriba
    else if(this.y <= 0){
      this.y = 0;
    }
    //derecha
     if (this.x > canvas.width - this.width){
      this.x = canvas.width - this.width;
    }
    //izquierda
   if(this.x <= 0){
      this.x = 0;
    }
  ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
  }

  isTouching(obstacle) {
    // algo está tratando de ocupar el mismo espacio en canvas que flash
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
  moveLeft() {
    this.x -= 8;
    this.position = 1;
  }
  moveRight() {
    this.x += 8;
    this.position = 1;
  }
  moveUp(){
    this.y -= 7;
    this.position = 1;
  }
  moveDown(){
    this.y += 7;
    this.position = 1;
  }
}

class ShipP {
  constructor(){
    //size
     this.width = 100;
     this.height =  100;
    // //pos
     this.x = 30;
     this.y = 460;
    
    this.hp2 = 1;

    this.img = new Image()
    this.img.src = images.ship6;
    this.img.onload = () => {
      this.draw();
    }

  }
  draw(){
    //abajo
     if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height;
    }
    //arriba
    else if(this.y <= 0){
      this.y = 0;
    }
    //derecha
   if (this.x > canvas.width - this.width){
      this.x = canvas.width - this.width;
    }
    //izquierda
   else if(this.x <= 0){
      this.x = 0;
    }
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
  }

  isTouching(obstacle) {
    // algo está tratando de ocupar el mismo espacio en canvas que flash
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
  moveLeft() {
    this.x -= 8;
    this.position = 1;
  }
  moveRight() {
    this.x += 8;
    this.position = 1;
  }
  moveUp(){
    this.y -= 7;
    this.position = 1;
  }
  moveDown(){
    this.y += 7;
    this.position = 1;
  }
}

class Obs {
  constructor(y) {
    this.x = canvas.width;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.img = new Image()
    this.img.src = images.obst1;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.x--;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class BulletP {
  constructor(){
    //pos
    //this.x = ship2.x + ship2.width;
    //this.y = ship2.y - 40;
    this.x = 0;
    this.y = 0;
    //size
    this.width = 60;
    this.height =  60;
    this.bullV + 10; 
    this.img = new Image();
    this.img.src = images.bulletP;
    this.boolean = true;
  
  }
  draw(){
    this.x++;
    ctx.drawImage(this.img, this.x, this.y + 50, this.width, this.height);
    
  }
  isTouching(obstacle){
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y +40 < obstacle.y + obstacle.height &&
      this.y + 40 + this.height > obstacle.y
    );
  }
}
class BulletG {
  constructor(){
    //pos
    // this.x = ship.x + ship.width;
    // this.y = ship.y + 30;
    this.x = 0;
    this.y = 0;
    //size
    this.width = 50;
    this.height =  50;
    this.bullV + 10; 
    this.img = new Image();
    this.img.src = images.bulletG;
    this.boolean = true;
  }
  draw(){
    this.x++;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  isTouching(obstacle){
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}
//clases

function generateObs(){
  if (frames % 200 === 0) { //numero de obs en funcion del tiempo
    const randomPosition = Math.floor(Math.random() * canvas.height) + 50;
    const obs = new Obs(randomPosition);
    obstacles.push(obs);
  }
}
function drawObstacles() {
  generateObs();
  obstacles.forEach(obs => obs.draw());
}

function checkColitions() {
  obstacles.forEach((obs, i) => {
    if (shipG.isTouching(obs)) {
      obstacles.splice(i, 1);
      shipG.hp--;
      gameOver();
    } 
    if (shipP.isTouching(obs)) {
      obstacles.splice(i, 1);
      shipP.hp2--;
      gameOver();
    }
    if(bullG.isTouching(obs)){
      obstacles.splice(i,1);
    } 
    if(bullP.isTouching(obs)){
      obstacles.splice(i, 1);
      console.log('si toca el morado')
    }
  })
}

function clearCanvas(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

function gameOver() { ///revisar el texto 
  if (shipG.hp === 0) {
    clearInterval(interval);
    interval= null;
    ctx.font = '50px Arial';
    ctx.fillStyle = 'purple';
    ctx.fillText('Jugador 2 gana!', canvas.width / 2 - 60, canvas.height / 2);
    //ctx.drawImage(imageP, 100, 100, 500, 240);
  }
   if(shipP.hp2 === 0){
    clearInterval(interval);
    interval= null;
    // ctx.font = '50px Arial';
    // ctx.fillStyle = 'green';
    // ctx.fillText('Jugador 1 gana!', canvas.width / 2 , canvas.height / 2);
    let imgP = new Image()
    imgP.src = images.winnerG;
    ctx.drawImage(this.imgP, 100, 100, 300, 300);
    console.log('morado pierde')
   }
  }
function shootG (){
  bullG.boolean=false;
  bullG.x = shipG.x + shipG.width;
  bullG.y = shipG.y + 25;
}
function shootP(){
  bullP.boolean = false,
  bullP.x = shipP.x + shipP.width;
  bullP.y = shipP.y - 25;
}

const board = new Board();
const shipG = new ShipG();
const shipP = new ShipP();
const bullG = new BulletG();
const bullP = new BulletP();


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  }; 
  document.getElementById("restart-button").onclick = function(){
     location.reload();
  };
};

function startGame() {
  if(interval) return;
  interval = setInterval(update, 1000 / 90); // /60

};

function restart(){
  /*interval = false;*/
  interval = null
  shipG.x = 10;
  shipG.y  = 0;
  shipP.x = 10;
  shipP.y  = 550;
  bullP.boolean = false
  bullG.boolean = false
  frames = 0;
  obstacles = [];
  ctx.clearRect(0,0,canvas.width, canvas.height);
  startGame();
}

document.onkeydown = (e) => {
  switch(e.keyCode){
    
      case 37:
        shipG.moveLeft();
      break;
      case 38:
        shipG.moveUp();
      break;
      case 39:
        shipG.moveRight();
      break;
      case 40:
        shipG.moveDown();
      break;
      case 65:
        shipP.moveLeft();
      break;
      case 68:
        shipP.moveRight();
      break;
      case 83:
        shipP.moveDown();
      break;
      case 87:
        shipP.moveUp();
      break;
      case 70:
        shootP();
       break;
       case 13:
         shootG();
         break;
      default:
      break;
  }
}
function update(){
  frames++;
  clearCanvas();
  board.draw();
  shipG.draw();
  shipP.draw();
  if(!bullP.boolean) bullP.draw();
  if(!bullG.boolean) bullG.draw();
  checkColitions();
  drawObstacles();
  generateObs();
}