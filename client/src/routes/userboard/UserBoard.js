import React, {useState} from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import UserEditTable from "../../components/table/UserEditTable";
import SearchTable from "../../components/table/SearchTable";

const useStyles = createUseStyles((theme) => ({
    root: {marginTop: "30px"},

    addButton: {
        backgroundColor: theme.color.darkgreen,
        color: theme.color.grayishBlue2,
        fontSize: '15px !important',
        padding: '10px !important',
        width: "fit-content"
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue,
        width: "50%"
    },
    itemValue: {
        color: theme.color.grayishBlue2,
        width: "50%"
    },
    greyTitle: {
        color: theme.color.grayishBlue3
    },
    checkboxWrapper: {
        cursor: 'pointer',
        marginRight: 16
    },
    input: {
        color: theme.color.black,
        display: "block",
        width: "200%",
        padding: "10px 0 10px 50px",
        fontSize: '15px !important',
        fontFamily: "Open Sans",
        fontWeight: "600",
        border: "0",
        borderRadius: "3px",
        outline: 0,
        textIndent: "70px",
        transition: "all .3s ease-in-out",
        margin: "0px auto",
        alignItems: "center",
        justifyContent: "center",
        LeftMargin: "30px",
        alignSelf: "center"
    },
    text: {
        textAlign: "center",
        margin: "none"
    }

}));

function Create(props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [search, setSearch] = useState('');

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            className={classes.root}

            items={[

                <h3 className={classes.text}>유저 관리</h3>,
                <Row horizontal='space-between' vertical='center'>

                    <span className={[classes.itemTitle, classes.greyTitle].join(' ')}>
                        <input type="text" placeholder="유저를 검색해주세요" onChange={e => setSearch(e.target.value)}
                               className={classes.input}/>
                    </span>

                </Row>,
                <Row>

                    <Row horizontal='space-between' vertical='center'>
                        <Row>

                            {search === undefined || search === '' ? <UserEditTable/> : <SearchTable search={search}/>}

                        </Row>
                    </Row>
                </Row>


            ]}
        />

    );
}


export default Create;