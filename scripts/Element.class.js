const BLOCKS = [
    [[0, 0], [0, 1], [0, 2], [0, 3]],
    [[0, 0], [0, 1], [0, 2], [1, 2]],
    [[0, 0], [0, 1], [0, 2], [1, 0]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 1], [0, 2], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [0, 2], [1, 1]],
    [[0, 0], [0, 1], [1, 1], [1, 2]]
];

export class Element {
    constructor() {
        this.index = Math.floor(Math.random() * 7),
        this.block = BLOCKS[this.index];
    }
}
