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
    CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid
} from "@material-ui/core";
import {blue, green, grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {deleteUser, getUsers} from "../../redux/users/user-action-creators";
import {Cancel, CheckCircle, Delete, Edit} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import ConfirmDialog from "../../components/shared/confirm-dialog";

const UsersPage = () => {
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
            tableHead: {
                color: grey[700],
                fontWeight: 700,
                textTransform: "uppercase"
            },
            tableData: {},
            detailButton: {
                borderWidth: 2,
                borderColor: blue[400],
                backgroundColor: blue[700],
                fontWeight: "bold",
                color: "white",
                '&:hover': {
                    backgroundColor: blue[900],
                    transition: 'all 500ms 150ms ease-out'
                }
            },
            link: {
                textDecoration: "none"
            },
            adminIcon: {
                color: green[700]
            },
            cancelIcon: {
                color: red[700]
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
            },
            editIcon: {
                color: "white"
            },
            deleteIcon: {
                color: "white"
            },
        }
    });

    const classes = useStyles();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {token, userProfile} = useSelector(state => state.authentication);
    const {users, userError, userLoading} = useSelector(state => state.users);
    const [userToDelete, setUserToDelete] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const history = useHistory();
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
            dispatch(getUsers(token, handleAlert));
        } else {
            history.push('/login')
        }
    }, [dispatch, enqueueSnackbar, history, token, userProfile]);

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

    const handleDeleteUserClick = userID => {
        setOpenDialog(true);
        setUserToDelete(userID);
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(userToDelete, token, handleAlert));
        setOpenDialog(false);
    }

    const handleCancelUserDelete = () => {
        setOpenDialog(false);
    }

    return (
        <Layout>
            <Container className={classes.container} maxWidth="xl">
                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={12} lg={10}>

                        {openDialog ? (
                            <ConfirmDialog
                                handleConfirmAction={handleDeleteUser}
                                handleCancelAction={handleCancelUserDelete}
                                message='Are you sure you want to delete User?'
                                open={openDialog}
                            />) : null}
                        {userLoading && <LinearProgress variant="indeterminate"/>}
                        <Typography className={classes.title} variant="h4">Users</Typography>
                        <Divider className={classes.divider} variant="fullWidth"/>

                        {userError ? (
                            <Box>
                                <Divider variant="fullWidth" className={classes.errorDivider}/>
                                <Typography variant="h6" className={classes.error}>{userError}</Typography>
                            </Box>
                        ) : null}

                        {
                            users.length ? (
                                <Card variant="outlined">
                                    <CardContent>
                                        <TableContainer>
                                            <Table stickyHeader={true} size="small">
                                                <TableHead>
                                                    <TableRow hover={true}>
                                                        <TableCell className={classes.tableHead}>ID</TableCell>
                                                        <TableCell className={classes.tableHead}>Email</TableCell>
                                                        <TableCell className={classes.tableHead}>Name</TableCell>
                                                        <TableCell className={classes.tableHead}>Phone</TableCell>
                                                        <TableCell className={classes.tableHead}>Admin</TableCell>
                                                        <TableCell/>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {users.map(user => {
                                                        return (
                                                            <TableRow hover={true} key={user._id}>
                                                                <TableCell
                                                                    className={classes.tableData}>{user._id}</TableCell>
                                                                <TableCell
                                                                    className={classes.tableData}>
                                                                    <a className={classes.link}
                                                                       href={`mailto:${user.email}`}>
                                                                        {user.email}
                                                                    </a>
                                                                </TableCell>
                                                                <TableCell
                                                                    className={classes.tableData}>{user.name}</TableCell>
                                                                <TableCell
                                                                    className={classes.tableData}>{user.phone}</TableCell>
                                                                <TableCell className={classes.tableHead}>{user.isAdmin ?
                                                                    <CheckCircle className={classes.adminIcon}/> :
                                                                    <Cancel
                                                                        className={classes.cancelIcon}/>}</TableCell>
                                                                <TableCell className={classes.tableData}>
                                                                    <Link className={classes.link}
                                                                          to={`/users/${user._id}/edit`}>
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
                                                                        onClick={() => handleDeleteUserClick(user._id)}
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
                                <Typography className={classes.noUsersText} variant="h6">
                                    No Users Available
                                </Typography>
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default UsersPage;