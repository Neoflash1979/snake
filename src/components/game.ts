import Vue from "vue";
import Vector from 'victor';
import { Board } from "../board";
import { Snake } from "../snake";
import { GameLoop } from "../game-loop";

export const Game = Vue.extend({
  template: `
  <canvas ref="game" width="600px" height="600px" style="border: 1px solid black"></canvas>
  `,
  data: function(): {keyboardInput: string | undefined} {
    return {
      keyboardInput: undefined
    }
  },
  methods: {
    keyDownListener: function (event: KeyboardEvent) {
      this.onkey(event, event.key)
    },
    onkey: function (event: KeyboardEvent, key: KeyboardEvent['key']) {
      switch (key) {
        case 'ArrowDown':
          this.keyboardInput = 'DOWN';
          event.preventDefault();
          break;
        case 'ArrowUp':
          this.keyboardInput = 'UP';
          event.preventDefault();
          break;
        case 'ArrowLeft':
          this.keyboardInput = 'LEFT';
          event.preventDefault();
          break;
        case 'ArrowRight':
          this.keyboardInput = 'RIGHT';
          event.preventDefault();
          break;
      }
    }    
  },
  mounted: function() {
    const board = new Board(new Snake(new Vector(0, -1), [
      new Vector(29, 29),
      new Vector(29, 30),
      new Vector(29, 31),
      new Vector(29, 32),
      new Vector(29, 33),
      new Vector(29, 34)
    ]));    
    
    const ctx = (<HTMLCanvasElement> this.$refs.game).getContext('2d') as CanvasRenderingContext2D;     
    
    document.addEventListener('keydown', this.keyDownListener);
    
    const input = () => {
      if (this.keyboardInput) {
        board.snake.setVelocity(this.keyboardInput as keyof typeof Snake.directions);
        this.keyboardInput = undefined;
      }
    };
    
    let previousSnake: Vector[];
    let currentSnake: Vector[];
    const update = (step: number) => {
      previousSnake = board.snake.position;
      board.update();
      currentSnake = board.snake.position;
    };
    
    const render = (interp: number) => {
      ctx.clearRect(0, 0, 600, 600);
      ctx.font = '18px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      //feed
      ctx.fillText('*', board.feed.x / 3 * 30, board.feed.y / 3 * 30);
    
      //snake
      for (let i = 0; i < currentSnake.length - 1; i++) {
        ctx.fillText(
          'O',
          currentSnake[i].x / 3 * 30 * interp + previousSnake[i].x / 3 * 30 * (1 - interp),
          currentSnake[i].y / 3 * 30 * interp + previousSnake[i].y / 3 * 30 * (1 - interp)
        );
      }  
      
    };
    
    const loop = new GameLoop({
      updateTimeStep: 1000 / 60,
      fpsFilterStrength: 20,
      slow: 6,
      input,
      update,
      render
    });
    
    loop.start();
  },
  destroyed: function() {
    document.removeEventListener('keydown', this.keyDownListener);
  }
})