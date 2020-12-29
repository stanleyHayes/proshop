import React from "react";
import {Box, Card, CardContent, CardMedia, Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Rating} from "@material-ui/lab";
import {grey} from "@material-ui/core/colors";

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
            }
        }
    });

    const classes = useStyles();

    return (
        <Card variant="elevation" elevation={1}>
            <CardContent>
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
                            <Typography className={classes.brand} display="inline" variant="body2"> ( {product.numReviews} Reviews)</Typography>
                        </Box>
                    <Typography variant="h5">${product.price}</Typography>
                </CardContent>
            </CardContent>
        </Card>
    )
}

export default Product;