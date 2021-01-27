import React from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {ChangeGiveup} from "../../graphql/useMutation";

const useStyles = makeStyles((theme) => ({
    button: {
        selfAlign: "center",
        marginTop: "30px",
        padding: "30px 80px 30px 80px",
        textAlign: "center"

    }

}));


function ChangeGiveupButton(userid) {

    const classes = useStyles();

    return (
        <>

            <form action="#">

                <Button variant="contained" type='submit'
                        onClick={ChangeGiveup(userid)}
                        className={classes.button}
                        value="↳주문 취소">
                    주문을 포기하셨습니다.<br/>재주문하시려면 클릭해주세요.
                </Button>

            </form>

        </>
    );
}

export default ChangeGiveupButton;
