import React, {useState} from "react";
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
import {signUp} from "../../redux/authentication/authentication-action-creators";
import {useSnackbar} from "notistack";
import {grey, red} from "@material-ui/core/colors";
import {Link} from "react-router-dom";
import validator from "validator";

const SignUpPage = () => {

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
            signUpButton: {
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
                fontWeight: 700,
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
                marginTop: 32
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
        }
    });

    const classes = useStyles();

    const [user, setUser] = useState({});
    const {name, email, phone, password} = user;
    const [confirmPassword, setConfirmPassword] = useState("");
    const [e, setError] = useState({});
    const [visible, setVisible] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => state.authentication);

    const handleUserChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleConfirmPasswordChange = e => {
        setConfirmPassword(e.target.value);
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

    const handleSignUpClicked = e => {

        if (!name) {
            setError({...e, name: 'Name field required'});
            handleAlert('ERROR', 'Name field required');
            return;
        } else {
            setError({...e, name: null});
        }

        if (!email) {
            setError({...e, email: 'Email field required'});
            handleAlert('ERROR', 'Email field required');
            return;
        } else {
            setError({...e, email: null});
        }

        if (!validator.isEmail(email)) {
            handleAlert('ERROR', 'Invalid email');
            setError({...e, email: 'Invalid email'});
            return;
        } else {
            setError({...e, email: null});
        }

        if (!phone) {
            setError({...e, phone: 'Phone field required'});
            handleAlert('ERROR', 'Phone field required');
            return;
        } else {
            setError({...e, phone: null});
        }

        if (!validator.isMobilePhone(phone)) {
            setError({...e, phone: 'Invalid phone number'});
            handleAlert('ERROR', 'Invalid');
            return;
        } else {
            setError({...e, phone: null});
        }

        if (!password) {
            setError({...e, password: 'Password field required'});
            handleAlert('ERROR', 'Password field required');
            return;
        } else {
            setError({...e, password: null});
        }

        if (!confirmPassword) {
            setError({...e, confirmPassword: 'Confirm Password field required'});
            handleAlert('ERROR', 'Confirm password field required');
            return;
        } else {
            setError({...e, confirmPassword: null});
        }

        if (password !== confirmPassword) {
            setError({...e, password: 'Password mismatch', confirmPassword: 'Password mismatch'});
            handleAlert('ERROR', 'Password mismatch');
            return;
        } else {
            setError({...e, password: null, confirmPassword: null});
        }
        dispatch(signUp(user, handleAlert))
    }


    return (
        <div className={classes.root}>
            <Container>
                <Typography className={classes.header} variant="h4">Sign Up</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>

                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card elevation={0.5}>
                            {loading ? <LinearProgress variant="query"/> : null}
                            <CardContent>
                                {error ? (
                                    <Box>
                                        <Divider variant="fullWidth" className={classes.errorDivider}/>
                                        <Typography variant="body2" align="center" className={classes.error}>{error}</Typography>
                                    </Box>
                                ) : null}
                                <Typography className={classes.title} variant="h2" align="center">Pro Shop</Typography>
                                <Typography className={classes.tagline} variant="body2" align="center">
                                    Home of Quality Clothing
                                </Typography>

                                <Divider variant="middle" className={classes.headerDivider}/>

                                <TextField
                                    placeholder="Enter full name"
                                    variant="outlined"
                                    margin="normal"
                                    name="name"
                                    type="text"
                                    label="Name"
                                    value={name}
                                    required={true}
                                    onChange={handleUserChange}
                                    error={Boolean(e.name)}
                                    helperText={e.name}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter email"
                                    variant="outlined"
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    value={email}
                                    required={true}
                                    onChange={handleUserChange}
                                    error={Boolean(e.email)}
                                    helperText={e.email}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter phone"
                                    variant="outlined"
                                    margin="normal"
                                    name="phone"
                                    required={true}
                                    type="tel"
                                    label="Phone"
                                    value={phone}
                                    onChange={handleUserChange}
                                    error={Boolean(e.phone)}
                                    helperText={e.phone}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter password"
                                    variant="outlined"
                                    margin="normal"
                                    name="password"
                                    type={visible ? 'text' : 'password'}
                                    label="Password"
                                    required={true}
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
                                    <Typography
                                        variant="body2"
                                        display="inline">
                                        {visible ? 'Hide Password' : 'Show Password'}
                                    </Typography>
                                </Box>


                                <TextField
                                    placeholder="Enter password again"
                                    variant="outlined"
                                    margin="normal"
                                    name="confirmPassword"
                                    type={visible ? 'text' : 'password'}
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required={true}
                                    error={Boolean(e.confirmPassword)}
                                    helperText={e.confirmPassword}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <Divider variant="fullWidth" className={classes.divider}/>
                                <Button
                                    onClick={handleSignUpClicked}
                                    variant="contained"
                                    disableElevation={true}
                                    fullWidth={true}
                                    className={classes.signUpButton}
                                    size="large"
                                    disabled={loading}>
                                    Sign Up
                                </Button>

                                <Link to="/login" className={classes.noAccountLink}>
                                    <Button className={classes.noAccountLink} variant="text" fullWidth={true}>
                                        Already have an account? Login
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

export default SignUpPage;