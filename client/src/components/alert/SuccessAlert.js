import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: "20px",
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    button: {
        padding: "10 10 10 10",
        marginLeft: "10px"
    }
}));

export default function SuccessAlert({message, button}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    return (
        <>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Collapse>
            <Button
                disabled={open}
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                    setOpen(true);
                }}
                hidden={open}

            >
                {button}
            </Button>
        </>
    );
}
