import _ from 'lodash';
import { canAcceptValue, addSolverValue } from '../model';

const zeroToEight = Array.from(Array(9).keys());

const findEmptyCells = model =>
  zeroToEight
    .map(row =>
      zeroToEight.map(col => ({
        row,
        col
      }))
    )
    .reduce((r, v) => r.concat(v), [])
    .filter(({ row, col }) => !model[row][col]);

const recurseNumber = (model, showModel, emptyCells, cell, number) => {
  if (number > 9) return;

  if (canAcceptValue(model)(cell.row, cell.col)(number)) {
    const result = recurse(
      addSolverValue(model)(cell.row, cell.col)(number),
      showModel,
      emptyCells
    );
    if (result) return result;
  }
  return recurseNumber(model, showModel, emptyCells, cell, number + 1);
};

const recurse = (model, showModel, emptyCells) => {
  if (showModel) showModel(model);

  if (emptyCells.length === 0) return model;

  const cell = emptyCells[0];
  const newEmptyCells = emptyCells.slice(1);

  return recurseNumber(model, showModel, newEmptyCells, cell, 1);
};

const solve = (model, showModel, processEmptyCells) => {
  const emptyCells = findEmptyCells(model);
  const processedEmptyCells = (
    { reverse: _.reverse, shuffle: _.shuffle }[processEmptyCells] || (x => x)
  )(emptyCells);
  return recurse(model, showModel, processedEmptyCells);
};

export { solve, findEmptyCells };
