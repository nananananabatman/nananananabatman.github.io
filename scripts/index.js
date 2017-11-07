let blocksOnPage,
    elements,
    gameBoard,
    intervalID,
    numberOfBlocks,
    score,
    scoreElement,
    speed,
    theGameIsNotFinished;

function init() {
    function startGame() {
        function checkScore() {
            for (let i = 0; i < blocksOnPage.length; ++i) {
                if(!blocksOnPage[i].map(item => item.className).includes('block-empty')) {
                    score += numberOfBlocks;
                    scoreElement.innerText = score;
                    speed = speed === MIN_SPEED ? speed : speed - SPEED_REDUCTION;
                    localStorage.setItem('currentScore', score);
                    elements.map(item => drawElement(item.block));
                    elements.forEach(item => item.block = item.block.filter(elem => elem[0] !== i));
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
    let value = +document.querySelector('#number').value;

    return value >= 9 && value <= 15 ? value : 9;
}
