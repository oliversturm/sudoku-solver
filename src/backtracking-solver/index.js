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

const recurseNumber = (model, showModel, emptyCells, cell, number) => {
  if (number > 9) return Promise.resolve();

  if (canAcceptValue(model)(cell.row, cell.col)(number)) {
    return recurse(
      addSolverValue(model)(cell.row, cell.col)(number),
      showModel,
      emptyCells
    ).then(result => {
      if (result) return result;
      else return recurseNumber(model, showModel, emptyCells, cell, number + 1);
    });
  }
  return recurseNumber(model, showModel, emptyCells, cell, number + 1);
};

const recurse = (model, showModel, emptyCells) => {
  if (showModel) showModel(model);

  return new Promise(res => {
    if (emptyCells.length === 0) res(model);

    const cell = emptyCells[0];
    const newEmptyCells = emptyCells.slice(1);

    res(recurseNumber(model, showModel, newEmptyCells, cell, 1));
  });
};

const solve = (model, showModel) =>
  recurse(model, showModel, findEmptyCells(model));

export { solve, findEmptyCells };
