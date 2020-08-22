import React, { useContext } from 'react';
import { AppContext, IRestaurant } from '../Context';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  border: 1px solid black;
  min-height: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Dashboard: React.FC = () => {
  const { restaurants } = useContext(AppContext);

  return (
    <DashboardContainer>
      {restaurants.map((restaurant: IRestaurant) => (
        <h1 key={restaurant.id}>{restaurant.name}</h1>
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;
