import Vector from 'victor';
import { Snake } from '.././src/snake';

describe('The Snake instance', () => {
  let snake: Snake;
  describe('setVelocity method', () => {
    describe('when velocity is at (0, 0)', () => {
      beforeEach(() => {
        snake = new Snake(new Vector(0, 0));
      });
      it("should change it's velocity to (0, -1) when expression holds 'UP'", () => {
        snake.setVelocity('UP');
        expect(snake.velocity.x).toBe(0);
        expect(snake.velocity.y).toBe(-1);
      });
      it("should change it's velocity to (0,1) when expression holds 'DOWN'", () => {
        snake.setVelocity('DOWN');
        expect(snake.velocity.x).toBe(0);
        expect(snake.velocity.y).toBe(1);
      });
      it("should change it's velocity to (-1, 0) when expression holds 'LEFT'", () => {
        snake = new Snake(new Vector(0, 0), [
          new Vector(0, 1),
          new Vector(0, 2),
          new Vector(0, 3),
          new Vector(0, 4),
          new Vector(0, 5),
          new Vector(0, 6)
        ])
        snake.setVelocity('LEFT');
        expect(snake.velocity.x).toBe(-1);
        expect(snake.velocity.y).toBe(0);
      });
      it("should change it's velocity to (1, 0) when expression holds 'RIGHT'", () => {
        snake.setVelocity('RIGHT');
        expect(snake.velocity.x).toBe(1);
        expect(snake.velocity.y).toBe(0);
      });
    });
  });

  describe('move method', () => {
    it('should move the snake up by one unit when velocity is "UP"', () => {
      snake = new Snake(Snake.directions.UP, [
        new Vector(0, 1),
        new Vector(0, 2),
        new Vector(0, 3),
        new Vector(0, 4),
        new Vector(0, 5),
        new Vector(0, 6)
      ]);
      snake.move();
      const expected = [
        new Vector(0, 0),
        new Vector(0, 1),
        new Vector(0, 2),
        new Vector(0, 3),
        new Vector(0, 4),
        new Vector(0, 5)
      ];
      expect(snake.position).toEqual(expected);
    });
    it('should move the snake down by one unit when velocity is "DOWN"', () => {
      snake = new Snake(Snake.directions.DOWN, [
        new Vector(0, 5),
        new Vector(0, 4),
        new Vector(0, 3),
        new Vector(0, 2),
        new Vector(0, 1),
        new Vector(0, 0)
      ]);
      snake.move();
      const expected = [
        new Vector(0, 6),
        new Vector(0, 5),
        new Vector(0, 4),
        new Vector(0, 3),
        new Vector(0, 2),
        new Vector(0, 1)
      ];
      expect(snake.position).toEqual(expected);
    });
    it('should move the snake left by one unit when velocity is "LEFT"', () => {
      snake = new Snake(Snake.directions.LEFT, [
        new Vector(-5, 0),
        new Vector(-4, 0),
        new Vector(-3, 0),
        new Vector(-2, 0),
        new Vector(-1, 0),
        new Vector(0, 0)
      ]);
      snake.move();
      const expected = [
        new Vector(-6, 0),
        new Vector(-5, 0),
        new Vector(-4, 0),
        new Vector(-3, 0),
        new Vector(-2, 0),
        new Vector(-1, 0)
      ];
      expect(snake.position).toEqual(expected);
    });
    it('should move the snake right by one unit when velocity is "RIGHT"', () => {
      snake = new Snake(Snake.directions.RIGHT, [
        new Vector(5, 0),
        new Vector(4, 0),
        new Vector(3, 0),
        new Vector(2, 0),
        new Vector(1, 0),
        new Vector(0, 0)
      ]);
      snake.move();
      const expected = [
        new Vector(6, 0),
        new Vector(5, 0),
        new Vector(4, 0),
        new Vector(3, 0),
        new Vector(2, 0),
        new Vector(1, 0)
      ];
      expect(snake.position).toEqual(expected);
    });
  });

  describe('grow method', () => {
    it('should grow snake by one unit when snake is going UP', () => {
      snake = new Snake(Snake.directions.UP, [
        new Vector(0, 1),
        new Vector(0, 2),
        new Vector(0, 3),
        new Vector(0, 4),
        new Vector(0, 5),
        new Vector(0, 6)
      ]);

      snake.grow();
      const expected = [
        new Vector(0, 1),
        new Vector(0, 2),
        new Vector(0, 3),
        new Vector(0, 4),
        new Vector(0, 5),
        new Vector(0, 6),
        new Vector(0, 7)
      ]
      expect(snake.position).toEqual(expected);
    });
    it('should grow snake by one unit when snake is going DOWN', () => {
      snake = new Snake(Snake.directions.DOWN, [
        new Vector(0, 5),
        new Vector(0, 4),
        new Vector(0, 3),
        new Vector(0, 2),
        new Vector(0, 1),
        new Vector(0, 0)
      ]);

      snake.grow();
      const expected = [
        new Vector(0, 5),
        new Vector(0, 4),
        new Vector(0, 3),
        new Vector(0, 2),
        new Vector(0, 1),
        new Vector(0, 0),
        new Vector(0, -1)
      ]
      expect(snake.position).toEqual(expected);
    });
    it('should grow snake by one unit when snake is going LEFT', () => {
      snake = new Snake(Snake.directions.LEFT, [
        new Vector(-5, 0),
        new Vector(-4, 0),
        new Vector(-3, 0),
        new Vector(-2, 0),
        new Vector(-1, 0),
        new Vector(0, 0)
      ]);

      snake.grow();
      const expected = [
        new Vector(-5, 0),
        new Vector(-4, 0),
        new Vector(-3, 0),
        new Vector(-2, 0),
        new Vector(-1, 0),
        new Vector(0, 0),
        new Vector(1, 0),
      ]
      expect(snake.position).toEqual(expected);
    });
    it('should grow snake by one unit when snake is going RIGHT', () => {
      snake = new Snake(Snake.directions.RIGHT, [
        new Vector(5, 0),
        new Vector(4, 0),
        new Vector(3, 0),
        new Vector(2, 0),
        new Vector(1, 0),
        new Vector(0, 0)
      ]);

      snake.grow();
      const expected = [
        new Vector(5, 0),
        new Vector(4, 0),
        new Vector(3, 0),
        new Vector(2, 0),
        new Vector(1, 0),
        new Vector(0, 0),
        new Vector(-1, 0),
      ]
      expect(snake.position).toEqual(expected);
    });
  });
});
