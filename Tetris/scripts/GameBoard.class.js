import {EmptyBlock} from './EmptyBlock.class';
import {Figure} from './Figure.class';
import {localStorageObject} from './localStorage';

const GAME_BOARD_SIZE = 550,
    MIN_SPEED = 1000,
    SPEED_REDUCTION = 500;

let blocksOnPage,
    currentScore,
    currentSpeed,
    elementsOnBoard,
    intervalID,
    gameFinishedFlag;

function setInitValues() {
    blocksOnPage = [];
    currentSpeed = 2500;
    currentScore = gameFinishedFlag !== false ? parseInt(localStorageObject.getFromStorage().get('currentScore')) || 0 : 0;
    elementsOnBoard = [];
    gameFinishedFlag = false;
}

export class GameBoard {
    constructor(numberOfBlocks) {
        this.size = numberOfBlocks;
        this.scoreElement = document.getElementById('score');
        this.updateScoreElement();
        setInitValues();
        this.drawGameBoard();
        this.startGame();
    }

    get middle() {
        return Math.floor(this.size / 2);
    }

    addNewElement() {
        let newElem = new Figure(),
            pointsXOfNewElem = newElem.figure.blocks.map(item => item[1]),
            middle = this.middle - Math.floor(Math.max(...pointsXOfNewElem) / 2);

        newElem.figure.blocks = newElem.figure.blocks.map(item => [item[0], item[1] + middle]);

        if (newElem.canAddToBoard()) {
            elementsOnBoard.push(newElem);
        } else {
            this.finishGame();
        }
        newElem.drawElementOnBoard(newElem.figure.color);
    }

    checkScore() {
        for (let i = 0; i < blocksOnPage.length; ++i) {
            if(!blocksOnPage[i].map(item => item.isEmpty()).includes(true)) {
                this.levelup();
                elementsOnBoard.forEach(item => item.redrawElement(() => item.figure.blocks = item.figure.blocks.filter(elem => elem[0] !== i)));
            }
        }

        elementsOnBoard = elementsOnBoard.filter(elem => elem.figure.blocks.length !== 0);
    }

    drawGameBoard() {
        this.gameBoard = document.createElement('div');
        this.gameBoard.className = 'game';
        document.body.appendChild(this.gameBoard);
        EmptyBlock.setWidth((GAME_BOARD_SIZE / this.size).toFixed(1) + 'px');

        for (let i = 0; i < this.size; ++i) {
            blocksOnPage.push([]);
            for (let j = 0; j < this.size; ++j) {
                blocksOnPage[i][j] = new EmptyBlock(GAME_BOARD_SIZE, this.size);
                this.gameBoard.appendChild(blocksOnPage[i][j].box);
            }
        }
    }

    executeKeyDownAction(event) {
        let shift,
            element = elementsOnBoard[elementsOnBoard.length - 1];

        switch(event.keyCode) {
        case 32:
            if(element.figure.center !== undefined) {
                element.rotateFigure();
            }
            break;
        case 37:
            element.moveLeft();
            break;
        case 39:
            element.moveRight();
            break;
        default: return;
        }
    }

    finishGame() {
        document.removeEventListener('keydown', this.executeKeyDownAction);
        localStorageObject.updateStorage();
        gameFinishedFlag = true;
        clearInterval(intervalID);
    }

    levelup() {
        currentScore += this.size;
        localStorageObject.addValueToStorage('currentScore', currentScore);
        this.updateScoreElement();

        currentSpeed = currentSpeed === MIN_SPEED ? currentSpeed : currentSpeed - SPEED_REDUCTION;
    }

    startGame() {
        this.updateScoreElement();
        document.addEventListener('keydown', this.executeKeyDownAction);
        clearInterval(intervalID);
        this.addNewElement();
        intervalID = setInterval(() => {
            elementsOnBoard.forEach((item, index) => {
                if (item.moveDown()) {
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

    static drawBlock(block, color) {
        blocksOnPage[block[0]][block[1]].changeBlockStyle(color);
    }

    static tryAddBlock(block) {
        try {
            return blocksOnPage[block[0]][block[1]].isEmpty();
        } catch(err) {
            return false;
        }
    }
}
