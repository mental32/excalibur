import { asset } from "./utils.js"

var _image, _loaded;

class statusBar {
    constructor(sketch, city, x, y, w) {
        this.sketch = sketch;
        this.city = city;

        this.w = w;

        this.x = x;
        this.y = y;
    }

    static preload(s) {
        if (_loaded) return;
        _image = s.loadImage("https://i.imgur.com/wisW8vD.png");
        _loaded = true;
    }

    update() {
        this.sketch.push();

        this.sketch.image(_image, this.x, this.y);

        this.sketch.stroke(0);
        this.sketch.rect(this.x + 50, this.y, 100, 50);
        this.sketch.textSize(16);
        this.sketch.text(this.city.funds, this.x + 75, this.y + 30)

        this.sketch.pop();
    }
}

export { statusBar };
