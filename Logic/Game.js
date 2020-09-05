class Game {
	constructor (flagsLogic, face) {
        // Use left and right click handlers
        this.face = face;
        this.flagsLogic = flagsLogic;
        this.gameActive = true;
        this.gameWon = false;
        this.timerLogic = new TimerLogic();
    }

    rightClickHandle = (mines, flagsNum, correctFlagsNum) => {
        if (this.gameActive && !this.gameWon) {
            this.startGame();
            this.winCheck(mines, flagsNum, correctFlagsNum);
            return true;
        }
        return false;
    }

    leftClickHandle = (board, boardEnabled, id) => {
        return getNonBombPlaces(board, boardEnabled, id);
    }

    isActive = () => {
        if (this.gameActive) {
            this.startGame();
        }
        return this.gameActive;
    }

    startGame = () => {
        this.timerLogic.start();
    }

    loseCase = () => {
        this.face.src = "face-pictures/lose.png";
        this.gameActive = false;
        this.timerLogic.stop();
    }
    
    winCheck = (mines, flagsNum, correctFlagsNum) => {
        console.log(mines === flagsNum, mines === correctFlagsNum);
        if (mines === flagsNum && mines === correctFlagsNum) {
            this.gameWon = true;
            this.timerLogic.stop();
            this.face.src = "face-pictures/win.png";
        }
    }

    resetVariables = () => {
        this.timerLogic.stop();
        this.face.src = "face-pictures/smile.png";
        this.gameActive = true;
        this.gameWon = false;
        this.flagsLogic.resetVariables();
        this.timerLogic.resetVariables();
    }	
}