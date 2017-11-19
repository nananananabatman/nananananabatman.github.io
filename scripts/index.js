import {Element} from './Element.class';
import {GameBoard} from './GameBoard.class';

document.querySelector('#start').addEventListener('click', init);

let intervalID,
    board;

function init() {
    function startGame() {
        function checkScore() {
            for (let i = 0; i < board.blocksOnPage.length; ++i) {
                if(!board.blocksOnPage[i].map(item => item.box.className).includes('block-empty')) {
                    board.levelup();

                    board.elementsOnBoard.map(item => drawElement(item.block));
                    board.elementsOnBoard.forEach(item => item.block = item.block.filter(elem => elem[0] !== i));
                    board.elementsOnBoard = board.elementsOnBoard.filter(elem => elem.block.length !== 0);
                    board.elementsOnBoard.map(item => drawElement(item.block, item.index));
                }
            }
        }

        intervalID = setInterval(() => {
            board.elementsOnBoard.forEach((item, index) => {
                if (canMoveElement(item.block, [1, 0])) {
                    moveBlock(item, 0, 1);
                } else {
                    if (index === board.elementsOnBoard.length - 1 && !board.gameIsFinished) {
                        addNewElement();
                    }
                    checkScore();
                }
            });

        }, board.speed);
    }

    if (board || intervalID) {
        document.body.removeChild(board.gameBoard);
        clearInterval(intervalID);
    }

    board = new GameBoard();
    board.updateScoreElement();

    board.drawGameBoard();
    addNewElement();
    startGame();

    document.addEventListener('keydown', executeKeyDownAction);
}

function executeKeyDownAction(event) {
    if (event.keyCode === 37 && canMoveElement(board.elementsOnBoard[board.elementsOnBoard.length - 1].block, [0, -1])) {
        moveBlock(board.elementsOnBoard[board.elementsOnBoard.length - 1], 1, -1);
    } else if (event.keyCode === 39 && canMoveElement(board.elementsOnBoard[board.elementsOnBoard.length - 1].block, [0, 1])) {
        moveBlock(board.elementsOnBoard[board.elementsOnBoard.length - 1], 1, 1);
    }
}

function addNewElement() {
    let newElem = new Element(),
        pointsXOfNewElem = newElem.block.map(item => item[1]),
        middle = board.middle - Math.floor(Math.max(...pointsXOfNewElem) / 2);

    function canAddAnotherBlock(element) {
        let canAdd = true;

        element.block.forEach(item => canAdd = canAdd && tryAddBlock(item));

        return canAdd;
    }

    function paintLastElement() {
        newElem.block.map(item => board.blocksOnPage[item[0]][item[1]].changeBlockStyle(newElem.index));
    }

    newElem.block = newElem.block.map(item => [item[0], item[1] + middle]);

    if (canAddAnotherBlock(newElem)) {
        board.elementsOnBoard.push(newElem);
        drawElement(board.elementsOnBoard[board.elementsOnBoard.length - 1].block,
            board.elementsOnBoard[board.elementsOnBoard.length - 1].index);
    } else {
        document.removeEventListener('keydown', executeKeyDownAction);
        paintLastElement();
        board.finishGame();
        clearInterval(intervalID);
    }
}

function tryAddBlock(block) {
    try {
        return board.blocksOnPage[block[0]][block[1]].box.className === 'block-empty';
    } catch(err) {
        return false;
    }
}

function drawElement(block, index) {
    block.map(item => {
        board.blocksOnPage[item[0]][item[1]].changeBlockStyle(index);
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
