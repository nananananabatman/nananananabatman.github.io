'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BBC_NEWS = 'bbc-news',
    DAILY_MAIL = 'daily-mail',
    MTV_NEWS = 'mtv-news',
    NATIONAL_GEOGRAPHIC = 'national-geographic',
    THE_NEW_YORK_TIMES = 'the-new-york-times';

var selectedSrc = void 0;

var Source = function () {
    function Source() {
        _classCallCheck(this, Source);

        selectedSrc = BBC_NEWS;
    }

    _createClass(Source, [{
        key: 'update',
        value: function update(newVal) {
            var newSource = void 0,
                buttons = void 0;

            switch (newVal) {
                case 'daily':
                    newSource = DAILY_MAIL;
                    break;
                case 'mtv':
                    newSource = MTV_NEWS;
                    break;
                case 'nat-geo':
                    newSource = NATIONAL_GEOGRAPHIC;
                    break;
                case 'times':
                    newSource = THE_NEW_YORK_TIMES;
                    break;
                default:
                    newSource = BBC_NEWS;
            }

            if (newSource !== selectedSrc) {
                buttons = [].concat(_toConsumableArray(document.querySelectorAll('.sources li')));
                buttons.forEach(function (item) {
                    return item.classList.remove('active');
                });
                selectedSrc = newSource;
                document.querySelector('.' + newVal).classList.add('active');

                return true;
            }

            return false;
        }
    }, {
        key: 'current',
        get: function get() {
            return selectedSrc;
        }
    }]);

    return Source;
}();