import State from './State';
import Ship from './Ship';

export default class GameState extends State {
  constructor(game) {
    super(game);
  }

  update() {
    // console.log(this);
    // this.asteroid.update();
  }

  render(ctx) {
    ctx.clearAll();
    this.asteroids.forEach((asteroid) => {
      asteroid.draw(ctx);
    });
    this.ship.draw(ctx);
  }
}
