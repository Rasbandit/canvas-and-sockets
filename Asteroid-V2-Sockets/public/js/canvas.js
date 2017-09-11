export default class Canvas {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = (function (ctx) {
      ctx.width = ctx.canvas.width;
      ctx.height = ctx.canvas.height;

      ctx.drawPolygon = function (polygon, x, y) {
        const { points } = polygon;
        this.beginPath();
        this.moveTo(points[0] + x, points[1] + y);
        for (let i = 2; i < points.length; i += 2) {
          this.lineTo(points[i] + x, points[i + 1] + y);
        }
        this.stroke();
      };

      ctx.clearAll = function () {
        this.clearRect(0, 0, this.width, this.height);
      };

      return ctx;
    }(this.canvas.getContext('2d')));

    document.body.appendChild(this.canvas);
  }

  animate(loop) {
    const rf = (() => window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame
    )();

    const looper = () => {
      loop();
      rf(looper);
    };
    rf(looper);
  }
}
