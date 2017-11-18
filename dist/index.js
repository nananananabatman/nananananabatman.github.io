'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var BLOCKS = [[[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [0, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [0, 2], [1, 0]], [[0, 0], [0, 1], [1, 0], [1, 1]], [[0, 1], [0, 2], [1, 0], [1, 1]], [[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 0], [0, 1], [1, 1], [1, 2]]],
    GAME_BOARD_SIZE = 550,
    MIN_SPEED = 1000,
    SPEED_REDUCTION = 500;

var blocksOnPage = void 0,
    elements = void 0,
    gameBoard = void 0,
    intervalID = void 0,
    numberOfBlocks = void 0,
    score = void 0,
    scoreElement = void 0,
    speed = void 0,
    theGameIsNotFinished = void 0;

function init() {
    function startGame() {
        function checkScore() {
            var _loop = function _loop(i) {
                if (!blocksOnPage[i].map(function (item) {
                    return item.className;
                }).includes('block-empty')) {
                    score += numberOfBlocks;
                    scoreElement.innerText = score;
                    speed = speed === MIN_SPEED ? speed : speed - SPEED_REDUCTION;
                    localStorage.setItem('currentScore', score);
                    elements.map(function (item) {
                        return drawElement(item.block);
                    });
                    elements.forEach(function (item) {
                        return item.block = item.block.filter(function (elem) {
                            return elem[0] !== i;
                        });
                    });
                    elements = elements.filter(function (elem) {
                        return elem.block.length !== 0;
                    });
                    elements.map(function (item) {
                        return drawElement(item.block, item.index);
                    });
                }
            };

            for (var i = 0; i < blocksOnPage.length; ++i) {
                _loop(i);
            }
        }

        intervalID = setInterval(function () {
            elements.forEach(function (item, index) {
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

    blocksOnPage = [];
    elements = [];
    numberOfBlocks = checkInputValue();
    score = parseInt(localStorage.getItem('currentScore')) || 0;
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

function checkInputValue() {
    var value = +document.querySelector('#number').value;

    return value >= 9 && value <= 15 ? value : 9;
}

function drawGameBoard() {
    function createEmptyBlock() {
        var block = document.createElement('div');

        block.className = 'block-empty';
        block.style.width = block.style.height = GAME_BOARD_SIZE / numberOfBlocks + 'px';

        return block;
    }

    gameBoard = document.createElement('div');
    gameBoard.className = 'game';

    for (var i = 0; i < numberOfBlocks; ++i) {
        blocksOnPage.push([]);
        for (var j = 0; j < numberOfBlocks; ++j) {
            blocksOnPage[i][j] = createEmptyBlock();
            gameBoard.appendChild(blocksOnPage[i][j]);
            changeBlockStyle(blocksOnPage[i][j]);
        }
    }

    document.body.appendChild(gameBoard);
}

function changeBlockStyle(blockOnPage, styleBlock) {
    var elClass = void 0,
        color = void 0;

    switch (styleBlock) {
        case 0:
            elClass = 'block-i';color = '#81F7F3';break;
        case 1:
            elClass = 'block-j';color = '#8181F7';break;
        case 2:
            elClass = 'block-l';color = '#FE9A2E';break;
        case 3:
            elClass = 'block-o';color = '#F3F781';break;
        case 4:
            elClass = 'block-s';color = '#81F781';break;
        case 5:
            elClass = 'block-t';color = '#DA81F5';break;
        case 6:
            elClass = 'block-z';color = '#F78181';break;
        default:
            elClass = 'block-empty';color = '#D8D8D8';
    }

    blockOnPage.className = elClass;
    blockOnPage.style.backgroundColor = color;
}

function addNewElement() {
    var newElem = getRandomElement(),
        pointsXOfNewElem = newElem.block.map(function (item) {
        return item[1];
    }),
        middle = Math.floor((numberOfBlocks - Math.max.apply(Math, _toConsumableArray(pointsXOfNewElem))) / 2);

    function getRandomElement() {
        var index = Math.floor(Math.random() * 7),
            element = {
            block: BLOCKS[index],
            index: index
        };

        return element;
    }

    function canAddAnotherBlock(element) {
        var canAdd = true;

        element.block.forEach(function (item) {
            return canAdd = canAdd && tryAddBlock(item);
        });

        return canAdd;
    }

    function finishGame(element) {
        theGameIsNotFinished = false;
        clearInterval(intervalID);
        document.removeEventListener('keydown', executeKeyDownAction);
        element.block.map(function (item) {
            return changeBlockStyle(blocksOnPage[item[0]][item[1]], element.index);
        });
        localStorage.removeItem('currentScore');
    }

    newElem.block = newElem.block.map(function (item) {
        return [item[0], item[1] + middle];
    });

    if (canAddAnotherBlock(newElem)) {
        elements.push(newElem);
        drawElement(elements[elements.length - 1].block, elements[elements.length - 1].index);
    } else {
        finishGame(newElem);
    }
}

function tryAddBlock(block) {
    try {
        return blocksOnPage[block[0]][block[1]].className === 'block-empty';
    } catch (err) {
        return false;
    }
}

function drawElement(block, index) {
    block.map(function (item) {
        changeBlockStyle(blocksOnPage[item[0]][item[1]], index);
    });
}

function moveBlock(element, position, shift) {
    drawElement(element.block);
    element.block.map(function (item) {
        return item[position] += shift;
    });
    drawElement(element.block, element.index);
}

function canMoveElement(block, shift) {
    var perhabsNewPosition = block.map(function (item) {
        return [item[0] + shift[0], item[1] + shift[1]];
    }),
        canMove = true;

    perhabsNewPosition.forEach(function (item) {
        if (!block.map(function (item) {
            return item.toString();
        }).includes(item.toString())) {
            canMove = canMove && tryAddBlock(item);
        }
    });

    return canMove;
}