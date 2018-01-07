import {createStore} from './redux';
import {newsReducer} from './news.reducer';

let selectedSrc, store;

export class Source {
    constructor() {
        store = createStore(newsReducer);

        console.log('It is a Source constructor!');

        store.subscribe(this.updateSelectedSrc);
        this.updateSelectedSrc();
    }

    get current() {
        return selectedSrc;
    }

    update(newVal) {
        let buttons,
            oldSource = selectedSrc;

        store.dispatch({ type: newVal })

        if (oldSource !== selectedSrc) {
            buttons = [...document.querySelectorAll('.sources li')];
            buttons.forEach(item => item.classList.remove('active'));
            document.querySelector(`.${newVal}`).classList.add('active');

            return true;
        }

        return false;
    }

    updateSelectedSrc() {
        selectedSrc = store.getState();
    }
}
