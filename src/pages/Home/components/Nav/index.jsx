import React, { Suspense, lazy } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Loading } from '../../../../components/Loading/index';

const Eat = lazy(() => import('../Eat/index'));
const Shop = lazy(() => import('../Shop/index'));

export default class Nav extends React.Component {
  render() {
    return (
      <div>
        {/* child route */}
        <NavLink to="/home/eat" activeClassName="selected-nav">
          Eat
        </NavLink>
        <NavLink to="/home/shop" activeClassName="selected-nav">
          Shop
        </NavLink>
        <Suspense fallback={Loading}>
          <Route path="/home/eat" render={() => <Eat />} />
          <Route path="/home/shop" render={() => <Shop />} />
        </Suspense>
      </div>
    );
  }
}
