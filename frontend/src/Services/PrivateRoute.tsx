import React, {useEffect} from "react";
import {useAuthContext} from "../Context/Auth/context";
import {Redirect, Route} from "react-router-dom";

type Props = {
    children?: React.ReactNode,
    path: string
};
export const PrivateRoute: React.FC<Props> = ({ children, path }) => {

    const {state: {token, user}} = useAuthContext();

    return (
        <Route
            path={path}
            exact
            render={({ location }) =>
                user && token ? (
                    children
                ) : (
                    <Redirect to="/auth/login" />
                )
            }
        />
    );
}