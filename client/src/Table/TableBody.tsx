import React from 'react';
import { useHistory } from 'react-router-dom';
import { TableRow, TableData } from '.';
import { Stars } from '../Stars';
import { IRestaurant } from '../Context';
import styled from 'styled-components';

const EditIcon = styled.i`
  cursor: pointer;
`;

interface IProps {
  restaurants: Array<IRestaurant>;
}

const TableBody: React.FC<IProps> = ({ restaurants }) => {
  const history = useHistory();

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
        <TableRow
          key={restaurant.id}
          onClick={() => history.push(`/restaurant/${restaurant.id}`)}
        >
          <TableData>
            {`${
              restaurant.name.charAt(0).toUpperCase() + restaurant.name.slice(1)
            }`}
          </TableData>
          <TableData>{restaurant.location}</TableData>
          <TableData>{displayPriceRange(restaurant.priceRange)}</TableData>
          <TableData>
            <Stars averageRating={restaurant.averageRating} />
          </TableData>
          <TableData>
            <EditIcon className='fas fa-edit' />
          </TableData>
        </TableRow>
      ))}
    </tbody>
  );
};

export default TableBody;
