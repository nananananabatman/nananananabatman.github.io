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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmptyBlock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameBoard = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmptyBlock = exports.EmptyBlock = function () {
    function EmptyBlock(boardSize, numberOfBlocks) {
        _classCallCheck(this, EmptyBlock);

        this.box = document.createElement('div');
        this.box.className = 'block-empty';
        this.box.style.width = this.box.style.height = (boardSize / numberOfBlocks).toFixed(1) + 'px';
    }

    _createClass(EmptyBlock, null, [{
        key: 'changeBlockStyle',
        value: function changeBlockStyle(blockOnPage, styleBlock) {
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

            blockOnPage.className = elClass;
            blockOnPage.style.backgroundColor = color;
        }
    }]);

    return EmptyBlock;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBoard = exports.GameBoard = function () {
    function GameBoard() {
        _classCallCheck(this, GameBoard);

        this.numberOfBlocks = this.checkInputValue();
        this.gameBoardSize = 550;
        this.minSpeed = 1000;
        this.speedReduction = 500;
    }

    _createClass(GameBoard, [{
        key: 'checkInputValue',
        value: function checkInputValue() {
            var value = +document.querySelector('#number').value;

            return value >= 9 && value <= 15 ? value : 9;
        }
    }]);

    return GameBoard;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Element = __webpack_require__(3);

var _EmptyBlock = __webpack_require__(0);

var _GameBoard = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

document.querySelector('#start').addEventListener('click', init);

var blocksOnPage = void 0,
    elements = void 0,
    gameBoard = void 0,
    intervalID = void 0,
    score = void 0,
    scoreElement = void 0,
    speed = void 0,
    theGameIsNotFinished = void 0,
    board = void 0;

function init() {
    function startGame() {
        function checkScore() {
            var _loop = function _loop(i) {
                if (!blocksOnPage[i].map(function (item) {
                    return item.className;
                }).includes('block-empty')) {
                    score += board.numberOfBlocks;
                    scoreElement.innerText = score;
                    speed = speed === board.minSpeed ? speed : speed - board.speedReduction;
                    localStorage.setItem('currentScore', score);
                    elements.map(function (item) {
                        return drawElement(item.block);
                    });
                    elements.forEach(function (item) {
                        return item.block = item.block.filter(function (elem) {
                            return elem.coord[0] !== i;
                        });
                    });
                    elements = elements.filter(function (elem) {
                        return elem.block.length !== 0;
                    });
                    elements.map(function (item) {
                        return drawElement(item.block, item.index);
                    });
                }
            };

            for (var i = 0; i < blocksOnPage.length; ++i) {
                _loop(i);
            }
        }

        intervalID = setInterval(function () {
            elements.forEach(function (item, index) {
                if (canMoveElement(item.block, [1, 0])) {
                    moveBlock(item, 0, 1);
                } else {
                    if (index === elements.length - 1 && theGameIsNotFinished) {
                        addNewElement();
                    }
                    checkScore();
                }
            });
        }, speed);
    }

    if (gameBoard || intervalID) {
        document.body.removeChild(gameBoard);
        clearInterval(intervalID);
    }

    board = new _GameBoard.GameBoard();
    blocksOnPage = [];
    elements = [];
    score = parseInt(localStorage.getItem('currentScore')) || 0;
    scoreElement = document.getElementById('score');
    scoreElement.innerText = score || 0;
    speed = 2500;
    theGameIsNotFinished = true;

    drawGameBoard();
    addNewElement();
    startGame();

    document.addEventListener('keydown', executeKeyDownAction);
}

function executeKeyDownAction(event) {
    if (event.keyCode === 37 && canMoveElement(elements[elements.length - 1].block, [0, -1])) {
        moveBlock(elements[elements.length - 1], 1, -1);
    } else if (event.keyCode === 39 && canMoveElement(elements[elements.length - 1].block, [0, 1])) {
        moveBlock(elements[elements.length - 1], 1, 1);
    }
}

function drawGameBoard() {
    gameBoard = document.createElement('div');
    gameBoard.className = 'game';

    for (var i = 0; i < board.numberOfBlocks; ++i) {
        blocksOnPage.push([]);
        for (var j = 0; j < board.numberOfBlocks; ++j) {
            blocksOnPage[i][j] = new _EmptyBlock.EmptyBlock(board.gameBoardSize, board.numberOfBlocks).box;
            gameBoard.appendChild(blocksOnPage[i][j]);
            _EmptyBlock.EmptyBlock.changeBlockStyle(blocksOnPage[i][j]);
        }
    }

    document.body.appendChild(gameBoard);
}

function addNewElement() {
    var newElem = new _Element.Element(),
        pointsXOfNewElem = newElem.block.map(function (item) {
        return item.coord[1];
    }),
        middle = Math.floor((board.numberOfBlocks - Math.max.apply(Math, _toConsumableArray(pointsXOfNewElem))) / 2);

    function canAddAnotherBlock(element) {
        var canAdd = true;

        element.block.forEach(function (item) {
            return canAdd = canAdd && tryAddBlock(item.coord);
        });

        return canAdd;
    }

    newElem.block = newElem.block.map(function (item) {
        return {
            box: item.box,
            coord: [item.coord[0], item.coord[1] + middle]
        };
    });

    if (canAddAnotherBlock(newElem)) {
        elements.push(newElem);
        drawElement(elements[elements.length - 1].block, elements[elements.length - 1].index);
    } else {
        document.removeEventListener('keydown', executeKeyDownAction);
        newElem.paintLastElement();
        localStorage.removeItem('currentScore');
        theGameIsNotFinished = false;
        clearInterval(intervalID);
    }
}

function tryAddBlock(block) {
    try {
        return blocksOnPage[block[0]][block[1]].className === 'block-empty';
    } catch (err) {
        return false;
    }
}

function drawElement(block, index) {
    block.map(function (item) {
        _EmptyBlock.EmptyBlock.changeBlockStyle(blocksOnPage[item.coord[0]][item.coord[1]], index);
    });
}

function moveBlock(element, position, shift) {
    drawElement(element.block);
    element.block.map(function (item) {
        return item.coord[position] += shift;
    });
    drawElement(element.block, element.index);
}

function canMoveElement(block, shift) {
    var perhabsNewPosition = block.map(function (item) {
        return [item.coord[0] + shift[0], item.coord[1] + shift[1]];
    }),
        canMove = true;

    perhabsNewPosition.forEach(function (item) {
        if (!block.map(function (item) {
            return item.coord.toString();
        }).includes(item.toString())) {
            canMove = canMove && tryAddBlock(item);
        }
    });

    return canMove;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Element = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EmptyBlock = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BLOCKS = [[{ coord: [0, 0], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 1], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 2], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 3], box: new _EmptyBlock.EmptyBlock() }], [{ coord: [0, 0], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 1], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 2], box: new _EmptyBlock.EmptyBlock() }, { coord: [1, 2], box: new _EmptyBlock.EmptyBlock() }], [{ coord: [0, 0], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 1], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 2], box: new _EmptyBlock.EmptyBlock() }, { coord: [1, 0], box: new _EmptyBlock.EmptyBlock() }], [{ coord: [0, 0], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 1], box: new _EmptyBlock.EmptyBlock() }, { coord: [1, 0], box: new _EmptyBlock.EmptyBlock() }, { coord: [1, 1], box: new _EmptyBlock.EmptyBlock() }], [{ coord: [0, 1], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 2], box: new _EmptyBlock.EmptyBlock() }, { coord: [1, 0], box: new _EmptyBlock.EmptyBlock() }, { coord: [1, 1], box: new _EmptyBlock.EmptyBlock() }], [{ coord: [0, 0], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 1], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 2], box: new _EmptyBlock.EmptyBlock() }, { coord: [1, 1], box: new _EmptyBlock.EmptyBlock() }], [{ coord: [0, 0], box: new _EmptyBlock.EmptyBlock() }, { coord: [0, 1], box: new _EmptyBlock.EmptyBlock() }, { coord: [1, 1], box: new _EmptyBlock.EmptyBlock() }, { coord: [1, 2], box: new _EmptyBlock.EmptyBlock() }]];

