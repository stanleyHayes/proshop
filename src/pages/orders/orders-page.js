import React, {useEffect} from "react";
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
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from "@material-ui/core";
import {green, grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {Cancel} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";
import {getOrders} from "../../redux/orders/order-action-creators";

const OrdersPage = () => {
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
            noUsersText: {
                textTransform: "uppercase",
                color: grey[600]
            },
            checkIcon: {
                color: green[700]
            },
            cancelIcon: {
                color: red[700]
            },
            link: {
                textDecoration: "none",
                color: grey[700]
            },
            tableData: {},
            detailButton: {
                borderWidth: 2,
                borderColor: grey[700],
                backgroundColor: "white",
                fontWeight: "bold",
                color: grey[700]
            },
            tableHead: {
                color: grey[700],
                fontWeight: 700,
                textTransform: "uppercase"
            },
        }
    });
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const {token, userProfile} = useSelector(state => state.authentication);

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
        if(userProfile && userProfile.isAdmin){
            dispatch(getOrders(token, handleAlert));
        }else {
            history.push('/login')
        }
    }, [dispatch, enqueueSnackbar, history, token, userProfile]);

    const {orders, orderError, ordersLoading} = useSelector(state => state.orders);
    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4">Orders</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>

                {ordersLoading && <LinearProgress variant="indeterminate"/>}
                {orderError ? (
                    <Box>
                        <Divider variant="fullWidth" className={classes.errorDivider}/>
                        <Typography variant="h6" className={classes.error}>{orderError}</Typography>
                    </Box>
                ) : null}

                {
                    orders.length ? (
                        <Card variant="outlined">
                            <CardContent>
                                <TableContainer>
                                    <Table stickyHeader={true} size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.tableHead}>ID</TableCell>
                                                <TableCell className={classes.tableHead}>User</TableCell>
                                                <TableCell className={classes.tableHead}>Date</TableCell>
                                                <TableCell className={classes.tableHead}>Total Price</TableCell>
                                                <TableCell className={classes.tableHead}>Paid</TableCell>
                                                <TableCell className={classes.tableHead}>Delivered</TableCell>
                                                <TableCell/>
                                                <TableCell/>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map(order => {
                                                return (
                                                    <TableRow key={order._id} hover={true}>
                                                        <TableCell className={classes.tableData}>
                                                            {order._id}
                                                        </TableCell>
                                                        <TableCell className={classes.tableData}>
                                                            {order.user.name}
                                                        </TableCell>
                                                        <TableCell
                                                            className={classes.tableData}>{new Date(order.createdAt).toDateString()}</TableCell>
                                                        <TableCell
                                                            className={classes.tableData}>${order.totalPrice}</TableCell>
                                                        <TableCell>
                                                            {order.isPaid ?
                                                                new Date(order.paidAt).toDateString() :
                                                                <Cancel className={classes.cancelIcon}/>}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.isDelivered ?
                                                                new Date(order.isDelivered).toDateString() :
                                                                <Cancel className={classes.cancelIcon}/>}
                                                        </TableCell>
                                                        <TableCell className={classes.tableData}>
                                                            <Link className={classes.link}
                                                                  to={`/orders/${order._id}`}>
                                                                <Button
                                                                    className={classes.detailButton}
                                                                    fullWidth={true}
                                                                    size="medium"
                                                                    variant="outlined">Detail</Button>
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell className={classes.tableData}>
                                                            <Link className={classes.link}
                                                                  to={`/orders/${order._id}/edit`}>
                                                                <Button
                                                                    className={classes.detailButton}
                                                                    fullWidth={true}
                                                                    size="medium"
                                                                    variant="outlined">Edit</Button>
                                                            </Link>
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
                        <Typography className={classes.noUsersText} variant="h6">
                            No Orders Available
                        </Typography>
                    )
                }
            </Container>
        </Layout>
    )
}

export default OrdersPage;