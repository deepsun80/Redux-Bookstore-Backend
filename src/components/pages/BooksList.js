"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions.js';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

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
            <Col xs={12} sm={6} md={4} key={booksArray._id}>
                <BookItem 
                    _id = {booksArray._id}
                    title = {booksArray.title}
                    description = {booksArray.description}
                    images = {booksArray.images}
                    price = {booksArray.price} 
                />
            </Col>
            );
        });
        return (
            <Grid>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img width={900} height={100} alt="900x500" src="/images/Book1.jpg"/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={100} alt="900x500" src="/images/Book2.jpg"/>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row>
                    <Cart />
                </Row>
                <Row style={{marginTop:'15px'}}>
                    <Col>
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