var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var speed = 7;
var tileCount = 20;
var tileSize = canvas.width / tileCount - 1;
var headX = 10;
var headY = 10;
var appleX = 5;
var appleY = 5;
var tailLength = 2;
var xVelocity = 0;
var yVelocity = 0;
var score = 0;
var snakeParts = [];
var SnakePart = /** @class */ (function () {
    function SnakePart(x, y) {
        this.x = x;
        this.y = y;
    }
    return SnakePart;
}());
function drawGame() {
    clearScreen();
    changeSnakePosition();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
}
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
    for (var i = 0; i < snakeParts.length; i++) {
        var part = snakeParts[i];
        ctx.fillStyle = "green";
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle = "orange";
    //console.log(headX * tileCount, headY * tileCount, tileSize, tileSize);
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
function checkAppleCollision() {
    if (headX === appleX && headY === appleY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}
document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
    //up
    if (event.key === "ArrowUp") {
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    else if (event.key === "ArrowDown") {
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    else if (event.key === "ArrowLeft") {
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    else if (event.key === "ArrowRight") {
        yVelocity = 0;
        xVelocity = 1;
    }
}
drawGame();
