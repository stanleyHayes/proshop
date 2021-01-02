import React from "react";
import Layout from "../../components/layout/layout";
import {Container, Divider, makeStyles, Typography} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const OrdersPage = () => {
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
        }
    });
    const classes = useStyles();

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4">Orders</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>
            </Container>
        </Layout>
    )
}

export default OrdersPage;