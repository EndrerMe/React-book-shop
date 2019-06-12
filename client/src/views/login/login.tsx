// Vendors
import React from "react"

// Style
import "./login.scss"
// Services
import { AuthService } from "../../shared/services/auth.service";

const auth = new AuthService();

export default class Login extends React.Component<any, any> {

    constructor(props: any) {
        super(props)

        this.state = {
            user: {
                userName: "",
                userPass: "",
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    private handleInputChange(event: any): void {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState: any) => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    }

    private login(): void {
        auth.login(this.state.user)
    }

    public render() {
        return(
            <form>
                <div className="form-group form__el">
                    <input className="logName" type="text" 
                    name = "userName"
                    value = {this.state.user.userName || ""}
                    onChange={this.handleInputChange}
                    placeholder="Имя" />
                    <input className="logPass" type="password" 
                    name = "userPass"
                    value = {this.state.user.userPass || ""}
                    onChange={this.handleInputChange}
                    placeholder="Пароль" />
                    <a onClick={() => this.login()} className="login__btn">Войти</a>
                    <a href ="/Registration">Зарегистрироваться</a>
                    <a href="/">На главную</a>
                </div>    
            </form>
        );
    }

}