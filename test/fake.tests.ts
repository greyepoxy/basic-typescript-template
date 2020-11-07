/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import test from 'ava';

// Today we'll be working on Conway's game of life.

// The game is a cellular automaton, where cells live or die according to a set of four rules:

// Births: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.
// Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.
// Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation.
// Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.

// Here is a working example to play around with

// Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.
test('A cell with 0 neighbors will die on generation advance', (t) => {
  const grid = new Grid([{ x: 0, y: 0 }]);

  t.deepEqual(grid.isAlive({ x: 0, y: 0 }), true);

  t.deepEqual(grid.advanceOneGeneration().isAlive({ x: 0, y: 0 }), false);
});

test('A cell with 3 neighbors will continue to live on generation advance', (t) => {
  const grid = new Grid([
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
  ]);

  t.deepEqual(grid.isAlive({ x: 1, y: 1 }), true);

  t.deepEqual(grid.advanceOneGeneration().isAlive({ x: 1, y: 1 }), true);
});

interface Cell {
  x: number;
  y: number;
}

function isCellAlive(cell: Cell, aliveCells: Array<Cell>): boolean {
  return (
    aliveCells.find((aliveCell) => aliveCell.x === cell.x && aliveCell.y === cell.y) !== undefined
  );
}

class Grid {
  private aliveCells: Array<Cell>;
  constructor(aliveCells: Array<Cell>) {
    this.aliveCells = aliveCells;
  }
  isAlive(cell: Cell) {
    return isCellAlive(cell, this.aliveCells);
  }

  advanceOneGeneration(): Grid {
    const advancedGrid = this.aliveCells
      .map((aliveCell) => {
        if (
          isCellAlive({ x: aliveCell.x - 1, y: aliveCell.y }, this.aliveCells) ||
          isCellAlive({ x: aliveCell.x, y: aliveCell.y - 1 }, this.aliveCells) ||
          isCellAlive({ x: aliveCell.x + 1, y: aliveCell.y }, this.aliveCells) ||
          isCellAlive({ x: aliveCell.x, y: aliveCell.y + 1 }, this.aliveCells)
        ) {
          return aliveCell;
        }
        return null;
      })
      .filter((cell): cell is Cell => cell !== null);

    return new Grid(advancedGrid);
  }
}
