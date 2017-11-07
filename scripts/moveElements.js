function moveBlock(element, position, shift) {
    drawElement(element.block);
    element.block.map(item => item[position] += shift);
    drawElement(element.block, element.index);
}

function canMoveElement(block, shift) {
    let perhabsNewPosition = block.map(item => [item[0] + shift[0], item[1] + shift[1]]),
        canMove = true;

    perhabsNewPosition.forEach(item => {
        if (!block.map(item => item.toString()).includes(item.toString())) {
            canMove = canMove && tryAddBlock(item);
        }
    });

    return canMove;
}
