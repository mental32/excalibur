
class KeyReactor {
    constructor(state) {
        this.state = state;
        this.bindings = new Map();
    }

    react(key) {
        let h = this.bindings.get(key);

        switch(h) {
            case undefined: {
                return 0;
            };

            default: {
                return h();
            };
        };
    }
}

export { KeyReactor };
