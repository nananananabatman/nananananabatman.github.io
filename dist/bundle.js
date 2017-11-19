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

                    board.elementsOnBoard.map(function (item) {
                        return drawElement(item.block);
                    });
                    board.elementsOnBoard.forEach(function (item) {
                        return item.block = item.block.filter(function (elem) {
                            return elem[0] !== i;
                        });
                    });
                    board.elementsOnBoard = board.elementsOnBoard.filter(function (elem) {
                        return elem.block.length !== 0;
                    });
                    board.elementsOnBoard.map(function (item) {
                        return drawElement(item.block, item.index);
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
            return canAdd = canAdd && tryAddBlock(item);
        });

        return canAdd;
    }

    function paintLastElement() {
        newElem.block.map(function (item) {
            return board.blocksOnPage[item[0]][item[1]].changeBlockStyle(newElem.index);
        });
    }

    newElem.block = newElem.block.map(function (item) {
        return [item[0], item[1] + middle];
    });

    if (canAddAnotherBlock(newElem)) {
        board.elementsOnBoard.push(newElem);
        drawElement(board.elementsOnBoard[board.elementsOnBoard.length - 1].block, board.elementsOnBoard[board.elementsOnBoard.length - 1].index);
    } else {
        document.removeEventListener('keydown', executeKeyDownAction);
        paintLastElement();
        board.finishGame();
        clearInterval(intervalID);
    }
}

function tryAddBlock(block) {
    try {
        return board.blocksOnPage[block[0]][block[1]].box.className === 'block-empty';
    } catch (err) {
        return false;
    }
}

function drawElement(block, index) {
    block.map(function (item) {
        board.blocksOnPage[item[0]][item[1]].changeBlockStyle(index);
    });
}

