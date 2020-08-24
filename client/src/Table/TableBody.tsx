import React from 'react';
import { TableRow, TableData } from '.';
import { IRestaurant } from '../Context';

interface IProps {
  restaurants: Array<IRestaurant>;
}

const TableBody: React.FC<IProps> = ({ restaurants }) => {
  const displayPriceRange = (range: number) => {
    let priceDisplay = '';

    for (let i = 1; i <= range; i++) {
      priceDisplay += '$';
    }
    return priceDisplay;
  };

  return (
    <tbody>
      {restaurants.map((restaurant: IRestaurant) => (
        <TableRow key={restaurant.id}>
          <TableData>{restaurant.name}</TableData>
          <TableData>{restaurant.location}</TableData>
          <TableData>{displayPriceRange(restaurant.priceRange)}</TableData>
          <TableData>{restaurant.averageRating}</TableData>
          <TableData>
            <i className='fas fa-edit'></i>
          </TableData>
        </TableRow>
      ))}
    </tbody>
  );
};

export default TableBody;
