import React, {useState} from "react";
import {
    CardContent,
    Container,
    Grid,
    Card,
    makeStyles,
    TextField,
    Switch,
    Box,
    Typography,
    Divider, Button, LinearProgress
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {signUp} from "../../redux/authentication/authentication-action-creators";
import {useSnackbar} from "notistack";
import {grey} from "@material-ui/core/colors";
import {Link} from "react-router-dom";

const SignUpPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            root: {
                backgroundColor: '#f0f2f5',
                minHeight: '92.6vh',
                display: 'grid',
                justifyItem: "center",
                alignItems: "center",
                paddingTop: 32,
                paddingBottom: 32
            },
            container: {},
            gridContainer: {},
            signUpButton: {
                color: "white",
                paddingBottom: 16,
                paddingTop: 16,
                fontWeight: "bold",
                marginBottom: 16,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transition: 'all 300ms 50ms ease-in-out'
                }
            },
            divider: {
                marginTop: 16,
                marginBottom: 16
            },
            title: {
                fontWeight: 300,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: grey[700],
                [theme.breakpoints.down("sm")]: {
                    fontWeight: 700,
                    fontSize: 32
                }
            },
            tagline: {
                textTransform: "uppercase",
                color: grey[700],
                fontWeight: 900,
            },
            headerDivider: {
                height: 5,
                backgroundColor: theme.palette.primary.main,
                marginBottom: 32,
                marginTop: 32
            },
            noAccountLink: {
                textDecoration: "none",
                textAlign: "center",
                fontWeight: 700,
                color: theme.palette.primary.main
            }
        }
    });

    const classes = useStyles();

    const [user, setUser] = useState({});
    const {name, email, phone, password} = user;
    const [confirmPassword, setConfirmPassword] = useState("");
    const [e, setError] = useState({});
    const [visible, setVisible] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => state.authentication);

    const handleUserChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleConfirmPasswordChange = e => {
        setConfirmPassword(e.target.value);
    }

    const handlePasswordVisibility = () => {
        setVisible(!visible);
    }

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

    const handleSignUpClicked = e => {

        dispatch(signUp(user, handleAlert))
    }


    return (
        <div className={classes.root}>
            <Container>
                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card elevation={0.5}>
                            {loading ? <LinearProgress variant="query"/> : null}
                            <CardContent>
                                {error ? (
                                    <Box>
                                        <Divider variant="fullWidth" className={classes.errorDivider}/>
                                        <Typography variant="h6" className={classes.error}>{error}</Typography>
                                    </Box>
                                ) : null}
                                <Typography className={classes.title} variant="h2" align="center">Pro Shop</Typography>
                                <Typography className={classes.tagline} variant="body2" align="center">
                                    Home of Quality Clothing
                                </Typography>

                                <Divider variant="middle" className={classes.headerDivider}/>

                                <TextField
                                    placeholder="Enter full name"
                                    variant="outlined"
                                    margin="normal"
                                    name="name"
                                    type="text"
                                    label="Name"
                                    value={name}
                                    onChange={handleUserChange}
                                    error={Boolean(e.name)}
                                    helperText={e.name}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter email"
                                    variant="outlined"
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={handleUserChange}
                                    error={Boolean(e.email)}
                                    helperText={e.email}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter phone"
                                    variant="outlined"
                                    margin="normal"
                                    name="phone"
                                    type="tel"
                                    label="Phone"
                                    value={phone}
                                    onChange={handleUserChange}
                                    error={Boolean(e.name)}
                                    helperText={e.name}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <TextField
                                    placeholder="Enter password"
                                    variant="outlined"
                                    margin="normal"
                                    name="password"
                                    type={visible ? 'text' : 'password'}
                                    label="Password"
                                    value={password}
                                    onChange={handleUserChange}
                                    error={Boolean(e.password)}
                                    helperText={e.password}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <Box>
                                    <Switch
                                        color="primary"
                                        className={classes.switch}
                                        size="medium"
                                        onChange={handlePasswordVisibility}
                                        value={visible}
                                    />
                                    <Typography variant="body2"
                                                display="inline">{visible ? 'Hide Password' : 'Show Password'}</Typography>
                                </Box>


                                <TextField
                                    placeholder="Enter password again"
                                    variant="outlined"
                                    margin="normal"
                                    name="confirmPassword"
                                    type={visible ? 'text' : 'password'}
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    error={Boolean(e.confirmPassword)}
                                    helperText={e.confirmPassword}
                                    className={classes.textField}
                                    fullWidth={true}
                                />

                                <Divider variant="fullWidth" className={classes.divider}/>
                                <Button
                                    onClick={handleSignUpClicked}
                                    variant="contained"
                                    disableElevation={true}
                                    fullWidth={true}
                                    className={classes.signUpButton}
                                    size="large"
                                    disabled={loading}>
                                    Sign Up
                                </Button>

                                <Link to="/login" className={classes.noAccountLink}>
                                    <Button className={classes.noAccountLink} variant="text" fullWidth={true}>
                                        Already have an account? Login
                                    </Button>
                                </Link>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default SignUpPage;