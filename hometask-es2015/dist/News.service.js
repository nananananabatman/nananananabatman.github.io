'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getUrl(src) {
    return 'https://newsapi.org/v2/top-headlines?' + ('sources=' + src + '&') + 'apiKey=ad6861683ef144d4bff3c2770a9841f2';
}

var NewsService = function () {
    function NewsService() {
        _classCallCheck(this, NewsService);
    }

    _createClass(NewsService, null, [{
        key: 'getNewsData',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src) {
                var data, response, url;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                data = void 0, response = void 0, url = void 0;


                                url = getUrl(src);
                                _context.next = 4;
                                return fetch(url);

                            case 4:
                                response = _context.sent;
                                _context.next = 7;
                                return response.json();

                            case 7:
                                data = _context.sent;
                                return _context.abrupt('return', data.articles);

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getNewsData(_x) {
                return _ref.apply(this, arguments);
            }

            return getNewsData;
        }()
    }]);

    return NewsService;
}();