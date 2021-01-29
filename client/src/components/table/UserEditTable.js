import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {useQuery} from "@apollo/react-hooks";
import {AllUserQuery} from "../../graphql/query";
import UpdateUserDialog from "../dialog/UpdateUser";
import UserDeleteButton from "../button/UserDeleteButton";
import UserAddButton from "../button/UserAddButton";
import {MultipleUserDelete} from "../../graphql/useMutation";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: "auto",
        height: "auto",
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    border: {
        border: "none"

    },
    addbutton: {
        justify: "flex-end",
        float: "right"
    }
}));


function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}


export default function UserEditTable() {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [list, setList] = useState([]);


    const {data: order} = useQuery(AllUserQuery);

    useEffect(() => {
        if (order) {
            setList(order.allUsers);
        }
    }, [order]);

    const listChecked = intersection(checked, list);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const customList = (title, items) => (
        <Card>
            <List className={classes.list} dense component="div" role="list">
                <table>
                    <thead>
                    <tr>
                        <th scope="col">사용자 이름</th>
                        <th scope="col">변경</th>
                        <th scope="col">삭제</th>


                    </tr>
                    </thead>
                    <tbody>
                    {items.map((value) => {
                        const labelId = `transfer-list-all-item-${value}-label`;

                        return (

                            <tr style={{marginBottom: 20}} key={value.username}>
                                <th>
                                    <ListItem role="listitem" button onClick={handleToggle(value)}>

                                        <ListItemIcon>
                                            <Checkbox
                                                checked={checked.indexOf(value) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </ListItemIcon>

                                        <ListItemText id={labelId} primary={value.username}/>

                                    </ListItem>
                                </th>
                                <th><UpdateUserDialog username={value.username} id={value._id}/></th>
                                <th><UserDeleteButton post_id={value._id}/></th>
                            </tr>

                        );
                    })}
                    </tbody>
                </table>
                <ListItem/>
            </List>
        </Card>
    );


    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>

                    <span className={classes.addbutton}>
                        <UserAddButton/>
                    </span>
            <span>
                        <Button
                            variant="outlined"
                            onClick={MultipleUserDelete(checked)}
                            disabled={listChecked.length === 0}
                            aria-label="move selected right"
                            color="secondary"
                        >
                            선택 삭제
                        </Button>
                    </span>


            <Grid item>{customList('주문자', list)}</Grid>

        </Grid>


    );
}