var Element = exports.Element = function () {
    function Element() {
        _classCallCheck(this, Element);

        this.index = Math.floor(Math.random() * 7), this.block = BLOCKS[this.index];
    }

    _createClass(Element, [{
        key: 'paintLastElement',
        value: function paintLastElement() {
            var _this = this;

            this.block.map(function (item) {
                return _EmptyBlock.EmptyBlock.changeBlockStyle(item.box.box, _this.index);
            });
        }

        // function addNewElement() {
        //     let newElem = getRandomElement(),
        //         pointsXOfNewElem = newElem.block.map(item => item[1]),
        //         middle = Math.floor((board.numberOfBlocks - Math.max(...pointsXOfNewElem)) / 2);
        //
        //     function canAddAnotherBlock(element) {
        //         let canAdd = true;
        //
        //         element.block.forEach(item => canAdd = canAdd && tryAddBlock(item));
        //
        //         return canAdd;
        //     }
        //
        //
        //
        //     newElem.block = newElem.block.map(item => [item[0], item[1] + middle]);
        // }

    }]);

    return Element;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOThiNDUzMmRiMjJiNTk3OTIwZTgiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9FbXB0eUJsb2NrLmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvR2FtZUJvYXJkLmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9FbGVtZW50LmNsYXNzLmpzIl0sIm5hbWVzIjpbIkVtcHR5QmxvY2siLCJib2FyZFNpemUiLCJudW1iZXJPZkJsb2NrcyIsImJveCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJ0b0ZpeGVkIiwiYmxvY2tPblBhZ2UiLCJzdHlsZUJsb2NrIiwiZWxDbGFzcyIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiR2FtZUJvYXJkIiwiY2hlY2tJbnB1dFZhbHVlIiwiZ2FtZUJvYXJkU2l6ZSIsIm1pblNwZWVkIiwic3BlZWRSZWR1Y3Rpb24iLCJ2YWx1ZSIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdCIsImJsb2Nrc09uUGFnZSIsImVsZW1lbnRzIiwiZ2FtZUJvYXJkIiwiaW50ZXJ2YWxJRCIsInNjb3JlIiwic2NvcmVFbGVtZW50Iiwic3BlZWQiLCJ0aGVHYW1lSXNOb3RGaW5pc2hlZCIsImJvYXJkIiwic3RhcnRHYW1lIiwiY2hlY2tTY29yZSIsImkiLCJtYXAiLCJpdGVtIiwiaW5jbHVkZXMiLCJpbm5lclRleHQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZHJhd0VsZW1lbnQiLCJibG9jayIsImZvckVhY2giLCJmaWx0ZXIiLCJlbGVtIiwiY29vcmQiLCJsZW5ndGgiLCJpbmRleCIsInNldEludGVydmFsIiwiY2FuTW92ZUVsZW1lbnQiLCJtb3ZlQmxvY2siLCJhZGROZXdFbGVtZW50IiwiYm9keSIsInJlbW92ZUNoaWxkIiwiY2xlYXJJbnRlcnZhbCIsInBhcnNlSW50IiwiZ2V0SXRlbSIsImdldEVsZW1lbnRCeUlkIiwiZHJhd0dhbWVCb2FyZCIsImV4ZWN1dGVLZXlEb3duQWN0aW9uIiwiZXZlbnQiLCJrZXlDb2RlIiwicHVzaCIsImoiLCJhcHBlbmRDaGlsZCIsImNoYW5nZUJsb2NrU3R5bGUiLCJuZXdFbGVtIiwicG9pbnRzWE9mTmV3RWxlbSIsIm1pZGRsZSIsIk1hdGgiLCJmbG9vciIsIm1heCIsImNhbkFkZEFub3RoZXJCbG9jayIsImVsZW1lbnQiLCJjYW5BZGQiLCJ0cnlBZGRCbG9jayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwYWludExhc3RFbGVtZW50IiwicmVtb3ZlSXRlbSIsImVyciIsInBvc2l0aW9uIiwic2hpZnQiLCJwZXJoYWJzTmV3UG9zaXRpb24iLCJjYW5Nb3ZlIiwidG9TdHJpbmciLCJCTE9DS1MiLCJFbGVtZW50IiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7O0lBRWFBLFUsV0FBQUEsVTtBQUNULHdCQUFZQyxTQUFaLEVBQXVCQyxjQUF2QixFQUF1QztBQUFBOztBQUNuQyxhQUFLQyxHQUFMLEdBQVdDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWDtBQUNBLGFBQUtGLEdBQUws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QyxDQUFELEVBQUksQ0FBSixDQUFSLEVBQWdCN0MsS0FBSyw0QkFBckIsRUFKRCxDQTlCWSxDQUFmOztJQXFDYXNGLE8sV0FBQUEsTztBQUNULHVCQUFjO0FBQUE7O0FBQ1YsYUFBS3ZDLEtBQUwsR0FBYXNCLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS2tCLE1BQUwsS0FBZ0IsQ0FBM0IsQ0FBYixFQUNBLEtBQUs5QyxLQUFMLEdBQWE0QyxPQUFPLEtBQUt0QyxLQUFaLENBRGI7QUFFSDs7OzsyQ0FFa0I7QUFBQTs7QUFDZixpQkFBS04sS0FBTCxDQUFXUCxHQUFYLENBQWU7QUFBQSx1QkFBUSx1QkFBVytCLGdCQUFYLENBQTRCOUIsS0FBS25DLEdBQUwsQ0FBU0EsR0FBckMsRUFBMEMsTUFBSytDLEtBQS9DLENBQVI7QUFBQSxhQUFmO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL2Rpc3QvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOThiNDUzMmRiMjJiNTk3OTIwZTgiLCJpbXBvcnQge0dhbWVCb2FyZH0gZnJvbSAnLi9HYW1lQm9hcmQuY2xhc3MnO1xuXG5leHBvcnQgY2xhc3MgRW1wdHlCbG9jayB7XG4gICAgY29uc3RydWN0b3IoYm9hcmRTaXplLCBudW1iZXJPZkJsb2Nrcykge1xuICAgICAgICB0aGlzLmJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJveC5jbGFzc05hbWUgPSAnYmxvY2stZW1wdHknO1xuICAgICAgICB0aGlzLmJveC5zdHlsZS53aWR0aCA9IHRoaXMuYm94LnN0eWxlLmhlaWdodCA9IChib2FyZFNpemUgLyBudW1iZXJPZkJsb2NrcykudG9GaXhlZCgxKSArICdweCc7XG4gICAgfVxuXG4gICAgc3RhdGljIGNoYW5nZUJsb2NrU3R5bGUoYmxvY2tPblBhZ2UsIHN0eWxlQmxvY2spIHtcbiAgICAgICAgbGV0IGVsQ2xhc3MsIGNvbG9yO1xuXG4gICAgICAgIHN3aXRjaChzdHlsZUJsb2NrKSB7XG4gICAgICAgIGNhc2UgMDogZWxDbGFzcyA9ICdibG9jay1pJzsgY29sb3IgPSAnIzgxRjdGMyc7IGJyZWFrO1xuICAgICAgICBjYXNlIDE6IGVsQ2xhc3MgPSAnYmxvY2staic7IGNvbG9yID0gJyM4MTgxRjcnOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBlbENsYXNzID0gJ2Jsb2NrLWwnOyBjb2xvciA9ICcjRkU5QTJFJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogZWxDbGFzcyA9ICdibG9jay1vJzsgY29sb3IgPSAnI0YzRjc4MSc7IGJyZWFrO1xuICAgICAgICBjYXNlIDQ6IGVsQ2xhc3MgPSAnYmxvY2stcyc7IGNvbG9yID0gJyM4MUY3ODEnOyBicmVhaztcbiAgICAgICAgY2FzZSA1OiBlbENsYXNzID0gJ2Jsb2NrLXQnOyBjb2xvciA9ICcjREE4MUY1JzsgYnJlYWs7XG4gICAgICAgIGNhc2UgNjogZWxDbGFzcyA9ICdibG9jay16JzsgY29sb3IgPSAnI0Y3ODE4MSc7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiBlbENsYXNzID0gJ2Jsb2NrLWVtcHR5JzsgY29sb3IgPSAnI0Q4RDhEOCc7XG4gICAgICAgIH1cblxuICAgICAgICBibG9ja09uUGFnZS5jbGFzc05hbWUgPSBlbENsYXNzO1xuICAgICAgICBibG9ja09uUGFnZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJleHBvcnQgY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5udW1iZXJPZkJsb2NrcyA9IHRoaXMuY2hlY2tJbnB1dFZhbHVlKCk7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkU2l6ZSA9IDU1MDtcbiAgICAgICAgdGhpcy5taW5TcGVlZCA9IDEwMDA7XG4gICAgICAgIHRoaXMuc3BlZWRSZWR1Y3Rpb24gPSA1MDA7XG4gICAgfVxuXG4gICAgY2hlY2tJbnB1dFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSArZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI251bWJlcicpLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZSA+PSA5ICYmIHZhbHVlIDw9IDE1ID8gdmFsdWUgOiA5O1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvR2FtZUJvYXJkLmNsYXNzLmpzIiwiaW1wb3J0IHtFbGVtZW50fSBmcm9tICcuL0VsZW1lbnQuY2xhc3MnO1xuaW1wb3J0IHtFbXB0eUJsb2NrfSBmcm9tICcuL0VtcHR5QmxvY2suY2xhc3MnO1xuaW1wb3J0IHtHYW1lQm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkLmNsYXNzJztcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbml0KTtcblxubGV0IGJsb2Nrc09uUGFnZSxcbiAgICBlbGVtZW50cyxcbiAgICBnYW1lQm9hcmQsXG4gICAgaW50ZXJ2YWxJRCxcbiAgICBzY29yZSxcbiAgICBzY29yZUVsZW1lbnQsXG4gICAgc3BlZWQsXG4gICAgdGhlR2FtZUlzTm90RmluaXNoZWQsXG4gICAgYm9hcmQ7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICAgICAgICBmdW5jdGlvbiBjaGVja1Njb3JlKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja3NPblBhZ2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZighYmxvY2tzT25QYWdlW2ldLm1hcChpdGVtID0+IGl0ZW0uY2xhc3NOYW1lKS5pbmNsdWRlcygnYmxvY2stZW1wdHknKSkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBib2FyZC5udW1iZXJPZkJsb2NrcztcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBzcGVlZCA9IHNwZWVkID09PSBib2FyZC5taW5TcGVlZCA/IHNwZWVkIDogc3BlZWQgLSBib2FyZC5zcGVlZFJlZHVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRTY29yZScsIHNjb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMubWFwKGl0ZW0gPT4gZHJhd0VsZW1lbnQoaXRlbS5ibG9jaykpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5ibG9jayA9IGl0ZW0uYmxvY2suZmlsdGVyKGVsZW0gPT4gZWxlbS5jb29yZFswXSAhPT0gaSkpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGVsZW1lbnRzLmZpbHRlcihlbGVtID0+IGVsZW0uYmxvY2subGVuZ3RoICE9PSAwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMubWFwKGl0ZW0gPT4gZHJhd0VsZW1lbnQoaXRlbS5ibG9jaywgaXRlbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGludGVydmFsSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYW5Nb3ZlRWxlbWVudChpdGVtLmJsb2NrLCBbMSwgMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVCbG9jayhpdGVtLCAwLCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IGVsZW1lbnRzLmxlbmd0aCAtIDEgJiYgdGhlR2FtZUlzTm90RmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5ld0VsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGVja1Njb3JlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSwgc3BlZWQpO1xuICAgIH1cblxuICAgIGlmIChnYW1lQm9hcmQgfHwgaW50ZXJ2YWxJRCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGdhbWVCb2FyZCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgfVxuXG4gICAgYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG4gICAgYmxvY2tzT25QYWdlID0gW107XG4gICAgZWxlbWVudHMgPSBbXTtcbiAgICBzY29yZSA9IHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50U2NvcmUnKSkgfHwgMDtcbiAgICBzY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKTtcbiAgICBzY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gc2NvcmUgfHwgMDtcbiAgICBzcGVlZCA9IDI1MDA7XG4gICAgdGhlR2FtZUlzTm90RmluaXNoZWQgPSB0cnVlO1xuXG4gICAgZHJhd0dhbWVCb2FyZCgpO1xuICAgIGFkZE5ld0VsZW1lbnQoKTtcbiAgICBzdGFydEdhbWUoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBleGVjdXRlS2V5RG93bkFjdGlvbik7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVLZXlEb3duQWN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3ICYmIGNhbk1vdmVFbGVtZW50KGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmJsb2NrLCBbMCwgLTFdKSkge1xuICAgICAgICBtb3ZlQmxvY2soZWxlbWVudHNbZWxlbWVudHMubGVuZ3RoIC0gMV0sIDEsIC0xKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5ICYmIGNhbk1vdmVFbGVtZW50KGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmJsb2NrLCBbMCwgMV0pKSB7XG4gICAgICAgIG1vdmVCbG9jayhlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXSwgMSwgMSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmF3R2FtZUJvYXJkKCkge1xuICAgIGdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdhbWVCb2FyZC5jbGFzc05hbWUgPSAnZ2FtZSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLm51bWJlck9mQmxvY2tzOyArK2kpIHtcbiAgICAgICAgYmxvY2tzT25QYWdlLnB1c2goW10pO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLm51bWJlck9mQmxvY2tzOyArK2opIHtcbiAgICAgICAgICAgIGJsb2Nrc09uUGFnZVtpXVtqXSA9IChuZXcgRW1wdHlCbG9jayhib2FyZC5nYW1lQm9hcmRTaXplLCBib2FyZC5udW1iZXJPZkJsb2NrcykpLmJveDtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5hcHBlbmRDaGlsZChibG9ja3NPblBhZ2VbaV1bal0pO1xuICAgICAgICAgICAgRW1wdHlCbG9jay5jaGFuZ2VCbG9ja1N0eWxlKGJsb2Nrc09uUGFnZVtpXVtqXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGdhbWVCb2FyZCk7XG59XG5cbmZ1bmN0aW9uIGFkZE5ld0VsZW1lbnQoKSB7XG4gICAgbGV0IG5ld0VsZW0gPSBuZXcgRWxlbWVudCgpLFxuICAgICAgICBwb2ludHNYT2ZOZXdFbGVtID0gbmV3RWxlbS5ibG9jay5tYXAoaXRlbSA9PiBpdGVtLmNvb3JkWzFdKSxcbiAgICAgICAgbWlkZGxlID0gTWF0aC5mbG9vcigoYm9hcmQubnVtYmVyT2ZCbG9ja3MgLSBNYXRoLm1heCguLi5wb2ludHNYT2ZOZXdFbGVtKSkgLyAyKTtcblxuICAgIGZ1bmN0aW9uIGNhbkFkZEFub3RoZXJCbG9jayhlbGVtZW50KSB7XG4gICAgICAgIGxldCBjYW5BZGQgPSB0cnVlO1xuXG4gICAgICAgIGVsZW1lbnQuYmxvY2suZm9yRWFjaChpdGVtID0+IGNhbkFkZCA9IGNhbkFkZCAmJiB0cnlBZGRCbG9jayhpdGVtLmNvb3JkKSk7XG5cbiAgICAgICAgcmV0dXJuIGNhbkFkZDtcbiAgICB9XG5cbiAgICBuZXdFbGVtLmJsb2NrID0gbmV3RWxlbS5ibG9jay5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBib3g6IGl0ZW0uYm94LFxuICAgICAgICAgICAgY29vcmQ6IFtpdGVtLmNvb3JkWzBdLCBpdGVtLmNvb3JkWzFdICsgbWlkZGxlXVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgaWYgKGNhbkFkZEFub3RoZXJCbG9jayhuZXdFbGVtKSkge1xuICAgICAgICBlbGVtZW50cy5wdXNoKG5ld0VsZW0pO1xuICAgICAgICBkcmF3RWxlbWVudChlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXS5ibG9jaywgZWxlbWVudHNbZWxlbWVudHMubGVuZ3RoIC0gMV0uaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBleGVjdXRlS2V5RG93bkFjdGlvbik7XG4gICAgICAgIG5ld0VsZW0ucGFpbnRMYXN0RWxlbWVudCgpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFNjb3JlJyk7XG4gICAgICAgIHRoZUdhbWVJc05vdEZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0cnlBZGRCbG9jayhibG9jaykge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBibG9ja3NPblBhZ2VbYmxvY2tbMF1dW2Jsb2NrWzFdXS5jbGFzc05hbWUgPT09ICdibG9jay1lbXB0eSc7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhd0VsZW1lbnQoYmxvY2ssIGluZGV4KSB7XG4gICAgYmxvY2subWFwKGl0ZW0gPT4ge1xuICAgICAgICBFbXB0eUJsb2NrLmNoYW5nZUJsb2NrU3R5bGUoYmxvY2tzT25QYWdlW2l0ZW0uY29vcmRbMF1dW2l0ZW0uY29vcmRbMV1dLCBpbmRleCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vdmVCbG9jayhlbGVtZW50LCBwb3NpdGlvbiwgc2hpZnQpIHtcbiAgICBkcmF3RWxlbWVudChlbGVtZW50LmJsb2NrKTtcbiAgICBlbGVtZW50LmJsb2NrLm1hcChpdGVtID0+IGl0ZW0uY29vcmRbcG9zaXRpb25dICs9IHNoaWZ0KTtcbiAgICBkcmF3RWxlbWVudChlbGVtZW50LmJsb2NrLCBlbGVtZW50LmluZGV4KTtcbn1cblxuZnVuY3Rpb24gY2FuTW92ZUVsZW1lbnQoYmxvY2ssIHNoaWZ0KSB7XG4gICAgbGV0IHBlcmhhYnNOZXdQb3NpdGlvbiA9IGJsb2NrLm1hcChpdGVtID0+IFtpdGVtLmNvb3JkWzBdICsgc2hpZnRbMF0sIGl0ZW0uY29vcmRbMV0gKyBzaGlmdFsxXV0pLFxuICAgICAgICBjYW5Nb3ZlID0gdHJ1ZTtcblxuICAgIHBlcmhhYnNOZXdQb3NpdGlvbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoIWJsb2NrLm1hcChpdGVtID0+IGl0ZW0uY29vcmQudG9TdHJpbmcoKSkuaW5jbHVkZXMoaXRlbS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgY2FuTW92ZSA9IGNhbk1vdmUgJiYgdHJ5QWRkQmxvY2soaXRlbSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjYW5Nb3ZlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2NyaXB0cy9pbmRleC5qcyIsImltcG9ydCB7RW1wdHlCbG9ja30gZnJvbSAnLi9FbXB0eUJsb2NrLmNsYXNzJztcblxuY29uc3QgQkxPQ0tTID0gW1tcbiAgICB7Y29vcmQ6IFswLCAwXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfSxcbiAgICB7Y29vcmQ6IFswLCAxXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfSxcbiAgICB7Y29vcmQ6IFswLCAyXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfSxcbiAgICB7Y29vcmQ6IFswLCAzXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfVxuXSwgW1xuICAgIHtjb29yZDogWzAsIDBdLCBib3g6IG5ldyBFbXB0eUJsb2NrKCl9LFxuICAgIHtjb29yZDogWzAsIDFdLCBib3g6IG5ldyBFbXB0eUJsb2NrKCl9LFxuICAgIHtjb29yZDogWzAsIDJdLCBib3g6IG5ldyBFbXB0eUJsb2NrKCl9LFxuICAgIHtjb29yZDogWzEsIDJdLCBib3g6IG5ldyBFbXB0eUJsb2NrKCl9XG5dLCBbXG4gICAge2Nvb3JkOiBbMCwgMF0sIGJveDogbmV3IEVtcHR5QmxvY2soKX0sXG4gICAge2Nvb3JkOiBbMCwgMV0sIGJveDogbmV3IEVtcHR5QmxvY2soKX0sXG4gICAge2Nvb3JkOiBbMCwgMl0sIGJveDogbmV3IEVtcHR5QmxvY2soKX0sXG4gICAge2Nvb3JkOiBbMSwgMF0sIGJveDogbmV3IEVtcHR5QmxvY2soKX1cbl0sIFtcbiAgICB7Y29vcmQ6IFswLCAwXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfSxcbiAgICB7Y29vcmQ6IFswLCAxXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfSxcbiAgICB7Y29vcmQ6IFsxLCAwXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfSxcbiAgICB7Y29vcmQ6IFsxLCAxXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfVxuXSwgW1xuICAgIHtjb29yZDogWzAsIDFdLCBib3g6IG5ldyBFbXB0eUJsb2NrKCl9LFxuICAgIHtjb29yZDogWzAsIDJdLCBib3g6IG5ldyBFbXB0eUJsb2NrKCl9LFxuICAgIHtjb29yZDogWzEsIDBdLCBib3g6IG5ldyBFbXB0eUJsb2NrKCl9LFxuICAgIHtjb29yZDogWzEsIDFdLCBib3g6IG5ldyBFbXB0eUJsb2NrKCl9XG5dLCBbXG4gICAge2Nvb3JkOiBbMCwgMF0sIGJveDogbmV3IEVtcHR5QmxvY2soKX0sXG4gICAge2Nvb3JkOiBbMCwgMV0sIGJveDogbmV3IEVtcHR5QmxvY2soKX0sXG4gICAge2Nvb3JkOiBbMCwgMl0sIGJveDogbmV3IEVtcHR5QmxvY2soKX0sXG4gICAge2Nvb3JkOiBbMSwgMV0sIGJveDogbmV3IEVtcHR5QmxvY2soKX1cbl0sIFtcbiAgICB7Y29vcmQ6IFswLCAwXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfSxcbiAgICB7Y29vcmQ6IFswLCAxXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfSxcbiAgICB7Y29vcmQ6IFsxLCAxXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfSxcbiAgICB7Y29vcmQ6IFsxLCAyXSwgYm94OiBuZXcgRW1wdHlCbG9jaygpfVxuXV07XG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpLFxuICAgICAgICB0aGlzLmJsb2NrID0gQkxPQ0tTW3RoaXMuaW5kZXhdO1xuICAgIH1cblxuICAgIHBhaW50TGFzdEVsZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYmxvY2subWFwKGl0ZW0gPT4gRW1wdHlCbG9jay5jaGFuZ2VCbG9ja1N0eWxlKGl0ZW0uYm94LmJveCwgdGhpcy5pbmRleCkpO1xuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uIGFkZE5ld0VsZW1lbnQoKSB7XG4gICAgLy8gICAgIGxldCBuZXdFbGVtID0gZ2V0UmFuZG9tRWxlbWVudCgpLFxuICAgIC8vICAgICAgICAgcG9pbnRzWE9mTmV3RWxlbSA9IG5ld0VsZW0uYmxvY2subWFwKGl0ZW0gPT4gaXRlbVsxXSksXG4gICAgLy8gICAgICAgICBtaWRkbGUgPSBNYXRoLmZsb29yKChib2FyZC5udW1iZXJPZkJsb2NrcyAtIE1hdGgubWF4KC4uLnBvaW50c1hPZk5ld0VsZW0pKSAvIDIpO1xuICAgIC8vXG4gICAgLy8gICAgIGZ1bmN0aW9uIGNhbkFkZEFub3RoZXJCbG9jayhlbGVtZW50KSB7XG4gICAgLy8gICAgICAgICBsZXQgY2FuQWRkID0gdHJ1ZTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgZWxlbWVudC5ibG9jay5mb3JFYWNoKGl0ZW0gPT4gY2FuQWRkID0gY2FuQWRkICYmIHRyeUFkZEJsb2NrKGl0ZW0pKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgcmV0dXJuIGNhbkFkZDtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy9cbiAgICAvL1xuICAgIC8vICAgICBuZXdFbGVtLmJsb2NrID0gbmV3RWxlbS5ibG9jay5tYXAoaXRlbSA9PiBbaXRlbVswXSwgaXRlbVsxXSArIG1pZGRsZV0pO1xuICAgIC8vIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvRWxlbWVudC5jbGFzcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=