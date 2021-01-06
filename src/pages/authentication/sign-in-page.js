import React, {useEffect, useState} from "react";
import {
    CardContent,
    Container,
    Grid,
    Card,
    makeStyles,
    TextField,
    Switch,
    Box,
    Typography,
    Divider, Button, LinearProgress
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../redux/authentication/authentication-action-creators";
import {useSnackbar} from "notistack";
import {grey, red} from "@material-ui/core/colors";
import {Link, useLocation, useHistory} from "react-router-dom";
import validator from "validator";

const SignInPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            root: {
                backgroundColor: '#f0f2f5',
                minHeight: '92.6vh',
                display: 'grid',
                justifyItem: "center",
                alignItems: "center",
                paddingTop: 32,
                paddingBottom: 32
            },
            container: {},
            gridContainer: {},
            signInButton: {
                color: "white",
                paddingBottom: 16,
                paddingTop: 16,
                fontWeight: "bold",
                marginBottom: 16,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 300ms 50ms ease-in-out'
                }
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            title: {
                fontWeight: 600,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: theme.palette.primary.dark,
                [theme.breakpoints.down("sm")]: {
                    fontSize: 32
                }
            },
            header: {
                fontWeight: 700,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: grey[700]
            },
            tagline: {
                textTransform: "uppercase",
                color: grey[700],
                fontWeight: 900,
            },
            headerDivider: {
                height: 5,
                backgroundColor: theme.palette.primary.main,
                marginBottom: 32,
                marginTop: 16,
                borderRadius: 32,
                width: 100
            },
            noAccountLink: {
                textDecoration: "none",
                textAlign: "center",
                fontWeight: 700,
                color: theme.palette.primary.main
            },
            errorDivider: {
                height: 5,
                backgroundColor: red[900],
                marginBottom: 16
            },
            error: {
                color: red[900],
                fontWeight: 700
            },
            textField: {
                backgroundColor: "#f0f2f5"
            }
        }
    });

    const classes = useStyles();

    const [user, setUser] = useState({});
    const {email, password} = user;
    const [e, setError] = useState({});
    const [visible, setVisible] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const {loading, error, userProfile} = useSelector(state => state.authentication);

    const handleUserChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handlePasswordVisibility = () => {
        setVisible(!visible);
    }

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

    useEffect(() => {
        if (userProfile) {
            history.push(redirect);
        }
    }, [history, redirect, userProfile]);

    const handleSignInClicked = e => {
        e.preventDefault();
        if (!email) {
            setError({...e, email: 'Email field required'});
            return;
        } else {
            setError({...e, email: null});
        }

        if (!validator.isEmail(email)) {
            setError({...e, email: 'Invalid email'});
            return;
        } else {
            setError({...e, email: null});
        }
        dispatch(signIn(user, handleAlert));
    }

    return (
        <div className={classes.root}>
            <Container>
                <Typography className={classes.header} variant="h4">Sign In</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>
                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="outlined" elevation={0}>
                            {loading ? <LinearProgress variant="query"/> : null}
                            <CardContent>
                                {error ? (
                                    <Box>
                                        <Divider variant="fullWidth" className={classes.errorDivider}/>
                                        <Typography align="center" variant="body2"
                                                    className={classes.error}>{error}</Typography>
                                    </Box>
                                ) : null}
                                <Typography className={classes.title} variant="h2" align="center">Pro Shop</Typography>
                                <Typography className={classes.tagline} variant="body2" align="center">
                                    Home of Quality Clothing
                                </Typography>

                                <Grid container={true} justify="center">
                                    <Grid item={true}>
                                        <Divider variant="middle" className={classes.headerDivider}/>
                                    </Grid>
                                </Grid>

                                <TextField
                                    placeholder="Enter email"
                                    variant="outlined"
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    required={true}
                                    value={email}
                                    onChange={handleUserChange}
                                    error={Boolean(e.email)}
                                    helperText={e.email}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter password"
                                    variant="outlined"
                                    required={true}
                                    margin="normal"
                                    name="password"
                                    type={visible ? 'text' : 'password'}
                                    label="Password"
                                    value={password}
                                    onChange={handleUserChange}
                                    error={Boolean(e.password)}
                                    helperText={e.password}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <Box>
                                    <Switch
                                        color="primary"
                                        className={classes.switch}
                                        size="medium"
                                        onChange={handlePasswordVisibility}
                                        value={visible}
                                    />
                                    <Typography variant="body2"
                                                display="inline">{visible ? 'Hide Password' : 'Show Password'}</Typography>
                                </Box>


                                <Divider variant="fullWidth" className={classes.divider}/>

                                <Button
                                    onClick={handleSignInClicked}
                                    variant="contained"
                                    disableElevation={true}
                                    fullWidth={true}
                                    className={classes.signInButton}
                                    size="large"
                                    disabled={loading}>
                                    Sign In
                                </Button>

                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}
                                      className={classes.noAccountLink}>
                                    <Button className={classes.noAccountLink} variant="text" fullWidth={true}>
                                        Don't have an account? Register
                                    </Button>
                                </Link>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default SignInPage;