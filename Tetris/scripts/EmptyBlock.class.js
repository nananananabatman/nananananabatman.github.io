let defaultColor = 'rgb(216, 216, 216)',
    width;

export class EmptyBlock {
    constructor() {
        this.box = document.createElement('div');
        this.box.className = 'block-empty';
        this.box.style.width = this.box.style.height = width;
        this.box.style.backgroundColor = defaultColor;
    }

    changeBlockStyle(color) {
        this.box.style.backgroundColor = color || defaultColor;
    }

    isEmpty() {
        return this.box.style.backgroundColor === defaultColor;
    }

    static setWidth(value) {
        width = value;
    }
}
