"use strict"
import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {bindActionCreators} from 'redux';

//Import Actions
import {postBooks, deleteBooks} from '../../actions/booksActions';

class BooksForm extends React.Component {
    //Pass the action to postBooks
    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book);
    }

    onDelete() {
        let bookId = findDOMNode(this.refs.delete).value;

        this.props.deleteBooks(bookId);
    }

    render () {
        const booksList = this.props.books.map ((booksArray) => {
            return (
                <option key={booksArray._id}>{booksArray._id}</option>
            )
        });

        return (
            <Well>
                <Panel>
                    <FormGroup controlId='title'>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type = 'text'
                            placeholder = 'Enter Title'
                            ref = 'title' />
                    </FormGroup>
                    <FormGroup controlId='description'>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type = 'text'
                            placeholder = 'Enter Description'
                            ref = 'description' />
                    </FormGroup>
                    <FormGroup controlId='price'>
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                            type = 'text'
                            placeholder = 'Enter Price'
                            ref = 'price' />
                    </FormGroup>
                    <Button onClick = {this.handleSubmit.bind(this)} bsStyle = 'primary'>SAVE BOOK</Button>
                </Panel>
                <Panel style={{marginTop:'25px'}}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select a Book ID to Delete</ControlLabel>
                        <FormControl ref="delete" componentClass="select" placeholder="select">
                            <option value="select">select</option>
                            {booksList}
                        </FormControl>
                    </FormGroup>
                    <Button onClick={this.onDelete.bind(this)} bsStyle="danger">DELETE BOOK</Button>
                </Panel>
            </Well>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books.books
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({postBooks, deleteBooks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
