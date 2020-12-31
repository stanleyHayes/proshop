import {Button, Container, Grid, makeStyles, Menu, Toolbar, MenuItem, Paper, LinearProgress} from "@material-ui/core";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {
    ArrowDropDown,
    ArrowDropUp,
    ShoppingBasket
} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {grey} from "@material-ui/core/colors";
import {signOut} from "../../redux/authentication/authentication-action-creators";
import {useSnackbar} from "notistack";

const DesktopHeader = () => {

    const useStyles = makeStyles(theme => {
        return {
            button: {
                color: "white",
                fontWeight: "bold",
                letterSpacing: 1.5
            },
            link: {
                textDecoration: "none",
                color: "white",
                letterSpacing: 1.5
            },
            brand: {
                fontWeight: 700,
                fontSize: 32,
                textTransform: "uppercase"
            },
            linkButton: {
                color: "white",
                fontWeight: "bold",
                letterSpacing: 1.5
            },
            toolbar: {
                paddingLeft: 0,
                paddingRight: 0
            },
            icon: {
                color: "white"
            },
            menu: {
                marginTop: 40
            },
            profileLink: {
                textDecoration: "none",
                color: grey[900]
            }
        }
    });

    const classes = useStyles();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const [open, setOpen] = useState(false);
    const {userProfile, token, loading} = useSelector(state => state.authentication);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };


    const handleLogout = () => {
        const handleAlert = (status, message) => {
            switch (status) {
                case 'ERROR':
                    enqueueSnackbar(message, {
                        variant: 'error'
                    });
                    break;

                case 'SUCCESS':
                    enqueueSnackbar(message, {
                        variant: 'success'
                    });
                    break;

                default:
                    break;
            }
        }
        dispatch(signOut(token, handleAlert));
    }

    return (
        <Toolbar className={classes.toolbar} variant="regular">
            <Container>
                <Grid container={true} justify="space-around">
                    <Grid item={true} lg={2}>
                        <Link className={`${classes.link} ${classes.brand}`} to="/">
                            Pro Shop
                        </Link>
                    </Grid>
                    <Grid item={true} lg={6} container={true} justify="flex-end">
                        <Grid item={true}>
                            <Link className={classes.link} to="/">
                                <Button className={classes.linkButton} variant="text" size="medium">Home</Button>
                            </Link>
                        </Grid>
                        <Grid item={true}>
                            <Link className={classes.link} to="/products">
                                <Button className={classes.linkButton} variant="text" size="medium">Products</Button>
                            </Link>
                        </Grid>
                        <Grid item={true}>
                            <Link className={classes.link} to="/contact">
                                <Button className={classes.linkButton} variant="text" size="medium">Contact</Button>
                            </Link>
                        </Grid>
                        <Grid item={true}>
                            <Link className={classes.link} to="/about">
                                <Button className={classes.linkButton} variant="text" size="medium">About Us</Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item={true} lg={4} container={true} justify="flex-end" alignItems="center">
                        <Grid item={true}>
                            <Link className={classes.link} to="/cart">
                                <Button
                                    startIcon={<ShoppingBasket/>}
                                    className={classes.linkButton}
                                    variant="text"
                                    size="medium">Cart</Button>
                            </Link>
                        </Grid>
                        {
                            userProfile ? (
                                <Grid item={true}>
                                    {loading && <LinearProgress variant="buffer"/>}
                                    <Button
                                        className={classes.button}
                                        size="medium"
                                        onClick={handleMenuClick}
                                        endIcon={
                                            open ?
                                                <ArrowDropUp className={classes.icon}/> :
                                                <ArrowDropDown className={classes.icon}/>
                                        }
                                        variant="text">
                                        {userProfile.name}
                                    </Button>
                                    <Menu
                                        component={Paper}
                                        className={classes.menu}
                                        elevation={1}
                                        anchorEl={anchorEl}
                                        keepMounted={true}
                                        onClose={handleClose}
                                        open={Boolean(anchorEl)}>
                                        <MenuItem>
                                            <Link className={classes.profileLink} to="/account">
                                                Account
                                            </Link>
                                        </MenuItem>
                                        <MenuItem className={classes.profileLink}
                                                  onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </Grid>
                            ) : (
                                <Grid item={true}>
                                    <Link className={classes.link} to="/login">
                                        <Button
                                            className={classes.linkButton}
                                            variant="text"
                                            size="medium">Sign In</Button>
                                    </Link>
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </Toolbar>
    )
}

export default DesktopHeader;