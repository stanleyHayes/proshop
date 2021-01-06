import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Box,
    Button, CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    Card,
    Switch,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import {blueGrey, grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {getLoggedInUser, updateProfile} from "../../redux/authentication/authentication-action-creators";
import {useSnackbar} from "notistack";
import {Link, useHistory} from "react-router-dom";
import {getOrdersByUser} from "../../redux/orders/order-action-creators";
import {Cancel} from "@material-ui/icons";

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
            noOrdersText: {
                textTransform: "uppercase",
                color: grey[600]
            },
            noCartItemsDivider: {
                backgroundColor: blueGrey[700],
                height: 5,
                marginBottom: 16
            },
            tableHead: {
                color: grey[700],
                fontWeight: 700,
                textTransform: "uppercase"
            },
            productImage: {
                width: 50,
                height: 50
            },
            cancelIcon: {
                color: red[900]
            },
            detailButton: {
                borderWidth: 2,
                borderColor: grey[500],
                backgroundColor: "white",
                fontWeight: "bold",
                color: grey[500]
            },
            link: {
                textDecoration: "none"
            },
            textField: {
                backgroundColor: "#f0f2f5"
            }
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
        dispatch(getOrdersByUser(token, handleAlert));
    }, [dispatch, enqueueSnackbar, token]);

    const {orders, ordersError, orderLoading} = useSelector(state => state.orders);

    return (
        <Layout>
            <Container maxWidth="xl" className={classes.container}>
                <Typography className={classes.title} variant="h4">Account</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>

                <Grid container={true} justify="flex-start" spacing={5}>
                    <Grid item={true} xs={12} md={3}>
                        <Card variant="outlined" elevation={0}>
                            <CardContent>
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
                                    fullWidth={false}
                                    className={classes.signUpButton}
                                    size="large"
                                    disabled={loading}>
                                    Update
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true} xs={12} md={9}>
                        <Card variant="outlined" elevation={0}>
                            <CardContent>
                                {orderLoading ? <LinearProgress variant="query"/> : null}
                                {ordersError ? (
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
                                {
                                    orders.length ? (
                                        <TableContainer>
                                            <Table stickyHeader={true} size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left">Id</TableCell>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left">Date</TableCell>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left">Total</TableCell>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left">Paid</TableCell>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left">Delivered</TableCell>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left"/>
                                                        <TableCell/>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        orders.map((order, index) => {
                                                            return (
                                                                <TableRow key={index} hover={true}>

                                                                    <TableCell>{order._id}</TableCell>
                                                                    <TableCell>{new Date(order.createdAt).toDateString()}</TableCell>
                                                                    <TableCell>${order.totalPrice}</TableCell>
                                                                    <TableCell>{order.isPaid ? new Date(order.paidAt).toDateString() :
                                                                        <Cancel
                                                                            className={classes.cancelIcon}/>}</TableCell>
                                                                    <TableCell>{order.isDelivered ? new Date(order.isDelivered).toDateString() :
                                                                        <Cancel
                                                                            className={classes.cancelIcon}/>}</TableCell>
                                                                    <TableCell>
                                                                        <Link className={classes.link}
                                                                              to={`/orders/${order._id}`}>
                                                                            <Button
                                                                                className={classes.detailButton}
                                                                                fullWidth={true}
                                                                                size="medium"
                                                                                variant="outlined">Detail</Button>
                                                                        </Link>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <Grid container={true}>
                                            <Grid item={true}>
                                                <Typography className={classes.noOrdersText} variant="h6"
                                                            align="center">No
                                                    Orders Available</Typography>
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default AccountPage;