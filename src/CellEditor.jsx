import React from 'react';

const CellEditor = ({ onChange, cell }) => {
  return (
    <input
      className={`cell ${cell ? cell.type : ''}`}
      type="text"
      pattern="[1-9]?"
      onChange={onChange}
      value={cell ? cell.val : ''}
    />
  );
};

export default CellEditor;
