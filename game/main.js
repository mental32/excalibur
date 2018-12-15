import { gameState } from "./state.js"

const _events = [
	'mouseClicked',
	'mouseDragged',
	'keyPressed',
	'preload',
	'setup',
	'draw',
]

window.p5 = new p5((sketch) => {
	let state = new gameState(sketch);
	let registerEvent = (k) => { sketch[k] = () => { return state[k]() }};

	window.state = state;

	for (let eventName of _events)
		registerEvent(eventName);

}, document.getElementById('game'));
