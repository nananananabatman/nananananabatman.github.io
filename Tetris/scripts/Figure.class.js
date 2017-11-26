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

export class Figure {
    constructor() {
        this.index = Math.floor(Math.random() * 7),
        this.block = BLOCKS[this.index];
    }

    canAddToBoard() {
        let canAdd = true;

        this.block.forEach(item => canAdd = canAdd && GameBoard.tryAddBlock(item));

        return canAdd;
    }

    canMoveElement(shift) {
        let perhabsNewPosition = this.block.map(item => [item[0] + shift[0], item[1] + shift[1]]),
            canMove = true;

        perhabsNewPosition.forEach(item => {
            if (!this.block.map(item => item.toString()).includes(item.toString())) {
                canMove = canMove && GameBoard.tryAddBlock(item);
            }
        });

        return canMove;
    }

    drawElementOnBoard(colorIndex) {
        this.block.map(item => GameBoard.drawBlock(item, colorIndex));
    }

    moveBlock(position, shift) {
        this.redrawElement(() => this.block.map(item => item[position] += shift));
    }

    redrawElement(filteredBlock) {
        this.drawElementOnBoard();
        filteredBlock();
        this.drawElementOnBoard(this.index);
    }
}
