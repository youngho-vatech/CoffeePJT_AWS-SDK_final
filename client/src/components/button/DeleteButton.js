import React from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {DeleteOrder} from "../../graphql/useMutation";

const useStyles = makeStyles((theme) => ({
    button: {
        selfAlign: "center",
        marginTop: "30px",
        marginLeft: "20px"

    }
}));

function DeleteButton(userid) {

    const classes = useStyles();

    return (
        <>

            <form action="#">

                <Button variant="contained" type='submit'
                        onClick={DeleteOrder(userid)}
                        className={classes.button}
                        value="↳주문 취소">
                    주문 취소
                </Button>

            </form>

        </>
    );
}


export default DeleteButton;
