import React from 'react';
import {createUseStyles, useTheme} from "react-jss";
import '../../components/table/table.css';
import TransferList from "../../components/table/TransferTable";
import SuccessAlert from "../../components/alert/SuccessAlert";

const useStyles = createUseStyles((theme) => ({

        loginwrap: {
            color: "white",
            fontWeight: "lighter",
            textAlign: "center",
            width: "100%",
            maxWidth: "525px",
            minHeight: "670px",
            position: "relative",
            left: "15%",
            marginTop: "-20px"
        },
        loginhtml: {
            marginTop: "30px",
            width: "200%",
            height: "100%",
            position: "center",
            padding: "90px 30px 50px 10px",
            backgroundColor: theme.color.red,

        },

        h3: {
            color: "white",
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "30px"
        },
        h5: {
            color: "white",
            fontWeight: "lighter",
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "18px"
        },
        loginform: {
            minHeight: "345px",
            position: "relative",
            perspective: "1000px",
            transformStyle: "preserve-3d"

        },

        group: {
            marginBottom: "15px",
            '&:nth-child(n) > label,input,a,table': {
                width: "100%",
                color: "#fff",
                marginBottom: "30px"
            },
            '&:nth-child(n) > input,button,table,tr': {
                border: "none",
                padding: "15px 20px",
                borderRadius: "25px",
                background: "rgba(255,255,255,0.6)",
                textAlign: "center",
                alignContent: "center",
                marginTop: "30px",
            },
            '&:nth-child(n) > input': {
                '&::placeholder': {
                    color: "rgba(184,171,171,0.9)",
                    fontWeight: "bolder"
                }

            },
            '&:nth-child(n) > tr,td': {
                width: "50%",
                padding: "15px 60px",
                alignContent: "center",
                marginTop: 10,
                border: "none"
            },

            '&:nth-child(n) > a': {
                marginTop: "50px",
                border: "none",
                padding: "50px 50px",
                borderRadius: "25px",
                background: "rgba(255,255,255,.1)",
                width: "100%",
                color: "#fff",
                display: "block"
            },
            '&:nth-child(n) > label ': {
                color: "#aaa",
                fontSize: "12px"
            }
        },
        margin: {
            marginTop: "-60px",
            marginBottom: "30px"
        },
        containerMobile: {
            padding: '12px 16px 6px 16px !important'
        },


    }))
;

const AuthenticationForm = () => {

    const theme = useTheme();
    const classes = useStyles({theme});

    return (


        <>
            <SuccessAlert message="미주문자(휴가자/결근자/기타사유)/주문자를 구별하여 버튼을 이용하여 양 옆으로 상태 변환이 가능합니다!"
                          button="주문자/미주문자 페이지란?"/>
            <div className={classes.root}>
                <div className={classes.loginwrap}>
                    <div className={classes.loginhtml}>


                        <h2 className={classes.margin}>{localStorage.getItem('name')}님 환영합니다.</h2>

                        <div className={classes.loginform}>

                            <div className={classes.group}>
                                <TransferList/>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default AuthenticationForm;