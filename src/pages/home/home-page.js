import {Container, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import React from "react";
import products from "../../products";
import Product from "../../components/shared/product";
import {grey} from "@material-ui/core/colors";

const HomePage = () => {

    const useStyles = makeStyles(theme => {
        return {
            divider : {
                marginTop: 32,
                marginBottom: 32
            },
            title: {
                textTransform: "uppercase",
                color: grey[700]
            },
            container: {
                paddingTop: 32
            }
        }
    });

    const classes = useStyles();

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4">Latest Products</Typography>
                <Divider className={classes.divider} variant="fullWidth" />
                {products.length ? (
                    <Grid container={true} spacing={4}>
                        {products.map(product => {
                            return (
                                <Grid key={product._id} item={true} xs={12} md={4} lg={3} xl={3}>
                                    <Product product={product} />
                                </Grid>
                            )
                        })}
                    </Grid>
                ): (
                    <Grid container={true}>
                        <Grid item={true}>
                            <Typography variant="h6" align="center">No Products Available</Typography>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}

export default HomePage;