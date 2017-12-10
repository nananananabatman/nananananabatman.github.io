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
    gameFinishedFlag = void 0;

function setInitValues() {
    blocksOnPage = [];
    currentSpeed = 2500;
    currentScore = gameFinishedFlag !== false ? parseInt(_localStorage.localStorageObject.getFromStorage().get('currentScore')) || 0 : 0;
    elementsOnBoard = [];
    gameFinishedFlag = false;
}

var GameBoard = exports.GameBoard = function () {
    function GameBoard(numberOfBlocks) {
        _classCallCheck(this, GameBoard);

        this.size = numberOfBlocks;
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
            _EmptyBlock.EmptyBlock.setWidth((GAME_BOARD_SIZE / this.size).toFixed(1) + 'px');

            for (var i = 0; i < this.size; ++i) {
                blocksOnPage.push([]);
                for (var j = 0; j < this.size; ++j) {
                    blocksOnPage[i][j] = new _EmptyBlock.EmptyBlock(GAME_BOARD_SIZE, this.size);
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
                case 32:
                    if (element.figure.center !== undefined) {
                        element.rotateFigure();
                    }
                    break;
                case 37:
                    element.moveLeft();
                    break;
                case 39:
                    element.moveRight();
                    break;
                default:
                    return;
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
            currentScore += this.size;
            _localStorage.localStorageObject.addValueToStorage('currentScore', currentScore);
            this.updateScoreElement();

            currentSpeed = currentSpeed === MIN_SPEED ? currentSpeed : currentSpeed - SPEED_REDUCTION;
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            var _this2 = this;

            this.updateScoreElement();
            document.addEventListener('keydown', this.executeKeyDownAction);
            clearInterval(intervalID);
            this.addNewElement();
            intervalID = setInterval(function () {
                elementsOnBoard.forEach(function (item, index) {
                    if (item.moveDown()) {} else {
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
            return Math.floor(this.size / 2);
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
    function getInputValue() {
        var value = +document.querySelector('#number').value;

        return value >= 9 && value <= 15 ? value : 9;
    }

    if (board) {
        document.body.removeChild(board.gameBoard);
    }

    board = new _GameBoard.GameBoard(getInputValue());
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
    center: 1,
    color: '#81F7F3',
    blocks: [[0, 0], [0, 1], [0, 2], [0, 3]]
}, {
    center: 1,
    color: '#8181F7',
    blocks: [[0, 0], [0, 1], [0, 2], [1, 2]]
}, {
    center: 1,
    color: '#FE9A2E',
    blocks: [[0, 0], [0, 1], [0, 2], [1, 0]]
}, {
    color: '#F3F781',
    blocks: [[0, 0], [0, 1], [1, 0], [1, 1]]
}, {
    center: 0,
    color: '#81F781',
    blocks: [[0, 1], [0, 2], [1, 0], [1, 1]]
}, {
    center: 1,
    color: '#DA81F5',
    blocks: [[0, 0], [0, 1], [0, 2], [1, 1]]
}, {
    center: 1,
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
            var possibleNewPosition = this.figure.blocks.map(function (item) {
                return [item[0] + shift[0], item[1] + shift[1]];
            });

            return this.isFigurePosCorrect(possibleNewPosition);
        }
    }, {
        key: 'drawElementOnBoard',
        value: function drawElementOnBoard(color) {
            this.figure.blocks.map(function (item) {
                return _GameBoard.GameBoard.drawBlock(item, color);
            });
        }
    }, {
        key: 'isFigurePosCorrect',
        value: function isFigurePosCorrect(blocks) {
            var _this = this;

            var canMove = true;

            blocks.forEach(function (item) {
                if (!_this.figure.blocks.map(function (item) {
                    return item.toString();
                }).includes(item.toString())) {
                    canMove = canMove && _GameBoard.GameBoard.tryAddBlock(item);
                }
            });

            return canMove;
        }
    }, {
        key: 'moveBlock',
        value: function moveBlock(position, shift) {
            var _this2 = this;

            if (this.canMoveElement(shift)) {
                this.redrawElement(function () {
                    return _this2.figure.blocks.map(function (item) {
                        return item[position] += shift[position];
                    });
                });
                return true;
            }

            return false;
        }
    }, {
        key: 'moveDown',
        value: function moveDown() {
            return this.moveBlock(0, [1, 0]);
        }
    }, {
        key: 'moveLeft',
        value: function moveLeft() {
            return this.moveBlock(1, [0, -1]);
        }
    }, {
        key: 'moveRight',
        value: function moveRight() {
            return this.moveBlock(1, [0, 1]);
        }
    }, {
        key: 'redrawElement',
        value: function redrawElement(changeFigureFunc) {
            this.drawElementOnBoard();
            if (changeFigureFunc instanceof Function) {
                changeFigureFunc();
            }
            this.drawElementOnBoard(this.figure.color);
        }
    }, {
        key: 'rotateFigure',
        value: function rotateFigure() {
            var _this3 = this;

            var center = this.figure.blocks[this.figure.center],
                oldPosX = void 0,
                oldPosY = void 0,
                rotatedFigureBlocks = void 0;

            rotatedFigureBlocks = this.figure.blocks.map(function (item) {
                if (item === center) {
                    return item;
                }
                oldPosX = item[0];
                oldPosY = item[1];
                return [(oldPosX - center[0]) * 0 - (oldPosY - center[1]) * 1 + center[0], (oldPosX - center[0]) * 1 + (oldPosY - center[1]) * 0 + center[1]];
            });

            if (this.isFigurePosCorrect(rotatedFigureBlocks)) {
                this.redrawElement(function () {
                    _this3.figure.blocks = rotatedFigureBlocks;
                });
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjNkMjU3ZjdkNjRlOGIyZDRhZDciLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9GaWd1cmUuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9sb2NhbFN0b3JhZ2UuanMiXSwibmFtZXMiOlsiR0FNRV9CT0FSRF9TSVpFIiwiTUlOX1NQRUVEIiwiU1BFRURfUkVEVUNUSU9OIiwiYmxvY2tzT25QYWdlIiwiY3VycmVudFNjb3JlIiwiY3VycmVudFNwZWVkIiwiZWxlbWVudHNPbkJvYXJkIiwiaW50ZXJ2YWxJRCIsImdhbWVGaW5pc2hlZEZsYWciLCJzZXRJbml0VmFsdWVzIiwicGFyc2VJbnQiLCJnZXRGcm9tU3RvcmFnZSIsImdldCIsIkdhbWVCb2FyZCIsIm51bWJlck9mQmxvY2tzIiwic2l6ZSIsInNjb3JlRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ1cGRhdGVTY29yZUVsZW1lbnQiLCJkcmF3R2FtZUJvYXJkIiwic3RhcnRHYW1lIiwibmV3RWxlbSIsInBvaW50c1hPZk5ld0VsZW0iLCJmaWd1cmUiLCJibG9ja3MiLCJtYXAiLCJpdGVtIiwibWlkZGxlIiwiTWF0aCIsImZsb29yIiwibWF4IiwiY2FuQWRkVG9Cb2FyZCIsInB1c2giLCJmaW5pc2hHYW1lIiwiZHJhd0VsZW1lbnRPbkJvYXJkIiwiY29sb3IiLCJpIiwiaXNFbXB0eSIsImluY2x1ZGVzIiwibGV2ZWx1cCIsImZvckVhY2giLCJyZWRyYXdFbGVtZW50IiwiZmlsdGVyIiwiZWxlbSIsImxlbmd0aCIsImdhbWVCb2FyZCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzZXRXaWR0aCIsInRvRml4ZWQiLCJqIiwiYm94IiwiZXZlbnQiLCJzaGlmdCIsImVsZW1lbnQiLCJrZXlDb2RlIiwiY2VudGVyIiwidW5kZWZpbmVkIiwicm90YXRlRmlndXJlIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXhlY3V0ZUtleURvd25BY3Rpb24iLCJ1cGRhdGVTdG9yYWdlIiwiY2xlYXJJbnRlcnZhbCIsImFkZFZhbHVlVG9TdG9yYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZE5ld0VsZW1lbnQiLCJzZXRJbnRlcnZhbCIsImluZGV4IiwibW92ZURvd24iLCJjaGVja1Njb3JlIiwiaW5uZXJUZXh0IiwiYmxvY2siLCJjaGFuZ2VCbG9ja1N0eWxlIiwiZXJyIiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJib2FyZCIsImdldElucHV0VmFsdWUiLCJ2YWx1ZSIsInJlbW92ZUNoaWxkIiwiZGVmYXVsdENvbG9yIiwid2lkdGgiLCJFbXB0eUJsb2NrIiwic3R5bGUiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJCTE9DS1MiLCJGaWd1cmUiLCJPYmplY3QiLCJhc3NpZ24iLCJyYW5kb20iLCJjYW5BZGQiLCJ0cnlBZGRCbG9jayIsInBvc3NpYmxlTmV3UG9zaXRpb24iLCJpc0ZpZ3VyZVBvc0NvcnJlY3QiLCJkcmF3QmxvY2siLCJjYW5Nb3ZlIiwidG9TdHJpbmciLCJwb3NpdGlvbiIsImNhbk1vdmVFbGVtZW50IiwibW92ZUJsb2NrIiwiY2hhbmdlRmlndXJlRnVuYyIsIkZ1bmN0aW9uIiwib2xkUG9zWCIsIm9sZFBvc1kiLCJyb3RhdGVkRmlndXJlQmxvY2tzIiwibG9jYWxTdG9yYWdlT2JqZWN0IiwibmFtZSIsInNjb3JlIiwiaGFzIiwic2V0IiwiTWFwIiwibG9jYWxTdG9yYWdlIiwia2V5IiwiZ2V0SXRlbSIsImNsZWFyIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FB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LElBQVIsSUFBZ0JDLEtBQXZELEVBQStEO0FBQzNEdkYsZ0JBQUl5RixHQUFKLENBQVFILElBQVIsRUFBY0MsS0FBZDtBQUNIO0FBQ0osS0FMZ0I7QUFNakJ0RyxrQkFOaUIsNEJBTUE7QUFDYmUsY0FBTSxJQUFJMEYsR0FBSixFQUFOO0FBQ0EsWUFBSUMsYUFBYXhFLE1BQWIsS0FBd0IsQ0FBNUIsRUFBK0I7QUFDM0IsaUJBQUksSUFBSVIsSUFBSSxDQUFaLEVBQWVBLElBQUlnRixhQUFheEUsTUFBaEMsRUFBd0MsRUFBRVIsQ0FBMUMsRUFBNkM7QUFDekNYLG9CQUFJeUYsR0FBSixDQUFRRSxhQUFhQyxHQUFiLENBQWlCakYsQ0FBakIsQ0FBUixFQUE2QmdGLGFBQWFFLE9BQWIsQ0FBcUJGLGFBQWFDLEdBQWIsQ0FBaUJqRixDQUFqQixDQUFyQixDQUE3QjtBQUNIOztBQUVEZ0YseUJBQWFHLEtBQWI7QUFDSDs7QUFFRCxlQUFPOUYsR0FBUDtBQUNILEtBakJnQjtBQWtCakJ3QyxpQkFsQmlCLDJCQWtCRDtBQUNaeEMsWUFBSWUsT0FBSixDQUFZLFVBQUMwQyxLQUFELEVBQVFtQyxHQUFSLEVBQWdCO0FBQ3hCRCx5QkFBYUksT0FBYixDQUFxQkgsR0FBckIsRUFBMEJuQyxLQUExQjtBQUNILFNBRkQ7QUFHSDtBQXRCZ0IsQ0FEekI7O1FBMEJRNEIsa0IsR0FBQUEsa0IiLCJmaWxlIjoiLi9kaXN0L2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYzZDI1N2Y3ZDY0ZThiMmQ0YWQ3IiwiaW1wb3J0IHtFbXB0eUJsb2NrfSBmcm9tICcuL0VtcHR5QmxvY2suY2xhc3MnO1xuaW1wb3J0IHtGaWd1cmV9IGZyb20gJy4vRmlndXJlLmNsYXNzJztcbmltcG9ydCB7bG9jYWxTdG9yYWdlT2JqZWN0fSBmcm9tICcuL2xvY2FsU3RvcmFnZSc7XG5cbmNvbnN0IEdBTUVfQk9BUkRfU0laRSA9IDU1MCxcbiAgICBNSU5fU1BFRUQgPSAxMDAwLFxuICAgIFNQRUVEX1JFRFVDVElPTiA9IDUwMDtcblxubGV0IGJsb2Nrc09uUGFnZSxcbiAgICBjdXJyZW50U2NvcmUsXG4gICAgY3VycmVudFNwZWVkLFxuICAgIGVsZW1lbnRzT25Cb2FyZCxcbiAgICBpbnRlcnZhbElELFxuICAgIGdhbWVGaW5pc2hlZEZsYWc7XG5cbmZ1bmN0aW9uIHNldEluaXRWYWx1ZXMoKSB7XG4gICAgYmxvY2tzT25QYWdlID0gW107XG4gICAgY3VycmVudFNwZWVkID0gMjUwMDtcbiAgICBjdXJyZW50U2NvcmUgPSBnYW1lRmluaXNoZWRGbGFnICE9PSBmYWxzZSA/IHBhcnNlSW50KGxvY2FsU3RvcmFnZU9iamVjdC5nZXRGcm9tU3RvcmFnZSgpLmdldCgnY3VycmVudFNjb3JlJykpIHx8IDAgOiAwO1xuICAgIGVsZW1lbnRzT25Cb2FyZCA9IFtdO1xuICAgIGdhbWVGaW5pc2hlZEZsYWcgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGNsYXNzIEdhbWVCb2FyZCB7XG4gICAgY29uc3RydWN0b3IobnVtYmVyT2ZCbG9ja3MpIHtcbiAgICAgICAgdGhpcy5zaXplID0gbnVtYmVyT2ZCbG9ja3M7XG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlJyk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmVFbGVtZW50KCk7XG4gICAgICAgIHNldEluaXRWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5kcmF3R2FtZUJvYXJkKCk7XG4gICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XG4gICAgfVxuXG4gICAgZ2V0IG1pZGRsZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5zaXplIC8gMik7XG4gICAgfVxuXG4gICAgYWRkTmV3RWxlbWVudCgpIHtcbiAgICAgICAgbGV0IG5ld0VsZW0gPSBuZXcgRmlndXJlKCksXG4gICAgICAgICAgICBwb2ludHNYT2ZOZXdFbGVtID0gbmV3RWxlbS5maWd1cmUuYmxvY2tzLm1hcChpdGVtID0+IGl0ZW1bMV0pLFxuICAgICAgICAgICAgbWlkZGxlID0gdGhpcy5taWRkbGUgLSBNYXRoLmZsb29yKE1hdGgubWF4KC4uLnBvaW50c1hPZk5ld0VsZW0pIC8gMik7XG5cbiAgICAgICAgbmV3RWxlbS5maWd1cmUuYmxvY2tzID0gbmV3RWxlbS5maWd1cmUuYmxvY2tzLm1hcChpdGVtID0+IFtpdGVtWzBdLCBpdGVtWzFdICsgbWlkZGxlXSk7XG5cbiAgICAgICAgaWYgKG5ld0VsZW0uY2FuQWRkVG9Cb2FyZCgpKSB7XG4gICAgICAgICAgICBlbGVtZW50c09uQm9hcmQucHVzaChuZXdFbGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmluaXNoR2FtZSgpO1xuICAgICAgICB9XG4gICAgICAgIG5ld0VsZW0uZHJhd0VsZW1lbnRPbkJvYXJkKG5ld0VsZW0uZmlndXJlLmNvbG9yKTtcbiAgICB9XG5cbiAgICBjaGVja1Njb3JlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2Nrc09uUGFnZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYoIWJsb2Nrc09uUGFnZVtpXS5tYXAoaXRlbSA9PiBpdGVtLmlzRW1wdHkoKSkuaW5jbHVkZXModHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsdXAoKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50c09uQm9hcmQuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVkcmF3RWxlbWVudCgoKSA9PiBpdGVtLmZpZ3VyZS5ibG9ja3MgPSBpdGVtLmZpZ3VyZS5ibG9ja3MuZmlsdGVyKGVsZW0gPT4gZWxlbVswXSAhPT0gaSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRzT25Cb2FyZCA9IGVsZW1lbnRzT25Cb2FyZC5maWx0ZXIoZWxlbSA9PiBlbGVtLmZpZ3VyZS5ibG9ja3MubGVuZ3RoICE9PSAwKTtcbiAgICB9XG5cbiAgICBkcmF3R2FtZUJvYXJkKCkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmdhbWVCb2FyZC5jbGFzc05hbWUgPSAnZ2FtZSc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5nYW1lQm9hcmQpO1xuICAgICAgICBFbXB0eUJsb2NrLnNldFdpZHRoKChHQU1FX0JPQVJEX1NJWkUgLyB0aGlzLnNpemUpLnRvRml4ZWQoMSkgKyAncHgnKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgKytpKSB7XG4gICAgICAgICAgICBibG9ja3NPblBhZ2UucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgKytqKSB7XG4gICAgICAgICAgICAgICAgYmxvY2tzT25QYWdlW2ldW2pdID0gbmV3IEVtcHR5QmxvY2soR0FNRV9CT0FSRF9TSVpFLCB0aGlzLnNpemUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUJvYXJkLmFwcGVuZENoaWxkKGJsb2Nrc09uUGFnZVtpXVtqXS5ib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhlY3V0ZUtleURvd25BY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbGV0IHNoaWZ0LFxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnRzT25Cb2FyZFtlbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuZmlndXJlLmNlbnRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yb3RhdGVGaWd1cmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgZWxlbWVudC5tb3ZlTGVmdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICBlbGVtZW50Lm1vdmVSaWdodCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmlzaEdhbWUoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmV4ZWN1dGVLZXlEb3duQWN0aW9uKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlT2JqZWN0LnVwZGF0ZVN0b3JhZ2UoKTtcbiAgICAgICAgZ2FtZUZpbmlzaGVkRmxhZyA9IHRydWU7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgfVxuXG4gICAgbGV2ZWx1cCgpIHtcbiAgICAgICAgY3VycmVudFNjb3JlICs9IHRoaXMuc2l6ZTtcbiAgICAgICAgbG9jYWxTdG9yYWdlT2JqZWN0LmFkZFZhbHVlVG9TdG9yYWdlKCdjdXJyZW50U2NvcmUnLCBjdXJyZW50U2NvcmUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlRWxlbWVudCgpO1xuXG4gICAgICAgIGN1cnJlbnRTcGVlZCA9IGN1cnJlbnRTcGVlZCA9PT0gTUlOX1NQRUVEID8gY3VycmVudFNwZWVkIDogY3VycmVudFNwZWVkIC0gU1BFRURfUkVEVUNUSU9OO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZUVsZW1lbnQoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuZXhlY3V0ZUtleURvd25BY3Rpb24pO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgICAgICB0aGlzLmFkZE5ld0VsZW1lbnQoKTtcbiAgICAgICAgaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRzT25Cb2FyZC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLm1vdmVEb3duKCkpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IGVsZW1lbnRzT25Cb2FyZC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU2NvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ2FtZUZpbmlzaGVkRmxhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3RWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSwgY3VycmVudFNwZWVkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY29yZUVsZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IGN1cnJlbnRTY29yZSB8fCAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBkcmF3QmxvY2soYmxvY2ssIGNvbG9yKSB7XG4gICAgICAgIGJsb2Nrc09uUGFnZVtibG9ja1swXV1bYmxvY2tbMV1dLmNoYW5nZUJsb2NrU3R5bGUoY29sb3IpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cnlBZGRCbG9jayhibG9jaykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGJsb2Nrc09uUGFnZVtibG9ja1swXV1bYmxvY2tbMV1dLmlzRW1wdHkoKTtcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvR2FtZUJvYXJkLmNsYXNzLmpzIiwiaW1wb3J0IHtHYW1lQm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkLmNsYXNzJztcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbml0KTtcblxubGV0IGJvYXJkO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGZ1bmN0aW9uIGdldElucHV0VmFsdWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9ICtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbnVtYmVyJykudmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlID49IDkgJiYgdmFsdWUgPD0gMTUgPyB2YWx1ZSA6IDk7XG4gICAgfVxuXG4gICAgaWYgKGJvYXJkKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYm9hcmQuZ2FtZUJvYXJkKTtcbiAgICB9XG5cbiAgICBib2FyZCA9IG5ldyBHYW1lQm9hcmQoZ2V0SW5wdXRWYWx1ZSgpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvaW5kZXguanMiLCJsZXQgZGVmYXVsdENvbG9yID0gJ3JnYigyMTYsIDIxNiwgMjE2KScsXG4gICAgd2lkdGg7XG5cbmV4cG9ydCBjbGFzcyBFbXB0eUJsb2NrIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5ib3guY2xhc3NOYW1lID0gJ2Jsb2NrLWVtcHR5JztcbiAgICAgICAgdGhpcy5ib3guc3R5bGUud2lkdGggPSB0aGlzLmJveC5zdHlsZS5oZWlnaHQgPSB3aWR0aDtcbiAgICAgICAgdGhpcy5ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZGVmYXVsdENvbG9yO1xuICAgIH1cblxuICAgIGNoYW5nZUJsb2NrU3R5bGUoY29sb3IpIHtcbiAgICAgICAgdGhpcy5ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3IgfHwgZGVmYXVsdENvbG9yO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPT09IGRlZmF1bHRDb2xvcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0V2lkdGgodmFsdWUpIHtcbiAgICAgICAgd2lkdGggPSB2YWx1ZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHtHYW1lQm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkLmNsYXNzJztcblxuY29uc3QgQkxPQ0tTID0gW1xuICAgIHtcbiAgICAgICAgY2VudGVyOiAxLFxuICAgICAgICBjb2xvcjogJyM4MUY3RjMnLFxuICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMCwgM11dXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNlbnRlcjogMSxcbiAgICAgICAgY29sb3I6ICcjODE4MUY3JyxcbiAgICAgICAgYmxvY2tzOiBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDJdXVxuICAgIH0sXG4gICAge1xuICAgICAgICBjZW50ZXI6IDEsXG4gICAgICAgIGNvbG9yOiAnI0ZFOUEyRScsXG4gICAgICAgIGJsb2NrczogW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFsxLCAwXV1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6ICcjRjNGNzgxJyxcbiAgICAgICAgYmxvY2tzOiBbWzAsIDBdLCBbMCwgMV0sIFsxLCAwXSwgWzEsIDFdXVxuICAgIH0sXG4gICAge1xuICAgICAgICBjZW50ZXI6IDAsXG4gICAgICAgIGNvbG9yOiAnIzgxRjc4MScsXG4gICAgICAgIGJsb2NrczogW1swLCAxXSwgWzAsIDJdLCBbMSwgMF0sIFsxLCAxXV1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgY2VudGVyOiAxLFxuICAgICAgICBjb2xvcjogJyNEQTgxRjUnLFxuICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMSwgMV1dXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNlbnRlcjogMSxcbiAgICAgICAgY29sb3I6ICcjRjc4MTgxJyxcbiAgICAgICAgYmxvY2tzOiBbWzAsIDBdLCBbMCwgMV0sIFsxLCAxXSwgWzEsIDJdXVxuICAgIH1cbl07XG5cbmV4cG9ydCBjbGFzcyBGaWd1cmUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZpZ3VyZSA9IE9iamVjdC5hc3NpZ24oe30sIEJMT0NLU1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA3KV0pO1xuICAgIH1cblxuICAgIGNhbkFkZFRvQm9hcmQoKSB7XG4gICAgICAgIGxldCBjYW5BZGQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZmlndXJlLmJsb2Nrcy5mb3JFYWNoKGl0ZW0gPT4gY2FuQWRkID0gY2FuQWRkICYmIEdhbWVCb2FyZC50cnlBZGRCbG9jayhpdGVtKSk7XG5cbiAgICAgICAgcmV0dXJuIGNhbkFkZDtcbiAgICB9XG5cbiAgICBjYW5Nb3ZlRWxlbWVudChzaGlmdCkge1xuICAgICAgICBsZXQgcG9zc2libGVOZXdQb3NpdGlvbiA9IHRoaXMuZmlndXJlLmJsb2Nrcy5tYXAoaXRlbSA9PiBbaXRlbVswXSArIHNoaWZ0WzBdLCBpdGVtWzFdICsgc2hpZnRbMV1dKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5pc0ZpZ3VyZVBvc0NvcnJlY3QocG9zc2libGVOZXdQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZHJhd0VsZW1lbnRPbkJvYXJkKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuZmlndXJlLmJsb2Nrcy5tYXAoaXRlbSA9PiBHYW1lQm9hcmQuZHJhd0Jsb2NrKGl0ZW0sIGNvbG9yKSk7XG4gICAgfVxuXG4gICAgaXNGaWd1cmVQb3NDb3JyZWN0KGJsb2Nrcykge1xuICAgICAgICBsZXQgY2FuTW92ZSA9IHRydWU7XG5cbiAgICAgICAgYmxvY2tzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlndXJlLmJsb2Nrcy5tYXAoaXRlbSA9PiBpdGVtLnRvU3RyaW5nKCkpLmluY2x1ZGVzKGl0ZW0udG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlID0gY2FuTW92ZSAmJiBHYW1lQm9hcmQudHJ5QWRkQmxvY2soaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjYW5Nb3ZlO1xuICAgIH1cblxuICAgIG1vdmVCbG9jayhwb3NpdGlvbiwgc2hpZnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuTW92ZUVsZW1lbnQoc2hpZnQpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZHJhd0VsZW1lbnQoKCkgPT4gdGhpcy5maWd1cmUuYmxvY2tzLm1hcChpdGVtID0+IGl0ZW1bcG9zaXRpb25dICs9IHNoaWZ0W3Bvc2l0aW9uXSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbW92ZURvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVCbG9jaygwLCBbMSwgMF0pO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlQmxvY2soMSwgWzAsIC0xXSk7XG4gICAgfVxuXG4gICAgbW92ZVJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlQmxvY2soMSwgWzAsIDFdKTtcbiAgICB9XG5cbiAgICByZWRyYXdFbGVtZW50KGNoYW5nZUZpZ3VyZUZ1bmMpIHtcbiAgICAgICAgdGhpcy5kcmF3RWxlbWVudE9uQm9hcmQoKTtcbiAgICAgICAgaWYgKGNoYW5nZUZpZ3VyZUZ1bmMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2hhbmdlRmlndXJlRnVuYygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0VsZW1lbnRPbkJvYXJkKHRoaXMuZmlndXJlLmNvbG9yKTtcbiAgICB9XG5cbiAgICByb3RhdGVGaWd1cmUoKSB7XG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLmZpZ3VyZS5ibG9ja3NbdGhpcy5maWd1cmUuY2VudGVyXSxcbiAgICAgICAgICAgIG9sZFBvc1gsIG9sZFBvc1ksXG4gICAgICAgICAgICByb3RhdGVkRmlndXJlQmxvY2tzO1xuXG4gICAgICAgIHJvdGF0ZWRGaWd1cmVCbG9ja3MgPSB0aGlzLmZpZ3VyZS5ibG9ja3MubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IGNlbnRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2xkUG9zWCA9IGl0ZW1bMF07XG4gICAgICAgICAgICBvbGRQb3NZID0gaXRlbVsxXTtcbiAgICAgICAgICAgIHJldHVybiBbKG9sZFBvc1ggLSBjZW50ZXJbMF0pICogMCAtIChvbGRQb3NZIC0gY2VudGVyWzFdKSAqIDEgKyBjZW50ZXJbMF0sXG4gICAgICAgICAgICAgICAgICAgIChvbGRQb3NYIC0gY2VudGVyWzBdKSAqIDEgKyAob2xkUG9zWSAtIGNlbnRlclsxXSkgKiAwICsgY2VudGVyWzFdXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNGaWd1cmVQb3NDb3JyZWN0KHJvdGF0ZWRGaWd1cmVCbG9ja3MpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZHJhd0VsZW1lbnQoKCkgPT4geyB0aGlzLmZpZ3VyZS5ibG9ja3MgPSByb3RhdGVkRmlndXJlQmxvY2tzOyB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvRmlndXJlLmNsYXNzLmpzIiwibGV0IG1hcCxcbiAgICBsb2NhbFN0b3JhZ2VPYmplY3QgPSB7XG4gICAgICAgIGFkZFZhbHVlVG9TdG9yYWdlKG5hbWUsIHNjb3JlKSB7XG4gICAgICAgICAgICBpZighbWFwLmhhcyhuYW1lKSB8fCAobWFwLmhhcyhuYW1lKSAmJiBtYXAuZ2V0KG5hbWUpIDwgc2NvcmUpKSB7XG4gICAgICAgICAgICAgICAgbWFwLnNldChuYW1lLCBzY29yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldEZyb21TdG9yYWdlKCkge1xuICAgICAgICAgICAgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbG9jYWxTdG9yYWdlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5zZXQobG9jYWxTdG9yYWdlLmtleShpKSwgbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVTdG9yYWdlKCkge1xuICAgICAgICAgICAgbWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuZXhwb3J0IHtsb2NhbFN0b3JhZ2VPYmplY3R9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9sb2NhbFN0b3JhZ2UuanMiXSwic291cmNlUm9vdCI6IiJ9