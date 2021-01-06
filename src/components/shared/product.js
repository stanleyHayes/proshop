import React from "react";
import {Box, Card, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Rating} from "@material-ui/lab";
import {green, grey} from "@material-ui/core/colors";

const Product = ({product}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                height: 500
            },
            name: {},
            link: {
                textDecoration: "none",
                color: grey[900]
            },
            price: {
                color: grey[700]
            },
            brand: {
                fontWeight: 500,
                color: grey[700],
                textTransform: "uppercase"
            },
            status: {
                fontWeight: "bold",
                color: green["900"]
            },
            divider: {
                marginTop: 16,
                marginBottom: 16
            },
            box: {
                display: 'grid',
                justifyContent: 'center'
            },
            image: {
                height: 300,
                objectFit: "cover",
                objectPosition: "center"
            },

        }
    });

    const classes = useStyles();

    return (
        <Card className={classes.card} variant="outlined" elevation={1}>
            <Link to={`/products/${product._id}`}>
                <CardMedia className={classes.image} component="img" src={product.image || '/images/notfound.jpg'}/>
            </Link>
            <CardContent>
                <Typography align="center" display="block" variant="overline" className={classes.brand}>
                    {product.brand} | {product.category} | {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </Typography>
                <Typography align="center" variant="h6">
                    <Link className={classes.link} to={`/products/${product._id}`}>
                        {product.name}
                    </Link>
                </Typography>

                <Box className={classes.box}>
                    <Rating value={product.rating} readOnly={true} precision={0.5} size="small" max={5}/>
                    <Typography
                        className={classes.brand}
                        display="inline"
                        variant="body2">
                        ( {product.numReviews} Reviews)
                    </Typography>
                </Box>
                <Typography align="center" variant="h5" className={classes.price}>${product.price}</Typography>
            </CardContent>
        </Card>
    )
}

export default Product;