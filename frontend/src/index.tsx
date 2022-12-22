import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './Styles/theme';
import { GlobalStyle } from './Styles/global-style';
import {
    Switch,
    Route,
    BrowserRouter, Redirect,
} from "react-router-dom";

import {Page404} from "./Pages/Page404";
import {Admin} from "./Pages/Admin";
import {Home} from "./Pages/Public/Home";
import {Vehicle} from "./Pages/Public/Vehicle";
import {VehicleContextProvider} from "./Context/Public/VehicleContext";
import {SpinnerContainer} from "./Components/Spinner";
import {Login} from "./Pages/Auth/Login";
import {AuthContextProvider} from "./Context/Auth";
import {PrivateRoute} from "./Services/PrivateRoute";
import {AdminContextProvider} from "./Context/Admin";
import {VehicleAdmin} from "./Pages/Admin/Vehicle";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <Switch>

                <Redirect from="/" to="/site" exact />

                <AuthContextProvider>

                    <VehicleContextProvider>
                        <SpinnerContainer />
                        <Route path="/site" component={Home} exact />
                        <Route path="/site/veiculos" component={Vehicle} />

                        <AdminContextProvider>
                            <PrivateRoute path='/admin'>
                                <Admin />
                            </PrivateRoute>
                            <PrivateRoute path='/admin/veiculos'>
                                <VehicleAdmin />
                            </PrivateRoute>
                        </AdminContextProvider>

                        <Route path="/auth/login" component={Login} exact />
                    </VehicleContextProvider>

                </AuthContextProvider>

                <Route path="*" component={Page404} />


            </Switch>
        </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);