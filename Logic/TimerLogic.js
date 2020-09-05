class TimerLogic {
	constructor () {
        this.timerInterval = null;
        this.startDate = null;
        this.value = 0;
        this.pictures = [];
        this.timerButtons = document.getElementById("timer-buttons");
    }

    timerDisplay = () => {
        let number = Number(new Date() - this.startDate);
        let count = 0;
        let arr = [];
        while (number > 10) {
            let n = number % 10;
            number = Math.floor(number / 10);
            arr.push(n);
            count++;
        }
        let n = number % 10;
        number = Math.floor(number / 10);
        arr.push(n);
        count++;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < this.pictures.length; j++) {
                this.pictures[j].src = timeImgs[arr.pop()];
                count--;
            }
            while (count > 0) {
                this.pictures.push(document.createElement("img"));
                this.pictures[this.pictures.length-1].src = timeImgs[arr.pop()];
                this.timerButtons.appendChild(this.pictures[this.pictures.length-1]);
                count--;
            }
        }
    }

    start = () => {
        if (this.timerInterval === null) {
            this.startDate = new Date();
            this.timerInterval = setInterval(this.timerDisplay, 1); 
        }
    }
    
    stop = () => {
        clearInterval(this.timerInterval);
    }

    resetVariables = () => {
        this.flagsNum = 0;
		this.correctFlagsNum = 0;
        this.timerInterval = null;
        this.value = 0;
        this.pictures = [];
        this.timerButtons.innerHTML = '';
    }
}