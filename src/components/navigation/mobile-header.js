import React from "react";
import {Button, Container, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Menu, ShoppingCart, VerifiedUser} from "@material-ui/icons";
import {Link} from "react-router-dom";

const MobileHeader = () => {

    const useStyles = makeStyles(theme => {
        return {

            brand: {
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase"
            },
            icon: {
                color: "white",
                fontWeight: "bold"
            },
            link: {
                textDecoration: "none",
                color: "white"
            }
        }
    });

    const classes = useStyles();

    return (
        <Toolbar variant="regular">
            <Container>
                <Grid alignItems="center" container={true} spacing={2}>
                    <Grid item={true} xs={2}>
                        <Menu className={classes.icon}/>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <Typography className={classes.brand} variant="h6">Pro Shop</Typography>
                    </Grid>
                    <Grid xs={6} item={true} container={true} justify="flex-end">
                        <Link to="/cart">
                            <Button  size="large" className={classes.icon} startIcon={<ShoppingCart className={classes.icon}/>}/>
                        </Link>
                        <Link to="/account">
                            <Button size="large" className={classes.icon} startIcon={<VerifiedUser className={classes.icon}/> }/>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Toolbar>
    )
}

export default MobileHeader;