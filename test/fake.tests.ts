/* eslint-disable @typescript-eslint/no-unused-vars */
import test from 'ava';
// Births: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.
// Dead cell with 3 neighbors will become alive

// Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.
// Alive cell with 0 neighbors will die

// Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation.
// Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.

function createGrid() {
  let cellState = true;
  const grid = {
    setAlive: (_x: number, _y: number) => {
      //
    },
    advance: () => {
      cellState = false;
    },
    isCellAlive: (_x: number, _y: number): boolean => {
      return cellState;
    },
  };

  return grid;
}

test('Cell can be set to alive', (t) => {
  const grid = createGrid();

  grid.setAlive(0, 0);

  t.deepEqual(grid.isCellAlive(0, 0), true);
});

test('Alive cell with 0 neighbors will die', (t) => {
  const grid = createGrid();

  grid.setAlive(0, 0);
  grid.advance();

  t.deepEqual(grid.isCellAlive(0, 0), false);
});

// Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation.
// Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.
