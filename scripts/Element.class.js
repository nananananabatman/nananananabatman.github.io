import {EmptyBlock} from './EmptyBlock.class';

const BLOCKS = [[
    {coord: [0, 0], box: new EmptyBlock()},
    {coord: [0, 1], box: new EmptyBlock()},
    {coord: [0, 2], box: new EmptyBlock()},
    {coord: [0, 3], box: new EmptyBlock()}
], [
    {coord: [0, 0], box: new EmptyBlock()},
    {coord: [0, 1], box: new EmptyBlock()},
    {coord: [0, 2], box: new EmptyBlock()},
    {coord: [1, 2], box: new EmptyBlock()}
], [
    {coord: [0, 0], box: new EmptyBlock()},
    {coord: [0, 1], box: new EmptyBlock()},
    {coord: [0, 2], box: new EmptyBlock()},
    {coord: [1, 0], box: new EmptyBlock()}
], [
    {coord: [0, 0], box: new EmptyBlock()},
    {coord: [0, 1], box: new EmptyBlock()},
    {coord: [1, 0], box: new EmptyBlock()},
    {coord: [1, 1], box: new EmptyBlock()}
], [
    {coord: [0, 1], box: new EmptyBlock()},
    {coord: [0, 2], box: new EmptyBlock()},
    {coord: [1, 0], box: new EmptyBlock()},
    {coord: [1, 1], box: new EmptyBlock()}
], [
    {coord: [0, 0], box: new EmptyBlock()},
    {coord: [0, 1], box: new EmptyBlock()},
    {coord: [0, 2], box: new EmptyBlock()},
    {coord: [1, 1], box: new EmptyBlock()}
], [
    {coord: [0, 0], box: new EmptyBlock()},
    {coord: [0, 1], box: new EmptyBlock()},
    {coord: [1, 1], box: new EmptyBlock()},
    {coord: [1, 2], box: new EmptyBlock()}
]];

export class Element {
    constructor() {
        this.index = Math.floor(Math.random() * 7),
        this.block = BLOCKS[this.index];
    }

    paintLastElement() {
        this.block.map(item => EmptyBlock.changeBlockStyle(item.box.box, this.index));
    }

    // function addNewElement() {
    //     let newElem = getRandomElement(),
    //         pointsXOfNewElem = newElem.block.map(item => item[1]),
    //         middle = Math.floor((board.numberOfBlocks - Math.max(...pointsXOfNewElem)) / 2);
    //
    //     function canAddAnotherBlock(element) {
    //         let canAdd = true;
    //
    //         element.block.forEach(item => canAdd = canAdd && tryAddBlock(item));
    //
    //         return canAdd;
    //     }
    //
    //
    //
    //     newElem.block = newElem.block.map(item => [item[0], item[1] + middle]);
    // }
}
