import React, { useState } from 'react';
import './Board.css';
import CellEditor from './CellEditor';

const editorChange = (row, col) => e => {};

const cols = function*(row, count) {
  for (let i = 0; i < count; i++)
    yield (
      <td key={`col${row}${i}`} className="board">
        <CellEditor onChange={editorChange(row, i)} />
      </td>
    );
};

const rows = function*(count) {
  for (let i = 0; i < count; i++)
    yield (
      <tr key={`row${i}`} className="board">
        {Array.from(cols(i, 9))}
      </tr>
    );
};

const Board = () => {
  const [boardData, setBoardData] = useState([]);

  return (
    <table className="board">
      <tbody>{Array.from(rows(9))}</tbody>
    </table>
  );
};

export default Board;
