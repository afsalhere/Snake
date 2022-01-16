const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let speed = 7;
const tileCount = 20;
const tileSize = canvas.width / tileCount - 1; 

let headX = 10;
let headY = 10;

let appleX = 5;
let appleY = 5;
let tailLength = 2;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const snakeParts = [];


class SnakePart {
    x: number;
    y: number;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

function drawGame(){

    changeSnakePosition();

    if(isGameOver()){

        return;
    }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    setTimeout(drawGame, 1000/speed);
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawSnake(){

    for (let i = 0; i < snakeParts.length; i++) {
        const part = snakeParts[i];

        ctx.fillStyle = "green";
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
        
    }

    snakeParts.push(new SnakePart(headX, headY));
    
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = "orange";
    //console.log(headX * tileCount, headY * tileCount, tileSize, tileSize);
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);

}

function checkAppleCollision(){
    if(headX === appleX && headY === appleY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function isGameOver(){
    let gameOver = false;

    if(headX < 0){
        gameOver = true;
    }

    else if (headY < 0){
        gameOver = true;
    }

    return gameOver;
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event: KeyboardEvent){
    
    //up
    if(event.key === "ArrowUp"){
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    else if(event.key === "ArrowDown"){
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    else if(event.key === "ArrowLeft"){
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    else if(event.key === "ArrowRight"){
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();