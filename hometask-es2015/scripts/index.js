import 'babel-polyfill';
import 'whatwg-fetch';
import '../styles/index.css';
import '../data.json';


document.querySelector('#load-news-action').addEventListener('click', (event) => {
    import(
        /* webpackChunkName: "app" */
        /* webpackMode: "lazy" */
        './app').then(module => {
            let App = module.default;
            new App();
        });
    event.target.style.display = 'none';
});
