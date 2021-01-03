import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {SnackbarProvider} from "notistack";
import store from "./redux/store";
import {grey, purple} from "@material-ui/core/colors";

const theme = createMuiTheme({
    typography: {
        fontFamily: "Nunito, sans-serif"
    },
    shape: {
        borderRadius: 8
    },
    palette: {
        primary: {
            dark: purple[900],
            main: purple[700],
            light: purple[500]
        },
        secondary: {
            dark: grey[900],
            main: grey[700],
            light: grey[500]
        }
    }
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <SnackbarProvider anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}>
                        <App/>
                    </SnackbarProvider>
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
