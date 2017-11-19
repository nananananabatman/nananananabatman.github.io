import {Element} from './Element.class';
import {EmptyBlock} from './EmptyBlock.class';
import {GameBoard} from './GameBoard.class';
import {LocalStorageService} from './localStorage.service';

document.querySelector('#start').addEventListener('click', init);

let blocksOnPage,
    elements,
    gameBoard,
    intervalID,
    score,
    scoreElement,
    speed,
    theGameIsNotFinished,
    board;

function init() {
    function startGame() {
        function checkScore() {
            for (let i = 0; i < blocksOnPage.length; ++i) {
                if(!blocksOnPage[i].map(item => item.box.className).includes('block-empty')) {
                    score += board.numberOfBlocks;
                    scoreElement.innerText = score;
                    speed = speed === board.minSpeed ? speed : speed - board.speedReduction;
                    LocalStorageService.addValueToStorage('currentScore', score);
                    elements.map(item => drawElement(item.block));
                    elements.forEach(item => item.block = item.block.filter(elem => elem[0] !== i));
                    elements = elements.filter(elem => elem.block.length !== 0);
                    elements.map(item => drawElement(item.block, item.index));
                }
            }
        }

        intervalID = setInterval(() => {
            elements.forEach((item, index) => {
                if (canMoveElement(item.block, [1, 0])) {
                    moveBlock(item, 0, 1);
                } else {
                    if (index === elements.length - 1 && theGameIsNotFinished) {
                        addNewElement();
                    }
                    checkScore();
                }
            });

        }, speed);
    }

    if (gameBoard || intervalID) {
        document.body.removeChild(gameBoard);
        clearInterval(intervalID);
    }

    board = new GameBoard();
    blocksOnPage = [];
    elements = [];
    score = parseInt(LocalStorageService.getFromStorage().get('currentScore')) || 0;
    scoreElement = document.getElementById('score');
    scoreElement.innerText = score || 0;
    speed = 2500;
    theGameIsNotFinished = true;

    drawGameBoard();
    addNewElement();
    startGame();

    document.addEventListener('keydown', executeKeyDownAction);
}

function executeKeyDownAction(event) {
    if (event.keyCode === 37 && canMoveElement(elements[elements.length - 1].block, [0, -1])) {
        moveBlock(elements[elements.length - 1], 1, -1);
    } else if (event.keyCode === 39 && canMoveElement(elements[elements.length - 1].block, [0, 1])) {
        moveBlock(elements[elements.length - 1], 1, 1);
    }
}

function drawGameBoard() {
    gameBoard = document.createElement('div');
    gameBoard.className = 'game';
    document.body.appendChild(gameBoard);

    for (let i = 0; i < board.numberOfBlocks; ++i) {
        blocksOnPage.push([]);
        for (let j = 0; j < board.numberOfBlocks; ++j) {
            blocksOnPage[i][j] = new EmptyBlock(board.gameBoardSize, board.numberOfBlocks);
            gameBoard.appendChild(blocksOnPage[i][j].box);
            blocksOnPage[i][j].changeBlockStyle();
        }
    }
}

function addNewElement() {
    let newElem = new Element(),
        pointsXOfNewElem = newElem.block.map(item => item[1]),
        middle = Math.floor((board.numberOfBlocks - Math.max(...pointsXOfNewElem)) / 2);

    function canAddAnotherBlock(element) {
        let canAdd = true;

        element.block.forEach(item => canAdd = canAdd && tryAddBlock(item));

        return canAdd;
    }

    function paintLastElement() {
        newElem.block.map(item => blocksOnPage[item[0]][item[1]].changeBlockStyle(newElem.index));
    }

    newElem.block = newElem.block.map(item => [item[0], item[1] + middle]);

    if (canAddAnotherBlock(newElem)) {
        elements.push(newElem);
        drawElement(elements[elements.length - 1].block, elements[elements.length - 1].index);
    } else {
        document.removeEventListener('keydown', executeKeyDownAction);
        paintLastElement();
        LocalStorageService.updateStorage();
        theGameIsNotFinished = false;
        clearInterval(intervalID);
    }
}

function tryAddBlock(block) {
    try {
        return blocksOnPage[block[0]][block[1]].box.className === 'block-empty';
    } catch(err) {
        return false;
    }
}

function drawElement(block, index) {
    block.map(item => {
        blocksOnPage[item[0]][item[1]].changeBlockStyle(index);
    });
}

function moveBlock(element, position, shift) {
    drawElement(element.block);
    element.block.map(item => item[position] += shift);
    drawElement(element.block, element.index);
}

function canMoveElement(block, shift) {
    let perhabsNewPosition = block.map(item => [item[0] + shift[0], item[1] + shift[1]]),
        canMove = true;

    perhabsNewPosition.forEach(item => {
        if (!block.map(item => item.toString()).includes(item.toString())) {
            canMove = canMove && tryAddBlock(item);
        }
    });

    return canMove;
}
