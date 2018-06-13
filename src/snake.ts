import Vector from 'victor';

/**
 * The Snake class contains a representation of a snake's position and velocity
 * along with the methods to move the snake and make it grow in length.
 * @class Snake
 */
export class Snake {
  private velocity_: Vector;
  private position_: Vector[];

  /**
   * A set of unit vectors representing directional velocities.
   * @static
   * @readonly
   * @memberof Snake
   */
  static readonly directions = {
    UP: (() => new Vector(0, -1))(),
    DOWN: (() => new Vector(0, 1))(),
    LEFT: (() => new Vector(-1, 0))(),
    RIGHT: (() => new Vector(1, 0))()
  };

  /**
   * Creates an instance of Snake.
   * @param {Vector} [velocity] A Vector containing the snake's velocity. Defaults to (1, 0).
   * @param {Vector[]} [position] An array of Vectors representing the snake's position on the board.
   * Defaults to [(6, 1), (5, 1), (4, 1), (3, 1), (2, 1), (1, 1)].
   */
  constructor(
    velocity: Vector = new Vector(1, 0),
    position: Vector[] = [
      new Vector(6, 1),
      new Vector(5, 1),
      new Vector(4, 1),
      new Vector(3, 1),
      new Vector(2, 1),
      new Vector(1, 1)
    ]
  ) {
    this.velocity_ = velocity;
    this.position_ = position;
  }
  /**
   * A Vector containing the snake's velocity.
   * @readonly
   * @type {Vector}
   * @memberof Snake
   */
  get velocity(): Vector {
    return this.velocity_;
  }
  /**
   * An array of Vectors representing the snake's position on the board.
   * @readonly
   * @type {Vector[]}
   * @memberof Snake
   */
  get position(): Vector[] {
    return this.position_;
  }

  /**
   * Grows the snake by one unit of length. It adds a section to the tail
   * in the opposite direction of the snake's velocity.
   * @memberof Snake
   */
  grow() {
    const tail: Vector = this.position_[this.position_.length - 1];
    const newTail: Vector = tail.clone().subtract(this.velocity_);
    this.position_.push(newTail);
  }

  /**
   * Moves the snake one unit in the direction of the snake's velocity.
   * @memberof Snake
   */
  move() {
    this.position_.pop();
    const newHeadPosition = this.position_[0].clone().add(this.velocity_);
    this.position_ = [newHeadPosition, ...this.position_];
  }

  /**
   * Sets the snake's velocity. If passed a velocity that is opposite of
   * the current velocity, the current velocity will not be changed
   * (the snake can't reverse direction).
   * @param {string} direction Valid string directions: "UP", "DOWN", "LEFT", "RIGHT".
   * @memberof Snake
   */
  setVelocity(direction: keyof typeof Snake.directions) {
    if (this.snakeWouldBeMovingBack_(direction)) {
      return;
    }
    this.velocity_ = Snake.directions[direction];
  }  
  /**
   * Checks if, given a certain direction vector, the snake would
   * be moving back onto itself. 
   * @private
   * @param {keyof typeof Snake.directions} direction
   * @memberof Snake
   */
  private snakeWouldBeMovingBack_(
    direction: keyof typeof Snake.directions
  ): boolean {
    const newHeadPosition = this.position_[0]
      .clone()
      .add(Snake.directions[direction]);
    if (
      newHeadPosition.x === this.position_[1].x &&
      newHeadPosition.y === this.position_[1].y
    )
      return true;
    return false;
  }
}

