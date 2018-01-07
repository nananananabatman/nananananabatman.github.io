import {NewsService} from './News.service';
import {Source} from './Sources';
import {Section} from './Section';

let instance;

export default class App {
    constructor() {
        let self = this;

        self.elements = {
            menu: document.querySelector('#menu'),
            sources: document.querySelector('#sources')
        };
        self.source = new Source();
        self.addListeners();

        self.execute('loadData');

        App = () => self;
    }

    addListeners() {
        this.elements.menu.addEventListener('click', this.closeMenu);

        this.elements.sources.addEventListener('click', event => {
            let link = event.target.lastElementChild || event.target;
            link.href = this.generateHref();
            if (this.source.update(event.target.id)) {
                this.execute('loadData');
                this.closeMenu();
            }
        });
    }

    execute(command, ...args) {
        return this[command](...args);
    }

    closeMenu() {
        document.querySelector('#sources').classList.toggle('closed');
    }

    generateHref() {
        let date = new Date();

        return `#${date.getTime()}`;
    }

    loadData() {
        let section;

        function generateSectionWithHeader(data) {
            let sectionElem = section.generateSection(data);

            section.generateSection = () => `<h1>${data[0].source.name}</h1>` + sectionElem;
        }

        console.log('Data loading...');

        NewsService.getNewsData(this.source.current).then(data => {
            console.log('Data loading completed!');

            section = new Section();
            generateSectionWithHeader(data);
            section.updateData(data);
        });
    }
}
