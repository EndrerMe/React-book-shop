import { AuthService } from "./../shared/services/auth.service";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
import { history } from './../history';

const authService = new AuthService();
toast.configure()
const notify = (text: string) => toast(text);

export function LoginReducer(state: any, action: any) {
    switch(action.type) {        
        case "@@AUTH/LOGIN_ERROR":
            {
                if (action.error.status === 404 
                    || action.error.status === 403) {
                    notify(action.error.data.error);
                };

                return
            }
        case "@@AUTH/LOGIN_RECIVED": 
            {
                const decode = jwt_decode(action.token.data.token)
                localStorage.setItem("currentUser", JSON.stringify(decode));
                return
            }   
            
        case "@@AUTH/LOGIN_SUCCESS": 
            {
                return history.goBack();
            }     
        default:
            return null; 
    }
}