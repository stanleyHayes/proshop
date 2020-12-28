import React, {useState} from "react";
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
    TextField
} from "@material-ui/core";
import products from "../../products";
import {useParams} from "react-router-dom";
import Image from "material-ui-image";
import {Rating} from "@material-ui/lab";
import {AddShoppingCart} from "@material-ui/icons";

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
            textField: {
            }
        }
    });

    const classes = useStyles();


    const {productID} = useParams();
    const product = products.find(product => product._id === productID);
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

    return (
        <Layout>
            <Container className={classes.container}>
                <Card elevation={1} variant="elevation">
                    <CardContent>
                        <Grid container={true} spacing={5}>
                            <Grid item={true} xs={12} md={4} lg={7}>
                                <Image src={product.image}/>
                            </Grid>
                            <Grid item={true} xl={12} md={8} lg={5}>
                                <Typography variant="h4" className={classes.productName}>{product.name}</Typography>
                                <Divider className={classes.divider} variant="fullWidth"/>
                                <Box>
                                    <Rating value={product.rating} readOnly={true} precision={0.5} size="small"
                                            max={5}/>
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
                                    <Grid item={true} xs={2}>
                                        <Button
                                            disabled={quantity <= 0}
                                            variant="outlined"
                                            size="large"
                                            onClick={decreaseQuantity}>-</Button>
                                    </Grid>

                                    <Grid item={true} xs={2}>
                                        <TextField
                                            fullWidth={true}
                                            className={classes.textField}
                                            margin="dense"
                                            variant="outlined"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                        />
                                    </Grid>
                                    <Grid item={true} xs={2}>
                                        <Button variant="outlined" size="large" onClick={increaseQuantity}>+</Button>
                                    </Grid>
                                    <Grid item={true} xs={6}>
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
            </Container>
        </Layout>
    )
}

export default ProductDetailPage;