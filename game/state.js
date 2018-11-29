asset = (name) => { return 'localhost:80/assets/' + name }

const _gameState_color_map = [
    () => { fill(0, 255, 0) },
    () => { fill(255, 0, 0) },
]

class gameState {
    constructor() {
        this.pending = [];
        this.items = [];
        this.effects = [];
        this.select = [];
        this.x = 0
        this.y = 0
    }

    preload() {
        this.images = {
            grass: loadImage("https://abs.twimg.com/emoji/v1/72x72/1f332.png"),
            building: loadImage("https://i.imgur.com/wcqbfPG.png")
        }
    }

    setup() {
        createCanvas(windowWidth - 21, windowHeight - 20);

        for (let col = 0; col < Math.floor(height / 50); col++) {
            let row = [];

            for (let r = 0; r < Math.floor(width / 50); r++) {
                let s = createSprite(-50, -50, 50, 50);
                row.push(new entity(s, "grass"));
                s.addImage(this.images.grass);
            }

            this.items.push(row);
        }

        console.log(this.items)
        state.blink();
    }

    keyPressed() {
        if (keyCode === 88) {
            noLoop();
            while (this.select.length) {
                let xy = this.select.pop();
                console.log(xy)

                this.effects[xy[2]] = () => {
                    push();
                    fill(255);
                    rect(xy[0] * 50, xy[1] * 50, 50, 50);
                    pop();
                };
            }
            loop();
        }
    }

    mouseDragged() {
        console.log(this.x, this.y)
        let tile = this.items[this.y][this.x];

        if (tile.type === "grass") {
            let x = this.x, y = this.y;
            this.effects.push(() => {
                push();
                fill(0, 255, 0);
                rect(x * 50, y * 50, 50, 50);
                pop();
            });

            this.select.push([x, y, this.effects.length - 1]);
        }

        return false;
    }

    blink() {
        for (let y = 0; y != this.items.length; y++) {
            let row = this.items[y];
            let x = 0;

            for (let block of row) {
                if (block != undefined) {
                    block.sprite.position.x = x;
                    block.sprite.position.y = y * 50;
                } else {
                    push();
                    fill(255);
                    rect(x, y, 50, 50);
                    pop();
                }
                x += 50;
            };
        }
    }

    draw() {
        this.x = Math.floor(mouseX / 50);
        this.y = Math.floor(mouseY / 50);

        this.blink()

        drawSprites();

        for (let effect of this.effects) {
            effect()
        }
    }
}
