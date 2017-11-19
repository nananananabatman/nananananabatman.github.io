import {GameBoard} from './GameBoard.class';

export class EmptyBlock {
    constructor(boardSize, numberOfBlocks) {
        this.box = document.createElement('div');
        this.box.className = 'block-empty';
        this.box.style.width = this.box.style.height = (boardSize / numberOfBlocks).toFixed(1) + 'px';
    }

    static changeBlockStyle(blockOnPage, styleBlock) {
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
}
