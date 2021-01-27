import React from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Giveup} from "../../graphql/useMutation";

const useStyles = makeStyles((theme) => ({
    button: {
        selfAlign: "center",
        marginTop: "30px",
        marginLeft: "450px",
        padding: "10px 40px 10px 40px",
        textAlign: "center"

    }

}));


function GiveupButton(userid) {

    const classes = useStyles();

    return (
        <>

            <form action="#">

                <Button variant="contained" type='submit'
                        onClick={Giveup(userid)}
                        className={classes.button}
                        value="↳주문 취소">
                    주문하지 않겠습니다.
                </Button>

            </form>

        </>
    );
}


export default GiveupButton;
