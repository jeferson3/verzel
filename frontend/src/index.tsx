import React from 'react';
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

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <Switch>

                <Redirect from="/" to="/site" exact />

                <Route
                    path="/site"
                    render={({ match: { url } }) => (
                        <VehicleContextProvider>
                            <Route path={`${url}`} component={Home} exact />
                            <Route path={`${url}/veiculos`} component={Vehicle} />
                        </VehicleContextProvider>
                    )}
                />

                <Route path="/admin" component={Admin} />
                <Route path="*" component={Page404} />

            </Switch>
        </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);