import React from 'react';
import {UserDelete} from "../../graphql/useMutation";
import Button from "@material-ui/core/Button";


function DeleteButton(id) {

    return (
        <>

            <Button
                onClick={UserDelete(id)}>🗑</Button>

        </>
    );
}


export default DeleteButton;
