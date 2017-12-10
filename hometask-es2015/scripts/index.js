import 'babel-polyfill';
import 'whatwg-fetch';
import '../styles/index.css';
import '../data.json';

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

document.querySelector('#load-news-action').addEventListener('click', (event) => {
    loadModuleApp();
    event.target.style.display = 'none';
});
