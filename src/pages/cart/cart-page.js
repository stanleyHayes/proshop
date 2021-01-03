import React from "react";
import Layout from "../../components/layout/layout";
import {
    Box,
    Container,
    Divider,
    makeStyles,
    Table,
    TableHead,
    TableRow,
    Typography,
    TableContainer,
    TableCell,
    TableBody,
    Avatar,
    Select,
    Paper, Grid, Button, Tooltip, MenuItem, CardContent, Card
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../../redux/cart/cart-action-creators";
import {blueGrey, grey} from "@material-ui/core/colors";
import {ArrowBack, Delete} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

const CartPage = () => {
    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            checkoutDivider: {
                marginTop: 12,
                marginBottom: 12
            },
            title: {
                textTransform: "uppercase",
                color: grey[700]
            },
            emptyCartText: {
                textTransform: "uppercase",
                color: grey[700],
                fontWeight: 700,
            },
            noCartItemsDivider: {
                backgroundColor: blueGrey[700],
                height: 5,
                marginBottom: 16
            },
            tableHead: {
                color: grey[700],
                fontWeight: 700,
                textTransform: "uppercase"
            },
            productImage: {
                width: 40,
                height: 40
            },
            deleteItemIcon: {
                color: grey[500],
                cursor: "pointer",
                padding: 8,
                '&:hover': {
                    backgroundColor: grey[400],
                    borderRadius: '50%',
                    transition: 'all 500ms ease-out',
                    padding: 8
                }
            },
            link: {
                textDecoration: "none"
            },
            goBackButton: {
                color: grey[600],
                fontWeight: 700
            },
            subTotalHeader: {
                textTransform: "uppercase",
                color: grey[600]
            },
            subTotalAmount: {
                fontWeight: 900,
                color: grey[600]
            },
            checkoutButton: {
                color: "white",
                paddingBottom: 8,
                paddingTop: 8,
                fontWeight: "bold",
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 300ms 50ms ease-in-out'
                }
            },
            grid: {
                marginTop: -20
            }
        }
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {items} = useSelector(state => state.cart);

    const handleCheckoutClicked = () => {
        history.push(`/login?redirect=checkout`);
    }

    const handleRemoveFromCartClicked = productID => {
        dispatch(removeFromCart(productID));
    }

    return (
        <Layout>
            <Container className={classes.container} maxWidth="lg">
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Typography className={classes.title} variant="h4">Shopping Cart</Typography>
                    </Grid>
                    <Grid item={true}>
                        <Link to="/" className={classes.link}>
                            <Button size="large" startIcon={<ArrowBack/>} className={classes.goBackButton}
                                    variant="text">
                                Go Back
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" className={classes.divider}/>
            </Container>

            <Container maxWidth="xl">
                {
                    items.length ? (
                        <Grid container={true} spacing={5} justify="center" alignItems="flex-start">
                            <Grid xs={12} md={7}>
                                <Card elevation={0}>
                                    <CardContent>
                                        <TableContainer>
                                            <Table stickyHeader={true} size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell/>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left">Product</TableCell>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left">Price</TableCell>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left">Quantity</TableCell>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left">Subtotal</TableCell>
                                                        <TableCell className={classes.tableHead} variant="head"
                                                                   align="left"/>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        items.map((item, index) => {
                                                            return (
                                                                <TableRow key={index} hover={true}>
                                                                    <TableCell>
                                                                        <Avatar
                                                                            variant="circular"
                                                                            className={classes.productImage}
                                                                            src={item.image || '/images/notfound.jpg'}/>
                                                                    </TableCell>
                                                                    <TableCell>{item.name}</TableCell>
                                                                    <TableCell>${item.price}</TableCell>
                                                                    <TableCell>
                                                                        <Select
                                                                            variant="outlined"
                                                                            margin="dense"
                                                                            value={item.quantity}
                                                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))
                                                                            }>
                                                                            {[...Array(item.countInStock).keys()].map(item => {
                                                                                return (
                                                                                    <MenuItem
                                                                                        key={item}
                                                                                        value={item + 1}>{item + 1}</MenuItem>
                                                                                )
                                                                            })}
                                                                        </Select>
                                                                    </TableCell>
                                                                    <TableCell>{item.quantity}
                                                                        <Typography
                                                                            variant="h6"
                                                                            display="inline">x</Typography> ${item.price}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Tooltip title={`Delete ${item.name}`}>
                                                                            <Delete
                                                                                onClick={() => handleRemoveFromCartClicked(item.product)}
                                                                                className={classes.deleteItemIcon}/>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item={true} xs={12} md={3} className={classes.grid}>
                                <Card elevation={0}>
                                    <CardContent>
                                        <Typography className={classes.subTotalHeader} variant="h6">
                                            Subtotal
                                            ({items.reduce((accumulator, item) => accumulator + item.quantity, 0)})
                                            Items
                                        </Typography>
                                        <Divider variant="fullWidth" className={classes.checkoutDivider}/>
                                        <Typography className={classes.subTotalAmount}>
                                            ${items.reduce((accumulator, item) => accumulator + (item.quantity * item.price), 0).toFixed(2)}
                                        </Typography>
                                        <Divider variant="fullWidth" className={classes.checkoutDivider}/>
                                        <Button
                                            onClick={handleCheckoutClicked}
                                            variant="contained"
                                            disableElevation={true}
                                            fullWidth={true}
                                            className={classes.checkoutButton}
                                            size="large"
                                            disabled={items.length <= 0}>
                                            Checkout
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    ) : (
                        <Box>
                            <Divider variant="fullWidth" className={classes.noCartItemsDivider}/>
                            <Typography className={classes.emptyCartText} variant="h6">
                                No Items in Cart
                            </Typography>
                        </Box>
                    )
                }
            </Container>
        </Layout>
    )
}

export default CartPage;