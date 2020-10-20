import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateOrphanage from './styles/pages/CreateOrphanages/CreateOrphanage';
import Landing from './styles/pages/Landing';
import Orphanage from './styles/pages/Orphanage/Orphanage';
import OrphanageMaps from './styles/pages/OrphanageMaps';

const Routes = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/app" component={OrphanageMaps} />
                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;