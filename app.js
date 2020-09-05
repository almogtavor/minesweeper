class App {
	constructor () {
		this.face = document.getElementById("face");
		this.face.addEventListener("click", this.resetGame);
	}

	firstLoad = () => {
		this.flagsLogic = new FlagsLogic();
		this.game = new Game(this.flagsLogic, this.face);
		this.boardView = new BoardView(this.game, this.flagsLogic);
	}

	resetGame = () => {
		this.boardView.resetVariables();
	}
}

window.onload = () => {
	const app1 = new App();
	app1.firstLoad();
}
