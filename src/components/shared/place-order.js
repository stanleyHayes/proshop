import React from "react";
import {Avatar, Button, Divider, Grid, makeStyles, Typography, Card, Box} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const PlaceOrder = ({handlePreviousClicked}) => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },

            divider: {
                marginTop: 16,
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
                color: grey[700]
            },
            avatar: {},
            price: {
                paddingRight: 4,
                paddingLeft: 4,
                color: grey[700]
            },
            summaryDivider: {
                marginBottom: 8,
                marginTop: 16
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
            }, summaryCard: {
                backgroundColor: "#f0f2f5"
            }
        }
    });
    const classes = useStyles();


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
    let {shippingAddress, paymentMethod, items, itemsPrice, shippingPrice, taxPrice, totalPrice} = useSelector(state => state.cart);

    const handlePlaceOrderClicked = e => {

    }

    const addDecimal = price => {
        return (Math.round(price * 100) / 100).toFixed(2);
    }

    itemsPrice = items.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0);
    shippingPrice = itemsPrice > 100.00 ? addDecimal(0.00) : 100.00;
    taxPrice = Number((0.15 * itemsPrice).toFixed(2))
    totalPrice = Number(itemsPrice) + Number(shippingPrice) + taxPrice;

    return (
        <Grid container={true} spacing={5}>
            <Grid item={true} xs={12} md={8}>
                <Grid container={true}>
                    <Grid item={true} xs={12}>
                        <Typography gutterBottom={true} variant="h6" className={classes.subtitle}>Shipping</Typography>
                        <Typography display="inline" variant="body1" className={classes.label}>Address: </Typography>
                        <Typography
                            display="inline"
                            variant="body1">
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </Typography>

                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} variant="h6" className={classes.subtitle}>payment
                            method</Typography>

                        <Typography display="inline" variant="body1" className={classes.label}>Method: </Typography>
                        <Typography
                            display="inline"
                            variant="body1">
                            {getDisplayPaymentMethod(paymentMethod)}
                        </Typography>

                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} variant="h6" className={classes.subtitle}>order
                            items</Typography>
                        <Grid container={true}>
                            {
                                items.map(item => {
                                    return (
                                        <Grid alignItems="center" spacing={1} key={item.product} container={true}
                                              item={true}>
                                            <Grid item={true} xs={2}>
                                                <Avatar variant="rounded" src={item.image} className={classes.avatar}/>
                                            </Grid>
                                            <Grid item={true} xs={6}>
                                                <Link to={`/products/${item.product}`} className={classes.link}>
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
                                                <Divider className={classes.summaryDivider} variant="fullWidth"/>
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                    <Grid item={true}>
                        <Grid container={true}>
                            <Grid item={true}>
                                <Button
                                    onClick={handlePreviousClicked}
                                    variant="contained"
                                    disableElevation={true}
                                    fullWidth={true}
                                    className={classes.signUpButton}
                                    size="large">
                                    Back to Payment Method
                                </Button>
                            </Grid>
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
                                    ${itemsPrice}
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
                                    ${shippingPrice}
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
                                    ${taxPrice}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item={true} xs={12}>
                            <Divider className={classes.summaryDivider} variant="fullWidth"/>
                        </Grid>

                        <Grid item={true} xs={6}>
                            <Box className={classes.box}>
                                <Typography variant="body2" className={classes.summaryLabel}>
                                    Total
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Box className={classes.box}>
                                <Typography variant="body2" className={classes.summaryLabel}>
                                    ${totalPrice}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item={true} xs={12}>
                            <Divider className={classes.summaryDivider} variant="fullWidth"/>
                        </Grid>

                        <Grid item={true} xs={12}>
                            <Box className={classes.box}>
                                <Button
                                    onClick={handlePlaceOrderClicked}
                                    variant="contained"
                                    disableElevation={true}
                                    fullWidth={true}
                                    className={classes.placeOrderButton}
                                    size="medium">
                                    Place Order
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Card>
            </Grid>
        </Grid>

    )
}


export default PlaceOrder;