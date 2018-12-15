function selectCallInto(s, x, y) {
    let sketch = window.state.sketch;

    sketch.push();
    sketch.noFill();
    sketch.stroke(s.metadata.color);
    sketch.rect(x * 50, y * 50, 50, 50);
    sketch.pop();
}

function bindKeyTile(state, tile, fillColor) {
    let sketch = state.sketch;

    return () => {
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

export { bindKeyTile, selectCallInto };
