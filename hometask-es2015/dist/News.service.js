"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getUrl(src) {
    return "https://newsapi.org/v2/top-headlines?" + ("sources=" + src + "&") + "apiKey=ad6861683ef144d4bff3c2770a9841f2";
}

var NewsService = function () {
    function NewsService() {
        _classCallCheck(this, NewsService);
    }

    _createClass(NewsService, null, [{
        key: "getNewsData",
        value: function getNewsData(src) {
            var req = new Request(getUrl(src));

            return fetch(req).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data.articles;
            });
        }
    }]);

    return NewsService;
}();

// class NewsService {
//     static async getNewsData(src) {
//         let data, request, response;
//
//         request = new Request(getUrl(src));
//         response = await fetch(request),
//         data = await response.json();
//
//         return data.articles;
//     }
// }