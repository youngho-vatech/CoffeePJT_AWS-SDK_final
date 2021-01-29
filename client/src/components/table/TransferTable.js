import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {useQuery} from "@apollo/react-hooks";
import {Ordermen, VacationQuery} from "../../graphql/query";
import {OrderBack, VacationBack} from "../../graphql/useMutation";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 400,
        height: 300,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function TransferList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([1, 2, 3]);
    const [right, setRight] = React.useState([4, 5, 6, 7]);

    const {data: user} = useQuery(VacationQuery);
    const {data: order} = useQuery(Ordermen);

    useEffect(() => {
        if (user) {
            setRight(user.includedVacation);
        }
        if (order) {
            setLeft(order.includedOrdermen);
        }
    },[user,order]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

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

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const customList = (title, items) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0}
                        inputProps={{'aria-label': '전체 인원 이동'}}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} 명`}
            />
            <Divider/>
            <List className={classes.list} dense component="div" role="list">
                {items.map((value,index) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem key={index} role="listitem" button onClick={handleToggle(value)}>
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
                    );
                })}
                <ListItem/>
            </List>
        </Card>
    );


    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList('커피 주문자', left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={VacationBack(checked)}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={OrderBack(checked)}
                        disabled={rightChecked.length === 0}
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('휴가자/결근자/기타사유', right)}</Grid>

        </Grid>


    );
}
