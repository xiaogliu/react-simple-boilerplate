import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Loading } from '../components/Loading/index';

const Home = lazy(() => import('../pages/Home/index'));
const List = lazy(() => import('../pages/List/index'));

const AppRouter = () => (
  <Router>
    <Suspense fallback={Loading}>
      <div className="App">
        <Route exact path="/" render={() => <Redirect to="/home/eat" />} />
        <Route exact path="/home" render={() => <Redirect to="/home/eat" />} />
        <Switch>
          <Route path="/home" render={() => <Home />} />
          <Route path="/list" render={() => <List />} />
        </Switch>
      </div>
    </Suspense>
  </Router>
);

export default AppRouter;
