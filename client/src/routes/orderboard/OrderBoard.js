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
import {useTheme} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import {MeQuery} from "../../graphql/query";
import CreateOrder from "./useBoard";
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
    card: {maxWidth: 345},
    color: {
        brown: "#6d4c41"
    },
    containerMobile: {
        padding: '24px 32px 12px 32px !important'
    },
    itemContainerMobile: {
        marginLeft: -30,
        marginRight: -30,
        paddingLeft: 30,
        paddingRight: 30
    },
    media: {
        cursor: "default"
    }
}));

export default function CorderBoard() {

    const theme = useTheme();
    const classes = useStyles({theme});
    const [status, setStatus] = useState();


    const {data} = useQuery(MeQuery, {
        variables: {
            userid: localStorage.getItem('myData')
        }
    });


    useEffect(() => {
        if (data) {
            setStatus(data.me.status);
        }
    }, [data]);

    return (


        <div className={classes.root}>

            <Grid container spacing={3} flexGrow={1} horizontal='center'
                  breakpoints={{300: classes.itemContainerMobile}}>

                <Grid item xs={3} flexGrow={3}
                      flexBasis='350px'>

                    <Paper className={classes.paper}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    className={classes.media}
                                    image="https://images.unsplash.com/photo-1593231269103-6667d6905882?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80"
                                    title="아메리카노"
                                />
                                <CardContent className={classes.media}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        아메리카노
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <CreateOrder hi="hot" menu="아메리카노" color="secondary" label="Hot"/>
                                <CreateOrder hi="ice" menu="아메리카노" color="primary" label="Ice"/>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item xs={3} flexGrow={3}
                      flexBasis='350px'>

                    <Paper className={classes.paper}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    className={classes.media}
                                    image="https://images.unsplash.com/photo-1556484245-2c765becb8eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                                    title="카페라떼"
                                />
                                <CardContent className={classes.media}>
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.media}>
                                        카페라떼
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <CreateOrder hi="hot" menu="카페라떼" color="secondary" label="Hot"/>
                                <CreateOrder hi="ice" menu="카페라떼" color="primary" label="Ice"/>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item xs={3} flexGrow={3}
                      flexBasis='350px'>
                    <Paper className={classes.paper}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="바닐라라떼"
                                    height="200"
                                    className={classes.media}
                                    image="https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
                                    title="바닐라라떼"
                                />
                                <CardContent className={classes.media}>
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.media}>
                                        바닐라라떼
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <CreateOrder hi="hot" menu="바닐라라떼" color="secondary" label="Hot"/>
                                <CreateOrder hi="ice" menu="바닐라라떼" color="primary" label="Ice"/>
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
                                    alt="카페 모카"
                                    className={classes.media}
                                    height="200"
                                    image="https://images.unsplash.com/photo-1523247140972-52cc3cdd2715?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                                />
                                <CardContent className={classes.media}>
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.media}>
                                        카페 모카
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <CreateOrder hi="hot" menu="카페모카" color="secondary" label="Hot"/>
                                <CreateOrder hi="ice" menu="카페모카" color="primary" label="Ice"/>
                            </CardActions>
                        </Card>
                    </Paper>

                </Grid>

                {status === "대기중" && (
                    <GiveupButton userid={localStorage.getItem("myData")}/>
                )}

            </Grid>
        </div>

    );
}