import React, {useEffect, useState} from 'react';
import {Column} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import PaymentBoard from './PaymentBoard';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import SuccessAlert from "../../components/alert/SuccessAlert";
import Emoji from "../../components/alert/emoji";


const useStyles = createUseStyles((theme) => ({
    cardsContainer: {
        marginRight: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        // marginRight: 30,
        '@media (max-width: 768px)': {
            // marginTop: 30,
            maxWidth: 'none'
        }
    },
    boardsection: {
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
            // marginTop: 30
        }
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
    background: {
        backgroundColor: 'rgba(246,244,244,0.9)',
        padding: "45px 45px 45px 45px",
        marginTop: "20px"
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue,
        width: "50%"
    }
}));

function PaymentboardComponent() {
    const classes = useStyles();

    const [contents, setContents] = useState('');
    const {data} = useQuery(TaskQuery);
    useEffect(() => {
        if (data) {
            setContents(data.tasks);

        }
    }, [data]);


    return (
        <>

            <SuccessAlert message="미주문자와 영수증 메뉴에 마우스를 올리시면 명단 확인이 가능합니다!"
                          button="결제하기 페이지란?"/>
            <Column className={classes.background}>


                {contents && contents.map((content) => (
                    <span className={classes.border} key={content}><Emoji
                        symbol="👏"/>  오늘은 {content.creater}님이 {content.title} 기념으로 커피 쏩니다! <Emoji symbol="👏"/></span>
                ))}


                <PaymentBoard/>


            </Column>
        </>
    );
}

export default PaymentboardComponent;
