import {AppBar, Button, Container, Grid, makeStyles, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import React from "react";
import {ShoppingBasket, VerifiedUser} from "@material-ui/icons";

const Header = () => {

    const useStyles = makeStyles(theme => {
        return {
            button: {},
            link: {
                textDecoration: "none",
                color: "white"
            },
            brand: {
                fontWeight: 700,
                fontSize: 32,
                textTransform: "uppercase"
            },
            linkButton: {
                color: "white",
                fontWeight: "bold"
            }
        }
    });

    const classes = useStyles();

    return (
        <AppBar variant="outlined">
            <Toolbar variant="regular">
                <Container>
                    <Grid container={true}>
                        <Grid item={true} lg={2}>
                            <Link className={`${classes.link} ${classes.brand}`} to="/">
                                Pro Shop
                            </Link>
                        </Grid>
                        <Grid item={true} lg={9} container={true} justify="flex-end">
                            <Grid item={true}>
                                <Link className={classes.link} to="/">
                                    <Button className={classes.linkButton} variant="text" size="large">Home</Button>
                                </Link>
                            </Grid>
                            <Grid item={true}>
                                <Link className={classes.link} to="/products">
                                    <Button className={classes.linkButton} variant="text" size="large">Products</Button>
                                </Link>
                            </Grid>
                            <Grid item={true}>
                                <Link className={classes.link} to="/contact">
                                    <Button className={classes.linkButton} variant="text" size="large">Contact</Button>
                                </Link>
                            </Grid>
                            <Grid item={true}>
                                <Link className={classes.link} to="/about">
                                    <Button className={classes.linkButton} variant="text" size="large">About Us</Button>
                                </Link>
                            </Grid>
                            <Grid item={true}>
                                <Link className={classes.link} to="/">
                                    <Button
                                        startIcon={<ShoppingBasket/>}
                                        className={classes.linkButton}
                                        variant="text"
                                        size="large">Cart</Button>
                                </Link>
                            </Grid>
                            <Grid item={true}>
                                <Link className={classes.link} to="/">
                                    <Button
                                        startIcon={<VerifiedUser/>}
                                        className={classes.linkButton}
                                        variant="text"
                                        size="large">My Account</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Header;