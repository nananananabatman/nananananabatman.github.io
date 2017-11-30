'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        _classCallCheck(this, App);

        this.elements = {
            footer: document.querySelector('footer'),
            menu: document.querySelector('#menu'),
            sources: document.querySelector('#sources')
        };
        this.source = new Source();

        this.addListeners();
        this.loadData();
    }

    _createClass(App, [{
        key: 'addListeners',
        value: function addListeners() {
            var _this = this;

            this.elements.menu.addEventListener('click', this.closeMenu);

            this.elements.sources.addEventListener('click', function (event) {
                var link = event.target.lastElementChild || event.target;
                link.href = _this.generateHref();
                if (_this.source.update(event.target.closest('li').id)) {
                    _this.loadData();
                    _this.closeMenu();
                }
            });
        }
    }, {
        key: 'closeMenu',
        value: function closeMenu() {
            document.querySelector('#sources').classList.toggle('closed');
        }
    }, {
        key: 'generateHref',
        value: function generateHref() {
            var date = new Date();

            return '#' + date.getTime();
        }
    }, {
        key: 'getArticle',
        value: function getArticle(newsItem) {
            return '<article class="news-item">\n    <a class="news-item__link" href="' + newsItem.url + '">\n        <div class="news-item__image-wrapper">\n            <img class="news-item__photo" src="' + newsItem.urlToImage + '" alt="">\n        </div>\n        <h2 class="news-item__title">' + newsItem.title + '</h2>\n        <p class="news-item__description">' + newsItem.description + '</p>\n    </a>\n</article>';
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this2 = this;

            var section = document.querySelector('section');

            getNewsData(this.source.current).then(function (data) {
                if (section) {
                    document.body.removeChild(section);
                }

                section = document.createElement('section');
                section.className = 'news-list';
                section.innerHTML = '<h1>' + data[0].source.name + '</h1>';
                data.forEach(function (item) {
                    return section.innerHTML += _this2.getArticle(item);
                });
                document.body.insertBefore(section, _this2.elements.footer);
            });
        }
    }]);

    return App;
}();

new App();