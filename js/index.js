let inputDir = {x: 0, y: 0};
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
let score = 0;
food = {x: 13,y: 16}
function main(ctime){
    musicSound.play();
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    //console.log(ctime);
}

function isCollide(snake){
    
    for (let i = 1; i < snakeArr.length; i++) {
    // snake bites itself
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }  
    //snake bums into a wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    
    return false;
}

function gameEngine(){
    
    // Updating the snake array and food
    musicSound.play();
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game over. Press any key to play again");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }        

    // if food is eaten

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){

        score++;
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            document.getElementById("highscore").innerHTML = "High Score " + highscoreval;
        }
        document.getElementById("score").innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    // moving the snake

    for (let i = snakeArr.length-2; i >= 0; i--) {
        
        snakeArr[i+1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// driver

let highscore = localStorage.getItem("highscore");
if(highscore == null){
    highscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    document.getElementById("highscore").innerHTML = "High Score " + highscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1} //Game Starts
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("up");
            inputDir.x = 0;
            inputDir.y =  -1;
            break;
        case "ArrowDown":
            console.log("down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});