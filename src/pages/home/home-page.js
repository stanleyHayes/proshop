import {Container, Divider, Grid, makeStyles, LinearProgress, Box} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import React, {useEffect} from "react";
import Product from "../../components/shared/product";
import {grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/product/product-action-creators";
import Typography from "@material-ui/core/Typography";
import {useSnackbar} from "notistack";

const HomePage = () => {

    const useStyles = makeStyles(theme => {
        return {
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            title: {
                textTransform: "uppercase",
                color: grey[700]
            },
            container: {
                paddingTop: 32
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
            noProductsText: {
                textTransform: "uppercase",
                color: grey[600]
            }
        }
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector(state => state.products);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const handleAlert = (status, message) => {
            switch (status){
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
        dispatch(getProducts(handleAlert));
    }, [dispatch, enqueueSnackbar]);

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4">Latest Products</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>
                {loading ? <LinearProgress variant="query"/> : error ? (
                    <Box>
                        <Divider variant="fullWidth" className={classes.errorDivider} />
                        <Typography variant="h6" className={classes.error}>{error}</Typography>
                    </Box>
                ) : (
                    products.length ? (
                        <Grid container={true} spacing={2}>
                            {products.map(product => {
                                return (
                                    <Grid key={product._id} item={true} xs={12} md={4} lg={3} xl={3}>
                                        <Product product={product}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    ) : (
                        <Grid container={true}>
                            <Grid item={true}>
                                <Typography className={classes.noProductsText} variant="h6" align="center">No Products Available</Typography>
                            </Grid>
                        </Grid>
                    )
                )}
            </Container>
        </Layout>
    )
}

export default HomePage;