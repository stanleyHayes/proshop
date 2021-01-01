import React, {useEffect, useState} from "react";
import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../../redux/cart/cart-action-creators";

const Shipping = ({handleNextClicked}) => {
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
        }
    });
    const classes = useStyles();

    const dispatch = useDispatch();

    const {shippingAddress} = useSelector(state => state.cart);
    const [shipping, setShipping] = useState(shippingAddress || {});
    const {address, city, postalCode, country} = shipping;
    const [e, setError] = useState({});

    const handleShippingChange = e => {
        setShipping({...shipping, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if (shippingAddress) {
            setShipping(shippingAddress);
        }
    }, [shippingAddress]);

    const saveShippingAddressClick = e => {
        e.preventDefault();

        if (!address) {
            return setError({...e, address: 'Address field required'});
        } else {
            setError({...e, address: null})
        }

        if (!city) {
            return setError({...e, city: 'City field required'});
        } else {
            setError({...e, city: null})
        }

        if (!postalCode) {
            return setError({...e, postalCode: 'Postal code field required'});
        } else {
            setError({...e, postalCode: null})
        }

        if (!country) {
            return setError({...e, country: 'Country field required'});
        } else {
            setError({...e, country: null})
        }

        dispatch(saveShippingAddress(shipping));
        handleNextClicked();
    }

    return (
        <Grid container={true} justify="flex-start">
            <Grid item={true} xs={12} md={6}>
                <TextField
                    placeholder="Enter address"
                    variant="outlined"
                    margin="normal"
                    name="address"
                    type="text"
                    label="Address"
                    value={address}
                    required={true}
                    onChange={handleShippingChange}
                    error={Boolean(e.name)}
                    helperText={e.name}
                    className={classes.textField}
                    fullWidth={true}
                />

                <TextField
                    placeholder="Enter city"
                    variant="outlined"
                    margin="normal"
                    name="city"
                    type="text"
                    label="City"
                    value={city}
                    required={true}
                    onChange={handleShippingChange}
                    error={Boolean(e.city)}
                    helperText={e.city}
                    className={classes.textField}
                    fullWidth={true}
                />

                <TextField
                    placeholder="Enter postal code"
                    variant="outlined"
                    margin="normal"
                    name="postalCode"
                    type="text"
                    label="Postal Code"
                    value={postalCode}
                    required={true}
                    onChange={handleShippingChange}
                    error={Boolean(e.postalCode)}
                    helperText={e.postalCode}
                    className={classes.textField}
                    fullWidth={true}
                />

                <TextField
                    placeholder="Enter country"
                    variant="outlined"
                    margin="normal"
                    name="country"
                    type="text"
                    label="Country"
                    value={country}
                    required={true}
                    onChange={handleShippingChange}
                    error={Boolean(e.country)}
                    helperText={e.country}
                    className={classes.textField}
                    fullWidth={true}
                />

                <Button
                    onClick={saveShippingAddressClick}
                    variant="contained"
                    disableElevation={true}
                    fullWidth={false}
                    className={classes.signUpButton}
                    size="large">
                    Proceed to Payment Method
                </Button>

            </Grid>
        </Grid>
    )
}

export default Shipping;