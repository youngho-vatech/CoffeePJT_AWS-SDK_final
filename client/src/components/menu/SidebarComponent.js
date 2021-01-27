import React, {useEffect, useState} from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import {useHistory} from 'react-router-dom';
import LINKS from 'resources/links';
import {convertlinksToUrl} from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import {useAuthToken} from '../../routes/firstpage/authToken';
import {useQuery} from '@apollo/react-hooks';
import {MeQuery} from "../../graphql/query";

const useStyles = createUseStyles({
    separator: {
        borderTop: ({theme}) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

const handleClick = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {

        localStorage.clear()
        window.location.href = '/'
    }
}


function SidebarComponent() {
    const [_, removeAuthToken] = useAuthToken();

    const {push} = useHistory();
    const theme = useTheme();
    const classes = useStyles({theme});
    const isMobile = window.innerWidth <= 1080;

    const [user, setUser] = useState();


    const {data} = useQuery(MeQuery, {
        variables: {
            userid: localStorage.getItem('myData')
        },

    });

    useEffect(() => {
        if (data) {
            setUser(data.me.position);

        }
    }, [data]);


    function onClick(link, parameters = {}) {
        push(convertlinksToUrl(link, parameters));
    }


    return (

        <Menu isMobile={isMobile}>
            <div style={{paddingTop: 30, paddingBottom: 30}}>
                <LogoComponent/>
            </div>


            {localStorage.getItem('myData') &&
            <MenuItem
                id={LINKS.orderboard}
                title='주문하기'
                onClick={() => onClick(LINKS.orderboard)}
            />}

            {user == "결제자" && <MenuItem
                id={LINKS.pay}
                title='결제하기'
                onClick={() => onClick(LINKS.pay)}
            />}

            <div className={classes.separator}></div>

            {user == "결제자" &&
            <MenuItem
                id={LINKS.settings}
                title='팀원 관리'
                onClick={() => onClick(LINKS.settings)}
            />}

            {user == "결제자" && <MenuItem
                id={LINKS.create}
                title='마이페이지'
                onClick={() => onClick(LINKS.reset)}
            />}


            {localStorage.getItem('myData') && <MenuItem id='logout' title='로그아웃' onClick={handleClick}/>}

        </Menu>

    );
}

export default SidebarComponent;




