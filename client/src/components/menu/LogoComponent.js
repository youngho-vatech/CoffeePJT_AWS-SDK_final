import React from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
    container: {
        marginLeft: 32,
        marginRight: 32
    },
    title: {
        ...theme.typography.cardTitle,
        color: "white",
        opacity: 0.5,
        marginLeft: 15,
        fontSize:"40px",
        textAlign:"center"
    }
}));

function LogoComponent() {
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <Row className={classes.container} horizontal='center' vertical='center'>
            <span className={classes.title}>Vatech</span>
        </Row>
    );
}

export default LogoComponent;
