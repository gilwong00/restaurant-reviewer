import React, { useContext } from "react";
import { AppContext, IRestaurant } from "../Context";

const Dashboard: React.FC = () => {
  const { restaurants } = useContext(AppContext);

  return (
    <div>
      {restaurants.map((restaurant: IRestaurant) => (
        <h1 key={restaurant.id}>{restaurant.name}</h1>
      ))}
    </div>
  );
};

export default Dashboard;
