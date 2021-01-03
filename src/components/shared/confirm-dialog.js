import React from "react";
import {DialogContent, Dialog, DialogActions, Divider, Button, makeStyles, Typography} from "@material-ui/core";
import {grey, red} from "@material-ui/core/colors";

const ConfirmDialog = ({open, handleCancelAction, handleConfirmAction, message}) => {

    const useStyles = makeStyles(theme => {
        return {
            cancelButton: {
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
            confirmButton: {
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
        }
    });

    const classes = useStyles();

    const handleCancelClicked = () => {
        handleCancelAction();
    }

    const handleConfirmDeleteClicked = () => {
        handleConfirmAction();
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                <Typography
                    variant="h6"
                    align="center">
                    {message}
                </Typography>
            </DialogContent>
            <Divider variant="fullWidth"/>
            <DialogActions>
                <Button
                    onClick={handleCancelClicked}
                    variant="outlined"
                    className={classes.cancelButton}>
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirmDeleteClicked}
                    variant="outlined"
                    className={classes.confirmButton}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;