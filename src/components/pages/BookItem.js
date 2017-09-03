"use strict"
import React from 'react';
import {Image, Col, Row, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Import action add to cart
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends React.Component {
    handleCart() {
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1
        }]
        // CHECK IF CART IS EMPTY    
        if(this.props.cart.length > 0) {      
             // CART IS NOT EMPTY      
             let _id = this.props._id;      
             let cartIndex = this.props.cart.findIndex((cart) => {
                return cart._id === _id;
             })
             // IF RETURNS -1 THERE ARE NO ITEMS WITH SAME ID      
             if (cartIndex === -1) {        
                 this.props.addToCart(book);      
                } else {        
                    // WE NEED TO UPDATE QUANTITY        
                    this.props.updateCart(_id, 1, this.props.cart)      
                }    
            } else {      
                // CART IS EMPTY      
                this.props.addToCart(book);    
            }
    }
    render() {
        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Image src={this.props.images} responsive/>
                    </Col>
                    <Col xs={12} sm={6} className="book_content">
                        <h6>{this.props.title}</h6>
                        <p className="book_description">{this.props.description}</p>
                        <h6>Price: ${this.props.price}</h6>
                        <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>BUY NOW</Button>
                    </Col>
                </Row>
            </Well>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart:state.cart.cart
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
