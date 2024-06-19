// src/store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Asegúrate de importar thunk correctamente
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
