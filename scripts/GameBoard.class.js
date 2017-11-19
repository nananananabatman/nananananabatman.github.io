import {EmptyBlock} from './EmptyBlock.class';
import {LocalStorageService} from './localStorage.service';

const GAME_BOARD_SIZE = 550,
    MIN_SPEED = 1000,
    SPEED_REDUCTION = 500;

let currentScore,
    currentSpeed,
    gameFinishedFlag,
    numberOfBlocks;

function checkInputValue() {
    let value = +document.querySelector('#number').value;

    return value >= 9 && value <= 15 ? value : 9;
}


function setInitValues() {
    currentSpeed = 2500;
    currentScore = parseInt(LocalStorageService.getFromStorage().get('currentScore')) || 0;
    gameFinishedFlag = false;
    numberOfBlocks = checkInputValue();
    EmptyBlock.setWidth((GAME_BOARD_SIZE / numberOfBlocks).toFixed(1) + 'px');
}

export class GameBoard {
    constructor() {
        this.blocksOnPage = [];
        this.elementsOnBoard = [];
        this.gameBoard;
        this.scoreElement = document.getElementById('score');

        setInitValues();
    }

    get gameIsFinished() {
        return gameFinishedFlag;
    }

    get middle() {
        return Math.floor(numberOfBlocks / 2);
    }

    get speed() {
        return currentSpeed;
    }

    set speed(value) {
        currentSpeed = value;
    }
    drawGameBoard() {
        this.gameBoard = document.createElement('div');
        this.gameBoard.className = 'game';
        document.body.appendChild(this.gameBoard);

        for (let i = 0; i < numberOfBlocks; ++i) {
            this.blocksOnPage.push([]);
            for (let j = 0; j < numberOfBlocks; ++j) {
                this.blocksOnPage[i][j] = new EmptyBlock(GAME_BOARD_SIZE, numberOfBlocks);
                this.gameBoard.appendChild(this.blocksOnPage[i][j].box);
            }
        }
    }

    finishGame() {
        LocalStorageService.updateStorage();
        gameFinishedFlag = true;
    }

    levelup() {
        currentScore += numberOfBlocks;
        LocalStorageService.addValueToStorage('currentScore', currentScore);
        this.updateScoreElement();

        currentSpeed = currentSpeed === MIN_SPEED ? currentSpeed : currentSpeed - SPEED_REDUCTION;
    }

    updateScoreElement() {
        this.scoreElement.innerText = currentScore || 0;
    }
}
