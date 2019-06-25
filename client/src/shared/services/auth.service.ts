// Vendors
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';

// Style
import 'react-toastify/dist/ReactToastify.css';
// Interfaces
import { IAuth } from '../interfaces';
// Enviroments
import { environment } from '../../enviroments/enviroments';

toast.configure()
const notify = (text: string) => toast(text);

export class AuthService {

    public registUser(user: IAuth): void {
        axios.post(`${environment.mySql.databaseURL}/auth/regist`, user )
            .then(res => {
                window.location.href = "/Login";
            }
        ).catch((err) => {
            if (err.response) {
                if (err.response.status === 403) {
                    notify(err.response.data.error);
                };
            };
        });
    };
    public async login(user: IAuth): Promise<void> {
        await axios.post(`${environment.mySql.databaseURL}/auth/login`, user )
            .then (res => {
                if (res.status === 201) {
                    let token = res.data.token;
                    let decode = jwt_decode(token);
                    if (decode) {
                        localStorage.setItem("currentUser", JSON.stringify(decode));
                        window.location.href = "/all-books";
                    }  
                }
            }
        )
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 404) {
                    notify(err.response.data.error);
                };
                if (err.response.status === 403) {
                    notify(err.response.data.error);
                };
            };
        });
    };
}; 