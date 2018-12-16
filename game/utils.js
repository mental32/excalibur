let asset = (name) => { return 'https://raw.githubusercontent.com/mental32/excalibur/master/assets/' + name }

function selectCallInto(s, x, y) {
    let sketch = window.state.sketch;
    let state = window.state;

    let c = (Object.is(state.tileInfo.tile, state.map[y][x]))? 'yellow' : s.metadata.color;

    sketch.push();
    sketch.noFill();
    sketch.stroke(c);
    sketch.rect(x * 50, y * 50, 50, 50);
    sketch.pop();
}

function bindKeyTile(state, tile, fillColor) {
    let sketch = state.sketch;

    return () => {
        state.reactor.react(81);
        state.mouseClickCallback = () => {
            let cb = state.map[state.y][state.x].clear().destroy();

            let t = new tile(state.sketch, state.x, state.y, {});

            state.map[state.y][state.x] = t;
            state.pending.push(t);

            if (cb) cb();
        };

        state.mouseSelector.callInto = (s, x, y) => {
            sketch.push();
            sketch.fill(fillColor);
            sketch.noStroke();
            sketch.rect(x * 50, y * 50, 50, 50);
            sketch.pop();
        };
    };
}

export { bindKeyTile, selectCallInto, asset };
