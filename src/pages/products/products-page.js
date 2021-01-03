import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Container,
    Divider,
    makeStyles,
    Typography,
    LinearProgress,
    Box,
    Card,
    TableContainer,
    CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button, Avatar, Grid,
} from "@material-ui/core";
import {grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";
import {getProducts} from "../../redux/product/product-action-creators";
import {deleteUser} from "../../redux/users/user-action-creators";
import ConfirmDialog from "../../components/shared/confirm-dialog";
import {Add, Delete, Edit} from "@material-ui/icons";

const ProductsPage = () => {
    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },

            divider: {
                marginTop: 12,
                marginBottom: 12
            },
            title: {
                textTransform: "uppercase",
                color: grey[700]
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
            tableData: {},
            detailButton: {
                borderWidth: 2,
                borderColor: grey[700],
                backgroundColor: "white",
                fontWeight: "bold",
                color: grey[700]
            },
            link: {
                textDecoration: "none",
                color: grey[700]
            }, tableHead: {
                color: grey[700],
                fontWeight: 700,
                textTransform: "uppercase"
            },
            createProductButton: {
                backgroundColor: theme.palette.primary.main,
                fontWeight: "bold",
                color: "white",
                borderWidth: 2,
                borderColor: theme.palette.primary.light,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 500ms 150ms ease-out'
                }
            },
            addIcon: {
                color: "white"
            },
            editIcon: {
                color: "white"
            },
            deleteIcon: {
                color: "white"
            },
            deleteButton: {
                backgroundColor: red[700],
                fontWeight: "bold",
                color: "white",
                borderWidth: 2,
                borderColor: red[400],
                '&:hover': {
                    backgroundColor: red[900],
                    transition: 'all 500ms 150ms ease-out'
                }
            },
            editButton: {
                backgroundColor: grey[700],
                fontWeight: "bold",
                color: "white",
                borderWidth: 2,
                borderColor: grey[400],
                '&:hover': {
                    backgroundColor: grey[900],
                    transition: 'all 500ms 150ms ease-out'
                }
            }
        }
    });
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const {token, userProfile} = useSelector(state => state.authentication);
    const [productToDelete, setProductToDelete] = useState("");
    const [openDialog, setOpenDialog] = useState(false);


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
        if (userProfile && userProfile.isAdmin) {
            dispatch(getProducts(token, handleAlert));
        } else {
            history.push('/login')
        }
    }, [dispatch, enqueueSnackbar, history, token, userProfile]);

    const {products, productError, productLoading} = useSelector(state => state.products);


    const handleDeleteProductClick = productID => {
        setOpenDialog(true);
        setProductToDelete(productID);
    }

    const handleDeleteProduct = () => {
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
        dispatch(deleteUser(productToDelete, token, handleAlert));
        setOpenDialog(false);
    }

    const handleCancelProductDelete = () => {
        setOpenDialog(false);
    }

    return (
        <Layout>
            <Container className={classes.container} maxWidth="xl">
                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} lg={10}>

                        {openDialog ? (
                            <ConfirmDialog
                                handleConfirmAction={handleDeleteProduct}
                                handleCancelAction={handleCancelProductDelete}
                                message='Are you sure you want to delete Product?'
                                open={openDialog}
                            />) : null}
                        {productLoading && <LinearProgress variant="indeterminate"/>}
                        <Grid container={true} justify="space-between">
                            <Grid item={true}>
                                <Typography className={classes.title} variant="h4">Products</Typography>
                            </Grid>
                            <Grid item={true}>
                                <Link classsName={classes.link} to={`/product/new`}>
                                    <Button className={classes.createProductButton} variant="outlined" size="large"
                                            startIcon={<Add className={classes.addIcon}/>}>
                                        Create Product
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>

                        <Divider className={classes.divider} variant="fullWidth"/>

                        {productError ? (
                            <Box>
                                <Divider variant="fullWidth" className={classes.errorDivider}/>
                                <Typography variant="h6" className={classes.error}>{productError}</Typography>
                            </Box>
                        ) : null}

                        {
                            products.length ? (
                                <Card variant="outlined">
                                    <CardContent>
                                        <TableContainer>
                                            <Table stickyHeader={true} size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell/>
                                                        <TableCell className={classes.tableHead}>ID</TableCell>
                                                        <TableCell className={classes.tableHead}>Name</TableCell>
                                                        <TableCell className={classes.tableHead}>Price</TableCell>
                                                        <TableCell className={classes.tableHead}>Brand</TableCell>
                                                        <TableCell className={classes.tableHead}>Category</TableCell>
                                                        <TableCell className={classes.tableHead}>Stock
                                                            Quantity</TableCell>
                                                        <TableCell/>
                                                        <TableCell/>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {products.map(product => {
                                                        return (
                                                            <TableRow key={product._id} hover={true}>
                                                                <TableCell>
                                                                    <Avatar
                                                                        variant="circular"
                                                                        className={classes.productImage}
                                                                        src={product.image || '/images/notfound.jpg'}/>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Link className={classes.link}
                                                                          to={`/products/${product._id}`}>
                                                                        {product._id}
                                                                    </Link>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Link className={classes.link}
                                                                          to={`/products/${product._id}`}>
                                                                        {product.name}
                                                                    </Link>
                                                                </TableCell>
                                                                <TableCell>${product.price}</TableCell>
                                                                <TableCell>{product.brand}</TableCell>
                                                                <TableCell>{product.category}</TableCell>
                                                                <TableCell>
                                                                    {product.countInStock}
                                                                </TableCell>

                                                                <TableCell className={classes.tableData}>
                                                                    <Link className={classes.link}
                                                                          to={`/products/${product._id}/edit`}>
                                                                        <Button
                                                                            className={classes.editButton}
                                                                            fullWidth={false}
                                                                            size="small"
                                                                            variant="outlined">
                                                                            <Edit
                                                                                className={classes.editIcon}/>
                                                                        </Button>
                                                                    </Link>

                                                                    <Button
                                                                        onClick={() => handleDeleteProductClick(product._id)}
                                                                        className={classes.deleteButton}
                                                                        fullWidth={false}
                                                                        size="small"
                                                                        variant="outlined">
                                                                        <Delete
                                                                            className={classes.deleteIcon}/>
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Typography className={classes.noProductsText} variant="h6">
                                    No Products Available
                                </Typography>
                            )
                        }

                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default ProductsPage;