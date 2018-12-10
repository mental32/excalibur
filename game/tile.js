let asset = (name) => { return 'https://raw.githubusercontent.com/mental32/excalibur/master/assets/' + name }

const _image_data = [
  ["tree", "https://i.imgur.com/UZQnx2N.png"],
  ["building", "https://i.imgur.com/SbFffO1.png"],
]

const _tile_images = new Map();

class Tile {
  static _loadImages(s) {
    for (let i = 0; i < _image_data.length; i++) {
      let data = _image_data[i];
      let image = s.loadImage(data[1]);

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

  clear() {
    this.sketch.push();
    this.sketch.stroke(255);
    this.sketch.fill(255);
    this.sketch.rect(this.x * 50, this.y * 50, 50, 50);
    this.sketch.pop();

    return this;
  }

}

class GrassTile extends Tile {
  update() {
    this.sketch.push();
    this.sketch.noStroke();
    this.sketch.fill('#573B0C');
    this.sketch.image(_tile_images.get("tree"), (this.x * 50) - 1, this.y * 50);
    this.sketch.pop();
  }
}

class BuildingTile extends Tile {
  update() {
    this.sketch.image(_tile_images.get("building"), this.x * 50, this.y * 50);
  }
}

class ColorTile extends Tile {
  update() {
    this.sketch.push();
    this.sketch.stroke(this.metadata.color);
    this.sketch.fill(this.metadata.color);
    this.sketch.rect(this.x, this.y, 50, 50);
    this.sketch.pop();
  }
}

class RoadTile extends Tile {
  update() {
    this.sketch.push();
    this.sketch.noStroke();
    this.sketch.fill(0);
    this.sketch.rect(this.x * 50, this.y * 50, 50, 50);
    this.sketch.fill(255);
    this.sketch.rect((this.x * 50) + 10, (this.y * 50) + 20, 30, 10);
    this.sketch.pop();
  }
}

export { Tile, GrassTile, BuildingTile, ColorTile, RoadTile };
