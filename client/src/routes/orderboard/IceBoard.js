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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    background: {
        backgroundColor: 'rgba(246,244,244,0.9)',
        padding: "45px 45px 45px 45px"
    },
    card: {maxWidth: 345},
    color: {
        brown: "#6d4c41"
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
    container: {
        marginTop: 30
    },
    button: {
        marginLeft: 45
    },
    media: {
        cursor: "default"
    }
}));

export default function IceBoard() {
    const classes = useStyles();
    const [contents, setContents] = useState('');

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

            <div className={classes.container}>
                <div className={classes.root}>

                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            className={classes.media}
                                            image="https://m.iceplanet.co.kr/web/product/big/201905/392ef164b0a2c8c2edb6f1462c3f6cdf.jpg"
                                        />
                                        <CardContent className={classes.media}>
                                            <Typography gutterBottom variant="h5" component="h2"
                                                        className={classes.media}>
                                                아시나요
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateButton hi="icecream" menu="아시나요" color="primary" label="아시나요 선택"
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
                                            image="https://img5.yna.co.kr/etc/inner/KR/2017/08/07/AKR20170807054700030_01_i_P2.jpg"
                                        />
                                        <CardContent className={classes.media}>
                                            <Typography gutterBottom variant="h5" component="h2"  className={classes.media}>
                                                돼지콘
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateButton hi="icecream" menu="돼지콘" color="primary" label="돼지콘 선택"
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
                                            image="https://contents.lotteon.com/itemimage/_v100649/LF/15/00/59/6_/0/LF1500596_0_1.jpg/dims/resizemc/400x400"
                                        />
                                        <CardContent className={classes.media}>
                                            <Typography gutterBottom variant="h5" component="h2"  className={classes.media}>
                                                브라보
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateButton hi="icecream" menu="브라보" color="primary" label="브라보 선택"
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
                                            image="https://m.assabeer.com/web/product/big/a_64.jpg"
                                        />
                                        <CardContent className={classes.media}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                녹차마루
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">

                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateButton hi="icecream" menu="녹차마루" color="primary" label="녹차마루 선택"
                                                      className={classes.button}/>

                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Column>


    );
}

