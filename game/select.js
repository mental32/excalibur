
class KeyReactor {
	constructor() {
		this.bindings = new Map();
	}

	react(key) {
		return this.bindings.get(key)()
	}
}

export { KeyReactor };
