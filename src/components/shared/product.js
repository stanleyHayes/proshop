import React from "react";
import {Box, Card, CardContent, CardMedia, Divider, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Rating} from "@material-ui/lab";
import {green, grey} from "@material-ui/core/colors";

const Product = ({product}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {},
            name: {},
            link: {
                textDecoration: "none",
                color: grey[600]
            },
            price: {
                color: grey[600]
            },
            brand: {
                fontWeight: 800,
                color: grey[600],
                textTransform: "uppercase"
            },
            status: {
                fontWeight: "bold",
                color: green["900"]
            },
            divider: {
                marginTop: 16,
                marginBottom: 16
            }
        }
    });

    const classes = useStyles();

    return (
        <Card variant="elevation" elevation={0.5}>
            <Link to={`/products/${product._id}`}>
                <CardMedia component="img" src={product.image || '/images/notfound.jpg'}/>
            </Link>
            <CardContent>
                <Typography variant="overline" className={classes.brand}>
                    {product.brand} | {product.category}
                </Typography>
                <Typography variant="h6">
                    <Link className={classes.link} to={`/products/${product._id}`}>
                        {product.name}
                    </Link>
                </Typography>

                <Box>
                    <Rating value={product.rating} readOnly={true} precision={0.5} size="small" max={5}/>
                    <Typography
                        className={classes.brand}
                        display="inline"
                        variant="body2">
                        ( {product.numReviews} Reviews)
                    </Typography>
                </Box>
                <Typography variant="h5">${product.price}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>
                <Typography
                    variant="overline"
                    className={classes.status}>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Product;