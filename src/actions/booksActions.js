"use strict"
import axios from 'axios';

//POST a Book
export function postBooks(book){
    return function(dispatch){
        axios.post("/api/books", book)
            .then(function(response) {
                dispatch({type:'POST_BOOK', payload:response.data})
            })
            .catch(function(err) {
                dispatch({type:'POST_BOOK_REJECTED', payload:err})
            })
    }
}
    //Old version - Client Only
    // return {
    //     type: 'POST_BOOKS',
    //     payload: book
    // }

//GET Book
export function getBooks(){
    return function(dispatch) {
        axios.get("/api/books")
        .then(function(response) {
                dispatch({type:'GET_BOOK', payload:response.data})
            })
            .catch(function(err) {
                dispatch({type:'GET_BOOK_REJECTED', payload:err})
            })
    }
}
    //Old Version - Client only
    // return {
    //     type: 'GET_BOOKS'
    // }

// DELETE a Book
export function deleteBooks(id){
    return function(dispatch) {
        axios.delete("/api/books/" + id)
        .then(function(response) {
                dispatch({type:'DELETE_BOOK', payload:id})
            })
            .catch(function(err) {
                dispatch({type:'DELETE_BOOK_REJECTED', payload:err})
            })
    }
}
    // return {
    //     type: 'DELETE_BOOK',
    //     payload: id
    // }

//UPDATE a Book
export const updateBooks = (book) => {
    return {
        type: 'UPDATE_BOOK',
        payload: book
    }
}

//RESET Form Button
export const resetButton = () => {
    return {
        type: 'RESET_BUTTON'
    }
}