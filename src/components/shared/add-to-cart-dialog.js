import React from "react";
import {DialogContent, Dialog, DialogActions, Divider, Button, makeStyles, Typography} from "@material-ui/core";
import {green, grey} from "@material-ui/core/colors";

const AddToCartDialog = ({open, handleContinueShopping, handleGoToCart}) => {

    const useStyles = makeStyles(theme => {
        return {
            goToCartButton: {
                fontWeight: "bold",
                color: green["900"]
            },
            continueShoppingButton: {
                fontWeight: "bold",
                color: grey["700"]
            }
        }
    });

    const classes = useStyles();

    const handleGoToCartClicked = () => {
        handleGoToCart()
    }

    const handleContinueShoppingClicked = () => {
        handleContinueShopping()
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                <Typography
                    variant="h6"
                    align="center">
                    Would your like to continue shopping or go to your cart?
                </Typography>
            </DialogContent>
            <Divider variant="fullWidth"/>
            <DialogActions>
                <Button
                    onClick={handleGoToCartClicked}
                    variant="text"
                    className={classes.goToCartButton}>
                    Go To Cart
                </Button>
                <Button
                    onClick={handleContinueShoppingClicked}
                    variant="text"
                    className={classes.continueShoppingButton}>
                    Continue Shopping
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddToCartDialog;