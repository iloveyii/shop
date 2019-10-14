import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';


import Ni from './components/Ni';
import Index from './components/Index';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Reports from './components/Reports';

class App extends Component {

    render() {
        return (
            <BrowserRouter basename="/">
                <Switch>
                    <Route exact path={`/items`} component={Index}/>
                    <Route exact path={`/login`} component={Login}/>
                    <Route exact path={`/signup`} component={Signup}/>
                    <Route exact path={`/`} component={Login}/>
                    <Route exact path={`/dashboard`} component={Dashboard}/>
                    <Route exact path={`/profile`} component={Profile}/>
                    <Route exact path={`/settings`} component={Settings}/>
                    <Route exact path={`/reports`} component={Reports}/>
                    <Route component={Ni}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

