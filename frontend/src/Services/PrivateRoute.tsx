import React from "react";
import {useAuthContext} from "../Context/Auth/context";
import {Redirect, Route, RouteComponentProps} from "react-router-dom";

type Props = {
    children?: React.ReactNode,
    path: string
};
export const PrivateRoute: React.FC<Props> = ({ children, path }) => {

    const auth = useAuthContext();

    console.log([
        auth.state.user,
        auth.state.token
    ])
    return (
        <Route
            path={path}
            exact
            render={({ location }) =>
                auth.state.user && auth.state.token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}