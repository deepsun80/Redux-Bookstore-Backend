"use strict"
import {combineReducers} from 'redux';

//Import Reducers to be combined
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';

//Combine the reducers and export
const rootReducer = combineReducers({
  books: booksReducers,
  cart: cartReducers
});

export default rootReducer;
