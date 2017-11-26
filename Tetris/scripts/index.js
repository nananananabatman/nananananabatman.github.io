import {GameBoard} from './GameBoard.class';

document.querySelector('#start').addEventListener('click', init);

let board;

function init() {
    if (board) {
        document.body.removeChild(board.gameBoard);
    }

    board = new GameBoard();

    document.addEventListener('keydown', board.executeKeyDownAction);
}
