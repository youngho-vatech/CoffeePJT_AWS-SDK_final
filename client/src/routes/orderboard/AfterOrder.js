import React from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import UserTable from "../../components/table/AfterTable";
import CardComponent from "../../components/cards/CardComponent";

const useStyles = createUseStyles((theme) => ({
    root: {marginTop: "30px"},
    container: {
        backgroundColor: '#FFFFFF',
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
        cursor: 'pointer'
    },
    graphSection: {
        padding: 24
    }
}));

function OrderBoard(props) {
    const theme = useTheme();
    const classes = useStyles({theme});

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            className={classes.root}
            items={[  <UserTable/>]}
            />


    );


}

export default OrderBoard;
