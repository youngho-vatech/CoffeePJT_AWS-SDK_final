import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import LoadingComponent from 'components/loading';
import AfterOrder from "./orderboard/AfterOrder";

const MenuBoard = lazy(() => import('./orderboard/Menu'))
const Create = lazy(() => import('./paymentboard/RewritePage'))
const basicLogin = lazy(() => import('./firstpage/LoginPage'))
const UserboardComponent = lazy(() => import('./userboard/UserboardComponent'))
const PaymentboardComponent = lazy(() => import('./paymentboard'))


function PrivateRoutes() {


    return localStorage.getItem('myData') ? (
        <Suspense fallback={<LoadingComponent loading/>}>

            <Switch>

                <Route exact path={LINKS.orderboard} component={MenuBoard}/>
                <Route exact path={LINKS.after} component={AfterOrder}/>
                <Route exact path={LINKS.pay} component={PaymentboardComponent}/>
                <Route exact path={LINKS.settings} component={UserboardComponent}/>
                <Route exact path={LINKS.reset} component={Create}/>
                <Redirect to={LINKS.orderboard} component={MenuBoard}/>

            </Switch>

        </Suspense>
    ) : (
        <Suspense fallback={<LoadingComponent loading/>}>

            <Switch>

                <Route exact path={LINKS.login} component={basicLogin}/>
                <Redirect to={LINKS.login} component={basicLogin}/>

            </Switch>

        </Suspense>
    )
}

export default PrivateRoutes;
