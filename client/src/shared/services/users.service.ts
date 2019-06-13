// Vendors
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Interfaces
import { IUser } from '../interfaces/user.interface';

toast.configure()
const notify = (text: string) => toast(text);

export class UsersService {

    public getAllUsers(): Promise<IUser[]> {
        return new Promise((res, rej) => {
            fetch("http://localhost:3002/users/getAllUsers")
            .then( res => res.json() )
            .then( (data: any) => { res(data.length)})
        })
    }

    public changeUserData(user: IUser): void {
        axios.post(`http://localhost:3002/users/changeUserData`, user )
            .then(res => {
            }
        ) 
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 404) {
                    notify(err.response.data.error)
                }
            }
        })
    }

    public deleteUser(user: IUser): void {
        axios.post(`http://localhost:3002/users/deleteUser`, user )
            .then(res => {
            }
        )
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 404) {
                    notify(err.response.data.error)
                }
            }
        })
    }
    
    public getUsersForPage(page: number, pageSize: number): Promise<IUser[]> {
        return new Promise((result, rej) => {
            axios.post(`http://localhost:3002/users/getUsersForPage`, {page, pageSize} )
                .then(res => result(res.data))
        })
    }

}

