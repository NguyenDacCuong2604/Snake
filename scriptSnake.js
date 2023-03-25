const startScreen = document.getElementById("start-screen");
const boardgame = document.getElementById("boardgame");
const canvas = document.getElementById("canvas");
//button setting
const setting = document.getElementById("imageButton");
//header setting
const header = document.getElementById("header-setting");
const ctx = canvas.getContext("2d");
//score
const scoreLabel = document.getElementById("numscore");
const score = document.getElementById("score");
//image táo
var image = new Image();
image.src = "Image/food.png";
var imageGrapes = new Image();
imageGrapes.src = "Image/grapes.png";
var imageBanana = new Image();
imageBanana.src = "Image/banana.png";
var imageMango = new Image();
imageMango.src = "Image/mango.png";
var imagePeach = new Image();
imagePeach.src = "Image/peach.png";
var imageStrawberry = new Image();
imageStrawberry.src = "Imagestrawberry.png";
let listFruits = [imageGrapes, imageBanana, imageMango, imagePeach, imageStrawberry];
// Nhạc nền
const musicSound = new Audio('Music/music.mp3');
var musicCheckbox = document.getElementById("music-checkbox");
var musicSettingCheckbox = document.getElementById("music-setting-checkbox");
//button tiếp tục
var continueButton = document.getElementById("continuebutton");
//button trang chủ
var homeButton = document.getElementById("homebutton");
//button nextlevel
var nextlevelButton = document.getElementById("nextlevel");
//button reset
var resetButton = document.getElementById("resetbutton");
let isMusic = false;
//số cột, dòng và size từng ô
const col = 30;
const row = 20;
const cellSize = 30;
//matrix boardgame
let matrix = [];
//Thức ăn
let food;
//Cổng win
let gateWin;
//biến check draw hay không
let timeout = null;
let isDraw = true;
//set time đếm ngược
var count = 3;
var countIntervalId = null;
//time game
var timeGame;
var gameIntervalId = null;
var labeltimegame = document.getElementById("labelTimeGame");
var timegameLabel = document.getElementById("time-game");
// create snake
let snake;
let head; //Đầu con rắn
//Hướng đi của snake
let direction;
//THời gia nhạy phím
let lastPress;
//Level
let levelArray = ["1", "2", "3", "4", "5", "6"];
let levelGame = 0;
//score
let numberScore = 15;
//kiểm tra win
let checkWin = true;
//level4 sinh ton
let timeLeft = 10; // thời gian còn lại ban đầu là 10s
const timerBar = document.getElementById("timer-bar");
const timeContainer = document.getElementById("timer-container");
intervalIdHungry = null;
//level5 an trai cay
let fruits = [];
let numberApple = 0;
let randomFruit1;
let numFruit1 = 0;;
let randomFruit2;
let numFruit2 = 0;
var labelFruits = document.getElementById("fruits");
var muctieuFruits = document.getElementById("fruit-game");
var timeFruits;
var fruitsIntervalId = null;
const timeFruitsLabel = document.getElementById("time-lable-fruits");
const countFruits = document.getElementById("time-fruits");
//level6. kho

// Viết sự kiện bàn phím di chuyển rắn
// a, arrow left: Left
// s, arrow down: Down
// d, arrow right: Right
// w, arrow up: Up

