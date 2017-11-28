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

var _EmptyBlock = __webpack_require__(2);

var _Figure = __webpack_require__(3);

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
    currentScore = parseInt(_localStorage.localStorageObject.getFromStorage().get('currentScore')) || 0;
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
                pointsXOfNewElem = newElem.figure.blocks.map(function (item) {
                return item[1];
            }),
                middle = this.middle - Math.floor(Math.max.apply(Math, _toConsumableArray(pointsXOfNewElem)) / 2);

            newElem.figure.blocks = newElem.figure.blocks.map(function (item) {
                return [item[0], item[1] + middle];
            });

            if (newElem.canAddToBoard()) {
                elementsOnBoard.push(newElem);
            } else {
                this.finishGame();
            }
            newElem.drawElementOnBoard(newElem.figure.color);
        }
    }, {
        key: 'checkScore',
        value: function checkScore() {
            var _this = this;

            var _loop = function _loop(i) {
                if (!blocksOnPage[i].map(function (item) {
                    return item.isEmpty();
                }).includes(true)) {
                    _this.levelup();
                    elementsOnBoard.forEach(function (item) {
                        return item.redrawElement(function () {
                            return item.figure.blocks = item.figure.blocks.filter(function (elem) {
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
                return elem.figure.blocks.length !== 0;
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
            document.removeEventListener('keydown', this.executeKeyDownAction);
            _localStorage.localStorageObject.updateStorage();
            gameFinishedFlag = true;
            clearInterval(intervalID);
        }
    }, {
        key: 'levelup',
        value: function levelup() {
            currentScore += numberOfBlocks;
            _localStorage.localStorageObject.addValueToStorage('currentScore', currentScore);
            this.updateScoreElement();

            currentSpeed = currentSpeed === MIN_SPEED ? currentSpeed : currentSpeed - SPEED_REDUCTION;
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            var _this2 = this;

            document.addEventListener('keydown', this.executeKeyDownAction);
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
        value: function drawBlock(block, color) {
            blocksOnPage[block[0]][block[1]].changeBlockStyle(color);
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
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultColor = 'rgb(216, 216, 216)',
    width = void 0;

var EmptyBlock = exports.EmptyBlock = function () {
    function EmptyBlock() {
        _classCallCheck(this, EmptyBlock);

        this.box = document.createElement('div');
        this.box.className = 'block-empty';
        this.box.style.width = this.box.style.height = width;
        this.box.style.backgroundColor = defaultColor;
    }

    _createClass(EmptyBlock, [{
        key: 'changeBlockStyle',
        value: function changeBlockStyle(color) {
            this.box.style.backgroundColor = color || defaultColor;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.box.style.backgroundColor === defaultColor;
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Figure = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameBoard = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BLOCKS = [{
    color: '#81F7F3',
    blocks: [[0, 0], [0, 1], [0, 2], [0, 3]]
}, {
    color: '#8181F7',
    blocks: [[0, 0], [0, 1], [0, 2], [1, 2]]
}, {
    color: '#FE9A2E',
    blocks: [[0, 0], [0, 1], [0, 2], [1, 0]]
}, {
    color: '#F3F781',
    blocks: [[0, 0], [0, 1], [1, 0], [1, 1]]
}, {
    color: '#81F781',
    blocks: [[0, 1], [0, 2], [1, 0], [1, 1]]
}, {
    color: '#DA81F5',
    blocks: [[0, 0], [0, 1], [0, 2], [1, 1]]
}, {
    color: '#F78181',
    blocks: [[0, 0], [0, 1], [1, 1], [1, 2]]
}];

var Figure = exports.Figure = function () {
    function Figure() {
        _classCallCheck(this, Figure);

        this.figure = Object.assign({}, BLOCKS[Math.floor(Math.random() * 7)]);
    }

    _createClass(Figure, [{
        key: 'canAddToBoard',
        value: function canAddToBoard() {
            var canAdd = true;

            this.figure.blocks.forEach(function (item) {
                return canAdd = canAdd && _GameBoard.GameBoard.tryAddBlock(item);
            });

            return canAdd;
        }
    }, {
        key: 'canMoveElement',
        value: function canMoveElement(shift) {
            var _this = this;

            var possibleNewPosition = this.figure.blocks.map(function (item) {
                return [item[0] + shift[0], item[1] + shift[1]];
            }),
                canMove = true;

            possibleNewPosition.forEach(function (item) {
                if (!_this.figure.blocks.map(function (item) {
                    return item.toString();
                }).includes(item.toString())) {
                    canMove = canMove && _GameBoard.GameBoard.tryAddBlock(item);
                }
            });

            return canMove;
        }
    }, {
        key: 'drawElementOnBoard',
        value: function drawElementOnBoard(color) {
            this.figure.blocks.map(function (item) {
                return _GameBoard.GameBoard.drawBlock(item, color);
            });
        }
    }, {
        key: 'moveBlock',
        value: function moveBlock(position, shift) {
            var _this2 = this;

            this.redrawElement(function () {
                return _this2.figure.blocks.map(function (item) {
                    return item[position] += shift;
                });
            });
        }
    }, {
        key: 'redrawElement',
        value: function redrawElement(filterFunc) {
            this.drawElementOnBoard();
            filterFunc();
            this.drawElementOnBoard(this.figure.color);
        }
    }]);

    return Figure;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var map = void 0,
    localStorageObject = {
    addValueToStorage: function addValueToStorage(name, score) {
        if (!map.has(name) || map.has(name) && map.get(name) < score) {
            map.set(name, score);
        }
    },
    getFromStorage: function getFromStorage() {
        map = new Map();
        if (localStorage.length !== 0) {
            for (var i = 0; i < localStorage.length; ++i) {
                map.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
            }

            localStorage.clear();
        }

        return map;
    },
    updateStorage: function updateStorage() {
        map.forEach(function (value, key) {
            localStorage.setItem(key, value);
        });
    }
};

exports.localStorageObject = localStorageObject;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjI5YzdiMjM2OGM5ZTQ5Mjk5NTgiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9GaWd1cmUuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9sb2NhbFN0b3JhZ2UuanMiXSwibmFtZXMiOlsiR0FNRV9CT0FSRF9TSVpFIiwiTUlOX1NQRUVEIiwiU1BFRURfUkVEVUNUSU9OIiwiYmxvY2tzT25QYWdlIiwiY3VycmVudFNjb3JlIiwiY3VycmVudFNwZWVkIiwiZWxlbWVudHNPbkJvYXJkIiwiaW50ZXJ2YWxJRCIsImdhbWVGaW5pc2hlZEZsYWciLCJudW1iZXJPZkJsb2NrcyIsImNoZWNrSW5wdXRWYWx1ZSIsInZhbHVlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2V0SW5pdFZhbHVlcyIsInBhcnNlSW50IiwiZ2V0RnJvbVN0b3JhZ2UiLCJnZXQiLCJzZXRXaWR0aCIsInRvRml4ZWQiLCJHYW1lQm9hcmQiLCJnYW1lQm9hcmQiLCJzY29yZUVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInVwZGF0ZVNjb3JlRWxlbWVudCIsImRyYXdHYW1lQm9hcmQiLCJzdGFydEdhbWUiLCJuZXdFbGVtIiwicG9pbnRzWE9mTmV3RWxlbSIsImZpZ3VyZSIsImJsb2NrcyIsIm1hcCIsIml0ZW0iLCJtaWRkbGUiLCJNYXRoIiwiZmxvb3IiLCJtYXgiLCJjYW5BZGRUb0JvYXJkIiwicHVzaCIsImZpbmlzaEdhbWUiLCJkcmF3RWxlbWVudE9uQm9hcmQiLCJjb2xvciIsImkiLCJpc0VtcHR5IiwiaW5jbHVkZXMiLCJsZXZlbHVwIiwiZm9yRWFjaCIsInJlZHJhd0VsZW1lbnQiLCJmaWx0ZXIiLCJlbGVtIiwibGVuZ3RoIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImoiLCJib3giLCJldmVudCIsInNoaWZ0IiwiZWxlbWVudCIsImtleUNvZGUiLCJ1bmRlZmluZWQiLCJjYW5Nb3ZlRWxlbWVudCIsIm1vdmVCbG9jayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJleGVjdXRlS2V5RG93bkFjdGlvbiIsInVwZGF0ZVN0b3JhZ2UiLCJjbGVhckludGVydmFsIiwiYWRkVmFsdWVUb1N0b3JhZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkTmV3RWxlbWVudCIsInNldEludGVydmFsIiwiaW5kZXgiLCJjaGVja1Njb3JlIiwiaW5uZXJUZXh0IiwiYmxvY2siLCJjaGFuZ2VCbG9ja1N0eWxlIiwiZXJyIiwiaW5pdCIsImJvYXJkIiwicmVtb3ZlQ2hpbGQiLCJkZWZhdWx0Q29sb3IiLCJ3aWR0aCIsIkVtcHR5QmxvY2siLCJzdHlsZSIsImhlaWdodCIsImJhY2tncm91bmRDb2xvciIsIkJMT0NLUyIsIkZpZ3VyZSIsIk9iamVjdCIsImFzc2lnbiIsInJhbmRvbSIsImNhbkFkZCIsInRyeUFkZEJsb2NrIiwicG9zc2libGVOZXdQb3NpdGlvbiIsImNhbk1vdmUiLCJ0b1N0cmluZyIsImRyYXdCbG9jayIsInBvc2l0aW9uIiwiZmlsdGVyRnVuYyIsImxvY2FsU3RvcmFnZU9iamVjdCIsIm5hbWUiLCJzY29yZSIsImhhcyIsInNldCIsIk1hcCIsImxvY2FsU3RvcmFnZSIsImtleSIsImdldEl0ZW0iLCJjbGVhciIsInNldEl0ZW0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFB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O0FBQ3hCRCx5QkFBYUksT0FBYixDQUFxQkgsR0FBckIsRUFBMEJoRyxLQUExQjtBQUNILFNBRkQ7QUFHSDtBQXRCZ0IsQ0FEekI7O1FBMEJReUYsa0IsR0FBQUEsa0IiLCJmaWxlIjoiLi9kaXN0L2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYyOWM3YjIzNjhjOWU0OTI5OTU4IiwiaW1wb3J0IHtFbXB0eUJsb2NrfSBmcm9tICcuL0VtcHR5QmxvY2suY2xhc3MnO1xuaW1wb3J0IHtGaWd1cmV9IGZyb20gJy4vRmlndXJlLmNsYXNzJztcbmltcG9ydCB7bG9jYWxTdG9yYWdlT2JqZWN0fSBmcm9tICcuL2xvY2FsU3RvcmFnZSc7XG5cbmNvbnN0IEdBTUVfQk9BUkRfU0laRSA9IDU1MCxcbiAgICBNSU5fU1BFRUQgPSAxMDAwLFxuICAgIFNQRUVEX1JFRFVDVElPTiA9IDUwMDtcblxubGV0IGJsb2Nrc09uUGFnZSxcbiAgICBjdXJyZW50U2NvcmUsXG4gICAgY3VycmVudFNwZWVkLFxuICAgIGVsZW1lbnRzT25Cb2FyZCxcbiAgICBpbnRlcnZhbElELFxuICAgIGdhbWVGaW5pc2hlZEZsYWcsXG4gICAgbnVtYmVyT2ZCbG9ja3M7XG5cbmZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcbiAgICBsZXQgdmFsdWUgPSArZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI251bWJlcicpLnZhbHVlO1xuXG4gICAgcmV0dXJuIHZhbHVlID49IDkgJiYgdmFsdWUgPD0gMTUgPyB2YWx1ZSA6IDk7XG59XG5cbmZ1bmN0aW9uIHNldEluaXRWYWx1ZXMoKSB7XG4gICAgYmxvY2tzT25QYWdlID0gW107XG4gICAgY3VycmVudFNwZWVkID0gMjUwMDtcbiAgICBjdXJyZW50U2NvcmUgPSBwYXJzZUludChsb2NhbFN0b3JhZ2VPYmplY3QuZ2V0RnJvbVN0b3JhZ2UoKS5nZXQoJ2N1cnJlbnRTY29yZScpKSB8fCAwO1xuICAgIGVsZW1lbnRzT25Cb2FyZCA9IFtdO1xuICAgIGdhbWVGaW5pc2hlZEZsYWcgPSBmYWxzZTtcbiAgICBudW1iZXJPZkJsb2NrcyA9IGNoZWNrSW5wdXRWYWx1ZSgpO1xuICAgIEVtcHR5QmxvY2suc2V0V2lkdGgoKEdBTUVfQk9BUkRfU0laRSAvIG51bWJlck9mQmxvY2tzKS50b0ZpeGVkKDEpICsgJ3B4Jyk7XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZDtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZUVsZW1lbnQoKTtcbiAgICAgICAgc2V0SW5pdFZhbHVlcygpO1xuICAgICAgICB0aGlzLmRyYXdHYW1lQm9hcmQoKTtcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgICB9XG5cbiAgICBnZXQgbWlkZGxlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXJPZkJsb2NrcyAvIDIpO1xuICAgIH1cblxuICAgIGFkZE5ld0VsZW1lbnQoKSB7XG4gICAgICAgIGxldCBuZXdFbGVtID0gbmV3IEZpZ3VyZSgpLFxuICAgICAgICAgICAgcG9pbnRzWE9mTmV3RWxlbSA9IG5ld0VsZW0uZmlndXJlLmJsb2Nrcy5tYXAoaXRlbSA9PiBpdGVtWzFdKSxcbiAgICAgICAgICAgIG1pZGRsZSA9IHRoaXMubWlkZGxlIC0gTWF0aC5mbG9vcihNYXRoLm1heCguLi5wb2ludHNYT2ZOZXdFbGVtKSAvIDIpO1xuXG4gICAgICAgIG5ld0VsZW0uZmlndXJlLmJsb2NrcyA9IG5ld0VsZW0uZmlndXJlLmJsb2Nrcy5tYXAoaXRlbSA9PiBbaXRlbVswXSwgaXRlbVsxXSArIG1pZGRsZV0pO1xuXG4gICAgICAgIGlmIChuZXdFbGVtLmNhbkFkZFRvQm9hcmQoKSkge1xuICAgICAgICAgICAgZWxlbWVudHNPbkJvYXJkLnB1c2gobmV3RWxlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaEdhbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdFbGVtLmRyYXdFbGVtZW50T25Cb2FyZChuZXdFbGVtLmZpZ3VyZS5jb2xvcik7XG4gICAgfVxuXG4gICAgY2hlY2tTY29yZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja3NPblBhZ2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmKCFibG9ja3NPblBhZ2VbaV0ubWFwKGl0ZW0gPT4gaXRlbS5pc0VtcHR5KCkpLmluY2x1ZGVzKHRydWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbHVwKCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNPbkJvYXJkLmZvckVhY2goaXRlbSA9PiBpdGVtLnJlZHJhd0VsZW1lbnQoKCkgPT4gaXRlbS5maWd1cmUuYmxvY2tzID0gaXRlbS5maWd1cmUuYmxvY2tzLmZpbHRlcihlbGVtID0+IGVsZW1bMF0gIT09IGkpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50c09uQm9hcmQgPSBlbGVtZW50c09uQm9hcmQuZmlsdGVyKGVsZW0gPT4gZWxlbS5maWd1cmUuYmxvY2tzLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxuXG4gICAgZHJhd0dhbWVCb2FyZCgpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQuY2xhc3NOYW1lID0gJ2dhbWUnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZ2FtZUJvYXJkKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mQmxvY2tzOyArK2kpIHtcbiAgICAgICAgICAgIGJsb2Nrc09uUGFnZS5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtYmVyT2ZCbG9ja3M7ICsraikge1xuICAgICAgICAgICAgICAgIGJsb2Nrc09uUGFnZVtpXVtqXSA9IG5ldyBFbXB0eUJsb2NrKEdBTUVfQk9BUkRfU0laRSwgbnVtYmVyT2ZCbG9ja3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUJvYXJkLmFwcGVuZENoaWxkKGJsb2Nrc09uUGFnZVtpXVtqXS5ib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhlY3V0ZUtleURvd25BY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbGV0IHNoaWZ0LFxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnRzT25Cb2FyZFtlbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzNzogc2hpZnQgPSAtMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM5OiBzaGlmdCA9IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogc2hpZnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hpZnQgJiYgZWxlbWVudC5jYW5Nb3ZlRWxlbWVudChbMCwgc2hpZnRdKSkge1xuICAgICAgICAgICAgZWxlbWVudC5tb3ZlQmxvY2soMSwgc2hpZnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluaXNoR2FtZSgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuZXhlY3V0ZUtleURvd25BY3Rpb24pO1xuICAgICAgICBsb2NhbFN0b3JhZ2VPYmplY3QudXBkYXRlU3RvcmFnZSgpO1xuICAgICAgICBnYW1lRmluaXNoZWRGbGFnID0gdHJ1ZTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICB9XG5cbiAgICBsZXZlbHVwKCkge1xuICAgICAgICBjdXJyZW50U2NvcmUgKz0gbnVtYmVyT2ZCbG9ja3M7XG4gICAgICAgIGxvY2FsU3RvcmFnZU9iamVjdC5hZGRWYWx1ZVRvU3RvcmFnZSgnY3VycmVudFNjb3JlJywgY3VycmVudFNjb3JlKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZUVsZW1lbnQoKTtcblxuICAgICAgICBjdXJyZW50U3BlZWQgPSBjdXJyZW50U3BlZWQgPT09IE1JTl9TUEVFRCA/IGN1cnJlbnRTcGVlZCA6IGN1cnJlbnRTcGVlZCAtIFNQRUVEX1JFRFVDVElPTjtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmV4ZWN1dGVLZXlEb3duQWN0aW9uKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICAgICAgdGhpcy5hZGROZXdFbGVtZW50KCk7XG4gICAgICAgIGludGVydmFsSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50c09uQm9hcmQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jYW5Nb3ZlRWxlbWVudChbMSwgMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubW92ZUJsb2NrKDAsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTY29yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnYW1lRmluaXNoZWRGbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGROZXdFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LCBjdXJyZW50U3BlZWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNjb3JlRWxlbWVudCgpIHtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFNjb3JlIHx8IDA7XG4gICAgfVxuXG4gICAgc3RhdGljIGRyYXdCbG9jayhibG9jaywgY29sb3IpIHtcbiAgICAgICAgYmxvY2tzT25QYWdlW2Jsb2NrWzBdXVtibG9ja1sxXV0uY2hhbmdlQmxvY2tTdHlsZShjb2xvcik7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyeUFkZEJsb2NrKGJsb2NrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYmxvY2tzT25QYWdlW2Jsb2NrWzBdXVtibG9ja1sxXV0uaXNFbXB0eSgpO1xuICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJpbXBvcnQge0dhbWVCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQuY2xhc3MnO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluaXQpO1xuXG5sZXQgYm9hcmQ7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKGJvYXJkKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYm9hcmQuZ2FtZUJvYXJkKTtcbiAgICB9XG5cbiAgICBib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvaW5kZXguanMiLCJsZXQgZGVmYXVsdENvbG9yID0gJ3JnYigyMTYsIDIxNiwgMjE2KScsXG4gICAgd2lkdGg7XG5cbmV4cG9ydCBjbGFzcyBFbXB0eUJsb2NrIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5ib3guY2xhc3NOYW1lID0gJ2Jsb2NrLWVtcHR5JztcbiAgICAgICAgdGhpcy5ib3guc3R5bGUud2lkdGggPSB0aGlzLmJveC5zdHlsZS5oZWlnaHQgPSB3aWR0aDtcbiAgICAgICAgdGhpcy5ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZGVmYXVsdENvbG9yO1xuICAgIH1cblxuICAgIGNoYW5nZUJsb2NrU3R5bGUoY29sb3IpIHtcbiAgICAgICAgdGhpcy5ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3IgfHwgZGVmYXVsdENvbG9yO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPT09IGRlZmF1bHRDb2xvcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0V2lkdGgodmFsdWUpIHtcbiAgICAgICAgd2lkdGggPSB2YWx1ZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJpbXBvcnQge0dhbWVCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQuY2xhc3MnO1xuXG5jb25zdCBCTE9DS1MgPSBbXG4gICAge1xuICAgICAgICBjb2xvcjogJyM4MUY3RjMnLFxuICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMCwgM11dXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiAnIzgxODFGNycsXG4gICAgICAgIGJsb2NrczogW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFsxLCAyXV1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6ICcjRkU5QTJFJyxcbiAgICAgICAgYmxvY2tzOiBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDBdXVxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogJyNGM0Y3ODEnLFxuICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzEsIDBdLCBbMSwgMV1dXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiAnIzgxRjc4MScsXG4gICAgICAgIGJsb2NrczogW1swLCAxXSwgWzAsIDJdLCBbMSwgMF0sIFsxLCAxXV1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6ICcjREE4MUY1JyxcbiAgICAgICAgYmxvY2tzOiBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDFdXVxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogJyNGNzgxODEnLFxuICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzEsIDFdLCBbMSwgMl1dXG4gICAgfVxuXTtcblxuZXhwb3J0IGNsYXNzIEZpZ3VyZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZmlndXJlID0gT2JqZWN0LmFzc2lnbih7fSwgQkxPQ0tTW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpXSk7XG4gICAgfVxuXG4gICAgY2FuQWRkVG9Cb2FyZCgpIHtcbiAgICAgICAgbGV0IGNhbkFkZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5maWd1cmUuYmxvY2tzLmZvckVhY2goaXRlbSA9PiBjYW5BZGQgPSBjYW5BZGQgJiYgR2FtZUJvYXJkLnRyeUFkZEJsb2NrKGl0ZW0pKTtcblxuICAgICAgICByZXR1cm4gY2FuQWRkO1xuICAgIH1cblxuICAgIGNhbk1vdmVFbGVtZW50KHNoaWZ0KSB7XG4gICAgICAgIGxldCBwb3NzaWJsZU5ld1Bvc2l0aW9uID0gdGhpcy5maWd1cmUuYmxvY2tzLm1hcChpdGVtID0+IFtpdGVtWzBdICsgc2hpZnRbMF0sIGl0ZW1bMV0gKyBzaGlmdFsxXV0pLFxuICAgICAgICAgICAgY2FuTW92ZSA9IHRydWU7XG5cbiAgICAgICAgcG9zc2libGVOZXdQb3NpdGlvbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmZpZ3VyZS5ibG9ja3MubWFwKGl0ZW0gPT4gaXRlbS50b1N0cmluZygpKS5pbmNsdWRlcyhpdGVtLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgY2FuTW92ZSA9IGNhbk1vdmUgJiYgR2FtZUJvYXJkLnRyeUFkZEJsb2NrKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY2FuTW92ZTtcbiAgICB9XG5cbiAgICBkcmF3RWxlbWVudE9uQm9hcmQoY29sb3IpIHtcbiAgICAgICAgdGhpcy5maWd1cmUuYmxvY2tzLm1hcChpdGVtID0+IEdhbWVCb2FyZC5kcmF3QmxvY2soaXRlbSwgY29sb3IpKTtcbiAgICB9XG5cbiAgICBtb3ZlQmxvY2socG9zaXRpb24sIHNoaWZ0KSB7XG4gICAgICAgIHRoaXMucmVkcmF3RWxlbWVudCgoKSA9PiB0aGlzLmZpZ3VyZS5ibG9ja3MubWFwKGl0ZW0gPT4gaXRlbVtwb3NpdGlvbl0gKz0gc2hpZnQpKTtcbiAgICB9XG5cbiAgICByZWRyYXdFbGVtZW50KGZpbHRlckZ1bmMpIHtcbiAgICAgICAgdGhpcy5kcmF3RWxlbWVudE9uQm9hcmQoKTtcbiAgICAgICAgZmlsdGVyRnVuYygpO1xuICAgICAgICB0aGlzLmRyYXdFbGVtZW50T25Cb2FyZCh0aGlzLmZpZ3VyZS5jb2xvcik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9GaWd1cmUuY2xhc3MuanMiLCJsZXQgbWFwLFxuICAgIGxvY2FsU3RvcmFnZU9iamVjdCA9IHtcbiAgICAgICAgYWRkVmFsdWVUb1N0b3JhZ2UobmFtZSwgc2NvcmUpIHtcbiAgICAgICAgICAgIGlmKCFtYXAuaGFzKG5hbWUpIHx8IChtYXAuaGFzKG5hbWUpICYmIG1hcC5nZXQobmFtZSkgPCBzY29yZSkpIHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0KG5hbWUsIHNjb3JlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RnJvbVN0b3JhZ2UoKSB7XG4gICAgICAgICAgICBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNldChsb2NhbFN0b3JhZ2Uua2V5KGkpLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtYXA7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZVN0b3JhZ2UoKSB7XG4gICAgICAgICAgICBtYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5leHBvcnQge2xvY2FsU3RvcmFnZU9iamVjdH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL2xvY2FsU3RvcmFnZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=