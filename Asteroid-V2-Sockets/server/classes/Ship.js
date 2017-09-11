const Polygon = require('./Polygon');

module.exports = class Ship extends Polygon {
  constructor(points, flames, size, x, y) {
    super(points);

    this.flames = new Polygon(flames);
    this.flames.scale(size);

    this.drawFlames = false;

    this.maxX = 640;
    this.maxY = 480;

    this.angle = 0;

    this.x = x;
    this.y = y;

    this.scale(size);

    this.velocity = {
      x: 0,
      y: 0
    };
  }

  addVel() {
    // THRUST_SOUND.cloneNode(true).play();
    if ((this.velocity.x * this.velocity.x) + (this.velocity.y * this.velocity.y) < 20 * 20) {
      this.velocity.x += 0.05 * Math.cos(this.angle);
      this.velocity.y += 0.05 * Math.sin(this.angle);
    }
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.velocity.x *= 0.99;
    this.velocity.y *= 0.99;

    if (this.x > this.maxX + 5) {
      this.x = -5;
    } else if (this.x < -5) {
      this.x = this.maxX + 5;
    }

    if (this.y > this.maxY + 5) {
      this.y = -5;
    } else if (this.y < -5) {
      this.y = this.maxY + 5;
    }
  }
};
