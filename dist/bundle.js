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

var _localStorage = __webpack_require__(4);

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
                    return item.box.className;
                }).includes('block-empty')) {
                    score += board.numberOfBlocks;
                    scoreElement.innerText = score;
                    speed = speed === board.minSpeed ? speed : speed - board.speedReduction;
                    _localStorage.LocalStorageService.addValueToStorage('currentScore', score);
                    elements.map(function (item) {
                        return drawElement(item.block);
                    });
                    elements.forEach(function (item) {
                        return item.block = item.block.filter(function (elem) {
                            return elem[0] !== i;
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
    score = parseInt(_localStorage.LocalStorageService.getFromStorage().get('currentScore')) || 0;
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
    document.body.appendChild(gameBoard);

    for (var i = 0; i < board.numberOfBlocks; ++i) {
        blocksOnPage.push([]);
        for (var j = 0; j < board.numberOfBlocks; ++j) {
            blocksOnPage[i][j] = new _EmptyBlock.EmptyBlock(board.gameBoardSize, board.numberOfBlocks);
            gameBoard.appendChild(blocksOnPage[i][j].box);
            blocksOnPage[i][j].changeBlockStyle();
        }
    }
}

function addNewElement() {
    var newElem = new _Element.Element(),
        pointsXOfNewElem = newElem.block.map(function (item) {
        return item[1];
    }),
        middle = Math.floor((board.numberOfBlocks - Math.max.apply(Math, _toConsumableArray(pointsXOfNewElem))) / 2);

    function canAddAnotherBlock(element) {
        var canAdd = true;

        element.block.forEach(function (item) {
            return canAdd = canAdd && tryAddBlock(item);
        });

        return canAdd;
    }

    function paintLastElement() {
        newElem.block.map(function (item) {
            return blocksOnPage[item[0]][item[1]].changeBlockStyle(newElem.index);
        });
    }

    newElem.block = newElem.block.map(function (item) {
        return [item[0], item[1] + middle];
    });

    if (canAddAnotherBlock(newElem)) {
        elements.push(newElem);
        drawElement(elements[elements.length - 1].block, elements[elements.length - 1].index);
    } else {
        document.removeEventListener('keydown', executeKeyDownAction);
        paintLastElement();
        _localStorage.LocalStorageService.updateStorage();
        theGameIsNotFinished = false;
        clearInterval(intervalID);
    }
}

function tryAddBlock(block) {
    try {
        return blocksOnPage[block[0]][block[1]].box.className === 'block-empty';
    } catch (err) {
        return false;
    }
}

function drawElement(block, index) {
    block.map(function (item) {
        blocksOnPage[item[0]][item[1]].changeBlockStyle(index);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Element = undefined;

var _EmptyBlock = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BLOCKS = [[[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [0, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [0, 2], [1, 0]], [[0, 0], [0, 1], [1, 0], [1, 1]], [[0, 1], [0, 2], [1, 0], [1, 1]], [[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 0], [0, 1], [1, 1], [1, 2]]];

var Element = exports.Element = function Element() {
    _classCallCheck(this, Element);

    this.index = Math.floor(Math.random() * 7), this.block = BLOCKS[this.index];
};

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
            map.set(name, score);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmZkZmVkNTBjYTAzZDE2NDBhM2EiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9FbXB0eUJsb2NrLmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvR2FtZUJvYXJkLmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9FbGVtZW50LmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvbG9jYWxTdG9yYWdlLnNlcnZpY2UuanMiXSwibmFtZXMiOlsiRW1wdHlCbG9jayIsImJvYXJkU2l6ZSIsIm51bWJlck9mQmxvY2tzIiwiYm94IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsInRvRml4ZWQiLCJzdHlsZUJsb2NrIiwiZWxDbGFzcyIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiR2FtZUJvYXJkIiwiY2hlY2tJbnB1dFZhbHVlIiwiZ2FtZUJvYXJkU2l6ZSIsIm1pblNwZWVkIiwic3BlZWRSZWR1Y3Rpb24iLCJ2YWx1ZSIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdCIsImJsb2Nrc09uUGFnZSIsImVsZW1lbnRzIiwiZ2FtZUJvYXJkIiwiaW50ZXJ2YWxJRCIsInNjb3JlIiwic2NvcmVFbGVtZW50Iiwic3BlZWQiLCJ0aGVHYW1lSXNOb3RGaW5pc2hlZCIsImJvYXJkIiwic3RhcnRHYW1lIiwiY2hlY2tTY29yZSIsImkiLCJtYXAiLCJpdGVtIiwiaW5jbHVkZXMiLCJpbm5lclRleHQiLCJhZGRWYWx1ZVRvU3RvcmFnZSIsImRyYXdFbGVtZW50IiwiYmxvY2siLCJmb3JFYWNoIiwiZmlsdGVyIiwiZWxlbSIsImxlbmd0aCIsImluZGV4Iiwic2V0SW50ZXJ2YWwiLCJjYW5Nb3ZlRWxlbWVudCIsIm1vdmVCbG9jayIsImFkZE5ld0VsZW1lbnQiLCJib2R5IiwicmVtb3ZlQ2hpbGQiLCJjbGVhckludGVydmFsIiwicGFyc2VJbnQiLCJnZXRGcm9tU3RvcmFnZSIsImdldCIsImdldEVsZW1lbnRCeUlkIiwiZHJhd0dhbWVCb2FyZCIsImV4ZWN1dGVLZXlEb3duQWN0aW9uIiwiZXZlbnQiLCJrZXlDb2RlIiwiYXBwZW5kQ2hpbGQiLCJwdXNoIiwiaiIsImNoYW5nZUJsb2NrU3R5bGUiLCJuZXdFbGVtIiwicG9pbnRzWE9mTmV3RWxlbSIsIm1pZGRsZSIsIk1hdGgiLCJmbG9vciIsIm1heCIsImNhbkFkZEFub3RoZXJCbG9jayIsImVsZW1lbnQiLCJjYW5BZGQiLCJ0cnlBZGRCbG9jayIsInBhaW50TGFzdEVsZW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidXBkYXRlU3RvcmFnZSIsImVyciIsInBvc2l0aW9uIiwic2hpZnQiLCJwZXJoYWJzTmV3UG9zaXRpb24iLCJjYW5Nb3ZlIiwidG9TdHJpbmciLCJCTE9DS1MiLCJFbGVtZW50IiwicmFuZG9tIiwiTG9jYWxTdG9yYWdlU2VydmljZSIsIm5hbWUiLCJzZXQiLCJNYXAiLCJsb2NhbFN0b3JhZ2UiLCJrZXkiLCJnZXRJdGVtIiwiY2xlYXIiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7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aUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFqQixFQUF5QixDQUFDLENBQUQsRUFBSSxDQUFKLENBQXpCLENBUFcsQ0FBZjs7SUFVYUMsTyxXQUFBQSxPLEdBQ1QsbUJBQWM7QUFBQTs7QUFDVixTQUFLeEMsS0FBTCxHQUFhdUIsS0FBS0MsS0FBTCxDQUFXRCxLQUFLa0IsTUFBTCxLQUFnQixDQUEzQixDQUFiLEVBQ0EsS0FBSzlDLEtBQUwsR0FBYTRDLE9BQU8sS0FBS3ZDLEtBQVosQ0FEYjtBQUVILEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJMLElBQUlYLFlBQUo7O0lBRWFxRCxtQixXQUFBQSxtQjs7Ozs7OzswQ0FDZ0JDLEksRUFBTTlELEssRUFBTztBQUNsQ1EsZ0JBQUl1RCxHQUFKLENBQVFELElBQVIsRUFBYzlELEtBQWQ7QUFDSDs7O3lDQUV1QjtBQUNwQlEsa0JBQU0sSUFBSXdELEdBQUosRUFBTjtBQUNBLGdCQUFJQyxhQUFhL0MsTUFBYixLQUF3QixDQUE1QixFQUErQjtBQUMzQixxQkFBSSxJQUFJWCxJQUFJLENBQVosRUFBZUEsSUFBSTBELGFBQWEvQyxNQUFoQyxFQUF3QyxFQUFFWCxDQUExQyxFQUE2QztBQUN6Q0Msd0JBQUl1RCxHQUFKLENBQVFFLGFBQWFDLEdBQWIsQ0FBaUIzRCxDQUFqQixDQUFSLEVBQTZCMEQsYUFBYUUsT0FBYixDQUFxQkYsYUFBYUMsR0FBYixDQUFpQjNELENBQWpCLENBQXJCLENBQTdCO0FBQ0g7O0FBRUQwRCw2QkFBYUcsS0FBYjtBQUNIOztBQUVELG1CQUFPNUQsR0FBUDtBQUNIOzs7d0NBRXNCO0FBQ25CQSxnQkFBSU8sT0FBSixDQUFZLFVBQVN2QixLQUFULEVBQWdCMEUsR0FBaEIsRUFBcUI7QUFDN0JELDZCQUFhSSxPQUFiLENBQXFCSCxHQUFyQixFQUEwQjFFLEtBQTFCO0FBQ0gsYUFGRDtBQUdIIiwiZmlsZSI6Ii4vZGlzdC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiZmRmZWQ1MGNhMDNkMTY0MGEzYSIsImltcG9ydCB7R2FtZUJvYXJkfSBmcm9tICcuL0dhbWVCb2FyZC5jbGFzcyc7XG5cbmV4cG9ydCBjbGFzcyBFbXB0eUJsb2NrIHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZFNpemUsIG51bWJlck9mQmxvY2tzKSB7XG4gICAgICAgIHRoaXMuYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuYm94LmNsYXNzTmFtZSA9ICdibG9jay1lbXB0eSc7XG4gICAgICAgIHRoaXMuYm94LnN0eWxlLndpZHRoID0gdGhpcy5ib3guc3R5bGUuaGVpZ2h0ID0gKGJvYXJkU2l6ZSAvIG51bWJlck9mQmxvY2tzKS50b0ZpeGVkKDEpICsgJ3B4JztcbiAgICB9XG5cbiAgICBjaGFuZ2VCbG9ja1N0eWxlKHN0eWxlQmxvY2spIHtcbiAgICAgICAgbGV0IGVsQ2xhc3MsIGNvbG9yO1xuXG4gICAgICAgIHN3aXRjaChzdHlsZUJsb2NrKSB7XG4gICAgICAgIGNhc2UgMDogZWxDbGFzcyA9ICdibG9jay1pJzsgY29sb3IgPSAnIzgxRjdGMyc7IGJyZWFrO1xuICAgICAgICBjYXNlIDE6IGVsQ2xhc3MgPSAnYmxvY2staic7IGNvbG9yID0gJyM4MTgxRjcnOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBlbENsYXNzID0gJ2Jsb2NrLWwnOyBjb2xvciA9ICcjRkU5QTJFJzsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogZWxDbGFzcyA9ICdibG9jay1vJzsgY29sb3IgPSAnI0YzRjc4MSc7IGJyZWFrO1xuICAgICAgICBjYXNlIDQ6IGVsQ2xhc3MgPSAnYmxvY2stcyc7IGNvbG9yID0gJyM4MUY3ODEnOyBicmVhaztcbiAgICAgICAgY2FzZSA1OiBlbENsYXNzID0gJ2Jsb2NrLXQnOyBjb2xvciA9ICcjREE4MUY1JzsgYnJlYWs7XG4gICAgICAgIGNhc2UgNjogZWxDbGFzcyA9ICdibG9jay16JzsgY29sb3IgPSAnI0Y3ODE4MSc7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiBlbENsYXNzID0gJ2Jsb2NrLWVtcHR5JzsgY29sb3IgPSAnI0Q4RDhEOCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJveC5jbGFzc05hbWUgPSBlbENsYXNzO1xuICAgICAgICB0aGlzLmJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL0VtcHR5QmxvY2suY2xhc3MuanMiLCJleHBvcnQgY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5udW1iZXJPZkJsb2NrcyA9IHRoaXMuY2hlY2tJbnB1dFZhbHVlKCk7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkU2l6ZSA9IDU1MDtcbiAgICAgICAgdGhpcy5taW5TcGVlZCA9IDEwMDA7XG4gICAgICAgIHRoaXMuc3BlZWRSZWR1Y3Rpb24gPSA1MDA7XG4gICAgfVxuXG4gICAgY2hlY2tJbnB1dFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSArZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI251bWJlcicpLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZSA+PSA5ICYmIHZhbHVlIDw9IDE1ID8gdmFsdWUgOiA5O1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvR2FtZUJvYXJkLmNsYXNzLmpzIiwiaW1wb3J0IHtFbGVtZW50fSBmcm9tICcuL0VsZW1lbnQuY2xhc3MnO1xuaW1wb3J0IHtFbXB0eUJsb2NrfSBmcm9tICcuL0VtcHR5QmxvY2suY2xhc3MnO1xuaW1wb3J0IHtHYW1lQm9hcmR9IGZyb20gJy4vR2FtZUJvYXJkLmNsYXNzJztcbmltcG9ydCB7TG9jYWxTdG9yYWdlU2VydmljZX0gZnJvbSAnLi9sb2NhbFN0b3JhZ2Uuc2VydmljZSc7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5pdCk7XG5cbmxldCBibG9ja3NPblBhZ2UsXG4gICAgZWxlbWVudHMsXG4gICAgZ2FtZUJvYXJkLFxuICAgIGludGVydmFsSUQsXG4gICAgc2NvcmUsXG4gICAgc2NvcmVFbGVtZW50LFxuICAgIHNwZWVkLFxuICAgIHRoZUdhbWVJc05vdEZpbmlzaGVkLFxuICAgIGJvYXJkO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tTY29yZSgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tzT25QYWdlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYoIWJsb2Nrc09uUGFnZVtpXS5tYXAoaXRlbSA9PiBpdGVtLmJveC5jbGFzc05hbWUpLmluY2x1ZGVzKCdibG9jay1lbXB0eScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGJvYXJkLm51bWJlck9mQmxvY2tzO1xuICAgICAgICAgICAgICAgICAgICBzY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIHNwZWVkID0gc3BlZWQgPT09IGJvYXJkLm1pblNwZWVkID8gc3BlZWQgOiBzcGVlZCAtIGJvYXJkLnNwZWVkUmVkdWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLmFkZFZhbHVlVG9TdG9yYWdlKCdjdXJyZW50U2NvcmUnLCBzY29yZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLm1hcChpdGVtID0+IGRyYXdFbGVtZW50KGl0ZW0uYmxvY2spKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYmxvY2sgPSBpdGVtLmJsb2NrLmZpbHRlcihlbGVtID0+IGVsZW1bMF0gIT09IGkpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBlbGVtZW50cy5maWx0ZXIoZWxlbSA9PiBlbGVtLmJsb2NrLmxlbmd0aCAhPT0gMCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLm1hcChpdGVtID0+IGRyYXdFbGVtZW50KGl0ZW0uYmxvY2ssIGl0ZW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZUVsZW1lbnQoaXRlbS5ibG9jaywgWzEsIDBdKSkge1xuICAgICAgICAgICAgICAgICAgICBtb3ZlQmxvY2soaXRlbSwgMCwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSBlbGVtZW50cy5sZW5ndGggLSAxICYmIHRoZUdhbWVJc05vdEZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGROZXdFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tTY29yZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIHNwZWVkKTtcbiAgICB9XG5cbiAgICBpZiAoZ2FtZUJvYXJkIHx8IGludGVydmFsSUQpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChnYW1lQm9hcmQpO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgIH1cblxuICAgIGJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuICAgIGJsb2Nrc09uUGFnZSA9IFtdO1xuICAgIGVsZW1lbnRzID0gW107XG4gICAgc2NvcmUgPSBwYXJzZUludChMb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldEZyb21TdG9yYWdlKCkuZ2V0KCdjdXJyZW50U2NvcmUnKSkgfHwgMDtcbiAgICBzY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKTtcbiAgICBzY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gc2NvcmUgfHwgMDtcbiAgICBzcGVlZCA9IDI1MDA7XG4gICAgdGhlR2FtZUlzTm90RmluaXNoZWQgPSB0cnVlO1xuXG4gICAgZHJhd0dhbWVCb2FyZCgpO1xuICAgIGFkZE5ld0VsZW1lbnQoKTtcbiAgICBzdGFydEdhbWUoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBleGVjdXRlS2V5RG93bkFjdGlvbik7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVLZXlEb3duQWN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3ICYmIGNhbk1vdmVFbGVtZW50KGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmJsb2NrLCBbMCwgLTFdKSkge1xuICAgICAgICBtb3ZlQmxvY2soZWxlbWVudHNbZWxlbWVudHMubGVuZ3RoIC0gMV0sIDEsIC0xKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5ICYmIGNhbk1vdmVFbGVtZW50KGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmJsb2NrLCBbMCwgMV0pKSB7XG4gICAgICAgIG1vdmVCbG9jayhlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXSwgMSwgMSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmF3R2FtZUJvYXJkKCkge1xuICAgIGdhbWVCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdhbWVCb2FyZC5jbGFzc05hbWUgPSAnZ2FtZSc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnYW1lQm9hcmQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5udW1iZXJPZkJsb2NrczsgKytpKSB7XG4gICAgICAgIGJsb2Nrc09uUGFnZS5wdXNoKFtdKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5udW1iZXJPZkJsb2NrczsgKytqKSB7XG4gICAgICAgICAgICBibG9ja3NPblBhZ2VbaV1bal0gPSBuZXcgRW1wdHlCbG9jayhib2FyZC5nYW1lQm9hcmRTaXplLCBib2FyZC5udW1iZXJPZkJsb2Nrcyk7XG4gICAgICAgICAgICBnYW1lQm9hcmQuYXBwZW5kQ2hpbGQoYmxvY2tzT25QYWdlW2ldW2pdLmJveCk7XG4gICAgICAgICAgICBibG9ja3NPblBhZ2VbaV1bal0uY2hhbmdlQmxvY2tTdHlsZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGROZXdFbGVtZW50KCkge1xuICAgIGxldCBuZXdFbGVtID0gbmV3IEVsZW1lbnQoKSxcbiAgICAgICAgcG9pbnRzWE9mTmV3RWxlbSA9IG5ld0VsZW0uYmxvY2subWFwKGl0ZW0gPT4gaXRlbVsxXSksXG4gICAgICAgIG1pZGRsZSA9IE1hdGguZmxvb3IoKGJvYXJkLm51bWJlck9mQmxvY2tzIC0gTWF0aC5tYXgoLi4ucG9pbnRzWE9mTmV3RWxlbSkpIC8gMik7XG5cbiAgICBmdW5jdGlvbiBjYW5BZGRBbm90aGVyQmxvY2soZWxlbWVudCkge1xuICAgICAgICBsZXQgY2FuQWRkID0gdHJ1ZTtcblxuICAgICAgICBlbGVtZW50LmJsb2NrLmZvckVhY2goaXRlbSA9PiBjYW5BZGQgPSBjYW5BZGQgJiYgdHJ5QWRkQmxvY2soaXRlbSkpO1xuXG4gICAgICAgIHJldHVybiBjYW5BZGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFpbnRMYXN0RWxlbWVudCgpIHtcbiAgICAgICAgbmV3RWxlbS5ibG9jay5tYXAoaXRlbSA9PiBibG9ja3NPblBhZ2VbaXRlbVswXV1baXRlbVsxXV0uY2hhbmdlQmxvY2tTdHlsZShuZXdFbGVtLmluZGV4KSk7XG4gICAgfVxuXG4gICAgbmV3RWxlbS5ibG9jayA9IG5ld0VsZW0uYmxvY2subWFwKGl0ZW0gPT4gW2l0ZW1bMF0sIGl0ZW1bMV0gKyBtaWRkbGVdKTtcblxuICAgIGlmIChjYW5BZGRBbm90aGVyQmxvY2sobmV3RWxlbSkpIHtcbiAgICAgICAgZWxlbWVudHMucHVzaChuZXdFbGVtKTtcbiAgICAgICAgZHJhd0VsZW1lbnQoZWxlbWVudHNbZWxlbWVudHMubGVuZ3RoIC0gMV0uYmxvY2ssIGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXhlY3V0ZUtleURvd25BY3Rpb24pO1xuICAgICAgICBwYWludExhc3RFbGVtZW50KCk7XG4gICAgICAgIExvY2FsU3RvcmFnZVNlcnZpY2UudXBkYXRlU3RvcmFnZSgpO1xuICAgICAgICB0aGVHYW1lSXNOb3RGaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdHJ5QWRkQmxvY2soYmxvY2spIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gYmxvY2tzT25QYWdlW2Jsb2NrWzBdXVtibG9ja1sxXV0uYm94LmNsYXNzTmFtZSA9PT0gJ2Jsb2NrLWVtcHR5JztcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmF3RWxlbWVudChibG9jaywgaW5kZXgpIHtcbiAgICBibG9jay5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGJsb2Nrc09uUGFnZVtpdGVtWzBdXVtpdGVtWzFdXS5jaGFuZ2VCbG9ja1N0eWxlKGluZGV4KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbW92ZUJsb2NrKGVsZW1lbnQsIHBvc2l0aW9uLCBzaGlmdCkge1xuICAgIGRyYXdFbGVtZW50KGVsZW1lbnQuYmxvY2spO1xuICAgIGVsZW1lbnQuYmxvY2subWFwKGl0ZW0gPT4gaXRlbVtwb3NpdGlvbl0gKz0gc2hpZnQpO1xuICAgIGRyYXdFbGVtZW50KGVsZW1lbnQuYmxvY2ssIGVsZW1lbnQuaW5kZXgpO1xufVxuXG5mdW5jdGlvbiBjYW5Nb3ZlRWxlbWVudChibG9jaywgc2hpZnQpIHtcbiAgICBsZXQgcGVyaGFic05ld1Bvc2l0aW9uID0gYmxvY2subWFwKGl0ZW0gPT4gW2l0ZW1bMF0gKyBzaGlmdFswXSwgaXRlbVsxXSArIHNoaWZ0WzFdXSksXG4gICAgICAgIGNhbk1vdmUgPSB0cnVlO1xuXG4gICAgcGVyaGFic05ld1Bvc2l0aW9uLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmICghYmxvY2subWFwKGl0ZW0gPT4gaXRlbS50b1N0cmluZygpKS5pbmNsdWRlcyhpdGVtLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICBjYW5Nb3ZlID0gY2FuTW92ZSAmJiB0cnlBZGRCbG9jayhpdGVtKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhbk1vdmU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL2luZGV4LmpzIiwiaW1wb3J0IHtFbXB0eUJsb2NrfSBmcm9tICcuL0VtcHR5QmxvY2suY2xhc3MnO1xuXG5jb25zdCBCTE9DS1MgPSBbXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFswLCAzXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFsxLCAyXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFsxLCAwXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMSwgMF0sIFsxLCAxXV0sXG4gICAgW1swLCAxXSwgWzAsIDJdLCBbMSwgMF0sIFsxLCAxXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMCwgMl0sIFsxLCAxXV0sXG4gICAgW1swLCAwXSwgWzAsIDFdLCBbMSwgMV0sIFsxLCAyXV1cbl07XG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpLFxuICAgICAgICB0aGlzLmJsb2NrID0gQkxPQ0tTW3RoaXMuaW5kZXhdO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvRWxlbWVudC5jbGFzcy5qcyIsImxldCBtYXA7XG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIHtcbiAgICBzdGF0aWMgYWRkVmFsdWVUb1N0b3JhZ2UobmFtZSwgc2NvcmUpIHtcbiAgICAgICAgbWFwLnNldChuYW1lLCBzY29yZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEZyb21TdG9yYWdlKCkge1xuICAgICAgICBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbG9jYWxTdG9yYWdlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbWFwLnNldChsb2NhbFN0b3JhZ2Uua2V5KGkpLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlU3RvcmFnZSgpIHtcbiAgICAgICAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvbG9jYWxTdG9yYWdlLnNlcnZpY2UuanMiXSwic291cmNlUm9vdCI6IiJ9