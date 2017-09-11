const Polygon = require('./Polygon');

module.exports = class Asteroid extends Polygon {
  constructor(points, size, x, y) {
    super(points);

    this.maxX = 640;
    this.maxY = 480;

    this.size = size;

    this.x = x;
    this.y = y;

    this.scale(size);

    this.rotationSpeed = 0.01 * ((Math.random() * 2) + 1);

    if(Math.random() > 0.5) {
      this.rotationSpeed = -this.rotationSpeed;
    }

    const direction = 2 * Math.PI * Math.random();
    const speed = Math.random() + 0.75;
    this.velocity = {
      x: Math.floor(speed * Math.cos(direction)),
      y: Math.floor(speed * Math.sin(direction))
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
};
