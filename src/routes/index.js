import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '../layouts/home';
import Favorites from '../layouts/favorites';
import NoPageFound from '../layouts/noPageFound';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/favorites" component={Favorites} />
    <Route exact path='*' component={NoPageFound} />
  </Switch>
);