function moveBlock(element, position, shift) {
    drawElement(element.block);
    element.block.map(function (item) {
        return item[position] += shift;
    });
    drawElement(element.block, element.index);
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
            canMove = canMove && tryAddBlock(item);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BLOCKS = [[[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [0, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [0, 2], [1, 0]], [[0, 0], [0, 1], [1, 0], [1, 1]], [[0, 1], [0, 2], [1, 0], [1, 1]], [[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 0], [0, 1], [1, 1], [1, 2]]];

var Element = exports.Element = function Element() {
    _classCallCheck(this, Element);

    this.index = Math.floor(Math.random() * 7), this.block = BLOCKS[this.index];
};

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

var currentScore = void 0,
    currentSpeed = void 0,
    gameFinishedFlag = void 0,
    numberOfBlocks = void 0;

function checkInputValue() {
    var value = +document.querySelector('#number').value;

    return value >= 9 && value <= 15 ? value : 9;
}

function setInitValues() {
    currentSpeed = 2500;
    currentScore = parseInt(_localStorage.LocalStorageService.getFromStorage().get('currentScore')) || 0;
    gameFinishedFlag = false;
    numberOfBlocks = checkInputValue();
    _EmptyBlock.EmptyBlock.setWidth((GAME_BOARD_SIZE / numberOfBlocks).toFixed(1) + 'px');
}

var GameBoard = exports.GameBoard = function () {
    function GameBoard() {
        _classCallCheck(this, GameBoard);

        this.blocksOnPage = [];
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
                this.blocksOnPage.push([]);
                for (var j = 0; j < numberOfBlocks; ++j) {
                    this.blocksOnPage[i][j] = new _EmptyBlock.EmptyBlock(GAME_BOARD_SIZE, numberOfBlocks);
                    this.gameBoard.appendChild(this.blocksOnPage[i][j].box);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjY3MWRhZjljZmZiNWZjN2JlMmMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL0VsZW1lbnQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9FbXB0eUJsb2NrLmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvbG9jYWxTdG9yYWdlLnNlcnZpY2UuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXQiLCJpbnRlcnZhbElEIiwiYm9hcmQiLCJzdGFydEdhbWUiLCJjaGVja1Njb3JlIiwiaSIsImJsb2Nrc09uUGFnZSIsIm1hcCIsIml0ZW0iLCJib3giLCJjbGFzc05hbWUiLCJpbmNsdWRlcyIsImxldmVsdXAiLCJlbGVtZW50c09uQm9hcmQiLCJkcmF3RWxlbWVudCIsImJsb2NrIiwiZm9yRWFjaCIsImZpbHRlciIsImVsZW0iLCJsZW5ndGgiLCJpbmRleCIsInNldEludGVydmFsIiwiY2FuTW92ZUVsZW1lbnQiLCJtb3ZlQmxvY2siLCJnYW1lSXNGaW5pc2hlZCIsImFkZE5ld0VsZW1lbnQiLCJzcGVlZCIsImJvZHkiLCJyZW1vdmVDaGlsZCIsImdhbWVCb2FyZCIsImNsZWFySW50ZXJ2YWwiLCJ1cGRhdGVTY29yZUVsZW1lbnQiLCJkcmF3R2FtZUJvYXJkIiwiZXhlY3V0ZUtleURvd25BY3Rpb24iLCJldmVudCIsImtleUNvZGUiLCJuZXdFbGVtIiwicG9pbnRzWE9mTmV3RWxlbSIsIm1pZGRsZSIsIk1hdGgiLCJmbG9vciIsIm1heCIsImNhbkFkZEFub3RoZXJCbG9jayIsImVsZW1lbnQiLCJjYW5BZGQiLCJ0cnlBZGRCbG9jayIsInBhaW50TGFzdEVsZW1lbnQiLCJjaGFuZ2VCbG9ja1N0eWxlIiwicHVzaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmaW5pc2hHYW1lIiwiZXJyIiwicG9zaXRpb24iLCJzaGlmdCIsInBlcmhhYnNOZXdQb3NpdGlvbiIsImNhbk1vdmUiLCJ0b1N0cmluZyIsIkJMT0NLUyIsIkVsZW1lbnQiLCJyYW5kb20iLCJHQU1FX0JPQVJEX1NJWkUiLCJNSU5fU1BFRUQiLCJTUEVFRF9SRURVQ1RJT04iLCJjdXJyZW50U2NvcmUiLCJjdXJyZW50U3BlZWQiLCJnYW1lRmluaXNoZWRGbGFnIiwibnVtYmVyT2ZCbG9ja3MiLCJjaGVja0lucHV0VmFsdWUiLCJ2YWx1ZSIsInNldEluaXRWYWx1ZXMiLCJwYXJzZUludCIsImdldEZyb21TdG9yYWdlIiwiZ2V0Iiwic2V0V2lkdGgiLCJ0b0ZpeGVkIiwiR2FtZUJvYXJkIiwic2NvcmVFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJqIiwidXBkYXRlU3RvcmFnZSIsImFkZFZhbHVlVG9TdG9yYWdlIiwiaW5uZXJUZXh0Iiwid2lkdGgiLCJFbXB0eUJsb2NrIiwic3R5bGUiLCJoZWlnaHQiLCJzdHlsZUJsb2NrIiwiZWxDbGFzcyIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiTG9jYWxTdG9yYWdlU2VydmljZSIsIm5hbWUiLCJzY29yZSIsImhhcyIsInNldCIsIk1hcCIsImxvY2FsU3RvcmFnZSIsImtleSIsImdldEl0ZW0iLCJjbGVhciIsInNldEl0ZW0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJC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QUtoRixHQUFMLENBQVM2RSxLQUFULENBQWVLLGVBQWYsR0FBaUNELEtBQWpDO0FBQ0g7OztpQ0FFZXRCLEssRUFBTztBQUNuQmdCLG9CQUFRaEIsS0FBUjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkwsSUFBSTdELFlBQUo7O0lBRWFxRixtQixXQUFBQSxtQjs7Ozs7OzswQ0FDZ0JDLEksRUFBTUMsSyxFQUFPO0FBQ2xDLGdCQUFHLENBQUN2RixJQUFJd0YsR0FBSixDQUFRRixJQUFSLENBQUQsSUFBbUJ0RixJQUFJd0YsR0FBSixDQUFRRixJQUFSLEtBQWlCdEYsSUFBSWlFLEdBQUosQ0FBUXFCLElBQVIsSUFBZ0JDLEtBQXZELEVBQStEO0FBQzNEdkYsb0JBQUl5RixHQUFKLENBQVFILElBQVIsRUFBY0MsS0FBZDtBQUNIO0FBQ0o7Ozt5Q0FFdUI7QUFDcEJ2RixrQkFBTSxJQUFJMEYsR0FBSixFQUFOO0FBQ0EsZ0JBQUlDLGFBQWEvRSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzNCLHFCQUFJLElBQUlkLElBQUksQ0FBWixFQUFlQSxJQUFJNkYsYUFBYS9FLE1BQWhDLEVBQXdDLEVBQUVkLENBQTFDLEVBQTZDO0FBQ3pDRSx3QkFBSXlGLEdBQUosQ0FBUUUsYUFBYUMsR0FBYixDQUFpQjlGLENBQWpCLENBQVIsRUFBNkI2RixhQUFhRSxPQUFiLENBQXFCRixhQUFhQyxHQUFiLENBQWlCOUYsQ0FBakIsQ0FBckIsQ0FBN0I7QUFDSDs7QUFFRDZGLDZCQUFhRyxLQUFiO0FBQ0g7O0FBRUQsbUJBQU85RixHQUFQO0FBQ0g7Ozt3Q0FFc0I7QUFDbkJBLGdCQUFJUyxPQUFKLENBQVksVUFBQ29ELEtBQUQsRUFBUStCLEdBQVIsRUFBZ0I7QUFDeEJELDZCQUFhSSxPQUFiLENBQXFCSCxHQUFyQixFQUEwQi9CLEtBQTFCO0FBQ0gsYUFGRDtBQUdIIiwiZmlsZSI6Ii4vZGlzdC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmNjcxZGFmOWNmZmI1ZmM3YmUyYyIsImltcG9ydCB7RWxlbWVudH0gZnJvbSAnLi9FbGVtZW50LmNsYXNzJztcbmltcG9ydCB7R2FtZUJvYXJkfSBmcm9tICcuL0dhbWVCb2FyZC5jbGFzcyc7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5pdCk7XG5cbmxldCBpbnRlcnZhbElELFxuICAgIGJvYXJkO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tTY29yZSgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuYmxvY2tzT25QYWdlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYoIWJvYXJkLmJsb2Nrc09uUGFnZVtpXS5tYXAoaXRlbSA9PiBpdGVtLmJveC5jbGFzc05hbWUpLmluY2x1ZGVzKCdibG9jay1lbXB0eScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmxldmVsdXAoKTtcblxuICAgICAgICAgICAgICAgICAgICBib2FyZC5lbGVtZW50c09uQm9hcmQubWFwKGl0ZW0gPT4gZHJhd0VsZW1lbnQoaXRlbS5ibG9jaykpO1xuICAgICAgICAgICAgICAgICAgICBib2FyZC5lbGVtZW50c09uQm9hcmQuZm9yRWFjaChpdGVtID0+IGl0ZW0uYmxvY2sgPSBpdGVtLmJsb2NrLmZpbHRlcihlbGVtID0+IGVsZW1bMF0gIT09IGkpKTtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuZWxlbWVudHNPbkJvYXJkID0gYm9hcmQuZWxlbWVudHNPbkJvYXJkLmZpbHRlcihlbGVtID0+IGVsZW0uYmxvY2subGVuZ3RoICE9PSAwKTtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuZWxlbWVudHNPbkJvYXJkLm1hcChpdGVtID0+IGRyYXdFbGVtZW50KGl0ZW0uYmxvY2ssIGl0ZW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgYm9hcmQuZWxlbWVudHNPbkJvYXJkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVFbGVtZW50KGl0ZW0uYmxvY2ssIFsxLCAwXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbW92ZUJsb2NrKGl0ZW0sIDAsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gYm9hcmQuZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDEgJiYgIWJvYXJkLmdhbWVJc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGROZXdFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tTY29yZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIGJvYXJkLnNwZWVkKTtcbiAgICB9XG5cbiAgICBpZiAoYm9hcmQgfHwgaW50ZXJ2YWxJRCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGJvYXJkLmdhbWVCb2FyZCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgfVxuXG4gICAgYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG4gICAgYm9hcmQudXBkYXRlU2NvcmVFbGVtZW50KCk7XG5cbiAgICBib2FyZC5kcmF3R2FtZUJvYXJkKCk7XG4gICAgYWRkTmV3RWxlbWVudCgpO1xuICAgIHN0YXJ0R2FtZSgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV4ZWN1dGVLZXlEb3duQWN0aW9uKTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZUtleURvd25BY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgJiYgY2FuTW92ZUVsZW1lbnQoYm9hcmQuZWxlbWVudHNPbkJvYXJkW2JvYXJkLmVsZW1lbnRzT25Cb2FyZC5sZW5ndGggLSAxXS5ibG9jaywgWzAsIC0xXSkpIHtcbiAgICAgICAgbW92ZUJsb2NrKGJvYXJkLmVsZW1lbnRzT25Cb2FyZFtib2FyZC5lbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV0sIDEsIC0xKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5ICYmIGNhbk1vdmVFbGVtZW50KGJvYXJkLmVsZW1lbnRzT25Cb2FyZFtib2FyZC5lbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV0uYmxvY2ssIFswLCAxXSkpIHtcbiAgICAgICAgbW92ZUJsb2NrKGJvYXJkLmVsZW1lbnRzT25Cb2FyZFtib2FyZC5lbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV0sIDEsIDEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkTmV3RWxlbWVudCgpIHtcbiAgICBsZXQgbmV3RWxlbSA9IG5ldyBFbGVtZW50KCksXG4gICAgICAgIHBvaW50c1hPZk5ld0VsZW0gPSBuZXdFbGVtLmJsb2NrLm1hcChpdGVtID0+IGl0ZW1bMV0pLFxuICAgICAgICBtaWRkbGUgPSBib2FyZC5taWRkbGUgLSBNYXRoLmZsb29yKE1hdGgubWF4KC4uLnBvaW50c1hPZk5ld0VsZW0pIC8gMik7XG5cbiAgICBmdW5jdGlvbiBjYW5BZGRBbm90aGVyQmxvY2soZWxlbWVudCkge1xuICAgICAgICBsZXQgY2FuQWRkID0gdHJ1ZTtcblxuICAgICAgICBlbGVtZW50LmJsb2NrLmZvckVhY2goaXRlbSA9PiBjYW5BZGQgPSBjYW5BZGQgJiYgdHJ5QWRkQmxvY2soaXRlbSkpO1xuXG4gICAgICAgIHJldHVybiBjYW5BZGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFpbnRMYXN0RWxlbWVudCgpIHtcbiAgICAgICAgbmV3RWxlbS5ibG9jay5tYXAoaXRlbSA9PiBib2FyZC5ibG9ja3NPblBhZ2VbaXRlbVswXV1baXRlbVsxXV0uY2hhbmdlQmxvY2tTdHlsZShuZXdFbGVtLmluZGV4KSk7XG4gICAgfVxuXG4gICAgbmV3RWxlbS5ibG9jayA9IG5ld0VsZW0uYmxvY2subWFwKGl0ZW0gPT4gW2l0ZW1bMF0sIGl0ZW1bMV0gKyBtaWRkbGVdKTtcblxuICAgIGlmIChjYW5BZGRBbm90aGVyQmxvY2sobmV3RWxlbSkpIHtcbiAgICAgICAgYm9hcmQuZWxlbWVudHNPbkJvYXJkLnB1c2gobmV3RWxlbSk7XG4gICAgICAgIGRyYXdFbGVtZW50KGJvYXJkLmVsZW1lbnRzT25Cb2FyZFtib2FyZC5lbGVtZW50c09uQm9hcmQubGVuZ3RoIC0gMV0uYmxvY2ssXG4gICAgICAgICAgICBib2FyZC5lbGVtZW50c09uQm9hcmRbYm9hcmQuZWxlbWVudHNPbkJvYXJkLmxlbmd0aCAtIDFdLmluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXhlY3V0ZUtleURvd25BY3Rpb24pO1xuICAgICAgICBwYWludExhc3RFbGVtZW50KCk7XG4gICAgICAgIGJvYXJkLmZpbmlzaEdhbWUoKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRyeUFkZEJsb2NrKGJsb2NrKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGJvYXJkLmJsb2Nrc09uUGFnZVtibG9ja1swXV1bYmxvY2tbMV1dLmJveC5jbGFzc05hbWUgPT09ICdibG9jay1lbXB0eSc7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhd0VsZW1lbnQoYmxvY2ssIGluZGV4KSB7XG4gICAgYmxvY2subWFwKGl0ZW0gPT4ge1xuICAgICAgICBib2FyZC5ibG9ja3NPblBhZ2VbaXRlbVswXV1baXRlbVsxXV0uY2hhbmdlQmxvY2tTdHlsZShpbmRleCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vdmVCbG9jayhlbGVtZW50LCBwb3NpdGlvbiwgc2hpZnQpIHtcbiAgICBkcmF3RWxlbWVudChlbGVtZW50LmJsb2NrKTtcbiAgICBlbGVtZW50LmJsb2NrLm1hcChpdGVtID0+IGl0ZW1bcG9zaXRpb25dICs9IHNoaWZ0KTtcbiAgICBkcmF3RWxlbWVudChlbGVtZW50LmJsb2NrLCBlbGVtZW50LmluZGV4KTtcbn1cblxuZnVuY3Rpb24gY2FuTW92ZUVsZW1lbnQoYmxvY2ssIHNoaWZ0KSB7XG4gICAgbGV0IHBlcmhhYnNOZXdQb3NpdGlvbiA9IGJsb2NrLm1hcChpdGVtID0+IFtpdGVtWzBdICsgc2hpZnRbMF0sIGl0ZW1bMV0gKyBzaGlmdFsxXV0pLFxuICAgICAgICBjYW5Nb3ZlID0gdHJ1ZTtcblxuICAgIHBlcmhhYnNOZXdQb3NpdGlvbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoIWJsb2NrLm1hcChpdGVtID0+IGl0ZW0udG9TdHJpbmcoKSkuaW5jbHVkZXMoaXRlbS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgY2FuTW92ZSA9IGNhbk1vdmUgJiYgdHJ5QWRkQmxvY2soaXRlbSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjYW5Nb3ZlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9pbmRleC5qcyIsImNvbnN0IEJMT0NLUyA9IFtcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzAsIDNdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDJdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDBdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFsxLCAwXSwgWzEsIDFdXSxcbiAgICBbWzAsIDFdLCBbMCwgMl0sIFsxLCAwXSwgWzEsIDFdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFswLCAyXSwgWzEsIDFdXSxcbiAgICBbWzAsIDBdLCBbMCwgMV0sIFsxLCAxXSwgWzEsIDJdXVxuXTtcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNyksXG4gICAgICAgIHRoaXMuYmxvY2sgPSBCTE9DS1NbdGhpcy5pbmRleF07XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9FbGVtZW50LmNsYXNzLmpzIiwiaW1wb3J0IHtFbXB0eUJsb2NrfSBmcm9tICcuL0VtcHR5QmxvY2suY2xhc3MnO1xuaW1wb3J0IHtMb2NhbFN0b3JhZ2VTZXJ2aWNlfSBmcm9tICcuL2xvY2FsU3RvcmFnZS5zZXJ2aWNlJztcblxuY29uc3QgR0FNRV9CT0FSRF9TSVpFID0gNTUwLFxuICAgIE1JTl9TUEVFRCA9IDEwMDAsXG4gICAgU1BFRURfUkVEVUNUSU9OID0gNTAwO1xuXG5sZXQgY3VycmVudFNjb3JlLFxuICAgIGN1cnJlbnRTcGVlZCxcbiAgICBnYW1lRmluaXNoZWRGbGFnLFxuICAgIG51bWJlck9mQmxvY2tzO1xuXG5mdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XG4gICAgbGV0IHZhbHVlID0gK2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNudW1iZXInKS52YWx1ZTtcblxuICAgIHJldHVybiB2YWx1ZSA+PSA5ICYmIHZhbHVlIDw9IDE1ID8gdmFsdWUgOiA5O1xufVxuXG5cbmZ1bmN0aW9uIHNldEluaXRWYWx1ZXMoKSB7XG4gICAgY3VycmVudFNwZWVkID0gMjUwMDtcbiAgICBjdXJyZW50U2NvcmUgPSBwYXJzZUludChMb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldEZyb21TdG9yYWdlKCkuZ2V0KCdjdXJyZW50U2NvcmUnKSkgfHwgMDtcbiAgICBnYW1lRmluaXNoZWRGbGFnID0gZmFsc2U7XG4gICAgbnVtYmVyT2ZCbG9ja3MgPSBjaGVja0lucHV0VmFsdWUoKTtcbiAgICBFbXB0eUJsb2NrLnNldFdpZHRoKChHQU1FX0JPQVJEX1NJWkUgLyBudW1iZXJPZkJsb2NrcykudG9GaXhlZCgxKSArICdweCcpO1xufVxuXG5leHBvcnQgY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ibG9ja3NPblBhZ2UgPSBbXTtcbiAgICAgICAgdGhpcy5lbGVtZW50c09uQm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQ7XG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlJyk7XG5cbiAgICAgICAgc2V0SW5pdFZhbHVlcygpO1xuICAgIH1cblxuICAgIGdldCBnYW1lSXNGaW5pc2hlZCgpIHtcbiAgICAgICAgcmV0dXJuIGdhbWVGaW5pc2hlZEZsYWc7XG4gICAgfVxuXG4gICAgZ2V0IG1pZGRsZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyT2ZCbG9ja3MgLyAyKTtcbiAgICB9XG5cbiAgICBnZXQgc3BlZWQoKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50U3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNwZWVkKHZhbHVlKSB7XG4gICAgICAgIGN1cnJlbnRTcGVlZCA9IHZhbHVlO1xuICAgIH1cbiAgICBkcmF3R2FtZUJvYXJkKCkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmdhbWVCb2FyZC5jbGFzc05hbWUgPSAnZ2FtZSc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5nYW1lQm9hcmQpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZCbG9ja3M7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3NPblBhZ2UucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bWJlck9mQmxvY2tzOyArK2opIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrc09uUGFnZVtpXVtqXSA9IG5ldyBFbXB0eUJsb2NrKEdBTUVfQk9BUkRfU0laRSwgbnVtYmVyT2ZCbG9ja3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUJvYXJkLmFwcGVuZENoaWxkKHRoaXMuYmxvY2tzT25QYWdlW2ldW2pdLmJveCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5pc2hHYW1lKCkge1xuICAgICAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLnVwZGF0ZVN0b3JhZ2UoKTtcbiAgICAgICAgZ2FtZUZpbmlzaGVkRmxhZyA9IHRydWU7XG4gICAgfVxuXG4gICAgbGV2ZWx1cCgpIHtcbiAgICAgICAgY3VycmVudFNjb3JlICs9IG51bWJlck9mQmxvY2tzO1xuICAgICAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLmFkZFZhbHVlVG9TdG9yYWdlKCdjdXJyZW50U2NvcmUnLCBjdXJyZW50U2NvcmUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlRWxlbWVudCgpO1xuXG4gICAgICAgIGN1cnJlbnRTcGVlZCA9IGN1cnJlbnRTcGVlZCA9PT0gTUlOX1NQRUVEID8gY3VycmVudFNwZWVkIDogY3VycmVudFNwZWVkIC0gU1BFRURfUkVEVUNUSU9OO1xuICAgIH1cblxuICAgIHVwZGF0ZVNjb3JlRWxlbWVudCgpIHtcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gY3VycmVudFNjb3JlIHx8IDA7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9HYW1lQm9hcmQuY2xhc3MuanMiLCJsZXQgd2lkdGg7XG5cbmV4cG9ydCBjbGFzcyBFbXB0eUJsb2NrIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5ib3guY2xhc3NOYW1lID0gJ2Jsb2NrLWVtcHR5JztcbiAgICAgICAgdGhpcy5ib3guc3R5bGUud2lkdGggPSB0aGlzLmJveC5zdHlsZS5oZWlnaHQgPSB3aWR0aDtcbiAgICB9XG5cbiAgICBjaGFuZ2VCbG9ja1N0eWxlKHN0eWxlQmxvY2spIHtcbiAgICAgICAgbGV0IGVsQ2xhc3MsIGNvbG9yO1xuXG4gICAgICAgIHN3aXRjaChzdHlsZUJsb2NrKSB7XG4gICAgICAgIGNhc2UgMDogZWxDbGFzcyA9ICdibG9jay1pJzsgY29sb3IgPSAnIzgxRjdGMyc7IGJyZWFrO1xuICAgICAgICBjYXNlIDE6IGVsQ2xhc3MgPSAnYmxvY2staic7IGNvbG9yID0gJyM4MTgxRjcnOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBlbENsYXNzID0gJ2Jsb2NrLWwnOyBjb2xvciA9ICcjRkU5QTJFJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogZWxDbGFzcyA9ICdibG9jay1vJzsgY29sb3IgPSAnI0YzRjc4MSc7IGJyZWFrO1xuICAgICAgICBjYXNlIDQ6IGVsQ2xhc3MgPSAnYmxvY2stcyc7IGNvbG9yID0gJyM4MUY3ODEnOyBicmVhaztcbiAgICAgICAgY2FzZSA1OiBlbENsYXNzID0gJ2Jsb2NrLXQnOyBjb2xvciA9ICcjREE4MUY1JzsgYnJlYWs7XG4gICAgICAgIGNhc2UgNjogZWxDbGFzcyA9ICdibG9jay16JzsgY29sb3IgPSAnI0Y3ODE4MSc7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiBlbENsYXNzID0gJ2Jsb2NrLWVtcHR5JzsgY29sb3IgPSAnI0Q4RDhEOCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJveC5jbGFzc05hbWUgPSBlbENsYXNzO1xuICAgICAgICB0aGlzLmJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0V2lkdGgodmFsdWUpIHtcbiAgICAgICAgd2lkdGggPSB2YWx1ZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJsZXQgbWFwO1xuXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlU2VydmljZSB7XG4gICAgc3RhdGljIGFkZFZhbHVlVG9TdG9yYWdlKG5hbWUsIHNjb3JlKSB7XG4gICAgICAgIGlmKCFtYXAuaGFzKG5hbWUpIHx8IChtYXAuaGFzKG5hbWUpICYmIG1hcC5nZXQobmFtZSkgPCBzY29yZSkpIHtcbiAgICAgICAgICAgIG1hcC5zZXQobmFtZSwgc2NvcmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEZyb21TdG9yYWdlKCkge1xuICAgICAgICBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbG9jYWxTdG9yYWdlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbWFwLnNldChsb2NhbFN0b3JhZ2Uua2V5KGkpLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlU3RvcmFnZSgpIHtcbiAgICAgICAgbWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL2xvY2FsU3RvcmFnZS5zZXJ2aWNlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==