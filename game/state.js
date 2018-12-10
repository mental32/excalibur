import { Tile, GrassTile, BuildingTile, ColorTile, RoadTile } from "./tile.js"
import { RedscrollEffect, MouseEffect } from "./effect.js"
import { KeyReactor } from "./select.js"
import { statusBar } from "./status.js"
import { buildTile, selectCallInto } from "./state_macro.js"

class gameState {
    constructor(sketch) {
        this.sketch = sketch;

        this.pending = [];
        this.map = [];
        this.effects = [];

        this._old_x = 0;
        this._old_y = 0;

        this.mouseClickCallback = () => {};

        this.reactors = [
            new KeyReactor(this),
        ];

        this.reactorMode = 0;
        this.mouseSelector = undefined;

        let r = this.reactors[0];

        r.bindings.set(81, () => {
            this.mouseClickCallback = () => {};
            this.mouseSelector.callInto = selectCallInto;
        });

        r.bindings.set(66, buildTile(this, BuildingTile, 'blue'));
        r.bindings.set(82, buildTile(this, RoadTile, 'green'));

        this.x = 0;
        this.y = 0;
    }

    preload() {
        Tile._loadImages(this.sketch);
        statusBar.preload(this.sketch);
    }

    setup() {
        let sketch = this.sketch;

        sketch.createCanvas(sketch.windowWidth - 21, sketch.windowHeight - 20);

        let height = sketch.height;
        let width = sketch.width;

        let statusWidth = Math.floor(width / 50) * 50;

        this.statusBar = new statusBar(sketch, 0, sketch.windowHeight - 100, sketch.windowWidth);

        for (let col = 0; col < Math.floor(height / 50) - 1; col++) {
            let row_ = [];

            for (let row = 0; row < Math.floor(width / 50); row++) {
                row_.push(new GrassTile(sketch, row, col));
            }

            this.map.push(row_);
        }

        sketch.noStroke();

        this.blink();

        this.mouseSelector = new MouseEffect(sketch, { color: 'black'});
        this.mouseSelector.callInto = selectCallInto;
        this.effects.push(this.mouseSelector);
    }

    keyPressed() {
        this.reactors[this.reactorMode].react(this.sketch.keyCode);
    }

    mouseClicked() {
        this.mouseClickCallback();
        return false;
    }

    mouseDragged() {
        this.mouseClickCallback();
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

        this.statusBar.update();
    }
}

export { gameState };
