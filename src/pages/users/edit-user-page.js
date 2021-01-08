import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Box, Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    TextField,
    Typography,
    Checkbox
} from "@material-ui/core";
import {grey, red} from "@material-ui/core/colors";
import {useParams, useHistory} from "react-router-dom";
import {getUser, updateUser} from "../../redux/users/user-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import validator from "validator";

const EditUserPage = () => {
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
            errorDivider: {
                height: 5,
                backgroundColor: red[900],
                marginBottom: 16
            },
            error: {
                color: red[900],
                fontWeight: 700
            },
            signUpButton: {
                color: "white",
                paddingBottom: 12,
                paddingTop: 12,
                fontWeight: "bold",
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 300ms 50ms ease-in-out'
                }
            },
            isAdminText: {
                textTransform: "uppercase",
                color: grey[700],
                fontWeight: 600
            }
        }
    });
    const classes = useStyles();

    const {userID} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const {userProfile, token} = useSelector(state => state.authentication);
    const {userLoading, userDetail, userError} = useSelector(state => state.users);
    const [user, setUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const {name, email, phone} = user;
    const [e, setError] = useState({});

    const handleUserChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

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
        if (userProfile && userProfile.isAdmin) {
            dispatch(getUser(userID, token, handleAlert));
        } else {
            history.push('/login')
        }
    }, [dispatch, enqueueSnackbar, history, token, userID, userProfile]);


    useEffect(() => {
        if (userDetail) {
            setUser(userDetail);
            setIsAdmin(userDetail.isAdmin);
        }
    }, [userDetail]);

    const handleAdminChange = () => {
        setIsAdmin(!isAdmin);
    }

    const handleUpdateUser = e => {
        e.preventDefault();
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

        if (!name) {
            setError({...e, name: 'Name field required'});
            handleAlert('ERROR', 'Name field required');
        } else {
            setError({...e, name: null});
        }

        if (!email) {
            setError({...e, email: 'Email field required'});
            handleAlert('ERROR', 'Email field required');
        } else {
            setError({...e, email: null});
        }

        if (!validator.isEmail(email)) {
            handleAlert('ERROR', 'Invalid email');
            setError({...e, email: 'Invalid email'});
        } else {
            setError({...e, email: null});
        }

        if (!phone) {
            setError({...e, phone: 'Phone field required'});
            handleAlert('ERROR', 'Phone field required');
        } else {
            setError({...e, phone: null});
        }

        if (!validator.isMobilePhone(phone)) {
            setError({...e, phone: 'Invalid phone number'});
            handleAlert('ERROR', 'Invalid');
        } else {
            setError({...e, phone: null});
        }

        dispatch(updateUser(userID, {
            name: user.name,
            email: user.email,
            phone: user.phone,
            "isAdmin": isAdmin
        }, token, handleAlert));
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4">Update User</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>

                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={5}>
                        <Card variant="outlined" elevation={0}>
                            <CardContent>
                                {userLoading ? <LinearProgress variant="query"/> : null}
                                {userError ? (
                                    <Box>
                                        <Divider variant="fullWidth" className={classes.errorDivider}/>
                                        <Typography variant="body2" align="center"
                                                    className={classes.error}>{userError}</Typography>
                                    </Box>
                                ) : null}

                                <TextField
                                    InputLabelProps={{shrink: true}}
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
                                    InputLabelProps={{shrink: true}}
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
                                    InputLabelProps={{shrink: true}}
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

                                <Grid container={true} justify="flex-start" alignItems="center">
                                    <Grid item={true}>
                                        <Checkbox
                                            defaultValue={isAdmin}
                                            name="isAdmin"
                                            color="primary"
                                            className={classes.switch}
                                            size="medium"
                                            checked={isAdmin}
                                            onChange={handleAdminChange}
                                            value={isAdmin}
                                        />

                                    </Grid>
                                    <Grid item={true}>
                                        <Typography
                                            className={classes.isAdminText}
                                            variant="body2"
                                            display="inline">
                                            Is Admin
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Divider variant="fullWidth" className={classes.divider}/>
                                <Button
                                    onClick={handleUpdateUser}
                                    variant="contained"
                                    disableElevation={true}
                                    fullWidth={true}
                                    className={classes.signUpButton}
                                    size="large"
                                    disabled={userLoading}>
                                    Update
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default EditUserPage;