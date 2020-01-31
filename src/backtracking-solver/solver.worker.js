import Im from 'seamless-immutable';
import { solve } from '.';

// eslint-disable-next-line no-restricted-globals
self.onmessage = e => {
  const model = Im(e.data.model);
  const showModel = m => {
    postMessage({ type: 'intermediate', model: m });
  };
  const result = solve(model, showModel, e.data.processEmptyCells);
  postMessage({ type: 'final', model: result });
};
