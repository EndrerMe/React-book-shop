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
            fetch("http://localhost:3002/books/getAllBooks")
            .then( res => res.json() )
            .then((data) => {
                resBook(data.length)
            })
        })
    }

    public findByTitle(title: string): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            axios.post(`http://localhost:3002/books/findByTitle`,  {title})
                .then(res => {
                    resBook(res.data)
                })  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 404) {
                            notify(err.response.data.error)
                        }
                    }
                })
        })
    }

    public findByAuthor(author: string): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            axios.post(`http://localhost:3002/booksAuthors/findByAuthor`,  {author})
                .then(res => {
                    resBook(res.data)
                })  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 404) {
                            notify(err.response.data.error)
                        }
                    }
                })
        })
    }

    public findByType(type: string): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            axios.post(`http://localhost:3002/books/findByType`,  {type})
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

    public findByPrice(price: {min: number, max: number}): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            axios.post(`http://localhost:3002/books/findByPrice`,  price)
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

    public getAuthorForBooks(bookid: number): Promise<IAuthor[]> {
        return new Promise((resAuthor, rej) => {
            axios.post(`http://localhost:3002/booksAuthors/getAuthorBooks`, {bookid} )
                .then((res: any) => {
                    resAuthor(res.data)
                })  
        })
    }

    public getBookWidthAuthors(id: string): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            fetch(`http://localhost:3002/booksAuthors/getBook/` + id)
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
            axios.post(`http://localhost:3002/books/addNewBook`, newBook )
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
            axios.post(`http://localhost:3002/books/chagneBook`,  changedBook)
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
            axios.post(`http://localhost:3002/books/deleteBook`,  {id})
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
            axios.get("http://localhost:3002/books/getDateForPagination")
        })
    }

    public getBookForPage(page: number, pageSize: number) {
        return new Promise((result, rej) => {
            axios.post("http://localhost:3002/books/getBookForPage", {page, pageSize})
                .then(res => result(res.data))
        })
    }
}