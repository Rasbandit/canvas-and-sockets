import io from 'socket.io-client';
import GameState from './GameState';
import Canvas from './canvas';
import STATES from './../references/gameStates';
import Asteroid from './Asteroid';
import Ship from './Ship';
import InputHandeler from './InputHandeler';

// const socket = io();


export default class Game {
  constructor() {
    this.canvas = new Canvas(640, 480);

    this.input = new InputHandeler({
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32
    });

    this.canvas.ctx.strokeStyle = '#fff';

    this.state = {
      currentState: null,
      nextState: STATES.GAME
    };
    socket.on('newState', (state) => {
      this.state = JSON.parse(state);
      // console.log(this.state);
      this.state.currentState = Object.setPrototypeOf(this.state.currentState, GameState.prototype);
      this.state.currentState.asteroids.map(asteroid => Object.setPrototypeOf(asteroid, Asteroid.prototype));
      this.state.currentState.ship = Object.setPrototypeOf(this.state.currentState.ship, Ship.prototype);
    });
  }

  run() {
    this.canvas.animate(() => {
      // if(this.state.nextState !== STATES.NO_CHANGE) {
      //   switch (this.state.nextState) {
      //     case STATES.MENU:
      //       // this.currentState = new State(this);
      //       break;
      //     case STATES.GAME:
      //       this.state.currentState = new GameState(this);
      //       break;
      //     case STATES.END:
      //       // this.currentState = new State(this);
      //       break;
      //     default:
      //       break;
      //   }
      //   this.state.nextState = STATES.NO_CHANGE;
      // }
      if(this.state.currentState !== null) {
        this.state.currentState.handleInputs(this.input);
        // this.state.currentState.update();
        this.state.currentState.render(this.canvas.ctx);
      }
    });
  }
}
