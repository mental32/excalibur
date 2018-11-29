const state = new gameState();

window.mouseDragged = () => {
    state.mouseDragged();
}

window.preload = () => {
	state.preload();
}

window.keyPressed = () => {
	state.keyPressed();
}

window.setup = () => {
	state.setup();
}

window.draw = () => {
	state.draw();
}
