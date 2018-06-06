import { GameLoop } from './game-loop';
import { Board } from './board';
import { Snake } from './snake';
import Vector from 'victor';

const board = new Board(new Snake(new Vector(0, -1), [
  new Vector(29, 29),
  new Vector(29, 30),
  new Vector(29, 31),
  new Vector(29, 32),
  new Vector(29, 33),
  new Vector(29, 34)
]));
let keyboardInput: string;
const canvas = document.getElementById('snake') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const onkey = (event: KeyboardEvent, key: KeyboardEvent['key']) => {
  switch (key) {
    case 'ArrowDown':
      keyboardInput = 'DOWN';
      event.preventDefault();
      break;
    case 'ArrowUp':
      keyboardInput = 'UP';
      event.preventDefault();
      break;
    case 'ArrowLeft':
      keyboardInput = 'LEFT';
      event.preventDefault();
      break;
    case 'ArrowRight':
      keyboardInput = 'RIGHT';
      event.preventDefault();
      break;
  }
};

document.addEventListener('keydown', (event: KeyboardEvent) =>
  onkey(event, event.key)
);

const input = () => {
  if (keyboardInput) {
    board.snake.setVelocity(keyboardInput as keyof typeof Snake.directions);
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
