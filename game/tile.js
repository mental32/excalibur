import { Sprite } from "./sprite.js"

let asset = (name) => { return 'https://raw.githubusercontent.com/mental32/excalibur/master/assets/' + name }

const _image_data = [
  ["tree", asset("tree.png")],
  ["building", asset("building.png")],
]

const _tile_images = new Map();

class Tile {
  static _loadImages() {
    for (let i = 0; i < _image_data.length; i++) {
      let data = _image_data[i];
      let image = window.state.sketch.loadImage(data[1]);

      image.resize(50, 0);
      _tile_images.set(data[0], image)
    }

    console.log(_tile_images);
  }

  constructor(sketch, x, y, metadata) {
    this.sketch = sketch;
    this.x = x;
    this.y = y;
    this.metadata = metadata;
  }
}

class GrassTile extends Tile {
  update() {
    this.sketch.image(_tile_images.get("tree"), this.x * 50, this.y * 50);
  }
}

class BuildingTile extends Tile {
  update() {
    this.sketch.image(_tile_images.get("building"), this.x * 50, this.y * 50);
  }
}

class ColorTile extends Tile {
  update() {
    this.sketch.fill(this.metadata.color);
    this.sketch.rect(this.x, this.y, 50, 50);
  }
}

export { Tile, GrassTile, BuildingTile };
