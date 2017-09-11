const state = require('../state');
const Game = require('./../classes/main');

const game = new Game();
game.run();

module.exports.respond = (io, socket) => {
  setInterval(() => {
    const converted = JSON.stringify(game.state);
    socket.emit('newState', converted);
  }, 10);

  socket.on('keyDown', (key) => {
    game.state.input.keyDown(key);
  });

  socket.on('keyUp', (key) => {
    game.state.input.keyUp(key);
  });
};
