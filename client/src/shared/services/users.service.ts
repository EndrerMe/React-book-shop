// Vendors
import axios from 'axios';
import { toast } from 'react-toastify';

// Interfaces
import { IUser } from '../interfaces';
// Enviroments
import { environment } from '../../enviroments/enviroments';

toast.configure()
const notify = (text: string) => toast(text);

export class UsersService {

    public getAllUsers(): Promise<IUser[]> {
        return new Promise((res, rej) => {
            fetch(`${environment.mySql.databaseURL}/users/getAll`)
            .then( res => res.json() )
            .then( (data: any) => { res(data.length)})
        });
    };

    public changeUserData(user: IUser): void {
        axios.post(`${environment.mySql.databaseURL}/users/changeData`, user )
            .then(res => {
            }
        ) 
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 400) {
                    notify(err.response.data.error);
                };
            };
        });
    };

    public deleteUser(user: IUser): void {
        axios.post(`${environment.mySql.databaseURL}/users/delete`, user )
            .then(res => {
            }
        )
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 400) {
                    notify(err.response.data.error);
                };
            };
        });
    };

    public getUsersForPage(page: number, pageSize: number): Promise<IUser[]> {
        return new Promise((result, rej) => {
            axios.post(`${environment.mySql.databaseURL}/users/getForPage`, {page, pageSize} )
                .then(res => result(res.data))
        });
    };

};

