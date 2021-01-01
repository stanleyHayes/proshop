import React, {useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Container,
    Divider,
    makeStyles,
    Typography,
    Stepper,
    Step,
    StepLabel,
} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import Shipping from "../../components/shared/shipping";
import Payment from "../../components/shared/payment-method";
import PlaceOrder from "../../components/shared/place-order";

const CheckoutPage = () => {
    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },

            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            title: {
                textTransform: "uppercase",
                color: grey[700]
            },
            previousButton: {},
            nextButton: {},
            stepper: {
                backgroundColor: "#f0f2f5"
            }
        }
    });
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);

    const handleNextClicked = () => {
        setActiveStep(step => step + 1);
    }
    const handlePreviousClicked = () => {
        setActiveStep(step => step - 1);
    }
    const getComponentByStep = step => {
        switch (step) {
            case 0:
                return {component: <Shipping handleNextClicked={handleNextClicked}/>, label: 'Shipping'};
            case 1:
                return {
                    component:
                        <Payment
                            handleNextClicked={handleNextClicked}
                            handlePreviousClicked={handlePreviousClicked}
                        />,
                    label: 'Payment Method'
                };
            case 2:
                return {
                    component:
                        <PlaceOrder
                            handleNextClicked={handleNextClicked}
                            handlePreviousClicked={handlePreviousClicked}
                        />,
                    label: 'Place Order'
                };
            default:
                return {component: <Shipping/>, label: 'Shipping'};
        }
    }
    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title}
                            variant="h4">{getComponentByStep(activeStep).label}</Typography>
                <Divider className={classes.divider} variant="fullWidth"/>

                <Stepper className={classes.stepper} activeStep={activeStep}>
                    {
                        <Step>
                            {getComponentByStep(activeStep).component}
                            <StepLabel>{getComponentByStep(activeStep).label}</StepLabel>
                        </Step>
                    }
                </Stepper>
            </Container>
        </Layout>
    )
}

export default CheckoutPage;