import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';



const AimerTopPage = loadable(() => import('pages/aimer_top/aimer_top'));
const Demo = loadable(() => import('pages/demo/demo'));

export  class RouterConfig extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={AimerTopPage}></Route>
                    <Route path="/demo"  component={Demo}></Route>
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        )
    }
}