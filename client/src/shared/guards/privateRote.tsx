import { Route, Redirect } from "react-router";
import React, { Component }  from 'react';

export const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props) => {
        let user: any = JSON.parse(localStorage.getItem("currentUser") as any)
        if (user) {
            if (user.userRole === "Администратор") {
                console.log("props")
                return <Component {...props} />
            } else {
                return (
                    alert("You are not admin")
                )
            }

        } else {
            return <Redirect to={{
                pathname: '/Login',
                state: { from: props.location }
              }} />
        }
    }} />
 );