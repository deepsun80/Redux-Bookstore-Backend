"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal} from 'react-bootstrap';

//Import Action
import {deleteCartItem, updateCart} from '../../actions/cartActions';

class Cart extends React.Component {
    onDelete(_id) {
        const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex((cart) => {
            return cart._id === _id;
        });
        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), 
            ...currentBookToDelete.slice(indexToDelete + 1)];
        
        this.props.deleteCartItem(cartAfterDelete);
    }
    onIncrement(_id) {
        this.props.updateCart(_id, 1, this.props.cart);
    }
    onDecrement(_id, quantity) {
        if (quantity > 1) {
            this.props.updateCart(_id, -1, this.props.cart);
        }
    }
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }
    open() {
        this.setState({showModal:true})
    }
    close() {
        this.setState({showModal:false})
    }
    render() {
        if(this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }

    renderEmpty() {
        return(<div></div>);
    }

    renderCart() {
        const cartItemsList = this.props.cart.map((cartArray) => {
            return (
                <Panel key = {cartArray._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArray.title}</h6><span>    </span>
                        </Col>
                         <Col xs={12} sm={2}>
                            <h6>{cartArray.price}</h6>
                        </Col>
                         <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle='success'>{cartArray.quantity}</Label></h6>
                        </Col>
                         <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button onClick={this.onDecrement.bind(this, cartArray._id, cartArray.quantity)} bsStyle='default' bsSize='small'>-</Button>
                                <Button onClick={this.onIncrement.bind(this, cartArray._id)} bsStyle='default' bsSize='small'>+</Button>
                                <span>     </span>
                                <Button onClick={this.onDelete.bind(this, cartArray._id)} bsStyle='danger' bsSize='small'>DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
        }, this);
        return (
            <Panel header = 'Cart' bsStyle = 'primary'>
                {cartItemsList}
                <Row>
                    <Col xs={12}>
                        <h6>Total Amount: ${this.props.totalAmount}</h6>
                        <Button onClick={this.open.bind(this)} bsStyle='success' bsSize='small'>
                            PROCEED TO CHECKOUT
                        </Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>CHECKOUT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your Order Has Been Saved</h6>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6>Total: ${this.props.totalAmount}</h6>
                        </Col>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart: updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);