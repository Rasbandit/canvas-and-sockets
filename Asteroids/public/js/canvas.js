class Canvas {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = (function (ctx) {
      ctx.width = ctx.canvas.width;
      ctx.height = ctx.canvas.height;

      ctx.ACODE = 'A'.charCodeAt(0);
      ctx.ZCODE = '0'.charCodeAt(0);
      ctx.SCODE = ' '.charCodeAt(0);

      ctx.drawPolygon = function (shape, xCoordinate, yCoordinate) {
        const { points } = shape;
        this.beginPath();
        this.moveTo(points[0] + xCoordinate, points[1] + yCoordinate);
        for(let i = 2, len = points.length; i < len; i += 2) {
          this.lineTo(points[i] + xCoordinate, points[i + 1] + yCoordinate);
        }
        this.stroke();
      };

      ctx.clearAll = function () {
        this.clearRect(0, 0, this.width, this.height);
      };

      ctx.vectorText = function (text, s, xCoordinate, yCoordinate) {
        text = text.toString().toUpperCase().split('');
        const step = s * 6;

        if(typeof xCoordinate !== 'number') {
          xCoordinate = Math.round((this.width - text.length * step) / 2);
        }

        xCoordinate += 0.5;
        yCoordinate += 0.5;

        text.forEach((character) => {
          const charCode = character.charCodeAt(0);
          if(charCode === this.SCODE) {
            xCoordinate += step;
            return;
          }
          let p = null;
          if(charCode - this.ACODE >= 0) {
            p = POINTS.LETTERS[charCode - this.ACODE];
          } else {
            p = POINTS.NUMBERS[charCode - this.ZCODE];
          }
          this.beginPath();
          this.moveTo(p[0] * s + xCoordinate, p[1] * s + yCoordinate);
          for (let i = 2; i < p.length; i += 2) {
            this.lineTo(p[i] * s + xCoordinate, p[i + 1] * s + yCoordinate);
          }
          this.stroke();
          xCoordinate += step;
        });
      };

      return ctx;
    }(this.canvas.getContext('2d')));
    document.body.appendChild(this.canvas);
  }

  animate(loop) {
    const rf = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (cb, el) {
          window.setTimeout(cb, 1000 / 60);
        };
    }());

    const l = () => {
      loop();
      rf(l, this.canvas);
    };
    rf(l, this.canvas);
  }
}
