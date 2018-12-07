
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
    constructor(sketch, metadata) {
        super(sketch, 0, 0, metadata, undefined);

        this.x_ = Math.floor(this.sketch.mouseX / 50);
        this.y_ = Math.floor(this.sketch.mouseY / 50);

        this.callInto = () => {};
    }

    update() {
        let x = Math.floor(this.sketch.mouseX / 50);
        let y = Math.floor(this.sketch.mouseY / 50);

        if (y < 0 || x < 0) return 0;

        if (this.y_ != y || this.x_ != x) {
            let t = window.state.map[this.y_][this.x_];
            if (t) t.clear().update();
            this.y_ = y;
            this.x_ = x;
        }

        if (y < window.state.map.length && x < window.state.map[0].length) {
            window.state.map[y][x].clear().update();
            return this.callInto(this, x, y);
        }
    }
}

export { Effect, RedscrollEffect, MouseEffect };
