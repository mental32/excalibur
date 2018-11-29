asset = (name) => { return 'localhost:80/assets/' + name }

const _gameState_color_map = [
    () => { fill(0, 255, 0) },
    () => { fill(255, 0, 0) },
]

class gameState {
    constructor() {
        this.items = [];
        this.x = 0
        this.y = 0
    }

    preload() {

        this.images = {
            grass: loadImage("https://abs.twimg.com/emoji/v1/72x72/1f332.png"),
        }
    }

    setup() {
        createCanvas(windowWidth - 21, windowHeight - 20);

        for (let col = 0; col < Math.floor(height / 50); col++) {
            let row = [];

            for (let r = 0; r < Math.floor(width / 50); r++) {
                row.push(new entity(createSprite(-50, -50, 50, 50), "grass"));
                row[row.length - 1].addImage(this.images.grass);
            }

            this.items.push(row);
        }

        console.log(this.items)
        state.blink();
    }

    keyPressed() {

    }

    mouseDragged() {
        this.items[this.y][this.x] = 1;
        return false;
    }

    blink() {
        for (let y = 0; y != this.items.length; y++) {
            let row = this.items[y];
            let x = 0;

            for (let block of row) {

                block.sprite.position.x = x;
                block.sprite.position.y = y * 50;

                x += 50;
            }
        }
        drawSprites();
    }

    draw() {
        this.x = Math.floor(mouseX / 50);
        this.y = Math.floor(mouseY / 50);

        this.blink()

        // drawSprites();/
    }
}
