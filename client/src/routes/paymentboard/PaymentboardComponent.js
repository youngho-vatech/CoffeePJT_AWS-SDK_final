import React, {useEffect, useState} from 'react';
import {Column} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import PaymentBoard from './PaymentBoard';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import SuccessAlert from "../../components/alert/SuccessAlert";


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
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
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
            <Column>
                <table className={classes.border}>

                    {contents && contents.map((content) => (
                        <td><span
                            className={classes.itemTitle}>👏  결제자 {content.creater}님 환영합니다!👏</span>
                        </td>))}
                </table>

                <div className={classes.boardsection}>
                    <PaymentBoard/>
                </div>

            </Column>
        </>
    );
}

export default PaymentboardComponent;
