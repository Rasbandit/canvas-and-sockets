const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// ctx.fillStyle = 'rgba(255,0,0,1)';
// ctx.fillRect(100, 100, 100, 100);

// ctx.beginPath();
// ctx.moveTo(200, 200);
// ctx.lineTo(150, 150);
// ctx.lineTo(500, 400);
// ctx.strokeStyle = '#bada55';
// ctx.stroke();


// for(let i = 0; i < 50; i += 1) {
//   ctx.beginPath();
//   ctx.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, Math.random() * 50, 0, Math.PI * 2, false);
//   ctx.strokeStyle = 'blue';
//   ctx.stroke();
// }

class Circle {
  constructor() {
    this.dx = Math.floor((Math.random() - 0.5) * 15);
    this.dy = Math.floor((Math.random() - 0.5) * 15);
    this.radius = Math.floor(Math.random() * 35) + 15;
    this.x = Math.floor((Math.random() * (window.innerWidth - (this.radius * 2))) + this.radius);
    this.y = Math.floor((Math.random() * (window.innerHeight - (this.radius * 2))) + this.radius);
    this.fill = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, 1`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.fill;
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.stroke();
  }

  update() {
    if (this.x + this.radius > window.innerWidth || this.x < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y > window.innerHeight - this.radius || this.y < this.radius) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

const circles = [];
for(let i = 0; i < 100; i += 1) {
  circles.push(new Circle());
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);
  circles.forEach(circle => circle.update());
}

animate();
