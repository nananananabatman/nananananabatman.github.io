import 'babel-polyfill';
import 'whatwg-fetch';
import '../styles/index.css';
import '../data.json';

const observer = {
    subscribers: [],
     on(event, callback) {
    	this.subscribers[event] = callback;
    },
     emit(event, ...args) {
    	this.subscribers[event](...args);
    }
};

function loadModuleApp() {
    import(
        /* webpackChunkName: "app" */
        /* webpackMode: "lazy" */
        './app'
    ).then(module => {
        let App = module.default;

        new App();
    });
}

observer.on('init', () => {
    document.querySelector('#load-news-action').addEventListener('click', (event) => {
        loadModuleApp();
        observer.emit('app-loaded');
    });
});

observer.on('app-loaded', () => {
    event.target.style.display = 'none';
});

observer.emit('init');
