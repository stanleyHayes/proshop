import React, {useEffect} from "react";
import Layout from "../../components/layout/layout";
import {
    Avatar,
    Box,
    Button,
    Card, CardContent,
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
import {getOrder, updateOrder} from "../../redux/orders/order-action-creators";
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
                marginBottom: 12,
                marginTop: 12
            },
            box: {},
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
            },
            updateDeliveryStatusButton: {
                color: "white",
                paddingBottom: 12,
                paddingTop: 12,
                fontWeight: "bold",
                marginTop: 16,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 300ms 50ms ease-in-out'
                }
            },
        }
    });
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const {token, userProfile} = useSelector(state => state.authentication);
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

    let {orderError, ordersLoading, orderDetail} = useSelector(state => state.orders);

    if (orderDetail) {
        orderDetail.itemsPrice = orderDetail && orderDetail.items && orderDetail.items.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0);
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

    const handleMarkAsDelivered = () => {
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
        dispatch(updateOrder(orderID, {isDelivered: !orderDetail.isDelivered}, token, handleAlert));
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4">Order Detail
                    ({orderDetail && orderDetail._id})</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>

                {ordersLoading && <LinearProgress variant="query"/>}
                {orderError ? (
                    <Box>
                        <Divider variant="fullWidth" className={classes.errorDivider}/>
                        <Typography variant="h6" className={classes.error}>{orderError}</Typography>
                    </Box>
                ) : (
                    <Grid container={true} spacing={5}>
                        <Grid item={true} xs={12} md={8}>
                            <Card variant="outlined">
                                <CardContent>
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
                                                {orderDetail && orderDetail.user && orderDetail.user.name}
                                            </Typography>

                                            <p/>
                                            <Typography gutterBottom={true} display="inline" variant="body1"
                                                        className={classes.label}>Email: </Typography>
                                            <Typography
                                                gutterBottom={true}
                                                display="inline"
                                                variant="body1">
                                                <a className={classes.link}
                                                   href={`mailto:${orderDetail && orderDetail.user && orderDetail.user.email}`}>{orderDetail && orderDetail.user && orderDetail.user.email}</a>
                                            </Typography>
                                            <p/>

                                            <Typography gutterBottom={true} display="inline" variant="body1"
                                                        className={classes.label}>Address: </Typography>
                                            <Typography
                                                gutterBottom={true}
                                                display="inline"
                                                variant="body1">
                                                {orderDetail && orderDetail.shippingAddress && orderDetail.shippingAddress.address}, {orderDetail && orderDetail.shippingAddress && orderDetail.shippingAddress.city}, {orderDetail && orderDetail.shippingAddress && orderDetail.shippingAddress.postalCode}, {orderDetail && orderDetail.shippingAddress && orderDetail.shippingAddress.country}
                                            </Typography>

                                            {orderDetail && orderDetail.isDelivered ? (
                                                <Alert variant="filled" severity="success">
                                                    <AlertTitle>Delivered</AlertTitle>
                                                    Paid
                                                    on {new Date(orderDetail && orderDetail.deliveredAt).toDateString()}
                                                </Alert>
                                            ) : (
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
                                                {orderDetail && getDisplayPaymentMethod(orderDetail.paymentMethod)}
                                            </Typography>

                                            {orderDetail && orderDetail.isPaid ? (
                                                <Alert variant="filled" severity="success">
                                                    <AlertTitle>Paid</AlertTitle>
                                                    Paid on {new Date(orderDetail && orderDetail.paidAt).toDateString()}
                                                </Alert>
                                            ) : (
                                                <Alert variant="filled" severity="warning">
                                                    <AlertTitle>Not Paid</AlertTitle>
                                                    <Button className={classes.makePaymentButton} variant="outlined">Make
                                                        Payment</Button>
                                                </Alert>
                                            )}

                                            <Divider variant="fullWidth" className={classes.divider}/>

                                            <Typography gutterBottom={true} variant="h6" className={classes.subtitle}>order
                                                items</Typography>
                                            <Grid container={true}>
                                                {
                                                    orderDetail && orderDetail.items && orderDetail.items.map(item => {
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
                                                                        <Typography
                                                                            variant="body2">{item.name}</Typography>
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
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item={true} xs={12} md={4}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" className={classes.subtitle}>Order Summary</Typography>
                                    <Divider className={classes.summaryDivider}/>
                                    <Grid container={true} alignItems="center">
                                        <Grid item={true} xs={6}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                Items
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={6}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                ${orderDetail && orderDetail.itemsPrice}
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <Divider className={classes.summaryDivider} variant="fullWidth"/>
                                        </Grid>

                                        <Grid item={true} xs={6}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                Shipping
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={6}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                ${orderDetail && orderDetail.shippingPrice}
                                            </Typography>
                                        </Grid>

                                        <Grid item={true} xs={12}>
                                            <Divider className={classes.summaryDivider} variant="fullWidth"/>
                                        </Grid>

                                        <Grid item={true} xs={6}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                Tax
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={6}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                ${orderDetail && orderDetail.taxPrice}
                                            </Typography>
                                        </Grid>

                                        <Grid item={true} xs={12}>
                                            <Divider className={classes.summaryDivider} variant="fullWidth"/>
                                        </Grid>

                                        <Grid item={true} xs={6}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                Total
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={6}>
                                            <Typography variant="body2" className={classes.summaryLabel}>
                                                ${orderDetail && orderDetail.totalPrice}
                                            </Typography>
                                        </Grid>
                                        <Divider className={classes.summaryDivider}
                                                 variant="fullWidth"/>
                                        {
                                            userProfile && userProfile.isAdmin && orderDetail && orderDetail.isPaid ? (
                                                <Button
                                                    onClick={handleMarkAsDelivered}
                                                    variant="contained"
                                                    disableElevation={true}
                                                    fullWidth={true}
                                                    className={classes.updateDeliveryStatusButton}
                                                    size="small"
                                                    disabled={ordersLoading}>
                                                    {orderDetail && orderDetail.isDelivered ? 'Mark as not delivered' : 'mark as delivered'}
                                                </Button>
                                            ) : null
                                        }

                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}

export default OrderDetailPage;