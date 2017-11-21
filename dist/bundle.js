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


var _Element = __webpack_require__(1);

var _GameBoard = __webpack_require__(2);

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

                    board.elementsOnBoard = board.elementsOnBoard.filter(function (elem) {
                        return elem.block.length !== 0;
                    });
                }
            };

            for (var i = 0; i < board.blocksOnPage.length; ++i) {
                _loop(i);
            }
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Element = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameBoard = __webpack_require__(2);

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
/* 2 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmRjMjQ0NTRmNzg0ZmVhNWU3OGMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0VsZW1lbnQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9FbXB0eUJsb2NrLmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvbG9jYWxTdG9yYWdlLnNlcnZpY2UuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXQiLCJpbnRlcnZhbElEIiwiYm9hcmQiLCJzdGFydEdhbWUiLCJjaGVja1Njb3JlIiwiaSIsImJsb2Nrc09uUGFnZSIsIm1hcCIsIml0ZW0iLCJib3giLCJjbGFzc05hbWUiLCJpbmNsdWRlcyIsImxldmVsdXAiLCJlbGVtZW50c09uQm9hcmQiLCJmb3JFYWNoIiwicmVkcmF3RWxlbWVudCIsImJsb2NrIiwiZmlsdGVyIiwiZWxlbSIsImxlbmd0aCIsInNldEludGVydmFsIiwiaW5kZXgiLCJjYW5Nb3ZlRWxlbWVudCIsIm1vdmVCbG9jayIsImdhbWVJc0ZpbmlzaGVkIiwiYWRkTmV3RWxlbWVudCIsInNwZWVkIiwiYm9keSIsInJlbW92ZUNoaWxkIiwiZ2FtZUJvYXJkIiwiY2xlYXJJbnRlcnZhbCIsInVwZGF0ZVNjb3JlRWxlbWVudCIsImRyYXdHYW1lQm9hcmQiLCJleGVjdXRlS2V5RG93bkFjdGlvbiIsImV2ZW50Iiwia2V5Q29kZSIsIm5ld0VsZW0iLCJwb2ludHNYT2ZOZXdFbGVtIiwibWlkZGxlIiwiTWF0aCIsImZsb29yIiwibWF4IiwiY2FuQWRkQW5vdGhlckJsb2NrIiwiZWxlbWVudCIsImNhbkFkZCIsInRyeUFkZEJsb2NrIiwicHVzaCIsImRyYXdFbGVtZW50T25Cb2FyZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmaW5pc2hHYW1lIiwicG9zaXRpb24iLCJzaGlmdCIsInBlcmhhYnNOZXdQb3NpdGlvbiIsImNhbk1vdmUiLCJ0b1N0cmluZyIsIkJMT0NLUyIsIkVsZW1lbnQiLCJyYW5kb20iLCJjb2xvckluZGV4IiwiZHJhd0Jsb2NrIiwiZmlsdGVyZWRCbG9jayIsIkdBTUVfQk9BUkRfU0laRSIsIk1JTl9TUEVFRCIsIlNQRUVEX1JFRFVDVElPTiIsImN1cnJlbnRTY29yZSIsImN1cnJlbnRTcGVlZCIsImdhbWVGaW5pc2hlZEZsYWciLCJudW1iZXJPZkJsb2NrcyIsImNoZWNrSW5wdXRWYWx1ZSIsInZhbHVlIiwic2V0SW5pdFZhbHVlcyIsInBhcnNlSW50IiwiZ2V0RnJvbVN0b3JhZ2UiLCJnZXQiLCJzZXRXaWR0aCIsInRvRml4ZWQiLCJHYW1lQm9hcmQiLCJzY29yZUVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImoiLCJ1cGRhdGVTdG9yYWdlIiwiYWRkVmFsdWVUb1N0b3JhZ2UiLCJpbm5lclRleHQiLCJjaGFuZ2VCbG9ja1N0eWxlIiwiaXNFbXB0eSIsImVyciIsIndpZHRoIiwiRW1wdHlCbG9jayIsInN0eWxlIiwiaGVpZ2h0Iiwic3R5bGVCbG9jayIsImVsQ2xhc3MiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsIkxvY2FsU3RvcmFnZVNlcnZpY2UiLCJuYW1lIiwic2NvcmUiLCJoYXMiLCJzZXQiLCJNYXAiLCJsb2NhbFN0b3JhZ2UiLCJrZXkiLCJnZXRJdGVtIiwiY2xlYXIiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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L2Rpc3QvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNmRjMjQ0NTRmNzg0ZmVhNWU3OGMiLCJpbXBvcnQge0VsZW1lbnR9IGZyb20gJy4vRWxlbWVudC5jbGFzcyc7XG5pbXBvcnQge0dhbWVCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQuY2xhc3MnO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluaXQpO1xuXG5sZXQgaW50ZXJ2YWxJRCxcbiAgICBib2FyZDtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrU2NvcmUoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmJsb2Nrc09uUGFnZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmKCFib2FyZC5ibG9ja3NPblBhZ2VbaV0ubWFwKGl0ZW0gPT4gaXRlbS5ib3guY2xhc3NOYW1lKS5pbmNsdWRlcygnYmxvY2stZW1wdHknKSkge1xuICAgICAgICAgICAgICAgICAgICBib2FyZC5sZXZlbHVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmVsZW1lbnRzT25Cb2FyZC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5yZWRyYXdFbGVtZW50KCgpID0+IGl0ZW0uYmxvY2sgPSBpdGVtLmJsb2NrLmZpbHRlcihlbGVtID0+IGVsZW1bMF0gIT09IGkpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuZWxlbWVudHNPbkJvYXJkID0gYm9hcmQuZWxlbWVudHNPbkJvYXJkLmZpbHRlcihlbGVtID0+IGVsZW0uYmxvY2subGVuZ3RoICE9PSAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgYm9hcmQuZWxlbWVudHNPbkJvYXJkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVFbGVtZW50KGl0ZW0uYmxvY2ssIFsxLCAwXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbW92ZUJsb2NrKGl0ZW0sIDAsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gYm9hcmQuZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDEgJiYgIWJvYXJkLmdhbWVJc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGROZXdFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tTY29yZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIGJvYXJkLnNwZWVkKTtcbiAgICB9XG5cbiAgICBpZiAoYm9hcmQgfHwgaW50ZXJ2YWxJRCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGJvYXJkLmdhbWVCb2FyZCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgfVxuXG4gICAgYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG4gICAgYm9hcmQudXBkYXRlU2NvcmVFbGVtZW50KCk7XG5cbiAgICBib2FyZC5kcmF3R2FtZUJvYXJkKCk7XG4gICAgYWRkTmV3RWxlbWVudCgpO1xuICAgIHN0YXJ0R2FtZSgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV4ZWN1dGVLZXlEb3duQWN0aW9uKTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZUtleURvd25BY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgJiYgY2FuTW92ZUVsZW1lbnQoYm9hcmQuZWxlbWVudHNPbkJvYXJkW2JvYXJkLmVsZW1lbnRzT25Cb2FyZC5sZW5ndGggLSAxXS5ibG9jaywgWzAsIC0xXSkpIHtcbiAgICAgICAgbW92ZUJsb2NrKGJvYXJkLmVsZW1lbnRzT25Cb2FyZFtib2FyZC5lbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV0sIDEsIC0xKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5ICYmIGNhbk1vdmVFbGVtZW50KGJvYXJkLmVsZW1lbnRzT25Cb2FyZFtib2FyZC5lbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV0uYmxvY2ssIFswLCAxXSkpIHtcbiAgICAgICAgbW92ZUJsb2NrKGJvYXJkLmVsZW1lbnRzT25Cb2FyZFtib2FyZC5lbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV0sIDEsIDEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkTmV3RWxlbWVudCgpIHtcbiAgICBsZXQgbmV3RWxlbSA9IG5ldyBFbGVtZW50KCksXG4gICAgICAgIHBvaW50c1hPZk5ld0VsZW0gPSBuZXdFbGVtLmJsb2NrLm1hcChpdGVtID0+IGl0ZW1bMV0pLFxuICAgICAgICBtaWRkbGUgPSBib2FyZC5taWRkbGUgLSBNYXRoLmZsb29yKE1hdGgubWF4KC4uLnBvaW50c1hPZk5ld0VsZW0pIC8gMik7XG5cbiAgICBmdW5jdGlvbiBjYW5BZGRBbm90aGVyQmxvY2soZWxlbWVudCkge1xuICAgICAgICBsZXQgY2FuQWRkID0gdHJ1ZTtcblxuICAgICAgICBlbGVtZW50LmJsb2NrLmZvckVhY2goaXRlbSA9PiBjYW5BZGQgPSBjYW5BZGQgJiYgR2FtZUJvYXJkLnRyeUFkZEJsb2NrKGl0ZW0pKTtcblxuICAgICAgICByZXR1cm4gY2FuQWRkO1xuICAgIH1cblxuICAgIG5ld0VsZW0uYmxvY2sgPSBuZXdFbGVtLmJsb2NrLm1hcChpdGVtID0+IFtpdGVtWzBdLCBpdGVtWzFdICsgbWlkZGxlXSk7XG5cbiAgICBpZiAoY2FuQWRkQW5vdGhlckJsb2NrKG5ld0VsZW0pKSB7XG4gICAgICAgIGJvYXJkLmVsZW1lbnRzT25Cb2FyZC5wdXNoKG5ld0VsZW0pO1xuICAgICAgICBib2FyZC5lbGVtZW50c09uQm9hcmRbYm9hcmQuZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDFdLmRyYXdFbGVtZW50T25Cb2FyZChib2FyZC5lbGVtZW50c09uQm9hcmRbYm9hcmQuZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDFdLmluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXhlY3V0ZUtleURvd25BY3Rpb24pO1xuICAgICAgICBuZXdFbGVtLmRyYXdFbGVtZW50T25Cb2FyZChuZXdFbGVtLmluZGV4KTtcbiAgICAgICAgYm9hcmQuZmluaXNoR2FtZSgpO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbW92ZUJsb2NrKGVsZW1lbnQsIHBvc2l0aW9uLCBzaGlmdCkge1xuICAgIGVsZW1lbnQucmVkcmF3RWxlbWVudCgoKSA9PiBlbGVtZW50LmJsb2NrLm1hcChpdGVtID0+IGl0ZW1bcG9zaXRpb25dICs9IHNoaWZ0KSk7XG59XG5cbmZ1bmN0aW9uIGNhbk1vdmVFbGVtZW50KGJsb2NrLCBzaGlmdCkge1xuICAgIGxldCBwZXJoYWJzTmV3UG9zaXRpb24gPSBibG9jay5tYXAoaXRlbSA9PiBbaXRlbVswXSArIHNoaWZ0WzBdLCBpdGVtWzFdICsgc2hpZnRbMV1dKSxcbiAgICAgICAgY2FuTW92ZSA9IHRydWU7XG5cbiAgICBwZXJoYWJzTmV3UG9zaXRpb24uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKCFibG9jay5tYXAoaXRlbSA9PiBpdGVtLnRvU3RyaW5nKCkpLmluY2x1ZGVzKGl0ZW0udG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIGNhbk1vdmUgPSBjYW5Nb3ZlICYmIEdhbWVCb2FyZC50cnlBZGRCbG9jayhpdGVtKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhbk1vdmU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL2luZGV4LmpzIiwiaW1wb3J0IHtHYW1lQm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkLmNsYXNzJztcblxuY29uc3QgQkxPQ0tTID0gW1xuICAgIFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMCwgM11dLFxuICAgIFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMSwgMl1dLFxuICAgIFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMSwgMF1dLFxuICAgIFtbMCwgMF0sIFswLCAxXSwgWzEsIDBdLCBbMSwgMV1dLFxuICAgIFtbMCwgMV0sIFswLCAyXSwgWzEsIDBdLCBbMSwgMV1dLFxuICAgIFtbMCwgMF0sIFswLCAxXSwgWzAsIDJdLCBbMSwgMV1dLFxuICAgIFtbMCwgMF0sIFswLCAxXSwgWzEsIDFdLCBbMSwgMl1dXG5dO1xuXG5leHBvcnQgY2xhc3MgRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA3KSxcbiAgICAgICAgdGhpcy5ibG9jayA9IEJMT0NLU1t0aGlzLmluZGV4XTtcbiAgICB9XG5cbiAgICBjYW5BZGRUb0JvYXJkKCkge1xuICAgICAgICBsZXQgY2FuQWRkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmJsb2NrLmZvckVhY2goaXRlbSA9PiBjYW5BZGQgPSBjYW5BZGQgJiYgR2FtZUJvYXJkLnRyeUFkZEJsb2NrKGl0ZW0pKTtcblxuICAgICAgICByZXR1cm4gY2FuQWRkO1xuICAgIH1cblxuICAgIGRyYXdFbGVtZW50T25Cb2FyZChjb2xvckluZGV4KSB7XG4gICAgICAgIHRoaXMuYmxvY2subWFwKGl0ZW0gPT4gR2FtZUJvYXJkLmRyYXdCbG9jayhpdGVtLCBjb2xvckluZGV4KSk7XG4gICAgfVxuXG4gICAgcmVkcmF3RWxlbWVudChmaWx0ZXJlZEJsb2NrKSB7XG4gICAgICAgIHRoaXMuZHJhd0VsZW1lbnRPbkJvYXJkKCk7XG4gICAgICAgIGZpbHRlcmVkQmxvY2soKTtcbiAgICAgICAgdGhpcy5kcmF3RWxlbWVudE9uQm9hcmQodGhpcy5pbmRleCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9FbGVtZW50LmNsYXNzLmpzIiwiaW1wb3J0IHtFbXB0eUJsb2NrfSBmcm9tICcuL0VtcHR5QmxvY2suY2xhc3MnO1xuaW1wb3J0IHtMb2NhbFN0b3JhZ2VTZXJ2aWNlfSBmcm9tICcuL2xvY2FsU3RvcmFnZS5zZXJ2aWNlJztcblxuY29uc3QgR0FNRV9CT0FSRF9TSVpFID0gNTUwLFxuICAgIE1JTl9TUEVFRCA9IDEwMDAsXG4gICAgU1BFRURfUkVEVUNUSU9OID0gNTAwO1xuXG5sZXQgYmxvY2tzT25QYWdlLFxuICAgIGN1cnJlbnRTY29yZSxcbiAgICBjdXJyZW50U3BlZWQsXG4gICAgZ2FtZUZpbmlzaGVkRmxhZyxcbiAgICBudW1iZXJPZkJsb2NrcztcblxuZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xuICAgIGxldCB2YWx1ZSA9ICtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbnVtYmVyJykudmFsdWU7XG5cbiAgICByZXR1cm4gdmFsdWUgPj0gOSAmJiB2YWx1ZSA8PSAxNSA/IHZhbHVlIDogOTtcbn1cblxuXG5mdW5jdGlvbiBzZXRJbml0VmFsdWVzKCkge1xuICAgIGJsb2Nrc09uUGFnZSA9IFtdO1xuICAgIGN1cnJlbnRTcGVlZCA9IDI1MDA7XG4gICAgY3VycmVudFNjb3JlID0gcGFyc2VJbnQoTG9jYWxTdG9yYWdlU2VydmljZS5nZXRGcm9tU3RvcmFnZSgpLmdldCgnY3VycmVudFNjb3JlJykpIHx8IDA7XG4gICAgZ2FtZUZpbmlzaGVkRmxhZyA9IGZhbHNlO1xuICAgIG51bWJlck9mQmxvY2tzID0gY2hlY2tJbnB1dFZhbHVlKCk7XG4gICAgRW1wdHlCbG9jay5zZXRXaWR0aCgoR0FNRV9CT0FSRF9TSVpFIC8gbnVtYmVyT2ZCbG9ja3MpLnRvRml4ZWQoMSkgKyAncHgnKTtcbn1cblxuZXhwb3J0IGNsYXNzIEdhbWVCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHNPbkJvYXJkID0gW107XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkO1xuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpO1xuXG4gICAgICAgIHNldEluaXRWYWx1ZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgYmxvY2tzT25QYWdlKCkge1xuICAgICAgICByZXR1cm4gYmxvY2tzT25QYWdlO1xuICAgIH1cblxuICAgIGdldCBnYW1lSXNGaW5pc2hlZCgpIHtcbiAgICAgICAgcmV0dXJuIGdhbWVGaW5pc2hlZEZsYWc7XG4gICAgfVxuXG4gICAgZ2V0IG1pZGRsZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyT2ZCbG9ja3MgLyAyKTtcbiAgICB9XG5cbiAgICBnZXQgc3BlZWQoKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50U3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNwZWVkKHZhbHVlKSB7XG4gICAgICAgIGN1cnJlbnRTcGVlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGRyYXdHYW1lQm9hcmQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkLmNsYXNzTmFtZSA9ICdnYW1lJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmdhbWVCb2FyZCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkJsb2NrczsgKytpKSB7XG4gICAgICAgICAgICBibG9ja3NPblBhZ2UucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bWJlck9mQmxvY2tzOyArK2opIHtcbiAgICAgICAgICAgICAgICBibG9ja3NPblBhZ2VbaV1bal0gPSBuZXcgRW1wdHlCbG9jayhHQU1FX0JPQVJEX1NJWkUsIG51bWJlck9mQmxvY2tzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVCb2FyZC5hcHBlbmRDaGlsZChibG9ja3NPblBhZ2VbaV1bal0uYm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmlzaEdhbWUoKSB7XG4gICAgICAgIExvY2FsU3RvcmFnZVNlcnZpY2UudXBkYXRlU3RvcmFnZSgpO1xuICAgICAgICBnYW1lRmluaXNoZWRGbGFnID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZXZlbHVwKCkge1xuICAgICAgICBjdXJyZW50U2NvcmUgKz0gbnVtYmVyT2ZCbG9ja3M7XG4gICAgICAgIExvY2FsU3RvcmFnZVNlcnZpY2UuYWRkVmFsdWVUb1N0b3JhZ2UoJ2N1cnJlbnRTY29yZScsIGN1cnJlbnRTY29yZSk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmVFbGVtZW50KCk7XG5cbiAgICAgICAgY3VycmVudFNwZWVkID0gY3VycmVudFNwZWVkID09PSBNSU5fU1BFRUQgPyBjdXJyZW50U3BlZWQgOiBjdXJyZW50U3BlZWQgLSBTUEVFRF9SRURVQ1RJT047XG4gICAgfVxuXG4gICAgdXBkYXRlU2NvcmVFbGVtZW50KCkge1xuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudC5pbm5lclRleHQgPSBjdXJyZW50U2NvcmUgfHwgMDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZHJhd0Jsb2NrKGJsb2NrLCBpbmRleCkge1xuICAgICAgICBibG9ja3NPblBhZ2VbYmxvY2tbMF1dW2Jsb2NrWzFdXS5jaGFuZ2VCbG9ja1N0eWxlKGluZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJ5QWRkQmxvY2soYmxvY2spIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBibG9ja3NPblBhZ2VbYmxvY2tbMF1dW2Jsb2NrWzFdXS5pc0VtcHR5KCk7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL0dhbWVCb2FyZC5jbGFzcy5qcyIsImxldCB3aWR0aDtcblxuZXhwb3J0IGNsYXNzIEVtcHR5QmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJveC5jbGFzc05hbWUgPSAnYmxvY2stZW1wdHknO1xuICAgICAgICB0aGlzLmJveC5zdHlsZS53aWR0aCA9IHRoaXMuYm94LnN0eWxlLmhlaWdodCA9IHdpZHRoO1xuICAgIH1cblxuICAgIGNoYW5nZUJsb2NrU3R5bGUoc3R5bGVCbG9jaykge1xuICAgICAgICBsZXQgZWxDbGFzcywgY29sb3I7XG5cbiAgICAgICAgc3dpdGNoKHN0eWxlQmxvY2spIHtcbiAgICAgICAgY2FzZSAwOiBlbENsYXNzID0gJ2Jsb2NrLWknOyBjb2xvciA9ICcjODFGN0YzJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgMTogZWxDbGFzcyA9ICdibG9jay1qJzsgY29sb3IgPSAnIzgxODFGNyc7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGVsQ2xhc3MgPSAnYmxvY2stbCc7IGNvbG9yID0gJyNGRTlBMkUnOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBlbENsYXNzID0gJ2Jsb2NrLW8nOyBjb2xvciA9ICcjRjNGNzgxJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogZWxDbGFzcyA9ICdibG9jay1zJzsgY29sb3IgPSAnIzgxRjc4MSc7IGJyZWFrO1xuICAgICAgICBjYXNlIDU6IGVsQ2xhc3MgPSAnYmxvY2stdCc7IGNvbG9yID0gJyNEQTgxRjUnOyBicmVhaztcbiAgICAgICAgY2FzZSA2OiBlbENsYXNzID0gJ2Jsb2NrLXonOyBjb2xvciA9ICcjRjc4MTgxJzsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IGVsQ2xhc3MgPSAnYmxvY2stZW1wdHknOyBjb2xvciA9ICcjRDhEOEQ4JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm94LmNsYXNzTmFtZSA9IGVsQ2xhc3M7XG4gICAgICAgIHRoaXMuYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJveC5jbGFzc05hbWUgPT09ICdibG9jay1lbXB0eSc7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFdpZHRoKHZhbHVlKSB7XG4gICAgICAgIHdpZHRoID0gdmFsdWU7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9FbXB0eUJsb2NrLmNsYXNzLmpzIiwibGV0IG1hcDtcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVNlcnZpY2Uge1xuICAgIHN0YXRpYyBhZGRWYWx1ZVRvU3RvcmFnZShuYW1lLCBzY29yZSkge1xuICAgICAgICBpZighbWFwLmhhcyhuYW1lKSB8fCAobWFwLmhhcyhuYW1lKSAmJiBtYXAuZ2V0KG5hbWUpIDwgc2NvcmUpKSB7XG4gICAgICAgICAgICBtYXAuc2V0KG5hbWUsIHNjb3JlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIG1hcC5zZXQobG9jYWxTdG9yYWdlLmtleShpKSwgbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVN0b3JhZ2UoKSB7XG4gICAgICAgIG1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9sb2NhbFN0b3JhZ2Uuc2VydmljZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=