"use strict"
//Import REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

//Import REDUX
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//Import REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//Import combined reducers
import rootReducer from './reducers/index.js';

//Import Actions
import {addToCart} from './actions/cartActions.js';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions.js';

//Import React Components
import Bookslist from './components/pages/BooksList.js';
import Cart from './components/pages/Cart.js';
import BooksForm from './components/pages/BooksForm.js';
import Main from './main';

// STEP 1 create the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

//--------React Render-------------
const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Bookslist}/>
                <Route path="/admin" component={BooksForm}/>
                <Route path="/cart" component={Cart}/>
            </Route>
        </Router>
    </Provider>
)
render (
    Routes, document.getElementById('app')
);

