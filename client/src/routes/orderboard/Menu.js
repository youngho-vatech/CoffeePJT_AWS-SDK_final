import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IceBoard from "./IceBoard";
import EtcBoard from "./etcBoard";
import OrderBoardComponent from "./OrderBoardComponent";
import {useQuery} from "@apollo/react-hooks";
import {MeQuery} from "../../graphql/query";
import AfterOrder from "./AfterOrder";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
    },
    paper: {
        textAlign: 'center',
        color: "#6d4c41",
    },
    card: {maxWidth: 250},
    color: {
        backgroundColor: 'rgb(200,176,141)',
        fontSize: 10,
        color:"black",
        marginLeft: "23px",
        width: "1235px",
        height: "50px",
        marginBottom: "-24px"
    }
}));

export default function MenuBoard() {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');
    const [status, setStatus] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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


    return status === "주문완료" || status === "주문포기" ? (
        <>
            <AfterOrder/>
        </>
    ) : (

        <div className={classes.root}>
            <AppBar position="static" className={classes.color}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab
                        value="one"
                        label="☕ 커피 ☕"
                        wrapped
                        {...a11yProps('one')}
                    />
                    <Tab value="two" label="🍦 아이스크림 🍦" {...a11yProps('two')} />
                    <Tab value="three" label="🥤 기타 음료 🥤" {...a11yProps('three')} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
                <OrderBoardComponent/>
            </TabPanel>
            <TabPanel value={value} index="two">
                <IceBoard/>
            </TabPanel>
            <TabPanel value={value} index="three">
                <EtcBoard/>
            </TabPanel>
        </div>
    )
}
