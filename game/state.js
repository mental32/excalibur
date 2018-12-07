import { Tile, GrassTile, BuildingTile, ColorTile } from "./tile.js"
import { RedscrollEffect, MouseEffect } from "./effect.js"
import { KeyReactor } from "./select.js"
import { statusBar } from "./status.js"

class gameState {
    constructor(sketch) {
        this.sketch = sketch;

        this.pending = [];
        this.map = [];
        this.effects = [];

        this._old_x = 0;
        this._old_y = 0;

        this.reactors = [
            new KeyReactor(this),
        ];

        this.reactorMode = 0;
        this.mouseSelector = undefined;

        let r = this.reactors[0];

        r.bindings.set(82, () => {
            this.mouseSelector.callInto = (s, x, y) => {
                sketch.push();
                sketch.fill('green');
                sketch.noStroke();
                sketch.rect(x * 50, y * 50, 50, 50);
                sketch.pop();
            };
        });

        this.x = 0;
        this.y = 0;
    }

    preload() {
        Tile._loadImages();
    }

    setup() {
        let sketch = this.sketch;

        sketch.createCanvas(sketch.windowWidth - 21, sketch.windowHeight - 20);

        let height = sketch.height;
        let width = sketch.width;

        let statusWidth = Math.floor(width / 50) * 50;

        this.statusBar = new statusBar(sketch, statusWidth, sketch.windowWidth - statusWidth);

        for (let col = 0; col < Math.floor(height / 50); col++) {
            let row_ = [];

            for (let row = 0; row < Math.floor(width / 50); row++) {
                row_.push(new GrassTile(sketch, row, col));
            }

            this.map.push(row_);
        }

        sketch.noStroke();

        this.blink();

        this.mouseSelector = new MouseEffect(this.sketch, { color: 'black'});

        this.mouseSelector.callInto = (s, x, y) => {
            sketch.push();
            sketch.noFill();
            sketch.stroke(s.metadata.color);
            sketch.rect(x * 50, y * 50, 50, 50);
            sketch.pop();
        }

        this.effects.push(this.mouseSelector);
    }

    keyPressed() {
        this.reactors[this.reactorMode].react(this.sketch.keyCode);
    }

    mouseClicked() {
        this.reactors.mouseClicked();

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
        for (let row of this.map) {
            for (let tile of row) {
                tile.update();
            };
        };
    }

    draw() {
        this.x = Math.floor(this.sketch.mouseX / 50);
        this.y = Math.floor(this.sketch.mouseY / 50);

        if (!this.pendingLock) {
            this.pendingLock = true;

            while (this.pending.length) {
                let item = this.pending.pop();
                if (item) item.update();
            }

            this.pendingLock = false;
        }

        let tmp = [];

        while (this.effects.length) {
            let effect = this.effects.pop();
            if (!effect.update()) {
                tmp.push(effect);
            } else {
                effect.callback();
            }
        }

        this.effects.push.apply(this.effects, tmp);
    }
}

export { gameState };
