import React from 'react';
import { Stars } from '../Stars';
import { useParams } from 'react-router-dom';
import { useRestaurant } from '../hooks';
import styled from 'styled-components';

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const RestaurantDetails: React.FC = () => {
  const { restaurantId } = useParams();
  const { loading, restaurant } = useRestaurant(restaurantId);

  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <Card>
          <CardContainer>
            <div>{restaurant?.name}</div>
            <div>{restaurant?.location}</div>
            <div>
              <Stars averageRating={restaurant?.averageRating ?? 0} />
            </div>
          </CardContainer>
        </Card>
        // render reviews here
        // also add ability to add a review
      )}
    </div>
  );
};

export default RestaurantDetails;
