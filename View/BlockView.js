class BlockView {
	constructor (id, leftClickHandler, rightClickHandler) {
        this.leftClickHandler = leftClickHandler;
        this.rightClickHandler = rightClickHandler;
        this.isBomb = false;
        this.isClicked = false;
        this.isFlag = false;
        this.isFlagged = false;
        this.isRevealed = false;
        this.id = id;
        this.nearBombsNum = 0;
        this.block = document.createElement("img");
        this.eventListeners();
        this.displayBlock()
    }

    rightClick = (event) => {
        event.preventDefault();
        this.rightClickHandler(this.id);
	}

    leftClick = () => {
        this.leftClickHandler(this.isBomb, this.id);
    }

    eventListeners = () => {
        this.block.addEventListener("contextmenu", this.rightClick);
        this.block.addEventListener("click", this.leftClick);
    }

    displayBlock = (gameLost) => {
        if (this.isBomb && gameLost) {
            this.isRevealed = true;
            if (this.isClicked) {
                this.render(bombClickedBlockImg);
            } else {
                this.render(unclickedBombImg);
            }
        } else if (this.isFlag) {
                this.render(flagImg);
            if (gameLost) {
                this.render(wrongFlagImg);
            }
        } else if (this.isClicked) {
            this.isRevealed = true;
            this.render(blockImgs[this.nearBombsNum]);
        } else if (!this.isRevealed) {
            this.render(emptyBlockImg);
        }
    }

    render = (src) => {
        this.block.src = src;
    }
}