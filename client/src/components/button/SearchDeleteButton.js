import React from 'react';
import {SearchDelete, UserDelete} from "../../graphql/useMutation";
import Button from "@material-ui/core/Button";


function DeleteButton(id) {

    return (
        <>

            <form action="#">
                <Button
                    onClick={SearchDelete(id)}>🗑</Button>
            </form>

        </>
    );
}


export default DeleteButton;
