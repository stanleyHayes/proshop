import React from "react";
import Footer from "../navigation/footer";
import {makeStyles} from "@material-ui/core";
import Header from "../navigation/header";

const Layout = ({children}) => {

    const useStyles = makeStyles(theme => {
        return {
            main: {
                minHeight: "90vh",
                marginTop: 64
            },
            root: {
                backgroundColor: "#f0f2f5"
            }
        }
    });

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <Header/>
            </div>
            <main className={classes.main}>
                {children}
            </main>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Layout;