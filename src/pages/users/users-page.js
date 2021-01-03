import React from "react";
import Layout from "../../components/layout/layout";
import {Container, Divider, makeStyles, Typography} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

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
        }
    });
    const classes = useStyles();

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h4" >Users</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>
            </Container>
        </Layout>
    )
}

export default UsersPage;