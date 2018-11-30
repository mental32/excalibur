const state = new gameState();

window.p5 = new p5((sketch) => {
	let state = new gameState(sketch);

	window.state = state;

	sketch.mouseClicked = () => {
		state.mouseClicked()
	}

	sketch.mouseDragged = () => {
		state.mouseDragged();
	}

	sketch.preload = () => {
		state.preload();
	}

	sketch.keyPressed = () => {
		state.keyPressed();
	}

	sketch.setup = () => {
		state.setup();
	}

	sketch.draw = () => {
		state.draw();
	}
}, document.getElementById('game'));
