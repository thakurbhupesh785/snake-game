// game constants and variables
let inputDir = {x:0 , y:0};

const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let score = 0;
let speed = 10;
let lastPaintTime = 0;

let snakeArr =[ {x: 13 , y: 15} ]

food = {x:6 , y:7}

// game functions

function main (ctime) {
  window.requestAnimationFrame(main);
  
  if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isColllide(snake) {
  // snake touch himself
  for (let i=1; i< snakeArr.length-1; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if snake bump in wall
    if (snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0) {
      return true;
    }
  
}

function gameEngine () {
  //part1 : update snake array
  if(isColllide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x:0 , y:0};
    alert('Game over.Press any key to try again');
    snakeArr =[ {x: 13 , y: 15} ];
    musicSound.play();
    score = 0;
  }

  // if snake eat food , then we will increment the score 
  // update the food location

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score +=1;
    scoreBox.innerHTML = 'Your Score : ' + score;
    // unshift() add the given element
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x ,
      y:snakeArr[0].y + inputDir.y  });

      let a = 2;
      let b = 16;
      food = {x: Math.round(a+(b-a) * Math.random()) , 
        y: Math.round(a+(b-a) * Math.random())}
  }

  // move the snake
  for (let i = snakeArr.length - 2; i >=0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
     // this line means last snake segment equals to 2ndlast one
     // correcting reference problem by {}
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part 2a : show snake 
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index=== 0) {
      snakeElement.classList.add('head');
    } else {
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });
  // part 2b : show food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
   board.appendChild(foodElement);
}


// main logic starts here

// we are using request animation frame instead of setinverval,etc
// due to animation in the game



window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
  inputDir = {x:0 , y:1} // game start
  moveSound.play();
  switch (e.key) {
    case 'ArrowUp':
      console.log('ArrowUp');
      inputDir.x = 0;
      inputDir.y = -1;
      break;

      case 'ArrowDown':
        console.log('ArrowDown');
        inputDir.x = 0;
        inputDir.y = 1;
        break;

        case 'ArrowLeft':
          console.log('ArrowLeft');
          inputDir.x = -1;
          inputDir.y = 0;
          break;

      case 'ArrowRight':
        console.log('ArrowRight');
        inputDir.x = 1;
        inputDir.y = 0;
        break;

    default:
      break;
  }
})