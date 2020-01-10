import Im from 'seamless-immutable';
import { canAcceptValue, addSolverValue } from '../model';

const zeroToEight = Array.from(Array(9).keys());

const findEmptyCells = model =>
  Im(
    zeroToEight
      .map(row =>
        zeroToEight.map(col => ({
          row,
          col
        }))
      )
      .reduce((r, v) => r.concat(v), [])
      .filter(({ row, col }) => !model[row][col])
  );

const recurse = (model, showModel, emptyCells) => {
  if (showModel) showModel(model);

  if (emptyCells.length === 0) return model;

  const cell = emptyCells[0];
  const newEmptyCells = emptyCells.slice(1);
  for (let number = 1; number <= 9; number++) {
    if (canAcceptValue(model)(cell.row, cell.col)(number)) {
      const result = recurse(
        addSolverValue(model)(cell.row, cell.col)(number),
        showModel,
        newEmptyCells
      );
      if (result) return result;
    }
  }
};

const solve = (model, showModel) =>
  recurse(model, showModel, findEmptyCells(model));

export { solve, findEmptyCells };
