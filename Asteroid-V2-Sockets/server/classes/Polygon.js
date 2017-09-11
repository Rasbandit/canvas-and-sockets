module.exports = class Polygon {
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
  hasPoints(offsetX, offsetY, xPosition, yPosition) {

  }
};
