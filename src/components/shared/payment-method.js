import React, {useState} from "react";
import {Button, Grid, makeStyles, Select, MenuItem, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {grey} from "@material-ui/core/colors";
import {savePaymentMethod} from "../../redux/cart/cart-action-creators";

const PaymentMethod = ({handleNextClicked, handlePreviousClicked}) => {

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
                marginTop: 32,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 300ms 50ms ease-in-out'
                }
            },
            subtitle: {
                textTransform: "uppercase",
                marginBottom: 16
            }
        }
    });
    const classes = useStyles();

    const [paymentMethod, setPaymentMethod] = useState("MOMO");
    const dispatch = useDispatch();
    const {shippingAddress} = useSelector(state => state.cart);

    if (!shippingAddress) {
        handlePreviousClicked();
    }

    const handlePaymentMethodClicked = () => {
        dispatch(savePaymentMethod(paymentMethod));
        handleNextClicked();
    }

    const handlePaymentMethodChanged = e => {
        setPaymentMethod(e.target.value);
    }


    return (
        <Grid container={true} justify="flex-start">
            <Grid item={true} xs={12} >
                <Typography className={classes.subtitle} variant="body2" gutterBottom={true}>Select Payment method</Typography>
                <Select
                    variant="outlined"
                    margin="none"
                    fullWidth={true}
                    label="Payment Method"
                    required={true}
                    value={paymentMethod} defaultValue="MOMO"
                    onChange={handlePaymentMethodChanged}>
                    <MenuItem value="MOMO">Mobile Money</MenuItem>
                    <MenuItem value="PAY_PAL">PayPal</MenuItem>
                    <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>
                    <MenuItem value="STRIPE">Stripe</MenuItem>
                </Select>

                <Grid container={true} spacing={4}>
                    <Grid item={true}>
                        <Button
                            onClick={handlePreviousClicked}
                            variant="contained"
                            disableElevation={true}
                            fullWidth={true}
                            className={classes.signUpButton}
                            size="large">
                            Back to Shipping
                        </Button>
                    </Grid>
                    <Grid item={true}>
                        <Button
                            onClick={handlePaymentMethodClicked}
                            variant="contained"
                            disableElevation={true}
                            fullWidth={true}
                            className={classes.signUpButton}
                            size="large">
                            Proceed to Place Order
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default PaymentMethod;