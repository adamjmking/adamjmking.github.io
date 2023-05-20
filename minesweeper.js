var board = [];
var rows = 8;
var columns = 8;

var minesCount = 2;
var minesLocation = [];

var tilesClicked = 0;
var flagEnabled = false;

var gameOver = false;

window.onload = function() {
    setMines();
    startGame();
}

function setMines() {
    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft--;
        }
    }
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);

    // populate board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function setFlag() {
    if (gameOver) return;

    flagEnabled = !flagEnabled;
    document.getElementById("flag-button").style.backgroundColor = flagEnabled ? "lightgreen" : "lightcoral";
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) return;

    let tile = this;

    if (flagEnabled) {
        if (tile.innerText == "") tile.innerText = "🚩";
        else if (tile.innerText == "🚩") tile.innerText = "";

        return;
    }
    
    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        revealMines();
        alert("GAME OVER");
        return;
    }

    let coord = tile.id.split("-"); // "1-0" -> ["1", "0"]
    let r = parseInt(coord[0]);
    let c = parseInt(coord[1]);
    checkMines(r, c);
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "lightcoral";
            }
        }
    }
}

function checkMines(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) return;
    if (board[r][c].classList.contains("tile-clicked")) return;

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let num = 0;

    // top 3
    num += checkTile(r-1, c-1);
    num += checkTile(r-1, c);
    num += checkTile(r-1, c+1);

    // sides
    num += checkTile(r, c-1);
    num += checkTile(r, c+1);

    // bottom 3
    num += checkTile(r+1, c-1);
    num += checkTile(r+1, c);
    num += checkTile(r+1, c+1);
    
    if (num > 0) {
        board[r][c].innerText = num;
        board[r][c].classList.add("x" + num.toString());
    }
    else {
        // top 3
        checkMines(r-1, c-1);
        checkMines(r-1, c);
        checkMines(r-1, c+1);

        // sides
        checkMines(r, c-1);
        checkMines(r, c+1);

        // bottom 3
        checkMines(r+1, c-1);
        checkMines(r+1, c);
        checkMines(r+1, c+1);
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) return 0;

    if (minesLocation.includes(r.toString() + "-" + c.toString())) return 1;
    else return 0;
}