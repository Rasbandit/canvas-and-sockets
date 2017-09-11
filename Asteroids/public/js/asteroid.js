class Asteroid extends Polygon {
  constructor(p, s, x, y) {
    super(p);

    this.maxX = null;
    this.maxY = null;

    this.x = x;
    this.y = y;

    this.size = s;

    this.scale(s);

    this.rotationSpeed = 0.02 * (Math.random() * 2 - 1);

    const randomDirection = 2 * Math.PI * Math.random();
    const randomVelocity = Math.random() + 1;
    this.vel = {
      x: randomVelocity * Math.cos(randomDirection),
      y: randomVelocity * Math.sin(randomDirection)
    };
  }

  hasPoint(x, y) {
    return this.hasPoints(this.x, this.y, x, y);
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;

    if(this.x > this.maxX + (this.size * 6)) {
      this.x = -(this.size * 6);
    } else if (this.x < -(this.size * 6)) {
      this.x = this.maxX + (this.size * 6);
    }

    if(this.y > this.maxY + (this.size * 6)) {
      this.y = -(this.size * 6);
    } else if (this.y < -(this.size * 6)) {
      this.y = this.maxY + (this.size * 6);
    }
    this.rotater(this.rotationSpeed);
  }

  draw(ctx) {
    ctx.drawPolygon(this, this.x, this.y);
  }
}
