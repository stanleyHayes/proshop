import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    Switch,
    TextField,
    Typography
} from "@material-ui/core";
import {grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {getLoggedInUser, updateProfile} from "../../redux/authentication/authentication-action-creators";
import {useSnackbar} from "notistack";
import {useHistory} from "react-router-dom";

const AccountPage = () => {
    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },

            divider: {
                marginTop: 12,
                marginBottom: 12
            },
            title: {
                textTransform: "uppercase",
                color: grey[700]
            },
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

    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState({});
    const [visible, setVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [e, setError] = useState({});

    const {token, loading, userProfile, error} = useSelector(state => state.authentication);
    const {name, email, phone, password} = user;

    useEffect(() => {
        if (userProfile) {
            setUser({name: userProfile.name, email: userProfile.email, phone: userProfile.phone});
        }

        if (!loading && !userProfile) {
            history.push('/login');
        }
    }, [dispatch, enqueueSnackbar, history, loading, token, userProfile]);


    useEffect(() => {
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
        dispatch(getLoggedInUser(token, handleAlert));
    }, [dispatch, enqueueSnackbar, token]);

    const handleUserChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleConfirmPasswordChange = e => {
        setConfirmPassword(e.target.value);
    }

    const handlePasswordVisibility = () => {
        setVisible(!visible);
    }

    const handleUpdateUser = e => {
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
        e.preventDefault();

        if (password && password !== confirmPassword) {
            setError({...e, password: 'password mismatch', confirmPassword: 'password mismatch'});
            handleAlert('ERROR', 'passwords do no match');
        }
        dispatch(updateProfile(user, token, handleAlert));
    }


    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4">Account</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>

                <Grid container={true} justify="flex-start" spacing={5}>
                    <Grid item={true} xs={12} md={4}>
                        {loading ? <LinearProgress variant="query"/> : null}
                        {error ? (
                            <Box>
                                <Divider variant="fullWidth" className={classes.errorDivider}/>
                                <Typography variant="body2" align="center"
                                            className={classes.error}>{error}</Typography>
                            </Box>
                        ) : null}

                        <Typography className={classes.title} variant="h6">Profile</Typography>
                        <Divider className={classes.divider} variant="fullWidth"/>

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
                            placeholder="Enter new password"
                            variant="outlined"
                            margin="normal"
                            name="password"
                            type={visible ? 'text' : 'password'}
                            label="New Password"
                            required={true}
                            value={password}
                            onChange={handleUserChange}
                            error={Boolean(e.password)}
                            helperText={e.password}
                            className={classes.textField}
                            fullWidth={true}
                        />


                        <TextField
                            placeholder="Enter password again"
                            variant="outlined"
                            margin="normal"
                            name="confirmPassword"
                            type={visible ? 'text' : 'password'}
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required={true}
                            error={Boolean(e.confirmPassword)}
                            helperText={e.confirmPassword}
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

                        <Divider variant="fullWidth" className={classes.divider}/>
                        <Button
                            onClick={handleUpdateUser}
                            variant="contained"
                            disableElevation={true}
                            fullWidth={true}
                            className={classes.signUpButton}
                            size="large"
                            disabled={loading}>
                            Update User
                        </Button>
                    </Grid>
                    <Grid item={true} xs={12} md={8}>
                        {loading ? <LinearProgress variant="query"/> : null}
                        {error ? (
                            <Box>
                                <Divider variant="fullWidth" className={classes.errorDivider}/>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    className={classes.error}>
                                    {error}
                                </Typography>
                            </Box>
                        ) : null}

                        <Typography className={classes.title} variant="h6">Orders</Typography>
                        <Divider className={classes.divider} variant="fullWidth"/>

                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default AccountPage;