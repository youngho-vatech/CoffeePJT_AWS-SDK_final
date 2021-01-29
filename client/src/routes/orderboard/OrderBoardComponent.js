import React, {useEffect, useState} from 'react';
import {Column} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import OrderBoard from './OrderBoard';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";

const useStyles = createUseStyles((theme) => ({
    cardsContainer: {
        marginRight: -30,
    },
    background: {
        backgroundColor: 'rgba(246,244,244,0.9)',
        padding: "45px 45px 45px 45px",
        marginTop: "20px"
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        },

    },
    border: {
        backgroundColor: "whitesmoke",
        fontSize: '15px !important',
        fontFamily: "Do Hyeon",
        fontWeight: "600",
        textAlign: "center",
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
        color: theme.color.veryDarkGrayishBlue,
        width: "100%",
        padding: "10px 10px 10px 10px",
        marginBottom: "20px"
    },
    itemTitle: {
        color: theme.color.veryDarkGrayishBlue,
        width: "50%"
    }
}));


function OrderBoardComponent() {
    const classes = useStyles();
    const [contents, setContents] = useState("");

    const {data} = useQuery(TaskQuery);
    useEffect(() => {
        if (data) {
            setContents(data.tasks);
        }
    }, [data]);


    return (

        <Column className={classes.background}>


            {contents && contents.map((content) => (
                <span role="img" aria-label="clap" className={classes.border}
                      key={content}>👏  오늘은 {content.creater}님이 {content.title} 기념으로 커피 쏩니다! 👏</span>
            ))}


            <OrderBoard/>


        </Column>


    );
}

export default OrderBoardComponent;