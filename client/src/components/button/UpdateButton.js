import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {SelectUpdate} from "../../graphql/useMutation";

const useStyles = makeStyles((theme) => ({
    button: {
        selfAlign: "center",
        marginLeft: "20px",
        padding: "10px 120px"

    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        width: '20ch',
        marginBottom: "10px",
        border: "none",
        borderBottom: "2px solid grey",
        textAlign: "center",
        outline: "none"


    },

    sbutton: {
        marginLeft: theme.spacing(3),
        padding: "3px 30px"
    }

}));


function UpdateButton(username) {

    const classes = useStyles();
    const [content, setContent] = useState('');
    const [click, setClick] = useState(false);


    return (

        <>
            <td>
                {!click && <Button className={classes.button} variant="contained" type='submit'
                                   onClick={() => setClick(true)}>변경</Button>}
                {click && (<input className={classes.textField} placeholder={"이름을 입력해주세요."} type="text"
                                  onChange={e => setContent(e.target.value)}/>)}
                {click && (
                    <Button type='submit' variant="contained"
                            onClick={SelectUpdate(username, content, setClick)}
                            className={classes.sbutton}
                            value="↳Update">Update</Button>

                )
                }
                {click && (<Button variant="contained" type='submit' className={classes.sbutton}
                                   onClick={() => setClick(false)}>취소</Button>)}

            </td>


        </>


    );

}


export default UpdateButton;
