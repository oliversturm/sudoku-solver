import Im from 'seamless-immutable';

const zeroToEight = Array.from(Array(9).keys());

const createEmptyModel = () => Im(zeroToEight.map(() => new Array(9)));

const hasNoCollisions = seq =>
  seq.reduce(
    (r, v) =>
      r.result && v
        ? { found: r.found.concat(v), result: !r.found.includes(v) }
        : r,
    { found: Im([]), result: true }
  ).result;

const sourceRowSequence = source => row => source[row];
const sourceColSequence = source => col => source.map(row => row[col]);
const extractCellValue = cell => (cell ? cell.val : 0);
const modelRowSequence = model => row => model[row].map(extractCellValue);
const modelColSequence = model => col =>
  model.map(row => extractCellValue(row[col]));

const boardSegmentSequence = extract => board => (row, col) => {
  const baseIndex = val => Math.floor(val / 3) * 3;
  const rowBaseIndex = baseIndex(row);
  const colBaseIndex = baseIndex(col);
  return Im(
    Array.from(
      (function*() {
        for (let rowOffset = 0; rowOffset < 3; rowOffset++)
          for (let colOffset = 0; colOffset < 3; colOffset++)
            yield extract(
              board[rowBaseIndex + rowOffset][colBaseIndex + colOffset]
            );
      })()
    )
  );
};

const modelSegmentSequence = boardSegmentSequence(extractCellValue);
const sourceSegmentSequence = boardSegmentSequence(x => x);

const isValidBoard = (rowSequence, colSequence, segmentSequence) => board => {
  const sequences = [
    ...zeroToEight.map(rowSequence(board)),
    ...zeroToEight.map(colSequence(board)),
    ...[
      [0, 0],
      [0, 3],
      [0, 6],
      [3, 0],
      [3, 3],
      [3, 6],
      [6, 0],
      [6, 3],
      [6, 6]
    ].map(([row, col]) => segmentSequence(board)(row, col))
  ];
  return sequences.reduce((r, v) => r && hasNoCollisions(v), true);
};
const isValidSource = isValidBoard(
  sourceRowSequence,
  sourceColSequence,
  sourceSegmentSequence
);
const isValidModel = isValidBoard(
  modelRowSequence,
  modelColSequence,
  modelSegmentSequence
);

const modelFrom = source =>
  isValidSource(source)
    ? Im(
        source.map(row =>
          row.length === 9
            ? row.map(cell => {
                const val = parseInt(cell);
                return val && val <= 9 ? { val, type: 'pre' } : undefined;
              })
            : new Array(9)
        )
      )
    : createEmptyModel();

const canRowAcceptValue = model => (row, col) => val =>
  hasNoCollisions(modelRowSequence(model)(row).set(col, val));
const canColAcceptValue = model => (row, col) => val =>
  hasNoCollisions(modelColSequence(model)(col).set(row, val));
const canSegmentAcceptValue = model => (row, col) => val =>
  hasNoCollisions(
    modelSegmentSequence(model)(row, col).set((row % 3) * 3 + (col % 3), val)
  );

const canAcceptValue = model => (row, col) => val =>
  [canRowAcceptValue, canColAcceptValue, canSegmentAcceptValue].reduce(
    (r, v) => r && v(model)(row, col)(val),
    true
  );

const addSolverValue = model => (row, col) => val =>
  model.setIn([row, col], { val, type: 'solver' });

const setPreValue = model => (row, col) => val => {
  const parsedValue = parseInt(val);
  return model.setIn(
    [row, col],
    parsedValue && parsedValue <= 9
      ? { val: parsedValue, type: 'pre' }
      : undefined
  );
};

export {
  createEmptyModel,
  modelFrom,
  isValidSource,
  isValidModel,
  sourceRowSequence,
  sourceColSequence,
  modelRowSequence,
  modelColSequence,
  modelSegmentSequence,
  hasNoCollisions,
  canRowAcceptValue,
  canColAcceptValue,
  canSegmentAcceptValue,
  canAcceptValue,
  addSolverValue,
  setPreValue
};
