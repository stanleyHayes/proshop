import React from "react";
import Layout from "../../components/layout/layout";
import {Container, makeStyles, Typography} from "@material-ui/core";

const PrivacyPolicyPage = () => {
    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },

            divider: {
                marginTop: 12,
                marginBottom: 12
            }
        }
    });
    const classes = useStyles();

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography variant="h3" align="center">Privacy Policy</Typography>
            </Container>
        </Layout>
    )
}

export default PrivacyPolicyPage;