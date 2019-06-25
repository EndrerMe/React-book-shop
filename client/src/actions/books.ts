// Vendors
import axios from 'axios';
import { environment } from '../enviroments/enviroments';

export function booksFetchDataSuccess(books: any): Object {
    return {
        type: "BOOKS_FETCH_DATA_SUCCESS",
        books
    }
}

export function booksFetchData(url: any): Object {
    return (dispatch: any) => {
        axios.get(`${environment.mySql.databaseURL}/booksAuthors/getAllbooksAuthors`)
        .then((res: any) => {
            dispatch(booksFetchData(res.data))
        })
    }
}