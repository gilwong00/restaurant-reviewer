import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { RestaurantDetails } from './Restaurant';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/restaurant/:restaurantId' component={RestaurantDetails} />
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
