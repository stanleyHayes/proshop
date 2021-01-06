import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Box, Button, Card,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {grey, purple} from "@material-ui/core/colors";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {getProduct, updateProduct} from "../../redux/product/product-action-creators";
import ImageUploader from "react-images-upload";

const EditProductPage = () => {
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
            updateProductButton: {
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: theme.palette.primary.main,
                fontWeight: "bold",
                color: "white",
                borderWidth: 2,
                borderColor: theme.palette.primary.light,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 500ms ease-out'
                }
            },
            textField: {
                backgroundColor: "#f0f2f5"
            }
        }
    });
    const classes = useStyles();

    const [image, setImage] = useState(null);
    const {userProfile, token} = useSelector(state => state.authentication);
    const {productID} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (userProfile && !userProfile.isAdmin) {
            history.push('/login');
        }
    }, [dispatch, enqueueSnackbar, history, token, userProfile]);

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

    const {productLoading, productError, productDetail} = useSelector(state => state.products);

    useEffect(() => {
        if (productDetail) {
            setProduct({...productDetail})
        }
    }, [productDetail]);

    const [product, setProduct] = useState(productDetail || {});
    const [e, setError] = useState({});
    const {name, brand, category, description, price, countInStock} = product;

    const handleProductChange = e => {
        setProduct({...product, [e.target.name]: e.target.value});
    }

    const handleUpdateProductClicked = e => {
        e.preventDefault();
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
        if (!name) {
            setError({...e, name: 'Name field required'});
            handleAlert('ERROR', 'Name field required');
        } else {
            setError({...e, name: null});
        }

        if (!price) {
            setError({...e, price: 'Price field required'});
            handleAlert('ERROR', 'Price field required');
        } else {
            setError({...e, price: null});
        }

        if (!category) {
            setError({...e, category: 'Category field required'});
            handleAlert('ERROR', 'Category field required');
        } else {
            setError({...e, category: null});
        }

        if (!brand) {
            setError({...e, brand: 'Brand field required'});
            handleAlert('ERROR', 'Brand field required');
        } else {
            setError({...e, brand: null});
        }

        if (!description) {
            setError({...e, description: 'Description Password field required'});
            handleAlert('ERROR', 'Description password field required');
        } else {
            setError({...e, description: null});
        }

        if (!countInStock) {
            setError({...e, countInStock: 'Count in stock required'});
            handleAlert('ERROR', 'Count in stock required');
        } else {
            setError({...e, countInStock: null});
        }

        if (e.name || e.brand || e.category || e.description || e.countInStock || e.price) {
            return;
        }

        // let formData = new FormData();
        // formData.append('name', name);
        // formData.append('brand', brand);
        // formData.append('price', price);
        // formData.append('category', category);
        // formData.append('description', description);
        // formData.append('countInStock', countInStock);
        // if (image) {
        //     formData.append('image', image);
        // }

        if(!image){
            dispatch(updateProduct(productID, {
                name,
                brand,
                price,
                category,
                description,
                countInStock
            }, token, handleAlert, history));
        }else {
            dispatch(updateProduct(productID, {
                name,
                brand,
                price,
                category,
                description,
                countInStock,
                image
            }, token, handleAlert, history));
        }
    }

    const handleProductImageSelect = (files, pictures) => {
        setImage(pictures[0]);
    }

    return (
        <Layout>
            <Container className={classes.container}>
                {productLoading ? <LinearProgress variant="query"/> : null}
                <Typography className={classes.title} variant="h4">New Product</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>
                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6} lg={5}>
                        <Card variant="outlined" elevation={0}>
                            {productLoading ? <LinearProgress variant="query"/> : null}
                            <CardContent>
                                {productError ? (
                                    <Box>
                                        <Divider variant="fullWidth" className={classes.errorDivider}/>
                                        <Typography variant="body2" align="center"
                                                    className={classes.error}>{productError}</Typography>
                                    </Box>
                                ) : null}

                                <Grid container={true} justify="center">
                                    <Grid item={true}>
                                        <ImageUploader
                                            buttonStyles={{
                                                backgroundColor: purple[700],
                                                color: 'white',
                                                fontWeight: 'bold',
                                                borderRadius: 0,
                                                borderWidth: 2,
                                                borderColor: purple[300],
                                                paddingTop: 8,
                                                paddingBottom: 8,
                                                textTransform: "uppercase",
                                                fontFamily: 'Nunito'


                                            }}
                                            fileContainerStyle={{
                                                borderRadius: 0,
                                                padding: 8
                                            }}
                                            labelClass={{fontFamily: 'Nunito'}}
                                            buttonText="Select Product Image"
                                            onChange={handleProductImageSelect}
                                            singleImage={true}
                                            name="image"
                                            withIcon={true}
                                            withLabel={true}
                                            withPreview={true}
                                            maxFileSize={5 * 1024 * 1024}
                                            defaultImage="/images/notfound.jpg"
                                            label="Product Image"
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    placeholder="Enter product name"
                                    InputLabelProps={{shrink: true}}
                                    variant="outlined"
                                    margin="normal"
                                    name="name"
                                    type="text"
                                    label="Name"
                                    value={name}
                                    required={true}
                                    onChange={handleProductChange}
                                    error={Boolean(e.name)}
                                    helperText={e.name}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter price"
                                    variant="outlined"
                                    margin="normal"
                                    InputLabelProps={{shrink: true}}
                                    name="price"
                                    type="number"
                                    label="Price"
                                    value={price}
                                    required={true}
                                    onChange={handleProductChange}
                                    error={Boolean(e.price)}
                                    helperText={e.price}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter product brand"
                                    variant="outlined"
                                    margin="normal"
                                    name="brand"
                                    type="text"
                                    InputLabelProps={{shrink: true}}
                                    label="Brand"
                                    required={true}
                                    value={brand}
                                    onChange={handleProductChange}
                                    error={Boolean(e.brand)}
                                    helperText={e.brand}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter product category"
                                    variant="outlined"
                                    margin="normal"
                                    name="category"
                                    InputLabelProps={{shrink: true}}
                                    type="text"
                                    label="Category"
                                    value={category}
                                    onChange={handleProductChange}
                                    required={true}
                                    error={Boolean(e.category)}
                                    helperText={e.category}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter amount in stock"
                                    variant="outlined"
                                    margin="normal"
                                    name="countInStock"
                                    type="number"
                                    InputLabelProps={{shrink: true}}
                                    label="Stock Quantity"
                                    value={countInStock}
                                    onChange={handleProductChange}
                                    required={true}
                                    error={Boolean(e.countInStock)}
                                    helperText={e.countInStock}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter product description"
                                    variant="outlined"
                                    margin="normal"
                                    name="description"
                                    required={true}
                                    type="text"
                                    InputLabelProps={{shrink: true}}
                                    multiline={true}
                                    rows={7}
                                    label="Description"
                                    value={description}
                                    onChange={handleProductChange}
                                    error={Boolean(e.description)}
                                    helperText={e.description}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <Button
                                    onClick={handleUpdateProductClicked}
                                    variant="contained"
                                    disableElevation={true}
                                    fullWidth={true}
                                    className={classes.updateProductButton}
                                    size="large"
                                    disabled={productLoading}>
                                    Update
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default EditProductPage;