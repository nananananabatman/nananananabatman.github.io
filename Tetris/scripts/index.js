import {GameBoard} from './GameBoard.class';

document.querySelector('#start').addEventListener('click', init);

let board;

function init() {
    function getInputValue() {
        let value = +document.querySelector('#number').value;

        return value >= 9 && value <= 15 ? value : 9;
    }

    if (board) {
        document.body.removeChild(board.gameBoard);
    }

    board = new GameBoard(getInputValue());
}
