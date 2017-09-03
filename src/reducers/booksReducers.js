"use strict"

//BOOKS REDUCERS
export function booksReducers(state = { books:[] }, action) {
    switch(action.type) {
        case 'GET_BOOK':
            return { ...state, books: [...action.payload] };
        break;

        case 'POST_BOOK':
            return { ...state, books: [...state.books, ...action.payload],
                    msg:'Saved! Click to Continue', style:'success', validation: 'success'};
        break;

        case 'POST_BOOK_REJECTED':
            return { ...state, msg:'Please, try again', style:'danger', validation: 'error' };
        break;

        case 'RESET_BUTTON':
            return { ...state, msg:null, style:'primary', validation: null };
        break;

        case 'DELETE_BOOK':
            //Create a copy of the current array of books
            const currentBookToDelete = [...state.books];
            //Determine which index the book is to be deleted using _id
            const indexToDelete = currentBookToDelete.findIndex(function(book) {
                return book._id == action.payload;
            });
            //Use slice to remove the book and index
            return {
                books: [...currentBookToDelete.slice(0, indexToDelete), 
                ...currentBookToDelete.slice(indexToDelete + 1)]
            }
        break;

        case 'UPDATE_BOOK':
            //Create a copy of the current array of books
            const currentBookToUpdate = [...state.books];
            //Determine which index the book is to be Updated using _id
            const indexToUpdate = currentBookToUpdate.findIndex(function(book) {
                return book._id === action.payload._id;
            });
            //Create a new book object at index with new information
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title,
                description: action.payload.description,
                price: action.payload.price
            };
            //use slice like in delete, but insert the newbook
            return {
                books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
                ...currentBookToUpdate.slice(indexToUpdate + 1)]
            };
        break;
    }
    return state;
}