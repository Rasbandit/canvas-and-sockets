const state = require('./state');

module.exports.respond = (io, socket) => {
  setTimeout(() => {
    io.emit('update', state);
  }, 1000 / 60);

  socket.on('keyPressed', (key) => {
    state.down[state.keys[key]] = true;
    io.emit('newDown', state.down);
  });

  socket.on('keyUp', (pressedKey) => {
    state.down[state.keys[pressedKey]] = false;
    state.pressed[state.keys[pressedKey]] = false;
    io.emit('newDown', state.down);
    io.emit('newPressed', state.pressed);
  });

  socket.on('gameStateChange', (newGameState) => {
    state.gameState = newGameState;
    io.emit('newGameState', state.gameState);
  });

  socket.on('fire', (bullet) => {
    if(state.visible) {
      state.bullets.push(bullet);
    }
    io.emit('fired', state.bullets);
  });
}
;
