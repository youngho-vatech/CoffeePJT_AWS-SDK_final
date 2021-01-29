import React, {useEffect, useState} from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import VacationBoard from "../firstpage/VacationBoard";
import UpdateTask from "../../components/dialog/UpdateTask";
import Emoji from "../../components/alert/emoji";

const useStyles = createUseStyles((theme) => ({
    root: {marginTop: -160},
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
    }

}));

function RewritePage(props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [contents, setContents] = useState();

    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setContents(data.tasks);
        }
    }, [data])

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            className={classes.root}

            items={[
                <Row>
                    <Row horizontal='space-between' vertical='center'>
                        <Row>
                            <table>

                                <thead>
                                <tr>
                                    <th scope="col">주문 내용</th>
                                    <th scope="col">주문 재작성</th>


                                </tr>
                                </thead>

                                {contents && contents.map((content) => (


                                    <tbody key={content}>
                                    <tr>
                                        <td><span className={classes.itemTitle}>
                                        <Emoji symbol="👏"/>오늘은 {content.creater}님이 {content.title} 기념으로 커피 삽니다!<Emoji symbol="👏"/></span></td>
                                        <td><UpdateTask id={content._id} title={content.title}/></td>
                                    </tr>

                                    </tbody>

                                ))}
                            </table>

                        </Row>
                    </Row>
                </Row>,

                <VacationBoard/>


            ]}
        />

    );
}


export default RewritePage;