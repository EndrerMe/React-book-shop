// Vendors
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

//Interfaces
import IBook from '../interfaces/book.interface';
import { IAuthor } from '../interfaces/author.interface';

toast.configure()
const notify = (text: string) => toast(text);

export class BookService {

    public getAllBooks(): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            fetch("http://localhost:3000/books/getAllBooks")
            .then( res => res.json() )
            .then((data) => {
                console.log(data)
                resBook(data.length)
            })
        })
    }

    public getAuthorForBooks(bookid: number): Promise<IAuthor[]> {
        return new Promise((resAuthor, rej) => {
            axios.post(`http://localhost:3000/booksAuthors/getAuthorBooks`, {bookid} )
                .then((res: any) => {
                    resAuthor(res.data)
                })  
        })
    }

    public getBookWidthAuthors(id: string): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            fetch(`http://localhost:3000/booksAuthors/getBook/` + id)
            .then( res => res.json() )
            .then( (data: any) => {
                const book = data[0].Book;
                book.author = []
                for(let i = 0; i < data.length; i++) {
                    book.author.push(data[i].Author.authorName + ", ")
                }
                resBook(book)
            })
        })
    }

    public addNewBook(newBook: IBook): Promise<IBook> {
        return new Promise((resBook, rej) => {
            axios.post(`http://localhost:3000/books/addNewBook`, newBook )
                .then(res => resBook(res.data))  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 404) {
                            notify(err.response.data.error)
                        }
                    }
                })
        })
    }

    public changeBook(changedBook: IBook): Promise<IBook> {
        return new Promise((resBook, rej) => {
            axios.post(`http://localhost:3000/books/chagneBook`,  changedBook)
                .then(res => resBook(res.data))  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 403) {
                            notify(err.response.data.error)
                        }
                    }
                })
        })
    }

    public deleteBook(id: number): Promise<IBook> {
        return new Promise((resBook, rej) => {
            axios.post(`http://localhost:3000/books/deleteBook`,  {id})
                .then(res => resBook(res.data))  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 403) {
                            notify(err.response.data.error)
                        }
                    }
                })
        })
    }

    public getDateForPagination() {
        return new Promise((result, rej) => {
            axios.get("http://localhost:3000/books/getDateForPagination")
        })
    }

    public getBookForPage(page: number, pageSize: number) {
        return new Promise((result, rej) => {
            axios.post("http://localhost:3000/books/getBookForPage", {page, pageSize})
                .then(res => result(res.data))
        })
    }
}