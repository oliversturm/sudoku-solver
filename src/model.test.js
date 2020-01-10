import {
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
} from './model';

test('createEmptyModel', () => {
  const result = createEmptyModel();
  expect(result).toEqual([
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ]
  ]);
});

describe('modelFrom', () => {
  test('valid source', () => {
    const source = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    const result = modelFrom(source);
    expect(result).toEqual([
      [
        { val: 1, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        { val: 2, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        { val: 3, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        { val: 4, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 5, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 6, type: 'pre' },
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 7, type: 'pre' },
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 8, type: 'pre' },
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 9, type: 'pre' }
      ]
    ]);
  });

  test('irregular length rows', () => {
    const source = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    const result = modelFrom(source);
    expect(result).toEqual([
      [
        { val: 1, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        { val: 3, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        { val: 4, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 6, type: 'pre' },
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 7, type: 'pre' },
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 8, type: 'pre' },
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 9, type: 'pre' }
      ]
    ]);
  });

  test('invalid individual values', () => {
    const source = [
      [11, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 77, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    const result = modelFrom(source);
    expect(result).toEqual([
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        { val: 2, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        { val: 3, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        { val: 4, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 5, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 6, type: 'pre' },
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 8, type: 'pre' },
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 9, type: 'pre' }
      ]
    ]);
  });

  test('invalid combined values in column', () => {
    const source = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    const result = modelFrom(source);
    expect(result).toEqual([
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ]
    ]);
  });

  test('invalid combined values in row', () => {
    const source = [
      [1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    const result = modelFrom(source);
    expect(result).toEqual([
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ]
    ]);
  });
});

describe('isValidSource', () => {
  test('valid', () => {
    const source = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    expect(isValidSource(source)).toBeTruthy();
  });
  test('row collision', () => {
    const source = [
      [1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    expect(isValidSource(source)).toBeFalsy();
  });
  test('column collision', () => {
    const source = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    expect(isValidSource(source)).toBeFalsy();
  });
  test('segment collision', () => {
    const source = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 5, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    expect(isValidSource(source)).toBeFalsy();
  });
});

describe('isValidModel', () => {
  test('valid', () => {
    const source = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    const model = modelFrom(source);
    expect(isValidModel(model)).toBeTruthy();
  });
  test('row collision', () => {
    const model = [
      [
        { val: 1, type: 'pre' },
        { val: 1, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        { val: 2, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        { val: 3, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        { val: 4, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 5, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 6, type: 'pre' },
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 7, type: 'pre' },
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 8, type: 'pre' },
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 9, type: 'pre' }
      ]
    ];
    expect(isValidModel(model)).toBeFalsy();
  });
  test('column collision', () => {
    const model = [
      [
        { val: 1, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        { val: 1, type: 'pre' },
        { val: 2, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        { val: 3, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        { val: 4, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 5, type: 'pre' },
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 6, type: 'pre' },
        undefined,
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 7, type: 'pre' },
        undefined,
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 8, type: 'pre' },
        undefined
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { val: 9, type: 'pre' }
      ]
    ];
    expect(isValidModel(model)).toBeFalsy();
  });
});

describe('hasNoCollisions', () => {
  test('valid', () => {
    const seq = [0, 9, 0, 3, 5, 7, 0, 1, 2];
    expect(hasNoCollisions(seq)).toBeTruthy();
  });

  test('invalid', () => {
    const seq = [1, 9, 0, 3, 5, 7, 0, 1, 2];
    expect(hasNoCollisions(seq)).toBeFalsy();
  });
});

describe('sequences', () => {
  const source = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 9]
  ];
  const model = modelFrom(source);

  test('sourceRowSequence', () => {
    expect(sourceRowSequence(source)(1)).toEqual([0, 2, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('sourceColSequence', () => {
    expect(sourceColSequence(source)(1)).toEqual([0, 2, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('modelRowSequence', () => {
    expect(modelRowSequence(model)(1)).toEqual([0, 2, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('modelColSequence', () => {
    expect(modelColSequence(model)(1)).toEqual([0, 2, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('modelSegmentSequence', () => {
    expect(modelSegmentSequence(model)(0, 0)).toEqual([
      1,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      3
    ]);
  });

  test('modelSegmentSequence 2', () => {
    expect(modelSegmentSequence(model)(7, 7)).toEqual([
      7,
      0,
      0,
      0,
      8,
      0,
      0,
      0,
      9
    ]);
  });
});

describe('accepting values', () => {
  const source = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 9]
  ];
  const model = modelFrom(source);

  test('canRowAcceptValue true', () => {
    expect(canRowAcceptValue(model)(0, 1)(5)).toBeTruthy();
  });

  test('canRowAcceptValue false', () => {
    expect(canRowAcceptValue(model)(0, 1)(1)).toBeFalsy();
  });

  test('canColAcceptValue true', () => {
    expect(canColAcceptValue(model)(0, 1)(5)).toBeTruthy();
  });

  test('canColAcceptValue false', () => {
    expect(canColAcceptValue(model)(0, 1)(2)).toBeFalsy();
  });

  test('canSegmentAcceptValue true', () => {
    expect(canSegmentAcceptValue(model)(0, 1)(5)).toBeTruthy();
  });

  test('canSegmentAcceptValue false', () => {
    expect(canSegmentAcceptValue(model)(0, 1)(3)).toBeFalsy();
  });

  test('canAcceptValue true', () => {
    expect(canAcceptValue(model)(5, 8)(4)).toBeTruthy();
  });

  test('canAcceptValue false for row collision', () => {
    expect(canAcceptValue(model)(5, 8)(9)).toBeFalsy();
  });

  test('canAcceptValue false for col collision', () => {
    expect(canAcceptValue(model)(5, 8)(6)).toBeFalsy();
  });

  test('canAcceptValue false for segment collision', () => {
    expect(canAcceptValue(model)(4, 5)(4)).toBeFalsy();
  });
});

describe('modifications', () => {
  const model = createEmptyModel();

  test('addSolverValue', () => {
    const result = addSolverValue(model)(0, 1)(7);
    expect(result[0][1]).toEqual({ val: 7, type: 'solver' });
  });

  test('setPreValue number', () => {
    const result = setPreValue(model)(0, 1)(7);
    expect(result[0][1]).toEqual({ val: 7, type: 'pre' });
  });

  test('setPreValue non-number', () => {
    const result = setPreValue(model)(0, 1)(7);
    expect(result[0][1]).toEqual({ val: 7, type: 'pre' });
    const result2 = setPreValue(model)(0, 1)(undefined);
    expect(result2[0][1]).toBeUndefined();
  });
});
