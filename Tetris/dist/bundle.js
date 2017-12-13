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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameBoard = __webpack_require__(1);

document.querySelector('#start').addEventListener('click', init);

var board = void 0;

function init() {
    var nameInput = document.getElementById('name-input'),
        nameLabel = document.getElementById('name-label');

    function getInputValue() {
        var value = +document.querySelector('#number').value;

        return value >= 9 && value <= 15 ? value : 9;
    }

    if (nameInput.value !== '') {
        nameInput.classList.remove('empty-name');
        nameInput.disabled = true;
        nameLabel.classList.remove('empty-name');

        if (board) {
            document.body.removeChild(board.gameBoard);
        }

        board = new _GameBoard.GameBoard(getInputValue(), nameInput.value);
    } else {
        nameInput.classList.add('empty-name');
        nameLabel.classList.add('empty-name');
    }
}

/***/ }),
/* 1 */
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
    MIN_SPEED = 500,
    SPEED_REDUCTION = 500;

var blocksOnPage = void 0,
    currentScore = void 0,
    currentSpeed = void 0,
    elementsOnBoard = void 0,
    intervalID = void 0,
    gameFinishedFlag = void 0;

var GameBoard = exports.GameBoard = function () {
    function GameBoard(numberOfBlocks, userName) {
        _classCallCheck(this, GameBoard);

        this.size = numberOfBlocks;
        this.scoreElement = document.getElementById('score');
        this.userName = userName;
        this.updateScoreElement();
        this.setInitValues();
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
                            item.figure.blocks = item.figure.blocks.filter(function (elem) {
                                return elem[0] !== i;
                            });
                            item.figure.blocks.forEach(function (elem) {
                                if (elem[0] < i) {
                                    elem[0]++;
                                }
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
            this.gameBoard.tabIndex = '-1';
            document.body.appendChild(this.gameBoard);
            this.gameBoard.focus();
            _EmptyBlock.EmptyBlock.setWidth((GAME_BOARD_SIZE / this.size).toFixed(2) + 'px');

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
            this.gameBoard.innerHTML += '<div class="finished-game">' + '<h3 class="finished-game__heading">GAME OVER</h3>' + ('<p class="finished-game__score">Your best score: ' + (_localStorage.localStorageObject.getData(this.userName) || 0) + '</p>') + '</div>';
            document.removeEventListener('keydown', this.executeKeyDownAction);
            _localStorage.localStorageObject.updateStorage();
            gameFinishedFlag = true;
            clearInterval(intervalID);
            document.getElementById('name-input').disabled = false;
        }
    }, {
        key: 'levelup',
        value: function levelup() {
            currentScore += this.size;
            _localStorage.localStorageObject.addValueToStorage(this.userName, currentScore);
            this.updateScoreElement();

            currentSpeed = currentSpeed === MIN_SPEED ? currentSpeed : currentSpeed - SPEED_REDUCTION;
            this.updateGameSpeed();
        }
    }, {
        key: 'setInitValues',
        value: function setInitValues() {
            switch (gameFinishedFlag) {
                case true:
                case 'undefined':
                    currentScore = 0;
                    break;
                default:
                    currentScore = parseInt(_localStorage.localStorageObject.getFromStorage().get('currentScore')) || 0;
            }

            blocksOnPage = [];
            currentSpeed = 1500;
            elementsOnBoard = [];
            gameFinishedFlag = false;
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            this.updateScoreElement();
            document.addEventListener('keydown', this.executeKeyDownAction);
            this.addNewElement();
            this.updateGameSpeed();
        }
    }, {
        key: 'updateGameSpeed',
        value: function updateGameSpeed() {
            var _this2 = this;

            clearInterval(intervalID);
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

var _GameBoard = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BLOCKS = [{
    center: 1,
    color: '#81F7F3',
    blocks: [[0, 0], [0, 1], [0, 2], [0, 3]],
    currentPosition: 0,
    specialRotate: true
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
    blocks: [[0, 1], [0, 2], [1, 0], [1, 1]],
    currentPosition: 0,
    specialRotate: true
}, {
    center: 1,
    color: '#DA81F5',
    blocks: [[0, 0], [0, 1], [0, 2], [1, 1]]
}, {
    center: 1,
    color: '#F78181',
    blocks: [[0, 0], [0, 1], [1, 1], [1, 2]],
    currentPosition: 0,
    specialRotate: true
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

            var angle = Math.PI / 2,
                center = this.figure.blocks[this.figure.center],
                currentPosition = this.figure.currentPosition,
                oldPosX = void 0,
                oldPosY = void 0,
                rotatedFigureBlocks = void 0;

            if (this.figure.specialRotate) {
                if (currentPosition % 2 === 1) {
                    angle = -Math.PI / 2;
                }
                currentPosition = (currentPosition + 1) % 4;
            }

            rotatedFigureBlocks = this.figure.blocks.map(function (item) {
                if (item === center) {
                    return item;
                }
                oldPosX = item[0];
                oldPosY = item[1];

                return [(oldPosX - center[0]) * Math.cos(angle) - (oldPosY - center[1]) * Math.sin(angle) + center[0], (oldPosX - center[0]) * Math.sin(angle) + (oldPosY - center[1]) * Math.cos(angle) + center[1]];
            });

            if (this.isFigurePosCorrect(rotatedFigureBlocks)) {
                if (this.figure.specialRotate) {
                    this.figure.currentPosition = currentPosition;
                }
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
    getData: function getData(name) {
        return map.get(name);
    },
    getFromStorage: function getFromStorage() {
        map = new Map();
        if (localStorage.length !== 0) {
            for (var i = 0; i < localStorage.length; ++i) {
                map.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWRiYTVhZDY2MDg2M2Y4ZTNlOTkiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0dhbWVCb2FyZC5jbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9GaWd1cmUuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9sb2NhbFN0b3JhZ2UuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXQiLCJib2FyZCIsIm5hbWVJbnB1dCIsImdldEVsZW1lbnRCeUlkIiwibmFtZUxhYmVsIiwiZ2V0SW5wdXRWYWx1ZSIsInZhbHVlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZGlzYWJsZWQiLCJib2R5IiwicmVtb3ZlQ2hpbGQiLCJnYW1lQm9hcmQiLCJhZGQiLCJHQU1FX0JPQVJEX1NJWkUiLCJNSU5fU1BFRUQiLCJTUEVFRF9SRURVQ1RJT04iLCJibG9ja3NPblBhZ2UiLCJjdXJyZW50U2NvcmUiLCJjdXJyZW50U3BlZWQiLCJlbGVtZW50c09uQm9hcmQiLCJpbnRlcnZhbElEIiwiZ2FtZUZpbmlzaGVkRmxhZyIsIkdhbWVCb2FyZCIsIm51bWJlck9mQmxvY2tzIiwidXNlck5hbWUiLCJzaXplIiwic2NvcmVFbGVtZW50IiwidXBkYXRlU2NvcmVFbGVtZW50Iiwic2V0SW5pdFZhbHVlcyIsImRyYXdHYW1lQm9hcmQiLCJzdGFydEdhbWUiLCJuZXdFbGVtIiwicG9pbnRzWE9mTmV3RWxlbSIsImZpZ3VyZSIsImJsb2NrcyIsIm1hcCIsIml0ZW0iLCJtaWRkbGUiLCJNYXRoIiwiZmxvb3IiLCJtYXgiLCJjYW5BZGRUb0JvYXJkIiwicHVzaCIsImZpbmlzaEdhbWUiLCJkcmF3RWxlbWVudE9uQm9hcmQiLCJjb2xvciIsImkiLCJpc0VtcHR5IiwiaW5jbHVkZXMiLCJsZXZlbHVwIiwiZm9yRWFjaCIsInJlZHJhd0VsZW1lbnQiLCJmaWx0ZXIiLCJlbGVtIiwibGVuZ3RoIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInRhYkluZGV4IiwiYXBwZW5kQ2hpbGQiLCJmb2N1cyIsInNldFdpZHRoIiwidG9GaXhlZCIsImoiLCJib3giLCJldmVudCIsInNoaWZ0IiwiZWxlbWVudCIsImtleUNvZGUiLCJjZW50ZXIiLCJ1bmRlZmluZWQiLCJyb3RhdGVGaWd1cmUiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsImlubmVySFRNTCIsImdldERhdGEiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXhlY3V0ZUtleURvd25BY3Rpb24iLCJ1cGRhdGVTdG9yYWdlIiwiY2xlYXJJbnRlcnZhbCIsImFkZFZhbHVlVG9TdG9yYWdlIiwidXBkYXRlR2FtZVNwZWVkIiwicGFyc2VJbnQiLCJnZXRGcm9tU3RvcmFnZSIsImdldCIsImFkZE5ld0VsZW1lbnQiLCJzZXRJbnRlcnZhbCIsImluZGV4IiwibW92ZURvd24iLCJjaGVja1Njb3JlIiwiaW5uZXJUZXh0IiwiYmxvY2siLCJjaGFuZ2VCbG9ja1N0eWxlIiwiZXJyIiwiZGVmYXVsdENvbG9yIiwid2lkdGgiLCJFbXB0eUJsb2NrIiwic3R5bGUiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJCTE9DS1MiLCJjdXJyZW50UG9zaXRpb24iLCJzcGVjaWFsUm90YXRlIiwiRmlndXJlIiwiT2JqZWN0IiwiYXNzaWduIiwicmFuZG9tIiwiY2FuQWRkIiwidHJ5QWRkQmxvY2siLCJwb3NzaWJsZU5ld1Bvc2l0aW9uIiwiaXNGaWd1cmVQb3NDb3JyZWN0IiwiZHJhd0Jsb2NrIiwiY2FuTW92ZSIsInRvU3RyaW5nIiwicG9zaXRpb24iLCJjYW5Nb3ZlRWxlbWVudCIsIm1vdmVCbG9jayIsImNoYW5nZUZpZ3VyZUZ1bmMiLCJGdW5jdGlvbiIsImFuZ2xlIiwiUEkiLCJvbGRQb3NYIiwib2xkUG9zWSIsInJvdGF0ZWRGaWd1cmVCbG9ja3MiLCJjb3MiLCJzaW4iLCJsb2NhbFN0b3JhZ2VPYmplY3QiLCJuYW1lIiwic2NvcmUiLCJoYXMiLCJzZXQiLCJNYXAiLCJsb2NhbFN0b3JhZ2UiLCJrZXkiLCJnZXRJdGVtIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOztBQUVBQSxTQUFTQyxhQUFULENBQXVCLFFBQXZCLEVBQWlDQyxnQkFBakMsQ0FBa0QsT0FBbEQsRUFBMkRDLElBQTNEOztBQUVBLElBQUlDLGNBQUo7O0FBRUEsU0FBU0QsSUFBVCxHQUFnQjtBQUNaLFFBQUlFLFlBQVlMLFNBQVNNLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBaEI7QUFBQSxRQUNJQyxZQUFZUCxTQUFTTSxjQUFULENBQXdCLFlBQXhCLENBRGhCOztBQUdBLGFBQVNFLGFBQVQsR0FBeUI7QUFDckIsWUFBSUMsUUFBUSxDQUFDVCxTQUFTQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDUSxLQUEvQzs7QUFFQSxlQUFPQSxTQUFTLENBQVQsSUFBY0EsU0FBUyxFQUF2QixHQUE0QkEsS0FBNUIsR0FBb0MsQ0FBM0M7QUFDSDs7QUFFRCxRQUFJSixVQUFVSSxLQUFWLEtBQW9CLEVBQXhCLEVBQTRCO0FBQ3hCSixrQkFBVUssU0FBVixDQUFvQkMsTUFBcEIs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O0FBU2pCNUMsa0JBVGlCLDRCQVNBO0FBQ2IvQyxjQUFNLElBQUkrRixHQUFKLEVBQU47QUFDQSxZQUFJQyxhQUFhN0UsTUFBYixLQUF3QixDQUE1QixFQUErQjtBQUMzQixpQkFBSSxJQUFJUixJQUFJLENBQVosRUFBZUEsSUFBSXFGLGFBQWE3RSxNQUFoQyxFQUF3QyxFQUFFUixDQUExQyxFQUE2QztBQUN6Q1gsb0JBQUk4RixHQUFKLENBQVFFLGFBQWFDLEdBQWIsQ0FBaUJ0RixDQUFqQixDQUFSLEVBQTZCcUYsYUFBYUUsT0FBYixDQUFxQkYsYUFBYUMsR0FBYixDQUFpQnRGLENBQWpCLENBQXJCLENBQTdCO0FBQ0g7QUFDSjs7QUFFRCxlQUFPWCxHQUFQO0FBQ0gsS0FsQmdCO0FBbUJqQjBDLGlCQW5CaUIsMkJBbUJEO0FBQ1oxQyxZQUFJZSxPQUFKLENBQVksVUFBQzdDLEtBQUQsRUFBUStILEdBQVIsRUFBZ0I7QUFDeEJELHlCQUFhRyxPQUFiLENBQXFCRixHQUFyQixFQUEwQi9ILEtBQTFCO0FBQ0gsU0FGRDtBQUdIO0FBdkJnQixDQUR6Qjs7UUEyQlF3SCxrQixHQUFBQSxrQiIsImZpbGUiOiIuL2Rpc3QvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWRiYTVhZDY2MDg2M2Y4ZTNlOTkiLCJpbXBvcnQge0dhbWVCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQuY2xhc3MnO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluaXQpO1xuXG5sZXQgYm9hcmQ7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lLWlucHV0JyksXG4gICAgICAgIG5hbWVMYWJlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lLWxhYmVsJyk7XG5cbiAgICBmdW5jdGlvbiBnZXRJbnB1dFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSArZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI251bWJlcicpLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZSA+PSA5ICYmIHZhbHVlIDw9IDE1ID8gdmFsdWUgOiA5O1xuICAgIH1cblxuICAgIGlmIChuYW1lSW5wdXQudmFsdWUgIT09ICcnKSB7XG4gICAgICAgIG5hbWVJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eS1uYW1lJyk7XG4gICAgICAgIG5hbWVJbnB1dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eS1uYW1lJyk7XG5cbiAgICAgICAgaWYgKGJvYXJkKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGJvYXJkLmdhbWVCb2FyZCk7XG4gICAgICAgIH1cblxuICAgICAgICBib2FyZCA9IG5ldyBHYW1lQm9hcmQoZ2V0SW5wdXRWYWx1ZSgpLCBuYW1lSW5wdXQudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5hbWVJbnB1dC5jbGFzc0xpc3QuYWRkKCdlbXB0eS1uYW1lJyk7XG4gICAgICAgIG5hbWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdlbXB0eS1uYW1lJyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9pbmRleC5qcyIsImltcG9ydCB7RW1wdHlCbG9ja30gZnJvbSAnLi9FbXB0eUJsb2NrLmNsYXNzJztcbmltcG9ydCB7RmlndXJlfSBmcm9tICcuL0ZpZ3VyZS5jbGFzcyc7XG5pbXBvcnQge2xvY2FsU3RvcmFnZU9iamVjdH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UnO1xuXG5jb25zdCBHQU1FX0JPQVJEX1NJWkUgPSA1NTAsXG4gICAgTUlOX1NQRUVEID0gNTAwLFxuICAgIFNQRUVEX1JFRFVDVElPTiA9IDUwMDtcblxubGV0IGJsb2Nrc09uUGFnZSxcbiAgICBjdXJyZW50U2NvcmUsXG4gICAgY3VycmVudFNwZWVkLFxuICAgIGVsZW1lbnRzT25Cb2FyZCxcbiAgICBpbnRlcnZhbElELFxuICAgIGdhbWVGaW5pc2hlZEZsYWc7XG5cbmV4cG9ydCBjbGFzcyBHYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKG51bWJlck9mQmxvY2tzLCB1c2VyTmFtZSkge1xuICAgICAgICB0aGlzLnNpemUgPSBudW1iZXJPZkJsb2NrcztcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKTtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IHVzZXJOYW1lO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlRWxlbWVudCgpO1xuICAgICAgICB0aGlzLnNldEluaXRWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5kcmF3R2FtZUJvYXJkKCk7XG4gICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XG4gICAgfVxuXG4gICAgZ2V0IG1pZGRsZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5zaXplIC8gMik7XG4gICAgfVxuXG4gICAgYWRkTmV3RWxlbWVudCgpIHtcbiAgICAgICAgbGV0IG5ld0VsZW0gPSBuZXcgRmlndXJlKCksXG4gICAgICAgICAgICBwb2ludHNYT2ZOZXdFbGVtID0gbmV3RWxlbS5maWd1cmUuYmxvY2tzLm1hcChpdGVtID0+IGl0ZW1bMV0pLFxuICAgICAgICAgICAgbWlkZGxlID0gdGhpcy5taWRkbGUgLSBNYXRoLmZsb29yKE1hdGgubWF4KC4uLnBvaW50c1hPZk5ld0VsZW0pIC8gMik7XG5cbiAgICAgICAgbmV3RWxlbS5maWd1cmUuYmxvY2tzID0gbmV3RWxlbS5maWd1cmUuYmxvY2tzLm1hcChpdGVtID0+IFtpdGVtWzBdLCBpdGVtWzFdICsgbWlkZGxlXSk7XG5cbiAgICAgICAgaWYgKG5ld0VsZW0uY2FuQWRkVG9Cb2FyZCgpKSB7XG4gICAgICAgICAgICBlbGVtZW50c09uQm9hcmQucHVzaChuZXdFbGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmluaXNoR2FtZSgpO1xuICAgICAgICB9XG4gICAgICAgIG5ld0VsZW0uZHJhd0VsZW1lbnRPbkJvYXJkKG5ld0VsZW0uZmlndXJlLmNvbG9yKTtcbiAgICB9XG5cbiAgICBjaGVja1Njb3JlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2Nrc09uUGFnZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYoIWJsb2Nrc09uUGFnZVtpXS5tYXAoaXRlbSA9PiBpdGVtLmlzRW1wdHkoKSkuaW5jbHVkZXModHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsdXAoKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50c09uQm9hcmQuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVkcmF3RWxlbWVudCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZmlndXJlLmJsb2NrcyA9IGl0ZW0uZmlndXJlLmJsb2Nrcy5maWx0ZXIoZWxlbSA9PiBlbGVtWzBdICE9PSBpKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5maWd1cmUuYmxvY2tzLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbVswXSA8IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtWzBdKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRzT25Cb2FyZCA9IGVsZW1lbnRzT25Cb2FyZC5maWx0ZXIoZWxlbSA9PiBlbGVtLmZpZ3VyZS5ibG9ja3MubGVuZ3RoICE9PSAwKTtcbiAgICB9XG5cbiAgICBkcmF3R2FtZUJvYXJkKCkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmdhbWVCb2FyZC5jbGFzc05hbWUgPSAnZ2FtZSc7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmdhbWVCb2FyZCk7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkLmZvY3VzKCk7XG4gICAgICAgIEVtcHR5QmxvY2suc2V0V2lkdGgoKEdBTUVfQk9BUkRfU0laRSAvIHRoaXMuc2l6ZSkudG9GaXhlZCgyKSArICdweCcpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplOyArK2kpIHtcbiAgICAgICAgICAgIGJsb2Nrc09uUGFnZS5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5zaXplOyArK2opIHtcbiAgICAgICAgICAgICAgICBibG9ja3NPblBhZ2VbaV1bal0gPSBuZXcgRW1wdHlCbG9jayhHQU1FX0JPQVJEX1NJWkUsIHRoaXMuc2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lQm9hcmQuYXBwZW5kQ2hpbGQoYmxvY2tzT25QYWdlW2ldW2pdLmJveCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleGVjdXRlS2V5RG93bkFjdGlvbihldmVudCkge1xuICAgICAgICBsZXQgc2hpZnQsXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudHNPbkJvYXJkW2VsZW1lbnRzT25Cb2FyZC5sZW5ndGggLSAxXTtcblxuICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgaWYoZWxlbWVudC5maWd1cmUuY2VudGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJvdGF0ZUZpZ3VyZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICBlbGVtZW50Lm1vdmVMZWZ0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgIGVsZW1lbnQubW92ZVJpZ2h0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluaXNoR2FtZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQuaW5uZXJIVE1MICs9XG5gPGRpdiBjbGFzcz1cImZpbmlzaGVkLWdhbWVcIj5gICtcbiAgICBgPGgzIGNsYXNzPVwiZmluaXNoZWQtZ2FtZV9faGVhZGluZ1wiPkdBTUUgT1ZFUjwvaDM+YCArXG4gICAgYDxwIGNsYXNzPVwiZmluaXNoZWQtZ2FtZV9fc2NvcmVcIj5Zb3VyIGJlc3Qgc2NvcmU6ICR7bG9jYWxTdG9yYWdlT2JqZWN0LmdldERhdGEodGhpcy51c2VyTmFtZSkgfHwgMH08L3A+YCArXG5gPC9kaXY+YDtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuZXhlY3V0ZUtleURvd25BY3Rpb24pO1xuICAgICAgICBsb2NhbFN0b3JhZ2VPYmplY3QudXBkYXRlU3RvcmFnZSgpO1xuICAgICAgICBnYW1lRmluaXNoZWRGbGFnID0gdHJ1ZTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUtaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGxldmVsdXAoKSB7XG4gICAgICAgIGN1cnJlbnRTY29yZSArPSB0aGlzLnNpemU7XG4gICAgICAgIGxvY2FsU3RvcmFnZU9iamVjdC5hZGRWYWx1ZVRvU3RvcmFnZSh0aGlzLnVzZXJOYW1lLCBjdXJyZW50U2NvcmUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlRWxlbWVudCgpO1xuXG4gICAgICAgIGN1cnJlbnRTcGVlZCA9IGN1cnJlbnRTcGVlZCA9PT0gTUlOX1NQRUVEID8gY3VycmVudFNwZWVkIDogY3VycmVudFNwZWVkIC0gU1BFRURfUkVEVUNUSU9OO1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVTcGVlZCgpO1xuICAgIH1cblxuICAgIHNldEluaXRWYWx1ZXMoKSB7XG4gICAgICAgIHN3aXRjaChnYW1lRmluaXNoZWRGbGFnKSB7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSA9IHBhcnNlSW50KGxvY2FsU3RvcmFnZU9iamVjdC5nZXRGcm9tU3RvcmFnZSgpLmdldCgnY3VycmVudFNjb3JlJykpIHx8IDA7XG4gICAgICAgIH1cblxuICAgICAgICBibG9ja3NPblBhZ2UgPSBbXTtcbiAgICAgICAgY3VycmVudFNwZWVkID0gMTUwMDtcbiAgICAgICAgZWxlbWVudHNPbkJvYXJkID0gW107XG4gICAgICAgIGdhbWVGaW5pc2hlZEZsYWcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmVFbGVtZW50KCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmV4ZWN1dGVLZXlEb3duQWN0aW9uKTtcbiAgICAgICAgdGhpcy5hZGROZXdFbGVtZW50KCk7XG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVNwZWVkKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlR2FtZVNwZWVkKCkge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgICAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudHNPbkJvYXJkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubW92ZURvd24oKSkge1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTY29yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnYW1lRmluaXNoZWRGbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGROZXdFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LCBjdXJyZW50U3BlZWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNjb3JlRWxlbWVudCgpIHtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFNjb3JlIHx8IDA7XG4gICAgfVxuXG4gICAgc3RhdGljIGRyYXdCbG9jayhibG9jaywgY29sb3IpIHtcbiAgICAgICAgYmxvY2tzT25QYWdlW2Jsb2NrWzBdXVtibG9ja1sxXV0uY2hhbmdlQmxvY2tTdHlsZShjb2xvcik7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyeUFkZEJsb2NrKGJsb2NrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYmxvY2tzT25QYWdlW2Jsb2NrWzBdXVtibG9ja1sxXV0uaXNFbXB0eSgpO1xuICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJsZXQgZGVmYXVsdENvbG9yID0gJ3JnYigyMTYsIDIxNiwgMjE2KScsXG4gICAgd2lkdGg7XG5cbmV4cG9ydCBjbGFzcyBFbXB0eUJsb2NrIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5ib3guY2xhc3NOYW1lID0gJ2Jsb2NrLWVtcHR5JztcbiAgICAgICAgdGhpcy5ib3guc3R5bGUud2lkdGggPSB0aGlzLmJveC5zdHlsZS5oZWlnaHQgPSB3aWR0aDtcbiAgICAgICAgdGhpcy5ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZGVmYXVsdENvbG9yO1xuICAgIH1cblxuICAgIGNoYW5nZUJsb2NrU3R5bGUoY29sb3IpIHtcbiAgICAgICAgdGhpcy5ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3IgfHwgZGVmYXVsdENvbG9yO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPT09IGRlZmF1bHRDb2xvcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0V2lkdGgodmFsdWUpIHtcbiAgICAgICAgd2lkdGggPSB2YWx1ZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHtHYW1lQm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkLmNsYXNzJztcblxuY29uc3QgQkxPQ0tTID0gW1xuICAgIHtcbiAgICAgICAgY2VudGVyOiAxLFxuICAgICAgICBjb2xvcjogJyM4MUY3RjMnLFxuICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMCwgM11dLFxuICAgICAgICBjdXJyZW50UG9zaXRpb246IDAsXG4gICAgICAgIHNwZWNpYWxSb3RhdGU6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY2VudGVyOiAxLFxuICAgICAgICBjb2xvcjogJyM4MTgxRjcnLFxuICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMSwgMl1dXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNlbnRlcjogMSxcbiAgICAgICAgY29sb3I6ICcjRkU5QTJFJyxcbiAgICAgICAgYmxvY2tzOiBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDBdXVxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogJyNGM0Y3ODEnLFxuICAgICAgICBibG9ja3M6IFtbMCwgMF0sIFswLCAxXSwgWzEsIDBdLCBbMSwgMV1dXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNlbnRlcjogMCxcbiAgICAgICAgY29sb3I6ICcjODFGNzgxJyxcbiAgICAgICAgYmxvY2tzOiBbWzAsIDFdLCBbMCwgMl0sIFsxLCAwXSwgWzEsIDFdXSxcbiAgICAgICAgY3VycmVudFBvc2l0aW9uOiAwLFxuICAgICAgICBzcGVjaWFsUm90YXRlOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNlbnRlcjogMSxcbiAgICAgICAgY29sb3I6ICcjREE4MUY1JyxcbiAgICAgICAgYmxvY2tzOiBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDFdXVxuICAgIH0sXG4gICAge1xuICAgICAgICBjZW50ZXI6IDEsXG4gICAgICAgIGNvbG9yOiAnI0Y3ODE4MScsXG4gICAgICAgIGJsb2NrczogW1swLCAwXSwgWzAsIDFdLCBbMSwgMV0sIFsxLCAyXV0sXG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbjogMCxcbiAgICAgICAgc3BlY2lhbFJvdGF0ZTogdHJ1ZVxuICAgIH1cbl07XG5cbmV4cG9ydCBjbGFzcyBGaWd1cmUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZpZ3VyZSA9IE9iamVjdC5hc3NpZ24oe30sIEJMT0NLU1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA3KV0pO1xuICAgIH1cblxuICAgIGNhbkFkZFRvQm9hcmQoKSB7XG4gICAgICAgIGxldCBjYW5BZGQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZmlndXJlLmJsb2Nrcy5mb3JFYWNoKGl0ZW0gPT4gY2FuQWRkID0gY2FuQWRkICYmIEdhbWVCb2FyZC50cnlBZGRCbG9jayhpdGVtKSk7XG5cbiAgICAgICAgcmV0dXJuIGNhbkFkZDtcbiAgICB9XG5cbiAgICBjYW5Nb3ZlRWxlbWVudChzaGlmdCkge1xuICAgICAgICBsZXQgcG9zc2libGVOZXdQb3NpdGlvbiA9IHRoaXMuZmlndXJlLmJsb2Nrcy5tYXAoaXRlbSA9PiBbaXRlbVswXSArIHNoaWZ0WzBdLCBpdGVtWzFdICsgc2hpZnRbMV1dKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5pc0ZpZ3VyZVBvc0NvcnJlY3QocG9zc2libGVOZXdQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZHJhd0VsZW1lbnRPbkJvYXJkKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuZmlndXJlLmJsb2Nrcy5tYXAoaXRlbSA9PiBHYW1lQm9hcmQuZHJhd0Jsb2NrKGl0ZW0sIGNvbG9yKSk7XG4gICAgfVxuXG4gICAgaXNGaWd1cmVQb3NDb3JyZWN0KGJsb2Nrcykge1xuICAgICAgICBsZXQgY2FuTW92ZSA9IHRydWU7XG5cbiAgICAgICAgYmxvY2tzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlndXJlLmJsb2Nrcy5tYXAoaXRlbSA9PiBpdGVtLnRvU3RyaW5nKCkpLmluY2x1ZGVzKGl0ZW0udG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgICAgICBjYW5Nb3ZlID0gY2FuTW92ZSAmJiBHYW1lQm9hcmQudHJ5QWRkQmxvY2soaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjYW5Nb3ZlO1xuICAgIH1cblxuICAgIG1vdmVCbG9jayhwb3NpdGlvbiwgc2hpZnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuTW92ZUVsZW1lbnQoc2hpZnQpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZHJhd0VsZW1lbnQoKCkgPT4gdGhpcy5maWd1cmUuYmxvY2tzLm1hcChpdGVtID0+IGl0ZW1bcG9zaXRpb25dICs9IHNoaWZ0W3Bvc2l0aW9uXSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbW92ZURvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVCbG9jaygwLCBbMSwgMF0pO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlQmxvY2soMSwgWzAsIC0xXSk7XG4gICAgfVxuXG4gICAgbW92ZVJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlQmxvY2soMSwgWzAsIDFdKTtcbiAgICB9XG5cbiAgICByZWRyYXdFbGVtZW50KGNoYW5nZUZpZ3VyZUZ1bmMpIHtcbiAgICAgICAgdGhpcy5kcmF3RWxlbWVudE9uQm9hcmQoKTtcbiAgICAgICAgaWYgKGNoYW5nZUZpZ3VyZUZ1bmMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2hhbmdlRmlndXJlRnVuYygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0VsZW1lbnRPbkJvYXJkKHRoaXMuZmlndXJlLmNvbG9yKTtcbiAgICB9XG5cbiAgICByb3RhdGVGaWd1cmUoKSB7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguUEkgLyAyLFxuICAgICAgICAgICAgY2VudGVyID0gdGhpcy5maWd1cmUuYmxvY2tzW3RoaXMuZmlndXJlLmNlbnRlcl0sXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmZpZ3VyZS5jdXJyZW50UG9zaXRpb24sXG4gICAgICAgICAgICBvbGRQb3NYLCBvbGRQb3NZLFxuICAgICAgICAgICAgcm90YXRlZEZpZ3VyZUJsb2NrcztcblxuICAgICAgICBpZiAodGhpcy5maWd1cmUuc3BlY2lhbFJvdGF0ZSkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3NpdGlvbiAlIDIgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBhbmdsZSA9IC0gTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gPSAoY3VycmVudFBvc2l0aW9uICsgMSkgJSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgcm90YXRlZEZpZ3VyZUJsb2NrcyA9IHRoaXMuZmlndXJlLmJsb2Nrcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gY2VudGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbGRQb3NYID0gaXRlbVswXTtcbiAgICAgICAgICAgIG9sZFBvc1kgPSBpdGVtWzFdO1xuXG4gICAgICAgICAgICByZXR1cm4gWyhvbGRQb3NYIC0gY2VudGVyWzBdKSAqIE1hdGguY29zKGFuZ2xlKSAtIChvbGRQb3NZIC0gY2VudGVyWzFdKSAqIE1hdGguc2luKGFuZ2xlKSArIGNlbnRlclswXSxcbiAgICAgICAgICAgICAgICAgICAgKG9sZFBvc1ggLSBjZW50ZXJbMF0pICogTWF0aC5zaW4oYW5nbGUpICsgKG9sZFBvc1kgLSBjZW50ZXJbMV0pICogTWF0aC5jb3MoYW5nbGUpICsgY2VudGVyWzFdXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNGaWd1cmVQb3NDb3JyZWN0KHJvdGF0ZWRGaWd1cmVCbG9ja3MpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWd1cmUuc3BlY2lhbFJvdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlndXJlLmN1cnJlbnRQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVkcmF3RWxlbWVudCgoKSA9PiB7IHRoaXMuZmlndXJlLmJsb2NrcyA9IHJvdGF0ZWRGaWd1cmVCbG9ja3M7IH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9GaWd1cmUuY2xhc3MuanMiLCJsZXQgbWFwLFxuICAgIGxvY2FsU3RvcmFnZU9iamVjdCA9IHtcbiAgICAgICAgYWRkVmFsdWVUb1N0b3JhZ2UobmFtZSwgc2NvcmUpIHtcbiAgICAgICAgICAgIGlmKCFtYXAuaGFzKG5hbWUpIHx8IChtYXAuaGFzKG5hbWUpICYmIG1hcC5nZXQobmFtZSkgPCBzY29yZSkpIHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0KG5hbWUsIHNjb3JlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RGF0YShuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwLmdldChuYW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RnJvbVN0b3JhZ2UoKSB7XG4gICAgICAgICAgICBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNldChsb2NhbFN0b3JhZ2Uua2V5KGkpLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVTdG9yYWdlKCkge1xuICAgICAgICAgICAgbWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuZXhwb3J0IHtsb2NhbFN0b3JhZ2VPYmplY3R9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9sb2NhbFN0b3JhZ2UuanMiXSwic291cmNlUm9vdCI6IiJ9