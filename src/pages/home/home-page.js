import {Container, Divider, Grid, makeStyles, LinearProgress, Box, Typography, Button} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import React, {useEffect, useState} from "react";
import Product from "../../components/shared/product";
import {grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, getTopRatedProducts} from "../../redux/product/product-action-creators";
import {useSnackbar} from "notistack";
import {Pagination, AlertTitle, Alert} from "@material-ui/lab";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Link} from "react-router-dom";
import Meta from "../../components/shared/meta";

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
                paddingTop: 32,
                flexGrow: 1
            },
            root: {
                display: "flex",
                flexDirection: "column",
                minHeight: '90vh',
                justifyContent: "flex-start"
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
            },
            productImage: {
                height: 500,
                width: 250,
                borderRadius: '100%',
                objectPosition: "center",
                objectFit: "cover"
            },
            viewProductButton: {
                borderWidth: 2,
                borderColor: "white",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: "white",
                fontWeight: "bold",
                marginTop: 4,
                marginBottom: 4,
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    transition: 'all 500ms ease-out'
                }
            },
            carousel: {

            },
            imageContainer: {
                paddingTop: 32,
                position: 'relative',
                height: '85vh',
                [theme.breakpoints.down("md")]: {
                    height: '90vh',
                }
            },
            productPrice: {
                fontWeight: "bold",
                color: "white",
                textTransform: "uppercase",
                marginTop: 4,
                marginBottom: 4
            },
            content: {
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 16,
                paddingBottom: 32,
                zIndex: 2
            },
            productName: {
                fontWeight: "bold",
                color: "white",
                marginTop: 4,
                marginBottom: 4,
                textTransform: "uppercase"
            },
            link: {
                textDecoration: "none"
            }
        }
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const {products, loading, error, count, topRatedProducts} = useSelector(state => state.products);
    const {enqueueSnackbar} = useSnackbar();
    const [page, setPage] = useState(1);

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
        dispatch(getProducts(null, page, handleAlert));
        dispatch(getTopRatedProducts(handleAlert));
    }, [dispatch, enqueueSnackbar, page]);


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
        dispatch(getTopRatedProducts(handleAlert));
    }, [dispatch, enqueueSnackbar]);

    const handlePageChange = (event, page) => {
        setPage(page);
    }

    return (
        <Layout>
            <Meta title={'Welcome to Proshop | Home'}  />
            <div className={classes.root}>
                <Carousel
                    infiniteLoop={true}
                    interval={3000}
                    showArrows={false}
                    useKeyboardArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    stopOnHover={true}
                    autoPlay={true}>
                    {topRatedProducts && topRatedProducts.map(product => {
                        return (
                            <div className={classes.imageContainer}>
                                <Grid container={true} justify="center" className={classes.imageContainer} alignItems="flex-start">
                                    <Grid item={true} xs={12} md={4}>
                                        <img
                                            className={classes.productImage}
                                            src={product.image}
                                            title={product.name}
                                            alt={product.name}/>
                                    </Grid>
                                </Grid>
                                <div className={classes.content}>
                                    <Typography variant="h4" className={classes.productName}
                                                align="center">{product.name}</Typography>
                                    <Typography variant="h5" className={classes.productPrice}
                                                align="center">$ {product.price}</Typography>
                                    <Grid container={true} justify="center">
                                        <Grid item={true}>
                                            <Link className={classes.link} to={`/products/${product._id}`}>
                                                <Button
                                                    size="large"
                                                    variant="outlined"
                                                    className={classes.viewProductButton}>
                                                    View Product
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        )
                    })}
                </Carousel>
                <Container className={classes.container}>
                    <Typography className={classes.title} variant="h4">Latest Products</Typography>
                    <Divider className={classes.divider} variant="fullWidth"/>
                    {loading ? <LinearProgress variant="query"/> : error ? (
                        <Box>
                            <Divider variant="fullWidth" className={classes.errorDivider}/>
                            <Alert variant="filled" color="error">
                                <AlertTitle>Error</AlertTitle>
                                <Typography variant="h6" className={classes.error}>{error}</Typography>
                            </Alert>

                        </Box>
                    ) : (
                        products && products.length ? (
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
                                    <Typography className={classes.noProductsText} variant="h6" align="center">No
                                        Products
                                        Available</Typography>
                                </Grid>
                            </Grid>
                        )
                    )}
                </Container>
                <Container>

                    <Divider variant="fullWidth" className={classes.divider}/>

                    <Pagination
                        onChange={handlePageChange}
                        showFirstButton={true}
                        showLastButton={true}
                        variant="outlined"
                        color="primary"
                        page={page}
                        size="large"
                        count={Math.round(count / 8)}
                        defaultValue={1}
                    />
                </Container>
            </div>
        </Layout>
    )
}

export default HomePage;