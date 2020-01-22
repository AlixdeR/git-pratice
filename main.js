var snakeDiv = document.createElement("div");
snakeDiv.id = "snake";
snakeDiv.style.gridColumnStart = "5";
snakeDiv.style.gridRowStart = "5";
document.getElementById("grid").appendChild(snakeDiv);

var setInt;
var setIntBoris;
var setIntPint;
var checkInterval2;
var checkInterval;
var win = false;

const snake = {
    x: Number(document.getElementById("snake").style.gridRowStart),
    y: Number(document.getElementById("snake").style.gridColumnStart),
    direction: "N"
}

var btnStartDiv = document.createElement("button");
btnStartDiv.classList.add("btn");
btnStartDiv.textContent = "START THE GAME";
document.getElementById("right-side").appendChild(btnStartDiv);

var btnStopDiv = document.createElement("button");
btnStopDiv.classList.add("btn");
btnStopDiv.textContent = "RESET THE GAME";
document.getElementById("right-side").appendChild(btnStopDiv);

var btnRules = document.createElement("button");
btnRules.classList.add("btn");
btnRules.textContent = "WTF IS THAT GAME?";
document.getElementById("right-side").appendChild(btnRules);

var btnEasy = document.createElement("button");
btnEasy.classList.add("btn");
btnEasy.textContent = "EASY";
document.getElementById("levels-btn").appendChild(btnEasy);

var btnMedium = document.createElement("button");
btnMedium.classList.add("btn");
btnMedium.textContent = "MEDIUM";
document.getElementById("levels-btn").appendChild(btnMedium);

var btnHard = document.createElement("button");
btnHard.classList.add("btn");
btnHard.textContent = "HARD";
document.getElementById("levels-btn").appendChild(btnHard);

var score = 0;

var scoreDiv = document.createElement("div");
scoreDiv.id = "score";
scoreDiv.innerHTML = `YOUR SCORE<br><br>${score}`;
document.getElementById("left-side").appendChild(scoreDiv);

function gameOverHidden() {
    document.getElementById("img-boris").style.visibility = "hidden";
    document.getElementById("gif-game-over").style.visibility = "hidden";
    document.getElementById("finish").style.visibility = "hidden";
    window.location.reload();
}

function gameOver() {
    clearInterval(setInt);
    clearInterval(setIntBoris);
    clearInterval(setIntPint);
    clearInterval(checkInterval);
    clearInterval(checkInterval2);
    document.getElementById("finish").style.visibility = "visible";
    document.getElementById("img-boris").style.visibility = "visible";
    document.getElementById("gif-game-over").style.visibility = "visible";
    setTimeout(gameOverHidden, 3000);
}

function youWinHidden(){
    document.getElementById("gif-you-win").style.visibility = "hidden";
    document.getElementById("img-duke").style.visibility = "hidden";
    document.getElementById("finish").style.visibility = "hidden";
    window.location.reload();
}

function youWin() {
    clearInterval(setInt);
    clearInterval(setIntBoris);
    clearInterval(setIntPint);
    clearInterval(checkInterval);
    clearInterval(checkInterval2);
    document.getElementById("finish").style.visibility = "visible";
    document.getElementById("img-duke").style.visibility = "visible";
    document.getElementById("gif-you-win").style.visibility = "visible";
    setTimeout(youWinHidden, 3000);
}

function intervalID() {
    if (snake.x > 1 && snake.direction === "N") {
        document.getElementById("snake").style.gridRowStart--;
        snake.x--;
    } else if (snake.x < 10 && snake.direction === "S") {
        document.getElementById("snake").style.gridRowStart++;
        snake.x++;
    } else if (snake.y > 1 && snake.direction === "W") {
        document.getElementById("snake").style.gridColumnStart--;
        snake.y--;
    } else if (snake.y < 10 && snake.direction === "E") {
        document.getElementById("snake").style.gridColumnStart++;
        snake.y++;
    } else {
        gameOver();
    }
}

function moveForward() {
    if (snake.x > 1) {
        document.getElementById("snake").style.gridRowStart--;
        snake.x--;
        snake.direction = "N";
    } else {
        gameOver();
    }
}

function moveBackwards() {
    if (snake.x < 10) {
        document.getElementById("snake").style.gridRowStart++;
        snake.x++;
        snake.direction = "S";
    } else {
        gameOver();
    }
}

