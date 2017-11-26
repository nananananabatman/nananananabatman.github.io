import {EmptyBlock} from './EmptyBlock.class';
import {Figure} from './Figure.class';
import {LocalStorageService} from './localStorage.service';

const GAME_BOARD_SIZE = 550,
    MIN_SPEED = 1000,
    SPEED_REDUCTION = 500;

let blocksOnPage,
    currentScore,
    currentSpeed,
    elementsOnBoard,
    intervalID,
    gameFinishedFlag,
    numberOfBlocks;

function checkInputValue() {
    let value = +document.querySelector('#number').value;

    return value >= 9 && value <= 15 ? value : 9;
}

function setInitValues() {
    blocksOnPage = [];
    currentSpeed = 2500;
    currentScore = parseInt(LocalStorageService.getFromStorage().get('currentScore')) || 0;
    elementsOnBoard = [];
    gameFinishedFlag = false;
    numberOfBlocks = checkInputValue();
    EmptyBlock.setWidth((GAME_BOARD_SIZE / numberOfBlocks).toFixed(1) + 'px');
}

export class GameBoard {
    constructor() {
        this.gameBoard;
        this.scoreElement = document.getElementById('score');
        this.updateScoreElement();
        setInitValues();
        this.drawGameBoard();
        this.startGame();
    }

    get middle() {
        return Math.floor(numberOfBlocks / 2);
    }

    addNewElement() {
        let newElem = new Figure(),
            pointsXOfNewElem = newElem.block.map(item => item[1]),
            middle = this.middle - Math.floor(Math.max(...pointsXOfNewElem) / 2);

        newElem.block = newElem.block.map(item => [item[0], item[1] + middle]);

        if (newElem.canAddToBoard()) {
            elementsOnBoard.push(newElem);
        } else {
            document.removeEventListener('keydown', this.executeKeyDownAction);
            this.finishGame();
        }
        newElem.drawElementOnBoard(newElem.index);
    }

    checkScore() {
        for (let i = 0; i < blocksOnPage.length; ++i) {
            if(!blocksOnPage[i].map(item => item.box.className).includes('block-empty')) {
                this.levelup();
                elementsOnBoard.forEach(item => item.redrawElement(() => item.block = item.block.filter(elem => elem[0] !== i)));
            }
        }

        elementsOnBoard = elementsOnBoard.filter(elem => elem.block.length !== 0);
    }

    drawGameBoard() {
        this.gameBoard = document.createElement('div');
        this.gameBoard.className = 'game';
        document.body.appendChild(this.gameBoard);

        for (let i = 0; i < numberOfBlocks; ++i) {
            blocksOnPage.push([]);
            for (let j = 0; j < numberOfBlocks; ++j) {
                blocksOnPage[i][j] = new EmptyBlock(GAME_BOARD_SIZE, numberOfBlocks);
                this.gameBoard.appendChild(blocksOnPage[i][j].box);
            }
        }
    }

    executeKeyDownAction(event) {
        let shift,
            element = elementsOnBoard[elementsOnBoard.length - 1];

        switch(event.keyCode) {
        case 37: shift = -1;
            break;
        case 39: shift = 1;
            break;
        default: shift = undefined;
        }

        if (shift && element.canMoveElement([0, shift])) {
            element.moveBlock(1, shift);
        }
    }

    finishGame() {
        LocalStorageService.updateStorage();
        gameFinishedFlag = true;
        clearInterval(intervalID);
    }

    levelup() {
        currentScore += numberOfBlocks;
        LocalStorageService.addValueToStorage('currentScore', currentScore);
        this.updateScoreElement();

        currentSpeed = currentSpeed === MIN_SPEED ? currentSpeed : currentSpeed - SPEED_REDUCTION;
    }

    startGame() {
        clearInterval(intervalID);
        this.addNewElement();
        intervalID = setInterval(() => {
            elementsOnBoard.forEach((item, index) => {
                if (item.canMoveElement([1, 0])) {
                    item.moveBlock(0, 1);
                } else {
                    if (index === elementsOnBoard.length - 1) {
                        this.checkScore();
                        if (!gameFinishedFlag) {
                            this.addNewElement();
                        }
                    }
                }
            });

        }, currentSpeed);
    }

    updateScoreElement() {
        this.scoreElement.innerText = currentScore || 0;
    }

    static drawBlock(block, index) {
        blocksOnPage[block[0]][block[1]].changeBlockStyle(index);
    }

    static tryAddBlock(block) {
        try {
            return blocksOnPage[block[0]][block[1]].isEmpty();
        } catch(err) {
            return false;
        }
    }
}
