import React, { useState, useMemo, useCallback } from 'react';
import './Board.css';
import CellEditor from './CellEditor';
import {
  createEmptyModel,
  setPreValue,
  isValidModel,
  modelFrom
} from './model';
import { solve } from './backtracking-solver';

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
    return new Promise(res => {
      res(solve(model, setModel));
    }).then(result => {
      if (result) {
        //setModel(result);
        setStatus('Success');
      } else {
        setStatus("Can't solve");
      }
    });
    // const result = solve(model, setModel);
    // if (result) {
    //   setModel(result);
    //   setStatus('Success');
    // } else {
    //   setStatus("Can't solve");
    // }
  }, [model]);

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
      <div>{JSON.stringify(model)}</div>
    </div>
  );
};

export default Board;
