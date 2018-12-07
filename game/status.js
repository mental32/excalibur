
const images = {};

class statusBar {
    constructor(sketch, x, w) {
        this.sketch = sketch;

        images.banknote = sketch.loadImage("https://i.imgur.com/wisW8vD.png");

        this.w = w;
        this.x = x;

        this.sketch.image(images.banknote, this.x, 10);
    }

    update() {
        this.sketch.push();
        this.sketch.fill(0);
        this.sketch.pop();
    }
}

export { statusBar };
