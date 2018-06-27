import Vector from 'victor';
import { Snake } from './snake';
import { getRandomIntInclusive } from './utils';

/**
 * The Board class represents all the entities of the Snake game,
 * including the snake and the feed and methods to manipulate them.
 * @class Board
 */
export class Board {
  private stateStore_: Board[] = [];
  private feed_!: Vector;
  private size_: number = 60;
  private score_: number = 0;
  private speed_: number = 1;
  private gameIsOver_: boolean = false;
  private feedValue_ = 10;
  private speedIncrement_ = 0.01;
  private slowDownMode_ = false;

  /**
   * Creates an instance of Board.
   * @param {Snake} snake_
   * @memberof Board
   */
  constructor(private snake_: Snake) {
    if (this.snakeIsOutsideBoard()) {
      throw new Error('The Snake has to be created inside the board.');
    }
    this.generateFeed();
  }

  get feed() {
    return this.feed_;
  }
  get gameIsOver() {
    return this.gameIsOver_;
  }

  get score() {
    return this.score_;
  }

  get size() {
    return this.size_;
  }
  get snake() {
    return this.snake_;
  }

  get speed() {
    return this.speed_;
  }

  slowDown() {
    if (!this.slowDownMode_) {
      this.speed_ /= 2;
      this.slowDownMode_ = true;
    }
  }

  speedUp() {
    if (this.slowDownMode_) {
      this.speed_ *= 2;
      this.slowDownMode_ = false;
    }
  }

  /**
   * Updates the game state.
   * @returns
   * @memberof Board
   */
  update() {
    if (!this.gameIsOver_) {
      this.saveGameState();
      this.snake_.move();
      if (this.snakeIsOutsideBoard() || this.snakeIsOnItself()) {
        this.gameIsOver_ = true;
        return;
      }
      if (this.snakeIsOnFeed()) {
        if (this.slowDownMode_) {
          this.score_ += this.feedValue_ / 2;
          this.speed_ += this.speedIncrement_ / 2;
        } else {
          this.score_ += this.feedValue_;
          this.speed_ += this.speedIncrement_;
        }
        this.snake_.grow();
        this.generateFeed();
      }
    }
  }

  saveGameState() {
    if(this.stateStore_.length = 15) {
      this.stateStore_.shift();
    }
    this.stateStore_.push(this);
  }

  /**
   * Randomly generates a new position for the feed
   * inside the game play area without being to close to the edge.
   * @private
   * @memberof Board
   */
  private generateFeed() {
    const x = getRandomIntInclusive(2, this.size_ - 2);
    const y = getRandomIntInclusive(2, this.size_ - 2);
    this.feed_ = new Vector(x, y);
    if (this.snakeIsOnFeed()) this.generateFeed();
  }

  /**
   * Checks if snake has collided with the feed
   * @private
   * @returns {boolean}
   * @memberof Board
   */
  private snakeIsOnFeed(): boolean {
    return this.snake_.position.some(vec => {
      return vec.x === this.feed_.x && vec.y === this.feed_.y;
    });
  }

  /**
   * Checks if the snake has collided with itself
   * @private
   * @returns {boolean}
   * @memberof Board
   */
  private snakeIsOnItself(): boolean {
    const snake: Vector[] = this.snake_.position;
    const head: Vector = snake[0];

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
  }

  /**
   * Checks if the snake's position falls outside the game limits
   * @private
   * @returns {boolean}
   * @memberof Board
   */
  private snakeIsOutsideBoard(): boolean {
    return this.snake_.position.some(vec => {
      if (
        vec.x < 1 ||
        vec.x > this.size_ - 1 ||
        vec.y < 1 ||
        vec.y > this.size_ - 1
      )
        return true;
      return false;
    });
  }
}