document.addEventListener("keydown", event => {
    const now = Date.now();
    const elapsed = now - lastPress;
    if (countIntervalId == null) {
        if (elapsed > 70) {
            switch (event.key) {
                case "ArrowUp":
                    if (direction !== "down") {
                        direction = "up";
                    }
                    break;
                case "ArrowDown":
                    if (direction !== "up") {
                        direction = "down";
                    }
                    break;
                case "ArrowLeft":
                    if (direction !== "right") {
                        direction = "left";
                    }
                    break;
                case "ArrowRight":
                    if (direction !== "left") {
                        direction = "right";
                    }
                    break;
                case "w":
                    if (direction !== "down") {
                        direction = "up";
                    }
                    break;
                case "s":
                    if (direction !== "up") {
                        direction = "down";
                    }
                    break;
                case "a":
                    if (direction !== "right") {
                        direction = "left";
                    }
                    break;
                case "d":
                    if (direction !== "left") {
                        direction = "right";
                    }
                    break;
            }
            lastPress = now;
        }
    }
});
// set up the game loop
function gameLoop() {
    if (isDraw) {
        // move the snake
        if (checkWin) {
            head = { x: snake[0].x, y: snake[0].y };
            switch (direction) {
                case "up":
                    head.y -= 1;
                    break;
                case "down":
                    head.y += 1;
                    break;
                case "left":
                    head.x -= 1;
                    break;
                case "right":
                    head.x += 1;
                    break;
            }
            snake.unshift(head);
        }

        if (head.x < 0) {
            head.x = col - 1;
        }
        if (head.x >= col) {
            head.x = 0;
        }
        if (head.y < 0) {
            head.y = row - 1;
        }
        if (head.y >= row) {
            head.y = 0;
        }
        // Kiểm tra va chạm tường hay không
        if (matrix[head.y][head.x] === 1) {
            loseGame();
        }
        //level5
        if (levelGame == 4 || levelGame == 5) {
            for (let i = 0; i < fruits.length; i++) {
                if (fruits[i] != null && head.x === fruits[i].x && head.y === fruits[i].y) {
                    if (i == randomFruit1) {
                        numFruit1++;
                        updateFruitsLabel();
                    }
                    else if (i == randomFruit2) {
                        numFruit2++;
                        updateFruitsLabel();
                    }
                    fruits[i] = null;
                }
            }
        }
        // Kiểm tra rắn có ăn mồi hay không
        if (food != null && head.x === food.x && head.y === food.y) {
            //score
            if (levelGame == 3 || levelGame == 5) {
                timeLeft = 10;
                timerBar.style.transform = `scaleX(${1})`;
            }
            if (levelGame == 4 || levelGame == 5) {
                numberApple += 1;
                if (numberApple > 0 && numberApple % 2 == 0) {
                    createFruits();
                    timeFruits = 6;
                    countFruits.innerHTML = timeFruits;
                    timeFruits -= 1;
                    timeFruitsLabel.style.display = 'inline';
                    clearInterval(fruitsIntervalId);
                    countTimeFruits();
                }
            }
            if (numberScore > 1) {
                food = createFood();
                numberScore -= 1;
            }
            else {
                numberScore -= 1;
                gateWin = createFood();
                if (levelGame == 5) {
                    food = createFood();
                }
                else {
                    food = null;
                }
            }

        }
        else if (gateWin != null && head.x === gateWin.x && head.y === gateWin.y) {
            checkWin = false;
            snake.pop();
        }
        else {
            snake.pop();
        }

        // Check conflict
        if (checkConflict()) {
            loseGame();
        }
        // Check win
        if (snake.length == 0) {
            if (levelGame == 5) {
                if (numFruit1 >= 1 && numFruit2 >= 2) {
                    winGame();
                }
                else {
                    loseGame();
                }
            }
            else {
                winGame();
            }

        }
        draw();
        // schedule the next frame
        timeout = setTimeout(gameLoop, 70);
    }
}
function loseGame() {
    header.innerText = "You Lose!!!";
    settingDiv.style.display = 'block';
    overlay.style.display = 'block';
    gateWin = false;
    checkWin = true;
    isDraw = false;
    if (gameIntervalId != null) {
        clearInterval(gameIntervalId);
        gameIntervalId = null;
    }
    continueButton.disabled = true;
    if (levelGame == 5) {
        nextlevelButton.disabled = true;
    }
}
function winGame() {
    header.innerText = "You Win!!!";
    settingDiv.style.display = 'block';
    overlay.style.display = 'block';
    gateWin = false;
    checkWin = true;
    isDraw = false;
    continueButton.disabled = true;
    if (levelGame == 5) {
        nextlevelButton.disabled = true;
    }
}
//checkbox music
musicCheckbox.addEventListener("change", function () {
    if (musicCheckbox.checked) {
        isMusic = true;
        // Bật nhạc
        console.log("Bat nhac")
        musicSound.play();
    } else {
        isMusic = false;
        // Tắt nhạc
        console.log("Tat nhac")
        musicSound.pause();
    }
    updateCheckboxMusic();
});
//checkbox music in setting
musicSettingCheckbox.addEventListener("change", function () {
    if (musicSettingCheckbox.checked) {
        isMusic = true;
        // Bật nhạc
        console.log("Bat nhac")
        musicSound.play();
    } else {
        isMusic = false;
        // Tắt nhạc
        console.log("Tat nhac")
        musicSound.pause();
    }
    updateCheckboxMusic();
})
//function update music
function updateCheckboxMusic() {
    if (isMusic) {
        musicCheckbox.checked = true;
        musicSettingCheckbox.checked = true;
    }
    else {
        musicCheckbox.checked = false;
        musicSettingCheckbox.checked = false;
    }
}
//function dem thoi gian hungry cua snake
function timeHungry() {
    intervalIdHungry = setInterval(() => {
        if (isDraw) {
            if (timeLeft <= 0) {
                clearInterval(intervalIdHungry);
                // xử lý game over   
                loseGame();
                return;
            }
            timeLeft -= 1;
            const percentageLeft = (timeLeft / 10) * 100;
            timerBar.style.transform = `scaleX(${percentageLeft / 100})`;
        }
    }, 1000);
}
//function dem thoi gian ton tai cua fruits
function countTimeFruits() {
    fruitsIntervalId = setInterval(() => {
        if (isDraw) {
            countFruits.innerHTML = timeFruits;
            timeFruits--;
            if (timeFruits < 0) {
                clearInterval(fruitsIntervalId);
                nullFruits();
                timeFruitsLabel.style.display = 'none';
            }
        }
    }, 1000);
}
//function create null fruits
function nullFruits() {
    for (let i = 0; i < fruits.length; i++) {
        fruits[i] = null;
    }
}
//function dem thoi gian game
function countDown() {
    gameIntervalId = setInterval(() => {
        if (isDraw) {
            timegameLabel.innerHTML = timeGame;
            timeGame--;
            if (timeGame < 0) {
                clearInterval(gameIntervalId);
                if (levelGame == 2 || levelGame == 5) {
                    loseGame();
                }
                else if (levelGame == 4) {
                    if (numFruit1 >= 1 && numFruit2 >= 2) {
                        winGame();
                    }
                    else {
                        loseGame();
                    }
                }
            }
        }
    }, 1000);
}
// nhấn setting 
var settingDiv = document.getElementById('setting');
var overlay = document.getElementById('overlay');
setting.addEventListener('click', function () {
    header.innerText = "Setting";
    settingDiv.style.display = 'block';
    overlay.style.display = 'block';
    isDraw = false;
    if (timeout != null) {
        clearTimeout(timeout);
        timeout = null;
    }
    if (countIntervalId != null) {
        clearInterval(countIntervalId);
        countIntervalId = null;
        count = 3;
    }
    if (gameIntervalId != null) {
        clearInterval(gameIntervalId);
        gameIntervalId = null;
    }
    if (intervalIdHungry != null) {
        clearInterval(intervalIdHungry);
        intervalIdHungry = null;
    }
    if (fruitsIntervalId != null) {
        clearInterval(fruitsIntervalId);
        fruitsIntervalId = null;
    }
    if (levelGame == 5) {
        nextlevelButton.disabled = true;
    }
});
//button continue
continueButton.addEventListener('click', function () {
    settingDiv.style.display = 'none';
    overlay.style.display = 'none';
    isDraw = true;
    start();
})
//button home
homeButton.addEventListener('click', function () {
    scoreLabel.style.display = 'inline';
    labeltimegame.style.display = 'none';
    timeContainer.style.display = 'none';
    settingDiv.style.display = 'none';
    overlay.style.display = 'none';
    startScreen.style.display = "flex";
    boardgame.style.display = "none";
    setting.style.display = "none";
    timeFruitsLabel.style.display = 'none';
    labelFruits.style.display = 'none';
    timeout = null;
    isDraw = true;
})
//button reset
resetButton.addEventListener('click', function () {
    if (levelGame == 2) {
        timeGame = 60;
    }
    else if (levelGame == 4) {
        timeGame = 45;
        nullFruits();
    }
    numberScore = 15;
    timeLeft = 10;
    settingDiv.style.display = 'none';
    overlay.style.display = 'none';
    timeFruitsLabel.style.display = 'none';
    isDraw = true;
    continueButton.disabled = false;
    level(levelArray[levelGame]);
})
//buttion nextlevel
nextlevelButton.addEventListener('click', function () {
    // timeGame = 60;
    settingDiv.style.display = 'none';
    overlay.style.display = 'none';
    timeFruitsLabel.style.display = 'none';
    isDraw = true;
    continueButton.disabled = false;
    if (levelGame + 1 == 2) {
        labeltimegame.style.display = 'inline';
    }
    else if (levelGame + 1 == 3) {
        labeltimegame.style.display = 'none';
        timeContainer.style.display = 'inline';
    }
    else if (levelGame + 1 == 4) {
        timeContainer.style.display = 'none';
    }
    else if (levelGame + 1 == 5) {
        labelFruits.style.display = 'none';
        score.style.display = 'inline';
        timeFruitsLabel = 'none';
    }
    level(levelArray[levelGame + 1]);
})

