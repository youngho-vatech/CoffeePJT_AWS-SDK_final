import React from 'react';
import {Column} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import UserBoard from './UserBoard';

const useStyles = createUseStyles({
    container: {
        marginTop: 0
    }
});

function UserboardComponent() {
    const classes = useStyles();


    return (
        <Column>
            <div className={classes.container}>
                <UserBoard/>
            </div>
        </Column>
    );
}

export default UserboardComponent;
