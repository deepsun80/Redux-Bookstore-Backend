"use strict"
import React from 'react';
import {MenuItem, Row, Col, InputGroup, DropdownButton, Well, Panel, FormControl, FormGroup, ControlLabel, Button, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {bindActionCreators} from 'redux';
import axios from 'axios';

//Import Actions
import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/booksActions';

class BooksForm extends React.Component {
    constructor() {
        super();
        this.state = {
            images: [{}],
            img:''
        }
    }
    componentDidMount() {
        this.props.getBooks();
        //GET Images from API
        axios.get('/api/images')
            .then(function(response) {
                this.setState({images:response.data});
            }.bind(this))
            .catch(function(err) {
                this.setState({images:'error loading images from server', img:''});
            }.bind(this))
    }
    //Pass the action to postBooks
    handleSubmit() {
        const book = [{
            images: findDOMNode(this.refs.images).value, 
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

    handleSelect(img) {
        this.setState({
            img: '/images/' + img
        })
    }
    resetForm() {
        //RESET the Button
        this.props.resetButton();
        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({img:''});
    }   
    render () {
        const booksList = this.props.books.map ((booksArray) => {
            return (
                <option key={booksArray._id}>{booksArray._id}</option>
            )
        });

        const imgList = this.state.images.map(function(imgArray, i) {
            return (
                <MenuItem 
                    key={i} 
                    eventKey={imgArray.name}
                    onClick={this.handleSelect.bind(this, imgArray.name)}>
                    {imgArray.name}
                    </MenuItem>
            )
        }, this);

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="images" value={this.state.img} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an Image"
                                    bsStyle="primary"
                                    >
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive />
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId='title' validationState={this.props.validation}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type = 'text'
                                    placeholder = 'Enter Title'
                                    ref = 'title' />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId='description' validationState={this.props.validation}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type = 'text'
                                    placeholder = 'Enter Description'
                                    ref = 'description' />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId='price' validationState={this.props.validation}>
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type = 'text'
                                    placeholder = 'Enter Price'
                                    ref = 'price' />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <Button 
                                onClick = {(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} 
                                bsStyle = {(!this.props.style)?("primary"):(this.props.style)}>
                                {(!this.props.msg)?("Save Book"):(this.props.msg)}
                            </Button>
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
                    </Col>
                </Row>
            </Well>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style,
        validation: state.books.validation
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({postBooks, deleteBooks, getBooks, resetButton}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
