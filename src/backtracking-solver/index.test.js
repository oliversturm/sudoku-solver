import { modelFrom } from '../model';
import { findEmptyCells, solve } from '.';

test('findEmptyCells', () => {
  const source = [
    [6, 3, 2, 7, 8, 1, 9, 4, 5],
    [4, 8, 7, 5, 9, 6, 2, 1, 3],
    [5, 1, 0, 2, 4, 3, 8, 7, 6],
    [8, 6, 4, 3, 5, 2, 7, 9, 1],
    [7, 5, 1, 0, 6, 8, 3, 2, 4],
    [2, 9, 3, 1, 7, 4, 6, 5, 8],
    [9, 4, 5, 6, 0, 7, 1, 8, 2],
    [1, 7, 6, 8, 2, 5, 4, 3, 9],
    [3, 2, 8, 4, 1, 9, 5, 0, 7]
  ];
  const model = modelFrom(source);

  expect(findEmptyCells(model)).toEqual([
    { row: 2, col: 2 },
    { row: 4, col: 3 },
    { row: 6, col: 4 },
    { row: 8, col: 7 }
  ]);
});

test('solve', () => {
  const source = [
    [6, 3, 2, 7, 8, 1, 9, 4, 5],
    [4, 8, 7, 5, 9, 6, 2, 1, 3],
    [5, 1, 0, 2, 4, 3, 8, 7, 6],
    [8, 6, 4, 3, 5, 2, 7, 9, 1],
    [7, 5, 1, 0, 6, 8, 3, 2, 4],
    [2, 9, 3, 1, 7, 4, 6, 5, 8],
    [9, 4, 5, 6, 0, 7, 1, 8, 2],
    [1, 7, 6, 8, 2, 5, 4, 3, 9],
    [3, 2, 8, 4, 1, 9, 5, 0, 7]
  ];
  const model = modelFrom(source);

  expect(solve(model)).toEqual([
    [
      { type: 'pre', val: 6 },
      { type: 'pre', val: 3 },
      { type: 'pre', val: 2 },
      { type: 'pre', val: 7 },
      { type: 'pre', val: 8 },
      { type: 'pre', val: 1 },
      { type: 'pre', val: 9 },
      { type: 'pre', val: 4 },
      { type: 'pre', val: 5 }
    ],
    [
      { type: 'pre', val: 4 },
      { type: 'pre', val: 8 },
      { type: 'pre', val: 7 },
      { type: 'pre', val: 5 },
      { type: 'pre', val: 9 },
      { type: 'pre', val: 6 },
      { type: 'pre', val: 2 },
      { type: 'pre', val: 1 },
      { type: 'pre', val: 3 }
    ],
    [
      { type: 'pre', val: 5 },
      { type: 'pre', val: 1 },
      { type: 'solver', val: 9 },
      { type: 'pre', val: 2 },
      { type: 'pre', val: 4 },
      { type: 'pre', val: 3 },
      { type: 'pre', val: 8 },
      { type: 'pre', val: 7 },
      { type: 'pre', val: 6 }
    ],
    [
      { type: 'pre', val: 8 },
      { type: 'pre', val: 6 },
      { type: 'pre', val: 4 },
      { type: 'pre', val: 3 },
      { type: 'pre', val: 5 },
      { type: 'pre', val: 2 },
      { type: 'pre', val: 7 },
      { type: 'pre', val: 9 },
      { type: 'pre', val: 1 }
    ],
    [
      { type: 'pre', val: 7 },
      { type: 'pre', val: 5 },
      { type: 'pre', val: 1 },
      { type: 'solver', val: 9 },
      { type: 'pre', val: 6 },
      { type: 'pre', val: 8 },
      { type: 'pre', val: 3 },
      { type: 'pre', val: 2 },
      { type: 'pre', val: 4 }
    ],
    [
      { type: 'pre', val: 2 },
      { type: 'pre', val: 9 },
      { type: 'pre', val: 3 },
      { type: 'pre', val: 1 },
      { type: 'pre', val: 7 },
      { type: 'pre', val: 4 },
      { type: 'pre', val: 6 },
      { type: 'pre', val: 5 },
      { type: 'pre', val: 8 }
    ],
    [
      { type: 'pre', val: 9 },
      { type: 'pre', val: 4 },
      { type: 'pre', val: 5 },
      { type: 'pre', val: 6 },
      { type: 'solver', val: 3 },
      { type: 'pre', val: 7 },
      { type: 'pre', val: 1 },
      { type: 'pre', val: 8 },
      { type: 'pre', val: 2 }
    ],
    [
      { type: 'pre', val: 1 },
      { type: 'pre', val: 7 },
      { type: 'pre', val: 6 },
      { type: 'pre', val: 8 },
      { type: 'pre', val: 2 },
      { type: 'pre', val: 5 },
      { type: 'pre', val: 4 },
      { type: 'pre', val: 3 },
      { type: 'pre', val: 9 }
    ],
    [
      { type: 'pre', val: 3 },
      { type: 'pre', val: 2 },
      { type: 'pre', val: 8 },
      { type: 'pre', val: 4 },
      { type: 'pre', val: 1 },
      { type: 'pre', val: 9 },
      { type: 'pre', val: 5 },
      { type: 'solver', val: 6 },
      { type: 'pre', val: 7 }
    ]
  ]);
});
