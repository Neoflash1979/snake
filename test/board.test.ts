import Vector from 'victor';
import { Board } from '.././src/board';
import { Snake } from '.././src/snake';

describe('The Board constructor', () => {
  it('throws an error when trying to create a snake outside of the board', () => {
    function createBoard() {
      new Board(
        new Snake(undefined, [
          new Vector(0, -6),
          new Vector(0, -5),
          new Vector(0, -4),
          new Vector(0, -3),
          new Vector(0, -2),
          new Vector(0, -1)
        ])
      );
    }
    expect(createBoard).toThrow();
  });
});

describe('The Board instance', () => {
  describe('update method', () => {
    it("moves the snake on the board according to it's velocity", () => {
      const board = new Board(new Snake());
      board.update();
      const expected = [
        new Vector(7, 1),
        new Vector(6, 1),
        new Vector(5, 1),
        new Vector(4, 1),
        new Vector(3, 1),
        new Vector(2, 1)
      ];
      expect(board.snake.position).toEqual(expected);
    });
    describe('when there is no Feed on the board', () => {
      it('creates a feed at a random place on the board', () => {
        const board = new Board(new Snake());
        board.update();
        expect(board.feed).toBeDefined();
        expect(board.feed.x).toBeGreaterThan(0);
        expect(board.feed.y).toBeGreaterThan(0);
        expect(board.feed.x).toBeLessThan(board.size - 1);
        expect(board.feed.y).toBeLessThan(board.size - 1);
      });
    });
    describe('when the snake moves onto istelf', () => {
      it('sets the isGameOver property to true', () => {
        const board = new Board(new Snake(new Vector(0, -1), [          
          new Vector(4, 3),
          new Vector(5, 3),
          new Vector(5, 2),
          new Vector(4, 2),
          new Vector(3, 2),
          new Vector(2, 2)
        ]));
        board.update();
        
        expect(board.gameIsOver).toBe(true);
      });
    });
  });
});
