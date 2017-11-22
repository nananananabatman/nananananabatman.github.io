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

var _localStorage = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GAME_BOARD_SIZE = 550,
    MIN_SPEED = 1000,
    SPEED_REDUCTION = 500;

var blocksOnPage = void 0,
    currentScore = void 0,
    currentSpeed = void 0,
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
    gameFinishedFlag = false;
    numberOfBlocks = checkInputValue();
    _EmptyBlock.EmptyBlock.setWidth((GAME_BOARD_SIZE / numberOfBlocks).toFixed(1) + 'px');
}

var GameBoard = exports.GameBoard = function () {
    function GameBoard() {
        _classCallCheck(this, GameBoard);

        this.elementsOnBoard = [];
        this.gameBoard;
        this.scoreElement = document.getElementById('score');

        setInitValues();
    }

    _createClass(GameBoard, [{
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
        key: 'finishGame',
        value: function finishGame() {
            _localStorage.LocalStorageService.updateStorage();
            gameFinishedFlag = true;
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
        key: 'updateScoreElement',
        value: function updateScoreElement() {
            this.scoreElement.innerText = currentScore || 0;
        }
    }, {
        key: 'blocksOnPage',
        get: function get() {
            return blocksOnPage;
        }
    }, {
        key: 'gameIsFinished',
        get: function get() {
            return gameFinishedFlag;
        }
    }, {
        key: 'middle',
        get: function get() {
            return Math.floor(numberOfBlocks / 2);
        }
    }, {
        key: 'speed',
        get: function get() {
            return currentSpeed;
        },
        set: function set(value) {
            currentSpeed = value;
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


var _Element = __webpack_require__(2);

var _GameBoard = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

document.querySelector('#start').addEventListener('click', init);

var intervalID = void 0,
    board = void 0;

function init() {
    function startGame() {
        function checkScore() {
            var _loop = function _loop(i) {
                if (!board.blocksOnPage[i].map(function (item) {
                    return item.box.className;
                }).includes('block-empty')) {
                    board.levelup();
                    board.elementsOnBoard.forEach(function (item) {
                        return item.redrawElement(function () {
                            return item.block = item.block.filter(function (elem) {
                                return elem[0] !== i;
                            });
                        });
                    });
                }
            };

            for (var i = 0; i < board.blocksOnPage.length; ++i) {
                _loop(i);
            }

            board.elementsOnBoard = board.elementsOnBoard.filter(function (elem) {
                return elem.block.length !== 0;
            });
        }

        intervalID = setInterval(function () {
            board.elementsOnBoard.forEach(function (item, index) {
                if (canMoveElement(item.block, [1, 0])) {
                    moveBlock(item, 0, 1);
                } else {
                    if (index === board.elementsOnBoard.length - 1 && !board.gameIsFinished) {
                        addNewElement();
                    }
                    checkScore();
                }
            });
        }, board.speed);
    }

    if (board || intervalID) {
        document.body.removeChild(board.gameBoard);
        clearInterval(intervalID);
    }

    board = new _GameBoard.GameBoard();
    board.updateScoreElement();

    board.drawGameBoard();
    addNewElement();
    startGame();

    document.addEventListener('keydown', executeKeyDownAction);
}

function executeKeyDownAction(event) {
    if (event.keyCode === 37 && canMoveElement(board.elementsOnBoard[board.elementsOnBoard.length - 1].block, [0, -1])) {
        moveBlock(board.elementsOnBoard[board.elementsOnBoard.length - 1], 1, -1);
    } else if (event.keyCode === 39 && canMoveElement(board.elementsOnBoard[board.elementsOnBoard.length - 1].block, [0, 1])) {
        moveBlock(board.elementsOnBoard[board.elementsOnBoard.length - 1], 1, 1);
    }
}

function addNewElement() {
    var newElem = new _Element.Element(),
        pointsXOfNewElem = newElem.block.map(function (item) {
        return item[1];
    }),
        middle = board.middle - Math.floor(Math.max.apply(Math, _toConsumableArray(pointsXOfNewElem)) / 2);

    function canAddAnotherBlock(element) {
        var canAdd = true;

        element.block.forEach(function (item) {
            return canAdd = canAdd && _GameBoard.GameBoard.tryAddBlock(item);
        });

        return canAdd;
    }

    newElem.block = newElem.block.map(function (item) {
        return [item[0], item[1] + middle];
    });

    if (canAddAnotherBlock(newElem)) {
        board.elementsOnBoard.push(newElem);
        board.elementsOnBoard[board.elementsOnBoard.length - 1].drawElementOnBoard(board.elementsOnBoard[board.elementsOnBoard.length - 1].index);
    } else {
        document.removeEventListener('keydown', executeKeyDownAction);
        newElem.drawElementOnBoard(newElem.index);
        board.finishGame();
        clearInterval(intervalID);
    }
}

function moveBlock(element, position, shift) {
    element.redrawElement(function () {
        return element.block.map(function (item) {
            return item[position] += shift;
        });
    });
}

function canMoveElement(block, shift) {
    var perhabsNewPosition = block.map(function (item) {
        return [item[0] + shift[0], item[1] + shift[1]];
    }),
        canMove = true;

    perhabsNewPosition.forEach(function (item) {
        if (!block.map(function (item) {
            return item.toString();
        }).includes(item.toString())) {
            canMove = canMove && _GameBoard.GameBoard.tryAddBlock(item);
        }
    });

    return canMove;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Element = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameBoard = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BLOCKS = [[[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [0, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [0, 2], [1, 0]], [[0, 0], [0, 1], [1, 0], [1, 1]], [[0, 1], [0, 2], [1, 0], [1, 1]], [[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 0], [0, 1], [1, 1], [1, 2]]];

var Element = exports.Element = function () {
    function Element() {
        _classCallCheck(this, Element);

        this.index = Math.floor(Math.random() * 7), this.block = BLOCKS[this.index];
    }

    _createClass(Element, [{
        key: 'canAddToBoard',
        value: function canAddToBoard() {
            var canAdd = true;

            this.block.forEach(function (item) {
                return canAdd = canAdd && _GameBoard.GameBoard.tryAddBlock(item);
            });

            return canAdd;
        }
    }, {
        key: 'drawElementOnBoard',
        value: function drawElementOnBoard(colorIndex) {
            this.block.map(function (item) {
                return _GameBoard.GameBoard.drawBlock(item, colorIndex);
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

    return Element;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGQyYWE0NDY5YzM0YzUzZGIzY2UiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0VsZW1lbnQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9FbXB0eUJsb2NrLmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvbG9jYWxTdG9yYWdlLnNlcnZpY2UuanMiXSwibmFtZXMiOlsiR0FNRV9CT0FSRF9TSVpFIiwiTUlOX1NQRUVEIiwiU1BFRURfUkVEVUNUSU9OIiwiYmxvY2tzT25QYWdlIiwiY3VycmVudFNjb3JlIiwiY3VycmVudFNwZWVkIiwiZ2FtZUZpbmlzaGVkRmxhZyIsIm51bWJlck9mQmxvY2tzIiwiY2hlY2tJbnB1dFZhbHVlIiwidmFsdWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRJbml0VmFsdWVzIiwicGFyc2VJbnQiLCJnZXRGcm9tU3RvcmFnZSIsImdldCIsInNldFdpZHRoIiwidG9GaXhlZCIsIkdhbWVCb2FyZCIsImVsZW1lbnRzT25Cb2FyZCIsImdhbWVCb2FyZCIsInNjb3JlRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImkiLCJwdXNoIiwiaiIsImJveCIsInVwZGF0ZVN0b3JhZ2UiLCJhZGRWYWx1ZVRvU3RvcmFnZSIsInVwZGF0ZVNjb3JlRWxlbWVudCIsImlubmVyVGV4dCIsIk1hdGgiLCJmbG9vciIsImJsb2NrIiwiaW5kZXgiLCJjaGFuZ2VCbG9ja1N0eWxlIiwiaXNFbXB0eSIsImVyciIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0IiwiaW50ZXJ2YWxJRCIsImJvYXJkIiwic3RhcnRHYW1lIiwiY2hlY2tTY29yZSIsIm1hcCIsIml0ZW0iLCJpbmNsdWRlcyIsImxldmVsdXAiLCJmb3JFYWNoIiwicmVkcmF3RWxlbWVudCIsImZpbHRlciIsImVsZW0iLCJsZW5ndGgiLCJzZXRJbnRlcnZhbCIsImNhbk1vdmVFbGVtZW50IiwibW92ZUJsb2NrIiwiZ2FtZUlzRmluaXNoZWQiLCJhZGROZXdFbGVtZW50Iiwic3BlZWQiLCJyZW1vdmVDaGlsZCIsImNsZWFySW50ZXJ2YWwiLCJkcmF3R2FtZUJvYXJkIiwiZXhlY3V0ZUtleURvd25BY3Rpb24iLCJldmVudCIsImtleUNvZGUiLCJuZXdFbGVtIiwicG9pbnRzWE9mTmV3RWxlbSIsIm1pZGRsZSIsIm1heCIsImNhbkFkZEFub3RoZXJCbG9jayIsImVsZW1lbnQiLCJjYW5BZGQiLCJ0cnlBZGRCbG9jayIsImRyYXdFbGVtZW50T25Cb2FyZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmaW5pc2hHYW1lIiwicG9zaXRpb24iLCJzaGlmdCIsInBlcmhhYnNOZXdQb3NpdGlvbiIsImNhbk1vdmUiLCJ0b1N0cmluZyIsIkJMT0NLUyIsIkVsZW1lbnQiLCJyYW5kb20iLCJjb2xvckluZGV4IiwiZHJhd0Jsb2NrIiwiZmlsdGVyZWRCbG9jayIsIndpZHRoIiwiRW1wdHlCbG9jayIsInN0eWxlIiwiaGVpZ2h0Iiwic3R5bGVCbG9jayIsImVsQ2xhc3MiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsIkxvY2FsU3RvcmFnZVNlcnZpY2UiLCJuYW1lIiwic2NvcmUiLCJoYXMiLCJzZXQiLCJNYXAiLCJsb2NhbFN0b3JhZ2UiLCJrZXkiLCJnZXRJdGVtIiwiY2xlYXIiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTFCO0FBQ0gsYUFGRDtBQUdIIiwiZmlsZSI6Ii4vZGlzdC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwZDJhYTQ0NjljMzRjNTNkYjNjZSIsImltcG9ydCB7RW1wdHlCbG9ja30gZnJvbSAnLi9FbXB0eUJsb2NrLmNsYXNzJztcbmltcG9ydCB7TG9jYWxTdG9yYWdlU2VydmljZX0gZnJvbSAnLi9sb2NhbFN0b3JhZ2Uuc2VydmljZSc7XG5cbmNvbnN0IEdBTUVfQk9BUkRfU0laRSA9IDU1MCxcbiAgICBNSU5fU1BFRUQgPSAxMDAwLFxuICAgIFNQRUVEX1JFRFVDVElPTiA9IDUwMDtcblxubGV0IGJsb2Nrc09uUGFnZSxcbiAgICBjdXJyZW50U2NvcmUsXG4gICAgY3VycmVudFNwZWVkLFxuICAgIGdhbWVGaW5pc2hlZEZsYWcsXG4gICAgbnVtYmVyT2ZCbG9ja3M7XG5cbmZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcbiAgICBsZXQgdmFsdWUgPSArZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI251bWJlcicpLnZhbHVlO1xuXG4gICAgcmV0dXJuIHZhbHVlID49IDkgJiYgdmFsdWUgPD0gMTUgPyB2YWx1ZSA6IDk7XG59XG5cblxuZnVuY3Rpb24gc2V0SW5pdFZhbHVlcygpIHtcbiAgICBibG9ja3NPblBhZ2UgPSBbXTtcbiAgICBjdXJyZW50U3BlZWQgPSAyNTAwO1xuICAgIGN1cnJlbnRTY29yZSA9IHBhcnNlSW50KExvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0RnJvbVN0b3JhZ2UoKS5nZXQoJ2N1cnJlbnRTY29yZScpKSB8fCAwO1xuICAgIGdhbWVGaW5pc2hlZEZsYWcgPSBmYWxzZTtcbiAgICBudW1iZXJPZkJsb2NrcyA9IGNoZWNrSW5wdXRWYWx1ZSgpO1xuICAgIEVtcHR5QmxvY2suc2V0V2lkdGgoKEdBTUVfQk9BUkRfU0laRSAvIG51bWJlck9mQmxvY2tzKS50b0ZpeGVkKDEpICsgJ3B4Jyk7XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzT25Cb2FyZCA9IFtdO1xuICAgICAgICB0aGlzLmdhbWVCb2FyZDtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKTtcblxuICAgICAgICBzZXRJbml0VmFsdWVzKCk7XG4gICAgfVxuXG4gICAgZ2V0IGJsb2Nrc09uUGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIGJsb2Nrc09uUGFnZTtcbiAgICB9XG5cbiAgICBnZXQgZ2FtZUlzRmluaXNoZWQoKSB7XG4gICAgICAgIHJldHVybiBnYW1lRmluaXNoZWRGbGFnO1xuICAgIH1cblxuICAgIGdldCBtaWRkbGUoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlck9mQmxvY2tzIC8gMik7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKCkge1xuICAgICAgICByZXR1cm4gY3VycmVudFNwZWVkO1xuICAgIH1cblxuICAgIHNldCBzcGVlZCh2YWx1ZSkge1xuICAgICAgICBjdXJyZW50U3BlZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBkcmF3R2FtZUJvYXJkKCkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmdhbWVCb2FyZC5jbGFzc05hbWUgPSAnZ2FtZSc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5nYW1lQm9hcmQpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZCbG9ja3M7ICsraSkge1xuICAgICAgICAgICAgYmxvY2tzT25QYWdlLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1iZXJPZkJsb2NrczsgKytqKSB7XG4gICAgICAgICAgICAgICAgYmxvY2tzT25QYWdlW2ldW2pdID0gbmV3IEVtcHR5QmxvY2soR0FNRV9CT0FSRF9TSVpFLCBudW1iZXJPZkJsb2Nrcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lQm9hcmQuYXBwZW5kQ2hpbGQoYmxvY2tzT25QYWdlW2ldW2pdLmJveCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5pc2hHYW1lKCkge1xuICAgICAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLnVwZGF0ZVN0b3JhZ2UoKTtcbiAgICAgICAgZ2FtZUZpbmlzaGVkRmxhZyA9IHRydWU7XG4gICAgfVxuXG4gICAgbGV2ZWx1cCgpIHtcbiAgICAgICAgY3VycmVudFNjb3JlICs9IG51bWJlck9mQmxvY2tzO1xuICAgICAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLmFkZFZhbHVlVG9TdG9yYWdlKCdjdXJyZW50U2NvcmUnLCBjdXJyZW50U2NvcmUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlRWxlbWVudCgpO1xuXG4gICAgICAgIGN1cnJlbnRTcGVlZCA9IGN1cnJlbnRTcGVlZCA9PT0gTUlOX1NQRUVEID8gY3VycmVudFNwZWVkIDogY3VycmVudFNwZWVkIC0gU1BFRURfUkVEVUNUSU9OO1xuICAgIH1cblxuICAgIHVwZGF0ZVNjb3JlRWxlbWVudCgpIHtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFNjb3JlIHx8IDA7XG4gICAgfVxuXG4gICAgc3RhdGljIGRyYXdCbG9jayhibG9jaywgaW5kZXgpIHtcbiAgICAgICAgYmxvY2tzT25QYWdlW2Jsb2NrWzBdXVtibG9ja1sxXV0uY2hhbmdlQmxvY2tTdHlsZShpbmRleCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyeUFkZEJsb2NrKGJsb2NrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYmxvY2tzT25QYWdlW2Jsb2NrWzBdXVtibG9ja1sxXV0uaXNFbXB0eSgpO1xuICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJpbXBvcnQge0VsZW1lbnR9IGZyb20gJy4vRWxlbWVudC5jbGFzcyc7XG5pbXBvcnQge0dhbWVCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQuY2xhc3MnO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluaXQpO1xuXG5sZXQgaW50ZXJ2YWxJRCxcbiAgICBib2FyZDtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrU2NvcmUoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmJsb2Nrc09uUGFnZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmKCFib2FyZC5ibG9ja3NPblBhZ2VbaV0ubWFwKGl0ZW0gPT4gaXRlbS5ib3guY2xhc3NOYW1lKS5pbmNsdWRlcygnYmxvY2stZW1wdHknKSkge1xuICAgICAgICAgICAgICAgICAgICBib2FyZC5sZXZlbHVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmVsZW1lbnRzT25Cb2FyZC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5yZWRyYXdFbGVtZW50KCgpID0+IGl0ZW0uYmxvY2sgPSBpdGVtLmJsb2NrLmZpbHRlcihlbGVtID0+IGVsZW1bMF0gIT09IGkpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBib2FyZC5lbGVtZW50c09uQm9hcmQgPSBib2FyZC5lbGVtZW50c09uQm9hcmQuZmlsdGVyKGVsZW0gPT4gZWxlbS5ibG9jay5sZW5ndGggIT09IDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGJvYXJkLmVsZW1lbnRzT25Cb2FyZC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlRWxlbWVudChpdGVtLmJsb2NrLCBbMSwgMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVCbG9jayhpdGVtLCAwLCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IGJvYXJkLmVsZW1lbnRzT25Cb2FyZC5sZW5ndGggLSAxICYmICFib2FyZC5nYW1lSXNGaW5pc2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTmV3RWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrU2NvcmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LCBib2FyZC5zcGVlZCk7XG4gICAgfVxuXG4gICAgaWYgKGJvYXJkIHx8IGludGVydmFsSUQpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChib2FyZC5nYW1lQm9hcmQpO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgIH1cblxuICAgIGJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuICAgIGJvYXJkLnVwZGF0ZVNjb3JlRWxlbWVudCgpO1xuXG4gICAgYm9hcmQuZHJhd0dhbWVCb2FyZCgpO1xuICAgIGFkZE5ld0VsZW1lbnQoKTtcbiAgICBzdGFydEdhbWUoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBleGVjdXRlS2V5RG93bkFjdGlvbik7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVLZXlEb3duQWN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3ICYmIGNhbk1vdmVFbGVtZW50KGJvYXJkLmVsZW1lbnRzT25Cb2FyZFtib2FyZC5lbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV0uYmxvY2ssIFswLCAtMV0pKSB7XG4gICAgICAgIG1vdmVCbG9jayhib2FyZC5lbGVtZW50c09uQm9hcmRbYm9hcmQuZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDFdLCAxLCAtMSk7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSAmJiBjYW5Nb3ZlRWxlbWVudChib2FyZC5lbGVtZW50c09uQm9hcmRbYm9hcmQuZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDFdLmJsb2NrLCBbMCwgMV0pKSB7XG4gICAgICAgIG1vdmVCbG9jayhib2FyZC5lbGVtZW50c09uQm9hcmRbYm9hcmQuZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDFdLCAxLCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZE5ld0VsZW1lbnQoKSB7XG4gICAgbGV0IG5ld0VsZW0gPSBuZXcgRWxlbWVudCgpLFxuICAgICAgICBwb2ludHNYT2ZOZXdFbGVtID0gbmV3RWxlbS5ibG9jay5tYXAoaXRlbSA9PiBpdGVtWzFdKSxcbiAgICAgICAgbWlkZGxlID0gYm9hcmQubWlkZGxlIC0gTWF0aC5mbG9vcihNYXRoLm1heCguLi5wb2ludHNYT2ZOZXdFbGVtKSAvIDIpO1xuXG4gICAgZnVuY3Rpb24gY2FuQWRkQW5vdGhlckJsb2NrKGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IGNhbkFkZCA9IHRydWU7XG5cbiAgICAgICAgZWxlbWVudC5ibG9jay5mb3JFYWNoKGl0ZW0gPT4gY2FuQWRkID0gY2FuQWRkICYmIEdhbWVCb2FyZC50cnlBZGRCbG9jayhpdGVtKSk7XG5cbiAgICAgICAgcmV0dXJuIGNhbkFkZDtcbiAgICB9XG5cbiAgICBuZXdFbGVtLmJsb2NrID0gbmV3RWxlbS5ibG9jay5tYXAoaXRlbSA9PiBbaXRlbVswXSwgaXRlbVsxXSArIG1pZGRsZV0pO1xuXG4gICAgaWYgKGNhbkFkZEFub3RoZXJCbG9jayhuZXdFbGVtKSkge1xuICAgICAgICBib2FyZC5lbGVtZW50c09uQm9hcmQucHVzaChuZXdFbGVtKTtcbiAgICAgICAgYm9hcmQuZWxlbWVudHNPbkJvYXJkW2JvYXJkLmVsZW1lbnRzT25Cb2FyZC5sZW5ndGggLSAxXS5kcmF3RWxlbWVudE9uQm9hcmQoYm9hcmQuZWxlbWVudHNPbkJvYXJkW2JvYXJkLmVsZW1lbnRzT25Cb2FyZC5sZW5ndGggLSAxXS5pbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV4ZWN1dGVLZXlEb3duQWN0aW9uKTtcbiAgICAgICAgbmV3RWxlbS5kcmF3RWxlbWVudE9uQm9hcmQobmV3RWxlbS5pbmRleCk7XG4gICAgICAgIGJvYXJkLmZpbmlzaEdhbWUoKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVCbG9jayhlbGVtZW50LCBwb3NpdGlvbiwgc2hpZnQpIHtcbiAgICBlbGVtZW50LnJlZHJhd0VsZW1lbnQoKCkgPT4gZWxlbWVudC5ibG9jay5tYXAoaXRlbSA9PiBpdGVtW3Bvc2l0aW9uXSArPSBzaGlmdCkpO1xufVxuXG5mdW5jdGlvbiBjYW5Nb3ZlRWxlbWVudChibG9jaywgc2hpZnQpIHtcbiAgICBsZXQgcGVyaGFic05ld1Bvc2l0aW9uID0gYmxvY2subWFwKGl0ZW0gPT4gW2l0ZW1bMF0gKyBzaGlmdFswXSwgaXRlbVsxXSArIHNoaWZ0WzFdXSksXG4gICAgICAgIGNhbk1vdmUgPSB0cnVlO1xuXG4gICAgcGVyaGFic05ld1Bvc2l0aW9uLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmICghYmxvY2subWFwKGl0ZW0gPT4gaXRlbS50b1N0cmluZygpKS5pbmNsdWRlcyhpdGVtLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICBjYW5Nb3ZlID0gY2FuTW92ZSAmJiBHYW1lQm9hcmQudHJ5QWRkQmxvY2soaXRlbSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjYW5Nb3ZlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9pbmRleC5qcyIsImltcG9ydCB7R2FtZUJvYXJkfSBmcm9tICcuL0dhbWVCb2FyZC5jbGFzcyc7XG5cbmNvbnN0IEJMT0NLUyA9IFtcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzAsIDNdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDJdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDBdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFsxLCAwXSwgWzEsIDFdXSxcbiAgICBbWzAsIDFdLCBbMCwgMl0sIFsxLCAwXSwgWzEsIDFdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDFdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFsxLCAxXSwgWzEsIDJdXVxuXTtcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNyksXG4gICAgICAgIHRoaXMuYmxvY2sgPSBCTE9DS1NbdGhpcy5pbmRleF07XG4gICAgfVxuXG4gICAgY2FuQWRkVG9Cb2FyZCgpIHtcbiAgICAgICAgbGV0IGNhbkFkZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5ibG9jay5mb3JFYWNoKGl0ZW0gPT4gY2FuQWRkID0gY2FuQWRkICYmIEdhbWVCb2FyZC50cnlBZGRCbG9jayhpdGVtKSk7XG5cbiAgICAgICAgcmV0dXJuIGNhbkFkZDtcbiAgICB9XG5cbiAgICBkcmF3RWxlbWVudE9uQm9hcmQoY29sb3JJbmRleCkge1xuICAgICAgICB0aGlzLmJsb2NrLm1hcChpdGVtID0+IEdhbWVCb2FyZC5kcmF3QmxvY2soaXRlbSwgY29sb3JJbmRleCkpO1xuICAgIH1cblxuICAgIHJlZHJhd0VsZW1lbnQoZmlsdGVyZWRCbG9jaykge1xuICAgICAgICB0aGlzLmRyYXdFbGVtZW50T25Cb2FyZCgpO1xuICAgICAgICBmaWx0ZXJlZEJsb2NrKCk7XG4gICAgICAgIHRoaXMuZHJhd0VsZW1lbnRPbkJvYXJkKHRoaXMuaW5kZXgpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvRWxlbWVudC5jbGFzcy5qcyIsImxldCB3aWR0aDtcblxuZXhwb3J0IGNsYXNzIEVtcHR5QmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJveC5jbGFzc05hbWUgPSAnYmxvY2stZW1wdHknO1xuICAgICAgICB0aGlzLmJveC5zdHlsZS53aWR0aCA9IHRoaXMuYm94LnN0eWxlLmhlaWdodCA9IHdpZHRoO1xuICAgIH1cblxuICAgIGNoYW5nZUJsb2NrU3R5bGUoc3R5bGVCbG9jaykge1xuICAgICAgICBsZXQgZWxDbGFzcywgY29sb3I7XG5cbiAgICAgICAgc3dpdGNoKHN0eWxlQmxvY2spIHtcbiAgICAgICAgY2FzZSAwOiBlbENsYXNzID0gJ2Jsb2NrLWknOyBjb2xvciA9ICcjODFGN0YzJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgMTogZWxDbGFzcyA9ICdibG9jay1qJzsgY29sb3IgPSAnIzgxODFGNyc7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGVsQ2xhc3MgPSAnYmxvY2stbCc7IGNvbG9yID0gJyNGRTlBMkUnOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBlbENsYXNzID0gJ2Jsb2NrLW8nOyBjb2xvciA9ICcjRjNGNzgxJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogZWxDbGFzcyA9ICdibG9jay1zJzsgY29sb3IgPSAnIzgxRjc4MSc7IGJyZWFrO1xuICAgICAgICBjYXNlIDU6IGVsQ2xhc3MgPSAnYmxvY2stdCc7IGNvbG9yID0gJyNEQTgxRjUnOyBicmVhaztcbiAgICAgICAgY2FzZSA2OiBlbENsYXNzID0gJ2Jsb2NrLXonOyBjb2xvciA9ICcjRjc4MTgxJzsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IGVsQ2xhc3MgPSAnYmxvY2stZW1wdHknOyBjb2xvciA9ICcjRDhEOEQ4JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm94LmNsYXNzTmFtZSA9IGVsQ2xhc3M7XG4gICAgICAgIHRoaXMuYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJveC5jbGFzc05hbWUgPT09ICdibG9jay1lbXB0eSc7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFdpZHRoKHZhbHVlKSB7XG4gICAgICAgIHdpZHRoID0gdmFsdWU7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9FbXB0eUJsb2NrLmNsYXNzLmpzIiwibGV0IG1hcDtcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVNlcnZpY2Uge1xuICAgIHN0YXRpYyBhZGRWYWx1ZVRvU3RvcmFnZShuYW1lLCBzY29yZSkge1xuICAgICAgICBpZighbWFwLmhhcyhuYW1lKSB8fCAobWFwLmhhcyhuYW1lKSAmJiBtYXAuZ2V0KG5hbWUpIDwgc2NvcmUpKSB7XG4gICAgICAgICAgICBtYXAuc2V0KG5hbWUsIHNjb3JlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIG1hcC5zZXQobG9jYWxTdG9yYWdlLmtleShpKSwgbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVN0b3JhZ2UoKSB7XG4gICAgICAgIG1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9sb2NhbFN0b3JhZ2Uuc2VydmljZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=