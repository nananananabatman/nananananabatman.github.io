/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GameBoard = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EmptyBlock = __webpack_require__(3);

var _Figure = __webpack_require__(2);

var _localStorage = __webpack_require__(4);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GAME_BOARD_SIZE = 550,
    MIN_SPEED = 1000,
    SPEED_REDUCTION = 500;

var blocksOnPage = void 0,
    currentScore = void 0,
    currentSpeed = void 0,
    elementsOnBoard = void 0,
    intervalID = void 0,
    gameFinishedFlag = void 0,
    numberOfBlocks = void 0;

function checkInputValue() {
    var value = +document.querySelector('#number').value;

    return value >= 9 && value <= 15 ? value : 9;
}

function setInitValues() {
    blocksOnPage = [];
    currentSpeed = 2500;
    currentScore = parseInt(_localStorage.LocalStorageService.getFromStorage().get('currentScore')) || 0;
    elementsOnBoard = [];
    gameFinishedFlag = false;
    numberOfBlocks = checkInputValue();
    _EmptyBlock.EmptyBlock.setWidth((GAME_BOARD_SIZE / numberOfBlocks).toFixed(1) + 'px');
}

var GameBoard = exports.GameBoard = function () {
    function GameBoard() {
        _classCallCheck(this, GameBoard);

        this.gameBoard;
        this.scoreElement = document.getElementById('score');
        this.updateScoreElement();
        setInitValues();
        this.drawGameBoard();
        this.startGame();
    }

    _createClass(GameBoard, [{
        key: 'addNewElement',
        value: function addNewElement() {
            var newElem = new _Figure.Figure(),
                pointsXOfNewElem = newElem.block.map(function (item) {
                return item[1];
            }),
                middle = this.middle - Math.floor(Math.max.apply(Math, _toConsumableArray(pointsXOfNewElem)) / 2);

            newElem.block = newElem.block.map(function (item) {
                return [item[0], item[1] + middle];
            });

            if (newElem.canAddToBoard()) {
                elementsOnBoard.push(newElem);
            } else {
                document.removeEventListener('keydown', this.executeKeyDownAction);
                this.finishGame();
            }
            newElem.drawElementOnBoard(newElem.index);
        }
    }, {
        key: 'checkScore',
        value: function checkScore() {
            var _this = this;

            var _loop = function _loop(i) {
                if (!blocksOnPage[i].map(function (item) {
                    return item.box.className;
                }).includes('block-empty')) {
                    _this.levelup();
                    elementsOnBoard.forEach(function (item) {
                        return item.redrawElement(function () {
                            return item.block = item.block.filter(function (elem) {
                                return elem[0] !== i;
                            });
                        });
                    });
                }
            };

            for (var i = 0; i < blocksOnPage.length; ++i) {
                _loop(i);
            }

            elementsOnBoard = elementsOnBoard.filter(function (elem) {
                return elem.block.length !== 0;
            });
        }
    }, {
        key: 'drawGameBoard',
        value: function drawGameBoard() {
            this.gameBoard = document.createElement('div');
            this.gameBoard.className = 'game';
            document.body.appendChild(this.gameBoard);

            for (var i = 0; i < numberOfBlocks; ++i) {
                blocksOnPage.push([]);
                for (var j = 0; j < numberOfBlocks; ++j) {
                    blocksOnPage[i][j] = new _EmptyBlock.EmptyBlock(GAME_BOARD_SIZE, numberOfBlocks);
                    this.gameBoard.appendChild(blocksOnPage[i][j].box);
                }
            }
        }
    }, {
        key: 'executeKeyDownAction',
        value: function executeKeyDownAction(event) {
            var shift = void 0,
                element = elementsOnBoard[elementsOnBoard.length - 1];

            switch (event.keyCode) {
                case 37:
                    shift = -1;
                    break;
                case 39:
                    shift = 1;
                    break;
                default:
                    shift = undefined;
            }

            if (shift && element.canMoveElement([0, shift])) {
                element.moveBlock(1, shift);
            }
        }
    }, {
        key: 'finishGame',
        value: function finishGame() {
            _localStorage.LocalStorageService.updateStorage();
            gameFinishedFlag = true;
            clearInterval(intervalID);
        }
    }, {
        key: 'levelup',
        value: function levelup() {
            currentScore += numberOfBlocks;
            _localStorage.LocalStorageService.addValueToStorage('currentScore', currentScore);
            this.updateScoreElement();

            currentSpeed = currentSpeed === MIN_SPEED ? currentSpeed : currentSpeed - SPEED_REDUCTION;
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            var _this2 = this;

            clearInterval(intervalID);
            this.addNewElement();
            intervalID = setInterval(function () {
                elementsOnBoard.forEach(function (item, index) {
                    if (item.canMoveElement([1, 0])) {
                        item.moveBlock(0, 1);
                    } else {
                        if (index === elementsOnBoard.length - 1) {
                            _this2.checkScore();
                            if (!gameFinishedFlag) {
                                _this2.addNewElement();
                            }
                        }
                    }
                });
            }, currentSpeed);
        }
    }, {
        key: 'updateScoreElement',
        value: function updateScoreElement() {
            this.scoreElement.innerText = currentScore || 0;
        }
    }, {
        key: 'middle',
        get: function get() {
            return Math.floor(numberOfBlocks / 2);
        }
    }], [{
        key: 'drawBlock',
        value: function drawBlock(block, index) {
            blocksOnPage[block[0]][block[1]].changeBlockStyle(index);
        }
    }, {
        key: 'tryAddBlock',
        value: function tryAddBlock(block) {
            try {
                return blocksOnPage[block[0]][block[1]].isEmpty();
            } catch (err) {
                return false;
            }
        }
    }]);

    return GameBoard;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameBoard = __webpack_require__(0);

document.querySelector('#start').addEventListener('click', init);

var board = void 0;

function init() {
    if (board) {
        document.body.removeChild(board.gameBoard);
    }

    board = new _GameBoard.GameBoard();

    document.addEventListener('keydown', board.executeKeyDownAction);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Figure = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameBoard = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BLOCKS = [[[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [0, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [0, 2], [1, 0]], [[0, 0], [0, 1], [1, 0], [1, 1]], [[0, 1], [0, 2], [1, 0], [1, 1]], [[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 0], [0, 1], [1, 1], [1, 2]]];

var Figure = exports.Figure = function () {
    function Figure() {
        _classCallCheck(this, Figure);

        this.index = Math.floor(Math.random() * 7), this.block = BLOCKS[this.index];
    }

    _createClass(Figure, [{
        key: 'canAddToBoard',
        value: function canAddToBoard() {
            var canAdd = true;

            this.block.forEach(function (item) {
                return canAdd = canAdd && _GameBoard.GameBoard.tryAddBlock(item);
            });

            return canAdd;
        }
    }, {
        key: 'canMoveElement',
        value: function canMoveElement(shift) {
            var _this = this;

            var perhabsNewPosition = this.block.map(function (item) {
                return [item[0] + shift[0], item[1] + shift[1]];
            }),
                canMove = true;

            perhabsNewPosition.forEach(function (item) {
                if (!_this.block.map(function (item) {
                    return item.toString();
                }).includes(item.toString())) {
                    canMove = canMove && _GameBoard.GameBoard.tryAddBlock(item);
                }
            });

            return canMove;
        }
    }, {
        key: 'drawElementOnBoard',
        value: function drawElementOnBoard(colorIndex) {
            this.block.map(function (item) {
                return _GameBoard.GameBoard.drawBlock(item, colorIndex);
            });
        }
    }, {
        key: 'moveBlock',
        value: function moveBlock(position, shift) {
            var _this2 = this;

            this.redrawElement(function () {
                return _this2.block.map(function (item) {
                    return item[position] += shift;
                });
            });
        }
    }, {
        key: 'redrawElement',
        value: function redrawElement(filteredBlock) {
            this.drawElementOnBoard();
            filteredBlock();
            this.drawElementOnBoard(this.index);
        }
    }]);

    return Figure;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var width = void 0;

var EmptyBlock = exports.EmptyBlock = function () {
    function EmptyBlock() {
        _classCallCheck(this, EmptyBlock);

        this.box = document.createElement('div');
        this.box.className = 'block-empty';
        this.box.style.width = this.box.style.height = width;
    }

    _createClass(EmptyBlock, [{
        key: 'changeBlockStyle',
        value: function changeBlockStyle(styleBlock) {
            var elClass = void 0,
                color = void 0;

            switch (styleBlock) {
                case 0:
                    elClass = 'block-i';color = '#81F7F3';break;
                case 1:
                    elClass = 'block-j';color = '#8181F7';break;
                case 2:
                    elClass = 'block-l';color = '#FE9A2E';break;
                case 3:
                    elClass = 'block-o';color = '#F3F781';break;
                case 4:
                    elClass = 'block-s';color = '#81F781';break;
                case 5:
                    elClass = 'block-t';color = '#DA81F5';break;
                case 6:
                    elClass = 'block-z';color = '#F78181';break;
                default:
                    elClass = 'block-empty';color = '#D8D8D8';
            }

            this.box.className = elClass;
            this.box.style.backgroundColor = color;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.box.className === 'block-empty';
        }
    }], [{
        key: 'setWidth',
        value: function setWidth(value) {
            width = value;
        }
    }]);

    return EmptyBlock;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var map = void 0;

var LocalStorageService = exports.LocalStorageService = function () {
    function LocalStorageService() {
        _classCallCheck(this, LocalStorageService);
    }

    _createClass(LocalStorageService, null, [{
        key: "addValueToStorage",
        value: function addValueToStorage(name, score) {
            if (!map.has(name) || map.has(name) && map.get(name) < score) {
                map.set(name, score);
            }
        }
    }, {
        key: "getFromStorage",
        value: function getFromStorage() {
            map = new Map();
            if (localStorage.length !== 0) {
                for (var i = 0; i < localStorage.length; ++i) {
                    map.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
                }

                localStorage.clear();
            }

            return map;
        }
    }, {
        key: "updateStorage",
        value: function updateStorage() {
            map.forEach(function (value, key) {
                localStorage.setItem(key, value);
            });
        }
    }]);

    return LocalStorageService;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2NkMWYwM2ZhYjdhMWRjYzAwYzIiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0ZpZ3VyZS5jbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9sb2NhbFN0b3JhZ2Uuc2VydmljZS5qcyJdLCJuYW1lcyI6WyJHQU1FX0JPQVJEX1NJWkUiLCJNSU5fU1BFRUQiLCJTUEVFRF9SRURVQ1RJT04iLCJibG9ja3NPblBhZ2UiLCJjdXJyZW50U2NvcmUiLCJjdXJyZW50U3BlZWQiLCJlbGVtZW50c09uQm9hcmQiLCJpbnRlcnZhbElEIiwiZ2FtZUZpbmlzaGVkRmxhZyIsIm51bWJlck9mQmxvY2tzIiwiY2hlY2tJbnB1dFZhbHVlIiwidmFsdWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRJbml0VmFsdWVzIiwicGFyc2VJbnQiLCJnZXRGcm9tU3RvcmFnZSIsImdldCIsInNldFdpZHRoIiwidG9GaXhlZCIsIkdhbWVCb2FyZCIsImdhbWVCb2FyZCIsInNjb3JlRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwidXBkYXRlU2NvcmVFbGVtZW50IiwiZHJhd0dhbWVCb2FyZCIsInN0YXJ0R2FtZSIsIm5ld0VsZW0iLCJwb2ludHNYT2ZOZXdFbGVtIiwiYmxvY2siLCJtYXAiLCJpdGVtIiwibWlkZGxlIiwiTWF0aCIsImZsb29yIiwibWF4IiwiY2FuQWRkVG9Cb2FyZCIsInB1c2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXhlY3V0ZUtleURvd25BY3Rpb24iLCJmaW5pc2hHYW1lIiwiZHJhd0VsZW1lbnRPbkJvYXJkIiwiaW5kZXgiLCJpIiwiYm94IiwiY2xhc3NOYW1lIiwiaW5jbHVkZXMiLCJsZXZlbHVwIiwiZm9yRWFjaCIsInJlZHJhd0VsZW1lbnQiLCJmaWx0ZXIiLCJlbGVtIiwibGVuZ3RoIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImoiLCJldmVudCIsInNoaWZ0IiwiZWxlbWVudCIsImtleUNvZGUiLCJ1bmRlZmluZWQiLCJjYW5Nb3ZlRWxlbWVudCIsIm1vdmVCbG9jayIsInVwZGF0ZVN0b3JhZ2UiLCJjbGVhckludGVydmFsIiwiYWRkVmFsdWVUb1N0b3JhZ2UiLCJhZGROZXdFbGVtZW50Iiwic2V0SW50ZXJ2YWwiLCJjaGVja1Njb3JlIiwiaW5uZXJUZXh0IiwiY2hhbmdlQmxvY2tTdHlsZSIsImlzRW1wdHkiLCJlcnIiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdCIsImJvYXJkIiwicmVtb3ZlQ2hpbGQiLCJCTE9DS1MiLCJGaWd1cmUiLCJyYW5kb20iLCJjYW5BZGQiLCJ0cnlBZGRCbG9jayIsInBlcmhhYnNOZXdQb3NpdGlvbiIsImNhbk1vdmUiLCJ0b1N0cmluZyIsImNvbG9ySW5kZXgiLCJkcmF3QmxvY2siLCJwb3NpdGlvbiIsImZpbHRlcmVkQmxvY2siLCJ3aWR0aCIsIkVtcHR5QmxvY2siLCJzdHlsZSIsImhlaWdodCIsInN0eWxlQmxvY2siLCJlbENsYXNzIiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJMb2NhbFN0b3JhZ2VTZXJ2aWNlIiwibmFtZSIsInNjb3JlIiwiaGFzIiwic2V0IiwiTWFwIiwibG9jYWxTdG9yYWdlIiwia2V5IiwiZ2V0SXRlbSIsImNsZWFyIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCLEdBQXhCO0FBQUEsSUFDSUMsWUFBWSxJQURoQjtBQUFBLElBRUlDLGtCQUFrQixHQUZ0Qjs7QUFJQSxJQUFJQyxxQkFBSjtBQUFBLElBQ0lDLHFCQURKO0FBQUEsSUFFSUMscUJBRko7QUFBQSxJQUdJQyx3QkFISjtBQUFBLElBSUlDLG1CQUpKO0FBQUEsSUFLSUMseUJBTEo7QUFBQSxJQU1JQyx1QkFOSjs7QUFRQSxTQUFTQyxlQUFULEdBQTJCO0FBQ3ZCLFFBQUlDLFFBQVEsQ0FBQ0MsU0FBU0MsYUFBVCxDQUF1QixTQUF2QixFQUFrQ0YsS0FBL0M7O0FBRUEsV0FBT0EsU0FBUyxDQUFULElBQWNBLFNBQVMsRUFBdkIsR0FBNEJBLEtBQTVCLEdBQW9DLENBQTNDO0FBQ0g7O0FBRUQsU0FBU0csYUFBVCxHQUF5QjtBQUNyQlgsbUJBQWUsRUFBZjtBQUNBRSxtQkFBZSxJQUFmO0FBQ0FELG1CQUFlVyxTQUFTLGtDQUFvQkMsY0FBcEIsR0FBcUNDLEdBQXJDLENBQXlDLGNBQXpDLENBQVQsS0FBc0UsQ0FBckY7QUFDQVgsc0JBQWtCLEVBQWxCO0FBQ0FFLHVCQUFtQixLQUFuQjtBQUNBQyxxQkFBaUJDLGlCQUFqQjtBQUNBLDJCQUFXUSxRQUFYLENBQW9CLENBQUNsQixrQkFBa0JTLGNBQW5CLEVBQW1DVSxPQUFuQyxDQUEyQyxDQUEzQyxJQUFnRCxJQUFwRTtBQUNIOztJQUVZQyxTLFdBQUFBLFM7QUFDVCx5QkFBYztBQUFBOztBQUNWLGFBQUtDLFNBQUw7QUFDQSxhQUFLQyxZQUFMLEdBQW9CVixTQUFTVyxjQUFULENBQXdCLE9BQXhCLENBQXBCO0FBQ0EsYUFBS0Msa0JBQUw7QUFDQVY7QUFDQSxhQUFLVyxhQUFMO0FBQ0EsYUFBS0MsU0FBTDtBQUNIOzs7O3dDQU1lO0FBQ1osZ0JBQUlDLFVBQVUsb0JBQWQ7QUFBQSxnQkFDSUMsbUJBQW1CRCxRQUFRRSxLQUFSLENBQWNDLEdBQWQsQ0FBa0I7QUFBQSx1QkFBUUMsS0FBSyxDQUFMLENBQVI7QUFBQSxhQUFsQixDQUR2QjtBQUFBLGdCQUVJQyxTQUFTLEtBQUtBLE1BQUwsR0FBY0MsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxHQUFMLGdDQUFZUCxnQkFBWixLQUFnQyxDQUEzQyxDQUYzQjs7QUFJQUQsb0JBQVFFLEtBQVIsR0FBZ0JGLFFBQVFFLEtBQVIsQ0FBY0MsR0FBZCxDQUFrQjtBQUFBLHVCQUFRLENBQUNDLEtBQUssQ0FBTCxDQUFELEVBQVVBLEtBQUssQ0FBTCxJQUFVQyxNQUFwQixDQUFSO0FBQUEsYUFBbEIsQ0FBaEI7O0FBRUEsZ0JBQUlMLFFBQVFTLGFBQVIsRUFBSixFQUE2QjtBQUN6QjlCLGdDQUFnQitCLElBQWhCLENBQXFCVixPQUFyQjtBQUNILGFBRkQsTUFFTztBQUNIZix5QkFBUzBCLG1CQUFULENBQTZCLFNBQTdCLEVBQXdDLEtBQUtDLG9CQUE3QztBQUNBLHFCQUFLQyxVQUFMO0FBQ0g7QUFDRGIsb0JBQVFjLGtCQUFSLENBQTJCZCxRQUFRZSxLQUFuQztBQUNIOzs7cUNBRVk7QUFBQTs7QUFBQSx1Q0FDQUMsQ0FEQTtBQUVMLG9CQUFHLENBQUN4QyxhQUFhd0MsQ0FBYixFQUFnQmIsR0FBaEIsQ0FBb0I7QUFBQSwyQkFBUUMsS0FBS2EsR0FBTCxDQUFTQyxTQUFqQjtBQUFBLGlCQUFwQixFQUFnREMsUUFBaEQsQ0FBeUQsYUFBekQsQ0FBSixFQUE2RTtBQUN6RSwwQkFBS0MsT0FBTDtBQUNBekMsb0NBQWdCMEMsT0FBaEIsQ0FBd0I7QUFBQSwrQkFBUWpCLEtBQUtrQixhQUFMLENBQW1CO0FBQUEsbUNBQU1sQixLQUFLRixLQUFMLEdBQWFFLEtBQUtGLEtBQUwsQ0FBV3FCLE1BQVgsQ0FBa0I7QUFBQSx1Q0FBUUMsS0FBSyxDQUFMLE1BQVlSLENBQXBCO0FBQUEsNkJBQWxCLENBQW5CO0FBQUEseUJBQW5CLENBQVI7QUFBQSxxQkFBeEI7QUFDSDtBQUxJOztBQUNULGlCQUFLLElBQUlBLElBQUksQ0FBYixFQUFnQkEsSUFBSXhDLGFBQWFpRCxNQUFqQyxFQUF5QyxFQUFFVCxDQUEzQyxFQUE4QztBQUFBLHNCQUFyQ0EsQ0FBcUM7QUFLN0M7O0FBRURyQyw4QkFBa0JBLGdCQUFnQjRDLE1BQWhCLENBQXVCO0FBQUEsdUJBQVFDLEtBQUt0QixLQUFMLENBQVd1QixNQUFYLEtBQXNCLENBQTlCO0FBQUEsYUFBdkIsQ0FBbEI7QUFDSDs7O3dDQUVlO0FBQ1osaUJBQUsvQixTQUFMLEdBQWlCVCxTQUFTeUMsYUFBVCxDQUF1QixLQUF2QixDQUFqQjtBQUNBLGlCQUFLaEMsU0FBTCxDQUFld0IsU0FBZixHQUEyQixNQUEzQjtBQUNBakMscUJBQVMwQyxJQUFULENBQWNDLFdBQWQsQ0FBMEIsS0FBS2xDLFNBQS9COztBQUVBLGlCQUFLLElBQUlzQixJQUFJLENBQWIsRUFBZ0JBLElBQUlsQyxjQUFwQixFQUFvQyxFQUFFa0MsQ0FBdEMsRUFBeUM7QUFDckN4Qyw2QkFBYWtDLElBQWIsQ0FBa0IsRUFBbEI7QUFDQSxxQkFBSyxJQUFJbUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJL0MsY0FBcEIsRUFBb0MsRUFBRStDLENBQXRDLEVBQXlDO0FBQ3JDckQsaUNBQWF3QyxDQUFiLEVBQWdCYSxDQUFoQixJQUFxQiwyQkFBZXhELGVBQWYsRUFBZ0NTLGNBQWhDLENBQXJCO0FBQ0EseUJBQUtZLFNBQUwsQ0FBZWtDLFdBQWYsQ0FBMkJwRCxhQUFhd0MsQ0FBYixFQUFnQmEsQ0FBaEIsRUFBbUJaLEdBQTlDO0FBQ0g7QUFDSjtBQUNKOzs7NkNBRW9CYSxLLEVBQU87QUFDeEIsZ0JBQUlDLGNBQUo7QUFBQSxnQkFDSUMsVUFBVXJELGdCQUFnQkEsZ0JBQWdCOEMsTUFBaEIsR0FBeUIsQ0FBekMsQ0FEZDs7QUFHQSxvQkFBT0ssTUFBTUcsT0FBYjtBQUNBLHFCQUFLLEVBQUw7QUFBU0YsNEJBQVEsQ0FBQyxDQUFUO0FBQ0w7QUFDSixxQkFBSyxFQUFMO0FBQVNBLDRCQUFRLENBQVI7QUFDTDtBQUNKO0FBQVNBLDRCQUFRRyxTQUFSO0FBTFQ7O0FBUUEsZ0JBQUlILFNBQVNDLFFBQVFHLGNBQVIsQ0FBdUIsQ0FBQyxDQUFELEVBQUlKLEtBQUosQ0FBdkIsQ0FBYixFQUFpRDtBQUM3Q0Msd0JBQVFJLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUJMLEtBQXJCO0FBQ0g7QUFDSjs7O3FDQUVZO0FBQ1QsOENBQW9CTSxhQUFwQjtBQUNBeEQsK0JBQW1CLElBQW5CO0FBQ0F5RCwwQkFBYzFELFVBQWQ7QUFDSDs7O2tDQUVTO0FBQ05ILDRCQUFnQkssY0FBaEI7QUFDQSw4Q0FBb0J5RCxpQkFBcEIsQ0FBc0MsY0FBdEMsRUFBc0Q5RCxZQUF0RDtBQUNBLGlCQUFLb0Isa0JBQUw7O0FBRUFuQiwyQkFBZUEsaUJBQWlCSixTQUFqQixHQUE2QkksWUFBN0IsR0FBNENBLGVBQWVILGVBQTFFO0FBQ0g7OztvQ0FFVztBQUFBOztBQUNSK0QsMEJBQWMxRCxVQUFkO0FBQ0EsaUJBQUs0RCxhQUFMO0FBQ0E1RCx5QkFBYTZELFlBQVksWUFBTTtBQUMzQjlELGdDQUFnQjBDLE9BQWhCLENBQXdCLFVBQUNqQixJQUFELEVBQU9XLEtBQVAsRUFBaUI7QUFDckMsd0JBQUlYLEtBQUsrQixjQUFMLENBQW9CLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBcEIsQ0FBSixFQUFpQztBQUM3Qi9CLDZCQUFLZ0MsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEI7QUFDSCxxQkFGRCxNQUVPO0FBQ0gsNEJBQUlyQixVQUFVcEMsZ0JBQWdCOEMsTUFBaEIsR0FBeUIsQ0FBdkMsRUFBMEM7QUFDdEMsbUNBQUtpQixVQUFMO0FBQ0EsZ0NBQUksQ0FBQzdELGdCQUFMLEVBQXVCO0FBQ25CLHVDQUFLMkQsYUFBTDtBQUNIO0FBQ0o7QUFDSjtBQUNKLGlCQVhEO0FBYUgsYUFkWSxFQWNWOUQsWUFkVSxDQUFiO0FBZUg7Ozs2Q0FFb0I7QUFDakIsaUJBQUtpQixZQUFMLENBQWtCZ0QsU0FBbEIsR0FBOEJsRSxnQkFBZ0IsQ0FBOUM7QUFDSDs7OzRCQWxHWTtBQUNULG1CQUFPNkIsS0FBS0MsS0FBTCxDQUFXekIsaUJBQWlCLENBQTVCLENBQVA7QUFDSDs7O2tDQWtHZ0JvQixLLEVBQU9hLEssRUFBTztBQUMzQnZDLHlCQUFhMEIsTUFBTSxDQUFOLENBQWIsRUFBdUJBLE1BQU0sQ0FBTixDQUF2QixFQUFpQzBDLGdCQUFqQyxDQUFrRDdCLEtBQWxEO0FBQ0g7OztvQ0FFa0JiLEssRUFBTztBQUN0QixnQkFBSTtBQUNBLHVCQUFPMUIsYUFBYTBCLE1BQU0sQ0FBTixDQUFiLEVBQXVCQSxNQUFNLENBQU4sQ0FBdkIsRUFBaUMyQyxPQUFqQyxFQUFQO0FBQ0gsYUFGRCxDQUVFLE9BQU1DLEdBQU4sRUFBVztBQUNULHVCQUFPLEtBQVA7QUFDSDtBQUNKOzs7Ozs7Ozs7Ozs7O0FDeEpMOztBQUVBN0QsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixFQUFpQzZELGdCQUFqQyxDQUFrRCxPQUFsRCxFQUEyREMsSUFBM0Q7O0FBRUEsSUFBSUMsY0FBSjs7QUFFQSxTQUFTRCxJQUFULEdBQWdCO0FBQ1osUUFBSUMsS0FBSixFQUFXO0FBQ1BoRSxpQkFBUzBDLElBQVQsQ0FBY3VCLFdBQWQsQ0FBMEJELE1BQU12RCxTQUFoQztBQUNIOztBQUVEdUQsWUFBUSwwQkFBUjs7QUFFQWhFLGFBQVM4RCxnQkFBVCxDQUEwQixTQUExQixFQUFxQ0UsTUFBTXJDLG9CQUEzQztBQUNILEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkRDs7OztBQUVBLElBQU11QyxTQUFTLENBQ1gsQ0FBQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVQsRUFBaUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFqQixFQUF5QixDQUFDLENBQUQsRUFBSSxDQUFKLENBQXpCLENBRFcsRUFFWCxDQUFDLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBRCxFQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBVCxFQUFpQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpCLEVBQXlCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBekIsQ0FGVyxFQUdYLENBQUMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFELEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFULEVBQWlCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakIsRUFBeUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF6QixDQUhXLEVBSVgsQ0FBQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVQsRUFBaUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFqQixFQUF5QixDQUFDLENBQUQsRUFBSSxDQUFKLENBQXpCLENBSlcsRUFLWCxDQUFDLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBRCxFQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBVCxFQUFpQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpCLEVBQXlCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBekIsQ0FMVyxFQU1YLENBQUMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFELEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFULEVBQWlCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakIsRUFBeUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF6QixDQU5XLEVBT1gsQ0FBQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVQsRUFBaUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFqQixFQUF5QixDQUFDLENBQUQsRUFBSSxDQUFKLENBQXpCLENBUFcsQ0FBZjs7SUFVYUMsTSxXQUFBQSxNO0FBQ1Qsc0JBQWM7QUFBQTs7QUFDVixhQUFLckMsS0FBTCxHQUFhVCxLQUFLQyxLQUFMLENBQVdELEtBQUsrQyxNQUFMLEtBQWdCLENBQTNCLENBQWIsRUFDQSxLQUFLbkQsS0FBTCxHQUFhaUQsT0FBTyxLQUFLcEMsS0FBWixDQURiO0FBRUg7Ozs7d0NBRWU7QUFDWixnQkFBSXVDLFNBQVMsSUFBYjs7QUFFQSxpQkFBS3BELEtBQUwsQ0FBV21CLE9BQVgsQ0FBbUI7QUFBQSx1QkFBUWlDLFNBQVNBLFVBQVUscUJBQVVDLFdBQVYsQ0FBc0JuRCxJQUF0QixDQUEzQjtBQUFBLGFBQW5COztBQUVBLG1CQUFPa0QsTUFBUDtBQUNIOzs7dUNBRWN2QixLLEVBQU87QUFBQTs7QUFDbEIsZ0JBQUl5QixxQkFBcUIsS0FBS3RELEtBQUwsQ0FBV0MsR0FBWCxDQUFlO0FBQUEsdUJBQVEsQ0FBQ0MsS0FBSyxDQUFMLElBQVUyQixNQUFNLENBQU4sQ0FBWCxFQUFxQjNCLEtBQUssQ0FBTCxJQUFVMkIsTUFBTSxDQUFOLENBQS9CLENBQVI7QUFBQSxhQUFmLENBQXpCO0FBQUEsZ0JBQ0kwQixVQUFVLElBRGQ7O0FBR0FELCtCQUFtQm5DLE9BQW5CLENBQTJCLGdCQUFRO0FBQy9CLG9CQUFJLENBQUMsTUFBS25CLEtBQUwsQ0FBV0MsR0FBWCxDQUFlO0FBQUEsMkJBQVFDLEtBQUtzRCxRQUFMLEVBQVI7QUFBQSxpQkFBZixFQUF3Q3ZDLFFBQXhDLENBQWlEZixLQUFLc0QsUUFBTCxFQUFqRCxDQUFMLEVBQXdFO0FBQ3BFRCw4QkFBVUEsV0FBVyxxQkFBVUYsV0FBVixDQUFzQm5ELElBQXRCLENBQXJCO0FBQ0g7QUFDSixhQUpEOztBQU1BLG1CQUFPcUQsT0FBUDtBQUNIOzs7MkNBRWtCRSxVLEVBQVk7QUFDM0IsaUJBQUt6RCxLQUFMLENBQVdDLEdBQVgsQ0FBZTtBQUFBLHVCQUFRLHFCQUFVeUQsU0FBVixDQUFvQnhELElBQXBCLEVBQTBCdUQsVUFBMUIsQ0FBUjtBQUFBLGFBQWY7QUFDSDs7O2tDQUVTRSxRLEVBQVU5QixLLEVBQU87QUFBQTs7QUFDdkIsaUJBQUtULGFBQUwsQ0FBbUI7QUFBQSx1QkFBTSxPQUFLcEIsS0FBTCxDQUFXQyxHQUFYLENBQWU7QUFBQSwyQkFBUUMsS0FBS3lELFFBQUwsS0FBa0I5QixLQUExQjtBQUFBLGlCQUFmLENBQU47QUFBQSxhQUFuQjtBQUNIOzs7c0NBRWErQixhLEVBQWU7QUFDekIsaUJBQUtoRCxrQkFBTDtBQUNBZ0Q7QUFDQSxpQkFBS2hELGtCQUFMLENBQXdCLEtBQUtDLEtBQTdCO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25ETCxJQUFJZ0QsY0FBSjs7SUFFYUMsVSxXQUFBQSxVO0FBQ1QsMEJBQWM7QUFBQTs7QUFDVixhQUFLL0MsR0FBTCxHQUFXaEMsU0FBU3lDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWDtBQUNBLGFBQUtULEdBQUwsQ0FBU0MsU0FBVCxHQUFxQixhQUFyQjtBQUNBLGFBQUtELEdBQUwsQ0FBU2dELEtBQVQsQ0FBZUYsS0FBZixHQUF1QixLQUFLOUMsR0FBTCxDQUFTZ0QsS0FBVCxDQUFlQyxNQUFmLEdBQXdCSCxLQUEvQztBQUNIOzs7O3lDQUVnQkksVSxFQUFZO0FBQ3pCLGdCQUFJQyxnQkFBSjtBQUFBLGdCQUFhQyxjQUFiOztBQUVBLG9CQUFPRixVQUFQO0FBQ0EscUJBQUssQ0FBTDtBQUFRQyw4QkFBVSxTQUFWLENBQXFCQyxRQUFRLFNBQVIsQ0FBbUI7QUFDaEQscUJBQUssQ0FBTDtBQUFRRCw4QkFBVSxTQUFWLENBQXFCQyxRQUFRLFNBQVIsQ0FBbUI7QUFDaEQscUJBQUssQ0FBTDtBQUFRRCw4QkFBVSxTQUFWLENBQXFCQyxRQUFRLFNBQVIsQ0FBbUI7QUFDaEQscUJBQUssQ0FBTDtBQUFRRCw4QkFBVSxTQUFWLENBQXFCQyxRQUFRLFNBQVIsQ0FBbUI7QUFDaEQscUJBQUssQ0FBTDtBQUFRRCw4QkFBVSxTQUFWLENBQXFCQyxRQUFRLFNBQVIsQ0FBbUI7QUFDaEQscUJBQUssQ0FBTDtBQUFRRCw4QkFBVSxTQUFWLENBQXFCQyxRQUFRLFNBQVIsQ0FBbUI7QUFDaEQscUJBQUssQ0FBTDtBQUFRRCw4QkFBVSxTQUFWLENBQXFCQyxRQUFRLFNBQVIsQ0FBbUI7QUFDaEQ7QUFBU0QsOEJBQVUsYUFBVixDQUF5QkMsUUFBUSxTQUFSO0FBUmxDOztBQVdBLGlCQUFLcEQsR0FBTCxDQUFTQyxTQUFULEdBQXFCa0QsT0FBckI7QUFDQSxpQkFBS25ELEdBQUwsQ0FBU2dELEtBQVQsQ0FBZUssZUFBZixHQUFpQ0QsS0FBakM7QUFDSDs7O2tDQUVTO0FBQ04sbUJBQU8sS0FBS3BELEdBQUwsQ0FBU0MsU0FBVCxLQUF1QixhQUE5QjtBQUNIOzs7aUNBRWVsQyxLLEVBQU87QUFDbkIrRSxvQkFBUS9FLEtBQVI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNMLElBQUltQixZQUFKOztJQUVhb0UsbUIsV0FBQUEsbUI7Ozs7Ozs7MENBQ2dCQyxJLEVBQU1DLEssRUFBTztBQUNsQyxnQkFBRyxDQUFDdEUsSUFBSXVFLEdBQUosQ0FBUUYsSUFBUixDQUFELElBQW1CckUsSUFBSXVFLEdBQUosQ0FBUUYsSUFBUixLQUFpQnJFLElBQUliLEdBQUosQ0FBUWtGLElBQVIsSUFBZ0JDLEtBQXZELEVBQStEO0FBQzNEdEUsb0JBQUl3RSxHQUFKLENBQVFILElBQVIsRUFBY0MsS0FBZDtBQUNIO0FBQ0o7Ozt5Q0FFdUI7QUFDcEJ0RSxrQkFBTSxJQUFJeUUsR0FBSixFQUFOO0FBQ0EsZ0JBQUlDLGFBQWFwRCxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzNCLHFCQUFJLElBQUlULElBQUksQ0FBWixFQUFlQSxJQUFJNkQsYUFBYXBELE1BQWhDLEVBQXdDLEVBQUVULENBQTFDLEVBQTZDO0FBQ3pDYix3QkFBSXdFLEdBQUosQ0FBUUUsYUFBYUMsR0FBYixDQUFpQjlELENBQWpCLENBQVIsRUFBNkI2RCxhQUFhRSxPQUFiLENBQXFCRixhQUFhQyxHQUFiLENBQWlCOUQsQ0FBakIsQ0FBckIsQ0FBN0I7QUFDSDs7QUFFRDZELDZCQUFhRyxLQUFiO0FBQ0g7O0FBRUQsbUJBQU83RSxHQUFQO0FBQ0g7Ozt3Q0FFc0I7QUFDbkJBLGdCQUFJa0IsT0FBSixDQUFZLFVBQUNyQyxLQUFELEVBQVE4RixHQUFSLEVBQWdCO0FBQ3hCRCw2QkFBYUksT0FBYixDQUFxQkgsR0FBckIsRUFBMEI5RixLQUExQjtBQUNILGFBRkQ7QUFHSCIsImZpbGUiOiIuL2Rpc3QvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2NkMWYwM2ZhYjdhMWRjYzAwYzIiLCJpbXBvcnQge0VtcHR5QmxvY2t9IGZyb20gJy4vRW1wdHlCbG9jay5jbGFzcyc7XG5pbXBvcnQge0ZpZ3VyZX0gZnJvbSAnLi9GaWd1cmUuY2xhc3MnO1xuaW1wb3J0IHtMb2NhbFN0b3JhZ2VTZXJ2aWNlfSBmcm9tICcuL2xvY2FsU3RvcmFnZS5zZXJ2aWNlJztcblxuY29uc3QgR0FNRV9CT0FSRF9TSVpFID0gNTUwLFxuICAgIE1JTl9TUEVFRCA9IDEwMDAsXG4gICAgU1BFRURfUkVEVUNUSU9OID0gNTAwO1xuXG5sZXQgYmxvY2tzT25QYWdlLFxuICAgIGN1cnJlbnRTY29yZSxcbiAgICBjdXJyZW50U3BlZWQsXG4gICAgZWxlbWVudHNPbkJvYXJkLFxuICAgIGludGVydmFsSUQsXG4gICAgZ2FtZUZpbmlzaGVkRmxhZyxcbiAgICBudW1iZXJPZkJsb2NrcztcblxuZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xuICAgIGxldCB2YWx1ZSA9ICtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbnVtYmVyJykudmFsdWU7XG5cbiAgICByZXR1cm4gdmFsdWUgPj0gOSAmJiB2YWx1ZSA8PSAxNSA/IHZhbHVlIDogOTtcbn1cblxuZnVuY3Rpb24gc2V0SW5pdFZhbHVlcygpIHtcbiAgICBibG9ja3NPblBhZ2UgPSBbXTtcbiAgICBjdXJyZW50U3BlZWQgPSAyNTAwO1xuICAgIGN1cnJlbnRTY29yZSA9IHBhcnNlSW50KExvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0RnJvbVN0b3JhZ2UoKS5nZXQoJ2N1cnJlbnRTY29yZScpKSB8fCAwO1xuICAgIGVsZW1lbnRzT25Cb2FyZCA9IFtdO1xuICAgIGdhbWVGaW5pc2hlZEZsYWcgPSBmYWxzZTtcbiAgICBudW1iZXJPZkJsb2NrcyA9IGNoZWNrSW5wdXRWYWx1ZSgpO1xuICAgIEVtcHR5QmxvY2suc2V0V2lkdGgoKEdBTUVfQk9BUkRfU0laRSAvIG51bWJlck9mQmxvY2tzKS50b0ZpeGVkKDEpICsgJ3B4Jyk7XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZDtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZUVsZW1lbnQoKTtcbiAgICAgICAgc2V0SW5pdFZhbHVlcygpO1xuICAgICAgICB0aGlzLmRyYXdHYW1lQm9hcmQoKTtcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgICB9XG5cbiAgICBnZXQgbWlkZGxlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXJPZkJsb2NrcyAvIDIpO1xuICAgIH1cblxuICAgIGFkZE5ld0VsZW1lbnQoKSB7XG4gICAgICAgIGxldCBuZXdFbGVtID0gbmV3IEZpZ3VyZSgpLFxuICAgICAgICAgICAgcG9pbnRzWE9mTmV3RWxlbSA9IG5ld0VsZW0uYmxvY2subWFwKGl0ZW0gPT4gaXRlbVsxXSksXG4gICAgICAgICAgICBtaWRkbGUgPSB0aGlzLm1pZGRsZSAtIE1hdGguZmxvb3IoTWF0aC5tYXgoLi4ucG9pbnRzWE9mTmV3RWxlbSkgLyAyKTtcblxuICAgICAgICBuZXdFbGVtLmJsb2NrID0gbmV3RWxlbS5ibG9jay5tYXAoaXRlbSA9PiBbaXRlbVswXSwgaXRlbVsxXSArIG1pZGRsZV0pO1xuXG4gICAgICAgIGlmIChuZXdFbGVtLmNhbkFkZFRvQm9hcmQoKSkge1xuICAgICAgICAgICAgZWxlbWVudHNPbkJvYXJkLnB1c2gobmV3RWxlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5leGVjdXRlS2V5RG93bkFjdGlvbik7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaEdhbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdFbGVtLmRyYXdFbGVtZW50T25Cb2FyZChuZXdFbGVtLmluZGV4KTtcbiAgICB9XG5cbiAgICBjaGVja1Njb3JlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2Nrc09uUGFnZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYoIWJsb2Nrc09uUGFnZVtpXS5tYXAoaXRlbSA9PiBpdGVtLmJveC5jbGFzc05hbWUpLmluY2x1ZGVzKCdibG9jay1lbXB0eScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbHVwKCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNPbkJvYXJkLmZvckVhY2goaXRlbSA9PiBpdGVtLnJlZHJhd0VsZW1lbnQoKCkgPT4gaXRlbS5ibG9jayA9IGl0ZW0uYmxvY2suZmlsdGVyKGVsZW0gPT4gZWxlbVswXSAhPT0gaSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRzT25Cb2FyZCA9IGVsZW1lbnRzT25Cb2FyZC5maWx0ZXIoZWxlbSA9PiBlbGVtLmJsb2NrLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxuXG4gICAgZHJhd0dhbWVCb2FyZCgpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQuY2xhc3NOYW1lID0gJ2dhbWUnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZ2FtZUJvYXJkKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mQmxvY2tzOyArK2kpIHtcbiAgICAgICAgICAgIGJsb2Nrc09uUGFnZS5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtYmVyT2ZCbG9ja3M7ICsraikge1xuICAgICAgICAgICAgICAgIGJsb2Nrc09uUGFnZVtpXVtqXSA9IG5ldyBFbXB0eUJsb2NrKEdBTUVfQk9BUkRfU0laRSwgbnVtYmVyT2ZCbG9ja3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUJvYXJkLmFwcGVuZENoaWxkKGJsb2Nrc09uUGFnZVtpXVtqXS5ib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhlY3V0ZUtleURvd25BY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbGV0IHNoaWZ0LFxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnRzT25Cb2FyZFtlbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzNzogc2hpZnQgPSAtMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM5OiBzaGlmdCA9IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogc2hpZnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hpZnQgJiYgZWxlbWVudC5jYW5Nb3ZlRWxlbWVudChbMCwgc2hpZnRdKSkge1xuICAgICAgICAgICAgZWxlbWVudC5tb3ZlQmxvY2soMSwgc2hpZnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluaXNoR2FtZSgpIHtcbiAgICAgICAgTG9jYWxTdG9yYWdlU2VydmljZS51cGRhdGVTdG9yYWdlKCk7XG4gICAgICAgIGdhbWVGaW5pc2hlZEZsYWcgPSB0cnVlO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgIH1cblxuICAgIGxldmVsdXAoKSB7XG4gICAgICAgIGN1cnJlbnRTY29yZSArPSBudW1iZXJPZkJsb2NrcztcbiAgICAgICAgTG9jYWxTdG9yYWdlU2VydmljZS5hZGRWYWx1ZVRvU3RvcmFnZSgnY3VycmVudFNjb3JlJywgY3VycmVudFNjb3JlKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZUVsZW1lbnQoKTtcblxuICAgICAgICBjdXJyZW50U3BlZWQgPSBjdXJyZW50U3BlZWQgPT09IE1JTl9TUEVFRCA/IGN1cnJlbnRTcGVlZCA6IGN1cnJlbnRTcGVlZCAtIFNQRUVEX1JFRFVDVElPTjtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgICAgIHRoaXMuYWRkTmV3RWxlbWVudCgpO1xuICAgICAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudHNPbkJvYXJkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2FuTW92ZUVsZW1lbnQoWzEsIDBdKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm1vdmVCbG9jaygwLCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IGVsZW1lbnRzT25Cb2FyZC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU2NvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ2FtZUZpbmlzaGVkRmxhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3RWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSwgY3VycmVudFNwZWVkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY29yZUVsZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRTY29yZSB8fCAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBkcmF3QmxvY2soYmxvY2ssIGluZGV4KSB7XG4gICAgICAgIGJsb2Nrc09uUGFnZVtibG9ja1swXV1bYmxvY2tbMV1dLmNoYW5nZUJsb2NrU3R5bGUoaW5kZXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cnlBZGRCbG9jayhibG9jaykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGJsb2Nrc09uUGFnZVtibG9ja1swXV1bYmxvY2tbMV1dLmlzRW1wdHkoKTtcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvR2FtZUJvYXJkLmNsYXNzLmpzIiwiaW1wb3J0IHtHYW1lQm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkLmNsYXNzJztcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbml0KTtcblxubGV0IGJvYXJkO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChib2FyZCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGJvYXJkLmdhbWVCb2FyZCk7XG4gICAgfVxuXG4gICAgYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYm9hcmQuZXhlY3V0ZUtleURvd25BY3Rpb24pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9pbmRleC5qcyIsImltcG9ydCB7R2FtZUJvYXJkfSBmcm9tICcuL0dhbWVCb2FyZC5jbGFzcyc7XG5cbmNvbnN0IEJMT0NLUyA9IFtcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzAsIDNdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDJdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDBdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFsxLCAwXSwgWzEsIDFdXSxcbiAgICBbWzAsIDFdLCBbMCwgMl0sIFsxLCAwXSwgWzEsIDFdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDFdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFsxLCAxXSwgWzEsIDJdXVxuXTtcblxuZXhwb3J0IGNsYXNzIEZpZ3VyZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA3KSxcbiAgICAgICAgdGhpcy5ibG9jayA9IEJMT0NLU1t0aGlzLmluZGV4XTtcbiAgICB9XG5cbiAgICBjYW5BZGRUb0JvYXJkKCkge1xuICAgICAgICBsZXQgY2FuQWRkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmJsb2NrLmZvckVhY2goaXRlbSA9PiBjYW5BZGQgPSBjYW5BZGQgJiYgR2FtZUJvYXJkLnRyeUFkZEJsb2NrKGl0ZW0pKTtcblxuICAgICAgICByZXR1cm4gY2FuQWRkO1xuICAgIH1cblxuICAgIGNhbk1vdmVFbGVtZW50KHNoaWZ0KSB7XG4gICAgICAgIGxldCBwZXJoYWJzTmV3UG9zaXRpb24gPSB0aGlzLmJsb2NrLm1hcChpdGVtID0+IFtpdGVtWzBdICsgc2hpZnRbMF0sIGl0ZW1bMV0gKyBzaGlmdFsxXV0pLFxuICAgICAgICAgICAgY2FuTW92ZSA9IHRydWU7XG5cbiAgICAgICAgcGVyaGFic05ld1Bvc2l0aW9uLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYmxvY2subWFwKGl0ZW0gPT4gaXRlbS50b1N0cmluZygpKS5pbmNsdWRlcyhpdGVtLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgY2FuTW92ZSA9IGNhbk1vdmUgJiYgR2FtZUJvYXJkLnRyeUFkZEJsb2NrKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY2FuTW92ZTtcbiAgICB9XG5cbiAgICBkcmF3RWxlbWVudE9uQm9hcmQoY29sb3JJbmRleCkge1xuICAgICAgICB0aGlzLmJsb2NrLm1hcChpdGVtID0+IEdhbWVCb2FyZC5kcmF3QmxvY2soaXRlbSwgY29sb3JJbmRleCkpO1xuICAgIH1cblxuICAgIG1vdmVCbG9jayhwb3NpdGlvbiwgc2hpZnQpIHtcbiAgICAgICAgdGhpcy5yZWRyYXdFbGVtZW50KCgpID0+IHRoaXMuYmxvY2subWFwKGl0ZW0gPT4gaXRlbVtwb3NpdGlvbl0gKz0gc2hpZnQpKTtcbiAgICB9XG5cbiAgICByZWRyYXdFbGVtZW50KGZpbHRlcmVkQmxvY2spIHtcbiAgICAgICAgdGhpcy5kcmF3RWxlbWVudE9uQm9hcmQoKTtcbiAgICAgICAgZmlsdGVyZWRCbG9jaygpO1xuICAgICAgICB0aGlzLmRyYXdFbGVtZW50T25Cb2FyZCh0aGlzLmluZGV4KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL0ZpZ3VyZS5jbGFzcy5qcyIsImxldCB3aWR0aDtcblxuZXhwb3J0IGNsYXNzIEVtcHR5QmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJveC5jbGFzc05hbWUgPSAnYmxvY2stZW1wdHknO1xuICAgICAgICB0aGlzLmJveC5zdHlsZS53aWR0aCA9IHRoaXMuYm94LnN0eWxlLmhlaWdodCA9IHdpZHRoO1xuICAgIH1cblxuICAgIGNoYW5nZUJsb2NrU3R5bGUoc3R5bGVCbG9jaykge1xuICAgICAgICBsZXQgZWxDbGFzcywgY29sb3I7XG5cbiAgICAgICAgc3dpdGNoKHN0eWxlQmxvY2spIHtcbiAgICAgICAgY2FzZSAwOiBlbENsYXNzID0gJ2Jsb2NrLWknOyBjb2xvciA9ICcjODFGN0YzJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgMTogZWxDbGFzcyA9ICdibG9jay1qJzsgY29sb3IgPSAnIzgxODFGNyc7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGVsQ2xhc3MgPSAnYmxvY2stbCc7IGNvbG9yID0gJyNGRTlBMkUnOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBlbENsYXNzID0gJ2Jsb2NrLW8nOyBjb2xvciA9ICcjRjNGNzgxJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogZWxDbGFzcyA9ICdibG9jay1zJzsgY29sb3IgPSAnIzgxRjc4MSc7IGJyZWFrO1xuICAgICAgICBjYXNlIDU6IGVsQ2xhc3MgPSAnYmxvY2stdCc7IGNvbG9yID0gJyNEQTgxRjUnOyBicmVhaztcbiAgICAgICAgY2FzZSA2OiBlbENsYXNzID0gJ2Jsb2NrLXonOyBjb2xvciA9ICcjRjc4MTgxJzsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IGVsQ2xhc3MgPSAnYmxvY2stZW1wdHknOyBjb2xvciA9ICcjRDhEOEQ4JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm94LmNsYXNzTmFtZSA9IGVsQ2xhc3M7XG4gICAgICAgIHRoaXMuYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJveC5jbGFzc05hbWUgPT09ICdibG9jay1lbXB0eSc7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFdpZHRoKHZhbHVlKSB7XG4gICAgICAgIHdpZHRoID0gdmFsdWU7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9FbXB0eUJsb2NrLmNsYXNzLmpzIiwibGV0IG1hcDtcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVNlcnZpY2Uge1xuICAgIHN0YXRpYyBhZGRWYWx1ZVRvU3RvcmFnZShuYW1lLCBzY29yZSkge1xuICAgICAgICBpZighbWFwLmhhcyhuYW1lKSB8fCAobWFwLmhhcyhuYW1lKSAmJiBtYXAuZ2V0KG5hbWUpIDwgc2NvcmUpKSB7XG4gICAgICAgICAgICBtYXAuc2V0KG5hbWUsIHNjb3JlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIG1hcC5zZXQobG9jYWxTdG9yYWdlLmtleShpKSwgbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVN0b3JhZ2UoKSB7XG4gICAgICAgIG1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9sb2NhbFN0b3JhZ2Uuc2VydmljZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=