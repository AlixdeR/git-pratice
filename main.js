var snakeDiv = document.createElement("div");
snakeDiv.id = "snake";
snakeDiv.style.gridColumnStart = "5";
snakeDiv.style.gridRowStart = "5";
document.getElementById("grid").appendChild(snakeDiv);

var setInt;
var setIntBoris;
var setIntPint;
var checkInterval2 = [];
var checkInterval = [];
var win = false;

var snake = {
    x: Number(document.getElementById("snake").style.gridRowStart),
    y: Number(document.getElementById("snake").style.gridColumnStart),
    direction: "N"
};

var gridDiv = document.getElementById("grid");
var levelsDiv = document.getElementById("levels");
var rulesDiv = document.getElementById("rules");

var gifGameOver = document.getElementById("gif-game-over");
var ImgBoris = document.getElementById("img-boris");
var gifYouWin = document.getElementById("gif-you-win");
var ImgDuke = document.getElementById("img-duke");
var finishTemplate =  document.getElementById("finish");

var btnStartDiv = document.createElement("button");
btnStartDiv.classList.add("btn");
btnStartDiv.textContent = "START THE GAME";
document.getElementById("right-side").appendChild(btnStartDiv);

var btnCloseStart = document.createElement("button");
btnCloseStart.classList.add("btn-close");
btnCloseStart.textContent = "X";
document.getElementById("levels").appendChild(btnCloseStart);

var btnStopDiv = document.createElement("button");
btnStopDiv.classList.add("btn");
btnStopDiv.textContent = "RESET THE GAME";
document.getElementById("right-side").appendChild(btnStopDiv);

var btnRules = document.createElement("button");
btnRules.classList.add("btn");
btnRules.textContent = "WTF IS THAT GAME?";
document.getElementById("right-side").appendChild(btnRules);

var btnCloseRules = document.createElement("button");
btnCloseRules.classList.add("btn-close");
btnCloseRules.textContent = "X";
document.getElementById("rules").appendChild(btnCloseRules);

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
    ImgBoris.style.visibility = "hidden";
    gifGameOver.style.visibility = "hidden";
    finishTemplate.style.visibility = "hidden";
    window.location.reload();
}

function gameOver() {
    clearInterval(setInt);
    clearInterval(setIntBoris);
    clearInterval(setIntPint);
    finishTemplate.style.visibility = "visible";
    ImgBoris.style.visibility = "visible";
    gifGameOver.style.visibility = "visible";
    setTimeout(gameOverHidden, 3000);
}

function youWinHidden(){
    gifYouWin.style.visibility = "hidden";
    ImgDuke.style.visibility = "hidden";
    finishTemplate.style.visibility = "hidden";
    window.location.reload();
}

function youWin() {
    clearInterval(setInt);
    clearInterval(setIntBoris);
    clearInterval(setIntPint);
    finishTemplate.style.visibility = "visible";
    ImgDuke.style.visibility = "visible";
    gifYouWin.style.visibility = "visible";
    setTimeout(youWinHidden, 3000);
} 

function moveForward() {
    if (snake.x > 1) {
        snakeDiv.style.gridRowStart--;
        snake.x--;
        snake.direction = "N";
        checkColWithBoris();
        checkColWithPints();
    } else {
        gameOver();
    }
}

function moveBackwards() {
    if (snake.x < 10) {
        snakeDiv.style.gridRowStart++;
        snake.x++;
        snake.direction = "S";
        checkColWithBoris();
        checkColWithPints();
    } else {
        gameOver();
    }
}

function moveLeft() {
    if (snake.y > 1) {
        snakeDiv.style.gridColumnStart--;
        snake.y--;
        snake.direction = "W";
        checkColWithBoris();
        checkColWithPints();
    } else {
        gameOver();
    }
}

function moveRight() {
    if (snake.y < 10) {
        snakeDiv.style.gridColumnStart++;
        snake.y++;
        snake.direction = "E";
        checkColWithBoris();
        checkColWithPints();
    } else {
        gameOver();
    }
}

function intervalID() {
    if (snake.direction === "N") {
        moveForward();
    } else if (snake.direction === "S") {
        moveBackwards();
    } else if (snake.direction === "W") {
        moveLeft();
    } else if (snake.direction === "E") {
        moveRight();
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
};

function createPint() {
    var pintDiv = document.createElement("div");
    pintDiv.classList.add("pints");
    pintDiv.style.width = "60px";
    pintDiv.style.height = "60px";
    pintDiv.style.backgroundImage = "url('./images/pint.png')";
    pintDiv.style.gridRowStart = (Math.floor(Math.random() * 9))+1;
    pintDiv.style.gridColumnStart = (Math.floor(Math.random() * 9))+1;
    gridDiv.appendChild(pintDiv);
}

function removePint() {
    document.querySelector(".pints").remove();
}

function checkColWithPints() {
    var pintElements = document.querySelectorAll(".pints");
    pintElements.forEach(function(pintElement) {
        var pint = {
            x: Number(pintElement.style.gridRowStart),
            y: Number(pintElement.style.gridColumnStart)
        };
    
        if (snake.x === pint.x && snake.y === pint.y) {
        score++;
        scoreDiv.innerHTML = `YOUR SCORE<br><br>${score}`;
        pintElement.remove();
        createPint();
        }
    });

    if (score === 10 && !win) {
        win = true;
        youWin();
    }
}

function pintToCatch() {
    createPint();
    setTimeout(removePint, 4000);
}

function createBoris() {
    var borisDiv = document.createElement("div");
    borisDiv.classList.add("boris");
    borisDiv.style.width = "60px";
    borisDiv.style.height = "60px";
    borisDiv.style.backgroundImage = "url('./images/boris.png')";
    borisDiv.style.gridRowStart = (Math.floor(Math.random() * 9))+1;
    borisDiv.style.gridColumnStart = (Math.floor(Math.random() * 9))+1;
    gridDiv.appendChild(borisDiv);
}

function removeBoris() {
    document.querySelector(".boris").remove();
}

function checkColWithBoris() {
    var borisElements = document.querySelectorAll(".boris");
    borisElements.forEach(function(borisElement) {
        var boris = {
            x: Number(borisElement.style.gridRowStart),
            y: Number(borisElement.style.gridColumnStart)
        };

        if (snake.x === boris.x && snake.y === boris.y) {
            borisElement.remove();
            gameOver();
        }
    });
}

function borisToAvoid() {
    createBoris();
    setTimeout(removeBoris, 3000);
}

btnStopDiv.onclick = function () {
    window.location.reload();
};

btnStartDiv.onclick = function () {
    levelsDiv.style.visibility = "visible";
};

btnCloseStart.onclick = function closeStart() {
    levelsDiv.style.visibility = "hidden";
};

function launchDrawLoop(rateHat, rateBoris, ratePint) {
    levelsDiv.style.visibility = "hidden";
    setInt = setInterval(intervalID, rateHat);
    setIntBoris = setInterval(borisToAvoid, rateBoris);
    setIntPint = setInterval(pintToCatch, ratePint);
}

btnEasy.onclick = function () {
    launchDrawLoop(1000, 2000, 2000);
};


btnMedium.onclick = function () {
    launchDrawLoop(1000, 1000, 3000);
};

btnHard.onclick = function () {
    launchDrawLoop(500, 500, 3000);
};

btnRules.onclick = function openRules() {
    rulesDiv.style.visibility = "visible";
};

btnCloseRules.onclick = function closeRules() {
    rulesDiv.style.visibility = "hidden";
};