'use strict'

import {GameBoard} from './GameBoard.class';

const BLOCKS = [
    {
        center: 1,
        color: '#81F7F3',
        blocks: [[0, 0], [0, 1], [0, 2], [0, 3]],
        currentPosition: 0,
        specialRotate: true
    },
    {
        center: 1,
        color: '#8181F7',
        blocks: [[0, 0], [0, 1], [0, 2], [1, 2]]
    },
    {
        center: 1,
        color: '#FE9A2E',
        blocks: [[0, 0], [0, 1], [0, 2], [1, 0]]
    },
    {
        color: '#F3F781',
        blocks: [[0, 0], [0, 1], [1, 0], [1, 1]]
    },
    {
        center: 0,
        color: '#81F781',
        blocks: [[0, 1], [0, 2], [1, 0], [1, 1]],
        currentPosition: 0,
        specialRotate: true
    },
    {
        center: 1,
        color: '#DA81F5',
        blocks: [[0, 0], [0, 1], [0, 2], [1, 1]]
    },
    {
        center: 1,
        color: '#F78181',
        blocks: [[0, 0], [0, 1], [1, 1], [1, 2]],
        currentPosition: 0,
        specialRotate: true
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
        let possibleNewPosition = this.figure.blocks.map(item => [item[0] + shift[0], item[1] + shift[1]]);

        return this.isFigurePosCorrect(possibleNewPosition);
    }

    drawElementOnBoard(color) {
        this.figure.blocks.map(item => GameBoard.drawBlock(item, color));
    }

    isFigurePosCorrect(blocks) {
        let canMove = true;

        blocks.forEach(item => {
            if (!this.figure.blocks.map(item => item.toString()).includes(item.toString())) {
                canMove = canMove && GameBoard.tryAddBlock(item);
            }
        });

        return canMove;
    }

    moveBlock(position, shift) {
        if (this.canMoveElement(shift)) {
            this.redrawElement(() => this.figure.blocks.map(item => item[position] += shift[position]));
            return true;
        }

        return false;
    }

    moveDown() {
        return this.moveBlock(0, [1, 0]);
    }

    moveLeft() {
        return this.moveBlock(1, [0, -1]);
    }

    moveRight() {
        return this.moveBlock(1, [0, 1]);
    }

    redrawElement(changeFigureFunc) {
        this.drawElementOnBoard();
        if (changeFigureFunc instanceof Function) {
            changeFigureFunc();
        }
        this.drawElementOnBoard(this.figure.color);
    }

    rotateFigure() {
        let angle = Math.PI / 2,
            center = this.figure.blocks[this.figure.center],
            currentPosition = this.figure.currentPosition,
            oldPosX, oldPosY,
            rotatedFigureBlocks;

        if (this.figure.specialRotate) {
            if (currentPosition % 2 === 1) {
                angle = - Math.PI / 2;
            }
            currentPosition = (currentPosition + 1) % 4;
        }

        rotatedFigureBlocks = this.figure.blocks.map(item => {
            if (item === center) {
                return item;
            }
            oldPosX = item[0];
            oldPosY = item[1];

            return [(oldPosX - center[0]) * Math.cos(angle) - (oldPosY - center[1]) * Math.sin(angle) + center[0],
                    (oldPosX - center[0]) * Math.sin(angle) + (oldPosY - center[1]) * Math.cos(angle) + center[1]];
        });

        if (this.isFigurePosCorrect(rotatedFigureBlocks)) {
            if (this.figure.specialRotate) {
                this.figure.currentPosition = currentPosition;
            }
            this.redrawElement(() => { this.figure.blocks = rotatedFigureBlocks; });
        }
    }
}
