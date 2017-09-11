class InputHandeler {
  constructor(keys) {
    this.keys = {
      32: 'spacebar',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };
    this.down = {
      left: false,
      right: false,
      up: false,
      down: false,
      spacebar: false
    };
    this.pressed = {
      left: false,
      right: false,
      up: false,
      down: false,
      spacebar: false
    };

    socket.on('newDown', (pressedKeys) => {
      this.down = pressedKeys;
    });

    socket.on('newPressed', (downKeys) => {
      this.pressed = downKeys;
    });

    document.addEventListener('keydown', (e) => {
      if(this.keys[e.keyCode]) {
        socket.emit('keyPressed', e.keyCode);
      }
    });
    document.addEventListener('keyup', (e) => {
      if (this.keys[e.keyCode]) {
        socket.emit('keyUp', e.keyCode);
      }
    });
  }

  isDown(key) {
    return this.down[key];
  }

  isPressed(key) {
    if (this.pressed[key]) {
      return false;
    } else if (this.down[key]) {
      this.pressed[key] = true;
      return this.pressed[key];
    }
    return false;
  }
}
