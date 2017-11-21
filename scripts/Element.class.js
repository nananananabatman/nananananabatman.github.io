import {GameBoard} from './GameBoard.class';

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

    canAddToBoard() {
        let canAdd = true;

        this.block.forEach(item => canAdd = canAdd && GameBoard.tryAddBlock(item));

        return canAdd;
    }

    drawElementOnBoard(colorIndex) {
        this.block.map(item => GameBoard.drawBlock(item, colorIndex));
    }

    redrawElement(filteredBlock) {
        this.drawElementOnBoard();
        filteredBlock();
        this.drawElementOnBoard(this.index);
    }
}