function moveLeft() {
    if (snake.y > 1) {
        document.getElementById("snake").style.gridColumnStart--;
        snake.y--;
        snake.direction = "W";
    } else {
        gameOver();
    }
}

function moveRight() {
    if (snake.y < 10) {
        document.getElementById("snake").style.gridColumnStart++;
        snake.y++;
        snake.direction = "E";
    } else {
        gameOver();
    }
}

document.onkeydown = function (e) {
    if (e.code === "ArrowRight") {
        moveRight();
    } else if (e.code === "ArrowLeft") {
        moveLeft();
    } else if (e.code === "ArrowUp") {
        moveForward();
    } else if (e.code === "ArrowDown") {
        moveBackwards();
    } else {
        return;
    }
}


function createPint() {
    var pintDiv = document.createElement("div");
    pintDiv.id = "pint"
    pintDiv.style.width = "60px";
    pintDiv.style.height = "60px";
    pintDiv.style.backgroundImage = "url('./images/pint.png')";
    pintDiv.style.gridRowStart = Math.floor(Math.random() * 10);
    pintDiv.style.gridColumnStart = Math.floor(Math.random() * 10);
    document.getElementById("grid").appendChild(pintDiv);
}

function removePint() {
    document.getElementById("pint").remove();
}

function checkColWithPints() {
    var pint = {
        x: Number(document.getElementById("pint").style.gridRowStart),
        y: Number(document.getElementById("pint").style.gridColumnStart)
    }
    if (snake.x === pint.x && snake.y === pint.y) {
        score++;
        console.log(score);
        scoreDiv.innerHTML = `YOUR SCORE<br><br>${score}`;
        removePint();
        createPint();
    }
    if (score === 10 && !win) {
        win = true;
        youWin();
    }
}

function pintToCatch() {
    createPint();
    checkInterval2 = setInterval(checkColWithPints, 1);
    setTimeout(removePint, 3000);
}

function createBoris() {
    var borisDiv = document.createElement("div");
    borisDiv.id = "boris";
    borisDiv.style.width = "60px";
    borisDiv.style.height = "60px";
    borisDiv.style.backgroundImage = "url('./images/boris.png')";
    borisDiv.style.gridRowStart = Math.floor(Math.random() * 10);
    borisDiv.style.gridColumnStart = Math.floor(Math.random() * 10);
    document.getElementById("grid").appendChild(borisDiv);
}

function removeBoris() {
    document.getElementById("boris").remove();
}

function checkColWithBoris() {
    var boris = {
        x: Number(document.getElementById("boris").style.gridRowStart),
        y: Number(document.getElementById("boris").style.gridColumnStart)
    }
    if (snake.x === boris.x && snake.y === boris.y) {
        removeBoris();
        gameOver();

    }
}

function borisToAvoid() {
    createBoris();
    checkInterval = setInterval(checkColWithBoris, 1);
    setTimeout(removeBoris, 3000);
}

btnStopDiv.onclick = function () {
    clearInterval(setInt);
    clearInterval(setIntBoris);
    clearInterval(setIntPint);
    window.location.reload();
}

function hideBtnStart() {
    document.getElementById("levels").style.visibility = "hidden";
}

btnStartDiv.onclick = function () {
    document.getElementById("levels").style.visibility = "visible";
    setTimeout(hideBtnStart, 5000);
}

btnEasy.onclick = function () {
    document.getElementById("levels").style.visibility = "hidden";
    setInt = setInterval(intervalID, 1500);
    setIntBoris = setInterval(borisToAvoid, 2000);
    setIntPint = setInterval(pintToCatch, 1000);
}

btnMedium.onclick = function () {
    document.getElementById("levels").style.visibility = "hidden";
    setInt = setInterval(intervalID, 1000);
    setIntBoris = setInterval(borisToAvoid, 1000);
    setIntPint = setInterval(pintToCatch, 2000);
}

btnHard.onclick = function () {
    document.getElementById("levels").style.visibility = "hidden";
    setInt = setInterval(intervalID, 500);
    setIntBoris = setInterval(borisToAvoid, 500);
    setIntPint = setInterval(pintToCatch, 3000);
}

function hideRules() {
    document.getElementById("rules").style.visibility = "hidden";
}

btnRules.onclick = function openRules() {
    document.getElementById("rules").style.visibility = "visible";
    setTimeout(hideRules, 30000);
}