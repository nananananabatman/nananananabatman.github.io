function drawGameBoard() {
    function createEmptyBlock() {
        let block = document.createElement('div');

        block.className = 'block-empty';
        block.style.width = block.style.height = GAME_BOARD_SIZE / numberOfBlocks + 'px';

        return block;
    }

    gameBoard = document.createElement('div');
    gameBoard.className = 'game';

    for (let i = 0; i < numberOfBlocks; ++i) {
        blocksOnPage.push([]);
        for (let j = 0; j < numberOfBlocks; ++j) {
            blocksOnPage[i][j] = createEmptyBlock();
            gameBoard.appendChild(blocksOnPage[i][j]);
            changeBlockStyle(blocksOnPage[i][j]);
        }
    }

    document.body.appendChild(gameBoard);
}

function changeBlockStyle(blockOnPage, styleBlock) {
    let elClass, color;

    switch(styleBlock) {
    case 0: elClass = 'block-i'; color = '#81F7F3'; break;
    case 1: elClass = 'block-j'; color = '#8181F7'; break;
    case 2: elClass = 'block-l'; color = '#FE9A2E'; break;
    case 3: elClass = 'block-o'; color = '#F3F781'; break;
    case 4: elClass = 'block-s'; color = '#81F781'; break;
    case 5: elClass = 'block-t'; color = '#DA81F5'; break;
    case 6: elClass = 'block-z'; color = '#F78181'; break;
    default: elClass = 'block-empty'; color = '#D8D8D8';
    }

    blockOnPage.className = elClass;
    blockOnPage.style.backgroundColor = color;
}

function drawElement(block, index) {
    block.map(item => {
        changeBlockStyle(blocksOnPage[item[0]][item[1]], index);
    });
}
