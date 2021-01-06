import {
    Button,
    Container,
    Grid,
    makeStyles,
    Menu,
    Toolbar,
    MenuItem,
    Paper,
    LinearProgress,
    Divider, Typography
} from "@material-ui/core";
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
                textTransform: "uppercase",
                borderWidth: 2,
                borderColor: theme.palette.primary.light,
                textDecoration: "none",
                color: theme.palette.primary.main,
                backgroundColor: "white",
                borderStyle: "solid",
                paddingTop: 4,
                paddingBottom: 4,
                paddingRight: 8,
                paddingLeft: 8
            },
            linkButton: {
                color: "white",
                fontWeight: "bold",
                letterSpacing: 1.5
            },
            dropdownLinkButton: {
                color: grey[700],
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
            },
            dropdownDivider: {
                marginTop: 0,
                marginBottom: 0
            },
            searchButton: {
                borderWidth: 2,
                borderColor: "white",
                color: "white",
                paddingLeft:16,
                paddingRight: 16,
                fontWeight: "bold",
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: "all 500ms 150ms ease-in-out"
                }
            },
            searchIcon: {
                color: "white"
            }
        }
    });

    const classes = useStyles();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const [open, setOpen] = useState(false);
    const [openAdmin, setAdminOpen] = useState(false);
    const [anchorAdminEl, setAnchorAdminEl] = React.useState(null);
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


    const handleAdminMenuClick = (event) => {
        setAnchorAdminEl(event.currentTarget);
        setAdminOpen(true);
    };

    const handleAdminClose = () => {
        setAnchorAdminEl(null);
        setAdminOpen(false);
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
            <Container maxWidth="xl">
                <Grid alignItems="center" container={true} spacing={5}>
                    <Grid item={true} lg={5} container={true} alignItems="center" justify="flex-end">
                        <Grid item={true}>
                            <Link className={classes.link} to="/">
                                <Button className={classes.linkButton} variant="text" size="medium">Home</Button>
                            </Link>
                        </Grid>
                        <Grid item={true}>
                            <Link className={classes.link} to="/blog">
                                <Button className={classes.linkButton} variant="text" size="medium">Blog</Button>
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
                    </Grid >
                    <Grid item={true} >
                        <Link className={`${classes.link}`} to="/">
                            <Typography className={classes.brand} variant="h3">
                                Pro Shop
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item={true} lg={5} container={true} justify="flex-start" alignItems="center">
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
                            userProfile && userProfile.isAdmin ? (
                                <Grid item={true}>
                                    <Button
                                        className={classes.button}
                                        size="medium"
                                        onClick={handleAdminMenuClick}
                                        endIcon={
                                            openAdmin ?
                                                <ArrowDropUp className={classes.icon}/> :
                                                <ArrowDropDown className={classes.icon}/>
                                        }
                                        variant="text">
                                        Admin
                                    </Button>
                                    <Menu
                                        component={Paper}
                                        className={classes.menu}
                                        elevation={1}
                                        anchorEl={anchorAdminEl}
                                        keepMounted={true}
                                        onClose={handleAdminClose}
                                        open={Boolean(anchorAdminEl)}>
                                        <MenuItem>
                                            <Link className={classes.profileLink} to="/users">
                                                <Button variant="text" size="large"
                                                        className={classes.dropdownLinkButton}>
                                                    Users
                                                </Button>
                                            </Link>
                                        </MenuItem>
                                        <Divider variant="fullWidth" className={classes.dropdownDivider}/>
                                        <MenuItem>
                                            <Link className={classes.profileLink} to="/products">
                                                <Button variant="text" size="large"
                                                        className={classes.dropdownLinkButton}>
                                                    Products
                                                </Button>
                                            </Link>
                                        </MenuItem>
                                        <Divider variant="fullWidth" className={classes.dropdownDivider}/>
                                        <MenuItem>
                                            <Link className={classes.profileLink} to="/orders">
                                                <Button variant="text" size="large"
                                                        className={classes.dropdownLinkButton}>
                                                    Orders
                                                </Button>
                                            </Link>
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            ) : null
                        }
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
                                                <Button variant="text" size="large"
                                                        className={classes.dropdownLinkButton}>
                                                    Account
                                                </Button>
                                            </Link>
                                        </MenuItem>
                                        <Divider variant="fullWidth" className={classes.dropdownDivider}/>
                                        <MenuItem className={classes.profileLink}
                                                  onClick={handleLogout}>
                                            <Button variant="text" size="large" className={classes.dropdownLinkButton}>
                                                Logout
                                            </Button>
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            ) : (
                                <Grid item={true}>
                                    <Link className={classes.link} to="/login">
                                        <Button
                                            className={classes.dropdownLinkButton}
                                            variant="text"
                                            size="medium">Sign In</Button>
                                    </Link>
                                </Grid>
                            )
                        }
                        <Grid item={true}>
                            <Link className={classes.link} to={`/search`}>
                                <Button
                                    className={classes.searchButton}
                                    variant="outlined"
                                    size="large">
                                    Search
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Toolbar>
    )
}

export default DesktopHeader;