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
    LinearProgress, Select, MenuItem
} from "@material-ui/core";
import {Skeleton, AlertTitle, Alert} from "@material-ui/lab";
import {useParams} from "react-router-dom";
import Image from "material-ui-image";
import {Rating} from "@material-ui/lab";
import {AddShoppingCart} from "@material-ui/icons";
import {useSelector, useDispatch} from "react-redux";
import {createReview, getProduct} from "../../redux/product/product-action-creators";
import {useSnackbar} from "notistack";
import {green, grey, red} from "@material-ui/core/colors";
import AddToCartDialog from "../../components/shared/add-to-cart-dialog";
import {useHistory} from "react-router-dom";
import {addToCart} from "../../redux/cart/cart-action-creators";
import Review from "../../components/shared/review";

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
                paddingTop: 12,
                paddingBottom: 12,
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
            textField: {
                backgroundColor: "#f0f2f5",
                marginBottom: 8
            },
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
            },
            increaseQuantityButton: {
                backgroundColor: green[900],
                color: "white",
                fontWeight: "bold"
            },
            decreaseQuantityButton: {
                backgroundColor: grey[700],
                color: "white",
                fontWeight: "bold"
            },
            noReviewText: {},
            noReviewTitle: {
                fontWeight: "bold"
            },
            subTitle: {
                textTransform: "uppercase",
                color: grey[700]
            },
            reviewContainer: {
                marginTop: 32
            },
            reviewButton: {
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: "bold",
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    color: "white"
                }
            },
            noReviewAlert: {
                marginTop: 32
            }
        }
    });
    const classes = useStyles();

    const {productID} = useParams();
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);
    const handleQuantityChange = e => {
        setQuantity(e.target.value);
    }
    const decreaseQuantity = () => {
        setQuantity(quantity => quantity - 1);
    }
    const increaseQuantity = () => {
        setQuantity(quantity => {
            if (quantity > productDetail.countInStock) {
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
                handleAlert('ERROR', 'Cannot buy more than in stock')
                return quantity;
            }
            return quantity + 1;
        });
    }
    const dispatch = useDispatch();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const [review, setReview] = useState({rating: 5});
    const {userProfile, token} = useSelector(state => state.authentication);
    const {error, productDetail, loading} = useSelector(state => state.products);
    const [e, setError] = useState({});
    const {comment, rating} = review;
    const handleReviewChange = e => {
        setReview({...review, [e.target.name]: e.target.value});
    }

    const handleReviewSubmit = e => {
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
        e.preventDefault();
        if (!comment) {
            setError({...e, comment: 'Comment field required'});
            handleAlert('ERROR', 'Comment Field required!!!');
            return;
        } else {
            setError({...e, comment: null});
        }
        dispatch(createReview({...review, product: productID}, token, handleAlert));
    }
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
    }, [dispatch, enqueueSnackbar, productID]);


    const handleAddToCart = () => {
        setOpen(true);
    }

    const handleContinueShopping = () => {
        setOpen(false);
        dispatch(addToCart(productID, quantity));
    }

    const handleGoToCart = () => {
        setOpen(false);
        dispatch(addToCart(productID, quantity));
        history.push(`/cart`);
    }

    return (
        <Layout>
            <Container className={classes.container}>
                {open ?
                    <AddToCartDialog
                        handleGoToCart={handleGoToCart}
                        open={open}
                        handleContinueShopping={handleContinueShopping}
                    /> : null}
                <Typography className={classes.title} variant="h4">Product Detail</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>
                {
                    loading ? (
                        <Box>
                            <LinearProgress variant="query"/>
                            <Skeleton height={350} animation="wave" variant="rect"/>
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
                            <Divider variant="inset" className={classes.errorDivider}/>
                            <Typography variant="h6" className={classes.error}>{error}</Typography>
                        </Box>
                    ) : (
                        <Box>
                            <Card elevation={1} variant="outlined">
                                <CardContent>
                                    <Grid container={true} spacing={5}>
                                        <Grid item={true} xs={12} md={4} lg={7}>
                                            <Image
                                                animationDuration={5000}
                                                placeholder={'/images/notfound.jpg'}
                                                color="red"
                                                cover={true}
                                                src={(productDetail && productDetail.image) || '/images/notfound.jpg'}
                                            />

                                        </Grid>
                                        <Grid item={true} xl={12} md={8} lg={5}>
                                            <Typography
                                                variant="h4"
                                                className={classes.productName}>{productDetail && productDetail.name}</Typography>
                                            <Divider className={classes.divider} variant="fullWidth"/>
                                            <Box>
                                                <Rating
                                                    value={productDetail && productDetail.rating}
                                                    readOnly={true}
                                                    precision={0.5}
                                                    size="small"
                                                    max={5}
                                                />
                                                <Typography
                                                    className={classes.reviews}
                                                    display="inline"
                                                    variant="body2">
                                                    ({productDetail && productDetail.numReviews} Customer Reviews)
                                                </Typography>
                                            </Box>
                                            <Divider className={classes.divider} variant="fullWidth"/>
                                            <Typography
                                                variant="h4">${productDetail && productDetail.price}</Typography>
                                            <Divider className={classes.divider} variant="fullWidth"/>
                                            <Typography
                                                variant="body1">{productDetail && productDetail.description}</Typography>
                                            <Divider className={classes.divider} variant="fullWidth"/>
                                            <Typography display="inline" variant="h6">Availability: </Typography>
                                            <Typography
                                                display="inline"
                                                variant="body1">
                                                {productDetail && productDetail.countInStock > 0 ? `In Stock (${productDetail.countInStock})` : 'Out of Stock'}
                                            </Typography>
                                            <Divider className={classes.divider} variant="fullWidth"/>

                                            <Typography variant="body1">Quantity</Typography>
                                            <Grid container={true} spacing={1} alignItems="center">
                                                <Grid item={true} xs={4} md={2}>
                                                    <Button
                                                        disabled={quantity <= 0}
                                                        variant="contained"
                                                        fullWidth={true}
                                                        disableElevation={true}
                                                        className={classes.decreaseQuantityButton}
                                                        size="large"
                                                        onClick={decreaseQuantity}>-</Button>
                                                </Grid>

                                                <Grid item={true} xs={4} md={2}>
                                                    <TextField
                                                        fullWidth={true}
                                                        className={classes.textField}
                                                        margin="dense"
                                                        variant="outlined"
                                                        disabled={productDetail && productDetail.countInStock <= 0}
                                                        value={quantity}
                                                        onChange={handleQuantityChange}
                                                    />
                                                </Grid>
                                                <Grid item={true} xs={4} md={2}>
                                                    <Button
                                                        disabled={productDetail && quantity >= productDetail.countInStock}
                                                        variant="contained"
                                                        disableElevation={true}
                                                        size="large"
                                                        fullWidth={true}
                                                        className={classes.increaseQuantityButton}
                                                        onClick={increaseQuantity}>+</Button>
                                                </Grid>
                                                <Grid item={true} xs={12} md={6}>
                                                    <Button
                                                        onClick={handleAddToCart}
                                                        fullWidth={true}
                                                        className={classes.addToCartButton}
                                                        disabled={productDetail ? productDetail.countInStock === 0 || quantity === 0 : false}
                                                        variant="contained"
                                                        disableElevation={true}
                                                        size="medium"
                                                        startIcon={<AddShoppingCart
                                                            className={classes.addToCartIcon}/>}>
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
                                                    variant="body1">{productDetail && productDetail.category}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography display="inline" variant="h6">Brand: </Typography>
                                                <Typography display="inline" gutterBottom={true}
                                                            variant="body1">{productDetail && productDetail.brand}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className={classes.reviewContainer}>
                                <CardContent>
                                    <Grid container={true} spacing={5}>
                                        <Grid item={true} xs={12} md={6}>

                                            <Typography variant="h6" className={classes.subTitle}>
                                                Reviews
                                            </Typography>
                                            <Divider variant="fullWidth" className={classes.divider}/>
                                            {
                                                (userProfile ? (
                                                    <Box>
                                                        {
                                                            productDetail && productDetail.reviews && productDetail.reviews.length ? (
                                                                productDetail.reviews.map(review => {
                                                                    return <Review key={review._id} review={review}/>
                                                                })
                                                            ) : (
                                                                <Alert variant="filled" color="info"
                                                                       className={classes.noReviewAlert}>
                                                                    <AlertTitle className={classes.noReviewTitle}>No
                                                                        Reviews</AlertTitle>
                                                                    <Typography className={classes.noReviewText}
                                                                                variant="body2">Be the
                                                                        first to review
                                                                        {productDetail && productDetail.name}</Typography>
                                                                </Alert>
                                                            )
                                                        }
                                                    </Box>

                                                ) : (
                                                    <Alert>
                                                        <AlertTitle>Not signed in</AlertTitle>
                                                        <Typography variant="body2">Log in in to review
                                                            ${productDetail && productDetail.name}</Typography>
                                                    </Alert>
                                                ))
                                            }

                                        </Grid>
                                        <Grid item={true} xs={12} md={6}>
                                            {
                                                (userProfile ? (
                                                    <Box>
                                                        <Typography variant="h6" className={classes.subTitle}>
                                                            Write a customer review
                                                        </Typography>

                                                        <Divider variant="fullWidth" className={classes.divider}/>

                                                        <Select
                                                            name="rating"
                                                            fullWidth={true}
                                                            value={rating}
                                                            required={true}
                                                            margin="none"
                                                            defaultValue={5}
                                                            variant="outlined"
                                                            onChange={handleReviewChange}>
                                                            <MenuItem value={5}>5 - Excellent</MenuItem>
                                                            <MenuItem value={4}>4 - Very Good</MenuItem>
                                                            <MenuItem value={3}>3 - Average</MenuItem>
                                                            <MenuItem value={2}>2 - Poor</MenuItem>
                                                            <MenuItem value={1}>1 - Very Poor</MenuItem>
                                                        </Select>

                                                        <TextField
                                                            fullWidth={true}
                                                            margin="normal"
                                                            label="Comment"
                                                            name="comment"
                                                            multiline={true}
                                                            rows={5}
                                                            helperText={e.comment}
                                                            error={Boolean(e.comment)}
                                                            variant={"outlined"}
                                                            placeholder="Enter review comment"
                                                            value={comment}
                                                            onChange={handleReviewChange}
                                                            className={classes.textField}
                                                            required={true}/>

                                                        <Button
                                                            variant="outlined"
                                                            size="large"
                                                            onClick={handleReviewSubmit}
                                                            className={classes.reviewButton}
                                                            disabled={loading}>
                                                            Review
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <Alert>
                                                        <AlertTitle>Not signed in</AlertTitle>
                                                        <Typography variant="body2">Log in in to review
                                                            ${productDetail && productDetail.name}</Typography>
                                                    </Alert>
                                                ))
                                            }

                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>

                    )
                }
            </Container>
        </Layout>
    )
}

export default ProductDetailPage;