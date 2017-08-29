"use strict"
import React from 'react';
import Menu from './components/Menu';
import Footer from './components/Footer';

import {connect} from 'react-redux';

class Main extends React.Component {
    render () {
        return (
            <div>
                <Menu cartItemsNumber={this.props.totalQty}/>
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        totalQty: state.cart.totalQty
    }
}

export default connect(mapStateToProps)(Main)