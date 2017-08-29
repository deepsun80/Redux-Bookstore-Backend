"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions.js';
import {Grid, Col, Row, Button} from 'react-bootstrap';

//Import Each Book Item
import BookItem from './BookItem';

//Import Book Form
import BooksForm from './BooksForm';

//Import Cart
import Cart from './Cart';

class BooksList extends React.Component {
    componentDidMount() {
        //Dispatch an Action
        this.props.getBooks();
    }
    render() {
        const booksList = this.props.books.map((booksArray) => {
        return (
            <Col key={booksArray._id}>
                <BookItem 
                    _id = {booksArray._id}
                    title = {booksArray.title}
                    description = {booksArray.description}
                    price = {booksArray.price} 
                />
            </Col>
            );
        });
        return (
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row>
                    <Col xs = {12} sm = {6}>
                        <BooksForm />
                    </Col>
                    <Col xs = {12} sm = {6} md = {4}>
                        {booksList}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBooks: getBooks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);