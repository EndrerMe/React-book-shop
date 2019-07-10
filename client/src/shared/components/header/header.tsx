// Vendors
import React from "react"

// Style
import "./header.scss"
// Components
import Navigation from "../navigation/nav";

export default class Header extends React.Component<any, any> {

    constructor (
        props: null
    ) {
        super(props)
        this.state = {
            showUser: false,
            user: null
        }
    }

    componentDidMount(): void {
        let activeUser = JSON.parse(localStorage.getItem("currentUser") as any)

        if (activeUser) {
            this.setState({
                showUser: true,
                user: activeUser
            })
        }

    }

    private logout(): void {
        this.setState({
            showUSer: false
        })
        localStorage.removeItem("currentUser")

        window.location.reload()
    }

    public render() {
        let user = this.state.user

        return(
            <header>
                <Navigation />
                <div className="logo">
                    <h1>
                        <a href="/all-books">Book Shop</a>
                    </h1>
                    {
                        this.state.showUser ? 
                        <div className="user">
                            <h3 >{ user.userName }</h3>
                            <span onClick={() => this.logout()} className="logout">Выйти</span>
                        </div> 
                        : null
                    }
                </div>
            </header>
        );
    }
}