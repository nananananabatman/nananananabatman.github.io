import 'whatwg-fetch';
import 'babel-polyfill';
import {NewsService} from './News.service';
import {Source} from './Sources';

class App {
    constructor() {
        this.elements = {
            footer: document.querySelector('footer'),
            menu: document.querySelector('#menu'),
            sources: document.querySelector('#sources')
        };
        this.source = new Source();

        this.addListeners();
        this.loadData();
    }

    addListeners() {
        this.elements.menu.addEventListener('click', this.closeMenu);

        this.elements.sources.addEventListener('click', event => {
            let link = event.target.lastElementChild || event.target;
            link.href = this.generateHref();
            if (this.source.update(event.target.id)) {
                this.loadData();
                this.closeMenu();
            }
        });
    }

    closeMenu() {
        document.querySelector('#sources').classList.toggle('closed');
    }

    generateHref() {
        let date = new Date();

        return `#${date.getTime()}`;
    }

    getArticle(newsItem) {
        return (
`<article class="news-item">
    <a class="news-item__link" href="${newsItem.url}">
        <div class="news-item__image-wrapper">
            <img class="news-item__photo" src="${newsItem.urlToImage}" alt="">
        </div>
        <h2 class="news-item__title">${newsItem.title}</h2>
        <p class="news-item__description">${newsItem.description}</p>
    </a>
</article>`);
    }

    loadData() {
        let section = document.querySelector('section');

        console.log('Data loading...');


        NewsService.getNewsData(this.source.current).then(data => {
            console.log('Data loading completed!');

            if (section) {
                document.body.removeChild(section);
            }

            section = document.createElement('section');
            section.className = 'news-list';
            section.innerHTML = `<h1>${data[0].source.name}</h1>`;
            data.forEach(item => section.innerHTML += this.getArticle(item));
            document.body.insertBefore(section, this.elements.footer);
        });
    }
}

new App();
