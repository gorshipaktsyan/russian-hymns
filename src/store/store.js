import React, { createContext, useReducer } from 'react';
import initialState from './initialState.js';
import actions from './actions.js';
import reducer from './reducer.js';

const store = createContext({});
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { actions, store, StateProvider };
