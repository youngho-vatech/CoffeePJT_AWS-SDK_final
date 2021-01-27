import React, {useEffect, useState} from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import TaskDeleteButton from "../../components/button/TaskDeleteButton";
import VacationBoard from "../firstpage/VacationBoard";
import UpdateTask from "../../components/dialog/UpdateTask";

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
    })

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            className={classes.root}
            title='📋 주문 생성 및 휴가자 관리 📋'
            subtitle='(예시) 사유를 적어주시면 👏오늘은 OOO님이 @@ 기념으로 커피 삽니다!👏 로 주문자 화면에 보여집니다!'

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


                                    <tbody>
                                    <td><span className={classes.itemTitle}>
                                        👏오늘은 {content.creater}님이 {content.title} 기념으로 커피 삽니다!👏</span></td>
                                    <td><UpdateTask id={content._id} title={content.title}/></td>


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