import React from "react";
import {CardContent, Card, CardHeader, Typography, Avatar, Divider, makeStyles} from "@material-ui/core";
import moment from "moment";
import {Rating} from "@material-ui/lab";
const Review = ({review}) => {

    const useStyles = makeStyles(theme => {
        return {

        }
    });

    const classes = useStyles();
    return (
        <Card elevation={1} variant="outlined" className={classes.card}>
            <CardHeader
                avatar={<Avatar>{review.user.name[0]}</Avatar>}
                title={review.user.name}
                subheader={moment(review.createdAt, "YYYYMMDD").fromNow()}/>
                <Divider variant="inset" />
            <CardContent>
                <Rating size="medium" readOnly={true} precision={0.5} value={review.rating} />
                <Typography className={classes.comment} variant="body2">
                    {review.comment}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Review;