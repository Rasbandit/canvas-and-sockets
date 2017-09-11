class MenuState extends State {
  constructor(game) {
    super(game);
    this.game = game;

    this.canvasWidth = game.canvas.ctx.width;
    this.canvasHeight = game.canvas.ctx.height;

    // game.canvas.canvas.addEventListener('click', () => {
    //   socket.emit('gameStateChange', STATES.GAME);
    // });

    this.asteroids = [];
    for(let i = 0; i < 20; i += 1) {
      const asteroidNum = Math.round(Math.random() * (POINTS.ASTEROIDS.length - 1));
      let randomX = -50;
      let randomY = -50;
      // flip a coin, if true starts on x
      if (Math.random() > 0.5) {
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
      const randomScale = [2, 4, 8][Math.round(Math.random() * 2)];
      const astr = new Asteroid(POINTS.ASTEROIDS[asteroidNum], randomScale, randomX, randomY);
      astr.maxX = this.canvasWidth;
      astr.maxY = this.canvasHeight;
      this.asteroids.push(astr);
    }
  }

  handleInputs(input) {
    if(input.isPressed('spacebar')) {
      this.game.nextState = 2;
    }
  }

  update() {
    this.asteroids.forEach((asteroid) => {
      asteroid.update();
    });
  }

  render(ctx) {
    ctx.clearAll();
    this.asteroids.forEach((asteroid) => {
      asteroid.draw(ctx);
    });
    ctx.vectorText('asteroids', 6, null, 150);
    ctx.vectorText('Press space to play', 2, null, 220);
  }
}