// Chọn Level
var levelButtons = document.querySelectorAll(".level-button");
levelButtons.forEach(function (button) {
    button.addEventListener("click", selectLevel);
});
//Join Board game
function joinBoardgame() {
    startScreen.style.display = "none";
    boardgame.style.display = "block";
    setting.style.display = "block";
    canvas.width = 900;
    canvas.height = 600;
}
// funciton chọn level
function selectLevel() {
    // Lấy giá trị của nút level được nhấn
    var levelNumber = this.getAttribute("data-level");
    level(levelNumber);
}
function level(levelNumber) {
    joinBoardgame();
    // Switch case chọn level
    switch (levelNumber) {
        case "1":
            // Level 1
            numberScore = 15;
            levelGame = levelArray.indexOf(levelNumber);
            //create matrix boardgame
            matrix = wallMatrix(levelNumber);
            //create snake
            snake = [
                { x: 10, y: 10 },
                { x: 9, y: 10 },
                { x: 8, y: 10 },
            ];
            // head snake
            head = { x: snake[0].x, y: snake[0].y };
            // create food for snake
            food = createFood();
            // direction of snake
            direction = "right";
            // độ tiếp nhận của bàn phím
            lastPress = 0;
            start();
            break;
        case "2":
            // Level 2
            numberScore = 15;
            levelGame = levelArray.indexOf(levelNumber);
            //create matrix boardgame
            matrix = wallMatrix(levelNumber);
            //create snake
            snake = [
                { x: 10, y: 10 },
                { x: 9, y: 10 },
                { x: 8, y: 10 },
            ];
            // head snake
            head = { x: snake[0].x, y: snake[0].y };
            // create food for snake
            food = createFood();
            // direction of snake
            direction = "right";
            // độ tiếp nhận của bàn phím
            lastPress = 0;
            start();
            break;
        case "3":
            // Level 3
            labeltimegame.style.display = 'inline';
            numberScore = 15;
            timeGame = 60;
            levelGame = levelArray.indexOf(levelNumber);
            //create matrix boardgame
            matrix = wallMatrix("2");
            //create snake
            snake = [
                { x: 10, y: 10 },
                { x: 9, y: 10 },
                { x: 8, y: 10 },
            ];
            // head snake
            head = { x: snake[0].x, y: snake[0].y };
            // create food for snake
            food = createFood();
            // direction of snake
            direction = "right";
            // độ tiếp nhận của bàn phím
            lastPress = 0;
            start();
            break;
        case "4":
            // Level 4
            timeContainer.style.display = 'inline';
            timeLeft = 10;
            timerBar.style.transform = `scaleX(${1})`;
            numberScore = 15;
            levelGame = levelArray.indexOf(levelNumber);
            //create matrix boardgame
            matrix = wallMatrix(levelNumber);
            //create snake
            snake = [
                { x: 10, y: 10 },
                { x: 9, y: 10 },
                { x: 8, y: 10 },
            ];
            // head snake
            head = { x: snake[0].x, y: snake[0].y };
            // create food for snake
            food = createFood();
            // direction of snake
            direction = "right";
            // độ tiếp nhận của bàn phím
            lastPress = 0;
            start();
            break;
        case "5":
            // Level 5
            scoreLabel.style.display = 'none';
            labeltimegame.style.display = 'inline';
            labelFruits.style.display = 'inline';
            randomFruit();
            updateFruitsLabel();
            timeGame = 45;
            levelGame = levelArray.indexOf(levelNumber);
            //create matrix boardgame
            matrix = wallMatrix("4");
            //create snake
            snake = [
                { x: 10, y: 10 },
                { x: 9, y: 10 },
                { x: 8, y: 10 },
            ];
            // head snake
            head = { x: snake[0].x, y: snake[0].y };
            // create food for snake
            food = createFood();
            // direction of snake
            direction = "right";
            // độ tiếp nhận của bàn phím
            lastPress = 0;
            start();
            break;
        case "6":
            // Level 6
            // ăn 10 quả táo
            numberScore = 10;
            // set thời gian game 60s
            labeltimegame.style.display = 'inline';
            timeGame = 60;
            //thời gian đói của rắn
            timeContainer.style.display = 'inline';
            timeLeft = 10;
            timerBar.style.transform = `scaleX(${1})`;
            //vật phẩm
            labelFruits.style.display = 'inline';
            randomFruit();
            updateFruitsLabel();
            //tạo map game(khó)
            matrix = wallMatrix("1");
            //level game
            levelGame = levelArray.indexOf(levelNumber);
            //create snake
            snake = [
                { x: 6, y: 10 },
                { x: 5, y: 10 },
                { x: 4, y: 10 },
            ];
            // head snake
            head = { x: snake[0].x, y: snake[0].y };
            // create food for snake
            food = createFood();
            // direction of snake
            direction = "right";
            // độ tiếp nhận của bàn phím
            lastPress = 0;
            //create game
            start();
            break;
    }
}
//updateLabel level 5
function updateFruitsLabel() {
    const img1 = document.createElement('img');
    img1.src = listFruits[randomFruit1].src;
    img1.style = "max-width: 100%; max-height: 24px;";
    const img2 = document.createElement('img');
    img2.src = listFruits[randomFruit2].src;
    img2.style = "max-width: 100%; max-height: 24px;";
    muctieuFruits.innerHTML = numFruit1 + "/1" + img1.outerHTML + " và " + numFruit2 + "/2" + img2.outerHTML;
}
//kich thuoc 30x20
function draw() {
    if (numberScore >= 0) {
        score.innerText = numberScore;
    }
    else {
        score.innerText = 0;
    }
    if (levelGame == 2 || levelGame == 4 || levelGame == 5) {
        timegameLabel.innerHTML = timeGame;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the background
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (matrix[i][j] === 0) {
                ctx.fillStyle = "#212121";
            }
            else if (matrix[i][j] === 1) {
                ctx.fillStyle = "#FF5722";
            }

            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);

        }
    }
    ctx.fillStyle = "#4CAF50";
    snake.forEach(cell => {
        ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    });
    //draw the headsnake
    ctx.fillStyle = "LightGreen";
    ctx.fillRect(head.x * cellSize, head.y * cellSize, cellSize, cellSize);
    // draw the food 
    if (food != null) {
        ctx.drawImage(image, food.x * cellSize, food.y * cellSize, cellSize, cellSize);
    }
    // draw gateWin
    if (gateWin != null) {
        ctx.fillStyle = "White";
        ctx.fillRect(gateWin.x * cellSize, gateWin.y * cellSize, cellSize, cellSize);
    }
    //level5,  draw fruits
    if (levelGame == 4 || levelGame == 5) {
        for (let i = 0; i < 5; i++) {
            if (fruits[i] != null) {
                ctx.drawImage(listFruits[i], fruits[i].x * cellSize, fruits[i].y * cellSize, cellSize, cellSize);
            }
        }
    }
}
//hiển thị thời gian đếm ngược
function start() {
    draw();
    ctx.font = "bold 72px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(count.toString(), canvas.width / 2, canvas.height / 2);
    count--;
    // Hiển thị số đếm
    countIntervalId = setInterval(function () {
        if (count > -1) {
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
            ctx.font = "bold 72px Arial";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText(count.toString(), canvas.width / 2, canvas.height / 2);
            count--;
        } else {
            // Xóa bỏ hàm đếm ngược
            clearInterval(countIntervalId);
            countIntervalId = null;
            count = 3;
            // Bắt đầu vẽ canvas
            setTimeout(gameLoop(), 1000);
            if (levelGame == 2) {
                timeGame -= 1;
                countDown();
            }
            else if (levelGame == 3) {
                timeLeft -= 1;
                timeHungry();
            }
            else if (levelGame == 4) {
                timeGame -= 1;
                countDown();
                countTimeFruits();
            }
            else if (levelGame == 5) {
                timeGame -= 1;
                countDown();
                timeLeft -= 1;
                timeHungry();
                countTimeFruits();
            }
        }
    }, 1000);
}

