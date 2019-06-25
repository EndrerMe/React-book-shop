// Vendors
import axios from 'axios';
import { toast } from 'react-toastify';

// Interfaces
import { IAuthor } from '../interfaces';
// Enviroments
import { environment } from '../../enviroments/enviroments';

toast.configure()
const notify = (text: string) => toast(text);

export class AuthorService {
    public getAuthorById(id: string): Promise<IAuthor[]> {
        return new Promise((response, rej) => {
            fetch(`${environment.mySql.databaseURL}/booksAuthors/getBookById/` + id)
            .then( res => res.json() )
            .then( (data: any) => { response(data)});
        },
    )};

    public getAllAuthors(): Promise<IAuthor[]> {
        return new Promise((res, rej) => {
            fetch(`${environment.mySql.databaseURL}/authors/getAllAuthors/`)
            .then( res => res.json() )
            .then( (data: any) => { res(data)});
        },
    )};

    public getAllAuthorsLength(): Promise<IAuthor[]> {
        return new Promise((res, rej) => {
            fetch(`${environment.mySql.databaseURL}/authors/getAllAuthors/`)
            .then( res => res.json() )
            .then( (data: any) => { res(data.length)});
        },
    )};

    public addNewAuthor(author: IAuthor): Promise<IAuthor> {
        return new Promise((response, rej) => {
            axios.post(`${environment.mySql.databaseURL}/authors/addNewAuthor`, author )
                .then(res => response(res.data));
        });      
    };

    public deleteAuthor(author: IAuthor): void {
        axios.post(`${environment.mySql.databaseURL}/authors/deleteAuthor`, author )
            .then(res => {
            }
        ).catch((err) => {
            if (err.response) {
                if (err.response.status === 404) {
                    notify(err.response.data.error);
                };
            };
        });
    };

    public changeAuthor(author: IAuthor): void {
        axios.post(`${environment.mySql.databaseURL}/authors/changeAuthor`, author )
            .then(res => {
            }
        ).catch((err) => {
            if (err.response) {
                if (err.response.status === 404) {
                    notify(err.response.data.error);
                };
            };
        });
    };

    public getAuthorsForPage(page: number, pageSize: number): Promise<IAuthor[]> {
        return new Promise((result, rej) => {
            axios.post(`${environment.mySql.databaseURL}/authors/getAuthorsForPage`, {page, pageSize})
            .then((data: any) => {result(data.data)});
        });
    };
}
