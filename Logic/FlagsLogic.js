class FlagsLogic {
	constructor () {
		this.flagLeft = document.getElementById("flag-left");
        this.flagMiddle = document.getElementById("flag-middle");
        this.flagRight = document.getElementById("flag-right");
		this.flagsNum = 0;
		this.correctFlagsNum = 0;
	}

	flagsCounter = (blockObj) => {
		this.flagPlacing(blockObj);
		this.displayFlagsCount(timeImgs[(this.flagsNum % 10)],
			timeImgs[(Math.floor(this.flagsNum / 10) % 10)],
			timeImgs[Math.floor(this.flagsNum / 100)]);
	}

	flagPlacing = (blockObj) => {
		if (!blockObj.isFlag && !blockObj.isRevealed) {
			this.flagMarking(blockObj);
		}
		else if (blockObj.isFlag) {
			this.flagErasing(blockObj);
		}
	}
	
	flagErasing = (blockObj) => {
		blockObj.isFlag = false;
		blockObj.displayBlock();
		this.flagsNum--;
		if (blockObj.isBomb) {
			this.correctFlagsNum--;
		}
	}
	
	flagMarking = (blockObj) => {
		blockObj.isFlag = true;
		blockObj.displayBlock();
		this.flagsNum++;
		if (blockObj.isBomb) {
			this.correctFlagsNum++;
		}
	}

	displayFlagsCount = (srcRight, srcMiddle, srcLeft) => {
		this.render(srcRight, srcMiddle, srcLeft);
    }

    render = (srcRight, srcMiddle, srcLeft) => {
        this.flagRight.src = srcRight;
		this.flagMiddle.src = srcMiddle;
		this.flagLeft.src = srcLeft;
    }

	resetVariables = () => {
		this.flagsNum = 0;
		this.correctFlagsNum = 0;
		this.displayFlagsCount(timeImgs[0], timeImgs[0], timeImgs[0]);
	}
}