import React from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import TransferList from "../../components/table/TransferTable";

const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: '#FFFFFF',
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
        cursor: 'pointer'
    }
}));

function VacationBoard() {
    const theme = useTheme();
    const classes = useStyles({theme});

    return (
        <Row
            flexGrow={2}
            className={classes.container}
            horizontal='center'
            breakpoints={{1024: 'column'}}
        >

            <TransferList/>

        </Row>
    );
}

export default VacationBoard;
