const images = {
  fondo1: './images/fondo1.png',
  fondo2: './images/fondo2.jpg',
  fondo3: 'https://ak4.picdn.net/shutterstock/videos/1016737804/thumb/1.jpg',
  ship1: './images/shipG.png',
  ship6: './images/shipP.png',
  obst1: './images/obs.png',
  obst2: './images/obs3.png',
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
let keys = [];


let audio = new Audio('./sound/lol.mp3');
let soundG = new Audio('./sound/laser.mp3');
let soundP = new Audio('./sound/laser2.mp3');
let soundBoom = new Audio('./sound/boom.mp3');
let obsExp = new Audio('./sound/obsExplo.mp3');


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
    this.x -=2; //velocidad fondo
    //si no tengo el if, la imagen solo se estira, aparece la imagen y se va intercaando con la misma para que no se vea cortada
    if(this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
  }
}


class ShipG {
  constructor(){
    //size
    this.width = 80;
    this.height =  50;
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
    if(keys[37]){
      this.x -= 5;
      this.position = 1;
    }
  }
  moveRight() {
    if(keys[39]){
      this.x += 5;
      this.position = 1;
    }
  }
  moveUp(){
    if(keys[38]){
      this.y -= 6;
      this.position = 1;
    }
  }
  moveDown(){
    if(keys[40]){
      this.y += 6;
      this.position = 1;
    }
  }
}

class ShipP {
  constructor(){
    //size
     this.width = 80;
     this.height =  60;
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
    if(keys[65]){
      this.x -= 5;
      this.position = 1;
    }
  }
  moveRight() {
    if(keys[68]){
      this.x += 5;
      this.position = 1;
    }
  }
  moveUp(){
    if(keys[87]){
      this.y -= 6;
      this.position = 1;
    }
  }
  moveDown(){ 
    if(keys[83]){
      this.y += 6;
      this.position = 1;
    }
  }
}
;
class Obs {
  constructor(y) {
    this.x = canvas.width;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.img = new Image()
    this.img.src = images.obst1;
    this.imgObs2 = new Image()
    this.imgObs2.src = images.obst2
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
      if(frames < 1000){
        this.x -= 2;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  
      }else if(frames > 1000 && frames < 3000){
        this.x -= 8;
        ctx.drawImage(this.imgObs2,this.x, this.y, 80, 80);
      }else if (frames > 2000 && frames < 3000){
        this.x -= 7;
        ctx.drawImage(this.img, this.x, this.y, 150, 150);
      }else if(frames > 3000  && frames < 3500) {
        this.x -= 10 
        ctx.drawImage(this.imgObs2,this.x, this.y, 90, 90);
      }else if(frames > 3500 && frames < 40000){
      this.y += 8;
      ctx.drawImage(this.img, this.x, this.y, 100, 100);
      // ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
       }else {
         this.x -= 6
         ctx.drawImage(this.img, this.x, this.y, 250, 250);

   }     

    
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
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
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
  
  if (frames % 70 === 0) { //numero de obs en funcion del tiempo
    const randomPosition = Math.floor(Math.random() * canvas.height);
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
      soundBoom.play();
      gameOver();
    } 
    if (shipP.isTouching(obs)) {
      obstacles.splice(i, 1);
      shipP.hp2--;
      soundBoom.play();
      gameOver();
    }
    if(bullG.isTouching(obs)){
      obsExp.play(); //sonido al tocar con obstaculo
      obstacles.splice(i,1);
    } 
    if(bullP.isTouching(obs)){
      obsExp.play();//sonido al tocar con obstaculo
      obstacles.splice(i, 1);
      console.log('si toca el morado')
    }
  })
}

function clearCanvas(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

let imgP = new Image()
    imgP.src = images.winnerG;
let imgG = new Image()
    imgG.src = images.winnerP;

let apagar;

function gameOver() {  
  audio.pause();
  obstacles = []
  clearCanvas();
  audio.currentTime = 0;

  if (shipG.hp === 0) {
    clearInterval(interval);
    apagar = true;
    interval= null;
    //morado gana
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(imgG, 230, 150, 260, 160);
    keys = [];
  }
   if(shipP.hp2 === 0){
    clearInterval(interval);
    apagar= true;
    interval= null;
    //verde gana 
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(imgP, 230, 150, 260, 160);
    console.log('morado pierde');
    keys = [];
   }
  }
function shootG (){
  soundG.play()
  bullG.boolean=false;
  bullG.x = shipG.x + shipG.width;
  bullG.y = shipG.y;
}
function shootP(){
  soundP.play();
  bullP.boolean = false,
  bullP.x = shipP.x + shipP.width;
  bullP.y = shipP.y -50;
}

const board = new Board();
const shipG = new ShipG();
const shipP = new ShipP();
const bullG = new BulletG();
const bullP = new BulletP();


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    
    if(!keys[13]){
      startGame();
      apagar = false;
    }
     if(keys[32]){
      this.blur();
      return false;
    }
  }; 
  document.getElementById("restart-button").onclick = function(){
     location.reload();
  };
};

function startGame() {
  audio.play();
  if(interval) return;
  interval = setInterval(update, 1000 / 90); // /60
  ctx.clearRect(0,0,canvas.width, canvas.height);
  startGame();
};

function restrictSpace() {
  if (event.keyCode === 32) {
      return false;
  }
}

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
  restrictSpace();
}

 
document.body.addEventListener('keydown', (e) => {
  e.preventDefault();
  switch(e.keyCode){
    case 70:
      soundG.play();
      shootP();
    break;
    case 13:
      soundP.play();
        shootG();
      break;
     }
  keys[e.keyCode] = true;
});

document.body.addEventListener('keyup', (e) => {
  keys[e.keyCode] = false;
});



function update(){
  frames++;
  clearCanvas();
  board.draw();
  shipG.draw();
  shipP.draw();
  shipG.moveLeft();
	shipP.moveLeft();
  shipG.moveRight();
  shipP.moveRight();
  shipG.moveUp();
  shipP.moveUp();
  shipP.moveDown();
  shipG.moveDown();
  if(!bullP.boolean) bullP.draw();
  if(!bullG.boolean) bullG.draw();
  checkColitions();
  drawObstacles();
  generateObs();
}