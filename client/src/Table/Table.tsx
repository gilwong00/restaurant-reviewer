import React, { useContext } from 'react';
import styled from 'styled-components';
import { TableHeaders, TableBody, IHeader } from '.';
import { AppContext } from '../Context';

const DataTable = styled.table`
  border-collapse: collapse;
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  min-width: 1200px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

export const Headers: Array<IHeader> = [
  { key: 'name', displayValue: 'Name' },
  { key: 'location', displayValue: 'Location' },
  { key: 'priceRange', displayValue: 'Price Range' },
  { key: 'averageRating', displayValue: 'Rating' }
];

const Table: React.FC = () => {
  const { restaurants } = useContext(AppContext);
  return (
    <DataTable>
      <TableHeaders headers={Headers} />
      <TableBody restaurants={restaurants} />
    </DataTable>
  );
};

export default Table;
