import React, { useState, useMemo, useCallback } from 'react';
import './Board.css';
import CellEditor from './CellEditor';
import { setPreValue, isValidModel, modelFrom } from './model';
import solverWorker from './backtracking-solver/solver.worker';

const editorChange = (model, setModel, row, col) => e => {
  setModel(setPreValue(model)(row, col)(e.target.value));
};

const cols = function*(model, setModel, row, count) {
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

const rows = function*(model, setModel, count) {
  for (let i = 0; i < count; i++)
    yield (
      <tr key={`row${i}`} className="board">
        {Array.from(cols(model, setModel, i, 9))}
      </tr>
    );
};

const runSolver = (model, showModel) => {
  const worker = new solverWorker();

  return new Promise(res => {
    worker.onmessage = e => {
      const { type, model } = e.data;
      showModel(model);
      if (type === 'final') {
        worker.terminate();
        res(model);
      }
    };
    worker.postMessage(model);
  });
};

const Board = () => {
  const [model, setModel] = useState(
    modelFrom([
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ])
  );
  const modelIsValid = useMemo(() => isValidModel(model), [model]);
  const [status, setStatus] = useState('');
  const solveClick = useCallback(() => {
    return runSolver(model, setModel).then(result => {
      if (result) {
        setStatus('Success');
      } else {
        setStatus("Can't solve");
      }
    });
  }, [model, setModel, setStatus]);

  return (
    <div>
      <table className={`board ${modelIsValid ? '' : 'invalid'}`}>
        <tbody>{Array.from(rows(model, setModel, 9))}</tbody>
      </table>
      <div>
        <div className="info">Values marked invalid will be ignored</div>
        <button onClick={solveClick}>Solve</button>
        <div className="status">{status}</div>
      </div>
    </div>
  );
};

export default Board;
