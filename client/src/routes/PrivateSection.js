import React from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import {Column, Row} from 'simple-flexbox';
import {SidebarComponent} from '../components/menu';
import {SidebarContext} from '../components/menu';
import HeaderComponent from 'components/menu/HeaderComponent';
import PrivateRoutes from './PrivateRoutes';
import {useLocation} from "react-router-dom";


const useStyles = createUseStyles({
    container: {
        height: '100%',
        minHeight: 850
    },
    mainBlock: {
        marginLeft: 255,
        padding: 30,
        '@media (max-width: 1080px)': {
            marginLeft: 0
        }
    },
    contentBlock: {
        marginTop: 54
    }
});

function PrivateSection() {

    const theme = useTheme();
    const classes = useStyles({theme});
    const {pathname} = useLocation();


    return (
        <>
            <SidebarContext>
                <Row className={classes.container}>
                    {pathname && pathname === '/' ? null : (
                        <SidebarComponent/>
                    )}

                    <Column flexGrow={1} className={classes.mainBlock}>
                        <HeaderComponent/>
                        <div className={classes.contentBlock}>
                            <PrivateRoutes/>
                        </div>
                    </Column>
                </Row>

            </SidebarContext>
        </>
    )
}

export default PrivateSection;
