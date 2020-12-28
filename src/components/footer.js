import React from "react";
import {Divider, makeStyles, Typography} from "@material-ui/core";
const Footer = () => {

    const useStyles = makeStyles(theme => {
        return {
            divider : {
                marginTop: 32,
                marginBottom: 32
            }
        }
    });

    const classes = useStyles();

    return (
        <footer>
            <Divider className={classes.divider} variant="fullWidth" />
            <Typography variant="body2" align="center">
                Copyright &copy; ProShop 2020
            </Typography>
        </footer>
    )
}

export default Footer;