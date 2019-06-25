// Vendors
import React from "react"
import Pagination from "react-js-pagination";
import { toast } from 'react-toastify';

// Style
import "./users.scss"
// Services
import { AuthService, UsersService } from "../../../shared/services";
// Enums
import { Gender, userRole } from "../../../shared/enums";
// Interfaces
import { IUser } from "../../../shared/interfaces";

const authService = new AuthService();
const usersService = new UsersService()
toast.configure();
const notify = (text: string) => toast(text);

export default class Users extends React.Component<any,any> {
    private gender: string[] = [Gender.male, Gender.female];
    private roles: string[] = [userRole.admin, userRole.commonUser];

    private passValid: RegExp = /^(?=.*\d).{4,8}$/;

    constructor (props: any) {
        super(props);

        this.state = {
            changeUserModal: false,
            userInfo: 0,
            showRegistUserModal: false,

            users: [],

            user: {
                userRole: "Обычный пользователь", 
                userGender: 'Мужчина', 
                userName: null, 
                userEmail: null, 
                userPass: null,
            },
            
            repeatPass: '',
            idOfChangedUser: null,
            activePage: 1,
            totalItemPerPage: 4,
            totalItem: 0,
            emailValid: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        };
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    componentDidMount() {
        usersService.getAllUsers().then((res) => {
            this.setState({
                totalItem: res,
            });
        });

        usersService.getUsersForPage(this.state.activePage, this.state.totalItemPerPage).then((res) => {
            this.setState({
              users: res,
            });
        });
    };

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
                user: {
                    ...prevState.user,
                    [name]: value,
                },
            }));
        };
    };

    private showChangeUserModal(id: number): void {
        this.setState({
            idOfChangedUser: id,
        });

        this.setState ({
            changeUserModal: true,
        });
    }

    private closeChangeUserModal(): void {
        this.setState ({
            changeUserModal: false,
        });
    }

    private regist(): void {
        let user = this.state.user;

        if (user.userPass === null) {
            notify("You password is wrong");
        };
        
        if (user.userEmail === null ||
            !this.state.emailValid.test(user.userEmail)) {
            notify("You email is wrong");
        };
        
        if (user.userName === null) {
            notify("You user name is wrong");
        };

        if (user.userPass !== this.state.repeatPass) {
            notify("your passwords do not match");
        };

        if (user.userPass === this.state.repeatPass) {
            let users = this.state.users
            authService.registUser(this.state.user)
            users.push(this.state.user)
            this.setState({
                users: users,
                showRegistUserModal: false,
            });
        }
        else {
            notify("Something is wrong");
        };
    }

    private changeUser(): void {
        if (this.state.user.userPass === this.state.repeatPass) {
            let user = this.state.user;
            let users = this.state.users;
            user.idUser = this.state.idOfChangedUser;
            usersService.changeUserData(user);
            for (let i = 0; i < users.length; i++) {
                if (user.idUser === users[i].idUser) {
                    users[i] = user
                    this.setState({
                        users: users,
                        changeUserModal: false,
                    });
                };
            };
        }
        else {
            notify("Something is wrong");
        };
    }

    private showUserInfo(user: IUser): void {
        if (this.state.userInfo === user.idUser) {
            this.setState ({
                userInfo: 0,
            });
            return;
        }

        this.setState ({
            userInfo: user.idUser,
        });
    }

    private deleteUser(user: IUser): void {
        let users = this.state.users;
        usersService.deleteUser(user);

        for (let i = 0; i < users.length; i++) {
            if (user.idUser === users[i].idUser) {
                users.splice(i, 1);
            };
        };

        this.setState({
            users: users,
        });
    };

    private showRegistUserModal(): void {
        this.setState({
            showRegistUserModal: true,
        });
    }

    private closeRegistUserModal(): void {
        this.setState({
            showRegistUserModal: false,
        });
    };

    private async handlePageChange(pageNumber: number): Promise<void> {
        await this.setState({activePage: pageNumber});
        usersService.getUsersForPage(this.state.activePage, this.state.totalItemPerPage).then((res) => {
          this.setState({
            users: res,
          });
        });
      };

    public render() {

        let users = this.state.users;

        return(
            <section className="editUser">
                <button className="btn btn-info"
                onClick={() => this.showRegistUserModal()}>Добавить нового пользователя</button>

                <div className="allUsers">
                    {
                    users.map((user: any) => {
                        return(
                            <div key={user.idUser}>
                                <div className="user">
                                    <h4 className="user__name">{user.userName}</h4>
                                    <span className="user__delete" 
                                    onClick={() => this.deleteUser(user)}>Удалить</span>
                                    {
                                    this.state.userInfo === user.idUser?
                                        <span className="user__Show"
                                        onClick={() => this.showUserInfo(user)}>Скрыть</span> 
                                        :
                                        <span className="user__Show"
                                        onClick={() => this.showUserInfo(user)}>Показать</span>
                                    }
                                </div>
                                {
                                    this.state.userInfo ===  user.idUser?
                                    <div className="userInfo">
                                        <h4 className="userInfo__name">Имя пользователя: {user.userName}</h4>
                                        <p className="userInfo__email">Почта польователя: {user.userEmail}</p>
                                        <p className="userInfo__genre">Пол пользователя: {user.userGender}</p>
                                        <p className="userInfo__role">Роль пользователя: {user.userRole}</p>
                                        <span className="changeuUser"
                                        onClick={() => this.showChangeUserModal(user.idUser)}>Изменить</span>
                                    </div> : null
                                }
                            </div>
                        );
                    })
                }

                    <div className="pagination">
                        <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.totalItemPerPage}
                        totalItemsCount={this.state.totalItem}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                        />
                    </div>

                </div>

                {
                    this.state.changeUserModal ? 
                    <div className="modal">
                        <div className="modal__main">
                            <div className="main">
                                <div className="close"
                                onClick={() => this.closeChangeUserModal()}>
                                    <span className="clos__line"></span>
                                </div>
                                <form>
                                    <div className="form-group form__el">
                                        <input name="userName" 
                                        value = {this.state.user.userName || ""}
                                        onChange={this.onChangeInput}
                                        type="text" placeholder="Ваше Имя..." required/>
                                    </div>
                                    <div className="form-group form__el">
                                        <input name="userEmail"
                                        value = {this.state.user.userEmail || ""}
                                        onChange={this.onChangeInput} 
                                        type="email" placeholder="Email" required/>
                                    </div>
                                    <div className="form-group form__el">
                                        <div className="form-group form__el">
                                            <input name="userPass"
                                            value = {this.state.user.userPass || ""}
                                            onChange={this.onChangeInput}
                                            type="password" placeholder="Пароль"/>
                                        </div>
                                        <div className="form-group form__el">
                                            <input name="repeatPass" 
                                            value={this.state.repeatPass}
                                            onChange={this.onChangeInput} 
                                            type="password" placeholder="Повторите пароль"/>
                                        </div>
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
                                    <div className="form-group form__el">
                                        <select name="userRole" value={this.state.user.userRole}
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
                                <button type="button"
                                onClick={() => this.changeUser()}>Изменить</button>
                                </form>
                            </div>
                        </div>
                    </div> : null
                }

                {
                    this.state.showRegistUserModal ?
                    <div className="modal">
                        <div className="modal__main">
                            <div className="main">
                                <div className="close"
                                onClick={() => this.closeRegistUserModal()}>
                                    <span className="clos__line"></span>
                                </div>
                                <form>
                                    <div className="form-group form__el">
                                        <input name="userName" 
                                        value = {this.state.user.userName || ""}
                                        onChange={this.onChangeInput}
                                        type="text" placeholder="Ваше Имя..." required/>
                                    </div>
                                    <div className="form-group form__el">
                                        <input name="userEmail"
                                        value = {this.state.user.userEmail || ""}
                                        onChange={this.onChangeInput} 
                                        type="email" placeholder="Email" required/>
                                    </div>
                                    <div className="form-group form__el">
                                        <div className="form-group form__el">
                                            <input name="userPass"
                                            value = {this.state.user.userPass || ""}
                                            onChange={this.onChangeInput}
                                            type="password" placeholder="Пароль"/>
                                        </div>
                                        <div className="form-group form__el">
                                            <input name="repeatPass" 
                                            value={this.state.repeatPass}
                                            onChange={this.onChangeInput} 
                                            type="password" placeholder="Повторите пароль"/>
                                        </div>
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
                                    <div className="form-group form__el">
                                        <select name="userRole" value={this.state.user.userRole}
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
                                <button type="button"
                                onClick={() => this.regist()}>Зарегистрировать</button>
                                </form>
                            </div>
                        </div>
                    </div> : null
                }

                
            </section>
        );
    }
}