import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {Column, Row} from "simple-flexbox";
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import CreateButton from "./useBoard";
import GiveupButton from "../../components/button/GiveupButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {maxWidth: 345,},
    color: {
        brown: "#6d4c41"
    },
    background: {
        backgroundColor: 'rgba(246,244,244,0.9)',
        padding: "45px 45px 45px 45px"
    },
    border: {
        backgroundColor: "whitesmoke",
        fontSize: '15px !important',
        fontFamily: "Do Hyeon",
        fontWeight: "600",
        border: `5px solid #624444`,
        borderRadius: 5,
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: "#373a47",
        width: "50%"
    },
    ordercard: {
        marginTop: 30
    },
    button: {
        marginLeft: 45
    },
    media: {
        cursor: "default"
    }
}));

export default function EtcBoard() {
    const classes = useStyles();
    const [contents, setContents] = useState('');
    const [status, setStatus] = useState();

    const {data} = useQuery(TaskQuery);
    useEffect(() => {
        if (data) {
            setContents(data.tasks);

        }
    }, [data]);

    return (
        <Column className={classes.background}>
            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{1024: 'column'}}
            >
                <table className={classes.border}>

                    {contents && contents.map((content) => (
                        <td><span className={classes.itemTitle}>👏  오늘은 {content.creater}님이 {content.title} 기념으로 커피 쏩니다! 👏</span>
                        </td>))}
                </table>

            </Row>

            <div className={classes.ordercard}>
                <div className={classes.root}>

                    <Grid container spacing={3}>

                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="230"
                                            className={classes.media}
                                            image="https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2"
                                                        className={classes.media}>
                                                아이스티
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>

                                        <CreateButton hi="etc" menu="아이스티" color="primary" label="아이스티 선택"
                                                      className={classes.button}/>

                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            className={classes.media}
                                            image="https://images.unsplash.com/photo-1524156868115-e696b44983db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1946&q=80"
                                        />

                                        <CardContent className={classes.media}>
                                            <Typography gutterBottom variant="h6" component="h2">
                                                망고 요거트<br/> 스무디
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateButton hi="etc" menu="망고 요거트 스무디" color="primary" label="스무디 선택"
                                                      className={classes.button}/>

                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            className={classes.media}
                                            image="https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80"
                                        />
                                        <CardContent className={classes.media}>
                                            <Typography gutterBottom variant="h6" component="h2">
                                                딸기 요거트<br/> 스무디
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateButton hi="etc" menu="딸기 요거트 스무디" color="primary" label="스무디 선택"
                                                      className={classes.button}/>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            className={classes.media}
                                            image="https://images.unsplash.com/photo-1577118202736-22e9be066d95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                                        />
                                        <CardContent className={classes.media}>
                                            <Typography gutterBottom variant="h6" component="h2">
                                                플레인 요거트<br/> 스무디
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateButton hi="etc" menu="플레인 요거트 스무디" color="primary" label="스무디 선택"
                                                      className={classes.button}/>

                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                        {status === "대기중" && (
                            <GiveupButton userid={localStorage.getItem("myData")}/>
                        )}

                    </Grid>
                </div>
            </div>

        </Column>


    );
}

