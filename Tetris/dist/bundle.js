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

var BLOCKS = [[[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [0, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [0, 2], [1, 0]], [[0, 0], [0, 1], [1, 0], [1, 1]], [[0, 1], [0, 2], [1, 0], [1, 1]], [[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 0], [0, 1], [1, 1], [1, 2]]];

// const BLOCKS = [
//     {
//         color: '#81F7F3',
//         blocks: [[0, 0], [0, 1], [0, 2], [0, 3]]
//     },
//     {
//         color: '#8181F7',
//         blocks: [[0, 0], [0, 1], [0, 2], [1, 2]]
//     },
//     {
//         color: '#FE9A2E',
//         blocks: [[0, 0], [0, 1], [0, 2], [1, 0]]
//     },
//     {
//         color: '#F3F781',
//         blocks: [[0, 0], [0, 1], [1, 0], [1, 1]]
//     },
//     {
//         color: '#81F781',
//         blocks: [[0, 1], [0, 2], [1, 0], [1, 1]]
//     },
//     {
//         color: '#DA81F5',
//         blocks: [[0, 0], [0, 1], [0, 2], [1, 1]]
//     },
//     {
//         color: '#F78181',
//         blocks: [[0, 0], [0, 1], [1, 1], [1, 2]]
//     }
// ];

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

            var possibleNewPosition = this.block.map(function (item) {
                return [item[0] + shift[0], item[1] + shift[1]];
            }),
                canMove = true;

            possibleNewPosition.forEach(function (item) {
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
        value: function redrawElement(filterFunc) {
            this.drawElementOnBoard();
            filterFunc();
            this.drawElementOnBoard(this.index);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDZmMzNiZTRlODM4MDgyMDVmNTIiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9GaWd1cmUuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9sb2NhbFN0b3JhZ2UuanMiXSwibmFtZXMiOlsiR0FNRV9CT0FSRF9TSVpFIiwiTUlOX1NQRUVEIiwiU1BFRURfUkVEVUNUSU9OIiwiYmxvY2tzT25QYWdlIiwiY3VycmVudFNjb3JlIiwiY3VycmVudFNwZWVkIiwiZWxlbWVudHNPbkJvYXJkIiwiaW50ZXJ2YWxJRCIsImdhbWVGaW5pc2hlZEZsYWciLCJudW1iZXJPZkJsb2NrcyIsImNoZWNrSW5wdXRWYWx1ZSIsInZhbHVlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2V0SW5pdFZhbHVlcyIsInBhcnNlSW50IiwiZ2V0RnJvbVN0b3JhZ2UiLCJnZXQiLCJzZXRXaWR0aCIsInRvRml4ZWQiLCJHYW1lQm9hcmQiLCJnYW1lQm9hcmQiLCJzY29yZUVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInVwZGF0ZVNjb3JlRWxlbWVudCIsImRyYXdHYW1lQm9hcmQiLCJzdGFydEdhbWUiLCJuZXdFbGVtIiwicG9pbnRzWE9mTmV3RWxlbSIsImJsb2NrIiwibWFwIiwiaXRlbSIsIm1pZGRsZSIsIk1hdGgiLCJmbG9vciIsIm1heCIsImNhbkFkZFRvQm9hcmQiLCJwdXNoIiwiZmluaXNoR2FtZSIsImRyYXdFbGVtZW50T25Cb2FyZCIsImluZGV4IiwiaSIsImJveCIsImNsYXNzTmFtZSIsImluY2x1ZGVzIiwibGV2ZWx1cCIsImZvckVhY2giLCJyZWRyYXdFbGVtZW50IiwiZmlsdGVyIiwiZWxlbSIsImxlbmd0aCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJqIiwiZXZlbnQiLCJzaGlmdCIsImVsZW1lbnQiLCJrZXlDb2RlIiwidW5kZWZpbmVkIiwiY2FuTW92ZUVsZW1lbnQiLCJtb3ZlQmxvY2siLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXhlY3V0ZUtleURvd25BY3Rpb24iLCJ1cGRhdGVTdG9yYWdlIiwiY2xlYXJJbnRlcnZhbCIsImFkZFZhbHVlVG9TdG9yYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZE5ld0VsZW1lbnQiLCJzZXRJbnRlcnZhbCIsImNoZWNrU2NvcmUiLCJpbm5lclRleHQiLCJjaGFuZ2VCbG9ja1N0eWxlIiwiaXNFbXB0eSIsImVyciIsImluaXQiLCJib2FyZCIsInJlbW92ZUNoaWxkIiwid2lkdGgiLCJFbXB0eUJsb2NrIiwic3R5bGUiLCJoZWlnaHQiLCJzdHlsZUJsb2NrIiwiZWxDbGFzcyIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiQkxPQ0tTIiwiRmlndXJlIiwicmFuZG9tIiwiY2FuQWRkIiwidHJ5QWRkQmxvY2siLCJwb3NzaWJsZU5ld1Bvc2l0aW9uIiwiY2FuTW92ZSIsInRvU3RyaW5nIiwiY29sb3JJbmRleCIsImRyYXdCbG9jayIsInBvc2l0aW9uIiwiZmlsdGVyRnVuYyIsImxvY2FsU3RvcmFnZU9iamVjdCIsIm5hbWUiLCJzY29yZSIsImhhcyIsInNldCIsIk1hcCIsImxvY2FsU3RvcmFnZSIsImtleSIsImdldEl0ZW0iLCJjbGVhciIsInNldEl0ZW0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FB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QWIsQ0FBcUJGLGFBQWFDLEdBQWIsQ0FBaUJoRSxDQUFqQixDQUFyQixDQUE3QjtBQUNIOztBQUVEK0QseUJBQWFHLEtBQWI7QUFDSDs7QUFFRCxlQUFPN0UsR0FBUDtBQUNILEtBakJnQjtBQWtCakJrQyxpQkFsQmlCLDJCQWtCRDtBQUNabEMsWUFBSWdCLE9BQUosQ0FBWSxVQUFDbkMsS0FBRCxFQUFROEYsR0FBUixFQUFnQjtBQUN4QkQseUJBQWFJLE9BQWIsQ0FBcUJILEdBQXJCLEVBQTBCOUYsS0FBMUI7QUFDSCxTQUZEO0FBR0g7QUF0QmdCLENBRHpCOztRQTBCUXVGLGtCLEdBQUFBLGtCIiwiZmlsZSI6Ii4vZGlzdC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwNmYzM2JlNGU4MzgwODIwNWY1MiIsImltcG9ydCB7RW1wdHlCbG9ja30gZnJvbSAnLi9FbXB0eUJsb2NrLmNsYXNzJztcbmltcG9ydCB7RmlndXJlfSBmcm9tICcuL0ZpZ3VyZS5jbGFzcyc7XG5pbXBvcnQge2xvY2FsU3RvcmFnZU9iamVjdH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UnO1xuXG5jb25zdCBHQU1FX0JPQVJEX1NJWkUgPSA1NTAsXG4gICAgTUlOX1NQRUVEID0gMTAwMCxcbiAgICBTUEVFRF9SRURVQ1RJT04gPSA1MDA7XG5cbmxldCBibG9ja3NPblBhZ2UsXG4gICAgY3VycmVudFNjb3JlLFxuICAgIGN1cnJlbnRTcGVlZCxcbiAgICBlbGVtZW50c09uQm9hcmQsXG4gICAgaW50ZXJ2YWxJRCxcbiAgICBnYW1lRmluaXNoZWRGbGFnLFxuICAgIG51bWJlck9mQmxvY2tzO1xuXG5mdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XG4gICAgbGV0IHZhbHVlID0gK2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNudW1iZXInKS52YWx1ZTtcblxuICAgIHJldHVybiB2YWx1ZSA+PSA5ICYmIHZhbHVlIDw9IDE1ID8gdmFsdWUgOiA5O1xufVxuXG5mdW5jdGlvbiBzZXRJbml0VmFsdWVzKCkge1xuICAgIGJsb2Nrc09uUGFnZSA9IFtdO1xuICAgIGN1cnJlbnRTcGVlZCA9IDI1MDA7XG4gICAgY3VycmVudFNjb3JlID0gcGFyc2VJbnQobG9jYWxTdG9yYWdlT2JqZWN0LmdldEZyb21TdG9yYWdlKCkuZ2V0KCdjdXJyZW50U2NvcmUnKSkgfHwgMDtcbiAgICBlbGVtZW50c09uQm9hcmQgPSBbXTtcbiAgICBnYW1lRmluaXNoZWRGbGFnID0gZmFsc2U7XG4gICAgbnVtYmVyT2ZCbG9ja3MgPSBjaGVja0lucHV0VmFsdWUoKTtcbiAgICBFbXB0eUJsb2NrLnNldFdpZHRoKChHQU1FX0JPQVJEX1NJWkUgLyBudW1iZXJPZkJsb2NrcykudG9GaXhlZCgxKSArICdweCcpO1xufVxuXG5leHBvcnQgY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQ7XG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlJyk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmVFbGVtZW50KCk7XG4gICAgICAgIHNldEluaXRWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5kcmF3R2FtZUJvYXJkKCk7XG4gICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XG4gICAgfVxuXG4gICAgZ2V0IG1pZGRsZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyT2ZCbG9ja3MgLyAyKTtcbiAgICB9XG5cbiAgICBhZGROZXdFbGVtZW50KCkge1xuICAgICAgICBsZXQgbmV3RWxlbSA9IG5ldyBGaWd1cmUoKSxcbiAgICAgICAgICAgIHBvaW50c1hPZk5ld0VsZW0gPSBuZXdFbGVtLmJsb2NrLm1hcChpdGVtID0+IGl0ZW1bMV0pLFxuICAgICAgICAgICAgbWlkZGxlID0gdGhpcy5taWRkbGUgLSBNYXRoLmZsb29yKE1hdGgubWF4KC4uLnBvaW50c1hPZk5ld0VsZW0pIC8gMik7XG5cbiAgICAgICAgbmV3RWxlbS5ibG9jayA9IG5ld0VsZW0uYmxvY2subWFwKGl0ZW0gPT4gW2l0ZW1bMF0sIGl0ZW1bMV0gKyBtaWRkbGVdKTtcblxuICAgICAgICBpZiAobmV3RWxlbS5jYW5BZGRUb0JvYXJkKCkpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzT25Cb2FyZC5wdXNoKG5ld0VsZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maW5pc2hHYW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3RWxlbS5kcmF3RWxlbWVudE9uQm9hcmQobmV3RWxlbS5pbmRleCk7XG4gICAgfVxuXG4gICAgY2hlY2tTY29yZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja3NPblBhZ2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmKCFibG9ja3NPblBhZ2VbaV0ubWFwKGl0ZW0gPT4gaXRlbS5ib3guY2xhc3NOYW1lKS5pbmNsdWRlcygnYmxvY2stZW1wdHknKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWx1cCgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzT25Cb2FyZC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5yZWRyYXdFbGVtZW50KCgpID0+IGl0ZW0uYmxvY2sgPSBpdGVtLmJsb2NrLmZpbHRlcihlbGVtID0+IGVsZW1bMF0gIT09IGkpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50c09uQm9hcmQgPSBlbGVtZW50c09uQm9hcmQuZmlsdGVyKGVsZW0gPT4gZWxlbS5ibG9jay5sZW5ndGggIT09IDApO1xuICAgIH1cblxuICAgIGRyYXdHYW1lQm9hcmQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkLmNsYXNzTmFtZSA9ICdnYW1lJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmdhbWVCb2FyZCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkJsb2NrczsgKytpKSB7XG4gICAgICAgICAgICBibG9ja3NPblBhZ2UucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bWJlck9mQmxvY2tzOyArK2opIHtcbiAgICAgICAgICAgICAgICBibG9ja3NPblBhZ2VbaV1bal0gPSBuZXcgRW1wdHlCbG9jayhHQU1FX0JPQVJEX1NJWkUsIG51bWJlck9mQmxvY2tzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVCb2FyZC5hcHBlbmRDaGlsZChibG9ja3NPblBhZ2VbaV1bal0uYm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4ZWN1dGVLZXlEb3duQWN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCBzaGlmdCxcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50c09uQm9hcmRbZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzc6IHNoaWZ0ID0gLTE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOTogc2hpZnQgPSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IHNoaWZ0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoaWZ0ICYmIGVsZW1lbnQuY2FuTW92ZUVsZW1lbnQoWzAsIHNoaWZ0XSkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQubW92ZUJsb2NrKDEsIHNoaWZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmlzaEdhbWUoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmV4ZWN1dGVLZXlEb3duQWN0aW9uKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlT2JqZWN0LnVwZGF0ZVN0b3JhZ2UoKTtcbiAgICAgICAgZ2FtZUZpbmlzaGVkRmxhZyA9IHRydWU7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgfVxuXG4gICAgbGV2ZWx1cCgpIHtcbiAgICAgICAgY3VycmVudFNjb3JlICs9IG51bWJlck9mQmxvY2tzO1xuICAgICAgICBsb2NhbFN0b3JhZ2VPYmplY3QuYWRkVmFsdWVUb1N0b3JhZ2UoJ2N1cnJlbnRTY29yZScsIGN1cnJlbnRTY29yZSk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmVFbGVtZW50KCk7XG5cbiAgICAgICAgY3VycmVudFNwZWVkID0gY3VycmVudFNwZWVkID09PSBNSU5fU1BFRUQgPyBjdXJyZW50U3BlZWQgOiBjdXJyZW50U3BlZWQgLSBTUEVFRF9SRURVQ1RJT047XG4gICAgfVxuXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5leGVjdXRlS2V5RG93bkFjdGlvbik7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgICAgIHRoaXMuYWRkTmV3RWxlbWVudCgpO1xuICAgICAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudHNPbkJvYXJkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2FuTW92ZUVsZW1lbnQoWzEsIDBdKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm1vdmVCbG9jaygwLCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IGVsZW1lbnRzT25Cb2FyZC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU2NvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ2FtZUZpbmlzaGVkRmxhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3RWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSwgY3VycmVudFNwZWVkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY29yZUVsZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRTY29yZSB8fCAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBkcmF3QmxvY2soYmxvY2ssIGluZGV4KSB7XG4gICAgICAgIGJsb2Nrc09uUGFnZVtibG9ja1swXV1bYmxvY2tbMV1dLmNoYW5nZUJsb2NrU3R5bGUoaW5kZXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cnlBZGRCbG9jayhibG9jaykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGJsb2Nrc09uUGFnZVtibG9ja1swXV1bYmxvY2tbMV1dLmlzRW1wdHkoKTtcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvR2FtZUJvYXJkLmNsYXNzLmpzIiwiaW1wb3J0IHtHYW1lQm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkLmNsYXNzJztcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbml0KTtcblxubGV0IGJvYXJkO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChib2FyZCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGJvYXJkLmdhbWVCb2FyZCk7XG4gICAgfVxuXG4gICAgYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL2luZGV4LmpzIiwibGV0IHdpZHRoO1xuXG5leHBvcnQgY2xhc3MgRW1wdHlCbG9jayB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuYm94LmNsYXNzTmFtZSA9ICdibG9jay1lbXB0eSc7XG4gICAgICAgIHRoaXMuYm94LnN0eWxlLndpZHRoID0gdGhpcy5ib3guc3R5bGUuaGVpZ2h0ID0gd2lkdGg7XG4gICAgfVxuXG4gICAgY2hhbmdlQmxvY2tTdHlsZShzdHlsZUJsb2NrKSB7XG4gICAgICAgIGxldCBlbENsYXNzLCBjb2xvcjtcblxuICAgICAgICBzd2l0Y2goc3R5bGVCbG9jaykge1xuICAgICAgICBjYXNlIDA6IGVsQ2xhc3MgPSAnYmxvY2staSc7IGNvbG9yID0gJyM4MUY3RjMnOyBicmVhaztcbiAgICAgICAgY2FzZSAxOiBlbENsYXNzID0gJ2Jsb2NrLWonOyBjb2xvciA9ICcjODE4MUY3JzsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogZWxDbGFzcyA9ICdibG9jay1sJzsgY29sb3IgPSAnI0ZFOUEyRSc7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGVsQ2xhc3MgPSAnYmxvY2stbyc7IGNvbG9yID0gJyNGM0Y3ODEnOyBicmVhaztcbiAgICAgICAgY2FzZSA0OiBlbENsYXNzID0gJ2Jsb2NrLXMnOyBjb2xvciA9ICcjODFGNzgxJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgNTogZWxDbGFzcyA9ICdibG9jay10JzsgY29sb3IgPSAnI0RBODFGNSc7IGJyZWFrO1xuICAgICAgICBjYXNlIDY6IGVsQ2xhc3MgPSAnYmxvY2steic7IGNvbG9yID0gJyNGNzgxODEnOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDogZWxDbGFzcyA9ICdibG9jay1lbXB0eSc7IGNvbG9yID0gJyNEOEQ4RDgnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib3guY2xhc3NOYW1lID0gZWxDbGFzcztcbiAgICAgICAgdGhpcy5ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm94LmNsYXNzTmFtZSA9PT0gJ2Jsb2NrLWVtcHR5JztcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0V2lkdGgodmFsdWUpIHtcbiAgICAgICAgd2lkdGggPSB2YWx1ZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJpbXBvcnQge0dhbWVCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQuY2xhc3MnO1xuXG5jb25zdCBCTE9DS1MgPSBbXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFswLCAzXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFsxLCAyXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFsxLCAwXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMSwgMF0sIFsxLCAxXV0sXG4gICAgW1swLCAxXSwgWzAsIDJdLCBbMSwgMF0sIFsxLCAxXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFsxLCAxXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMSwgMV0sIFsxLCAyXV1cbl07XG5cbi8vIGNvbnN0IEJMT0NLUyA9IFtcbi8vICAgICB7XG4vLyAgICAgICAgIGNvbG9yOiAnIzgxRjdGMycsXG4vLyAgICAgICAgIGJsb2NrczogW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFswLCAzXV1cbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgICAgY29sb3I6ICcjODE4MUY3Jyxcbi8vICAgICAgICAgYmxvY2tzOiBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDJdXVxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgICBjb2xvcjogJyNGRTlBMkUnLFxuLy8gICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMSwgMF1dXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICAgIGNvbG9yOiAnI0YzRjc4MScsXG4vLyAgICAgICAgIGJsb2NrczogW1swLCAwXSwgWzAsIDFdLCBbMSwgMF0sIFsxLCAxXV1cbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgICAgY29sb3I6ICcjODFGNzgxJyxcbi8vICAgICAgICAgYmxvY2tzOiBbWzAsIDFdLCBbMCwgMl0sIFsxLCAwXSwgWzEsIDFdXVxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgICBjb2xvcjogJyNEQTgxRjUnLFxuLy8gICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMSwgMV1dXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICAgIGNvbG9yOiAnI0Y3ODE4MScsXG4vLyAgICAgICAgIGJsb2NrczogW1swLCAwXSwgWzAsIDFdLCBbMSwgMV0sIFsxLCAyXV1cbi8vICAgICB9XG4vLyBdO1xuXG5leHBvcnQgY2xhc3MgRmlndXJlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpLFxuICAgICAgICB0aGlzLmJsb2NrID0gQkxPQ0tTW3RoaXMuaW5kZXhdO1xuICAgIH1cblxuICAgIGNhbkFkZFRvQm9hcmQoKSB7XG4gICAgICAgIGxldCBjYW5BZGQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuYmxvY2suZm9yRWFjaChpdGVtID0+IGNhbkFkZCA9IGNhbkFkZCAmJiBHYW1lQm9hcmQudHJ5QWRkQmxvY2soaXRlbSkpO1xuXG4gICAgICAgIHJldHVybiBjYW5BZGQ7XG4gICAgfVxuXG4gICAgY2FuTW92ZUVsZW1lbnQoc2hpZnQpIHtcbiAgICAgICAgbGV0IHBvc3NpYmxlTmV3UG9zaXRpb24gPSB0aGlzLmJsb2NrLm1hcChpdGVtID0+IFtpdGVtWzBdICsgc2hpZnRbMF0sIGl0ZW1bMV0gKyBzaGlmdFsxXV0pLFxuICAgICAgICAgICAgY2FuTW92ZSA9IHRydWU7XG5cbiAgICAgICAgcG9zc2libGVOZXdQb3NpdGlvbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmJsb2NrLm1hcChpdGVtID0+IGl0ZW0udG9TdHJpbmcoKSkuaW5jbHVkZXMoaXRlbS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgICAgIGNhbk1vdmUgPSBjYW5Nb3ZlICYmIEdhbWVCb2FyZC50cnlBZGRCbG9jayhpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNhbk1vdmU7XG4gICAgfVxuXG4gICAgZHJhd0VsZW1lbnRPbkJvYXJkKGNvbG9ySW5kZXgpIHtcbiAgICAgICAgdGhpcy5ibG9jay5tYXAoaXRlbSA9PiBHYW1lQm9hcmQuZHJhd0Jsb2NrKGl0ZW0sIGNvbG9ySW5kZXgpKTtcbiAgICB9XG5cbiAgICBtb3ZlQmxvY2socG9zaXRpb24sIHNoaWZ0KSB7XG4gICAgICAgIHRoaXMucmVkcmF3RWxlbWVudCgoKSA9PiB0aGlzLmJsb2NrLm1hcChpdGVtID0+IGl0ZW1bcG9zaXRpb25dICs9IHNoaWZ0KSk7XG4gICAgfVxuXG4gICAgcmVkcmF3RWxlbWVudChmaWx0ZXJGdW5jKSB7XG4gICAgICAgIHRoaXMuZHJhd0VsZW1lbnRPbkJvYXJkKCk7XG4gICAgICAgIGZpbHRlckZ1bmMoKTtcbiAgICAgICAgdGhpcy5kcmF3RWxlbWVudE9uQm9hcmQodGhpcy5pbmRleCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9GaWd1cmUuY2xhc3MuanMiLCJsZXQgbWFwLFxuICAgIGxvY2FsU3RvcmFnZU9iamVjdCA9IHtcbiAgICAgICAgYWRkVmFsdWVUb1N0b3JhZ2UobmFtZSwgc2NvcmUpIHtcbiAgICAgICAgICAgIGlmKCFtYXAuaGFzKG5hbWUpIHx8IChtYXAuaGFzKG5hbWUpICYmIG1hcC5nZXQobmFtZSkgPCBzY29yZSkpIHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0KG5hbWUsIHNjb3JlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RnJvbVN0b3JhZ2UoKSB7XG4gICAgICAgICAgICBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNldChsb2NhbFN0b3JhZ2Uua2V5KGkpLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtYXA7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZVN0b3JhZ2UoKSB7XG4gICAgICAgICAgICBtYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5leHBvcnQge2xvY2FsU3RvcmFnZU9iamVjdH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL2xvY2FsU3RvcmFnZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=