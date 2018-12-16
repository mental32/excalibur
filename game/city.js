import { Vehicle, Citizen } from "./entity.js"

class City {
	constructor(state) {
		this.state = state;
		this.sketch = state.sketch;

		this.funds = 20000
	}

	update() {
		// loop over all tiles and perform business logic of the game.

		for (let tile of this.state.tiles()) {

		}

	}

}

export { City };
