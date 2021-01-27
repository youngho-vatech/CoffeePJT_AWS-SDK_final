import React, {useEffect, useState} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {Receipt, ReceiptUser} from "../../graphql/query";
import {createUseStyles} from "react-jss";
import {Tooltip} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = createUseStyles(() => ({
    content: {
        textAlign: "center",
        textSize: "10px",
        padding: 20
    }
}));

function BoardTable() {

    const classes = useStyles();
    const [content, setContent] = useState();
    const [user, setUser] = useState();
    const [num, setNum] = useState();
    const {data: receipt} = useQuery(Receipt)
    const {data} = useQuery(ReceiptUser, {
        variables: {
            menu: num
        }
    });

    useEffect(() => {
        if (receipt) {
            setContent(receipt.receipt)
        }
        if (data) {
            setUser(String(Object.values(data)))
        }

    })


    return (

        <>


            <table>
                <caption>영수증</caption>
                <thead>

                {content &&
                content.map((content, index) => (
                    content != "" && <tr className={classes.content}>
                        <Tooltip title={user} placement="top">
                            <Button variant="outlined"
                                    onMouseOver={() => {
                                        setNum(index)
                                    }}
                            > {content}</Button>
                        </Tooltip>
                    </tr>

                ))}

                </thead>
            </table>

        </>

    )
}

export default BoardTable;