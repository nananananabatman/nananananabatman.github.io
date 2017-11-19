export class GameBoard {
    constructor() {
        this.numberOfBlocks = this.checkInputValue();
        this.gameBoardSize = 550;
        this.minSpeed = 1000;
        this.speedReduction = 500;
    }

    checkInputValue() {
        let value = +document.querySelector('#number').value;

        return value >= 9 && value <= 15 ? value : 9;
    }
}
