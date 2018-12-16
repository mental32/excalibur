import { asset } from "./utils.js"

var _loaded;

const _image_data = [
  ["tree", asset("tree.png")],
  ["building", asset("building.png")],
]

const _tile_images = new Map();

class Tile {
  static preload(s) {
    if (_loaded) return;

    for (let i = 0; i < _image_data.length; i++) {
      let data = _image_data[i];
      let image = s.loadImage(data[1]);

      image.resize(50, 0);
      _tile_images.set(data[0], image)
    }

    _loaded = true;

    console.log(_tile_images);
  }

  constructor(sketch, x, y, metadata) {
    this.sketch = sketch;
    this.x = x;
    this.y = y;

    this.metadata = metadata;
    this.identify(metadata);
  }

  identify(data) {}

  clear() {
    this.sketch.push();
    this.sketch.stroke(255);
    this.sketch.fill(255);

    if (Object.is(this, window.state.tileInfo.tile)) {
      this.sketch.rect((this.x * 50) - 3, (this.y * 50) - 3, 54, 54);
    } else {
      this.sketch.rect((this.x * 50) - 1, (this.y * 50) - 1, 51, 51);
    }

    this.sketch.pop();

    return this;
  }

  destroy() {
    console.log('Unhandled destroy!', this);
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

const _connectionCallback = [
  (r) => { return [(r.x * 50) + 20, (r.y * 50), 10, 30] },
  (r) => { return [(r.x * 50) + 20, (r.y * 50) + 25, 10, 30] },
  (r) => { return [(r.x * 50), (r.y * 50) + 20, 30, 10] },
  (r) => { return [(r.x * 50) + 25, (r.y * 50) + 20, 30, 10] },
];

class RoadTile extends Tile {
  constructor(sketch, x, y, metadata) {
    super(sketch, x, y, metadata);

    let m = window.state.map;

    this._connections = [
      (y - 1 < 0)           ? undefined : m[y - 1][x],
      (y + 1 <= m.length)   ? undefined : m[y + 1][x],
      (x - 1 < 0)           ? undefined : m[y][x - 1],
      (x + 1 <= m[y].length)? undefined : m[y][x + 1]
    ];

    this.updateConnections();
  }

  destroy() {
    let fl = this._connections.filter((i) => { i instanceof RoadTile });

    for (let conn in fl) {
      for (let i = 0; i < conn._connections.length; i++) {
        let _conn = conn._connections[i];

        if (Object.is(_conn, this))
          conn._connections[i] = undefined;
      }

      conn.updateConnections();

    }

  }

  update() {
    this.sketch.push();
    this.sketch.noStroke();
    this.sketch.fill(0);
    this.sketch.rect(this.x * 50, this.y * 50, 50, 50);

    this.sketch.fill(255);

    for (let closure of this._drawConnections) {
      closure();
    }

    this.sketch.pop();
  }

  updateConnections() {
    this._drawConnections = [
      () => { this.sketch.rect((this.x * 50) + 20, (this.y * 50) + 20, 10, 10) }
    ];

    for (let i = 0; i < this._connections.length; i++) {
      let conn = this._connections[i];

      if (conn instanceof RoadTile) {
        let I = (i % 2) ? i - 1: i + 1;
        let i_args = _connectionCallback[i](this);
        let I_args = _connectionCallback[I](conn);

        this._drawConnections.push(() => {
          this.sketch.rect(...i_args);
          this.sketch.rect(...I_args);
        });
      }
    };
  }
}

export { Tile, GrassTile, BuildingTile, ColorTile, RoadTile };
