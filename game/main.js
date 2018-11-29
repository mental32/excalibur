const state = new gameState();

window.mouseDragged = () => {
    state.mouseDragged();
}

function preload() {
    state.preload();
}

function keyPressed() {
    state.keyPressed();
}

function setup() {
    state.setup();
}

function draw() {
    state.draw();
}
