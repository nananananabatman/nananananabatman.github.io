import {GameBoard} from './GameBoard.class';

document.querySelector('#start').addEventListener('click', init);

let board;

function init() {
    let nameInput = document.getElementById('name-input'),
        nameLabel = document.getElementById('name-label');

    function getInputValue() {
        let value = +document.querySelector('#number').value;

        return value >= 9 && value <= 15 ? value : 9;
    }

    if (nameInput.value !== '') {
        nameInput.classList.remove('empty-name');
        nameInput.disabled = true;
        nameLabel.classList.remove('empty-name');

        if (board) {
            document.body.removeChild(board.gameBoard);
        }

        board = new GameBoard(getInputValue(), nameInput.value);
    } else {
        nameInput.classList.add('empty-name');
        nameLabel.classList.add('empty-name');
    }
}
