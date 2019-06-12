// Vendors
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Interfaces
import { IAuthor } from '../interfaces/author.interface';

toast.configure()
const notify = (text: string) => toast(text);

export class AuthorService {
    public getAuthorById(id: string): Promise<IAuthor[]> {
        return new Promise((response, rej) => {
            fetch(`http://localhost:3000/booksAuthors/getBookById/` + id)
            .then( res => res.json() )
            .then( (data: any) => { response(data)})
        },
    )}

    public getAllAuthors(): Promise<IAuthor[]> {
        return new Promise((res, rej) => {
            fetch(`http://localhost:3000/authors/getAllAuthors/`)
            .then( res => res.json() )
            .then( (data: any) => { res(data)})
        },
    )}

    public getAllAuthorsLength(): Promise<IAuthor[]> {
        return new Promise((res, rej) => {
            fetch(`http://localhost:3000/authors/getAllAuthors/`)
            .then( res => res.json() )
            .then( (data: any) => { res(data.length)})
        },
    )}

    public addNewAuthor(author: IAuthor): Promise<IAuthor> {
        return new Promise((response, rej) => {
            axios.post(`http://localhost:3000/authors/addNewAuthor`, author )
                .then(res => response(res.data))      
        })      
    }

    public deleteAuthor(author: IAuthor): void {
        axios.post(`http://localhost:3000/authors/deleteAuthor`, author )
            .then(res => {
                console.log(res.data);
            }
        ).catch((err) => {
            if (err.response) {
                if (err.response.status === 404) {
                    notify(err.response.data.error)
                }
            }
        })
    }

    public changeAuthor(author: IAuthor): void {
        axios.post(`http://localhost:3000/authors/changeAuthor`, author )
            .then(res => {
                console.log(res.data);
            }
        ).catch((err) => {
            if (err.response) {
                if (err.response.status === 404) {
                    notify(err.response.data.error)
                }
            }
        }) 
    }

    public getAuthorsForPage(page: number, pageSize: number): Promise<IAuthor[]> {
        return new Promise((result, rej) => {
            axios.post(`http://localhost:3000/authors/getAuthorsForPage`, {page, pageSize})
            .then((data: any) => {result(data.data)})
        })
    }
}