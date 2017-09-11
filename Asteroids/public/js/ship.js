class Ship extends Polygon {
  constructor(points, gun, flames, size, x, y) {
    super(points);

    this.flames = new Polygon(flames);
    this.flames.scale(size);

    this.drawFlames = false;
    this.visible = true;

    this.maxX = null;
    this.maxY = null;
    this.x = x;
    this.y = y;

    this.scale(size);

    this.angle = 0;

    this.vel = {
      x: 0,
      y: 0
    };
    this.mouseX = 0;
    this.mouseY = 0;

    game.canvas.canvas.addEventListener('mousemove', (event) => {
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
    });
  }

  collide(asteroid) {
    for(let i = 0; i < this.points.length; i += 2) {
      const x = this.points[i] + this.x;
      const y = this.points[i + 1] + this.y;

      if(asteroid.hasPoint(x, y)) {
        return true;
      }
    }
    return false;
  }

  shoot() {
    const bullet = new Bullet(this.x, this.y, this.mouseX, this.mouseY);
    bullet.maxX = this.maxX;
    bullet.maxY = this.maxY;
    FIRE_SOUND.cloneNode(true).play();
    return bullet;
  }

  addVel() {
    // THRUST_SOUND.cloneNode(true).play();
    if((this.vel.x * this.vel.x) + (this.vel.y * this.vel.y) < 20 * 20) {
      this.vel.x += 0.05 * Math.cos(this.angle);
      this.vel.y += 0.05 * Math.sin(this.angle);
    }
  }

  rotate(theta) {
    this.rotater(theta);
    this.flames.rotater(theta);
    this.angle += theta;
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;

    this.vel.x *= 0.99;
    this.vel.y *= 0.99;

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

  draw(ctx) {
    if(!this.visible) {
      return;
    }
    { ctx.drawPolygon(this, this.x, this.y); }
    if(this.drawFlames) ctx.drawPolygon(this.flames, this.x, this.y);
    // ctx.fillStyle = 'white';
    // ctx.drawPolygon(this.gun, this.x, this.y);
    // ctx.fill();
    // ctx.fillStyle = 'none';
    this.drawFlames = false;
  }
}
