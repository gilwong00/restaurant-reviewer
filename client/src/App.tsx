import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { RestaurantDetails, RestaurantAdd } from './Restaurant';
import styled from 'styled-components';

const Viewport = styled.div`
  max-width: 1200px;
  width: 100%;
  min-height: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const App: React.FC = () => (
  <Viewport>
    <Router>
      <Switch>
        <Route path='/restaurant/add' component={RestaurantAdd} />
        <Route path='/restaurant/:restaurantId' component={RestaurantDetails} />
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </Router>
  </Viewport>
);

export default App;
