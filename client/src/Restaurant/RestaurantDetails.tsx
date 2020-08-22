import React from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurant } from '../hooks';

const RestaurantDetails: React.FC = () => {
  const { restaurantId } = useParams();
  const { loading, restaurant } = useRestaurant(restaurantId);

  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <h1>{restaurant && restaurant.name}</h1>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
