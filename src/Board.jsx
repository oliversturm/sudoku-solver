import React, { useState, useMemo, useCallback } from 'react';
import _ from 'lodash';
import './Board.css';
import CellEditor from './CellEditor';
import {
  setPreValue,
  isValidModel,
  modelFrom,
  createEmptyModel,
} from './model';

const editorChange = (model, setModel, row, col) => (e) => {
  setModel(setPreValue(model)(row, col)(e.target.value));
};

const cols = function* (model, setModel, row, count) {
  for (let i = 0; i < count; i++)
    yield (
      <td key={`col${row}${i}`} className="board">
        <CellEditor
          onChange={editorChange(model, setModel, row, i)}
          cell={model[row][i]}
        />
      </td>
    );
};

const rows = function* (model, setModel, count) {
  for (let i = 0; i < count; i++)
    yield (
      <tr key={`row${i}`} className="board">
        {Array.from(cols(model, setModel, i, 9))}
      </tr>
    );
};

const runSolver = (model, showModel, processEmptyCells) => {
  const solverWorker = new Worker(
    new URL('./backtracking-solver/solver.worker.js', import.meta.url),
    { type: 'module' } // note that this doesn't in Firefox 110 at dev time -- build is fine
  );
  const sm = _.debounce(showModel, 30, { leading: true, maxWait: 200 });
  return new Promise((res) => {
    solverWorker.onmessage = (e) => {
      const { type, model } = e.data;
      sm(model);
      if (type === 'final') {
        solverWorker.terminate();
        sm.flush();
        res(model);
      }
    };
    solverWorker.postMessage({ model, processEmptyCells });
  });
};

const demoBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const Board = () => {
  const [model, setModel] = useState(modelFrom(demoBoard));
  const modelIsValid = useMemo(() => isValidModel(model), [model]);
  const [status, setStatus] = useState('');
  const [reverse, setReverse] = useState(true);
  const reverseChanged = useCallback(
    (e) => setReverse(e.target.checked),
    [setReverse]
  );
  const solveClick = useCallback(() => {
    return runSolver(model, setModel, reverse ? 'reverse' : '').then(
      (result) => {
        if (result) {
          setStatus('Success');
        } else {
          setStatus("Can't solve");
        }
      }
    );
  }, [model, setModel, setStatus, reverse]);
  const clear = useCallback(() => {
    setModel(createEmptyModel());
  }, [setModel]);
  const reset = useCallback(() => {
    setModel(modelFrom(demoBoard));
  }, [setModel]);

  return (
    <div>
      <table className={`board ${modelIsValid ? '' : 'invalid'}`}>
        <tbody>{Array.from(rows(model, setModel, 9))}</tbody>
      </table>
      <div>
        <div className="info">Values marked invalid will be ignored!</div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={reverse}
              onChange={reverseChanged}
            />
            Reverse (solve from bottom right)
          </label>
        </div>
        <div>
          <button onClick={clear}>Clear</button>
          <button onClick={reset}>Reset to demo</button>
        </div>
        <button onClick={solveClick}>Solve</button>
        <div className="status">{status}</div>
      </div>
    </div>
  );
};

export default Board;
