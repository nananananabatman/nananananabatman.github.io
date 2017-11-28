import {GameBoard} from './GameBoard.class';

const BLOCKS = [
    {
        color: '#81F7F3',
        blocks: [[0, 0], [0, 1], [0, 2], [0, 3]]
    },
    {
        color: '#8181F7',
        blocks: [[0, 0], [0, 1], [0, 2], [1, 2]]
    },
    {
        color: '#FE9A2E',
        blocks: [[0, 0], [0, 1], [0, 2], [1, 0]]
    },
    {
        color: '#F3F781',
        blocks: [[0, 0], [0, 1], [1, 0], [1, 1]]
    },
    {
        color: '#81F781',
        blocks: [[0, 1], [0, 2], [1, 0], [1, 1]]
    },
    {
        color: '#DA81F5',
        blocks: [[0, 0], [0, 1], [0, 2], [1, 1]]
    },
    {
        color: '#F78181',
        blocks: [[0, 0], [0, 1], [1, 1], [1, 2]]
    }
];

export class Figure {
    constructor() {
        this.figure = Object.assign({}, BLOCKS[Math.floor(Math.random() * 7)]);
    }

    canAddToBoard() {
        let canAdd = true;

        this.figure.blocks.forEach(item => canAdd = canAdd && GameBoard.tryAddBlock(item));

        return canAdd;
    }

    canMoveElement(shift) {
        let possibleNewPosition = this.figure.blocks.map(item => [item[0] + shift[0], item[1] + shift[1]]),
            canMove = true;

        possibleNewPosition.forEach(item => {
            if (!this.figure.blocks.map(item => item.toString()).includes(item.toString())) {
                canMove = canMove && GameBoard.tryAddBlock(item);
            }
        });

        return canMove;
    }

    drawElementOnBoard(color) {
        this.figure.blocks.map(item => GameBoard.drawBlock(item, color));
    }

    moveBlock(position, shift) {
        this.redrawElement(() => this.figure.blocks.map(item => item[position] += shift));
    }

    redrawElement(filterFunc) {
        this.drawElementOnBoard();
        filterFunc();
        this.drawElementOnBoard(this.figure.color);
    }
}
