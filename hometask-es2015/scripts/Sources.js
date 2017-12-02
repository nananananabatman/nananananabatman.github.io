const BBC_NEWS = 'bbc-news',
    DAILY_MAIL = 'daily-mail',
    MTV_NEWS = 'mtv-news',
    NATIONAL_GEOGRAPHIC = 'national-geographic',
    THE_NEW_YORK_TIMES = 'the-new-york-times';

let selectedSrc;

class Source {
    constructor() {
        console.log('It is a Source constructor!');

        selectedSrc = BBC_NEWS;
    }

    get current() {
        return selectedSrc;
    }

    update(newVal) {
        let newSource,
            buttons;

        switch(newVal) {
        case 'daily': newSource = DAILY_MAIL;
            break;
        case 'mtv': newSource = MTV_NEWS;
            break;
        case 'nat-geo': newSource = NATIONAL_GEOGRAPHIC;
            break;
        case 'times': newSource = THE_NEW_YORK_TIMES;
            break;
        default: newSource = BBC_NEWS;
        }

        if (newSource !== selectedSrc) {
            buttons = [...document.querySelectorAll('.sources li')];
            buttons.forEach(item => item.classList.remove('active'));
            selectedSrc = newSource;
            document.querySelector(`.${newVal}`).classList.add('active');

            return true;
        }

        return false;
    }
}
