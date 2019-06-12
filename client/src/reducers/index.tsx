import { combineReducers } from "redux"
import { books } from "./book"

const allReducers = combineReducers ({
    books: books,
})

export default allReducers;