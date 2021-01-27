import React from 'react';
import {TaskDelete} from "../../graphql/useMutation";
import {Row} from "simple-flexbox";
import {createUseStyles, useTheme} from "react-jss";
import Button from "@material-ui/core/Button";


const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: "black",
        fontSize: '14px !important',
        padding: '5px !important',
        marginLeft: "40px"
    },
    button:{
        width:"200px"
    }
}));


function TaskDeleteButton(post_id, user_id) {

    const theme = useTheme();
    const classes = useStyles({theme});


    return (
        <>

            <form action="#">
                <Button
                    horizontal='center'
                    variant="outlined"
                    vertical='center'
                    className={classes.button}
                    onClick={TaskDelete(post_id, user_id)}
                >
                    주문 재작성
                </Button>

            </form>

        </>
    );
}


export default TaskDeleteButton;
