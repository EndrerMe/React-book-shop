// Vendors
import axios from 'axios';
import { environment } from '../enviroments/enviroments';

export function booksFetchDataSuccess(books: any) {
    return {
        type: "BOOKS_FETCH_DATA_SUCCESS",
        books
    }
}

export function booksFetchData(url: any) {
    return (dispatch: any) => {
        axios.get(`${environment.mySql.databaseURL}/booksAuthors/getAllbooksAuthors`)
        .then((res: any) => {
            dispatch(booksFetchData(res.data))
        })
    }
}