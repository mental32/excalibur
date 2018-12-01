import { Tile, GrassTile, BuildingTile, ColorTile } from "./tile.js"
import { RedscrollEffect, MouseSelectEffect } from "./effect.js"
import { KeyReactor } from "./select.js"

class gameState {
    constructor(sketch) {
        this.sketch = sketch;

        this.pending = [];
        this.map = [];
        this.effects = [];

        this._old_x = 0;
        this._old_y = 0;

        this.reactors = [
            new KeyReactor(sketch),
            new KeyReactor(sketch),
        ];

        this.reactorMode = 0;

        this.reactors[0].bindings.set(82, () => {
            let e = new MouseSelectEffect(this.sketch, { color: (0, 0, 255)});
            this.effects.push(e)
        })

        this.x = 0
        this.y = 0
    }

    preload() {
        Tile._loadImages();
    }

    setup() {
        this.sketch.createCanvas(this.sketch.windowWidth - 21, this.sketch.windowHeight - 20);

        let height = this.sketch.height;
        let width = this.sketch.width;

        for (let col = 0; col < Math.floor(height / 50); col++) {
            let row_ = [];

            for (let row = 0; row < Math.floor(width / 50); row++) {
                row_.push(new GrassTile(this.sketch, row, col));
            }

            this.map.push(row_);
        }

        this.blink();
    }

    keyPressed() {

    }

    mouseClicked() {
        // let t = new BuildingTile(this.sketch, this.x, this.y, {});

        // this.map[this.y][this.x] = t;
        // this.pending.push(t);

        let x = this.x;
        let y = this.y;

        let e = new RedscrollEffect(this.sketch, x, y, {height: 0});

        this.effects.push(e)

        e.callback = () => {
            this.map[y][x].clear();
            this.map[y][x] = new ColorTile(this.sketch, x * 50, y * 50, { color: '#573B0C' });
            this.pending.push(this.map[y][x]);
        }

        return false;
    }

    mouseDragged() {
        this.map[this.y][this.x].clear();

        let t = new BuildingTile(this.sketch, this.x, this.y, {});

        this.map[this.y][this.x] = t;
        this.pending.push(t);

        return false;
    }

    blink() {
        for (let y = 0; y != this.map.length; y++) {
            let row = this.map[y];

            for (let tile of row) {
                tile.update();
            };
        }
    }

    draw() {
        this.x = Math.floor(this.sketch.mouseX / 50);
        this.y = Math.floor(this.sketch.mouseY / 50);

        if (!this.pendingLock) {
            this.pendingLock = true;

            while (this.pending.length) {
                let t = this.pending.pop();
                if (t) t.update();
            }

            this.pendingLock = false;
        }

        let toClean = 0;
        for (let e = 0; e < this.effects.length; e++) {
            if (this.effects[e].update()) {
                this.effects[e].callback();
                this.effects[e] = undefined;
                toClean += 1;
            }
        }

        if (toClean) {
            this.effects = this.effects.filter((v, i, a) => {
            return v != undefined
            })
        }
    }
}

export { gameState };
