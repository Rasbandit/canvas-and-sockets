const ASTEROID_SIZE = 8;

class GameState extends State {
  constructor(game) {
    super(game);

    this.canvasHeight = game.canvas.ctx.height;
    this.canvasWidth = game.canvas.ctx.width;
    this.bullets = [];
    this.asteroids = [];

    this.ship = new Ship(POINTS.SHIP, POINTS.GUN, POINTS.FLAMES, 2, this.canvasWidth / 2, this.canvasHeight / 2);
    this.ship.maxX = this.canvasWidth;
    this.ship.maxY = this.canvasHeight;

    this.lives = 3;
    this.lifePolygon = new Polygon(POINTS.SHIP);
    this.lifePolygon.scale(1.5);
    this.lifePolygon.rotater(-Math.PI / 2);
    this.gameOver = false;

    this.score = 0;

    this.lvl = 0;

    this.generateLvl(this.lvl);

    this.game.canvas.canvas.addEventListener('click', (event) => {
      // this.bullets.push(this.ship.shoot());
      socket.emit('fire', this.ship.shoot());
    });

    socket.on('fired', (returnedBullets) => {
      this.bullets = returnedBullets.map(bullet => Object.setPrototypeOf(bullet, Bullet.prototype));
    });
  }

  generateLvl() {
    const asteroidBasedOffLevel = Math.round((10 * Math.atan(this.lvl / 25)) + 3);
    for (let i = 0; i < asteroidBasedOffLevel; i += 1) {
      let randomX = -50;
      let randomY = -50;
      // flip a coin, if true starts on x
      if(Math.random() > 0.5) {
        // set random positon on x
        randomX = (Math.random() * this.canvasWidth);
        // flip coin if it starts on left or right, if true start on right
        if (Math.random() > 0.5) {
          randomY = this.canvasHeight + 50;
        }
      } else {
        randomY = (Math.random() * this.canvasHeight);
        if (Math.random() > 0.5) {
          randomX = this.canvasWidth + 50;
        }
      }
      this.createAsteroid(ASTEROID_SIZE, randomX, randomY);
    }
  }

  handleInputs(input) {
    if(!this.ship.visible) {
      if(input.isPressed('spacebar')) {
        if(this.gameOver) {
          this.game.nextState = STATES.END;
          return;
        }
        this.ship.visible = true;
      }
      return;
    }

    if(input.isDown('right')) {
      this.ship.rotate(0.05);
    }
    if(input.isDown('left')) {
      this.ship.rotate(-0.05);
    }
    this.ship.drawFlames = false;
    if(input.isDown('up')) {
      this.ship.drawFlames = true;
      this.ship.addVel();
    }
  }

  update() {
    // asteroid loop to see if bullets collide with asteroid
    this.asteroids.forEach((asteroid, asteroidIndex) => {
      asteroid.update();

      // ship collision detection
      if(this.ship.visible) {
        if(this.ship.collide(asteroid)) {
          this.ship.x = this.canvasWidth / 2;
          this.ship.y = this.canvasHeight / 2;
          this.ship.vel = {
            x: 0,
            y: 0
          };
          this.lives -= 1;
          if(this.lives <= 0) {
            this.gameOver = true;
          }
          this.ship.visible = false;
        }
      }

      // bullet loop
      { this.bullets.forEach((bullet, bulletIndex) => {
        // if bullet is inside
        if(asteroid.hasPoint(bullet.x, bullet.y)) {
          switch(asteroid.size) {
            case 8:
              BIG_EXPLOSION_SOUND.cloneNode(true).play();
              this.score += 20;
              break;
            case 4:
              MEDIUM_EXPLOSION_SOUND.cloneNode(true).play();
              this.score += 50;
              break;
            case 2:
              SMALL_EXPLOSION_SOUND.cloneNode(true).play();
              this.score += 100;
              break;
            default:
              break;
          }
          // remove bullet
          this.bullets.splice(bulletIndex, 1);
          // if the asteroid is big enough, split
          if(asteroid.size > ASTEROID_SIZE / 4) {
            // create two new asteroids
            for(let i = 0; i < 2; i += 1) {
              this.createAsteroid(asteroid.size / 2, asteroid.x, asteroid.y);
            }
          }
          // remove hit asteroid
          this.asteroids.splice(asteroidIndex, 1);
        }
      }); }
    });
    this.bullets.forEach((bullet, index, arr) => {
      bullet.update();
      if(bullet.shallRemove) {
        arr.splice(index, 1);
      }
    });
    this.ship.update();

    if(this.asteroids.length <= 0) {
      this.lvl += 1;
      this.generateLvl(this.lvl);
    }
  }

  createAsteroid(size, xCoordinate, yCoordinate) {
    const randomAsteroid = Math.round(Math.random() * (POINTS.ASTEROIDS.length - 1));
    const asteroid = new Asteroid(POINTS.ASTEROIDS[randomAsteroid], size, xCoordinate, yCoordinate);
    asteroid.maxX = this.canvasWidth;
    asteroid.maxY = this.canvasHeight;
    this.asteroids.push(asteroid);
  }

  render(ctx) {
    ctx.clearAll();

    ctx.vectorText(this.score, 3, 20, 10);
    for(let i = 0; i < this.lives; i += 1) {
      const xPosistion = 30 + 15 * i;
      ctx.drawPolygon(this.lifePolygon, xPosistion, 45);
    }

    this.asteroids.forEach((asteroid) => {
      asteroid.draw(ctx);
    });
    this.bullets.forEach(bullet => bullet.draw(ctx));
    if(this.gameOver) {
      ctx.vectorText('Game over', 7, null, 200);
    }
    this.ship.draw(ctx);
  }
}
