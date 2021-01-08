import React, {useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Container,
    Divider,
    Grid,
    makeStyles,
    Typography,
    TextField,
    Button,
    LinearProgress,
    Box
} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import {getProducts} from "../../redux/product/product-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {useHistory} from "react-router-dom";
import Product from "../../components/shared/product";
import {Alert, AlertTitle, Pagination} from "@material-ui/lab";


const SearchPage = () => {
    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32,
                flexGrow: 1
            },
            root: {
                display: "flex",
                flexDirection: "column",
                minHeight: '90vh'
            },
            divider: {
                marginTop: 12,
                marginBottom: 12
            },
            title: {
                textTransform: "uppercase",
                color: grey[700]
            },
            textField: {
                backgroundColor: "#f0f2f5"
            },
            searchButton: {
                borderWidth: 2,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                paddingLeft: 16,
                paddingRight: 16,
                fontWeight: "bold",
                marginLeft: 16,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: "all 500ms 150ms ease-in-out",
                    color: "white"
                }
            },
            grid: {}
        }
    });
    const classes = useStyles();

    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const history = useHistory();
    const [keyword, setKeyword] = useState("");
    const handleKeywordChange = e => {
        setKeyword(e.target.value);
    }

    const handleSearchSubmit = e => {
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
        if (keyword) {
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
            dispatch(getProducts(keyword, handleAlert));
        } else {
            history.push('/');
        }
        dispatch(getProducts(keyword, page, handleAlert));
    }
    const {products, loading, error, count} = useSelector(state => state.products);
    const [page, setPage] = useState(0);

    const handlePageChange = page => {
        setPage(page);
    }

    return (
        <Layout>
            <div className={classes.root}>
                <Container className={classes.container}>
                    <Grid className={classes.grid} container={true} justify="space-between" alignItems="flex-end">
                        <Grid item={true} xs={4}>
                            <Typography className={classes.title} variant="h4">Search</Typography>
                        </Grid>
                        <Grid item={true} xs={8} container={true} justify="flex-end">
                            <TextField
                                placeholder="Search query..."
                                onChange={handleKeywordChange}
                                name="keyword"
                                fullWidth={false}
                                className={classes.textField}
                                value={keyword}
                                variant='outlined'
                                label="Search Query"
                                margin="dense"
                            />

                            <Button
                                className={classes.searchButton}
                                variant="outlined"
                                onClick={handleSearchSubmit}
                                size="small">
                                Search
                            </Button>
                        </Grid>
                    </Grid>

                    <Divider className={classes.divider} variant="fullWidth"/>

                    {loading ? <LinearProgress variant="query"/> : error ? (
                        <Box>
                            <Divider variant="fullWidth" className={classes.errorDivider}/>

                            <Alert variant="filled" color="info">
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
                                    <Alert variant="filled" color="info">
                                        <AlertTitle>0 Products</AlertTitle>
                                        <Typography className={classes.noProductsText} variant="h6" align="center">No
                                            Products Available</Typography>
                                    </Alert>
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
                        count={Math.round(count / 8)}
                        defaultValue={1}
                        size="large"
                    />
                </Container>
            </div>
        </Layout>
    )
}

export default SearchPage;