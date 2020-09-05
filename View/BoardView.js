class BoardView {
	constructor (game, flagsLogic) {
        this.game = game;
        this.flagsLogic = flagsLogic;
        this.boardFrame = document.getElementById("board-frame");
        this.resetVariables();
    }

    rightClickHandle = (id) => {
        if(this.game.rightClickHandle(this.mines, this.flagsLogic.flagsNum, this.flagsLogic.correctFlagsNum)) {
            this.flagsLogic.flagsCounter(this.board[id.x][id.y]);
            this.game.rightClickHandle(this.mines, this.flagsLogic.flagsNum, this.flagsLogic.correctFlagsNum);
        }
    }


    leftClickHandle = (isBomb, id) => {
        this.board[id.x][id.y].isClicked = true;
        if (!this.boardEnabled) {
            const nonBombPlaces = this.game.leftClickHandle(this.board, this.boardEnabled, id);
            this.board = bombsPlacing(this.board, this.mines, nonBombPlaces);
            this.boardEnabled = true;
        }
        if (this.game.isActive() && !this.board[id.x][id.y].isFlag) {
            if (isBomb) {
                this.game.loseCase();
                for (var i = 0; i < this.height; i++) {
                    for (var j = 0; j < this.width; j++) {
                        this.board[i][j].displayBlock(true);
                    }
                }
            } else {
                this.board[id.x][id.y].displayBlock(false);
                if (this.board[id.x][id.y].nearBombsNum === 0) {
                    nearButtonsCheck(id, this.leftClickHandle, this.board);
                }
            }
        }
        this.board[id.x][id.y].isClicked = false;
    }

    createBoard = () => {
        this.board = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            this.board[i] = new Array(this.width);
            for (let j = 0; j < this.width; j++) {
                let id = new BlockDTO(i, j);
                this.board[i][j] = new BlockView(id, this.leftClickHandle, this.rightClickHandle);
            }
        }
    }

    displayBoard = () => {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.boardFrame.appendChild(this.board[i][j].block);
            }
        }
    }

    resetVariables = () => {
        this.mines = Number(document.getElementById("mines").value);
        this.height = Number(document.getElementById("height").value);
        this.width = Number(document.getElementById("width").value);
        if ((this.mines > this.height * this.width) || this.mines > 200 || this.height > 100 || this.width > 100) {
            alert("Wrong variables values. Please enter validate values.")
        }
        else {
            this.boardFrame.innerHTML = "";
            this.firstClicked = false;
            this.boardEnabled = false;
            this.boardFrame.style.height = this.height * 55 + "px";
            this.boardFrame.style.width = this.width * 55 + "px";
            this.createBoard();
            this.displayBoard();
            this.game.resetVariables();
            this.flagsLogic.resetVariables();
        }
    }
}