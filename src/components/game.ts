import Vue from 'vue';
import Vector from 'victor';
import { Board } from '../board';
import { Snake } from '../snake';
import { GameLoop } from '../game-loop';
import '../audio/arcade_music_loop.wav';
import '../audio/lose_sound.wav';
import { waitForSeconds } from '../utils';

export const Game = Vue.extend({
  template: `
  <div style="margin-top: 10px">
    <p class="game">Score: {{score}}</p>
    <p class="game">Speed: {{speed}}%</p>
    <canvas ref="game" width="600px" height="600px" style="border: 1px solid black"></canvas>
  </div>  
  `,
  data: function(): {
    keyboardInput: { arrows: string | undefined; space: boolean };
    loop: GameLoop | undefined;
    score: number;
    speed: string;
  } {
    return {
      keyboardInput: { arrows: undefined, space: false },
      loop: undefined,
      score: 0,
      speed: '100'
    };
  },
  methods: {
    keyDownListener: function(event: KeyboardEvent) {
      this.onkey(event, event.key);
    },
    keyUpListener: function(event: KeyboardEvent) {
      if (event.key === ' ') this.keyboardInput.space = false;
    },
    onkey: function(event: KeyboardEvent, key: KeyboardEvent['key']) {
      switch (key) {
        case 'ArrowDown':
          this.keyboardInput.arrows = 'DOWN';
          event.preventDefault();
          break;
        case 'ArrowUp':
          this.keyboardInput.arrows = 'UP';
          event.preventDefault();
          break;
        case 'ArrowLeft':
          this.keyboardInput.arrows = 'LEFT';
          event.preventDefault();
          break;
        case 'ArrowRight':
          this.keyboardInput.arrows = 'RIGHT';
          event.preventDefault();
          break;
        case ' ':
          this.keyboardInput.space = true;
      }
    }
  },
  mounted: function() {
    const music = new Audio('./audio/arcade_music_loop.wav');
    music.loop = true;
    music.play();

    const gameOverSound = new Audio('./audio/lose_sound.wav');

    const board = new Board(
      new Snake(new Vector(0, -1), [
        new Vector(29, 29),
        new Vector(29, 30),
        new Vector(29, 31),
        new Vector(29, 32),
        new Vector(29, 33),
        new Vector(29, 34)
      ])
    );

    const ctx = (<HTMLCanvasElement>this.$refs.game).getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    document.addEventListener('keydown', this.keyDownListener);
    document.addEventListener('keyup', this.keyUpListener);

    const input = () => {
      if (this.keyboardInput.arrows) {
        board.snake.setVelocity(this.keyboardInput
          .arrows as keyof typeof Snake.directions);
        this.keyboardInput.arrows = undefined;
      }
      if (this.keyboardInput.space) {
        board.slowDown();
      } else {
        board.speedUp();
      }
    };

    let previousSnake: Vector[] = board.snake.position;
    let currentSnake: Vector[] = board.snake.position;
    const update = (step: number) => {
      previousSnake = [...board.snake.position];
      board.update();
      this.score = board.score;
      (<GameLoop>this.loop).slow = 12 - 6 * board.speed;
      this.speed = (board.speed * 100).toFixed(0);

      currentSnake = board.snake.position;
    };

    const gameOverAnimation = {
      fontSize: 0,
      soundPlayed: false
    };
    const render = (interp: number) => {
      ctx.clearRect(0, 0, 600, 600);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '18px serif';
      //feed
      ctx.fillText('*', (board.feed.x / 3) * 30, (board.feed.y / 3) * 30);

      //snake
      for (let i = 0; i < currentSnake.length - 1; i++) {
        if (previousSnake[i]) {
          ctx.fillText(
            'O',
            (currentSnake[i].x / 3) * 30 * interp +
              (previousSnake[i].x / 3) * 30 * (1 - interp),
            (currentSnake[i].y / 3) * 30 * interp +
              (previousSnake[i].y / 3) * 30 * (1 - interp)
          );
        } else {
          ctx.fillText(
            'O',
            (currentSnake[i].x / 3) * 30 * interp +
              (previousSnake[i - 1].x / 3) * 30 * (1 - interp),
            (currentSnake[i].y / 3) * 30 * interp +
              (previousSnake[i - 1].y / 3) * 30 * (1 - interp)
          );
        }
      }
      if (board.gameIsOver) {
        if (!gameOverAnimation.soundPlayed) {
          music.pause();
          music.currentTime = 0;
          gameOverSound.play();
          gameOverAnimation.soundPlayed = true;
        }        
        if (gameOverAnimation.fontSize <= 60) {
          gameOverAnimation.fontSize += 2;
        } else {
          waitForSeconds(3).then(() => {
            this.$emit('menu-option', 3);
          });
        }
        ctx.font = `${gameOverAnimation.fontSize}px serif`;
        ctx.fillText('GAME OVER', 300, 300);
      }
    };

    this.loop = new GameLoop({
      updateTimeStep: 1000 / 60,
      fpsFilterStrength: 20,
      slow: 12 - 6 * board.speed,
      input,
      update,
      render
    });

    this.loop.start();
  },
  destroyed: function() {
    document.removeEventListener('keydown', this.keyDownListener);
    document.removeEventListener('keyup', this.keyDownListener);
  }
});