// function tạo thức ăn, tạo ra thức ăn xuất hiện không trùng với snake và với bức tường
function createFood() {
    let createFood = { x: Math.floor(Math.random() * col), y: Math.floor(Math.random() * row) };
    while (containsPoint(snake, createFood)) {
        createFood = { x: Math.floor(Math.random() * col), y: Math.floor(Math.random() * row) };
    }
    return createFood;
}
//function tạo trái cây làm nhiệm vụ
function createFruits() {
    for (let i = 0; i < 5; i++) {
        let fruit = { x: Math.floor(Math.random() * col), y: Math.floor(Math.random() * row) };
        while (containsPointFruits(snake, fruits, fruit)) {
            fruit = { x: Math.floor(Math.random() * col), y: Math.floor(Math.random() * row) };
        }
        fruits[i] = fruit;
    }
}
//function random nhiệm vụ fruit
function randomFruit() {
    randomFruit1 = Math.floor(Math.random() * 5);
    randomFruit2 = Math.floor(Math.random() * 5);
    while (randomFruit1 == randomFruit2) {
        randomFruit2 = Math.floor(Math.random() * 5);
    }
    numFruit1 = 0;
    numFruit2 = 0;
}
function containsPointFruits(points, fruits, p) {
    if (matrix[p.y][p.x] === 1) {
        return true;
    }
    for (let i = 0; i < points.length; i++) {
        if (points[i].x === p.x && points[i].y === p.y) {
            return true;
        }
    }
    for (let j = 0; j < fruits.length; j++) {
        if (fruits[j] != null && fruits[j].x === p.x && fruits[j].y === p.y) {
            return true;
        }
    }
    return false;
}
//Kiểm tra xem điểm p có trùng với points hay là tường hay không, có trả về true, không trả về false
function containsPoint(points, p) {
    if (matrix[p.y][p.x] === 1) {
        return true;
    }
    for (let i = 0; i < points.length; i++) {
        if (points[i].x === p.x && points[i].y === p.y) {
            return true;
        }
    }
    return false;
}
//Kiểm tra sự va chạm giữa đầu rắn và thân rắn
function checkConflict() {
    if (snake.length != 0) {
        let head = { x: snake[0].x, y: snake[0].y };
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
    }
    return false;

}
function wallMatrix(level) {
    const wallmatrix = [];
    if (level === "1") {
        for (let i = 0; i < row; i++) {
            wallmatrix[i] = new Array(col).fill(0);
        }
    }
    else if (level === "2") {
        for (let i = 0; i < row; i++) {
            wallmatrix[i] = new Array(col).fill(0);
            if (i === 0 || i === row - 1) {
                // Thêm 2 bức tường trên dưới
                wallmatrix[i] = new Array(col).fill(1);
            }
        }
        // Thêm 2 bức tường 2 bên
        for (let i = 0; i < 6; i++) {
            wallmatrix[i][0] = 1;
            wallmatrix[row - 1 - i][0] = 1;
            wallmatrix[i][col - 1] = 1;
            wallmatrix[row - 1 - i][col - 1] = 1;
        }
    }
    else if (level === "4") {
        for (let i = 0; i < row; i++) {
            wallmatrix[i] = new Array(col).fill(0);
            if (i === 0 || i === row - 1) {
                // Thêm 2 bức tường trên dưới
                wallmatrix[i] = new Array(col).fill(1);
            }
        }
        // Thêm 2 bức tường 2 bên
        for (let i = 0; i < 6; i++) {
            wallmatrix[i][0] = 1;
            wallmatrix[row - 1 - i][0] = 1;
            wallmatrix[i][col - 1] = 1;
            wallmatrix[row - 1 - i][col - 1] = 1;
        }
        //
        for (let i = 7; i < col - 7; i++) {
            wallmatrix[5][i] = 1;
            wallmatrix[row - 6][i] = 1;
        }
    }
    else if (level === "3") {
        for (let i = 0; i < row; i++) {
            wallmatrix[i] = new Array(col).fill(0);
            if (i === 0 || i === row - 1) {
                // Thêm bức tường ở hàng đầu tiên và hàng cuối cùng
                wallmatrix[i] = new Array(col).fill(1);
            } else {
                // Thêm bức tường xếp chéo
                const j = Math.floor((i / row) * col);
                wallmatrix[i][j] = 1;
            }
        }
    }
    else if (level === "5") {
        for (let i = 0; i < row; i++) {
            wallmatrix[i] = new Array(col).fill(0);
            if (i === 0 || i === row - 1) {
                // Thêm bức tường ở hàng đầu tiên và hàng cuối cùng
                wallmatrix[i] = new Array(col).fill(1);
            } else {
                // Thêm bức tường
                for (let j = 0; j < col; j++) {
                    if (Math.random() < 0.2) {
                        wallmatrix[i][j] = 1;
                    }
                }
            }
        }
    }
    return wallmatrix;
}
