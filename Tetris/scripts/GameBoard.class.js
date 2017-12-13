import {EmptyBlock} from './EmptyBlock.class';
import {Figure} from './Figure.class';
import {localStorageObject} from './localStorage';

const GAME_BOARD_SIZE = 550,
    MIN_SPEED = 500,
    SPEED_REDUCTION = 500;

let blocksOnPage,
    currentScore,
    currentSpeed,
    elementsOnBoard,
    intervalID,
    gameFinishedFlag;

export class GameBoard {
    constructor(numberOfBlocks, userName) {
        this.size = numberOfBlocks;
        this.scoreElement = document.getElementById('score');
        this.userName = userName;
        this.updateScoreElement();
        this.setInitValues();
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
                elementsOnBoard.forEach(item => item.redrawElement(() => {
                    item.figure.blocks = item.figure.blocks.filter(elem => elem[0] !== i);
                    item.figure.blocks.forEach(elem => {
                        if (elem[0] < i) {
                            elem[0]++;
                        }
                    });
                }));
            }
        }

        elementsOnBoard = elementsOnBoard.filter(elem => elem.figure.blocks.length !== 0);
    }

    drawGameBoard() {
        this.gameBoard = document.createElement('div');
        this.gameBoard.className = 'game';
        this.gameBoard.tabIndex = '-1';
        document.body.appendChild(this.gameBoard);
        this.gameBoard.focus();
        EmptyBlock.setWidth((GAME_BOARD_SIZE / this.size).toFixed(2) + 'px');

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
        this.gameBoard.innerHTML +=
`<div class="finished-game">` +
    `<h3 class="finished-game__heading">GAME OVER</h3>` +
    `<p class="finished-game__score">Your best score: ${localStorageObject.getData(this.userName) || 0}</p>` +
`</div>`;
        document.removeEventListener('keydown', this.executeKeyDownAction);
        localStorageObject.updateStorage();
        gameFinishedFlag = true;
        clearInterval(intervalID);
        document.getElementById('name-input').disabled = false;
    }

    levelup() {
        currentScore += this.size;
        localStorageObject.addValueToStorage(this.userName, currentScore);
        this.updateScoreElement();

        currentSpeed = currentSpeed === MIN_SPEED ? currentSpeed : currentSpeed - SPEED_REDUCTION;
        this.updateGameSpeed();
    }

    setInitValues() {
        switch(gameFinishedFlag) {
        case true:
        case 'undefined':
            currentScore = 0;
            break;
        default:
            currentScore = parseInt(localStorageObject.getFromStorage().get('currentScore')) || 0;
        }

        blocksOnPage = [];
        currentSpeed = 1500;
        elementsOnBoard = [];
        gameFinishedFlag = false;
    }

    startGame() {
        this.updateScoreElement();
        document.addEventListener('keydown', this.executeKeyDownAction);
        this.addNewElement();
        this.updateGameSpeed();
    }

    updateGameSpeed() {
        clearInterval(intervalID);
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
