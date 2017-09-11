import Polygon from './Polygon';

export default class Asteroid extends Polygon {
  constructor() {
    super(points);
  }

  draw(ctx) {
    ctx.drawPolygon(this, this.x, this.y);
    if (this.drawFlames) ctx.drawPolygon(this.flames, this.x, this.y);
    // this.drawFlames = false;
  }
}
