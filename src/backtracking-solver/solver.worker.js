import Im from 'seamless-immutable';
import { solve } from '.';

self.onmessage = e => {
  const model = Im(e.data);
  const showModel = m => {
    postMessage({ type: 'intermediate', model: m });
  };
  const result = solve(model, showModel);
  postMessage({ type: 'final', model: result });
};
