const State = require('./State');
const Ship = require('./Ship');
const Asteroid = require('./Asteroid');
const POINTS = require('./../references/points');

const SIZE = 8;

module.exports = class GameState extends State {
  constructor(game) {
    super(game);

    this.asteroids = [];

    this.ship = new Ship(POINTS.SHIP, POINTS.FLAMES, 2, 320, 240);

    this.lvl = 20;

    this.generateLvl(this.lvl);
  }

  handleInputs(input) {
    // if (!this.ship.visible) {
    //   if (input.isPressed('spacebar')) {
    //     if (this.gameOver) {
    //       this.game.nextState = STATES.END;
    //       return;
    //     }
    //     this.ship.visible = true;
    //   }
    //   return;
    // }
    if (input.isDown('right')) {
      this.ship.rotate(0.05);
      this.ship.flames.rotate(0.05);
      this.ship.angle += 0.05;
    }
    if (input.isDown('left')) {
      this.ship.rotate(-0.05);
      this.ship.flames.rotate(-0.05);
      this.ship.angle -= 0.05;
    }
    if (input.isDown('up')) {
      this.ship.drawFlames = true;
      this.ship.addVel();
    } else {
      this.ship.drawFlames = false;
    }
  }

  generateLvl() {
    const asteroidBasedOffLevel = Math.round((10 * Math.atan(this.lvl / 25)) + 3);
    for (let i = 0; i < asteroidBasedOffLevel; i += 1) {
      let randomX = -50;
      let randomY = -50;
      if (Math.random() > 0.5) {
        randomX = (Math.random() * 640);
        if (Math.random() > 0.5) {
          randomY = 480 + 50;
        }
      } else {
        randomY = (Math.random() * 480);
        if (Math.random() > 0.5) {
          randomX = 640 + 50;
        }
      }
      this.createAsteroid(SIZE, Math.floor(randomX), Math.floor(randomY));
    }
  }

  createAsteroid(size, xCoordinate, yCoordinate) {
    const randomAsteroid = Math.round(Math.random() * (POINTS.ASTEROIDS.length - 1));
    const asteroid = new Asteroid(POINTS.ASTEROIDS[randomAsteroid], size, xCoordinate, yCoordinate);
    this.asteroids.push(asteroid);
  }

  update() {
    this.asteroids.forEach((asteroid) => {
      asteroid.update();
    });
    this.ship.update();
  }
};
