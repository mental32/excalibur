
class Effect {
	constructor(sketch, x, y, metadata, callback=undefined) {
		this.sketch = sketch
		this.x = x
		this.y = y

		this.metadata = metadata;

		if (callback === undefined) {
			this.callback = () => {};
		} else {
			this.callback = callback;
		}
	}
}

class RedscrollEffect extends Effect{
	update() {
		this.sketch.fill(255, 0, 0);
		this.sketch.rect(this.x * 50, this.y * 50, 50, this.metadata.height)
		this.metadata.height += 1

		return this.metadata.height >= 50;
	}
}

class MouseEffect extends Effect {
	constructor(sketch, metadata, callback=undefined) {
		super(sketch, 0, 0, metadata, callback);
	}
}

class MouseSelectEffect extends MouseEffect {
	update() {
		this.sketch.push();
		this.sketch.fill(this.metadata.color);
		this.sketch.rect(Math.floor(this.sketch.mouseX / 50) * 50, Math.floor(this.sketch.mouseX / 50) * 50, 50, 50);
		this.sketch.pop();
	}
}

export { Effect, RedscrollEffect, MouseSelectEffect};
