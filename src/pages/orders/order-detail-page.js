import React, {useEffect} from "react";
import Layout from "../../components/layout/layout";
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    Typography
} from "@material-ui/core";
import {grey, red} from "@material-ui/core/colors";
import {useParams, useHistory, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../redux/orders/order-action-creators";
import {useSnackbar} from "notistack";
import {Alert, AlertTitle} from "@material-ui/lab";

const OrderDetailPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },

            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            title: {
                textTransform: "uppercase",
                color: grey[700]
            },
            root: {},
            signUpButton: {
                color: "white",
                paddingBottom: 12,
                paddingTop: 12,
                fontWeight: "bold",
                marginBottom: 16,
                marginTop: 16,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 300ms 50ms ease-in-out'
                }
            },
            subtitle: {
                textTransform: "uppercase",
                marginBottom: 16,
                fontWeight: 700,
                color: grey[700]
            },
            label: {
                fontWeight: 900
            },
            link: {
                textDecoration: "none",
                color: grey[900]
            },
            avatar: {},
            price: {
                paddingRight: 4,
                paddingLeft: 4,
                color: grey[700]
            },
            summaryDivider: {
                marginBottom: 8,
                marginTop: 8
            },
            box: {
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16
            },
            summaryLabel: {
                color: grey[700],
                fontWeight: 600
            },
            placeOrderButton: {
                color: "white",
                paddingBottom: 12,
                paddingTop: 12,
                fontWeight: "bold",
                marginBottom: 16,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 300ms 50ms ease-in-out'
                }
            },
            summaryCard: {
                backgroundColor: "#f0f2f5"
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
            totalPriceBox: {
                paddingBottom: 32
            },
            makePaymentButton: {
                color: "white",
                fontWeight: 700,
                borderColor: "white",
                borderWidth: 2
            }
        }
    });
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.authentication);
    const {enqueueSnackbar} = useSnackbar();
    const {orderID} = useParams();
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
        dispatch(getOrder(orderID, token, handleAlert));
    }, [dispatch, enqueueSnackbar, history, orderID, token]);

    let {orderError, error, orderDetail} = useSelector(state => state.orders);
    if(!orderError){
        orderDetail.itemsPrice = orderDetail.items.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0);
    }

    const getDisplayPaymentMethod = code => {
        switch (code) {
            case 'MOMO':
                return 'Mobile Money';
            case 'PAY_PAL':
                return 'PayPal';
            case 'CREDIT_CARD':
                return 'Credit Card';
            case 'STRIPE':
                return 'Stripe';
            default:
                return 'MOMO';
        }
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4">Order Detail ({orderDetail._id})</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>

                {orderError ? <LinearProgress variant="query"/> : error ? (
                    <Box>
                        <Divider variant="fullWidth" className={classes.errorDivider}/>
                        <Typography variant="h6" className={classes.error}>{error}</Typography>
                    </Box>
                ) : (
                    <Grid container={true} spacing={5}>
                        <Grid item={true} xs={12} md={8}>
                            <Grid container={true}>
                                <Grid item={true} xs={12}>
                                    <Typography gutterBottom={true} variant="h6"
                                                className={classes.subtitle}>Shipping</Typography>

                                    <Typography gutterBottom={true} display="inline" variant="body1"
                                                className={classes.label}>Name: </Typography>
                                    <Typography
                                        gutterBottom={true}
                                        display="inline"
                                        variant="body1">
                                        {orderDetail.user.name}
                                    </Typography>

                                    <p/>
                                    <Typography gutterBottom={true} display="inline" variant="body1"
                                                className={classes.label}>Email: </Typography>
                                    <Typography
                                        gutterBottom={true}
                                        display="inline"
                                        variant="body1">
                                        <a className={classes.link} href={`mailto:${orderDetail.user.email}`}>{orderDetail.user.email}</a>
                                    </Typography>
                                    <p/>

                                    <Typography gutterBottom={true} display="inline" variant="body1"
                                                className={classes.label}>Address: </Typography>
                                    <Typography
                                        gutterBottom={true}
                                        display="inline"
                                        variant="body1">
                                        {orderDetail.shippingAddress.address}, {orderDetail.shippingAddress.city}, {orderDetail.shippingAddress.postalCode}, {orderDetail.shippingAddress.country}
                                    </Typography>

                                    {orderDetail.isDelivered ? (
                                        <Alert variant="standard" elevation={1} severity="success">
                                            <AlertTitle>Delivered</AlertTitle>
                                            Paid on {new Date(orderDetail.deliveredAt).toDateString()}
                                        </Alert>
                                    ): (
                                        <Alert variant="filled" severity="warning">
                                            <AlertTitle>Not Delivered</AlertTitle>
                                            Items will be delivered soon.
                                        </Alert>
                                    )}

                                    <Divider variant="fullWidth" className={classes.divider}/>

                                    <Typography gutterBottom={true} variant="h6" className={classes.subtitle}>
                                        payment method
                                    </Typography>

                                    <Typography display="inline" variant="body1"
                                                className={classes.label}>Method: </Typography>
                                    <Typography
                                        display="inline"
                                        variant="body1">
                                        {getDisplayPaymentMethod(orderDetail.paymentMethod)}
                                    </Typography>

                                    {orderDetail.isPaid ? (
                                        <Alert variant="standard" elevation={1} severity="success">
                                            <AlertTitle>Paid</AlertTitle>
                                            Paid on {new Date(orderDetail.paidAt).toDateString()}
                                        </Alert>
                                    ): (
                                        <Alert variant="filled" severity="warning">
                                            <AlertTitle>Not Paid</AlertTitle>
                                            <Button className={classes.makePaymentButton} variant="outlined">Make Payment</Button>
                                        </Alert>
                                    )}

                                    <Divider variant="fullWidth" className={classes.divider}/>

                                    <Typography gutterBottom={true} variant="h6" className={classes.subtitle}>order
                                        items</Typography>
                                    <Grid container={true}>
                                        {
                                             orderDetail.items.map(item => {
                                                return (
                                                    <Grid alignItems="center" spacing={2} key={item.product}
                                                          container={true}
                                                          item={true}>
                                                        <Grid item={true} xs={2}>
                                                            <Avatar variant="rounded" src={item.image}
                                                                    className={classes.avatar}/>
                                                        </Grid>
                                                        <Grid item={true} xs={6}>
                                                            <Link to={`/products/${item.product}`}
                                                                  className={classes.link}>
                                                                <Typography variant="body2">{item.name}</Typography>
                                                            </Link>
                                                        </Grid>
                                                        <Grid item={true} xs={4}>
                                                            <Typography variant="body2" display="inline"
                                                                        className={classes.price}>{item.quantity}</Typography>
                                                            <Typography variant="body2" display="inline"
                                                                        className={classes.price}> x </Typography>
                                                            <Typography variant="body2" display="inline"
                                                                        className={classes.price}>${item.price}</Typography>
                                                            <Typography variant="body2" display="inline"
                                                                        className={classes.price}> = </Typography>
                                                            <Typography variant="body2" display="inline"
                                                                        className={classes.price}>${(item.quantity * item.price).toFixed(2)}</Typography>
                                                        </Grid>

                                                        <Grid item={true} xs={12}>
                                                            <Divider className={classes.summaryDivider}
                                                                     variant="fullWidth"/>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item={true} xs={12} md={4}>
                            <Card className={classes.summaryCard} variant="outlined">
                                <Box className={classes.box}>
                                    <Typography variant="h6" className={classes.subtitle}>Order Summary</Typography>
                                </Box>
                                <Divider className={classes.summaryDivider}/>
                                <Grid container={true} alignItems="center">
                                    <Grid item={true} xs={6}>
                                        <Box className={classes.box}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                Items
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Box className={classes.box}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                ${orderDetail.itemsPrice}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item={true} xs={12}>
                                        <Divider className={classes.summaryDivider} variant="fullWidth"/>
                                    </Grid>

                                    <Grid item={true} xs={6}>
                                        <Box className={classes.box}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                Shipping
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Box className={classes.box}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                ${orderDetail.shippingPrice}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item={true} xs={12}>
                                        <Divider className={classes.summaryDivider} variant="fullWidth"/>
                                    </Grid>

                                    <Grid item={true} xs={6}>
                                        <Box className={classes.box}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                Tax
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Box className={classes.box}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                ${orderDetail.taxPrice}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item={true} xs={12}>
                                        <Divider className={classes.summaryDivider} variant="fullWidth"/>
                                    </Grid>

                                    <Grid item={true} xs={6}>
                                        <Box className={`${classes.totalPriceBox} ${classes.box}`}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                Total
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Box className={`${classes.totalPriceBox} ${classes.box}`}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                ${orderDetail.totalPrice}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}

export default OrderDetailPage;