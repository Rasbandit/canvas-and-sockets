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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Polygon {
  constructor(points) {
    this.points = points.slice(0);
  }

  rotate(theta) {
    const cosine = Math.cos(theta);
    const sine = Math.sin(theta);

    for (let i = 0; i < this.points.length; i += 2) {
      const x = this.points[i];
      const y = this.points[i + 1];

      this.points[i] = (cosine * x) - (sine * y);
      this.points[i + 1] = (sine * x) + (cosine * y);
    }
  }
  scale(size) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] *= size;
    }
  }
  hasPoints(offsetX, offsetY, x, y) {
    let collision = false;
    const p = this.points;
    const length = p.length;
    for (let i = 0, j = length - 2; i < length; i += 2) {
      const px1 = p[i] + offsetX;
      const px2 = p[j] + offsetX;
      const py1 = p[i + 1] + offsetY;
      const py2 = p[j + 1] + offsetY;

      if ((py1 > y != py2 > y) &&
        (x < (px2 - px1) * (y - py1) / (py2 - py1) + px1)
      ) {
        collision = !collision;
      }
      j = i;
    }
    return collision;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Polygon;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Polygon__ = __webpack_require__(0);


class Asteroid extends __WEBPACK_IMPORTED_MODULE_0__Polygon__["a" /* default */] {
  draw(ctx) {
    if (!this.visible) {
      return;
    }
    ctx.drawPolygon(this, this.x, this.y);
    if (this.drawFlames) ctx.drawPolygon(this.flames, this.x, this.y);
    // this.drawFlames = false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Asteroid;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(3);


const game = new __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */]();
game.run();



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameState__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__references_gameStates__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Asteroid__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Ship__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Bullet__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__InputHandeler__ = __webpack_require__(11);








const FIRE_SOUND = new Audio('./../sounds/fire.wav');
const THRUST_SOUND = new Audio('./../sounds/thrust.wav');
const BIG_EXPLOSION_SOUND = new Audio('./../sounds/bangLarge.wav');
const MEDIUM_EXPLOSION_SOUND = new Audio('./../sounds/bangMedium.wav');
const SMALL_EXPLOSION_SOUND = new Audio('./../sounds/bangSmall.wav');


class Game {
  constructor() {
    this.canvas = new __WEBPACK_IMPORTED_MODULE_1__canvas__["a" /* default */](640, 480);

    this.input = new __WEBPACK_IMPORTED_MODULE_6__InputHandeler__["a" /* default */]({
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32
    });

    this.canvas.ctx.strokeStyle = '#fff';

    this.canvas.canvas.addEventListener('click', (event) => {
      const mousePosition = { x: event.offsetX, y: event.offsetY };
      socket.emit('fire', mousePosition);
    });

    this.state = {
      currentState: null,
      nextState: __WEBPACK_IMPORTED_MODULE_2__references_gameStates__["a" /* default */].GAME
    };

    socket.on('fireSound', () => {
      FIRE_SOUND.cloneNode(true).play();
    });

    socket.on('explosion', (num) => {
      switch (num) {
        case 8:
          BIG_EXPLOSION_SOUND.cloneNode(true).play();
          break;
        case 4:
          MEDIUM_EXPLOSION_SOUND.cloneNode(true).play();
          break;
        case 2:
          SMALL_EXPLOSION_SOUND.cloneNode(true).play();
          break;
        default:
          break;
      }
    });

    socket.on('newState', (state) => {
      this.state = JSON.parse(state);
      if(this.state.currentState.bullets) {
        this.state.currentState = Object.setPrototypeOf(this.state.currentState, __WEBPACK_IMPORTED_MODULE_0__GameState__["a" /* default */].prototype);
        this.state.currentState.asteroids.map(asteroid => Object.setPrototypeOf(asteroid, __WEBPACK_IMPORTED_MODULE_3__Asteroid__["a" /* default */].prototype));
        this.state.currentState.ship = Object.setPrototypeOf(this.state.currentState.ship, __WEBPACK_IMPORTED_MODULE_4__Ship__["a" /* default */].prototype);
        this.state.currentState.bullets.map(bullet => Object.setPrototypeOf(bullet, __WEBPACK_IMPORTED_MODULE_5__Bullet__["a" /* default */].prototype));
      }
    });
  }

  run() {
    this.canvas.animate(() => {
      if(this.state.currentState !== null) {
        this.state.currentState.handleInputs(this.input);
        // this.state.currentState.update();
        this.state.currentState.render(this.canvas.ctx);
      }
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__State__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Ship__ = __webpack_require__(1);




class GameState extends __WEBPACK_IMPORTED_MODULE_0__State__["a" /* default */] {
  constructor(game) {
    super(game);
  }

  render(ctx) {
    ctx.clearAll();
    ctx.vectorText(this.score, 3, 20, 10);
    for (let i = 0; i < this.lives; i += 1) {
      const xPosistion = 30 + 15 * i;
      ctx.drawPolygon(this.lifePolygon, xPosistion, 45);
    }

    this.bullets.forEach(bullet => bullet.draw(ctx));
    this.asteroids.forEach((asteroid) => {
      asteroid.draw(ctx);
    });
    this.ship.draw(ctx);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameState;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class State {
  constructor(game) {
    this.game = game;
  }

  handleInputs() {

  }

  render(ctx) {

  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = State;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__references_Points__ = __webpack_require__(7);


class Canvas {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = (function (ctx) {
      ctx.width = ctx.canvas.width;
      ctx.height = ctx.canvas.height;

      ctx.drawPolygon = function (polygon, x, y) {
        const { points } = polygon;
        this.beginPath();
        this.moveTo(points[0] + x, points[1] + y);
        for (let i = 2; i < points.length; i += 2) {
          this.lineTo(points[i] + x, points[i + 1] + y);
        }
        this.stroke();
      };

      ctx.clearAll = function () {
        this.clearRect(0, 0, this.width, this.height);
      };

      ctx.ACODE = 'A'.charCodeAt(0);
      ctx.ZCODE = '0'.charCodeAt(0);
      ctx.SCODE = ' '.charCodeAt(0);

      ctx.vectorText = function (text, s, xCoordinate, yCoordinate) {
        text = text.toString().toUpperCase().split('');
        const step = s * 6;

        if (typeof xCoordinate !== 'number') {
          xCoordinate = Math.round((this.width - text.length * step) / 2);
        }

        xCoordinate += 0.5;
        yCoordinate += 0.5;

        text.forEach((character) => {
          const charCode = character.charCodeAt(0);
          if (charCode === this.SCODE) {
            xCoordinate += step;
            return;
          }
          let p = null;
          if (charCode - this.ACODE >= 0) {
            p = __WEBPACK_IMPORTED_MODULE_0__references_Points__["a" /* default */].LETTERS[charCode - this.ACODE];
          } else {
            p = __WEBPACK_IMPORTED_MODULE_0__references_Points__["a" /* default */].NUMBERS[charCode - this.ZCODE];
          }
          this.beginPath();
          this.moveTo(p[0] * s + xCoordinate, p[1] * s + yCoordinate);
          for (let i = 2; i < p.length; i += 2) {
            this.lineTo(p[i] * s + xCoordinate, p[i + 1] * s + yCoordinate);
          }
          this.stroke();
          xCoordinate += step;
        });
      };

      return ctx;
    }(this.canvas.getContext('2d')));

    document.body.appendChild(this.canvas);
  }

  animate(loop) {
    const rf = (() => window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame
    )();

    const looper = () => {
      loop();
      rf(looper);
    };
    rf(looper);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Canvas;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  ASTEROIDS: [
    [0, -2, 2, -4, 4, -2, 3, 0, 4, 2, 1, 4, -2, 4, -4, 2, -4, -2, -2, -4, 0, -2],
    [0, -3, -2, -4, -4, -2, -3, 0, -4, 2, -2, 4, 0, 3, 2, 4, 4, 2, 3, 0, 4, -2, 2, -4, 0, -3],
    [0, 1, 0, 4, 2, 4, 4, 1, 4, -1, 2, -5, -2, -5, -5, -2, -3, -1, -5, 0, -2, 4, 0, 1],
    [1, 0, 4, -1, 4, -2, 1, -4, -1, -4, 0, -2, -3, -2, -3, 1, -1, 4, 1, 3, 2, 4, 4, 2, 1, 0],
    [0, -4, -2, -4, -1, -2, -4, -2, -3, 0, -4, 3, 0, 4, 3, 2, 4, -1, 2, -2, 3, -3, 0, -4],
    [-2, -4, 2, -4, 4, -2, 4, 2, 2, 4, -2, 4, -4, 2, -4, -2, -2, -4]
  ],
  SHIP: [6, 0, -3, -3, -2, 0, -3, 3, 6, 0],
  FLAMES: [-2, 0, -3, -1, -5, 0, -3, 1, -2, 0],
  GUN: [-2, -1, -2, 1, -1, 2, 1, 2, 2, 1, 2, -1, 1, -1, 1, -4, -1, -4, -1, -1, -2, -1],

  LETTERS: [
    [0, 6, 0, 2, 2, 0, 4, 2, 4, 4, 0, 4, 4, 4, 4, 6], // A
    [0, 3, 0, 6, 2, 6, 3, 5, 3, 4, 2, 3, 0, 3, 0, 0, 2, 0, 3, 1, 3, 2, 2, 3], // B
    [4, 0, 0, 0, 0, 6, 4, 6], // C
    [0, 0, 0, 6, 2, 6, 4, 4, 4, 2, 2, 0, 0, 0], // D
    [4, 0, 0, 0, 0, 3, 3, 3, 0, 3, 0, 6, 4, 6], // E
    [4, 0, 0, 0, 0, 3, 3, 3, 0, 3, 0, 6], // F
    [4, 2, 4, 0, 0, 0, 0, 6, 4, 6, 4, 4, 2, 4], // G
    [0, 0, 0, 6, 0, 3, 4, 3, 4, 0, 4, 6], // H
    [0, 0, 4, 0, 2, 0, 2, 6, 4, 6, 0, 6], // I
    [4, 0, 4, 6, 2, 6, 0, 4], // J
    [3, 0, 0, 3, 0, 0, 0, 6, 0, 3, 3, 6], // K
    [0, 0, 0, 6, 4, 6], // L
    [0, 6, 0, 0, 2, 2, 4, 0, 4, 6], // M
    [0, 6, 0, 0, 4, 6, 4, 0], // N
    [0, 0, 4, 0, 4, 6, 0, 6, 0, 0], // O
    [0, 6, 0, 0, 4, 0, 4, 3, 0, 3], // P
    [0, 0, 0, 6, 2, 6, 3, 5, 4, 6, 2, 4, 3, 5, 4, 4, 4, 0, 0, 0], // Q
    [0, 6, 0, 0, 4, 0, 4, 3, 0, 3, 1, 3, 4, 6], // R
    [4, 0, 0, 0, 0, 3, 4, 3, 4, 6, 0, 6], // S
    [0, 0, 4, 0, 2, 0, 2, 6], // T
    [0, 0, 0, 6, 4, 6, 4, 0], // U
    [0, 0, 2, 6, 4, 0], // V
    [0, 0, 0, 6, 2, 4, 4, 6, 4, 0], // W
    [0, 0, 4, 6, 2, 3, 4, 0, 0, 6], // X
    [0, 0, 2, 2, 4, 0, 2, 2, 2, 6], // Y
    [0, 0, 4, 0, 0, 6, 4, 6] // Z
  ],

  NUMBERS: [
    [0, 0, 0, 6, 4, 6, 4, 0, 0, 0], // 0
    [2, 0, 2, 6], // 1
    [0, 0, 4, 0, 4, 3, 0, 3, 0, 6, 4, 6], // 2
    [0, 0, 4, 0, 4, 3, 0, 3, 4, 3, 4, 6, 0, 6], // 3
    [0, 0, 0, 3, 4, 3, 4, 0, 4, 6], // 4
    [4, 0, 0, 0, 0, 3, 4, 3, 4, 6, 0, 6], // 5
    [0, 0, 0, 6, 4, 6, 4, 3, 0, 3], // 6
    [0, 0, 4, 0, 4, 6], // 7
    [0, 3, 4, 3, 4, 6, 0, 6, 0, 0, 4, 0, 4, 3], // 8
    [4, 3, 0, 3, 0, 0, 4, 0, 4, 6], // 9
  ]

});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const STATES = {
  NO_CHANGE: 0,
  MENU: 1,
  GAME: 2,
  END: 3
};

/* harmony default export */ __webpack_exports__["a"] = (STATES);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Polygon__ = __webpack_require__(0);


class Asteroid extends __WEBPACK_IMPORTED_MODULE_0__Polygon__["a" /* default */] {
  constructor(points, size, x, y) {
    super(points);

    this.maxX = 640;
    this.maxY = 480;

    this.x = x;
    this.y = y;

    this.scale(size);

    this.rotationSpeed = 0.02 * ((Math.random()) + 1);

    const direction = 2 * Math.PI * Math.random();
    const speed = Math.random() + 1;
    this.velocity = {
      x: speed * Math.cos(direction),
      y: speed * Math.sin(direction)
    };
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x > this.maxX + (this.size * 6)) {
      this.x = -(this.size * 6);
    } else if (this.x < -(this.size * 6)) {
      this.x = this.maxX + (this.size * 6);
    }

    if (this.y > this.maxY + (this.size * 6)) {
      this.y = -(this.size * 6);
    } else if (this.y < -(this.size * 6)) {
      this.y = this.maxY + (this.size * 6);
    }

    this.rotate(this.rotationSpeed);
  }

  draw(ctx) {
    ctx.drawPolygon(this, this.x, this.y);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Asteroid;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Polygon__ = __webpack_require__(0);


class Bullet extends __WEBPACK_IMPORTED_MODULE_0__Polygon__["a" /* default */] {
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.prevx, this.prevy);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bullet;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class InputHandeler {
  constructor(keys) {
    this.keys = {};
    this.down = {};
    this.pressed = {};

    for (const key in keys) {
      const code = keys[key];

      this.keys[code] = key;
      this.down[key] = false;
      this.pressed[key] = false;
    }

    document.addEventListener('keydown', (event) => {
      if (this.keys[event.keyCode] && this.down[this.keys[event.keyCode]] === false) {
        socket.emit('keyDown', event.keyCode);
      }
    });

    document.addEventListener('keyup', (event) => {
      if (this.keys[event.keyCode]) {
        socket.emit('keyUp', event.keyCode);
      }
    });
  }

  isDown(key) {
    return this.down[key];
  }

  isPressed(key) {
    if(this.pressed[key]) {
      return false;
    } else if (this.down[key]) {
      this.pressed[key] = true;
      return this.pressed[key];
    }
    return false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InputHandeler;



/***/ })
/******/ ]);