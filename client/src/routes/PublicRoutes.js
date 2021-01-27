import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import First from "./firstpage/NoTask";
import CustomizedSteppers from "./firstpage/Stepper";
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../graphql/query";

function PublicRoutes() {

    const [task, setTask] = useState();
    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setTask(data.tasks);
        }
    }, [data]);


    return localStorage.getItem('myData') ? (
        <Switch>
            <Route path={LINKS.create} component={CustomizedSteppers}/>
            {task === null &&
            <Redirect to={LINKS.create} component={CustomizedSteppers}/>}

        </Switch>
    ) : (
        <Switch>

            <Route path={LINKS.ologin} component={First}/>
            {task === null && <Redirect to={LINKS.ologin} component={First}/>}

        </Switch>

    )
}

export default PublicRoutes;
