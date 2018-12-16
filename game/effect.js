
class Effect {
    constructor(sketch, x, y, metadata, callback=undefined) {
        this.sketch = sketch
        this.x = x
        this.y = y

        this.metadata = metadata;
        this.callback = callback? callback : () => {};
    }
}

class TileInfoCanvas extends Effect {
    constructor(sketch, tile) {
        super(sketch, 0, 0, {}, undefined);
        this._rect_data = [(window.state.map[0].length - 5) * 50, 50, 200, 250]
        this.new(tile);
    }

    new(tile) {
        let s = window.state;

        s.mouseSelector.updating = (x, y) => {
            return !(x > (s.map[0].length - 6) && x < (s.map[0].length) && y > 0 && y < 6);
        };

        this.tile = tile;
        this._die = false;
    }

    clear() {
        if (this.tile) this.tile.clear().update();
        this.tile = undefined
        this._die = true;

        let map = window.state.map;

        for (let y = 1; y < 6; y++) {
            for (let tile of map[y].slice(map[0].length - 6)) {
                tile.clear().update();
            }
        }
    }

    update() {
        if (!this.tile) return;

        this.sketch.push();

        this.sketch.noFill();
        this.sketch.stroke('yellow');
        this.sketch.strokeWeight(4)
        this.sketch.rect(this.tile.x * 50, this.tile.y * 50, 50, 50);
        this.sketch.fill(255);

        this.sketch.stroke(0);
        this.sketch.strokeWeight(1);

        let r = this._rect_data;

        this.sketch.rect(...this._rect_data);
        this.sketch.fill(0);
        this.sketch.text(JSON.stringify(this.tile.metadata), r[0], r[1] + 16, r[2], r[3]);

        this.sketch.pop();

        return this._die;
    }
}

class MouseEffect extends Effect {
    constructor(sketch, metadata) {
        super(sketch, 0, 0, metadata, undefined);

        this.x_ = Math.floor(this.sketch.mouseX / 50);
        this.y_ = Math.floor(this.sketch.mouseY / 50);

        this.callInto = () => {};
        this.updating = () => { return true; };
    }

    update() {
        let state = window.state;
        let x = Math.floor(this.sketch.mouseX / 50);
        let y = Math.floor(this.sketch.mouseY / 50);

        if (y < 0 || x < 0) return 0;
        if (!this.updating(x, y)) return 0;

        if (this.y_ != y || this.x_ != x) {
            let r = state.map[this.y_]

            if (r && r[this.x_]) r[this.x_].clear().update();

            this.y_ = y;
            this.x_ = x;
        }

        if (Object.is(state.tileInfo.tile, state.map[y][x])) return;

        if (y < state.map.length && x < state.map[0].length) {
            state.map[y][x].clear().update();
            return this.callInto(this, x, y);
        }
    }
}

export { Effect, MouseEffect, TileInfoCanvas };
