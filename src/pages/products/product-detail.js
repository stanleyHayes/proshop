import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Box,
    Button,
    CardContent,
    Container,
    Divider,
    Grid,
    makeStyles,
    Typography,
    Card,
    TextField,
    LinearProgress
} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {useParams} from "react-router-dom";
import Image from "material-ui-image";
import {Rating} from "@material-ui/lab";
import {AddShoppingCart} from "@material-ui/icons";
import {useSelector, useDispatch} from "react-redux";
import {getProduct} from "../../redux/product/product-action-creators";
import {useSnackbar} from "notistack";
import {grey, red} from "@material-ui/core/colors";

const ProductDetailPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },
            productName: {},
            divider: {
                marginTop: 12,
                marginBottom: 12
            },
            reviews: {
                fontWeight: "bold"
            },
            addToCartButton: {
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: "bold",
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    color: "white"
                }
            },
            addToCartIcon: {
                color: "white"
            },
            textField: {},
            title: {
                textTransform: "uppercase",
                color: grey[700]
            },
            errorDivider: {
                height: 5,
                backgroundColor: red[900]
            },
            error: {
                color: red[900],
                fontWeight: 700
            }
        }
    });
    const classes = useStyles();

    const {productID} = useParams();
    const [quantity, setQuantity] = useState(0);
    const handleQuantityChange = e => {
        setQuantity(e.target.value);
    }
    const decreaseQuantity = () => {
        setQuantity(quantity => quantity - 1);
    }
    const increaseQuantity = () => {
        setQuantity(quantity => quantity + 1);
    }
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {error, product, loading} = useSelector(state => state.products);

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
        dispatch(getProduct(productID, handleAlert))
    }, [dispatch, enqueueSnackbar, productID])
    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4">Product Detail</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>
                {
                    loading ? (
                        <Box>
                            <LinearProgress variant="query"/>
                            <Skeleton height={350} animation="wave" variant="rect" />
                            <Divider className={classes.divider} variant="fullWidth"/>
                            <Skeleton animation="pulse" variant="text"/>
                            <Divider className={classes.divider} variant="fullWidth"/>
                            <Skeleton animation="pulse" variant="text"/>
                            <Divider className={classes.divider} variant="fullWidth"/>
                            <Skeleton animation="pulse" variant="text"/>
                            <Divider className={classes.divider} variant="fullWidth"/>
                            <Skeleton animation="pulse" variant="text"/>
                            <Divider className={classes.divider} variant="fullWidth"/>
                            <Skeleton animation="pulse" variant="text"/>
                            <Divider className={classes.divider} variant="fullWidth"/>
                            <Skeleton animation="pulse" variant="text"/>
                            <Skeleton animation="pulse" variant="rect" height={30}/>
                            <Divider className={classes.divider} variant="fullWidth"/>
                            <Skeleton animation="pulse" variant="text"/>
                            <Divider className={classes.divider} variant="fullWidth"/>
                            <Skeleton animation="pulse" variant="text"/>
                        </Box>
                    ) : error ? (
                        <Box>
                            <Divider variant="inset" className={classes.errorDivider} />
                            <Typography variant="h6" className={classes.error}>{error}</Typography>
                        </Box>
                    ) : (
                        <Card elevation={1} variant="elevation">
                            <CardContent>
                                <Grid container={true} spacing={5}>
                                    <Grid item={true} xs={12} md={4} lg={7}>
                                        <Image
                                            animationDuration={5000}
                                            placeholder={'/images/notfound.jpg'}
                                            color="red"
                                            cover={true}
                                            src={product.image || '/images/notfound.jpg'}
                                        />
                                    </Grid>
                                    <Grid item={true} xl={12} md={8} lg={5}>
                                        <Typography
                                            variant="h4"
                                            className={classes.productName}>{product.name}</Typography>
                                        <Divider className={classes.divider} variant="fullWidth"/>
                                        <Box>
                                            <Rating
                                                value={product.rating}
                                                readOnly={true}
                                                precision={0.5}
                                                size="small"
                                                max={5}
                                            />
                                            <Typography
                                                className={classes.reviews}
                                                display="inline"
                                                variant="body2">
                                                ({product.numReviews} Customer Reviews)
                                            </Typography>
                                        </Box>
                                        <Divider className={classes.divider} variant="fullWidth"/>
                                        <Typography variant="h4">${product.price}</Typography>
                                        <Divider className={classes.divider} variant="fullWidth"/>
                                        <Typography variant="body1">{product.description}</Typography>
                                        <Divider className={classes.divider} variant="fullWidth"/>
                                        <Typography display="inline" variant="h6">Availability: </Typography>
                                        <Typography display="inline"
                                                    variant="body1">{product.countInStock > 0 ? `In Stock ${product.countInStock}` : 'Out of Stock'}</Typography>
                                        <Divider className={classes.divider} variant="fullWidth"/>
                                        <Grid container={true} spacing={1} alignItems="center">
                                            <Grid item={true} xs={3} md={2}>
                                                <Button
                                                    disabled={quantity <= 0}
                                                    variant="outlined"
                                                    size="large"
                                                    onClick={decreaseQuantity}>-</Button>
                                            </Grid>

                                            <Grid item={true} xs={3} md={2}>
                                                <TextField
                                                    fullWidth={true}
                                                    className={classes.textField}
                                                    margin="dense"
                                                    variant="outlined"
                                                    value={quantity}
                                                    onChange={handleQuantityChange}
                                                />
                                            </Grid>
                                            <Grid item={true} xs={3} md={2}>
                                                <Button variant="outlined" size="large"
                                                        onClick={increaseQuantity}>+</Button>
                                            </Grid>
                                            <Grid item={true} xs={12} md={6}>
                                                <Button
                                                    fullWidth={true}
                                                    className={classes.addToCartButton}
                                                    disabled={product.countInStock === 0}
                                                    variant="contained"
                                                    disableElevation={true}
                                                    size="medium"
                                                    startIcon={<AddShoppingCart className={classes.addToCartIcon}/>}>
                                                    Add to Cart
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} variant="fullWidth"/>
                                        <Box>
                                            <Typography display="inline" variant="h6">Category: </Typography>
                                            <Typography
                                                display="inline"
                                                gutterBottom={true}
                                                variant="body1">{product.category}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography display="inline" variant="h6">Brand: </Typography>
                                            <Typography display="inline" gutterBottom={true}
                                                        variant="body1">{product.brand}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )
                }
            </Container>
        </Layout>
    )
}

export default ProductDetailPage;