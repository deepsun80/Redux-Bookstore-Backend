"use strict"
//CART REDUCERS
export function cartReducers(state = {cart:[]}, action) {
    switch(action.type) {
        case 'ADD_TO_CART':
            return {...state, 
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty 
            }
        break;

        case 'DELETE_CART_ITEM':
            return {...state, 
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            }
        break;
        
        case 'UPDATE_CART':
            return {...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            }
        break;
    }
    return state;
}

//Calculate Total
export const totals = (payloadArray) => {
    const totalAmount = payloadArray.map(function(cartArray) {
        return cartArray.price * cartArray.quantity;
    }).reduce(function(a, b) {
        return a + b;
    }, 0); //Start summing from index0


    const totalQty = payloadArray.map(function(qty) {    
        return qty.quantity;  
    }).reduce(function(a, b) {    
        return a + b;  
    }, 0);

    return {
        amount:totalAmount.toFixed(2),
        qty: totalQty
    }
} 