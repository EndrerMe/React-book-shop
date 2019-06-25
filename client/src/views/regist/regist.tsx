// Vendors
import React from "react"
import { createBrowserHistory } from "history";
import { toast } from 'react-toastify';


// Style
import "./regist.scss"
// Enums
import { Gender, userRole } from "../../shared/enums";
// Serivces
import { AuthService } from "../../shared/services";


const auth = new AuthService();
const history = createBrowserHistory();
toast.configure();
const notify = (text: string) => toast(text);

export default class Registraton extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            newUser: {
                userRole: "Обычный пользователь", 
                userGender: 'Мужчина', 
                userName: null, 
                userEmail: null, 
                userPass: null,
            },
            repeatPass: '',
            emailValid: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        };
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    private passValid: RegExp = /^(?=.*\d).{4,8}$/;


    public onChangeInput(event: any): void {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === "repeatPass") {
            this.setState({
                [name]: value,
            });
        } else {
            this.setState((prevState: any) => ({
                newUser: {
                    ...prevState.newUser,
                    [name]: value,
                },
            }));
        };
    };

    public regist(): void {
        let user = this.state.newUser;

        if (user.userPass === null) {
            notify("You password is wrong");
            return;
        }
        
        if (user.userEmail === null ||
            !this.state.emailValid.test(user.userEmail)) {
            notify("You email is wrong");
            return;
        }   
        
        if (user.userName === null) {
            notify("You user name is wrong");
            return;
        }

        if (user.userPass !== this.state.repeatPass) {
            notify("your passwords do not match");
            return;
        }

        if (user.userPass === this.state.repeatPass) {
            auth.registUser(this.state.newUser);
        }
    }


    gender: string[] = [Gender.male, Gender.female];
    roles: string[] = [userRole.admin, userRole.commonUser];

    public render() {
        return(
            <form>
                <div className="form-group form__el">
                    <label>Ваше Имя:</label>
                    <input className="user__info" name="userName" 
                    value = {this.state.newUser.userName || ""}
                    onChange={this.onChangeInput}
                    type="text" placeholder="Ваше Имя..." required/>
                </div>
                <div className="form-group form__el">
                    <label>Почта:</label>
                    <input className="user__info" name="userEmail"
                    value = {this.state.newUser.userEmail || ""}
                    onChange={this.onChangeInput} 
                    required
                    type="email" placeholder="Email"/>
                </div>
                <div className="form-group form__el">
                    <label>Пароль:</label>
                    <input className="user__info" name="userPass"
                    value = {this.state.newUser.userPass || ""}
                    onChange={this.onChangeInput}
                    type="password" placeholder="Пароль"/>
                </div>
                <div className="form-group form__el">
                    <input className="user__info" name="repeatPass" 
                    value={this.state.repeatPass}
                    onChange={this.onChangeInput} 
                    type="password" placeholder="Повторите пароль"/>
                </div>
                <div className="form-group form__el">
                {
                    this.gender.map((gender) => {
                        return (
                            <div key={gender}>
                                <label htmlFor={ gender }>{ gender }</label>
                                <input className="genre__btn"
                                value={ gender } 
                                onChange={this.onChangeInput} 
                                type="radio" name="userGender"/>
                            </div>
                        );
                    })
                }
                </div>
                <div className="form-group form-el">
                    <select name="userRole" value={this.state.newUser.userRole}
                    onChange={this.onChangeInput} required>
                    {
                        this.roles.map((role) => {
                            return(
                                <option key={role} value={ role }>
                                    { role }
                                </option>
                            );
                        })
                    }
                    </select>
                </div>
                <button className="regitBtn" onClick={() => this.regist()} type="button">Регистрация</button>
                <a href="/Login">Войти</a>
                <a href="/">На главную</a>
            </form>
        );
    }
}