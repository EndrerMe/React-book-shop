import axios from 'axios';

export function booksFetchDataSuccess(books: any) {
    return {
        type: "BOOKS_FETCH_DATA_SUCCESS",
        books
    }
}

export function booksFetchData(url: any) {
    return (dispatch: any) => {
        axios.get("http://localhost:3002/booksAuthors/getAllbooksAuthors")
        .then((res: any) => {
            dispatch(booksFetchData(res.data))
        })
    }
}