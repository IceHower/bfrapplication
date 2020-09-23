import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

// OBS: O + no final do parametro :repository -> significa que tudo que vier depois do /repositories vai ser passado como parametro.
const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/cadastro' component={Repository}/>
            <Route path='/dashboard' component={Repository}/>
        </Switch>
    )
}

export default Routes;