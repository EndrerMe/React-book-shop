// Vendors
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Interfaces
import { IAuthor } from '../interfaces/author.interface';
import { environment } from '../../enviroments/enviroments';

toast.configure()
const notify = (text: string) => toast(text);

export class AuthorService {
    public getAuthorById(id: string): Promise<IAuthor[]> {
        return new Promise((response, rej) => {
            fetch(`${environment.apiUrl}/booksAuthors/getBookById/` + id)
            .then( res => res.json() )
            .then( (data: any) => { response(data)})
        },
    )}

    public getAllAuthors(): Promise<IAuthor[]> {
        return new Promise((res, rej) => {
            fetch(`${environment.apiUrl}/authors/getAllAuthors/`)
            .then( res => res.json() )
            .then( (data: any) => { res(data)})
        },
    )}

    public getAllAuthorsLength(): Promise<IAuthor[]> {
        return new Promise((res, rej) => {
            fetch(`${environment.apiUrl}/authors/getAllAuthors/`)
            .then( res => res.json() )
            .then( (data: any) => { res(data.length)})
        },
    )}

    public addNewAuthor(author: IAuthor): Promise<IAuthor> {
        return new Promise((response, rej) => {
            axios.post(`${environment.apiUrl}/authors/addNewAuthor`, author )
                .then(res => response(res.data))      
        })      
    }

    public deleteAuthor(author: IAuthor): void {
        axios.post(`${environment.apiUrl}/authors/deleteAuthor`, author )
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
        axios.post(`${environment.apiUrl}/authors/changeAuthor`, author )
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
            axios.post(`${environment.apiUrl}/authors/getAuthorsForPage`, {page, pageSize})
            .then((data: any) => {result(data.data)})
        })
    }
}