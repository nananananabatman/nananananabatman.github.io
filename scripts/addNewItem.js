function addNewElement() {
    let newElem = getRandomElement(),
        pointsXOfNewElem = newElem.block.map(item => item[1]),
        middle = Math.floor((numberOfBlocks - Math.max(...pointsXOfNewElem)) / 2);

    function getRandomElement() {
        let index = Math.floor(Math.random() * 7),
            element = {
                block: BLOCKS[index],
                index
            };

        return element;
    }

    function canAddAnotherBlock(element) {
        let canAdd = true;

        element.block.forEach(item => canAdd = canAdd && tryAddBlock(item));

        return canAdd;
    }

    function finishGame(element) {
        theGameIsNotFinished = false;
        clearInterval(intervalID);
        document.removeEventListener('keydown', executeKeyDownAction);
        element.block.map(item => changeBlockStyle(blocksOnPage[item[0]][item[1]], element.index));
        localStorage.removeItem('currentScore');
    }

    newElem.block = newElem.block.map(item => [item[0], item[1] + middle]);

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
    } catch(err) {
        return false;
    }
}
