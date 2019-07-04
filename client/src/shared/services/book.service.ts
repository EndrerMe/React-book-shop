// Vendors
import axios from 'axios';
import { toast } from 'react-toastify';

//Interfaces
import { IBook, IAuthor } from '../interfaces';
// Enviroments
import { environment } from '../../enviroments/enviroments';

toast.configure();
const notify = (text: string) => toast(text);

export class BookService {

    public getAllBooks(): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            fetch(`${environment.mySql.databaseURL}/books/getAll`)
            .then( res => res.json() )
            .then((data) => {
                resBook(data.length);
            });
        });
    };

    public findByTitle(title: string): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            axios.post(`${environment.mySql.databaseURL}/books/findByTitle`,  {title})
                .then(res => {
                    resBook(res.data);
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 400) {
                            notify(err.response.data.error);
                        };
                    };
                }
            );
        });
    };

    public findByAuthor(author: string): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            axios.post(`${environment.mySql.databaseURL}/authorsInBook/findByAuthor`,  {author})
                .then(res => {
                    resBook(res.data);
                })  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 400) {
                            notify(err.response.data.error);
                        };
                    };
                }
            );
        });
    };

    public findByType(type: string): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            axios.post(`${environment.mySql.databaseURL}/books/findByType`,  {type})
                .then(res => resBook(res.data))  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 400) {
                            notify(err.response.data.error);
                        };
                    };
                }
            );
        });
    }

    public findByPrice(price: {min: number, max: number}): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            axios.post(`${environment.mySql.databaseURL}/books/findByPrice`,  price)
                .then(res => resBook(res.data))  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 400) {
                            notify(err.response.data.error);
                        };
                    };
                }
            );
        });
    };

    public getAuthorForBooks(bookid: number): Promise<IAuthor[]> {
        return new Promise((resAuthor, rej) => {
            axios.post(`${environment.mySql.databaseURL}/authorsInBook/getAll`, {bookid} )
                .then((res: any) => {
                    resAuthor(res.data);
                }
            );
        })
    }

    public getBookWidthAuthors(id: string): Promise<IBook[]> {
        return new Promise((resBook, rej) => {
            fetch(`${environment.mySql.databaseURL}/authorsInBook/getAuthorForBooks/` + id)
            .then( res => res.json() )
            .then( (data: any) => {
                const book = data[0].Book;
                book.author = [];
                for(let i = 0; i < data.length; i++) {
                    book.author.push(data[i].Author.authorName + ", ");
                };
                resBook(book);
            });
        });
    };

    public addNewBook(newBook: IBook): Promise<IBook> {
        return new Promise((resBook, rej) => {
            axios.post(`${environment.mySql.databaseURL}/books/addNew`, newBook )
                .then(res => resBook(res.data))  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 400) {
                            notify(err.response.data.error);
                        };
                    };
                }
            );
        });
    };

    public changeBook(changedBook: IBook): Promise<IBook> {
        return new Promise((resBook, rej) => {
            axios.post(`${environment.mySql.databaseURL}/books/chagne`,  changedBook)
                .then(res => resBook(res.data))  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 403) {
                            notify(err.response.data.error)
                        };
                    };
                }
            );
        });
    };

    public deleteBook(id: number): Promise<IBook> {
        return new Promise((resBook, rej) => {
            axios.post(`${environment.mySql.databaseURL}/books/delete`,  {id})
                .then(res => resBook(res.data))  
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 403) {
                            notify(err.response.data.error)
                        }
                    };
                }
            );
        });
    };

    public getBookForPage(page: number, pageSize: number): Promise<IBook[]> {
        console.log("ui")
        return new Promise((result, rej) => {
            axios.post(`${environment.mySql.databaseURL}/books/getForPage`, {page, pageSize})
                .then(res => result(res.data))
        });
    };
};
