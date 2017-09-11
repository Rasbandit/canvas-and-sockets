const socket = io();

const STATES = {
  NO_CHANGE: 0,
  MENU: 1,
  GAME: 2,
  END: 3
};

const FIRE_SOUND = new Audio('./../sounds/fire.wav');
const THRUST_SOUND = new Audio('./../sounds/thrust.wav');
const BIG_EXPLOSION_SOUND = new Audio('./../sounds/bangLarge.wav');
const MEDIUM_EXPLOSION_SOUND = new Audio('./../sounds/bangMedium.wav');
const SMALL_EXPLOSION_SOUND = new Audio('./../sounds/bangSmall.wav');

class Game {
  constructor() {
    this.width = window.innerWidth;
    this.canvas = new Canvas(640, 480);

    this.input = new InputHandeler({
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32
    });

    this.canvas.ctx.strokeStyle = '#fff';

    this.currentState = null;

    socket.on('newGameState', (state) => {
      this.nextState = state;
    });

    this.nextState = STATES.MENU;
  }

  run() {
    this.canvas.animate(() => {
      if(this.nextState !== STATES.NO_CHANGE) {
        switch(this.nextState) {
          case STATES.MENU:
            this.currentState = new MenuState(this);
            break;
          case STATES.GAME:
            this.currentState = new GameState(this);
            break;
          case STATES.END:
            this.currentState = new State(this);
            break;
          default:
            break;
        }
        game.canvas.canvas.addEventListener('click', () => {});
        this.nextState = STATES.NO_CHANGE;
      }
      this.currentState.handleInputs(this.input);
      this.currentState.update();
      this.currentState.render(this.canvas.ctx);
    });
  }
}
