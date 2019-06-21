// Vendors
import { combineReducers } from "redux"

// Components
import { books } from "./book"

const allReducers = combineReducers ({
    books: books,
})

export default allReducers;